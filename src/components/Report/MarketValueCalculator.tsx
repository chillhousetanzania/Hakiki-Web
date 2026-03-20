import React, { useState } from 'react'
import styles from './MarketValueCalculator.module.css'
import { TrendingUp, TrendingDown, Info, ShieldCheck } from 'lucide-react'

interface MarketValueCalculatorProps {
  make: string
  model: string
  year: number
  estimatedValueRange: [number, number] // e.g., [85000000, 95000000] (in TZS)
  language: 'en' | 'sw'
}

export default function MarketValueCalculator({
  make,
  model,
  year,
  estimatedValueRange,
  language,
}: MarketValueCalculatorProps) {
  const isEn = language === 'en'
  const [askingPriceStr, setAskingPriceStr] = useState('')

  // Clean and parse input
  const askingPrice = parseInt(askingPriceStr.replace(/\D/g, ''), 10) || 0

  const [minVal, maxVal] = estimatedValueRange
  const midVal = (minVal + maxVal) / 2

  // Determine deal status
  let dealStatus = 'unknown'
  if (askingPrice > 0) {
    if (askingPrice > maxVal) dealStatus = 'overpriced'
    else if (askingPrice < minVal) dealStatus = 'great'
    else dealStatus = 'fair'
  }

  // Formatting helpers
  const formatTzs = (num: number) => {
    return `TZS ${(num / 1000000).toFixed(1)}M`
  }
  const formatTzsFull = (num: number) => {
    return new Intl.NumberFormat('en-TZ').format(num)
  }

  // Handle formatted input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    if (!rawValue) {
      setAskingPriceStr('')
      return
    }
    const num = parseInt(rawValue, 10)
    setAskingPriceStr(new Intl.NumberFormat('en-TZ').format(num))
  }

  // Calculate gauge position based on input (clamped between 0 and 100%)
  const gaugeMinBound = midVal * 0.7
  const gaugeMaxBound = midVal * 1.3
  const gaugeRange = gaugeMaxBound - gaugeMinBound
  const clampPos = Math.max(0, Math.min(100, ((askingPrice - gaugeMinBound) / gaugeRange) * 100))
  
  const markerStyle = { left: `${clampPos}%` }

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>
            {isEn ? 'Market Price Calculator' : 'Kikokotoo cha Bei ya Soko'}
          </h3>
          <p className={styles.subtitle}>
            {year} {make} {model}
          </p>
        </div>
        <div className={styles.badgeLabel}>
          <ShieldCheck size={16} /> 
          {isEn ? 'Based on Local Tanzania Data' : 'Kulingana na Data za Tanzania'}
        </div>
      </div>

      <div className={styles.calculatorFlex}>
        
        {/* LEFT: Estimator Logic */}
        <div className={styles.inputSection}>
          <label className={styles.inputLabel}>
            {isEn ? 'Enter Seller\'s Asking Price (TZS):' : 'Ingiza Bei anayotaka Muuzaji (TZS):'}
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.currencyPrefix}>TZS</span>
            <input 
              type="text" 
              className={styles.priceInput}
              value={askingPriceStr}
              onChange={handleInputChange}
              placeholder="e.g. 90,000,000"
            />
          </div>

          {askingPrice > 0 && (
            <div className={`${styles.statusBox} ${styles[dealStatus]}`}>
               {dealStatus === 'great' && (
                 <>
                   <TrendingDown size={24} className={styles.statusIcon} />
                   <div>
                     <div className={styles.statusTitle}>{isEn ? 'Great Deal!' : 'Dili Nzuri Sana!'}</div>
                     <div className={styles.statusDesc}>{isEn ? 'The asking price is below the current market average. Buy with confidence if the condition checks out.' : 'Bei iko chini ya wastani wa soko. Nunua kwa ujasiri kama gari ni zima.'}</div>
                   </div>
                 </>
               )}
               {dealStatus === 'fair' && (
                 <>
                   <ShieldCheck size={24} className={styles.statusIcon} />
                   <div>
                     <div className={styles.statusTitle}>{isEn ? 'Fair Market Price' : 'Bei ya Sawa ya Soko'}</div>
                     <div className={styles.statusDesc}>{isEn ? 'This price aligns well with similar vehicles imported to Tanzania recently.' : 'Bei hii inashabihiana vyema na magari kama haya yaliyoingizwa Tanzania hivi karibuni.'}</div>
                   </div>
                 </>
               )}
               {dealStatus === 'overpriced' && (
                 <>
                   <TrendingUp size={24} className={styles.statusIcon} />
                   <div>
                     <div className={styles.statusTitle}>{isEn ? 'Overpriced Warning' : 'Onyo: Bei Iko Juu Mno'}</div>
                     <div className={styles.statusDesc}>{isEn ? `You could be overpaying by ${formatTzsFull(askingPrice - maxVal)} TZS. Use this report to negotiate a better deal.` : `Pengine unalipa zaidi kwa TZS ${formatTzsFull(askingPrice - maxVal)}. Tumia ripoti hii kujadili punguzo.`}</div>
                   </div>
                 </>
               )}
            </div>
          )}

        </div>

        {/* RIGHT: Visual Gauge */}
        <div className={styles.gaugeSection}>
           <div className={styles.marketEstimateBox}>
              <div className={styles.estimateLabel}>{isEn ? 'Estimated Market Value' : 'Makadirio ya Thamani ya Soko'}</div>
              <div className={styles.estimateValue}>{formatTzs(minVal)} - {formatTzs(maxVal)}</div>
           </div>

           <div className={styles.gaugeVisual}>
             <div className={styles.gradientBar}>
                {/* Visual marker of the min/max generic range */}
                <div 
                  className={styles.targetRange} 
                  style={{ 
                    left: `${((minVal - gaugeMinBound) / gaugeRange) * 100}%`,
                    width: `${((maxVal - minVal) / gaugeRange) * 100}%`
                  }} 
                />
                
                {/* Pointer for user's input price */}
                {askingPrice > 0 && (
                  <div className={styles.priceMarker} style={markerStyle}>
                    <div className={styles.markerArrow}></div>
                    <div className={styles.markerLabel}>{formatTzs(askingPrice)}</div>
                  </div>
                )}
             </div>
             
             <div className={styles.gaugeLabels}>
               <span>{formatTzs(gaugeMinBound)}</span>
               <span>{formatTzs(midVal)}</span>
               <span>{formatTzs(gaugeMaxBound)}</span>
             </div>
           </div>

           <div className={styles.disclaimerText}>
             <Info size={14} />
             {isEn 
               ? 'Valuation is an estimate calculated using recent Tanzanian registration data, import taxes, and global depreciation curves. It does not replace a physical mechanical inspection.'
               : 'Tathmini hii ni makisio yanayotumia data za usajili za Tanzania, kodi za kuingiza, na uchakavu. Haichukui nafasi ya ukaguzi wa kiufundi.'}
           </div>
        </div>

      </div>
    </div>
  )
}
