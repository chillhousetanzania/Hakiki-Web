'use client'

import Navbar from '@/components/Navbar'
import { Video, Gift, Trophy, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguageStore } from '@/store/languageStore'
import styles from './influencers.module.css'

const influencerPerks = [
  { icon: <Gift size={24} className={styles.iconVlog} />, titleEn: 'Custom Promo Codes', titleSw: 'Nambari za Punguzo', descEn: 'We create a unique 20% off code exclusively for your audience (e.g., "AUTOVLOG20").', descSw: 'Tunaunda nambari ya punguzo la 20% kwa watazamaji wako pekee.' },
  { icon: <Trophy size={24} className={styles.iconVlog} />, titleEn: 'Top-tier Payouts', titleSw: 'Malipo ya Juu', descEn: 'Earn fixed sponsorships or high revenue share for every report purchased using your code. You get paid monthly, zero exceptions.', descSw: 'Pata udhamini thabiti au gawo la mapato kwa kila ripoti inayouzwa.' },
  { icon: <Star size={24} className={styles.iconVlog} />, titleEn: 'Premium Brand', titleSw: 'Chapa ya Kipekee', descEn: 'Never promote sketchy products. Help your viewers avoid bad cars by offering them the best vehicle history tool in Africa.', descSw: 'Tuna sifa nzuri. Wasaidie watazamaji wako kuepuka kununua magari mabaya.' },
]

export default function InfluencersPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.heroSection}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <div className={styles.creatorTag}>
              <Video size={14} className={styles.tagIcon} /> 
              {isEn ? 'For Youtube & Social Creators' : 'Kwa Waumbaji wa Youtube'}
            </div>
            <h1 className={styles.heroTitle}>
              {isEn ? 'Become a CarHakiki Brand Ambassador' : 'Kuwa Balozi wa Chapa ya CarHakiki'}
            </h1>
            <p className={styles.heroSubtitle}>
              {isEn 
                ? 'Do you create content about cars, mechanics, or buying advice? Partner with Africa&apos;s leading vehicle data provider. Give your audience amazing discounts while generating a stellar income stream.'
                : 'Unaunda maudhui kuhusu magari? Shirikiana na mtoaji mkuu wa data barani Afrika. Wape watazamaji wako punguzo huku ukitengeneza kipato.'}
            </p>
            <div className={styles.ctaRow}>
              <a href="#apply" className={styles.applyBtn}>{isEn ? 'Apply for Sponsorship' : 'Omba Udhamini'}</a>
            </div>
            <div className={styles.statsRow}>
              <div className={styles.statLine}><strong>500+</strong> {isEn ? 'Active Creators' : 'Waumbaji Amilifu'}</div>
              <div className={styles.statLine}><strong>$1M+</strong> {isEn ? 'Paid out in 2024' : 'Zimelipwa Mwaka 2024'}</div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.youtubeMockup}>
              <div className={styles.ytScreen}>
                <div className={styles.playButton}></div>
              </div>
              <div className={styles.ytInfo}>
                <div className={styles.ytAvatar}></div>
                <div className={styles.ytText}>
                  <div className={styles.ytTitle}>{isEn ? 'How to NOT get scammed buying a used car!' : 'Jinsi ya KUEPUKA kutapeliwa ukinunua gari!'}</div>
                  <div className={styles.ytChannel}>Tanzania Auto Reviews • 120K views</div>
                </div>
              </div>
              <div className={styles.ytDescription}>
                <span className={styles.sponsorDrop}>
                  {isEn ? 'Get 20% OFF your CarHakiki History Report:' : 'Pata Punguzo la 20% kwa Ripoti ya CarHakiki:'} 
                  <br />👉 <strong>carhakiki.co.tz/AUTOVLOG20</strong>
                </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.perksSection}>
        <div className="container">
          <h2 className={styles.sectionHeading}>{isEn ? 'Partnering made simple' : 'Ushirikiano uliorahisishwa'}</h2>
          <div className={styles.perksGrid}>
            {influencerPerks.map((perk, i) => (
              <div key={i} className={styles.perkCard}>
                <div className={styles.iconBox}>{perk.icon}</div>
                <h3>{isEn ? perk.titleEn : perk.titleSw}</h3>
                <p>{isEn ? perk.descEn : perk.descSw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.requirementsBanner}>
        <div className={`container ${styles.reqInner}`}>
          <div className={styles.reqContent}>
            <h2>{isEn ? 'Sponsorship Requirements' : 'Mahitaji ya Udhamini'}</h2>
            <ul className={styles.reqList}>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {isEn ? 'Automotive-focused channel or page' : 'Kuoana na mada za magari'}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {isEn ? 'Minimum 10,000 active subscribers/followers' : 'Kima cha chini wafuasi 10,000'}</li>
              <li><CheckCircle size={18} className={styles.checkIcon} /> {isEn ? 'Consistent upload schedule' : 'Kupakia video mara kwa mara'}</li>
            </ul>
          </div>
          <div className={styles.reqAction}>
            <p>{isEn ? 'Sound like you? Let&apos;s talk.' : 'Je, inakufaa? Tuongee.'}</p>
            <Link href="/contact" className={styles.outlineBtn}>{isEn ? 'Send us a message' : 'Tuma ujumbe'} <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} CarHakiki Brands & Sponsorships.</div>
      </footer>
    </main>
  )
}

interface CheckCircleProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

function CheckCircle({ size = 24, ...props }: CheckCircleProps) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
