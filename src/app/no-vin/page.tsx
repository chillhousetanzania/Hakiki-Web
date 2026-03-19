'use client'

import { Shield, CheckCircle, Languages } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import Navbar from '@/components/Navbar'
import styles from './novin.module.css'

const plans = [
  {
    reports: 3,
    pricePerReport: 'TZS 15,000',
    totalPrice: 'TZS 45,000',
    originalPrice: 'TZS 75,000',
    discount: '-40%',
    popular: false,
    bestDeal: true,
  },
  {
    reports: 2,
    pricePerReport: 'TZS 20,000',
    totalPrice: 'TZS 40,000',
    originalPrice: 'TZS 50,000',
    discount: '-20%',
    popular: true,
    bestDeal: false,
  },
  {
    reports: 1,
    pricePerReport: 'TZS 25,000',
    totalPrice: 'TZS 25,000',
    originalPrice: '',
    discount: '',
    popular: false,
    bestDeal: false,
  },
]

export default function NoVinPage() {
  const { language, setLanguage } = useLanguageStore()

  const t = {
    en: {
      title: "No VIN yet? No problem",
      subtitle: "You don't need a VIN to get started. Choose your bundle today and check any vehicle's history whenever you're ready — your unused reports won't expire for 6 months.",
      benefitsTitle: "With Hakiki you may get:",
      benefits: [
        "Worry-free reports. No data in a report means an immediate credit refund",
        "Info about previous owners, accidents, theft and mileage records",
        "Vehicle's photos and how it looked in the past",
        "Maintenance and service history records"
      ],
      checkCars: "Check {n} cars",
      alsoCheck: "You can also check motorbikes, trucks, etc.",
      perReport: "/ report",
      totalPrice: "Total price",
      fullPrice: "Full price",
      youllGet: "You'll get {n} reports",
      mostPopular: "Most popular",
    },
    sw: {
      title: "Huna VIN bado? Hakuna shida",
      subtitle: "Huhitaji VIN kuanza. Chagua kifurushi chako leo na uhakiki historia ya gari lolote utakapokuwa tayari — ripoti zako ambazo hazijatumika hazitaisha kwa miezi 6.",
      benefitsTitle: "Na Hakiki unaweza kupata:",
      benefits: [
        "Ripoti zisizo na wasiwasi. Kama hakuna data kwenye ripoti unapata refundi mara moja",
        "Taarifa kuhusu wamiliki wa awali, ajali, wizi na rekodi za maileji",
        "Picha za gari na jinsi lilivyoonekana zamani",
        "Rekodi za matengenezo na huduma"
      ],
      checkCars: "Hakiki magari {n}",
      alsoCheck: "Unaweza pia kuhakiki pikipiki, lori, nk.",
      perReport: "/ ripoti",
      totalPrice: "Bei jumla",
      fullPrice: "Bei kamili",
      youllGet: "Utapata ripoti {n}",
      mostPopular: "Maarufu zaidi",
    }
  }

  const text = t[language]

  return (
    <main>
      <Navbar />

      {/* Content */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroLeft}>
            <h1>{text.title}</h1>
            <p>{text.subtitle}</p>
          </div>
          <div className={styles.heroRight}>
            <h3>{text.benefitsTitle}</h3>
            <ul>
              {text.benefits.map((b, i) => (
                <li key={i}>
                  <CheckCircle size={16} className={styles.checkIcon} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className={styles.pricingSection}>
        <div className={`container ${styles.pricingGrid}`}>
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`${styles.pricingCard} ${plan.popular ? styles.popular : ''}`}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>{text.mostPopular}</div>
              )}
              <div className={styles.cardTop}>
                <div className={styles.radioCircle}>
                  {plan.popular && <div className={styles.radioDot} />}
                </div>
                <div>
                  <div className={styles.cardTitle}>
                    {text.checkCars.replace('{n}', plan.reports.toString())}
                  </div>
                  <div className={styles.cardSubtitle}>{text.alsoCheck}</div>
                </div>
              </div>
              <div className={styles.price}>
                {plan.pricePerReport}
                <span className={styles.perReport}> {text.perReport}</span>
              </div>
              <div className={styles.totalRow}>
                <span>{plan.reports > 1 ? text.totalPrice : text.fullPrice} {plan.totalPrice}</span>
                {plan.originalPrice && (
                  <span className={styles.strikePrice}>{plan.originalPrice}</span>
                )}
              </div>
              {plan.discount && (
                <span className={styles.discountBadge}>{plan.discount}</span>
              )}
              <div className={styles.cardBottom}>
                ⓘ {text.youllGet.replace('{n}', plan.reports.toString())}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.footerBrand}>
            <Shield size={20} />
            <span>Hakiki</span>
          </div>
          <p>© {new Date().getFullYear()} Hakiki. {language === 'en' ? 'All rights reserved.' : 'Haki zote zimehifadhiwa.'}</p>
        </div>
      </footer>
    </main>
  )
}
