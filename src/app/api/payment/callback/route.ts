import { NextResponse } from 'next/server'
import { getTransactionStatus } from '@/lib/api/pesapal'
import { createServerClient } from '@/lib/supabase'

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

    const supabase = createServerClient()

    if (status.payment_status_description === 'Completed') {
      // Extract vin from the merchant reference (format: "VIN_{vin}_{tierId}_{timestamp}")
      const parts = (OrderMerchantReference || '').split('_')
      const vin = parts[1] || null

      // Save completed payment to Supabase
      const { error: paymentError } = await supabase
        .from('payments')
        .upsert({
          order_id: OrderTrackingId,
          vin,
          status: 'completed',
          amount: status.amount || 0,
          currency: 'TZS',
          provider: 'pesapal',
          provider_ref: OrderMerchantReference,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'order_id' })

      if (paymentError) {
        console.error('[Supabase] Failed to save payment:', paymentError)
        return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 })
      }

      console.log('[Supabase] Payment saved for order:', OrderTrackingId)

      // Trigger report generation and save to reports table
      if (vin) {
        try {
          const reportRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/generate`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ vin, orderId: OrderTrackingId }),
            }
          )

          if (reportRes.ok) {
            const reportData = await reportRes.json()

            const { error: reportError } = await supabase
              .from('reports')
              .upsert({
                id: reportData.id,
                vin,
                order_id: OrderTrackingId,
                vehicle_info: reportData.vehicleInfo,
                report_data: reportData,
                status: 'completed',
                data_source: reportData.dataSource,
                overall_score: reportData.overallScore,
                created_at: new Date().toISOString(),
              }, { onConflict: 'id' })

            if (reportError) {
              console.error('[Supabase] Failed to save report:', reportError)
            } else {
              console.log('[Supabase] Report saved:', reportData.id)
            }
          }
        } catch (reportErr) {
          // Report generation failure should not block the payment acknowledgement
          console.error('[Report generation] Failed after payment:', reportErr)
        }
      }
    } else if (status.payment_status_description === 'Failed') {
      await supabase
        .from('payments')
        .upsert({
          order_id: OrderTrackingId,
          status: 'failed',
          provider: 'pesapal',
          provider_ref: OrderMerchantReference,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'order_id' })

      console.log('[Supabase] Payment marked failed for order:', OrderTrackingId)
    }

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
