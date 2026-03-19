import { Check, Lock } from 'lucide-react'
import { MpesaLogo, TigoPesaLogo, VisaLogo, MastercardLogo } from '@/components/ui/PaymentIcons'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/lib/translations'
import styles from './Pricing.module.css'

export default function Pricing() {
  const { language } = useLanguageStore()
  const t = translations[language].pricing

  const activeTiers = [
    {
      id: 'single',
      name: t.tier1,
      priceTZS: '25,000',
      priceUSD: '~$10',
      features: t.featuresList1,
    },
    {
      id: 'double',
      name: t.tier2,
      priceTZS: '40,000',
      priceUSD: '~$16',
      savings: t.savings2,
      popular: true,
      features: t.featuresList2,
    },
    {
      id: 'triple',
      name: t.tier3,
      priceTZS: '55,000',
      priceUSD: '~$22',
      savings: t.savings3,
      bestDeal: true,
      features: t.featuresList3,
    },
  ]

  return (
    <section className={styles.section} id="pricing-section">
      <div className="container">
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.subtitle}>
          {t.subtitle}
        </p>

        <div className={styles.grid}>
          {activeTiers.map((tier) => (
            <div
              key={tier.id}
              className={`${styles.card} ${tier.popular ? styles.popular : ''}`}
              id={`pricing-${tier.id}`}
            >
              {tier.savings && (
                <span className={styles.savingsBadge}>{tier.savings}</span>
              )}
              {tier.bestDeal && (
                <span className={styles.bestDealBadge}>{t.bestDeal}</span>
              )}
              <h3 className={styles.tierName}>{tier.name}</h3>
              <div className={styles.priceBlock}>
                <span className={styles.priceTZS}>TZS {tier.priceTZS}</span>
                <span className={styles.priceUSD}>{tier.priceUSD}</span>
              </div>
              <ul className={styles.features}>
                {tier.features.map((f, i) => (
                  <li key={i}><Check size={16} className={styles.checkIcon} /> {f}</li>
                ))}
              </ul>
              <button className="btn-primary" style={{ width: '100%' }} id={`buy-${tier.id}`}>
                {t.buyBtn}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.paymentInfo}>
          <Lock size={14} style={{ marginRight: '4px' }} /> {t.securePayment}
          <span style={{ display: 'inline-flex', gap: '8px', alignItems: 'center', marginLeft: '6px' }}>
            <MpesaLogo />
            <TigoPesaLogo />
            <VisaLogo />
            <MastercardLogo />
          </span>
        </div>
      </div>
    </section>
  )
}
