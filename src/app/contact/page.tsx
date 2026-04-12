'use client'

import Navbar from '@/components/Navbar'
import { MapPin, Mail, MessageSquare, Briefcase } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import styles from './contact.module.css'

export default function ContactPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.heroSection}>
        <div className="container center-text">
          <div className={styles.tag}>{isEn ? 'Contact Us' : 'Wasiliana Nasi'}</div>
          <h1 className={styles.title}>
            {isEn ? 'We\'re here to help.' : 'Tuko hapa kusaidia.'}
          </h1>
          <p className={styles.subtitle}>
            {isEn 
              ? 'Whether you have a question about a report, want to partner with us, or are interested in joining our team, we\'d love to hear from you.'
              : 'Ikiwa una swali kuhusu ripoti au unataka kushirikiana nasi, tungependa kusikia kutoka kwako.'}
          </p>
        </div>
      </section>

      <section className={styles.contactGridSection}>
        <div className={`container ${styles.gridContainer}`}>
          
          <div className={styles.contactCard}>
            <div className={styles.iconBox}><MessageSquare size={24} className={styles.iconStyle} /></div>
            <h3>{isEn ? 'Customer Support' : 'Huduma kwa Wateja'}</h3>
            <p>{isEn ? 'Have a question about your vehicle history report or payment? Our 24/7 team is ready.' : 'Una swali kuhusu ripoti yako? Timu yetu inapatikana 24/7.'}</p>
            <a href="mailto:support@carhakiki.co.tz" className={styles.linkText}>support@carhakiki.co.tz</a>
            <div className={styles.disclaimer}>{isEn ? 'Average response time: 2 hours' : 'Muda wa kujibu: masaa 2'}</div>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.iconBox}><Briefcase size={24} className={styles.iconStyle} /></div>
            <h3>{isEn ? 'B2B & Partnerships' : 'Ubia wa Kibiashara'}</h3>
            <p>{isEn ? 'Interested in bulk report accounts, API access, or affiliate sponsorships? Talk to sales.' : 'Je, unahitaji API au akaunti za mauzo ya jumla? Wasiliana na timu ya mauzo.'}</p>
            <a href="mailto:b2b@carhakiki.co.tz" className={styles.linkText}>b2b@carhakiki.co.tz</a>
            <div className={styles.disclaimer}>{isEn ? 'For dealerships and insurers' : 'Kwa wafanyabiashara wa magari'}</div>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.iconBox}><Mail size={24} className={styles.iconStyle} /></div>
            <h3>{isEn ? 'Press & Media' : 'Wanahabari'}</h3>
            <p>{isEn ? 'Need expert commentary on the East African used car market or press assets?' : 'Je, unahitaji maoni ya wataalamu kuhusu soko la magari Afrika Mashariki?'}</p>
            <a href="mailto:press@carhakiki.co.tz" className={styles.linkText}>press@carhakiki.co.tz</a>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.iconBox}><MapPin size={24} className={styles.iconStyle} /></div>
            <h3>{isEn ? 'Headquarters' : 'Ofisi Kuu'}</h3>
            <p>{isEn ? 'CarHakiki Data Ltd.' : 'CarHakiki Data Ltd.'}<br/>
               Block A, Innovation Hub<br/>
               Dar es Salaam, Tanzania
            </p>
            <div className={styles.disclaimer}>{isEn ? 'Visits by appointment only' : 'Kutembelea ni kwa miadi tu'}</div>
          </div>

        </div>
      </section>

      <section className={styles.mapSection}>
        <div className="container">
          <div className={styles.mapMockup}>
            <div className={styles.mapPin}>
               <div className={styles.pulse}></div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} CarHakiki.</div>
      </footer>
    </main>
  )
}
