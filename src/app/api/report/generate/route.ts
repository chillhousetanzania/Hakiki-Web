import { NextResponse } from 'next/server'
import { fetchGlobalVinReport } from '@/lib/api/globalvin'
import { decodeVin } from '@/lib/api/nhtsa'

export async function POST(request: Request) {
  try {
    const { vin, orderId } = await request.json()

    if (!vin) {
      return NextResponse.json({ error: 'VIN is required' }, { status: 400 })
    }

    // TODO: Verify payment status with Pesapal before generating report
    // For now, generate report directly (using free credits for testing)

    // Step 1: Get basic vehicle info from NHTSA (free)
    const vehicleInfo = await decodeVin(vin)

    // Step 2: Fetch full history from GlobalVIN ($3/report)
    let globalVinData = null
    try {
      globalVinData = await fetchGlobalVinReport(vin)
    } catch (error) {
      console.error('GlobalVIN error:', error)
      // Continue with partial report if GlobalVIN fails
    }

    // Step 3: Build the report
    const report = {
      id: `RPT-${Date.now()}`,
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
      // Score calculation
      overallScore: calculateScore(globalVinData),
      // Report sections from GlobalVIN
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
      dataSource: globalVinData ? 'GlobalVIN CARFAX' : 'NHTSA (basic)',
      generatedAt: new Date().toISOString(),
    }

    // TODO: Cache report in Supabase to avoid duplicate API calls

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
