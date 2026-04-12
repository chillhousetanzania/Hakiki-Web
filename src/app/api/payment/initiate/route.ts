import { NextResponse } from 'next/server'
import { isPesapalConfigured, registerIPN, submitOrder } from '@/lib/api/pesapal'

const PRICING: Record<string, { amount: number; reports: number; name: string }> = {
  single: { amount: 25000, reports: 1, name: '1 Report' },
  double: { amount: 40000, reports: 2, name: '2 Reports' },
  triple: { amount: 55000, reports: 3, name: '3 Reports' },
}

export async function POST(request: Request) {
  try {
    const { tierId, vin, email, phone } = await request.json()

    if (!tierId || !vin) {
      return NextResponse.json({ error: 'Missing tierId or VIN' }, { status: 400 })
    }

    const tier = PRICING[tierId]
    if (!tier) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    // Check if Pesapal is configured
    if (!isPesapalConfigured()) {
      return NextResponse.json({
        error: 'PAYMENT_NOT_CONFIGURED',
        message: 'Payment system is being set up. Please try again later.',
      }, { status: 503 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const orderId = `HAK-${Date.now()}-${Math.random().toString(36).substring(7)}`

    // Register IPN callback
    const ipn = await registerIPN(`${baseUrl}/api/payment/callback`)

    // Submit order
    const order = await submitOrder({
      id: orderId,
      currency: 'TZS',
      amount: tier.amount,
      description: `CarHakiki ${tier.name} - VIN: ${vin}`,
      callbackUrl: `${baseUrl}/report/preview?orderId=${orderId}&vin=${vin}`,
      notificationId: ipn.ipn_id,
      billingEmail: email,
      billingPhone: phone,
    })

    return NextResponse.json({
      redirectUrl: order.redirect_url,
      orderId,
      orderTrackingId: order.order_tracking_id,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Payment initiation failed'
    if (message === 'PESAPAL_NOT_CONFIGURED') {
      return NextResponse.json({
        error: 'PAYMENT_NOT_CONFIGURED',
        message: 'Payment system is being set up. Please try again later.',
      }, { status: 503 })
    }
    console.error('Payment error:', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
