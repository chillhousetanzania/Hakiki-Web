'use client'

import { Shield, Languages, CheckCircle, BarChart3, Zap, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguageStore } from '@/store/languageStore'
import Navbar from '@/components/Navbar'
import { useState, useEffect } from 'react'
import styles from './business.module.css'

const dealerBenefits = [
  { iconEn: '🔍', titleEn: 'Detect damaged cars', titleSw: 'Gundua magari yenye uharibifu', descEn: 'Access 330M+ damage records to spot unreported accidents, floods, and structural damage before listing.', descSw: 'Fikia rekodi za uharibifu 330M+ kugundua ajali, mafuriko, na uharibifu wa muundo kabla ya kuorodhesha.' },
  { iconEn: '📊', titleEn: 'Verify real mileage', titleSw: 'Thibitisha maileji halisi', descEn: 'Cross-reference odometer readings from 1,000+ data sources across 45+ countries to catch rollbacks.', descSw: 'Linganisha masomo ya odometer kutoka vyanzo 1,000+ katika nchi 45+ kugundua udanganyifu.' },
  { iconEn: '🛡️', titleEn: 'Protect your reputation', titleSw: 'Linda sifa yako', descEn: 'Display the "CarHakiki Verified" badge on your listings to build instant buyer trust and close deals faster.', descSw: 'Onyesha beji ya "CarHakiki Verified" kwenye matangazo yako kujenga imani na kufunga miamala haraka.' },
  { iconEn: '⚡', titleEn: 'Sell 21% faster', titleSw: 'Uza haraka 21%', descEn: 'Cars with verified history reports sell significantly faster. Buyers trust transparent sellers.', descSw: 'Magari yenye ripoti za historia zilizothibitishwa yanauzwa haraka zaidi. Wanunuzi wanaamini wauzaji wazi.' },
]

const businessPlans = [
  { reports: 10, priceEn: 'TZS 18,000', priceSw: 'TZS 18,000', per: '/report', label: '' },
  { reports: 30, priceEn: 'TZS 15,000', priceSw: 'TZS 15,000', per: '/report', label: '' },
  { reports: 100, priceEn: 'TZS 12,000', priceSw: 'TZS 12,000', per: '/report', label: 'Best value' },
]

const apiFeatures = [
  { titleEn: 'Full Report REST API', titleSw: 'API ya Ripoti Kamili', descEn: 'Access complete vehicle history reports programmatically via RESTful endpoints.', descSw: 'Fikia ripoti kamili za historia ya gari kwa njia ya programu kupitia API.' },
  { titleEn: 'Real-time Webhooks', titleSw: 'Webhooks za Wakati Halisi', descEn: 'Get instant notifications when report data is ready — no polling needed.', descSw: 'Pata arifa za papo hapo data ya ripoti inapokuwa tayari.' },
  { titleEn: 'Free VIN Decoder', titleSw: 'Msimbaji VIN Bure', descEn: 'Start with our free VIN decoder API — decode make, model, year, and specs at no cost.', descSw: 'Anza na API yetu ya msimbaji VIN bure — tambua aina, mfano, mwaka, na vipimo bila malipo.' },
]

export default function BusinessPage() {
  const { language } = useLanguageStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(handle)
  }, [])

  const isEn = !mounted || language === 'en'

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className={styles.badge}>{isEn ? 'For Dealers & Businesses' : 'Kwa Wafanyabiashara'}</span>
            <h1>{isEn ? 'Detect damaged cars, mileage rollbacks, and other tricks' : 'Gundua magari yenye uharibifu, udanganyifu wa maileji, na hila nyingine'}</h1>
            <p>{isEn ? 'Give your buyers confidence with verified vehicle history reports. Protect your dealership and sell faster with transparent data.' : 'Wape wanunuzi wako ujasiri na ripoti za historia ya gari zilizothibitishwa. Linda biashara yako na uze haraka na data ya uwazi.'}</p>
            <Link href="/#pricing-section" className={styles.ctaBtn}>
              {isEn ? 'See Business Plans' : 'Tazama Mipango ya Biashara'} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{isEn ? 'Why dealers choose CarHakiki' : 'Kwa nini wafanyabiashara wanachagua CarHakiki'}</h2>
          <div className={styles.benefitsGrid}>
            {dealerBenefits.map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{b.iconEn}</div>
                <h3>{isEn ? b.titleEn : b.titleSw}</h3>
                <p>{isEn ? b.descEn : b.descSw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Pricing */}
      <section className={styles.pricingSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            {isEn ? 'Business pricing — bulk discounts' : 'Bei za biashara — punguzo kwa wingi'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isEn ? 'No long-term contracts. Reports valid for 6 months. Cancel anytime.' : 'Hakuna mikataba ya muda mrefu. Ripoti zinatumika kwa miezi 6. Ghairi wakati wowote.'}
          </p>
          <div className={styles.plansGrid}>
            {businessPlans.map((p, i) => (
              <div key={i} className={`${styles.planCard} ${p.label ? styles.bestValue : ''}`}>
                {p.label && <div className={styles.planBadge}>{p.label}</div>}
                <div className={styles.planReports}>{p.reports} {isEn ? 'Reports' : 'Ripoti'}</div>
                <div className={styles.planPrice}>{p.priceEn} <span>{p.per}</span></div>
                <Link href="/" className={styles.planBtn}>{isEn ? 'Get Started' : 'Anza'}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className={styles.apiSection}>
        <div className="container">
          <div className={styles.apiHeader}>
            <span className={styles.badge}>{isEn ? 'For Developers' : 'Kwa Waendelezaji'}</span>
            <h2>{isEn ? 'Integrate vehicle history data via API' : 'Unganisha data ya historia ya gari kupitia API'}</h2>
            <p>{isEn ? 'Build vehicle history checks directly into your platform — whether you&apos;re a classified site, fintech app, or insurance company.' : 'Jenga ukaguzi wa historia ya gari moja kwa moja kwenye jukwaa lako.'}</p>
          </div>
          <div className={styles.apiGrid}>
            {apiFeatures.map((f, i) => (
              <div key={i} className={styles.apiCard}>
                <Zap size={24} className={styles.apiIcon} />
                <h3>{isEn ? f.titleEn : f.titleSw}</h3>
                <p>{isEn ? f.descEn : f.descSw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.bottomCta}>
        <div className={`container ${styles.ctaInner}`}>
          <h2>{isEn ? 'Ready to protect your business?' : 'Tayari kulinda biashara yako?'}</h2>
          <p>{isEn ? 'Join hundreds of Tanzanian car dealers using CarHakiki to verify their inventory and sell with confidence.' : 'Jiunge na mamia ya wafanyabiashara wa magari wa Tanzania wanaotumia CarHakiki kuthibitisha bidhaa zao.'}</p>
          <Link href="/" className={styles.ctaBtnWhite}>{isEn ? 'Start checking cars →' : 'Anza kuhakiki magari →'}</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.footerBrand}><Shield size={20} /><span>CarHakiki</span></div>
          <p>© {new Date().getFullYear()} CarHakiki. {isEn ? 'All rights reserved.' : 'Haki zote zimehifadhiwa.'}</p>
        </div>
      </footer>
    </main>
  )
}
