'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useLanguageStore } from '@/store/languageStore'
import styles from './legal.module.css'
import { usePathname } from 'next/navigation'

export default function LegalLayout({ children, title }: { children: React.ReactNode, title: string }) {
  const { language } = useLanguageStore()
  const isEn = language === 'en'
  const pathname = usePathname()

  const links = [
    { href: '/terms-and-conditions', labelEn: 'Terms of Service', labelSw: 'Vigezo na Masharti' },
    { href: '/policies', labelEn: 'Privacy Policy', labelSw: 'Sera ya Faragha' },
    { href: '/refund-policy', labelEn: 'Refund Policy', labelSw: 'Sera ya Kurejesha Pesa' },
  ]

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.legalSection}>
        <div className={`container ${styles.legalInner}`}>
          <aside className={styles.sidebar}>
             <h3 className={styles.menuTitle}>{isEn ? 'Legal Policies' : 'Sera za Kisheria'}</h3>
             <ul className={styles.menuList}>
               {links.map(link => (
                 <li key={link.href}>
                   <Link 
                     href={link.href} 
                     className={`${styles.menuLink} ${pathname === link.href ? styles.active : ''}`}
                   >
                     {isEn ? link.labelEn : link.labelSw}
                   </Link>
                 </li>
               ))}
             </ul>
          </aside>
          
          <article className={styles.contentArea}>
            <h1 className={styles.pageTitle}>{title}</h1>
            <div className={styles.lastUpdated}>
               {isEn ? 'Last updated: March 2026' : 'Ilisasishwa mwisho: Machi 2026'}
            </div>
            <div className={styles.textContent}>
               {children}
            </div>
          </article>
        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} CarHakiki Legal.</div>
      </footer>
    </main>
  )
}
