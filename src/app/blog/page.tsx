'use client'

import { Shield, Languages, BookOpen, TrendingUp, Wrench, ShoppingCart, Building2 } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import Navbar from '@/components/Navbar'
import styles from './blog.module.css'

const categories = [
  { icon: <TrendingUp size={20} />, titleEn: 'Research', titleSw: 'Utafiti', descEn: 'Data-driven reports on the used car market', descSw: 'Ripoti zinazotokana na data kuhusu soko la magari', articles: [
    { titleEn: 'Most Clocked Cars in East Africa 2025', titleSw: 'Magari Yenye Udanganyifu wa Maileji 2025', date: 'Mar 2025' },
    { titleEn: 'Top 10 Most Damaged Import Cars', titleSw: 'Magari 10 Bora Yenye Uharibifu Zaidi', date: 'Feb 2025' },
  ]},
  { icon: <ShoppingCart size={20} />, titleEn: 'Buying & Selling', titleSw: 'Kununua na Kuuza', descEn: 'Guides for smart car transactions', descSw: 'Miongozo ya miamala bora ya magari', articles: [
    { titleEn: 'How to Negotiate a Used Car Price in Tanzania', titleSw: 'Jinsi ya Kujadili Bei ya Gari Tanzania', date: 'Mar 2025' },
    { titleEn: '7 Red Flags When Buying a Used Car', titleSw: 'Dalili 7 za Hatari Wakati wa Kununua Gari', date: 'Jan 2025' },
  ]},
  { icon: <Wrench size={20} />, titleEn: 'Car Maintenance', titleSw: 'Matengenezo ya Gari', descEn: 'Keep your car healthy and safe', descSw: 'Weka gari lako katika hali nzuri', articles: [
    { titleEn: 'Seasonal Car Maintenance Checklist for East Africa', titleSw: 'Orodha ya Matengenezo ya Gari kwa Msimu', date: 'Feb 2025' },
    { titleEn: 'When to Change Your Oil — Complete Guide', titleSw: 'Wakati wa Kubadilisha Mafuta — Mwongozo Kamili', date: 'Dec 2024' },
  ]},
  { icon: <Building2 size={20} />, titleEn: 'For Dealers', titleSw: 'Kwa Wafanyabiashara', descEn: 'Success stories and business tips', descSw: 'Hadithi za mafanikio na vidokezo', articles: [
    { titleEn: 'How Dar es Salaam Dealers Sell 21% Faster with Hakiki', titleSw: 'Jinsi Wafanyabiashara wa DSM Wanavyouza Haraka 21%', date: 'Mar 2025' },
    { titleEn: 'The Business Case for Vehicle History Reports', titleSw: 'Sababu za Biashara za Ripoti za Historia ya Gari', date: 'Jan 2025' },
  ]},
]

export default function BlogPage() {
  const { language, setLanguage } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main>
      <Navbar />

      <section className={styles.hero}>
        <div className="container">
          <BookOpen size={32} className={styles.heroIcon} />
          <h1>{isEn ? 'Hakiki Blog' : 'Blogu ya Hakiki'}</h1>
          <p>{isEn ? 'Expert-driven research, buying guides, and car maintenance tips to help you make smarter decisions.' : 'Utafiti wa kitaalamu, miongozo ya kununua, na vidokezo vya matengenezo kukusaidia kufanya maamuzi bora.'}</p>
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
                  <div key={j} className={styles.articleCard}>
                    <span className={styles.articleDate}>{article.date}</span>
                    <h3>{isEn ? article.titleEn : article.titleSw}</h3>
                    <span className={styles.readMore}>{isEn ? 'Read more →' : 'Soma zaidi →'}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.footerBrand}><Shield size={20} /><span>Hakiki</span></div>
          <p>© {new Date().getFullYear()} Hakiki.</p>
        </div>
      </footer>
    </main>
  )
}
