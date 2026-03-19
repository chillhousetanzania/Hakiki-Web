'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/lib/translations'
import styles from './FAQ.module.css'

export default function FAQ() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className={styles.section} id="faq-section">
      <div className={`container ${styles.content}`}>
        <div className={styles.header}>
          <h2 className="section-title">{t.faq.title}</h2>
          <p className="section-subtitle">{t.faq.subtitle}</p>
        </div>
        <div className={styles.list}>
          {t.faq.items.map((item: { q: string; a: string }, i: number) => (
            <div
              key={i}
              className={`${styles.item} ${openIndex === i ? styles.open : ''}`}
            >
              <button className={styles.question} onClick={() => toggle(i)}>
                <span>{item.q}</span>
                <ChevronDown size={20} className={styles.chevron} />
              </button>
              <div className={styles.answer}>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
