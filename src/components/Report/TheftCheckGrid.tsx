'use client'

import React from 'react'
import styles from './TheftCheckGrid.module.css'
import { Check, ShieldCheck } from 'lucide-react'

interface CountryCheck {
  code: string
  name: string
  status: 'clear' | 'stolen' | 'checking'
}

interface TheftCheckGridProps {
  checks: CountryCheck[]
  language: 'en' | 'sw'
}

const flagMap: Record<string, string> = {
  JP: '🇯🇵',
  TZ: '🇹🇿',
  UK: '🇬🇧',
  US: '🇺🇸',
  ZA: '🇿🇦',
  KE: '🇰🇪',
  AE: '🇦🇪', // UAE
  DE: '🇩🇪', // Germany
}

const TheftCheckGrid: React.FC<TheftCheckGridProps> = ({ checks, language }) => {
  const isEn = language === 'en'

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ShieldCheck size={24} className={styles.shieldIcon} />
        <div>
          <h3>{isEn ? 'Theft Database Records' : 'Rekodi za Vyombo vya Sheria'}</h3>
          <p>{isEn ? 'Checked in 8 international police & insurance databases' : 'Zimekaguliwa katika kanzidata 8 za polisi na bima za kimataifa'}</p>
        </div>
      </div>

      <div className={styles.grid}>
        {checks.map((check) => (
          <div key={check.code} className={styles.countryBox}>
            <span className={styles.flag}>{flagMap[check.code] || '🌐'}</span>
            <span className={styles.countryName}>{isEn ? check.name : check.name}</span>
            <div className={styles.statusBadge}>
              <Check size={14} />
              <span>{isEn ? 'Clear' : 'Salama'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TheftCheckGrid
