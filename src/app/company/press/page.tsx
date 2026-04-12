'use client'

import Navbar from '@/components/Navbar'
import { Download, FileText, Mail, ArrowRight } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import styles from './press.module.css'

export default function PressPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.heroSection}>
        <div className="container center-text">
          <div className={styles.tag}>{isEn ? 'Press & Media' : 'Vyombo vya Habari'}</div>
          <h1 className={styles.title}>
            {isEn ? 'CarHakiki Media Center' : 'Kituo cha Habari cha CarHakiki'}
          </h1>
          <p className={styles.subtitle}>
            {isEn 
              ? 'Everything you need to write about CarHakiki. Download our official brand assets, read our latest press releases, and get in touch with our PR team.'
              : 'Kila kitu unachohitaji kuandika kuhusu CarHakiki. Pakua rasilimali zetu rasmi na usome matoleo mapya ya waandishi.'}
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={`container ${styles.gridContainer}`}>
          
          {/* MEDIA KITS */}
          <div className={styles.assetsColumn}>
            <h2>{isEn ? 'Brand Assets' : 'Rasilimali za Chapa'}</h2>
            <p className={styles.sectionDesc}>
              {isEn ? 'Please do not alter our logos in any way. Use the high-resolution files provided below.' : 'Tafadhali usibadilishe nembo yetu kwa njia yoyote.'}
            </p>
            
            <div className={styles.assetCard}>
              <div className={styles.assetVisual}>
                <div className={styles.logoMock}>CARHAKIKI</div>
              </div>
              <div className={styles.assetInfo}>
                <div>
                  <h3>{isEn ? 'Primary Logo Mark' : 'Nembo Maalum'}</h3>
                  <p>PNG, SVG, EPS</p>
                </div>
                <button className={styles.downloadBtn}><Download size={18} /></button>
              </div>
            </div>

            <div className={styles.assetCard}>
              <div className={styles.assetVisualDark}>
                <div className={styles.logoMockDark}>CARHAKIKI</div>
              </div>
              <div className={styles.assetInfo}>
                <div>
                  <h3>{isEn ? 'Reverse Logo Mark' : 'Nembo ya Giza'}</h3>
                  <p>PNG, SVG, EPS</p>
                </div>
                <button className={styles.downloadBtn}><Download size={18} /></button>
              </div>
            </div>
          </div>

          {/* PRESS RELEASES & CONTACT */}
          <div className={styles.prColumn}>
            <h2>{isEn ? 'Recent Announcements' : 'Matangazo ya Hivi Karibuni'}</h2>
            
            <div className={styles.newsList}>
              <a href="#" className={styles.newsItem}>
                <span className={styles.date}>March 14, 2026</span>
                <h3>CarHakiki secures $2.5M Seed Round to expand vehicle history reports across East Africa</h3>
                <span className={styles.readMore}>{isEn ? 'Read Release' : 'Soma Zaidi'} <ArrowRight size={14}/></span>
              </a>
              <a href="#" className={styles.newsItem}>
                <span className={styles.date}>February 02, 2026</span>
                <h3>CarHakiki partners with leading Tanzanian auto importers to verify JAAI certificates</h3>
                <span className={styles.readMore}>{isEn ? 'Read Release' : 'Soma Zaidi'} <ArrowRight size={14}/></span>
              </a>
              <a href="#" className={styles.newsItem}>
                <span className={styles.date}>January 10, 2026</span>
                <h3>Launch of the CarHakiki B2B API platform for Dealerships and Insurance Firms</h3>
                <span className={styles.readMore}>{isEn ? 'Read Release' : 'Soma Zaidi'} <ArrowRight size={14}/></span>
              </a>
            </div>

            <div className={styles.contactBox}>
              <h3>{isEn ? 'Media Inquiries' : 'Maswali ya Vyombo vya Habari'}</h3>
              <p>{isEn ? 'For interview requests, expert commentary, or media partnerships please contact our PR division.' : 'Kwa maombi ya mahojiano, tafadhali wasiliana nasi.'}</p>
              <a href="mailto:press@carhakiki.co.tz" className={styles.emailLink}>
                <Mail size={18} /> press@carhakiki.co.tz
              </a>
            </div>
          </div>

        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} CarHakiki Media.</div>
      </footer>
    </main>
  )
}
