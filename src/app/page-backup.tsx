'use client'

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { Shield, Check, X, AlertTriangle, ShieldAlert, Gauge, FileSearch, Users } from 'lucide-react'
import VinInput from '@/components/home/VinInput'
import Navbar from '@/components/Navbar'
import styles from './page.module.css'

const features = [
  {
    Icon: ShieldAlert,
    title: 'Accident Records',
    desc: 'Deep-level scanning for structural repairs, airbag deployments, and salvage records that standard reports miss.',
  },
  {
    Icon: Gauge,
    title: 'Odometer Verification',
    desc: 'Statistical analysis to identify potential rollbacks or discrepancies in mileage reporting history.',
  },
  {
    Icon: FileSearch,
    title: 'Title History',
    desc: "Trace ownership across all countries, detecting brands like 'Flood', 'Fire', or 'Salvage' history.",
  },
  {
    Icon: Users,
    title: 'Ownership Logs',
    desc: 'Comprehensive ownership history including country-by-country import trail and registration changes.',
  },
]

const processSteps = [
  {
    num: '01',
    title: 'Enter VIN',
    desc: 'Input the unique 17-character vehicle identification number found on the dash or door jamb.',
  },
  {
    num: '02',
    title: 'Deep Scan',
    desc: 'Our algorithms query national insurance, police, and auction databases in real-time across 45+ countries.',
  },
  {
    num: '03',
    title: 'Get Report',
    desc: "Download a comprehensive PDF report detailing every recorded event in the car's history.",
  },
]

export default function Home() {
  const [loading, setLoading] = useState(false)

  const handleVinSubmit = async (vin: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/vin-precheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vin }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        alert(data.error || 'Failed to check VIN. Please try again.')
        return
      }
      sessionStorage.setItem('precheck', JSON.stringify(data))
      window.location.href = '/report/preview'
    } catch {
      alert('Connection error. Please check your internet and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <h1 className={styles.heroTitle}>
                Unlock the <span className={styles.accent}>Full History</span> of Any Vehicle
              </h1>
              <p className={styles.heroSubtitle}>
                Access digital forensic records including structural damage, odometer discrepancies, and proprietary ownership logs in seconds.
              </p>
              <div className={styles.heroInputWrap}>
                <VinInput
                  onSubmit={handleVinSubmit}
                  loading={loading}
                  placeholder="ENTER 17-DIGIT VIN"
                  buttonLabel="Check VIN"
                />
              </div>
              <div className={styles.trustRow}>
                <span className={styles.trustItem}>
                  <Check size={13} strokeWidth={3} className={styles.trustCheck} />
                  Instant Scanned Results
                </span>
                <span className={styles.trustItem}>
                  <Check size={13} strokeWidth={3} className={styles.trustCheck} />
                  NMVTIS Verified
                </span>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroCard}>
                <p className={styles.heroCardLabel}>LAST SCAN RESULT</p>
                <div className={styles.heroCardImg}>
                  <Image
                    src="/hero-cars-v5.png"
                    alt="Sample scanned vehicle"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority
                    unoptimized
                  />
                </div>
                <div className={styles.heroCardFooter}>
                  <span className={styles.heroCardName}>2023 Toyota Land Cruiser</span>
                  <span className={styles.heroCardSample}>SAMPLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DATA PROVIDERS ── */}
      <section className={styles.providers}>
        <div className="container">
          <p className={styles.providersLabel}>AUTHORIZED DATA PROVIDERS</p>
          <div className={styles.providersList}>
            {['NMVTIS', 'NCB', 'NHTSA', 'J.D. POWER', 'ISO'].map(p => (
              <span key={p} className={styles.provider}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={styles.featuresSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>CarHakiki Diagnostic Modules</h2>
          <p className={styles.sectionSubtitle}>
            Advanced forensic analysis layers processed in real-time across national and international databases.
          </p>
          <div className={styles.featuresGrid}>
            {features.map(({ Icon, title, desc }, i) => (
              <div key={i} className={`${styles.featureCard} ${i === 3 ? styles.featureCardBlue : ''}`}>
                <div className={`${styles.featureIconWrap} ${i === 3 ? styles.featureIconWrapBlue : ''}`}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE DELIVERABLE ── */}
      <section className={styles.deliverableSection}>
        <div className="container">
          <div className={styles.deliverableInner}>
            <div className={styles.deliverableLeft}>
              <p className={styles.eyebrow}>THE DELIVERABLE</p>
              <h2 className={styles.deliverableTitle}>The Definitive Vehicle Ledger</h2>
              <p className={styles.deliverableDesc}>
                Our reports aren&apos;t just lists — they are structured forensic evaluations. We analyze patterns to provide a reliability score for every vehicle.
              </p>
              <ul className={styles.deliverableBullets}>
                <li>
                  <X size={15} className={styles.bulletX} />
                  <span>17-Point Structural Check — frame alignment and full repair history</span>
                </li>
                <li>
                  <Check size={15} className={styles.bulletCheck} />
                  <span>Manufacturer Safety Recall — live updates from NHTSA safety databases</span>
                </li>
              </ul>
            </div>
            <div className={styles.deliverableRight}>
              <div className={styles.reportCard}>
                <div className={styles.reportCardHeader}>
                  <span className={styles.reportId}>Report #HK-2024-TZ</span>
                  <span className={styles.reportBadgeGreen}>VEHICLE</span>
                </div>
                <div className={styles.reportStats}>
                  <div className={styles.reportStat}>
                    <span className={styles.reportStatLabel}>ODOMETER</span>
                    <span className={styles.reportStatValue}>89,420 <small>km</small></span>
                  </div>
                  <div className={styles.reportStat}>
                    <span className={styles.reportStatLabel}>OWNERS</span>
                    <span className={styles.reportStatValue}>2 <small>Total</small></span>
                  </div>
                </div>
                <div className={styles.reportRows}>
                  <div className={`${styles.reportRow} ${styles.reportRowSafe}`}>
                    <span className={styles.rowLeft}>
                      <Check size={13} className={styles.rowCheck} /> Title Record Clear
                    </span>
                    <span className={styles.rowTag}>NOT LIEN</span>
                  </div>
                  <div className={`${styles.reportRow} ${styles.reportRowSafe}`}>
                    <span className={styles.rowLeft}>
                      <Check size={13} className={styles.rowCheck} /> No Open Recalls
                    </span>
                    <span className={styles.rowTag}>SECURE</span>
                  </div>
                  <div className={`${styles.reportRow} ${styles.reportRowWarn}`}>
                    <AlertTriangle size={13} className={styles.rowWarnIcon} />
                    <span>Mileage Discrepancy Detected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE FORENSIC PROCESS ── */}
      <section className={styles.processSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>The Forensic Process</h2>
          <p className={styles.sectionSubtitle}>Simple execution. Complex analysis.</p>
          <div className={styles.processGrid}>
            {processSteps.map(step => (
              <div key={step.num} className={styles.processStep}>
                <span className={styles.processNum}>{step.num}</span>
                <h3 className={styles.processStepTitle}>{step.title}</h3>
                <p className={styles.processStepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Ready to See the Truth?</h2>
            <p className={styles.ctaSubtitle}>
              Don&apos;t risk thousands on a vehicle with a hidden past. Run your precision check now.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/#vin-input-form" className={styles.ctaBtn}>Start Your Search</Link>
              <Link href="/pricing" className={styles.ctaBtn}>View Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerBrandCol}>
              <div className={styles.footerLogo}>
                <Shield size={18} />
                <span>CarHakiki</span>
              </div>
              <p className={styles.footerTagline}>
                Defining the next generation of vehicle history intelligence. Forensic accuracy for every car buyer.
              </p>
            </div>
            <div className={styles.footerLinkCol}>
              <h4 className={styles.footerColHeading}>PRODUCT</h4>
              <Link href="/sample-report" className={styles.footerLink}>Vehicle Database</Link>
              <Link href="/pricing" className={styles.footerLink}>Solo Reports</Link>
              <Link href="/business/api-integration" className={styles.footerLink}>API Access</Link>
            </div>
            <div className={styles.footerLinkCol}>
              <h4 className={styles.footerColHeading}>LEGAL</h4>
              <Link href="/policies" className={styles.footerLink}>Privacy Policy</Link>
              <Link href="/terms-and-conditions" className={styles.footerLink}>Terms of Service</Link>
              <Link href="/contact" className={styles.footerLink}>Contact Support</Link>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© {new Date().getFullYear()} CARHAKIKI. DIGITAL FORENSICS SERVICE LTD.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
