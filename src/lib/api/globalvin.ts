// GlobalVIN API Client
// Docs: https://www.globalvin.co/api
// Cost: $3.00 per CARFAX Standard report
// Auth: Email/Password → JWT token

let cachedToken: string | null = null
let tokenExpiry: number = 0

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken

  const res = await fetch(`${process.env.GLOBALVIN_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.GLOBALVIN_EMAIL,
      password: process.env.GLOBALVIN_PASSWORD,
    }),
  })

  if (!res.ok) throw new Error(`GlobalVIN auth failed: ${res.status}`)

  const data = await res.json()
  cachedToken = data.token
  tokenExpiry = Date.now() + 55 * 60 * 1000 // 55 min
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

  const res = await fetch(`${process.env.GLOBALVIN_API_URL}/report/carfax-standard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ vin }),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`GlobalVIN report failed (${res.status}): ${errBody}`)
  }

  const data = await res.json()

  // Normalize the response into our format
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

export async function checkCredits(): Promise<number> {
  const token = await getToken()
  const res = await fetch(`${process.env.GLOBALVIN_API_URL}/account/credits`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) return 0
  const data = await res.json()
  return data.credits || data.remaining || 0
}
