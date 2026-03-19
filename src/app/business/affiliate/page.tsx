'use client'

import Navbar from '@/components/Navbar'
import { DollarSign, LineChart, Users, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import styles from './affiliate.module.css'

const affiliateBenefits = [
  { icon: <DollarSign size={24} className={styles.iconAccent} />, titleEn: 'High Commissions', titleSw: 'Kamisheni Kubwa', descEn: 'Earn up to 30% revenue share on every single report generated through your referral links.', descSw: 'Pata hadi 30% ya mapato kwa kila ripoti inayozalishwa kupitia viungo vyako.' },
  { icon: <LineChart size={24} className={styles.iconAccent} />, titleEn: 'High Conversion Rates', titleSw: 'Wastani Mkubwa wa Mauzo', descEn: 'With a globally recognized brand and highly optimized checkout funnels, your traffic turns into cash faster.', descSw: 'Huku tukiwa na chapa inayotambulika, wageni wako hubadilika kuwa wateja haraka.' },
  { icon: <CheckCircle2 size={24} className={styles.iconAccent} />, titleEn: '90-Day Cookies', titleSw: 'Vidakuzi vya Siku 90', descEn: 'We track your referrals for a full 90 days. If they come back and buy later, you still get paid.', descSw: 'Tunafuatilia rufaa zako kwa siku 90. Wakinunua baadaye, bado unalipwa.' },
]

export default function AffiliatePage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.heroSection}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <div className={styles.badgeLabel}>{isEn ? 'Hakiki Partner Network' : 'Mtandao wa Washirika wa Hakiki'}</div>
            <h1 className={styles.heroTitle}>
              {isEn ? 'Monetize your automotive traffic' : 'Tengeneza pesa kutokana na wageni wako wa magari'}
            </h1>
            <p className={styles.heroSubtitle}>
              {isEn 
                ? 'Join thousands of publishers, bloggers, and automotive portals earning passive income by recommending Africa\'s most trusted vehicle history reports.'
                : 'Jiunge na maelfu ya wanablogu na tovuti za magari wanaotengeneza kipato kwa kupendekeza ripoti zetu.'}
            </p>
            <div className={styles.heroActions}>
              <a href="#join" className={styles.primaryBtn}>{isEn ? 'Become an Affiliate' : 'Kuwa Mshirika'}</a>
              <div className={styles.trustNote}>
                <Users size={16} /> <span>{isEn ? 'Join 10,000+ active partners' : 'Jiunge na washirika 10,000+'}</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.dashboardMockup}>
              <div className={styles.mockupHeader}>
                <div className={styles.mockupTitle}>{isEn ? 'Partner Dashboard' : 'Dashibodi ya Mshirika'}</div>
                <div className={styles.mockupBal}>
                  <span className={styles.balLabel}>{isEn ? 'Available Payout' : 'Kiasi Kinachopatikana'}</span>
                  <span className={styles.balAmount}>$ 4,250.00</span>
                </div>
              </div>
              <div className={styles.mockupBody}>
                <div className={styles.statGrid}>
                  <div className={styles.statBox}>
                    <div className={styles.statLabel}>{isEn ? 'Clicks' : 'Mibofyo'}</div>
                    <div className={styles.statValue}>12,408</div>
                  </div>
                  <div className={styles.statBox}>
                    <div className={styles.statLabel}>{isEn ? 'Sales' : 'Mauzo'}</div>
                    <div className={styles.statValue}>842</div>
                  </div>
                  <div className={styles.statBox}>
                    <div className={styles.statLabel}>{isEn ? 'Conversion' : 'Ubadilishaji'}</div>
                    <div className={styles.statValue}>6.7%</div>
                  </div>
                </div>
                <div className={styles.chartMockup}>
                  <div className={styles.bar} style={{ height: '40%' }}></div>
                  <div className={styles.bar} style={{ height: '70%' }}></div>
                  <div className={styles.bar} style={{ height: '50%' }}></div>
                  <div className={styles.bar} style={{ height: '90%' }}></div>
                  <div className={styles.bar} style={{ height: '60%' }}></div>
                  <div className={styles.bar} style={{ height: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{isEn ? 'Why partner with Hakiki?' : 'Kwa nini uwe mshirika wa Hakiki?'}</h2>
          <div className={styles.benefitsGrid}>
            {affiliateBenefits.map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <div className={styles.iconContainer}>{b.icon}</div>
                <h3>{isEn ? b.titleEn : b.titleSw}</h3>
                <p>{isEn ? b.descEn : b.descSw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bottomBanner}>
        <div className={`container ${styles.bannerInner}`}>
          <div className={styles.bannerText}>
            <h2>{isEn ? 'Start earning today' : 'Anza kupata kipato leo'}</h2>
            <p>{isEn ? 'Registration takes 2 minutes. Get instant access to tracking links and creative assets.' : 'Kujiandikisha inachukua dakika 2. Pata ufikiaji wa viungo vyako papo hapo.'}</p>
          </div>
          <a href="/contact" className={styles.bannerBtn}>
            {isEn ? 'Create Partner Account' : 'Fungua Akaunti ya Mshirika'} <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} Hakiki Affiliate Network.</div>
      </footer>
    </main>
  )
}
