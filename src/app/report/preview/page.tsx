'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Car, MapPin, Fuel, Settings, Calendar, Shield, Lock, AlertCircle } from 'lucide-react'
import { MpesaLogo, TigoPesaLogo, VisaLogo, MastercardLogo } from '@/components/ui/PaymentIcons'
import styles from './page.module.css'

interface PreCheckData {
  vin: string
  format: string
  dataSource: string
  vehicleInfo: {
    make: string
    model: string
    year: number
    bodyType: string
    engineSize: string
    fuelType: string
    transmission: string
    driveType: string
    country: string
  } | null
}

export default function PreviewPage() {
  const router = useRouter()
  const [data, setData] = useState<PreCheckData | null>(null)
  const [paying, setPaying] = useState('')
  const [paymentError, setPaymentError] = useState('')

  useEffect(() => {
    // First try sessionStorage
    const stored = sessionStorage.getItem('precheck')
    if (stored) {
      setData(JSON.parse(stored))
      return
    }

    // Fallback: check URL params (for post-payment redirect)
    const params = new URLSearchParams(window.location.search)
    const vin = params.get('vin')
    if (vin) {
      fetch('/api/vin-precheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vin }),
      })
        .then(res => res.json())
        .then(result => {
          if (result.vin) {
            setData(result)
            sessionStorage.setItem('precheck', JSON.stringify(result))
          } else {
            router.push('/')
          }
        })
        .catch(() => router.push('/'))
      return
    }

    router.push('/')
  }, [router])

  const handlePurchase = async (tierId: string) => {
    if (!data) return
    setPaying(tierId)
    setPaymentError('')

    try {
      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tierId, vin: data.vin }),
      })
      const result = await res.json()

      if (result.error === 'PAYMENT_NOT_CONFIGURED') {
        setPaymentError('Payment system is being set up. Generating demo report...')
        setTimeout(() => {
          router.push(`/report/demo?vin=${data.vin}`)
        }, 2000)
        return
      }

      if (result.redirectUrl) {
        window.location.href = result.redirectUrl
      } else if (result.error) {
        setPaymentError(result.message || result.error)
      }
    } catch {
      setPaymentError('Connection error. Please try again.')
    } finally {
      setPaying('')
    }
  }

  if (!data) {
    return (
      <div className={styles.loading}>
        <div className="spinner" />
        <p>Loading vehicle information...</p>
      </div>
    )
  }

  const v = data.vehicleInfo

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <button className={styles.backBtn} onClick={() => router.push('/')} id="back-btn">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <span className={styles.logo}>
            <Shield size={20} />
            CarHakiki
          </span>
        </div>
      </nav>

      <div className="container">
        <div className={styles.layout}>
          {/* Vehicle Info Card */}
          <div className={styles.vehicleCard}>
            <div className={styles.freeTag}>✓ Free Pre-Check</div>
            <h2 className={styles.vehicleName}>
              {v ? `${v.year} ${v.make} ${v.model}` : `Vehicle: ${data.vin}`}
            </h2>
            <p className={styles.vin}>VIN: {data.vin}</p>

            {v && (
              <div className={styles.specsGrid}>
                <div className={styles.spec}>
                  <Calendar size={16} />
                  <span className={styles.specLabel}>Year</span>
                  <span className={styles.specValue}>{v.year}</span>
                </div>
                <div className={styles.spec}>
                  <Car size={16} />
                  <span className={styles.specLabel}>Body</span>
                  <span className={styles.specValue}>{v.bodyType}</span>
                </div>
                <div className={styles.spec}>
                  <Settings size={16} />
                  <span className={styles.specLabel}>Engine</span>
                  <span className={styles.specValue}>{v.engineSize}</span>
                </div>
                <div className={styles.spec}>
                  <Fuel size={16} />
                  <span className={styles.specLabel}>Fuel</span>
                  <span className={styles.specValue}>{v.fuelType}</span>
                </div>
                <div className={styles.spec}>
                  <Settings size={16} />
                  <span className={styles.specLabel}>Transmission</span>
                  <span className={styles.specValue}>{v.transmission}</span>
                </div>
                <div className={styles.spec}>
                  <MapPin size={16} />
                  <span className={styles.specLabel}>Origin</span>
                  <span className={styles.specValue}>{v.country}</span>
                </div>
              </div>
            )}

            <div className={styles.sourceTag}>
              Data source: {data.dataSource === 'japan' ? '🇯🇵 Japan' : data.dataSource === 'europe' ? '🇪🇺 Europe' : '🌍 Global'}
            </div>
          </div>

          {/* Pricing Options */}
          <div className={styles.pricingSection}>
            <h3 className={styles.pricingTitle}>Unlock Full History Report</h3>
            <p className={styles.pricingSubtitle}>
              See mileage records, accident history, theft status, and more
            </p>

            {paymentError && (
              <div className={styles.paymentAlert}>
                <AlertCircle size={16} />
                {paymentError}
              </div>
            )}

            <div className={styles.tierCards}>
              <div className={`card ${styles.tierCard}`} id="tier-single">
                <h4>1 Report</h4>
                <div className={styles.tierPrice}>TZS 25,000</div>
                <ul className={styles.tierFeatures}>
                  <li>✓ Complete mileage history</li>
                  <li>✓ Accident & damage records</li>
                  <li>✓ Theft check (Interpol + CARFAX)</li>
                  <li>✓ Title & registration history</li>
                  <li>✓ Ownership count</li>
                  <li>✓ Flood & salvage check</li>
                  <li>✓ Full vehicle specifications</li>
                </ul>
                <button
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => handlePurchase('single')}
                  disabled={!!paying}
                >
                  {paying === 'single' ? <span className="spinner" /> : 'Get Report'}
                </button>
              </div>
              <div className={`card ${styles.tierCard} ${styles.tierPopular}`} id="tier-double">
                <span className={styles.popularBadge}>Most Popular</span>
                <h4>2 Reports</h4>
                <div className={styles.tierPrice}>TZS 40,000</div>
                <div className={styles.tierSavings}>Save 20% — TZS 20,000 per report</div>
                <ul className={styles.tierFeatures}>
                  <li>✓ Everything in 1 Report</li>
                  <li>✓ Check 2 different cars</li>
                  <li>✓ Compare vehicles side by side</li>
                  <li>✓ Valid for 30 days</li>
                  <li>✓ Priority support</li>
                </ul>
                <button
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => handlePurchase('double')}
                  disabled={!!paying}
                >
                  {paying === 'double' ? <span className="spinner" /> : 'Get 2 Reports'}
                </button>
              </div>
              <div className={`card ${styles.tierCard}`} id="tier-triple">
                <span className={styles.bestBadge}>⭐ Best Value</span>
                <h4>3 Reports</h4>
                <div className={styles.tierPrice}>TZS 55,000</div>
                <div className={styles.tierSavings}>Save 27% — ~TZS 18,333 per report</div>
                <ul className={styles.tierFeatures}>
                  <li>✓ Everything in 2 Reports</li>
                  <li>✓ Check 3 different cars</li>
                  <li>✓ Lowest price per report</li>
                  <li>✓ Valid for 60 days</li>
                  <li>✓ Priority support</li>
                </ul>
                <button
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => handlePurchase('triple')}
                  disabled={!!paying}
                >
                  {paying === 'triple' ? <span className="spinner" /> : 'Get 3 Reports'}
                </button>
              </div>
            </div>

            <div className={styles.paymentInfo}>
              <Lock size={14} style={{ marginRight: '4px' }} /> Secure payment via
              <span style={{ display: 'inline-flex', gap: '8px', alignItems: 'center', marginLeft: '6px' }}>
                <MpesaLogo />
                <TigoPesaLogo />
                <VisaLogo />
                <MastercardLogo />
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
