'use client'

import { Star, Quote } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/lib/translations'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    nameEn: 'James M.',
    nameSw: 'James M.',
    locationEn: 'Dar es Salaam',
    locationSw: 'Dar es Salaam',
    quoteEn: 'I was about to buy a Land Cruiser Prado with 80,000 km on the clock. Hakiki showed the real mileage was 215,000 km. Saved me millions!',
    quoteSw: 'Nilikuwa karibu kununua Land Cruiser Prado yenye kilomita 80,000. Hakiki ilionyesha maileji halisi ilikuwa 215,000 km. Iliniokoa mamilioni!',
    rating: 5,
  },
  {
    nameEn: 'Amina K.',
    nameSw: 'Amina K.',
    locationEn: 'Arusha',
    locationSw: 'Arusha',
    quoteEn: 'The dealer swore the car was clean. Hakiki uncovered two major accidents in Japan. Best TZS 25,000 I ever spent.',
    quoteSw: 'Muuzaji aliapa gari lilikuwa safi. Hakiki iligundua ajali mbili kubwa Japan. TZS 25,000 bora niliyowahi kutumia.',
    rating: 5,
  },
  {
    nameEn: 'Peter N.',
    nameSw: 'Peter N.',
    locationEn: 'Mwanza',
    locationSw: 'Mwanza',
    quoteEn: 'I checked 3 cars before choosing one. Hakiki bundles made it affordable and I drove away with total confidence.',
    quoteSw: 'Nilihakiki magari 3 kabla ya kuchagua moja. Vifurushi vya Hakiki vilikuwa nafuu na niliondoka kwa ujasiri kamili.',
    rating: 5,
  },
]

export default function Testimonials() {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <section className={styles.section} id="testimonials-section">
      <div className={`container ${styles.content}`}>
        <div className={styles.header}>
          <h2 className="section-title">{t.testimonials.title}</h2>
          <p className="section-subtitle">{t.testimonials.subtitle}</p>
        </div>
        <div className={styles.grid}>
          {testimonials.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.quoteIcon}>
                <Quote size={24} />
              </div>
              <p className={styles.quote}>
                {language === 'en' ? item.quoteEn : item.quoteSw}
              </p>
              <div className={styles.stars}>
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="#FFD700" stroke="#FFD700" />
                ))}
              </div>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {(language === 'en' ? item.nameEn : item.nameSw).charAt(0)}
                </div>
                <div>
                  <div className={styles.name}>
                    {language === 'en' ? item.nameEn : item.nameSw}
                  </div>
                  <div className={styles.location}>
                    {language === 'en' ? item.locationEn : item.locationSw}
                  </div>
                </div>
                <span className={styles.verified}>✓ Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
