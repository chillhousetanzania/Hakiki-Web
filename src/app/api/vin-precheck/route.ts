import { NextResponse } from 'next/server'
import { decodeVin } from '@/lib/api/nhtsa'
import { detectVinFormat, detectDataSource } from '@/lib/api/vin-utils'

export async function POST(request: Request) {
  try {
    const { vin } = await request.json()

    if (!vin || typeof vin !== 'string') {
      return NextResponse.json({ error: 'VIN is required' }, { status: 400 })
    }

    const cleaned = vin.trim().toUpperCase()
    const format = detectVinFormat(cleaned)

    if (format === 'invalid') {
      return NextResponse.json({ error: 'Invalid VIN or chassis number format' }, { status: 400 })
    }

    const dataSource = detectDataSource(cleaned, format)

    let vehicleInfo = null
    if (format === 'vin' && cleaned.length === 17) {
      vehicleInfo = await decodeVin(cleaned)
    }

    return NextResponse.json({
      vin: cleaned,
      format,
      dataSource,
      vehicleInfo,
    })
  } catch (error) {
    console.error('Pre-check error:', error)
    return NextResponse.json({ error: 'Failed to check VIN. Please try again.' }, { status: 500 })
  }
}
