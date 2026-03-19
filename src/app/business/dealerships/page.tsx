'use client'

import Navbar from '@/components/Navbar'
import { Shield, CheckCircle, BarChart3, Zap, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useLanguageStore } from '@/store/languageStore'
import styles from './dealerships.module.css'

const benefits = [
  { icon: <Shield size={24} className={styles.iconElement} />, titleEn: 'Protect your reputation', titleSw: 'Linda sifa yako', descEn: 'Display the "Hakiki Verified" badge on your inventory. Buyers trust transparent dealers, helping you sell 21% faster on average.', descSw: 'Onyesha beji ya "Hakiki Verified" kwenye magari yako. Wanunuzi wanaamini wauzaji wazi.' },
  { icon: <CheckCircle size={24} className={styles.iconElement} />, titleEn: 'Detect hidden damage', titleSw: 'Gundua uharibifu uliofichwa', descEn: 'Filter out bad inventory before you buy. We scan 330M+ damage records from global auctions, insurance, and police databases.', descSw: 'Chuja magari mabaya kabla hujanunua kwa kutumia data zetu za kimataifa.' },
  { icon: <BarChart3 size={24} className={styles.iconElement} />, titleEn: 'Verify true mileage', titleSw: 'Thibitisha maileji ya kweli', descEn: 'Protect yourself from costly import scams. We cross-reference historical odometer readings to flag rollbacks instantly.', descSw: 'Jilinde dhidi ya utapeli wa kuagiza magari kwa kuhakiki maileji kihistoria.' },
  { icon: <Zap size={24} className={styles.iconElement} />, titleEn: 'Automate via API', titleSw: 'Fanya kiotomatiki (API)', descEn: 'Seamlessly integrate Hakiki reports directly into your dealership CRM or website frontend with our REST API.', descSw: 'Unganisha ripoti za Hakiki moja kwa moja kwenye tovuti yako.' },
]

export default function DealershipsPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              {isEn ? 'B2B Solutions' : 'Suluhisho za B2B'}
            </span>
            <h1 className={styles.heroTitle}>
              {isEn ? 'Sell cars faster with verified history reports' : 'Uza magari haraka kwa ripoti zilizothibitishwa'}
            </h1>
            <p className={styles.heroDesc}>
              {isEn 
                ? 'Give your buyers confidence. Protect your dealership from bad inventory and finalize deals 21% faster by proving your cars are clean with Hakiki.' 
                : 'Wape wanunuzi wako ujasiri. Linda biashara yako dhidi ya magari mabaya na funga miamala 21% haraka zaidi.'}
            </p>
            <div className={styles.heroActions}>
              <a href="#b2b-contact" className={styles.primaryBtn}>
                {isEn ? 'Get Dealer Pricing' : 'Pata Bei za Wafanyabiashara'}
              </a>
              <a href="/sample-report" className={styles.secondaryBtn}>
                {isEn ? 'View Sample Report' : 'Tazama Ripoti ya Mfano'}
              </a>
            </div>
            <div className={styles.heroTrust}>
              <CheckCircle size={16} /> 
              <span>{isEn ? 'Bulk discounts available' : 'Punguzo kwa wingi linapatikana'}</span>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.visualCard}>
              <div className={styles.cardHeader}>
                <div className={styles.dots}><span></span><span></span><span></span></div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.reportMockup}>
                  <div className={styles.mockupTitle}>Toyota Land Cruiser Prado</div>
                  <div className={styles.mockupVin}>VIN: JTEBX3FJ50KXXXXXX</div>
                  <div className={styles.statusRow}>
                    <div className={`${styles.statusPill} ${styles.clean}`}>
                      <CheckCircle size={14} /> Mileage Verified
                    </div>
                    <div className={`${styles.statusPill} ${styles.flagged}`}>
                      <Zap size={14} /> Damage Found
                    </div>
                  </div>
                  <div className={styles.chartMockup}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS GRID */}
      <section className={styles.benefitsSection}>
        <div className={`container ${styles.benefitsInner}`}>
          <h2 className={styles.sectionTitle}>
            {isEn ? 'Why top dealerships choose Hakiki' : 'Kwa nini wafanyabiashara bora wanachagua Hakiki'}
          </h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, i) => (
              <div key={i} className={styles.benefitCard}>
                <div className={styles.iconWrap}>{benefit.icon}</div>
                <h3 className={styles.benefitTitle}>{isEn ? benefit.titleEn : benefit.titleSw}</h3>
                <p className={styles.benefitDesc}>{isEn ? benefit.descEn : benefit.descSw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER PLACEHOLDER */}
      <footer className={styles.footerSimple}>
        <div className="container">
          © {new Date().getFullYear()} Hakiki. {isEn ? 'For Dealerships.' : 'Kwa Wafanyabiashara.'}
        </div>
      </footer>
    </main>
  )
}
