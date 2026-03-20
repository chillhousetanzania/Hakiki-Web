'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Shield, Languages, Check, CarFront, Bike, Truck, Bus } from 'lucide-react'
import VinInput from '@/components/home/VinInput'
import ValueProps from '@/components/home/ValueProps'
import Features from '@/components/home/Features'
import Testimonials from '@/components/home/Testimonials'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/lib/translations'
import Navbar from '@/components/Navbar'
import styles from './page.module.css'

/* ── CarVertical Homepage — EXACT section replication:
   1. Navbar (Reports, For Business, Company, Blog, Help)
   2. Hero (VIN input + "I don't have a VIN" + "report can uncover" list)
   3. Value Props ("Why smart car buyers start with Hakiki")
   4. Features ("We check what sellers won't tell you")
   5. Bundle Deal / Pricing inline
   6. How It Works (4 steps)
   7. "Turning data into smarter choices" social proof
   8. Testimonials ("Hear from people like you")
   9. Second CTA with VIN + trust bar
   10. Support stats (97%, 24/7, 12-24h)
   11. Blog preview (3 posts)
   12. Mega footer
   ──────────────────────────────────────── */

const uncoverItems = [
  { en: 'Recorded images', sw: 'Picha zilizorekodiwa' },
  { en: 'Damage', sw: 'Uharibifu' },
  { en: 'Theft records', sw: 'Rekodi za wizi' },
  { en: 'Mileage rollbacks', sw: 'Udanganyifu wa maileji' },
  { en: 'Specs & equipment', sw: 'Vipimo na vifaa' },
  { en: 'Emission taxes', sw: 'Kodi za uzalishaji hewa' },
  { en: 'Market price', sw: 'Bei ya soko' },
  { en: 'Safety ratings', sw: 'Viwango vya usalama' },
  { en: 'Financial restrictions', sw: 'Vikwazo vya kifedha' },
  { en: 'Natural disaster exposure', sw: 'Madhara ya maafa ya asili' },
  { en: 'and more...', sw: 'na zaidi...' },
]

const howItWorks = [
  { num: '1', titleEn: "Enter the car's VIN or chassis number", titleSw: 'Ingiza VIN au nambari ya chasi ya gari', descEn: 'Start by entering the 17-character VIN or chassis number — both allow us to track its entire history.', descSw: 'Anza kwa kuingiza VIN ya herufi 17 au nambari ya chasi — zote mbili zinatuwezesha kufuatilia historia yake yote.', linkEn: 'Where can I find the VIN?', linkSw: 'Ninapata VIN wapi?' },
  { num: '2', titleEn: "We'll check verified data worldwide", titleSw: 'Tutahakiki data iliyothibitishwa duniani kote', descEn: "We'll scan 1000+ data sources across 45+ countries — including insurance, police, and registration data — to reveal any hidden problems.", descSw: 'Tutachunguza vyanzo 1000+ vya data katika nchi 45+ — ikiwa ni pamoja na bima, polisi, na data ya usajili.', linkEn: 'Where does the data come from?', linkSw: 'Data inatoka wapi?' },
  { num: '3', titleEn: 'Pay and unlock your full vehicle history report', titleSw: 'Lipa na ufungue ripoti kamili ya historia ya gari', descEn: "After payment, generate reports to see the car's history — your full report will be ready in just 40 seconds.", descSw: 'Baada ya malipo, tengeneza ripoti kuona historia ya gari — ripoti yako kamili itakuwa tayari kwa sekunde 40 tu.', linkEn: 'How to buy and use reports?', linkSw: 'Jinsi ya kununua na kutumia ripoti?' },
  { num: '4', titleEn: 'Let data guide your decision', titleSw: 'Acha data ikuongoze', descEn: 'Use the car history report to decide whether to buy the car, negotiate a better price, or keep looking.', descSw: 'Tumia ripoti ya historia ya gari kuamua kama utanunue gari, ujadili bei bora, au uendelee kutafuta.', linkEn: 'View sample report', linkSw: 'Tazama ripoti ya mfano' },
]

const supportStats = [
  { value: '97%', labelEn: 'satisfaction rate', labelSw: 'kiwango cha kuridhisha' },
  { value: '24/7', labelEn: 'always available', labelSw: 'tunapatikana kila wakati' },
  { value: '12-24h', labelEn: 'avg. response time', labelSw: 'wastani wa muda wa kujibu' },
]

const blogPosts = [
  { titleEn: 'Hakiki data sources: How history reports are created', titleSw: 'Vyanzo vya data vya Hakiki: Jinsi ripoti za historia zinavyoundwa', category: 'Company News', date: 'Mar 2025' },
  { titleEn: 'Most clocked cars 2025: which models are manipulated the most?', titleSw: 'Magari yenye udanganyifu wa maileji 2025', category: 'Research', date: 'Mar 2025' },
  { titleEn: 'Most damaged cars in 2025: which vehicles get into accidents the most?', titleSw: 'Magari yenye uharibifu zaidi 2025', category: 'Research', date: 'Mar 2025' },
]

export default function Home() {
  const { language, setLanguage } = useLanguageStore()
  const t = translations[language]
  const isEn = language === 'en'
  const [loading, setLoading] = useState(false)

  const handleVinSubmit = (vin: string) => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <>
      {/* ═══ 1. NAVBAR ═══ */}
      <Navbar />

      {/* ═══ 2. HERO ═══ */}
      <section className={styles.hero} id="hero-section">
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <h1>{t.hero.titleP1} <br/> {t.hero.titleP2}</h1>
            <p className={styles.heroSubtitle}>{t.hero.subtitle}</p>
            <VinInput onSubmit={handleVinSubmit} loading={loading} />
            <a href="/no-vin" className={styles.noVinLink}>
              {isEn ? "I don't have a VIN →" : 'Sina VIN →'}
            </a>
            <div className={styles.weCheckRow}>
              <span>{isEn ? 'We check:' : 'Tunahakiki:'}</span>
              <CarFront size={18} />
              <Bike size={18} />
              <Truck size={18} />
              <Bus size={18} />
            </div>
            <div className={styles.uncoverSection}>
              <h3 className={styles.uncoverTitle}>
                {isEn ? 'A Hakiki report can uncover:' : 'Ripoti ya Hakiki inaweza kufichua:'}
              </h3>
              <div className={styles.uncoverGrid}>
                {uncoverItems.map((item, i) => (
                  <span key={i} className={styles.uncoverItem}>
                    <Check size={16} strokeWidth={2.5} className={styles.uncoverCheck} />
                    {isEn ? item.en : item.sw}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image
              src="/hero-cars-v5.png"
              alt="Hakiki Verified Vehicle Fleet"
              width={600}
              height={450}
              unoptimized
              priority
              className={styles.heroImage}
            />
            <Image
              src="/hero-data-cards.png"
              alt="Hakiki Report Data"
              width={480}
              height={360}
              unoptimized
              className={styles.heroDataCards}
            />
          </div>
        </div>
      </section>

      {/* ═══ 3. VALUE PROPS ═══ */}
      <ValueProps />

      {/* ═══ 4. FEATURES ═══ */}
      <Features />

      {/* ═══ 5. BUNDLE DEAL ═══ */}
      <section className={styles.bundleSection}>
        <div className={`container ${styles.bundleInner}`}>
          <div className={styles.bundleText}>
            <h2>{isEn ? 'Bundle deal: Save up to 40%' : 'Kifurushi: Okoa hadi 40%'}</h2>
            <p>{isEn ? 'Get a vehicle history report bundle — check more cars for less, compare their histories, and choose the best option.' : 'Pata kifurushi cha ripoti za historia ya gari — hakiki magari zaidi kwa bei ndogo, linganisha historia zao, na uchague chaguo bora.'}</p>
            <a href="/no-vin" className={styles.bundleCta}>
              {isEn ? 'View bundle pricing →' : 'Tazama bei za kifurushi →'}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 6. HOW IT WORKS ═══ */}
      <section className={styles.howItWorks} id="how-it-works-section">
        <div className="container">
          <h2 className={styles.sectionTitle}>
            {isEn ? 'How it works' : 'Jinsi inavyofanya kazi'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isEn ? "Learn what we check, how fast it happens, and what you get in return:" : "Jifunze tunachohakiki, kwa haraka kiasi gani, na unachopata:"}
          </p>
          <div className={styles.stepsGrid}>
            {howItWorks.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNum}>{step.num}</div>
                <h3>{isEn ? step.titleEn : step.titleSw}</h3>
                <p>{isEn ? step.descEn : step.descSw}</p>
                <a href="#" className={styles.stepLink}>
                  {isEn ? step.linkEn : step.linkSw}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. SOCIAL PROOF BAR ═══ */}
      <section className={styles.socialProof}>
        <div className="container">
          <h2>{isEn ? 'Turning data into smarter choices' : 'Kubadilisha data kuwa maamuzi bora'}</h2>
          <p>{isEn ? "In 2025, we've helped thousands of drivers navigate the car market with intelligence and confidence." : "Katika 2025, tumesaidia maelfu ya madereva kupitia soko la magari kwa akili na ujasiri."}</p>
        </div>
      </section>

      {/* ═══ 8. TESTIMONIALS ═══ */}
      <Testimonials />

      {/* ═══ 9. SECOND CTA ═══ */}
      <section className={styles.secondCta}>
        <div className={`container ${styles.secondCtaInner}`}>
          <h2>{isEn ? 'Let the data do the talking' : 'Acha data izungumze'}</h2>
          <p>{isEn ? 'Look deeper before you drive further — get access to verified records that reveal your vehicle\'s history.' : 'Chunguza kwa undani kabla ya kuendesha zaidi — pata rekodi zilizothibitishwa zinazoonyesha historia ya gari lako.'}</p>
          <VinInput onSubmit={handleVinSubmit} loading={loading} />
          <a href="/no-vin" className={styles.noVinLinkAlt}>
            {isEn ? "I don't have a VIN →" : 'Sina VIN →'}
          </a>
          <div className={styles.trustBar}>
            {isEn 
              ? 'Trusted by 50,000+ people across 45+ countries' 
              : 'Kuaminiwa na watu 50,000+ katika nchi 45+'}
          </div>
        </div>
      </section>

      {/* ═══ 10. SUPPORT STATS ═══ */}
      <section className={styles.supportSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            {isEn ? "Got questions? We're here to help 24/7" : 'Una maswali? Tuko hapa kukusaidia 24/7'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isEn ? 'Get the answers you need — whenever you need them.' : 'Pata majibu unayohitaji — wakati wowote unapoyahitaji.'}
            {' '}<a href="/help" className={styles.supportLink}>{isEn ? 'Drop us a message' : 'Tutumie ujumbe'}</a>
          </p>
          <div className={styles.supportGrid}>
            {supportStats.map((s, i) => (
              <div key={i} className={styles.supportCard}>
                <div className={styles.supportValue}>{s.value}</div>
                <div className={styles.supportLabel}>{isEn ? s.labelEn : s.labelSw}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 11. BLOG PREVIEW ═══ */}
      <section className={styles.blogSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            {isEn ? "Hakiki blog: Valuable content you don't want to miss" : "Blogu ya Hakiki: Maudhui muhimu usiyotaka kukosa"}
          </h2>
          <div className={styles.blogGrid}>
            {blogPosts.map((post, i) => (
              <a href="/blog" key={i} className={styles.blogCard}>
                <span className={styles.blogCategory}>{post.category}</span>
                <span className={styles.blogDate}>{post.date}</span>
                <h3>{isEn ? post.titleEn : post.titleSw}</h3>
              </a>
            ))}
          </div>
          <div className={styles.blogAll}>
            <a href="/blog">{isEn ? 'All posts →' : 'Machapisho yote →'}</a>
          </div>
        </div>
      </section>

      {/* ═══ 12. MEGA FOOTER ═══ */}
      <footer className={styles.megaFooter}>
        <div className={`container ${styles.footerGrid}`}>
          <div className={styles.footerCol}>
            <div className={styles.footerBrand}>
              <Shield size={20} />
              <span>Hakiki</span>
            </div>
            <p>{isEn ? 'Vehicle history reports you can trust.' : 'Ripoti za historia ya gari unazoweza kuamini.'}</p>
          </div>
          <div className={styles.footerCol}>
            <h4>{isEn ? 'Reports' : 'Ripoti'}</h4>
            <a href="#">{isEn ? 'Sample Report' : 'Ripoti ya Mfano'}</a>
            <a href="/#pricing-section">{isEn ? 'Pricing' : 'Bei'}</a>
            <a href="#features-section">{isEn ? 'Features' : 'Vipengele'}</a>
          </div>
          <div className={styles.footerCol}>
            <h4>{isEn ? 'For Business' : 'Kwa Biashara'}</h4>
            <a href="/business">{isEn ? 'Dealerships' : 'Maduka ya Magari'}</a>
            <a href="/business">{isEn ? 'API Integration' : 'Muunganiko wa API'}</a>
          </div>
          <div className={styles.footerCol}>
            <h4>{isEn ? 'Resources' : 'Rasilimali'}</h4>
            <a href="/blog">{isEn ? 'Blog' : 'Blogu'}</a>
            <a href="/help">{isEn ? 'Help' : 'Msaada'}</a>
            <a href="/about">{isEn ? 'About' : 'Kuhusu'}</a>
          </div>
        </div>
        <div className={`container ${styles.footerBottom}`}>
          <p>© {new Date().getFullYear()} Hakiki. {isEn ? 'All rights reserved.' : 'Haki zote zimehifadhiwa.'}</p>
        </div>
      </footer>
    </>
  )
}
