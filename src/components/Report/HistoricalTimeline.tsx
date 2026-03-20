'use client'

import React from 'react'
import styles from './HistoricalTimeline.module.css'
import { Calendar, MapPin, Shield, AlertCircle } from 'lucide-react'

export interface TimelineEvent {
  date: string
  title: string
  description: string
  location?: string
  countryCode?: string // e.g., 'JP', 'TZ', 'UK'
  type: 'registration' | 'sale' | 'accident' | 'inspection' | 'import'
}

interface HistoricalTimelineProps {
  events: TimelineEvent[]
  language: 'en' | 'sw'
}

const flagMap: Record<string, string> = {
  JP: '🇯🇵',
  TZ: '🇹🇿',
  UK: '🇬🇧',
  US: '🇺🇸',
}

const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({ events, language }) => {
  const isEn = language === 'en'

  const getIcon = (type: string) => {
    switch (type) {
      case 'registration': return <Calendar size={18} />
      case 'accident': return <AlertCircle size={18} />
      case 'inspection': return <Shield size={18} />
      default: return <MapPin size={18} />
    }
  }

  return (
    <div className={styles.timelineContainer}>
      <h3 className={styles.timelineTitle}>{isEn ? 'Historical Timeline' : 'Historia ya Matukio'}</h3>
      <div className={styles.timelineList}>
        {events.map((event, index) => (
          <div key={index} className={styles.eventItem}>
            <div className={styles.markerColumn}>
              <div className={`${styles.iconMarker} ${styles[event.type]}`}>
                {getIcon(event.type)}
              </div>
              {index !== events.length - 1 && <div className={styles.verticalLine}></div>}
            </div>
            <div className={styles.contentColumn}>
              <div className={styles.eventHeader}>
                <span className={styles.eventDate}>{new Date(event.date).toLocaleDateString(isEn ? 'en-US' : 'sw-TZ', { month: 'long', year: 'numeric' })}</span>
                {event.countryCode && (
                  <span className={styles.eventCountry}>
                    {flagMap[event.countryCode] || event.countryCode} {event.location}
                  </span>
                )}
              </div>
              <h4 className={styles.eventTitle}>{event.title}</h4>
              <p className={styles.eventDesc}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoricalTimeline
