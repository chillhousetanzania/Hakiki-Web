'use client'

import React from 'react'
import styles from './MileageRollbackExplorer.module.css'
import { AlertTriangle, TrendingUp } from 'lucide-react'

export interface MileageReading {
  date: string
  mileage: number
  source?: string
}

interface MileageRollbackExplorerProps {
  readings: MileageReading[]
  language: 'en' | 'sw'
}

const MileageRollbackExplorer: React.FC<MileageRollbackExplorerProps> = ({ readings, language }) => {
  const isEn = language === 'en'

  // 1. SORT READINGS BY DATE
  const sortedReadings = [...readings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // 2. DETECTION ALGORITHM
  const processedReadings = sortedReadings.reduce<{
    acc: (MileageReading & { isRollback: boolean, maxPrevious: number })[],
    max: number,
    rollbackIdx: number
  }>((context, r, i) => {
    const isRollback = r.mileage < context.max
    const newRollbackIdx = (isRollback && context.rollbackIdx === -1) ? i : context.rollbackIdx
    const newMax = Math.max(context.max, r.mileage)
    
    context.acc.push({ ...r, isRollback, maxPrevious: newMax })
    return { acc: context.acc, max: newMax, rollbackIdx: newRollbackIdx }
  }, { acc: [], max: 0, rollbackIdx: -1 })

  const rollbackIndex = processedReadings.rollbackIdx
  const finalReadings = processedReadings.acc
  const hasRollback = rollbackIndex !== -1

  // 3. SVG CHART CALCULATIONS
  const width = 600
  const height = 200
  const padding = 40
  
  const minMileage = 0
  const maxVal = Math.max(...sortedReadings.map(r => r.mileage), 1000) * 1.1

  const getX = (index: number) => (index / (sortedReadings.length - 1)) * (width - 2 * padding) + padding
  const getY = (val: number) => height - padding - ((val / maxVal) * (height - 2 * padding))

  const points = finalReadings.map((r, i) => ({
    x: getX(i),
    y: getY(r.mileage),
    ...r
  }))

  return (
    <div className={styles.container}>
      {hasRollback && (
        <div className={styles.alertBanner}>
          <AlertTriangle size={24} className={styles.alertIcon} />
          <div>
            <h4>{isEn ? 'Odometer Rollback Detected' : 'Udanganyifu wa Kilometa Umegundulika'}</h4>
            <p>
              {isEn 
                ? `A discrepancy was found at the last reading. The current mileage is lower than recorded in ${new Date(finalReadings[rollbackIndex-1].date).getFullYear()}.`
                : `Tofauti imegunduliwa kwenye usomaji wa mwisho. Kilometa za sasa ni chache kuliko zilizorekodiwa mwaka ${new Date(finalReadings[rollbackIndex-1].date).getFullYear()}.`}
            </p>
          </div>
        </div>
      )}

      <div className={styles.chartWrapper}>
        <svg viewBox={`0 0 ${width} ${height}`} className={styles.chartSvg}>
          {/* GRID LINES */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e2e8f0" strokeWidth="1" />
          
          {/* THE LINE PATHS */}
          {points.map((p, i) => {
            if (i === 0) return null
            const prev = points[i-1]
            const isAnomalous = p.mileage < prev.mileage
            
            return (
              <line
                key={`line-${i}`}
                x1={prev.x}
                y1={prev.y}
                x2={p.x}
                y2={p.y}
                stroke={isAnomalous ? '#ef4444' : '#22c55e'}
                strokeWidth="3"
                strokeDasharray={isAnomalous ? '8,4' : '0'}
                className={isAnomalous ? styles.anomalousPath : ''}
              />
            )
          })}

          {/* DATA POINTS */}
          {points.map((p, i) => (
            <g key={`point-${i}`} className={styles.pointGroup}>
              <circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill="white"
                stroke={p.isRollback ? '#ef4444' : '#22c55e'}
                strokeWidth="3"
              />
              <text x={p.x} y={p.y - 15} textAnchor="middle" className={styles.pointLabel}>
                {new Date(p.date).getFullYear()}
              </text>
              <text x={p.x} y={p.y + 25} textAnchor="middle" className={styles.mileageLabel}>
                {(p.mileage / 1000).toFixed(0)}k km
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statBox}>
          <TrendingUp size={20} />
          <div>
            <span>{isEn ? 'Last Honest Record' : 'Rekodi ya Mwisho Halisi'}</span>
            <strong>{finalReadings[hasRollback ? rollbackIndex-1 : points.length-1].mileage.toLocaleString()} km</strong>
          </div>
        </div>
        {hasRollback && (
          <div className={`${styles.statBox} ${styles.statBoxRed}`}>
            <AlertTriangle size={20} />
            <div>
              <span>{isEn ? 'Estimated Rollback' : 'Makadirio ya Upunguzaji'}</span>
              <strong>+{(finalReadings[rollbackIndex-1].mileage - finalReadings[rollbackIndex].mileage).toLocaleString()} km</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MileageRollbackExplorer
