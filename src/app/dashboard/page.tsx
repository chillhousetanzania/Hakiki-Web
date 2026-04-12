'use client'

import { useState, useEffect } from 'react'
import { Shield, FileText, Clock, Search, Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from './page.module.css'

interface Report {
  id: string
  vin: string
  vehicle_info: { make: string; model: string; year: number }
  overall_score: number
  status: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReports() {
      const { data, error } = await supabase
        .from('reports')
        .select('id, vin, vehicle_info, overall_score, status, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to fetch reports:', error)
      } else {
        setReports(data || [])
      }
      setLoading(false)
    }

    fetchReports()
  }, [])

  const scoreColor = (score: number) =>
    score >= 80 ? 'var(--color-safe)' : score >= 50 ? 'var(--color-warning)' : 'var(--color-danger)'

  const vehicleLabel = (r: Report) => {
    const v = r.vehicle_info
    if (!v) return r.vin
    return `${v.year || ''} ${v.make || ''} ${v.model || ''}`.trim() || r.vin
  }

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <Link href="/" className={styles.logo}><Shield size={20} /> CarHakiki</Link>
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
            <div className={styles.statNumber}>
              {reports.length > 0
                ? new Date(reports[0].created_at).toLocaleDateString()
                : '—'}
            </div>
            <div className={styles.statLabel}>Last Report</div>
          </div>
        </div>

        {/* Reports List */}
        <div className={styles.reportsList}>
          {loading ? (
            <div className={styles.emptyState}>
              <div className="spinner" style={{ width: 32, height: 32 }} />
              <p>Loading your reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className={styles.emptyState}>
              <FileText size={48} className={styles.emptyIcon} />
              <h3>You have no reports yet</h3>
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
                onClick={() => router.push(`/report/${report.id}`)}
                id={`report-${report.id}`}
              >
                <div className={styles.reportInfo}>
                  <h3 className={styles.reportVehicle}>{vehicleLabel(report)}</h3>
                  <p className={styles.reportVin}>{report.vin}</p>
                  <p className={styles.reportDate}>
                    {new Date(report.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className={styles.reportScore}>
                  <div
                    className={styles.miniScore}
                    style={{ borderColor: scoreColor(report.overall_score) }}
                  >
                    <span style={{ color: scoreColor(report.overall_score) }}>{report.overall_score}</span>
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
