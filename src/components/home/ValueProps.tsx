'use client'

import Image from 'next/image'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/lib/translations'
import styles from './ValueProps.module.css'

const images = ['/valueprop-1.png', '/valueprop-2.png', '/valueprop-3.png']

export default function ValueProps() {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <section className={styles.section} id="value-props-section">
      <div className={`container ${styles.content}`}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{t.valueProps.title}</h2>
          <p className={styles.sectionSubtitle}>{t.valueProps.subtitle}</p>
        </div>
        <div className={styles.grid}>
          {t.valueProps.items.map((item: { title: string; description: string }, i: number) => (
            <div key={i} className={styles.card}>
              <div className={styles.illustrationWrap}>
                <Image
                  src={images[i]}
                  alt={item.title}
                  width={120}
                  height={120}
                  className={styles.illustration}
                />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
