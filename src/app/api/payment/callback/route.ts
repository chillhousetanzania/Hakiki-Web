import { NextResponse } from 'next/server'
import { getTransactionStatus } from '@/lib/api/pesapal'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = body

    console.log('[Pesapal IPN]', {
      trackingId: OrderTrackingId,
      merchantRef: OrderMerchantReference,
      type: OrderNotificationType,
    })

    if (!OrderTrackingId) {
      return NextResponse.json({ error: 'Missing OrderTrackingId' }, { status: 400 })
    }

    // Get full transaction status from Pesapal
    const status = await getTransactionStatus(OrderTrackingId)

    console.log('[Pesapal Status]', status)

    // TODO: When Supabase is connected, update the payment record:
    // - status.payment_status_description === 'Completed' → mark paid, enable report
    // - status.payment_status_description === 'Failed' → mark failed

    return NextResponse.json({
      orderNotificationType: OrderNotificationType,
      orderTrackingId: OrderTrackingId,
      orderMerchantReference: OrderMerchantReference,
      status: status.payment_status_description,
    })
  } catch (error) {
    console.error('Payment callback error:', error)
    return NextResponse.json({ error: 'Callback processing failed' }, { status: 500 })
  }
}

// Pesapal also sends GET requests for status checks
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('OrderTrackingId')

  if (!orderId) {
    return NextResponse.json({ status: 'no_order_id' })
  }

  try {
    const status = await getTransactionStatus(orderId)
    return NextResponse.json(status)
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
