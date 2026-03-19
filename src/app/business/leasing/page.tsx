'use client'

import Navbar from '@/components/Navbar'
import { Shield, TrendingUp, Clock, Settings, ArrowRight } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import styles from './leasing.module.css'

const leasingBenefits = [
  { icon: <TrendingUp size={24} className={styles.iconCore} />, titleEn: 'Protect residual value', titleSw: 'Linda thamani ya gari', descEn: 'Identify undisclosed accidents that severely drop your fleet\'s resale value before the lease ends.', descSw: 'Tambua ajali zilizofichwa zinazoshusha sana thamani ya mauzo ya gari kabla ya ukodishaji kuisha.' },
  { icon: <Clock size={24} className={styles.iconCore} />, titleEn: 'Monitor historical mileage', titleSw: 'Fuatilia maileji ya kihistoria', descEn: 'Cross-check actual mileage against lease contract limits. Ensure your lessees aren\'t illegally tampering with the odometer.', descSw: 'Hakiki maileji halisi dhidi ya mikataba ya ukodishaji. Hakikisha hawafanyi udanganyifu.' },
  { icon: <Settings size={24} className={styles.iconCore} />, titleEn: 'Fleet remarketing', titleSw: 'Uuzaji wa magari ya zamani', descEn: 'When it\'s time to sell your fleet, append a Hakiki Verified report to move units an average of 21% faster at higher margins.', descSw: 'Onyesha ripoti za Hakiki ili kuuza magari kwa bei nzuri na haraka.' },
]

export default function LeasingPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.heroWrap}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.textContent}>
            <div className={styles.eyebrow}>{isEn ? 'For Leasing & Fleet' : 'Kwa Ukodishaji na Meli za Magari'}</div>
            <h1 className={styles.heroTitle}>
              {isEn ? 'Protect your fleet\'s residual value' : 'Linda thamani ya magari yako ya kukodishwa'}
            </h1>
            <p className={styles.heroSubtitle}>
              {isEn 
                ? 'Automate fleet risk assessment. Monitor odometer tampering, unreported accidents, and maintenance gaps with the largest vehicle history database in East Africa.'
                : 'Fuatilia udanganyifu wa odometer na ajali zisizoripotiwa ukitumia kanzidata kubwa zaidi ya historia ya gari Afrika Mashariki.'}
            </p>
            <div className={styles.btnRow}>
              <a href="#contact" className={styles.btnSolid}>{isEn ? 'Get Fleet Pricing' : 'Pata Bei za Ukodishaji'}</a>
              <a href="/sample-report" className={styles.btnOutline}>{isEn ? 'View Sample Report' : 'Tazama Ripoti'}</a>
            </div>
          </div>
          
          <div className={styles.dataGraphic}>
            <div className={styles.glassCard}>
              <div className={styles.cardTop}>
                <strong>{isEn ? 'Fleet Unit #811 - Mileage Monitor' : 'Gari #811 - Ufuatiliaji wa Maileji'}</strong>
                <span className={styles.badgeDanger}>{isEn ? 'Discrepancy' : 'Tofauti'}</span>
              </div>
              <div className={styles.graphWrapper}>
                {/* CSS Graph Animation Placeholder */}
                <div className={styles.graphLine}></div>
                <div className={styles.dataPoint} style={{ bottom: '20%', left: '10%' }}><span>2022: 40k</span></div>
                <div className={styles.dataPoint} style={{ bottom: '40%', left: '40%' }}><span>2023: 85k</span></div>
                <div className={styles.dataPointDanger} style={{ bottom: '25%', left: '70%' }}><span>2024: 55k (Tampered)</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className="container">
          <h2 className={styles.featuresTitle}>{isEn ? 'Maximize profitability across your leasing lifecycle' : 'Ongeza faida katika mzunguko wote wa ukodishaji'}</h2>
          
          <div className={styles.cardsGrid}>
            {leasingBenefits.map((b, i) => (
              <div key={i} className={styles.benefitBox}>
                <div className={styles.iconWrapper}>{b.icon}</div>
                <h3>{isEn ? b.titleEn : b.titleSw}</h3>
                <p>{isEn ? b.descEn : b.descSw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.apiCta}>
        <div className="container">
          <h2>{isEn ? 'Integrate directly into your ERP' : 'Unganisha moja kwa moja kwenye ERP yako'}</h2>
          <p>{isEn ? 'Use our RESTful JSON API to instantly request and retrieve history reports for thousands of vehicles with a single call.' : 'Tumia API yetu ya msimbo kuomba na kupata ripoti za historia kwa maelfu ya magari kwa wakati mmoja.'}</p>
          <a href="/business/api-integration" className={styles.apiLink}>
            {isEn ? 'Explore API Documentation' : 'Chunguza Nyaraka za API'} <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} Hakiki B2B.</div>
      </footer>
    </main>
  )
}
