'use client'

import Image from 'next/image'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/lib/translations'
import styles from './Features.module.css'

const featureImages = [
  '/feature-photos.png',
  '/feature-damage.png',
  '/feature-theft.png',
  null,
]

function PhotoCollage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.collageContainer}>
      <div className={styles.collageMain}>
        <div className={styles.collageImgWrap}>
          <Image src={src} alt={alt} fill className={styles.sliceTopLeft} unoptimized />
        </div>
      </div>
      <div className={styles.collageThumbs}>
        <div className={styles.collageThumb}>
          <Image src={src} alt="Damage 1" fill className={styles.sliceTopRight} unoptimized />
        </div>
        <div className={styles.collageThumb}>
          <Image src={src} alt="Damage 2" fill className={styles.sliceBottomLeft} unoptimized />
        </div>
        <div className={styles.collageThumb}>
          <Image src={src} alt="Interior" fill className={styles.sliceBottomRight} unoptimized />
        </div>
      </div>
    </div>
  )
}

function OwnershipIllustration() {
  return (
    <div className={styles.svgIllustration}>
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.svgImage}>
        {/* Background */}
        <rect width="320" height="220" rx="12" fill="#F0F4FF"/>
        
        {/* Timeline line */}
        <line x1="60" y1="30" x2="60" y2="190" stroke="#0046CC" strokeWidth="3" strokeDasharray="6 4"/>
        
        {/* Owner 1 */}
        <circle cx="60" cy="45" r="10" fill="#0046CC"/>
        <rect x="80" y="30" width="220" height="35" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
        <circle cx="98" cy="48" r="10" fill="#FFD700"/>
        <text x="115" y="44" fontSize="11" fontWeight="700" fill="#003D99">🇯🇵 First Owner — Tokyo</text>
        <text x="115" y="57" fontSize="9" fill="#8892A8">Jan 2018 — Dec 2021</text>
        
        {/* Owner 2 */}
        <circle cx="60" cy="95" r="10" fill="#0046CC"/>
        <rect x="80" y="80" width="220" height="35" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="1"/>
        <circle cx="98" cy="98" r="10" fill="#00C853"/>
        <text x="115" y="94" fontSize="11" fontWeight="700" fill="#003D99">🇦🇪 Second Owner — Dubai</text>
        <text x="115" y="107" fontSize="9" fill="#8892A8">Mar 2022 — Aug 2023</text>
        
        {/* Owner 3 (current) */}
        <circle cx="60" cy="145" r="10" fill="#FFD700"/>
        <rect x="80" y="130" width="220" height="35" rx="8" fill="#FFFDE7" stroke="#FFD700" strokeWidth="2"/>
        <circle cx="98" cy="148" r="10" fill="#FF9100"/>
        <text x="115" y="144" fontSize="11" fontWeight="700" fill="#003D99">🇹🇿 Current — Dar es Salaam</text>
        <text x="115" y="157" fontSize="9" fill="#8892A8">Nov 2023 — Present</text>
        
        {/* Total owners badge */}
        <rect x="100" y="178" width="120" height="28" rx="14" fill="#0046CC"/>
        <text x="160" y="196" fontSize="11" fontWeight="700" fill="white" textAnchor="middle">3 Previous Owners</text>
      </svg>
    </div>
  )
}

export default function Features() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const displayFeatures = t.features.items.slice(0, 4)

  return (
    <section className={styles.section} id="features-section">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{t.features.sectionTitle}</h2>
          <p className={styles.subtitle}>{t.features.sectionSubtitle}</p>
        </div>
        <div className={styles.grid}>
          {displayFeatures.map((feature: { title: string; description: string }, i: number) => (
            <div key={i} className={styles.card} id={`feature-card-${i}`}>
              <div className={styles.imageWrap}>
                {i === 0 ? (
                  <PhotoCollage src={featureImages[i] || ''} alt={feature.title} />
                ) : featureImages[i] ? (
                  <Image
                    src={featureImages[i]!}
                    alt={feature.title}
                    width={320}
                    height={220}
                    className={styles.featureImage}
                  />
                ) : (
                  <OwnershipIllustration />
                )}
              </div>
              <div className={styles.textWrap}>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
