// GlobalVIN API Client
// Docs: https://globalvin.co/dashboard/supplier/api-docs
// Auth: Email/Password → JWT Bearer token (24h expiry)
//
// CONFIRMED ENDPOINTS (from dashboard):
//   POST /api/auth/login              → Login
//   GET  /api/vin/basic               → Basic VIN Decode
//   GET  /api/vin/standard            → Standard VIN Decode
//   GET  /api/vin/premium             → Premium VIN Decode
//   GET  /api/usa/report/carfax/:vin  → CARFAX Report (requires approval)
//
// ACCOUNT STATUS:
//   CARFAX Reports: NOT ENABLED (needs approval from GlobalVIN)
//   VIN Decode API: NOT ENABLED (needs approval from GlobalVIN)
//   China Reports: APPROVED (3 credits)

const BASE_URL = process.env.GLOBALVIN_API_URL || 'https://api.globalvin.co'

let cachedToken: string | null = null
let tokenExpiry: number = 0

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.GLOBALVIN_EMAIL,
      password: process.env.GLOBALVIN_PASSWORD,
    }),
  })

  if (!res.ok) throw new Error(`GlobalVIN auth failed: ${res.status}`)

  const data = await res.json()

  if (!data.success || !data.data?.token) {
    throw new Error('GlobalVIN auth: unexpected response format')
  }

  cachedToken = data.data.token
  // Token valid for 24h, refresh at 23h to be safe
  tokenExpiry = Date.now() + 23 * 60 * 60 * 1000
  return cachedToken!
}

export interface GlobalVinReport {
  vin: string
  titleRecords: Array<{
    state: string
    titleNumber: string
    dateIssued: string
    odometer: number
    odometerStatus: string
  }>
  accidentRecords: Array<{
    date: string
    type: string
    severity: string
    description: string
  }>
  mileageRecords: Array<{
    date: string
    mileage: number
    source: string
  }>
  theftRecords: Array<{
    isStolen: boolean
    database: string
    lastChecked: string
  }>
  ownershipCount: number
  totalLoss: boolean
  floodDamage: boolean
  frameDamage: boolean
  airbagDeployment: boolean
  odometerRollback: boolean
}

export async function fetchGlobalVinReport(vin: string): Promise<GlobalVinReport> {
  const token = await getToken()

  // Try CARFAX first (USA reports), fall back to standard VIN decode
  let data = null

  try {
    // CARFAX report — GET /api/usa/report/carfax/:vin
    const carfaxRes = await fetch(`${BASE_URL}/api/usa/report/carfax/${vin}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })

    if (carfaxRes.ok) {
      const carfaxData = await carfaxRes.json()
      if (carfaxData.success) {
        data = carfaxData.data
      }
    }
  } catch (err) {
    console.warn('CARFAX endpoint unavailable, trying VIN decode:', err)
  }

  // Fallback to standard VIN decode
  if (!data) {
    const vinRes = await fetch(`${BASE_URL}/api/vin/standard?vin=${encodeURIComponent(vin)}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })

    if (!vinRes.ok) {
      const errBody = await vinRes.text()
      throw new Error(`GlobalVIN report failed (${vinRes.status}): ${errBody}`)
    }

    const vinData = await vinRes.json()
    data = vinData.data || vinData
  }

  return normaliseResponse(vin, data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normaliseResponse(vin: string, data: any): GlobalVinReport {
  return {
    vin,
    titleRecords: data.titleRecords || data.title_records || [],
    accidentRecords: data.accidentRecords || data.accident_records || [],
    mileageRecords: data.mileageRecords || data.mileage_records || [],
    theftRecords: data.theftRecords || data.theft_records || [],
    ownershipCount: data.ownershipCount || data.ownership_count || 0,
    totalLoss: data.totalLoss || data.total_loss || false,
    floodDamage: data.floodDamage || data.flood_damage || false,
    frameDamage: data.frameDamage || data.frame_damage || false,
    airbagDeployment: data.airbagDeployment || data.airbag_deployment || false,
    odometerRollback: data.odometerRollback || data.odometer_rollback || false,
  }
}

export async function fetchChinaVinReport(vin: string): Promise<GlobalVinReport> {
  const token = await getToken()

  const res = await fetch(`${BASE_URL}/api/vin/basic?vin=${encodeURIComponent(vin)}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`GlobalVIN China report failed (${res.status}): ${errBody}`)
  }

  const vinData = await res.json()
  return normaliseResponse(vin, vinData.data || vinData)
}

export async function checkCredits(): Promise<{ cash: number; basic: number }> {
  const token = await getToken()
  const res = await fetch(`${BASE_URL}/api/auth/profile`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) return { cash: 0, basic: 0 }
  const data = await res.json()
  return {
    cash: data.data?.balance || 0,
    basic: data.data?.basicCredits || 0,
  }
}
