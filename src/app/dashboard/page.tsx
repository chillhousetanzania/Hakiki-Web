'use client'

import { useState } from 'react'
import { Shield, FileText, Clock, Search, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

// Mock data — will be replaced with Supabase queries
const mockReports = [
  {
    id: 'RPT-001',
    vin: 'JTDKN3DU5A0123456',
    vehicle: '2010 TOYOTA Prius',
    score: 87,
    status: 'completed',
    createdAt: '2025-01-15T12:30:00Z',
  },
  {
    id: 'RPT-002',
    vin: 'WVWZZZ3CZWE123456',
    vehicle: '2014 VOLKSWAGEN Golf',
    score: 72,
    status: 'completed',
    createdAt: '2025-01-14T09:15:00Z',
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [reports] = useState(mockReports)

  const scoreColor = (score: number) =>
    score >= 80 ? 'var(--color-safe)' : score >= 50 ? 'var(--color-warning)' : 'var(--color-danger)'

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <a href="/" className={styles.logo}><Shield size={20} /> Hakiki</a>
          <div className={styles.navLinks}>
            <button className="btn-primary" onClick={() => router.push('/')} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
              <Plus size={16} /> New Check
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Your Reports</h1>
          <p className={styles.subtitle}>View all your vehicle history reports</p>
        </header>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={`card ${styles.statCard}`}>
            <FileText size={24} className={styles.statIcon} />
            <div className={styles.statNumber}>{reports.length}</div>
            <div className={styles.statLabel}>Reports Generated</div>
          </div>
          <div className={`card ${styles.statCard}`}>
            <Search size={24} className={styles.statIcon} />
            <div className={styles.statNumber}>0</div>
            <div className={styles.statLabel}>Reports Remaining</div>
          </div>
          <div className={`card ${styles.statCard}`}>
            <Clock size={24} className={styles.statIcon} />
            <div className={styles.statNumber}>—</div>
            <div className={styles.statLabel}>Last Report</div>
          </div>
        </div>

        {/* Reports List */}
        <div className={styles.reportsList}>
          {reports.length === 0 ? (
            <div className={styles.emptyState}>
              <FileText size={48} className={styles.emptyIcon} />
              <h3>No reports yet</h3>
              <p>Check a vehicle to get your first report</p>
              <button className="btn-primary" onClick={() => router.push('/')}>
                Check a Vehicle
              </button>
            </div>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className={`card ${styles.reportCard}`}
                onClick={() => router.push(`/report/${report.id}?vin=${report.vin}`)}
                id={`report-${report.id}`}
              >
                <div className={styles.reportInfo}>
                  <h3 className={styles.reportVehicle}>{report.vehicle}</h3>
                  <p className={styles.reportVin}>{report.vin}</p>
                  <p className={styles.reportDate}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={styles.reportScore}>
                  <div
                    className={styles.miniScore}
                    style={{ borderColor: scoreColor(report.score) }}
                  >
                    <span style={{ color: scoreColor(report.score) }}>{report.score}</span>
                  </div>
                  <span className={`badge badge-safe`}>
                    {report.status === 'completed' ? 'Complete' : 'Pending'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
