'use client'

import Navbar from '@/components/Navbar'
import { Check, Building, ArrowRight } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import styles from './b2b-pricing.module.css'

const pricingTiers = [
  {
    nameEn: 'Starter', nameSw: 'Kwanza',
    reports: 50,
    priceMzn: '150,000 TZS',
    descEn: 'Perfect for small independent dealerships.', descSw: 'Inafaa kwa wafanyabiashara wadogowadogo.',
    perReportEn: '3,000 TZS per report', perReportSw: 'TZS 3,000 kwa ripoti',
    popular: false
  },
  {
    nameEn: 'Professional', nameSw: 'Mtaalamu',
    reports: 200,
    priceMzn: '400,000 TZS',
    descEn: 'For established dealerships moving 10+ cars a week.', descSw: 'Kwa wafanyabiashara wanaouza magari 10+ kwa wiki.',
    perReportEn: '2,000 TZS per report', perReportSw: 'TZS 2,000 kwa ripoti',
    popular: true
  },
  {
    nameEn: 'Enterprise', nameSw: 'Biashara Kubwa',
    reports: 1000,
    priceMzn: '1,500,000 TZS',
    descEn: 'For large importers, leasing fleets, and insurance.', descSw: 'Kwa waagizaji wakubwa, meli za magari, na bima.',
    perReportEn: '1,500 TZS per report', perReportSw: 'TZS 1,500 kwa ripoti',
    popular: false
  }
]

export default function B2BPricingPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.headerSection}>
        <div className="container text-center">
          <div className={styles.badge}>{isEn ? 'Corporate Pricing' : 'Bei za Mashirika'}</div>
          <h1 className={styles.title}>
            {isEn ? 'Bulk reports. Bigger margins.' : 'Ripoti nyingi. Faida kubwa zaidi.'}
          </h1>
          <p className={styles.subtitle}>
            {isEn 
              ? 'Access the same comprehensive vehicle data as consumers, but at wholesale prices. Credits never expire.'
              : 'Pata data sawa na wateja wengine, lakini kwa bei ya jumla. Salio haliishi muda wake.'}
          </p>
        </div>
      </section>

      <section className={styles.pricingSection}>
        <div className={`container ${styles.grid}`}>
          {pricingTiers.map((tier, i) => (
            <div key={i} className={`${styles.card} ${tier.popular ? styles.cardPopular : ''}`}>
              {tier.popular && <div className={styles.popularBadge}>{isEn ? 'Most Popular' : 'Inayopendwa Zaidi'}</div>}
              <div className={styles.cardHeader}>
                <h3>{isEn ? tier.nameEn : tier.nameSw}</h3>
                <p>{isEn ? tier.descEn : tier.descSw}</p>
              </div>
              <div className={styles.cardPriceBox}>
                <div className={styles.reportCount}>{tier.reports} {isEn ? 'Reports' : 'Ripoti'}</div>
                <div className={styles.price}>{tier.priceMzn}</div>
                <div className={styles.perReport}>{isEn ? tier.perReportEn : tier.perReportSw}</div>
              </div>
              <div className={styles.cardFeatures}>
                <ul>
                  <li><Check size={18} className={styles.checkIcon} /> {isEn ? 'Unlimited API access' : 'Ufikiaji wa API bila kikomo'}</li>
                  <li><Check size={18} className={styles.checkIcon} /> {isEn ? 'Dedicated account manager' : 'Meneja wa akaunti maalum'}</li>
                  <li><Check size={18} className={styles.checkIcon} /> {isEn ? 'Whitelabel PDF export' : 'Usafirishaji wa PDF wenye chapa yako'}</li>
                  <li><Check size={18} className={styles.checkIcon} /> {isEn ? 'Credits never expire' : 'Salio haliishi muda wake'}</li>
                </ul>
              </div>
              <a href="/contact" className={tier.popular ? styles.btnPrimary : styles.btnSecondary}>
                {isEn ? 'Buy Credits' : 'Nunua Salio'}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.customSection}>
        <div className={`container ${styles.customInner}`}>
          <div className={styles.customText}>
            <h2>{isEn ? 'Need more than 1,000 reports a month?' : 'Unahitaji ripoti zaidi ya 1,000 kwa mwezi?'}</h2>
            <p>{isEn ? 'We offer custom enterprise contracts for major insurance firms, national dealership networks, and API aggregators.' : 'Tunatoa mikataba maalum kwa makampuni makubwa.'}</p>
          </div>
          <a href="/contact" className={styles.ctaContact}>
            <Building size={20} />
            {isEn ? 'Contact Sales' : 'Wasiliana na Mauzo'} <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} Hakiki B2B Pricing.</div>
      </footer>
    </main>
  )
}
