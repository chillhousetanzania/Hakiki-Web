'use client'

import Navbar from '@/components/Navbar'
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'
import { useLanguageStore } from '@/store/languageStore'
import styles from './pricing.module.css'

const consumerTiers = [
  {
    id: 'single',
    titleEn: '1 Report', titleSw: 'Ripoti 1',
    price: '30,000 TZS',
    perReportEn: '30,000 / report', perReportSw: '30,000 / ripoti',
    savingsEn: '', savingsSw: '',
    popular: false
  },
  {
    id: 'double',
    titleEn: '2 Reports', titleSw: 'Ripoti 2',
    price: '45,000 TZS',
    perReportEn: '22,500 / report', perReportSw: '22,500 / ripoti',
    savingsEn: 'Save 25%', savingsSw: 'Okoa 25%',
    popular: true
  },
  {
    id: 'triple',
    titleEn: '3 Reports', titleSw: 'Ripoti 3',
    price: '60,000 TZS',
    perReportEn: '20,000 / report', perReportSw: '20,000 / ripoti',
    savingsEn: 'Save 33%', savingsSw: 'Okoa 33%',
    popular: false
  }
]

export default function PricingPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.heroSection}>
        <div className="container center-text">
          <h1 className={styles.title}>
            {isEn ? 'Transparent pricing. No hidden fees.' : 'Bei za wazi. Hakuna ada zilizofichwa.'}
          </h1>
          <p className={styles.subtitle}>
            {isEn 
              ? 'Choose a package that fits your needs. Buy multiple reports to save more. Credits never expire.'
              : 'Chagua kifurushi kinachokufaa. Nunua ripoti nyingi ili kuokoa zaidi. Salio haliishi muda wake.'}
          </p>
        </div>
      </section>

      <section className={styles.pricingSection}>
        <div className={`container ${styles.gridContainer}`}>
          {consumerTiers.map((tier) => (
            <div key={tier.id} className={`${styles.pricingCard} ${tier.popular ? styles.popularCard : ''}`}>
              {tier.popular && <div className={styles.popularTag}>{isEn ? 'Best Value' : 'Thamani Bora'}</div>}
              <div className={styles.cardHeader}>
                <h2>{isEn ? tier.titleEn : tier.titleSw}</h2>
                {tier.savingsEn && <span className={styles.savingsBadge}>{isEn ? tier.savingsEn : tier.savingsSw}</span>}
              </div>
              
              <div className={styles.priceContainer}>
                <div className={styles.totalPrice}>{tier.price}</div>
                <div className={styles.perReportPrice}>{isEn ? tier.perReportEn : tier.perReportSw}</div>
              </div>

              <div className={styles.btnWrapper}>
                <Link href="/no-vin" className={tier.popular ? styles.buyBtnPopular : styles.buyBtn}>
                  {isEn ? 'Get Reports' : 'Pata Ripoti'}
                </Link>
              </div>

              <div className={styles.divider}></div>

              <ul className={styles.featuresList}>
                <li><CheckCircle2 size={18} className={styles.check} /> {isEn ? 'Instant delivery' : 'Uwasilishaji wa papo hapo'}</li>
                <li><CheckCircle2 size={18} className={styles.check} /> {isEn ? 'Damage & accident check' : 'Ukaguzi wa ajali na uharibifu'}</li>
                <li><CheckCircle2 size={18} className={styles.check} /> {isEn ? 'Odometer rollback check' : 'Ukaguzi wa wizi wa maileji'}</li>
                <li><CheckCircle2 size={18} className={styles.check} /> {isEn ? 'Theft records globally' : 'Rekodi za wizi duniani kote'}</li>
                <li><CheckCircle2 size={18} className={styles.check} /> {isEn ? 'Historical photos' : 'Picha za kihistoria'}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.trustBox}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><ShieldCheck size={32} /></div>
              <h3>{isEn ? 'Secure Payments' : 'Malipo Salama'}</h3>
              <p>{isEn ? 'We use encrypted 256-bit SSL connections for all transactions.' : 'Tunatumia miunganisho salama ya SSL kwa miamala yote.'}</p>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><Zap size={32} /></div>
              <h3>{isEn ? 'Instant Access' : 'Ufikiaji wa Papo Hapo'}</h3>
              <p>{isEn ? 'Reports are generated and available in your dashboard instantly.' : 'Ripoti zinazalishwa na kupatikana kwenye dashibodi yako papo hapo.'}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">
           {isEn ? 'Need enterprise pricing? ' : 'Unahitaji bei za biashara? '}
           <Link href="/business/b2b-pricing" className={styles.footerLink}>{isEn ? 'Go to B2B Pricing' : 'Nenda kwenye Bei za B2B'}</Link>
        </div>
      </footer>
    </main>
  )
}
