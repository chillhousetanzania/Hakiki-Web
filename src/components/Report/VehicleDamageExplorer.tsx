'use client'

import React from 'react'
import styles from './VehicleDamageExplorer.module.css'

interface DamageRecord {
  part: string
  level: 'minor' | 'major' | 'none'
}

interface VehicleDamageExplorerProps {
  damageRecords: DamageRecord[]
}

const VehicleDamageExplorer: React.FC<VehicleDamageExplorerProps> = ({ damageRecords }) => {
  const getPartLevel = (partId: string) => {
    const record = damageRecords.find((r) => r.part === partId)
    return record ? record.level : 'none'
  }

  const getPartColor = (partId: string) => {
    const level = getPartLevel(partId)
    if (level === 'major') return '#ef4444' // Red
    if (level === 'minor') return '#f59e0b' // Yellow/Orange
    return '#f1f5f9' // Default/Clean Light Gray
  }

  const getPartStroke = (partId: string) => {
    const level = getPartLevel(partId)
    if (level === 'major') return '#dc2626'
    if (level === 'minor') return '#d97706'
    return '#cbd5e1'
  }

  return (
    <div className={styles.explorerContainer}>
      <svg
        viewBox="0 0 200 450"
        className={styles.vehicleSvg}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SHADOW / GLOW BACKGROUND */}
        <rect x="10" y="10" width="180" height="430" rx="30" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

        {/* VEHICLE OUTLINE & SHELL */}
        <path
          d="M50,40 Q50,20 100,20 Q150,20 150,40 L155,100 Q160,150 160,200 L160,350 Q160,420 100,420 Q40,420 40,350 L40,200 Q40,150 45,100 Z"
          fill="#ffffff"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* FRONT BUMPER / HOOD AREA */}
        <path
          id="hood"
          d="M50,40 Q50,25 100,25 Q150,25 150,40 L145,110 L55,110 Z"
          fill={getPartColor('hood')}
          stroke={getPartStroke('hood')}
          strokeWidth="1.5"
          className={styles.part}
        />
        <path
          id="frontBumper"
          d="M55,25 Q100,20 145,25 L150,40 L50,40 Z"
          fill={getPartColor('frontBumper')}
          stroke={getPartStroke('frontBumper')}
          strokeWidth="1.5"
          className={styles.part}
        />

        {/* FRONT FENDERS */}
        <path
          id="fenderFrontLeft"
          d="M45,100 L55,110 L55,160 L42,160 Z"
          fill={getPartColor('fenderFrontLeft')}
          stroke={getPartStroke('fenderFrontLeft')}
          strokeWidth="1"
          className={styles.part}
        />
        <path
          id="fenderFrontRight"
          d="M155,100 L145,110 L145,160 L158,160 Z"
          fill={getPartColor('fenderFrontRight')}
          stroke={getPartStroke('fenderFrontRight')}
          strokeWidth="1"
          className={styles.part}
        />

        {/* DOORS FRONT */}
        <path
          id="doorFrontLeft"
          d="M42,160 L75,160 L75,240 L40,240 Z"
          fill={getPartColor('doorFrontLeft')}
          stroke={getPartStroke('doorFrontLeft')}
          strokeWidth="1.5"
          className={styles.part}
        />
        <path
          id="doorFrontRight"
          d="M158,160 L125,160 L125,240 L160,240 Z"
          fill={getPartColor('doorFrontRight')}
          stroke={getPartStroke('doorFrontRight')}
          strokeWidth="1.5"
          className={styles.part}
        />

        {/* DOORS REAR */}
        <path
          id="doorRearLeft"
          d="M40,240 L75,240 L75,320 L40,320 Z"
          fill={getPartColor('doorRearLeft')}
          stroke={getPartStroke('doorRearLeft')}
          strokeWidth="1.5"
          className={styles.part}
        />
        <path
          id="doorRearRight"
          d="M160,240 L125,240 L125,320 L160,320 Z"
          fill={getPartColor('doorRearRight')}
          stroke={getPartStroke('doorRearRight')}
          strokeWidth="1.5"
          className={styles.part}
        />

        {/* REAR QUARTERS / FENDERS */}
        <path
          id="fenderRearLeft"
          d="M40,320 L75,320 L75,380 L45,400 Z"
          fill={getPartColor('fenderRearLeft')}
          stroke={getPartStroke('fenderRearLeft')}
          strokeWidth="1"
          className={styles.part}
        />
        <path
          id="fenderRearRight"
          d="M160,320 L125,320 L125,380 L155,400 Z"
          fill={getPartColor('fenderRearRight')}
          stroke={getPartStroke('fenderRearRight')}
          strokeWidth="1"
          className={styles.part}
        />

        {/* ROOF SECTION */}
        <rect
          id="roof"
          x="75"
          y="160"
          width="50"
          height="160"
          fill={getPartColor('roof')}
          stroke={getPartStroke('roof')}
          strokeWidth="1.5"
          className={styles.part}
        />

        {/* TRUNK / TAILGATE */}
        <path
          id="tailgate"
          d="M45,400 L155,400 Q150,420 100,420 Q50,420 45,400 Z"
          fill={getPartColor('tailgate')}
          stroke={getPartStroke('tailgate')}
          strokeWidth="1.5"
          className={styles.part}
        />
        <path
          id="rearBumper"
          d="M50,380 L150,380 L155,400 L45,400 Z"
          fill={getPartColor('rearBumper')}
          stroke={getPartStroke('rearBumper')}
          strokeWidth="1.5"
          className={styles.part}
        />

        {/* WINDOWS / WINDSHIELD (Aesthetics) */}
        <path d="M60,115 L140,115 L135,145 L65,145 Z" fill="#e2e8f0" />
        <path d="M60,375 L140,375 L135,355 L65,355 Z" fill="#e2e8f0" />
      </svg>
      <div className={styles.legend}>
         <div className={styles.legendItem}><span className={styles.dotMajor}></span> Major Impact</div>
         <div className={styles.legendItem}><span className={styles.dotMinor}></span> Minor Damage</div>
      </div>
    </div>
  )
}

export default VehicleDamageExplorer
