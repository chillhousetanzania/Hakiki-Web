'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Shield, ArrowLeft, CheckCircle, XCircle, AlertTriangle,
  Gauge, Car, Calendar, MapPin, Settings, Fuel, Download,
  TrendingUp, AlertOctagon, Users
} from 'lucide-react'
import styles from './page.module.css'

interface ReportData {
  id: string
  vin: string
  vehicleInfo: {
    make: string; model: string; year: number; bodyType: string;
    engineSize: string; fuelType: string; transmission: string;
    driveType: string; country: string;
  }
  overallScore: number
  mileageHistory: Array<{ date: string; mileage: number; source: string }>
  damageRecords: Array<{ date: string; type: string; severity: string; description: string }>
  ownershipCount: number
  titleRecords: Array<{ state: string; dateIssued: string; odometer: number }>
  theftCheck: { isStolen: boolean; databases: string[]; lastChecked: string }
  flags: {
    totalLoss: boolean; floodDamage: boolean; frameDamage: boolean;
    airbagDeployment: boolean; odometerRollback: boolean;
  }
  dataSource: string
  carfax_pending?: boolean
  generatedAt: string
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'var(--color-safe)' : score >= 50 ? 'var(--color-warning)' : 'var(--color-danger)'
  const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor'

  return (
    <div className={styles.scoreBadge}>
      <div className={styles.scoreCircle} style={{ background: `conic-gradient(${color} ${score}%, #E2E8F0 0)` }}>
        <span className={styles.scoreNumber}>{score}</span>
      </div>
      <div>
        <div className={styles.scoreLabel} style={{ color }}>{label}</div>
        <div className={styles.scoreDesc}>Overall Vehicle Score</div>
      </div>
    </div>
  )
}

function StatusItem({ label, ok, detail }: { label: string; ok: boolean; detail?: string }) {
  return (
    <div className={styles.statusItem}>
      {ok ? (
        <CheckCircle size={20} className={styles.iconSafe} />
      ) : (
        <XCircle size={20} className={styles.iconDanger} />
      )}
      <div>
        <div className={styles.statusLabel}>{label}</div>
        {detail && <div className={styles.statusDetail}>{detail}</div>}
      </div>
      <span className={`badge ${ok ? 'badge-safe' : 'badge-danger'}`}>
        {ok ? 'Clear' : 'Alert'}
      </span>
    </div>
  )
}

function ReportContent() {
  const router = useRouter()
  const params = useParams()
  const reportId = params.id as string
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!reportId) {
      setError('No report ID provided')
      setLoading(false)
      return
    }

    async function loadReport() {
      try {
        const res = await fetch(`/api/report/${reportId}`)
        if (res.status === 404) {
          setError('Report not found')
          setLoading(false)
          return
        }
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to load report')
        }
        const data = await res.json()
        setReport(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load report')
      } finally {
        setLoading(false)
      }
    }

    loadReport()
  }, [reportId])

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingContent}>
          <div className="spinner" style={{ width: 40, height: 40 }} />
          <h2>Loading Your Report...</h2>
          <p>Fetching saved vehicle history</p>
        </div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingContent}>
          <AlertTriangle size={48} color="var(--color-warning)" />
          <h2>Report Not Found</h2>
          <p>{error || 'This report does not exist or has been removed.'}</p>
          <button className="btn-primary" onClick={() => router.push('/')}>
            Back to Homepage
          </button>
        </div>
      </div>
    )
  }

  const v = report.vehicleInfo
  const f = report.flags

  return (
    <main className={styles.page}>
      {/* Nav */}
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <button className={styles.backBtn} onClick={() => router.push('/')}>
            <ArrowLeft size={20} /> Home
          </button>
          <span className={styles.logo}><Shield size={20} /> CarHakiki Report</span>
          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => window.print()}>
            <Download size={16} /> Save PDF
          </button>
        </div>
      </nav>

      {report.carfax_pending && (
        <div className={styles.carfaxPendingBanner}>
          Your basic vehicle information is ready. Full history report including accidents, mileage records and theft check will be completed within 24-48 hours.
        </div>
      )}

      <div className={`container ${styles.reportContainer}`}>
        {/* Report Header */}
        <header className={styles.reportHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.vehicleTitle}>
              {v.year} {v.make} {v.model}
            </h1>
            <p className={styles.vinCode}>VIN: {report.vin}</p>
            <div className={styles.specRow}>
              <span><Car size={14} /> {v.bodyType}</span>
              <span><Settings size={14} /> {v.engineSize}</span>
              <span><Fuel size={14} /> {v.fuelType}</span>
              <span><MapPin size={14} /> {v.country}</span>
            </div>
          </div>
          <ScoreBadge score={report.overallScore} />
        </header>

        {/* Quick Status Grid */}
        <section className={`card ${styles.statusSection}`}>
          <h2 className={styles.sectionTitle}><Shield size={20} /> Quick Status</h2>
          <div className={styles.statusGrid}>
            <StatusItem label="Theft Check" ok={!report.theftCheck.isStolen} detail={`Checked: ${report.theftCheck.databases.join(', ')}`} />
            <StatusItem label="Total Loss" ok={!f.totalLoss} />
            <StatusItem label="Flood Damage" ok={!f.floodDamage} />
            <StatusItem label="Frame Damage" ok={!f.frameDamage} />
            <StatusItem label="Airbag Deployment" ok={!f.airbagDeployment} />
            <StatusItem label="Odometer Rollback" ok={!f.odometerRollback} />
          </div>
        </section>

        {/* Mileage History */}
        <section className={`card ${styles.section}`}>
          <h2 className={styles.sectionTitle}><Gauge size={20} /> Mileage History</h2>
          {report.mileageHistory.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Mileage</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {report.mileageHistory.map((rec, i) => (
                    <tr key={i}>
                      <td>{new Date(rec.date).toLocaleDateString()}</td>
                      <td><strong>{rec.mileage.toLocaleString()} km</strong></td>
                      <td>{rec.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <TrendingUp size={32} className={styles.emptyIcon} />
              <p>No mileage records found in our database</p>
            </div>
          )}
        </section>

        {/* Damage & Accidents */}
        <section className={`card ${styles.section}`}>
          <h2 className={styles.sectionTitle}><AlertOctagon size={20} /> Damage & Accident Records</h2>
          {report.damageRecords.length > 0 ? (
            <div className={styles.recordsList}>
              {report.damageRecords.map((rec, i) => (
                <div key={i} className={styles.record}>
                  <div className={styles.recordDate}>
                    <Calendar size={14} />
                    {new Date(rec.date).toLocaleDateString()}
                  </div>
                  <div className={styles.recordContent}>
                    <span className={`badge ${rec.severity === 'minor' ? 'badge-warning' : 'badge-danger'}`}>
                      {rec.severity}
                    </span>
                    <span className={styles.recordType}>{rec.type}</span>
                  </div>
                  <p className={styles.recordDesc}>{rec.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <CheckCircle size={32} className={styles.emptyIconSafe} />
              <p>No damage or accident records found — this is a good sign!</p>
            </div>
          )}
        </section>

        {/* Ownership */}
        <section className={`card ${styles.section}`}>
          <h2 className={styles.sectionTitle}><Users size={20} /> Ownership History</h2>
          <div className={styles.ownershipInfo}>
            <div className={styles.ownerCount}>
              <span className={styles.ownerNumber}>{report.ownershipCount || 'N/A'}</span>
              <span>Previous Owners</span>
            </div>
          </div>
        </section>

        {/* Title Records */}
        {report.titleRecords.length > 0 && (
          <section className={`card ${styles.section}`}>
            <h2 className={styles.sectionTitle}><Shield size={20} /> Title History</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>State/Region</th>
                    <th>Odometer</th>
                  </tr>
                </thead>
                <tbody>
                  {report.titleRecords.map((rec, i) => (
                    <tr key={i}>
                      <td>{rec.dateIssued}</td>
                      <td>{rec.state}</td>
                      <td>{rec.odometer?.toLocaleString()} km</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Report Footer */}
        <div className={styles.reportFooter}>
          <p>Report ID: {report.id}</p>
          <p>Data Source: {report.dataSource}</p>
          <p>Generated: {new Date(report.generatedAt).toLocaleString()}</p>
          <p className={styles.disclaimer}>
            This report is based on available data and may not include all vehicle history.
            Always inspect the vehicle in person before purchase.
          </p>
        </div>
      </div>
    </main>
  )
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className={styles.loadingPage}><div className={styles.loadingContent}><div className="spinner" style={{ width: 40, height: 40 }} /><h2>Loading Report...</h2></div></div>}>
      <ReportContent />
    </Suspense>
  )
}
