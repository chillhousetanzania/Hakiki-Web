'use client'

import { Shield, Languages } from 'lucide-react'
import Image from 'next/image'
import { useLanguageStore } from '@/store/languageStore'
import Navbar from '@/components/Navbar'
import styles from './about.module.css'

/* ── CarVertical About page structure (section by section):
   1. Hero: left text (Company mission intro) + right illustration (car + floating reports)
   2. Feature section 1: left (mascot reading + car) + right text
   3. Feature section 2: left text + right illustration  
   4. Blue "markets" section: title + subtitle + country flag pills + world map bg
   5. White "in numbers" section: 6 stat cards (3x2 grid) each with cartoon icon
   6. Awards section: 3 award cards
   7. Dark bottom CTA: bold headline + CTA button + mascot illustration
   ──────────────────────────────────────────── */

const stats = [
  { icon: '🚗', value: '50,000+', labelEn: 'Cars checked', labelSw: 'Magari yaliyohakikiwa' },
  { icon: '👤', value: '10,000+', labelEn: 'Unique users per year', labelSw: 'Watumiaji kwa mwaka' },
  { icon: '📊', value: '1,000+', labelEn: 'Data sources', labelSw: 'Vyanzo vya data' },
  { icon: '🏆', value: '97%', labelEn: 'Customer satisfaction', labelSw: 'Kuridhika kwa wateja' },
  { icon: '🌍', value: '45+', labelEn: 'Markets', labelSw: 'Masoko' },
  { icon: '👥', value: '24/7', labelEn: 'Support availability', labelSw: 'Upatikanaji wa msaada' },
]

const markets = [
  '🇹🇿 Tanzania', '🇰🇪 Kenya', '🇺🇬 Uganda', '🇷🇼 Rwanda',
  '🇯🇵 Japan', '🇬🇧 United Kingdom', '🇦🇺 Australia', '🇱🇹 Lithuania',
  '🇪🇪 Estonia', '🇱🇻 Latvia', '🇵🇱 Poland', '🇷🇴 Romania',
  '🇭🇺 Hungary', '🇫🇷 France', '🇺🇦 Ukraine', '🇸🇪 Sweden',
  '🇧🇪 Belgium', '🇨🇿 Czech Republic', '🇭🇷 Croatia', '🇧🇬 Bulgaria',
  '🇸🇰 Slovakia', '🇷🇸 Serbia', '🇫🇮 Finland', '🇸🇮 Slovenia',
  '🇩🇪 Germany', '🇮🇹 Italy', '🇨🇭 Switzerland', '🇩🇰 Denmark',
  '🇦🇪 UAE', '🇺🇸 USA', '🇿🇦 South Africa', '+ 13',
]

const awards = [
  { logoEn: 'TZ Business', titleEn: 'Best Auto-Tech Startup', titleSw: 'Startup Bora ya Teknolojia ya Magari', year: '2025' },
  { logoEn: 'East Africa', titleEn: 'Innovation in Vehicle Safety', titleSw: 'Ubunifu katika Usalama wa Magari', year: '2024' },
  { logoEn: 'Dar Tech', titleEn: 'Consumer Trust Award', titleSw: 'Tuzo ya Uaminifu wa Wateja', year: '2024' },
]

export default function AboutPage() {
  const { language, setLanguage } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main>
      <Navbar />

      {/* ─── SECTION 1: HERO ─── */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <h1>
              {isEn
                ? 'Building transparency in East Africa\'s used car market'
                : 'Kujenga uwazi katika soko la magari yaliyotumika Afrika Mashariki'}
            </h1>
            <p>
              {isEn
                ? "We collect and organize the most relevant information about a vehicle, and present it in an easy-to-understand format. These reports are a great way to avoid bad deals, learn a vehicle's story, keep it healthy, or sell it at a good price."
                : "Tunakusanya na kupanga taarifa muhimu zaidi kuhusu gari, na kuiwasilisha kwa njia rahisi kuelewa. Ripoti hizi ni njia bora ya kuepuka miamala mibaya, kujifunza historia ya gari, kuliweka vizuri, au kuliuza kwa bei nzuri."}
            </p>
          </div>
          <div className={styles.heroVisual}>
            <Image
              src="/about-hero.png"
              alt={isEn ? 'Hakiki - Vehicle history reports' : 'Hakiki - Ripoti za historia ya gari'}
              width={520}
              height={380}
              className={styles.heroImg}
              priority
            />
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: FEATURE ROW (mascot + text) ─── */}
      <section className={styles.featureSection}>
        <div className={`container ${styles.featureGrid}`}>
          <div className={styles.featureVisual}>
            <Image
              src="/about-mascot-reading.png"
              alt="Hakiki research"
              width={460}
              height={340}
              className={styles.featureImg}
            />
          </div>
          <div className={styles.featureText}>
            <h2>
              {isEn
                ? 'User-empowering research and expert guides'
                : 'Utafiti na miongozo ya kitaalamu inayowawezesha watumiaji'}
            </h2>
            <p>
              {isEn
                ? "Working with automotive data has taught us a lot about vehicles and the second-hand market. One of Hakiki's main goals is to share this knowledge and empower car buyers not only with history reports but also with our expert-driven research, guides, tips and tricks. It doesn't matter if you're a vehicle buyer, owner, or seller — the Hakiki Blog has useful information to make your life easier."
                : "Kufanya kazi na data ya magari kumetufundisha mengi kuhusu magari na soko la mitumba. Moja ya malengo makubwa ya Hakiki ni kushiriki ujuzi huu na kuwawezesha wanunuzi wa magari si tu kwa ripoti za historia bali pia kwa utafiti wetu wa kitaalamu, miongozo, na vidokezo. Haijalishi kama wewe ni mnunuzi, mmiliki, au muuzaji wa gari — Blog ya Hakiki ina taarifa muhimu kukufanya maisha yako kuwa rahisi."}
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: BLUE MARKETS SECTION ─── */}
      <section className={styles.marketsSection}>
        <div className="container">
          <h2 className={styles.marketsTitle}>
            {isEn ? '45+ markets' : 'Masoko 45+'}
          </h2>
          <p className={styles.marketsSubtitle}>
            {isEn
              ? 'Hakiki sources data from the world\'s most trusted vehicle databases. We\'ve established a presence in 45+ markets, and we continue to expand, raising the level of transparency in the global used car market.'
              : 'Hakiki inapata data kutoka kwenye kanzidata za magari zinazoaminika zaidi duniani. Tuna uwepo katika masoko 45+, na tunaendelea kupanuka, kuongeza kiwango cha uwazi katika soko la magari yaliyotumika duniani.'}
          </p>
          <div className={styles.marketPills}>
            {markets.map((m, i) => (
              <span key={i} className={styles.marketPill}>{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: HAKIKI IN NUMBERS ─── */}
      <section className={styles.numbersSection}>
        <div className="container">
          <h2 className={styles.numbersTitle}>
            {isEn ? 'Hakiki in numbers' : 'Hakiki kwa nambari'}
          </h2>
          <div className={styles.numbersGrid}>
            {stats.map((s, i) => (
              <div key={i} className={styles.numberCard}>
                <div className={styles.numberIcon}>{s.icon}</div>
                <div className={styles.numberValue}>{s.value}</div>
                <div className={styles.numberLabel}>
                  {isEn ? s.labelEn : s.labelSw}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: AWARDS ─── */}
      <section className={styles.awardsSection}>
        <div className="container">
          <h2 className={styles.awardsTitle}>
            {isEn ? 'Hakiki awards and nominations' : 'Tuzo na uteuzi wa Hakiki'}
          </h2>
          <div className={styles.awardsGrid}>
            {awards.map((a, i) => (
              <div key={i} className={styles.awardCard}>
                <div className={styles.awardLogo}>{a.logoEn}</div>
                <h3>{isEn ? a.titleEn : a.titleSw}</h3>
                <p>{a.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: BOTTOM CTA (dark with mascot) ─── */}
      <section className={styles.bottomCta}>
        <div className={`container ${styles.bottomCtaInner}`}>
          <div className={styles.bottomCtaText}>
            <h2>
              {isEn
                ? 'Building a transparent global used vehicle market'
                : 'Kujenga soko la uwazi la magari yaliyotumika duniani'}
            </h2>
            <p>
              {isEn
                ? "For decades, getting a used car was a game of hide-and-seek between buyers and sellers. As recently as 5 years ago, you could only hope for sincerity or demand an expensive inspection. Today, Hakiki gives you verified data in 40 seconds — for less than the price of a lunch."
                : "Kwa miongo kadhaa, kupata gari lililotumika ilikuwa mchezo wa kujificha kati ya wanunuzi na wauzaji. Leo, Hakiki inakupa data iliyothibitishwa kwa sekunde 40 — kwa bei ndogo kuliko gharama ya chakula cha mchana."}
            </p>
            <a href="/" className={styles.ctaButton}>
              {isEn ? 'Check a car now →' : 'Hakiki gari sasa →'}
            </a>
          </div>
          <div className={styles.bottomCtaVisual}>
            <Image
              src="/about-mascot-cta.png"
              alt="Hakiki mascot"
              width={320}
              height={320}
              className={styles.ctaMascot}
            />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.footerBrand}>
            <Shield size={20} />
            <span>Hakiki</span>
          </div>
          <p>© {new Date().getFullYear()} Hakiki. {isEn ? 'All rights reserved.' : 'Haki zote zimehifadhiwa.'}</p>
        </div>
      </footer>
    </main>
  )
}
