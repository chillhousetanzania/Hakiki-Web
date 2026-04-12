import { ShieldCheck } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import styles from './CarHakikiInsights.module.css'

interface CarHakikiInsightsProps {
  title: string
  content: string
  language?: 'en' | 'sw'
}

const CarHakikiInsights: React.FC<CarHakikiInsightsProps> = ({ title, content, language }) => {
  const storeLanguage = useLanguageStore((state) => state.language)
  const isEn = (language || storeLanguage) === 'en'

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <ShieldCheck size={20} />
        </div>
        <div className={styles.headerText}>
          <span>{isEn ? 'CarHakiki Expert Insight' : 'Ushauri wa Kitaalamu wa CarHakiki'}</span>
          <h3>{title}</h3>
        </div>
      </div>
      <div className={styles.content}>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default CarHakikiInsights
