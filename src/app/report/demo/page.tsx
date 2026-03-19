'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Shield, ArrowLeft, CheckCircle, XCircle,
  Gauge, Car, Calendar, MapPin, Settings, Fuel,
  TrendingUp, AlertOctagon, Users
} from 'lucide-react'
import styles from '../[id]/page.module.css'

function DemoReportContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [vehicleInfo, setVehicleInfo] = useState<Record<string, string | number> | null>(null)
  const vin = searchParams.get('vin') || 'DEMO'

  useEffect(() => {
    const stored = sessionStorage.getItem('precheck')
    if (stored) {
      const parsed = JSON.parse(stored)
      setVehicleInfo(parsed.vehicleInfo)
    }
  }, [])

  const v = vehicleInfo
  const score = 87

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <button className={styles.backBtn} onClick={() => router.push('/')}>
            <ArrowLeft size={20} /> Home
          </button>
          <span className={styles.logo}><Shield size={20} /> Hakiki — Demo Report</span>
        </div>
      </nav>

      <div className={`container ${styles.reportContainer}`}>
        <div style={{ background: 'var(--color-primary-light)', padding: '12px 20px', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 500 }}>
          ⓘ This is a demo report. Purchase a plan to get real vehicle history data.
        </div>

        <header className={styles.reportHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.vehicleTitle}>
              {v ? `${v.year} ${v.make} ${v.model}` : `Vehicle: ${vin}`}
            </h1>
            <p className={styles.vinCode}>VIN: {vin}</p>
            {v && (
              <div className={styles.specRow}>
                <span><Car size={14} /> {v.bodyType}</span>
                <span><Settings size={14} /> {v.engineSize}</span>
                <span><Fuel size={14} /> {v.fuelType}</span>
                <span><MapPin size={14} /> {v.country}</span>
              </div>
            )}
          </div>
          <div className={styles.scoreBadge}>
            <div className={styles.scoreCircle} style={{ background: `conic-gradient(var(--color-safe) ${score}%, #E2E8F0 0)` }}>
              <span className={styles.scoreNumber}>{score}</span>
            </div>
            <div>
              <div className={styles.scoreLabel} style={{ color: 'var(--color-safe)' }}>Excellent</div>
              <div className={styles.scoreDesc}>Demo Score</div>
            </div>
          </div>
        </header>

        {/* Quick Status */}
        <section className={`card ${styles.statusSection}`}>
          <h2 className={styles.sectionTitle}><Shield size={20} /> Quick Status</h2>
          <div className={styles.statusGrid}>
            {[
              { label: 'Theft Check', ok: true, detail: 'Checked: CARFAX, Interpol' },
              { label: 'Total Loss', ok: true },
              { label: 'Flood Damage', ok: true },
              { label: 'Frame Damage', ok: true },
              { label: 'Airbag Deployment', ok: true },
              { label: 'Odometer Rollback', ok: true },
            ].map((item, i) => (
              <div key={i} className={styles.statusItem}>
                {item.ok ? (
                  <CheckCircle size={20} className={styles.iconSafe} />
                ) : (
                  <XCircle size={20} className={styles.iconDanger} />
                )}
                <div>
                  <div className={styles.statusLabel}>{item.label}</div>
                  {item.detail && <div className={styles.statusDetail}>{item.detail}</div>}
                </div>
                <span className={`badge ${item.ok ? 'badge-safe' : 'badge-danger'}`}>
                  {item.ok ? 'Clear' : 'Alert'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Mileage */}
        <section className={`card ${styles.section}`}>
          <h2 className={styles.sectionTitle}><Gauge size={20} /> Mileage History</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead><tr><th>Date</th><th>Mileage</th><th>Source</th></tr></thead>
              <tbody>
                <tr><td>2024-06-15</td><td><strong>85,230 km</strong></td><td>Service Record</td></tr>
                <tr><td>2023-03-10</td><td><strong>72,150 km</strong></td><td>Inspection</td></tr>
                <tr><td>2021-11-22</td><td><strong>58,400 km</strong></td><td>Registration</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Damage */}
        <section className={`card ${styles.section}`}>
          <h2 className={styles.sectionTitle}><AlertOctagon size={20} /> Damage & Accident Records</h2>
          <div className={styles.emptyState}>
            <CheckCircle size={32} className={styles.emptyIconSafe} />
            <p>No damage or accident records found — this is a good sign!</p>
          </div>
        </section>

        {/* Ownership */}
        <section className={`card ${styles.section}`}>
          <h2 className={styles.sectionTitle}><Users size={20} /> Ownership History</h2>
          <div className={styles.ownershipInfo}>
            <div className={styles.ownerCount}>
              <span className={styles.ownerNumber}>2</span>
              <span>Previous Owners</span>
            </div>
          </div>
        </section>

        <div className={styles.reportFooter}>
          <p>Report ID: DEMO-{Date.now()}</p>
          <p>Data Source: NHTSA (Demo)</p>
          <p>Generated: {new Date().toLocaleString()}</p>
          <p className={styles.disclaimer}>
            This is a demo report with sample data. Purchase a plan for real vehicle history.
          </p>
          <button className="btn-primary" onClick={() => router.push('/')} style={{ marginTop: '16px' }}>
            Purchase Full Report
          </button>
        </div>
      </div>
    </main>
  )
}

export default function DemoReportPage() {
  return (
    <Suspense fallback={<div className={styles.loadingPage}><div className={styles.loadingContent}><div className="spinner" /><p>Loading demo report...</p></div></div>}>
      <DemoReportContent />
    </Suspense>
  )
}
