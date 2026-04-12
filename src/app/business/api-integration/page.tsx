'use client'

import Navbar from '@/components/Navbar'
import { CheckCircle2, Terminal, Shield, Zap, Database, ArrowRight, Code2 } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import styles from './api-integration.module.css'

export default function ApiIntegrationPage() {
  const { language } = useLanguageStore()

  const isEn = language === 'en'

  const features = [
    {
      icon: <Database size={24} />,
      titleEn: 'Native JDM Chassis Support',
      titleSw: 'Msaada wa Chasi za JDM',
      descEn: 'Unlike global decoders that require 17-character VINs, our API natively parses 9-12 character Japanese chassis numbers (e.g., AGH30W-0018105).',
      descSw: 'Tofauti na wengine, API yetu inasoma namba za chasi za Japan za herufi 9-12 (mfano, AGH30W-0018105).',
    },
    {
      icon: <CheckCircle2 size={24} />,
      titleEn: 'Deep Auction Integration',
      titleSw: 'Muunganiko wa Minada',
      descEn: 'Access exact auction grades, inspector notes, and historical export photos directly from USS and JAA auction houses.',
      descSw: 'Pata madaraja halisi ya mnada, rekodi za wakaguzi, na picha za kihistoria kutoka minada ya USS na JAA.',
    },
    {
      icon: <Shield size={24} />,
      titleEn: 'Global Theft & Interpol',
      titleSw: 'Wizi wa Kanda na Interpol',
      descEn: 'Real-time database pings against UK MIAFTR, EU Police, and Japanese registries to flag stolen or radioactive inventory.',
      descSw: 'Kaguzi za wakati halisi kwenye kanzidata za MIAFTR ya Uingereza, Polisi ya EU, na Japan kuzuia magari ya wizi.',
    },
    {
      icon: <Zap size={24} />,
      titleEn: '99.99% Uptime SLA',
      titleSw: 'Upatikanaji wa 99.99%',
      descEn: 'Enterprise-grade reliability with millisecond response times, built to power Tanzania\'s largest classifieds and insurers.',
      descSw: 'Uhakika wa kiwango cha kibiashara na majibu ya haraka sana, iliyojengwa kuendesha makampuni makubwa ya bima Tanzania.',
    },
  ]

  const pricingTiers = [
    {
      volume: '100 - 500',
      priceEn: '$15 / report',
      priceSw: 'TZS 38,000 / rekodi',
      targetEn: 'Small Dealerships',
      targetSw: 'Maduka Madogo'
    },
    {
      volume: '501 - 2,000',
      priceEn: '$12 / report',
      priceSw: 'TZS 30,000 / rekodi',
      targetEn: 'Mid-size Importers',
      targetSw: 'Waagizaji wa Kati',
      featured: true
    },
    {
      volume: '2,000+',
      priceEn: '$10 / report',
      priceSw: 'TZS 25,000 / rekodi',
      targetEn: 'Enterprise / Insurance',
      targetSw: 'Makampuni ya Bima'
    }
  ]

  // Mock JSON payload reflecting the actual OTOFACTS data structure we discussed
  const codeSnippet = `{
  "status": "success",
  "data": {
    "vehicle": {
      "chassisCode": "AGH30-0018105",
      "make": "Toyota",
      "model": "Alphard",
      "year": 2016
    },
    "jdmData": {
      "auctionHouse": "USS Tokyo",
      "auctionGrade": "4",
      "interiorGrade": "B",
      "recordedMileage": 42000,
      "accidentHistory": false,
      "radioactiveTest": "Passed"
    },
    "alerts": {
      "mileageAnomalyDetected": false,
      "isStolen": false
    },
    "media": {
      "auctionImages": [
        "https://api.carhakiki.co.tz/images/v1/agh30-front.jpg",
        "https://api.carhakiki.co.tz/images/v1/agh30-sheet.jpg"
      ]
    }
  }
}`

  return (
    <main className={styles.main} suppressHydrationWarning>
      <Navbar />

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <div className={styles.badge}>{isEn ? 'CarHakiki for Developers' : 'CarHakiki kwa Wasanidi'}</div>
            <h1>
              {isEn ? 'Power your platform with' : 'Imarisha mfumo wako na'} <br/>
              <span className={styles.highlight}>{isEn ? 'East Africa\'s best vehicle data' : 'data bora za magari Afrika Mashariki'}</span>
            </h1>
            <p className={styles.heroSubtitle}>
              {isEn 
                ? 'Automate vehicle valuations, detect fraud, and verify Japanese chassis numbers instantly with our Enterprise REST API.'
                : 'Fanya tathmini za magari moja kwa moja, zuia udanganyifu, na uhakiki namba za chasi za Japan haraka kupitia API yetu.'}
            </p>
            <div className={styles.ctaGroup}>
              <button className={styles.primaryBtn}>
                {isEn ? 'Request API Keys' : 'Omba Vifunguo vya API'} <ArrowRight size={18} />
              </button>
              <button className={styles.secondaryBtn}>
                {isEn ? 'Read Documentation' : 'Soma Nyaraka'} <Terminal size={18} />
              </button>
            </div>
          </div>

          {/* CODE WINDOW */}
          <div className={styles.codeWindow}>
            <div className={styles.codeHeader}>
              <div className={styles.dots}><span></span><span></span><span></span></div>
              <div className={styles.codeTitle}>GET /v1/vehicles/decode?chassis=AGH30-0018105</div>
            </div>
            <pre className={styles.codeBlock}>
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>{isEn ? 'Why build with CarHakiki?' : 'Kwa nini ujenge na CarHakiki?'}</h2>
            <p>{isEn ? 'We solved the data fragmentation problem for imported vehicles.' : 'Tumetatua changamoto ya data zilizotawanyika kwa magari yaliyoingizwa nchini.'}</p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feat, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feat.icon}</div>
                <h3>{isEn ? feat.titleEn : feat.titleSw}</h3>
                <p>{isEn ? feat.descEn : feat.descSw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className={styles.pricingSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>{isEn ? 'Volume Pricing for Enterprise' : 'Bei za Jumla kwa Makampuni'}</h2>
            <p>{isEn ? 'High margins. No hidden fees. Pay only for successful decodes.' : 'Faida kubwa. Hakuna ada zilizojificha. Lipia tu data zilizopatikana.'}</p>
          </div>

          <div className={styles.pricingGrid}>
            {pricingTiers.map((tier, i) => (
              <div key={i} className={`${styles.pricingCard} ${tier.featured ? styles.featuredCard : ''}`}>
                {tier.featured && <div className={styles.popularBadge}>{isEn ? 'Most Popular' : 'Pendwa Zaidi'}</div>}
                <div className={styles.tierTarget}>{isEn ? tier.targetEn : tier.targetSw}</div>
                <div className={styles.tierVolume}>{tier.volume} {isEn ? 'reports/mo' : 'ripoti/mwezi'}</div>
                <div className={styles.tierPrice}>{isEn ? tier.priceEn : tier.priceSw}</div>
                <ul className={styles.tierList}>
                  <li><CheckCircle2 size={16} /> JSON & XML responses</li>
                  <li><CheckCircle2 size={16} /> 99.99% Guaranteed SLA</li>
                  <li><CheckCircle2 size={16} /> Dedicated Account Manager</li>
                </ul>
                <button className={tier.featured ? styles.tierBtnPrimary : styles.tierBtnSecondary}>
                  {isEn ? 'Contact Sales' : 'Wasiliana Nasi'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className={styles.trustBanner}>
        <div className={`container ${styles.trustFlex}`}>
          <div className={styles.trustText}>
            <h2>{isEn ? 'Ready to become a trusted market leader?' : 'Uko tayari kuwa kiongozi anayeaminika sokoni?'}</h2>
            <p>{isEn ? 'Join the top Tanzanian dealerships and insurers leveraging CarHakiki data.' : 'Jiunge na maduka makubwa na bima zinazotumia data za CarHakiki.'}</p>
          </div>
          <button className={styles.trustBtn}>
             <Code2 size={20} /> {isEn ? 'Create Developer Account' : 'Fungua Akaunti ya Wasanidi'}
          </button>
        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} CarHakiki Vehicle Data Hub. API Services Division.</div>
      </footer>
    </main>
  )
}
