'use client'

import { Shield, BookOpen, TrendingUp, ShoppingCart, Building2, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from './blog.module.css'

const blogCategories = [
  'Blog', 'Best vehicles', 'Business', 'Car maintenance guides', 'Research', 'Company News', 'Buying and selling tips'
]

const swBlogCategories = [
  'Blogu', 'Magari bora', 'Biashara', 'Miongozo ya matengenezo', 'Utafiti', 'Habari za Kampuni', 'Vidokezo vya kuuza na kununua'
]

const categories = [
  { 
    icon: <TrendingUp size={20} />, 
    titleEn: 'Research', 
    titleSw: 'Utafiti', 
    descEn: 'Data-driven reports on the used car market', 
    descSw: 'Ripoti zinazotokana na data kuhusu soko la magari', 
    articles: [
      { 
        titleEn: 'Hakiki data sources: How history reports are created', 
        titleSw: 'Chanzo cha data cha Hakiki: Jinsi ripoti zinavyotengenezwa', 
        date: '16/03/2026',
        image: '/blog/data-sources.png',
        slug: 'data-sources'
      },
      { 
        titleEn: 'Most clocked cars 2025: which models are manipulated the most?', 
        titleSw: 'Magari yaliyochezewa maileji 2025: aina gani zinaongozwa?', 
        date: '13/03/2026',
        image: '/blog/mileage-tampering.png',
        slug: 'most-clocked-cars'
      },
      { 
        titleEn: 'Most damaged cars in 2025: which vehicles get into accidents the most?', 
        titleSw: 'Magari yaliyoharibika zaidi 2025: yapi yanapata ajali zaidi?', 
        date: '10/03/2026',
        image: '/blog/accident-history.png',
        slug: 'most-damaged-cars'
      },
    ]
  },
  { 
    icon: <ShoppingCart size={20} />, 
    titleEn: 'Buying & Selling', 
    titleSw: 'Kununua na Kuuza', 
    descEn: 'Guides for smart car transactions', 
    descSw: 'Miongozo ya miamala bora ya magari', 
    articles: [
      { titleEn: 'How to Negotiate a Used Car Price in Tanzania', titleSw: 'Jinsi ya Kujadili Bei ya Gari Tanzania', date: 'Mar 2025', image: '/blog/data-sources.png', slug: 'negotiate-price' },
      { titleEn: '7 Red Flags When Buying a Used Car', titleSw: 'Dalili 7 za Hatari Wakati wa Kununua Gari', date: 'Jan 2025', image: '/blog/accident-history.png', slug: 'red-flags' },
    ]
  },
]

export default function BlogPage() {
  const { language } = useLanguageStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isEn = !mounted || language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.subNavWrap}>
        <div className="container">
          <div className={styles.subNav}>
            {(isEn ? blogCategories : swBlogCategories).map((cat, i) => (
              <button key={i} className={i === 0 ? styles.activeNav : styles.navLink}>
                {cat}
              </button>
            ))}
            <div className={styles.searchIcon}>
              <Search size={20} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuredHero}>
        <div className="container">
           <div className={styles.featuredWrapper}>
              <div className={styles.featuredImageSide}>
                 <Image 
                    src="/blog/data-sources.png" 
                    alt="Featured" 
                    fill 
                    style={{ objectFit: 'cover' }}
                    className={styles.featuredImg}
                 />
              </div>
              <div className={styles.featuredContent}>
                 <div className={styles.featuredMeta}>
                    <span className={styles.featTag}>{isEn ? 'Company News' : 'Habari za Kampuni'}</span>
                    <span className={styles.featDate}>16/03/2026</span>
                 </div>
                 <h1 className={styles.featTitle}>
                    {isEn ? 'Hakiki data sources: How history reports are created' : 'Chanzo cha data cha Hakiki: Jinsi ripoti zinavyotengenezwa'}
                 </h1>
                 <div className={styles.featFooter}>
                    <div className={styles.authorGroup}>
                       <div className={styles.avatar}></div>
                       <div className={styles.authorInfo}>
                          <span className={styles.authorName}>Tadas Švenčionis</span>
                       </div>
                    </div>
                    <div className={styles.featNav}>
                       <button className={styles.navCirc}><ChevronLeft size={20} /></button>
                       <button className={styles.navCirc}><ChevronRight size={20} /></button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          {categories.map((cat, i) => (
            <div key={i} className={styles.categoryBlock}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <div>
                  <h2>{isEn ? cat.titleEn : cat.titleSw}</h2>
                  <p>{isEn ? cat.descEn : cat.descSw}</p>
                </div>
              </div>
              <div className={styles.articleGrid}>
                {cat.articles.map((article, j) => (
                  <Link href={`/blog/${article.slug}`} key={j} className={styles.articleCard}>
                    <div className={styles.imageOverlay}>
                       <Image 
                          src={article.image} 
                          alt={article.titleEn} 
                          fill 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                       />
                    </div>
                    <div className={styles.cardInfo}>
                      <span className={styles.articleMeta}>{isEn ? 'Research' : 'Utafiti'} • {article.date}</span>
                      <h3>{isEn ? article.titleEn : article.titleSw}</h3>
                      <div className={styles.authorGroup}>
                        <div className={styles.avatar}></div>
                        <span>{isEn ? 'Hakiki Editorial' : 'Timu ya Hakiki'}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          <div className={styles.allPostsWrapper}>
             <button className={styles.allPostsBtn}>{isEn ? 'All posts →' : 'Makala zote →'}</button>
          </div>
        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} Hakiki Vehicle Data Hub.</div>
      </footer>
    </main>
  )
}
