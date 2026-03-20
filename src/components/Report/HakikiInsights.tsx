'use client'

import React from 'react'
import styles from './HakikiInsights.module.css'
import { Info, Lightbulb } from 'lucide-react'

interface HakikiInsightsProps {
  title?: string
  content: string
  language: 'en' | 'sw'
}

const HakikiInsights: React.FC<HakikiInsightsProps> = ({ title, content, language }) => {
  const isEn = language === 'en'

  return (
    <div className={styles.insightsBox}>
      <div className={styles.iconContainer}>
        <Lightbulb size={24} className={styles.lightbulb} />
      </div>
      <div className={styles.textContainer}>
        {title && <h4 className={styles.insightsTitle}>{title}</h4>}
        <p className={styles.insightsContent}>{content}</p>
        <div className={styles.brandTag}>
          <Info size={14} />
          <span>{isEn ? 'Hakiki Expert Insight' : 'Ushauri wa Kitaalamu wa Hakiki'}</span>
        </div>
      </div>
    </div>
  )
}

export default HakikiInsights
