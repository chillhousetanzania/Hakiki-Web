// Pesapal Payment Client
// Placeholder — ready to activate when API keys are obtained
// Docs: https://developer.pesapal.com/how-to-integrate/e-commerce/api-30-json/api-reference

const PESAPAL_URL = process.env.PESAPAL_API_URL || 'https://pay.pesapal.com/v3'

let cachedPesapalToken: string | null = null
let pesapalTokenExpiry: number = 0

async function getPesapalToken(): Promise<string> {
  if (cachedPesapalToken && Date.now() < pesapalTokenExpiry) {
    return cachedPesapalToken
  }

  const key = process.env.PESAPAL_CONSUMER_KEY
  const secret = process.env.PESAPAL_CONSUMER_SECRET

  if (!key || key.startsWith('GET_FROM')) {
    throw new Error('PESAPAL_NOT_CONFIGURED')
  }

  const res = await fetch(`${PESAPAL_URL}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      consumer_key: key,
      consumer_secret: secret,
    }),
  })

  if (!res.ok) throw new Error(`Pesapal auth failed: ${res.status}`)

  const data = await res.json()
  cachedPesapalToken = data.token
  pesapalTokenExpiry = Date.now() + 4 * 60 * 1000 // 4 min
  return cachedPesapalToken!
}

export async function registerIPN(callbackUrl: string) {
  const token = await getPesapalToken()
  const res = await fetch(`${PESAPAL_URL}/api/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: callbackUrl,
      ipn_notification_type: 'POST',
    }),
  })
  if (!res.ok) throw new Error('IPN registration failed')
  return res.json()
}

export interface PesapalOrderRequest {
  id: string
  currency: string
  amount: number
  description: string
  callbackUrl: string
  notificationId: string
  billingPhone?: string
  billingEmail?: string
  billingFirstName?: string
  billingLastName?: string
}

export async function submitOrder(order: PesapalOrderRequest) {
  const token = await getPesapalToken()
  const res = await fetch(`${PESAPAL_URL}/api/Transactions/SubmitOrderRequest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      description: order.description,
      callback_url: order.callbackUrl,
      notification_id: order.notificationId,
      billing_address: {
        phone_number: order.billingPhone || '',
        email_address: order.billingEmail || '',
        first_name: order.billingFirstName || '',
        last_name: order.billingLastName || '',
      },
    }),
  })

  if (!res.ok) throw new Error('Order submission failed')
  return res.json() // { redirect_url, order_tracking_id, merchant_reference }
}

export async function getTransactionStatus(orderTrackingId: string) {
  const token = await getPesapalToken()
  const res = await fetch(
    `${PESAPAL_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error('Failed to get transaction status')
  return res.json()
}

export function isPesapalConfigured(): boolean {
  const key = process.env.PESAPAL_CONSUMER_KEY
  return !!key && !key.startsWith('GET_FROM') && !key.startsWith('placeholder')
}
