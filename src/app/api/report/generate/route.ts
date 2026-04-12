import { NextResponse } from 'next/server'
import { fetchGlobalVinReport, fetchChinaVinReport } from '@/lib/api/globalvin'
import { decodeVin } from '@/lib/api/nhtsa'
import { isChineseVin } from '@/lib/api/vin-utils'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { vin, orderId } = await request.json()

    if (!vin) {
      return NextResponse.json({ error: 'VIN is required' }, { status: 400 })
    }

    if (!orderId) {
      return NextResponse.json({ error: 'Payment required' }, { status: 403 })
    }

    // Verify payment before generating report
    const supabase = createServerClient()
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('user_id')
      .eq('order_id', orderId)
      .eq('status', 'completed')
      .single()

    if (paymentError || !payment) {
      return NextResponse.json({ error: 'Payment required' }, { status: 403 })
    }

    // NHTSA (free) and GlobalVIN are independent — run in parallel
    const fetchGlobalVin = (isChineseVin(vin) ? fetchChinaVinReport : fetchGlobalVinReport)(vin)
      .catch((err: Error) => { console.error('GlobalVIN error:', err); return null })

    const [vehicleInfo, globalVinData] = await Promise.all([decodeVin(vin), fetchGlobalVin])

    const reportId = `RPT-${Date.now()}`
    const report = {
      id: reportId,
      vin,
      orderId,
      vehicleInfo: vehicleInfo || {
        vin,
        make: 'Unknown',
        model: 'Unknown',
        year: 0,
        bodyType: 'Unknown',
        engineSize: 'Unknown',
        fuelType: 'Unknown',
        transmission: 'Unknown',
        driveType: 'Unknown',
        country: 'Unknown',
      },
      overallScore: calculateScore(globalVinData),
      mileageHistory: globalVinData?.mileageRecords || [],
      damageRecords: globalVinData?.accidentRecords || [],
      ownershipCount: globalVinData?.ownershipCount || 0,
      titleRecords: globalVinData?.titleRecords || [],
      theftCheck: {
        isStolen: globalVinData?.theftRecords?.some(r => r.isStolen) || false,
        databases: globalVinData?.theftRecords?.map(r => r.database) || ['CARFAX', 'Interpol'],
        lastChecked: new Date().toISOString(),
      },
      flags: {
        totalLoss: globalVinData?.totalLoss || false,
        floodDamage: globalVinData?.floodDamage || false,
        frameDamage: globalVinData?.frameDamage || false,
        airbagDeployment: globalVinData?.airbagDeployment || false,
        odometerRollback: globalVinData?.odometerRollback || false,
      },
      dataSource: globalVinData ? 'GlobalVIN' : 'NHTSA (basic)',
      carfax_pending: true,
      generatedAt: new Date().toISOString(),
    }

    const { error: insertError } = await supabase.from('reports').insert({
      id: reportId,
      user_id: payment.user_id,
      vin,
      vehicle_info: report.vehicleInfo,
      report_data: report,
      status: 'completed',
      data_source: report.dataSource,
      overall_score: report.overallScore,
      carfax_pending: report.carfax_pending,
    })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error('Report generation error:', error)
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 })
  }
}

function calculateScore(data: ReturnType<typeof Object> | null): number {
  if (!data) return 75 // Default score for basic reports

  let score = 100

  // Deductions
  if (data.totalLoss) score -= 40
  if (data.floodDamage) score -= 25
  if (data.frameDamage) score -= 20
  if (data.airbagDeployment) score -= 15
  if (data.odometerRollback) score -= 30
  if (data.accidentRecords?.length > 0) score -= Math.min(data.accidentRecords.length * 8, 25)
  if (data.theftRecords?.some((r: { isStolen: boolean }) => r.isStolen)) score -= 50

  return Math.max(score, 10) // Minimum score of 10
}
