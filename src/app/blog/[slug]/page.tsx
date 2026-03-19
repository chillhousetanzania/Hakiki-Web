'use client'

import Navbar from '@/components/Navbar'
import { useParams } from 'next/navigation'
import { Calendar, Clock, User, ChevronLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguageStore } from '@/store/languageStore'
import styles from './blog-post.module.css'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string

  const { language } = useLanguageStore()
  const isEn = language === 'en'

  // Dummy data generation based on slug
  const title = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Article Title'

  return (
    <main className={styles.main}>
      <Navbar />

      <article className={styles.articleSection}>
        <div className={`container ${styles.articleInner}`}>
          
          <div className={styles.backNav}>
             <Link href="/blog" className={styles.backLink}>
               <ChevronLeft size={16} /> {isEn ? 'Back to all articles' : 'Rudi kwenye makala zote'}
             </Link>
          </div>

          <header className={styles.articleHeader}>
             <div className={styles.categoryBadge}>{isEn ? 'Buying Guides' : 'Miongozo ya Kununua'}</div>
             <h1 className={styles.title}>{title}</h1>
             
             <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <User size={16} className={styles.metaIcon} />
                  <span>Matas Buzelis</span>
                </div>
                <div className={styles.metaItem}>
                  <Calendar size={16} className={styles.metaIcon} />
                  <span>March 14, 2026</span>
                </div>
                <div className={styles.metaItem}>
                  <Clock size={16} className={styles.metaIcon} />
                  <span>6 min read</span>
                </div>
             </div>
          </header>

          <div className={styles.heroImage}>
             <div className={styles.imgPlaceholder}>
                {isEn ? 'Article Hero Image' : 'Picha ya Makala'}
             </div>
          </div>

          <div className={styles.contentWrap}>
             <div className={styles.textContent}>
                <p>
                  Buying a used car is one of the biggest financial decisions you can make. The used car market in East Africa is booming, but it also comes with significant risks. From hidden accident damage to rolled-back odometers and fraudulent import documents, buyers need to be more vigilant than ever.
                </p>
                
                <h2>The Hidden Dangers of Odometer Fraud</h2>
                <p>
                  Odometer rollbacks are perhaps the most common scam. A vehicle might display 60,000 kilometers on the dashboard, but its true mileage could be over 150,000 kilometers. By paying a premium for a "low mileage" car, buyers not only lose money upfront but also inherit unexpected maintenance costs.
                </p>

                <div className={styles.ctaInsert}>
                   <h3>{isEn ? 'Don\'t guess. Check the VIN.' : 'Usikate tamaa. Angalia VIN.'}</h3>
                   <p>{isEn ? 'Get a full history report in seconds.' : 'Pata ripoti kamili ya historia kwa sekunde chache.'}</p>
                   <div className={styles.vinSearchMock}>
                      <input type="text" placeholder="Enter VIN number..." className={styles.vinInput} disabled />
                      <button className={styles.vinBtn}>{isEn ? 'Check car' : 'Kagua gari'}</button>
                   </div>
                </div>

                <h2>How to Identify Structural Damage</h2>
                <p>
                  Structural damage from past accidents is often painted over and hidden from plain sight. If the chassis has been compromised, the car's structural integrity is permanently weakened, making it unsafe to drive. Always look for uneven panel gaps, mismatched paint tones, and signs of welding under the hood.
                </p>

                <h3>1. Inspect the Panel Gaps</h3>
                <p>
                  Run your finger along the gaps between the doors and fenders. They should be uniform. If the gap widens or narrows, the car may have been in a collision.
                </p>

                <h3>2. Check the Paint Thickness</h3>
                <p>
                  While a paint thickness gauge is the best tool, you can often spot repainted sections by looking at the car under fluorescent light. Look out for "orange peel" textures or slight variations in the shade of the paint.
                </p>

                <hr className={styles.divider} />

                <div className={styles.authorBox}>
                   <div className={styles.authorAvatar}>MB</div>
                   <div className={styles.authorInfo}>
                      <h4>Matas Buzelis</h4>
                      <p>Automotive Expert & Head of Communications at Hakiki. Matas has over a decade of experience in the automotive industry and is passionate about bringing transparency to the used car market.</p>
                   </div>
                </div>
             </div>

             <aside className={styles.sidebar}>
                <div className={styles.stickyWidget}>
                   <h3>{isEn ? 'Protect your investment.' : 'Linda uwekezaji wako.'}</h3>
                   <p>{isEn ? 'Avoid bad deals. Get a comprehensive vehicle history report today.' : 'Epuka matapeli. Kagua historia ya gari kabla hujanunua.'}</p>
                   <a href="/no-vin" className={styles.sidebarBtn}>
                     {isEn ? 'Check Car History' : 'Kagua Historia Kwanza'} <ArrowRight size={16} />
                   </a>
                </div>
             </aside>
          </div>

        </div>
      </article>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} Hakiki Blog.</div>
      </footer>
    </main>
  )
}
