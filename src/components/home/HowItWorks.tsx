import { Search, CreditCard, FileText, CheckCircle } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import { translations } from '@/lib/translations'
import styles from './HowItWorks.module.css'

const ICONS = [
  <Search size={28} key="search" />,
  <FileText size={28} key="file" />,
  <CreditCard size={28} key="card" />,
  <CheckCircle size={28} key="check" />
]

export default function HowItWorks() {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <section className={styles.section} id="how-it-works-section">
      <div className="container">
        <h2 className={styles.title}>{t.howItWorks.sectionTitle}</h2>
        <p className={styles.subtitle}>
          {t.howItWorks.sectionSubtitle}
        </p>
        <div className={styles.stepsGrid}>
          {t.howItWorks.steps.map((step, i) => (
            <div key={i} className={styles.step} id={`how-step-${i}`}>
              <div className={styles.numberBg}>{i + 1}</div>
              <div className={styles.iconWrapper}>{ICONS[i]}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
