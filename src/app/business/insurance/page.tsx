'use client'

import Navbar from '@/components/Navbar'
import { Shield, Search, FileText, Zap, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguageStore } from '@/store/languageStore'
import styles from './insurance.module.css'

const useCases = [
  { icon: <Search size={24} className={styles.iconStyle} />, titleEn: 'Claims Investigation', titleSw: 'Uchunguzi wa Madai', descEn: 'Instantly check if damage was pre-existing before the policy started. Cross-reference our 330M+ global damage records.', descSw: 'Hakiki mara moja ikiwa uharibifu ulikuwepo kabla ya bima kuanza.' },
  { icon: <Shield size={24} className={styles.iconStyle} />, titleEn: 'Fraud Prevention', titleSw: 'Kuzuia Utapeli', descEn: 'Detect stolen vehicles, cloned VINs, and manipulated odometer readings during the underwriting process.', descSw: 'Gundua magari ya wizi, VIN zilizobadilishwa, na udanganyifu wa maileji.' },
  { icon: <FileText size={24} className={styles.iconStyle} />, titleEn: 'Policy Underwriting', titleSw: 'Utoaji wa Sera', descEn: 'Accurately price policies by knowing the true historical condition, import route, and exact factory specifications.', descSw: 'Panga bei za sera kwa usahihi kwa kujua hali ya kihistoria ya gari.' },
  { icon: <Zap size={24} className={styles.iconStyle} />, titleEn: 'Automated Processing', titleSw: 'Uchakataji Kiotomatiki', descEn: 'Integrate our REST API into your claims management software to instantly flag high-risk vehicles.', descSw: 'Unganisha API yetu kwenye programu yako ya usimamizi wa madai.' },
]

export default function InsurancePage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className={styles.categoryBadge}>{isEn ? 'For Insurance' : 'Kwa Makampuni ya Bima'}</span>
            <h1 className={styles.heroTitle}>
              {isEn ? 'Prevent fraud and validate claims with global vehicle data' : 'Zuia utapeli na thibitisha madai kwa data ya kimataifa'}
            </h1>
            <p className={styles.heroDesc}>
              {isEn 
                ? 'Empower your claims adjusters and underwriters. Access historical damage photos, theft records, and rollback data before finalizing a payout.'
                : 'Wawezeshe wachunguzi wako wa madai. Fikia picha za uharibifu za kihistoria na rekodi za wizi kabla ya kufanya malipo.'}
            </p>
            <div className={styles.actionGroup}>
              <a href="#contact-sales" className={styles.primaryBtn}>
                {isEn ? 'Contact Sales' : 'Wasiliana na Mauzo'}
              </a>
              <Link href="/business/api-integration" className={styles.textLink}>
                {isEn ? 'View API Docs' : 'Tazama Nyaraka za API'} <ChevronRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.floatingUI}>
              <div className={styles.uiHeader}>
                <div className={styles.claimId}>CLAIM #8849-TZ</div>
                <div className={styles.claimStatus}>{isEn ? 'Flagged' : 'Imetiliwa Shaka'}</div>
              </div>
              <div className={styles.uiBody}>
                <div className={styles.uiRow}>
                  <span className={styles.uiLabel}>{isEn ? 'Stated Condition:' : 'Hali Iliyoelezwa:'}</span>
                  <span className={styles.uiValue}>Clean</span>
                </div>
                <div className={styles.uiRowAlert}>
                  <span className={styles.uiLabelAlert}>CarHakiki Discovery:</span>
                  <span className={styles.uiValueAlert}>Structural Damage (2021)</span>
                </div>
                <div className={styles.imgPlaceholder}>
                  {isEn ? 'Past Auction Photo Recovered' : 'Picha ya Mnada wa Zamani Imepatikana'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className={styles.casesSection}>
        <div className="container">
          <div className={styles.casesHeader}>
            <h2 className={styles.sectionTitle}>{isEn ? 'Drive efficiency across your operations' : 'Ongeza ufanisi katika shughuli zako'}</h2>
          </div>
          <div className={styles.casesGrid}>
            {useCases.map((uc, i) => (
              <div key={i} className={styles.caseCard}>
                <div className={styles.iconCircle}>{uc.icon}</div>
                <h3 className={styles.caseTitle}>{isEn ? uc.titleEn : uc.titleSw}</h3>
                <p className={styles.caseDesc}>{isEn ? uc.descEn : uc.descSw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={styles.ctaBanner}>
        <div className={`container ${styles.ctaInner}`}>
          <h2>{isEn ? 'Ready to minimize your loss ratio?' : 'Uko tayari kupunguza uwiano wako wa hasara?'}</h2>
          <p>{isEn ? 'Join leading East African insurers using CarHakiki data to underwrite smarter.' : 'Jiunge na makampuni ya bima yanayoongoza Afrika Mashariki yanayotumia data ya CarHakiki.'}</p>
          <Link href="/contact" className={styles.whiteBtn}>{isEn ? 'Request a Demo' : 'Omba Demo'}</Link>
        </div>
      </section>

      <footer className={styles.simpleFooter}>
        <div className="container">© {new Date().getFullYear()} CarHakiki B2B.</div>
      </footer>
    </main>
  )
}
