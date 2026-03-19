'use client'

import Navbar from '@/components/Navbar'
import { Rocket, Heart, Zap, Globe, MapPin, ArrowUpRight } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import styles from './careers.module.css'

const openRoles = [
  { title: 'Senior Go Developer', dept: 'Engineering', location: 'Dar es Salaam / Remote', type: 'Full-time' },
  { title: 'Data Scientist (Automotive)', dept: 'Data & Analytics', location: 'Remote', type: 'Full-time' },
  { title: 'B2B Sales Executive', dept: 'Sales', location: 'Nairobi, Kenya', type: 'Full-time' },
  { title: 'Performance Marketing Manager', dept: 'Marketing', location: 'Dar es Salaam / Remote', type: 'Full-time' },
]

export default function CareersPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.heroSection}>
        <div className="container text-center">
          <div className={styles.tag}>{isEn ? 'Hakiki Careers' : 'Ajira Hakiki'}</div>
          <h1 className={styles.title}>
            {isEn ? 'Drive transparency across Africa.' : 'Leta uwazi kote Afrika.'}
          </h1>
          <p className={styles.subtitle}>
            {isEn 
              ? 'We are looking for ambitious, high-performing individuals to help us build the definitive source of truth for the East African automotive ecosystem.'
              : 'Tunatafuta watu wenye malengo na wanaofanya vizuri ili kutusaidia kujenga chanzo kikuu cha ukweli cha magari Afrika Mashariki.'}
          </p>
          <a href="#openings" className={styles.btnPrimary}>{isEn ? 'View Open Roles' : 'Tazama Nafasi Wazi'}</a>
        </div>
      </section>

      <section className={styles.cultureSection}>
        <div className="container">
          <div className={styles.cultureGrid}>
            <div className={styles.cultureBox}>
              <div className={styles.iconBg}><Rocket size={24} className={styles.iconCore} /></div>
              <h3>{isEn ? 'Move fast. Break old habits.' : 'Nenda kwa haraka.'}</h3>
              <p>{isEn ? 'We operate at startup speed but with enterprise backing. We value execution over endless planning.' : 'Tunafanya kazi kwa kasi ya startup.'}</p>
            </div>
            <div className={styles.cultureBox}>
              <div className={styles.iconBg}><Heart size={24} className={styles.iconCore} /></div>
              <h3>{isEn ? 'Radical Candor' : 'Ukweli wa Kipekee'}</h3>
              <p>{isEn ? 'We communicate directly and transparently. Feedback is a gift, not an attack.' : 'Tunawasiliana moja kwa moja na kwa uwazi.'}</p>
            </div>
            <div className={styles.cultureBox}>
              <div className={styles.iconBg}><Globe size={24} className={styles.iconCore} /></div>
              <h3>{isEn ? 'Remote-First DNA' : 'Remote Kwanza'}</h3>
              <p>{isEn ? 'Work from Dar es Salaam, Nairobi, or your living room. We care about output, not office politics.' : 'Fanya kazi popote. Tunajali matokeo, sio siasa za ofisi.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="openings" className={styles.rolesSection}>
        <div className={`container ${styles.rolesWrap}`}>
          <div className={styles.rolesHeader}>
            <h2>{isEn ? 'Open Positions' : 'Nafasi Wazi'}</h2>
            <div className={styles.badgeCount}>{openRoles.length} {isEn ? 'Jobs' : 'Kazi'}</div>
          </div>

          <div className={styles.rolesList}>
            {openRoles.map((role, i) => (
              <a href="#apply" key={i} className={styles.roleCard}>
                <div className={styles.roleInfo}>
                  <h3>{role.title}</h3>
                  <div className={styles.roleTags}>
                    <span className={styles.deptTag}>{role.dept}</span>
                    <span className={styles.locTag}><MapPin size={14} /> {role.location}</span>
                  </div>
                </div>
                <div className={styles.roleAction}>
                  <span className={styles.typeLabel}>{role.type}</span>
                  <div className={styles.applyBtnIcon}><ArrowUpRight size={20} /></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaFooter}>
        <div className="container text-center">
          <h2>{isEn ? 'Don\'t see a perfect fit?' : 'Huuoni wadhifa wako?'}</h2>
          <p>{isEn ? 'Send us your resume anyway. We are always looking for exceptional talent.' : 'Tutumie wasifu wako. Kila wakati tunatafuta vipaji vya kipekee.'}</p>
          <a href="/contact" className={styles.outlineBtn}>{isEn ? 'Email us directly' : 'Tutumie Barua Pepe'}</a>
        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} Hakiki HQ.</div>
      </footer>
    </main>
  )
}
