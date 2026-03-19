'use client'

import Navbar from '@/components/Navbar'
import { Shield, Code2, Webhook, Zap, ArrowRight, Server, FileJson } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import styles from './api.module.css'

const apiFeatures = [
  { icon: <Code2 size={24} className={styles.iconDev} />, titleEn: 'RESTful Architecture', titleSw: 'Usanifu wa RESTful', descEn: 'Built on modern standards with predictable, resource-oriented URLs. Connect your app in under an hour.', descSw: 'Imejengwa kwa viwango vya kisasa na URL zinazotabirika. Unganisha programu yako chini ya saa moja.' },
  { icon: <FileJson size={24} className={styles.iconDev} />, titleEn: 'Rich JSON Responses', titleSw: 'Majibu Kamili ya JSON', descEn: 'Receive immaculately structured JSON data encompassing 1,000+ data points for any vehicle globally.', descSw: 'Pata data ya JSON iliyopangwa vizuri inayojumuisha zaidi ya pointi 1,000 za data kwa gari lolote duniani.' },
  { icon: <Webhook size={24} className={styles.iconDev} />, titleEn: 'Real-time Webhooks', titleSw: 'Webhooks za Ndani', descEn: 'Don\'t drain resources polling. We deliver the report payload directly to your server the second it finishes processing.', descSw: 'Usipoteze rasilimali. Tunawasilisha ripoti moja kwa moja kwenye seva yako mara tu inapokamilika.' },
  { icon: <Server size={24} className={styles.iconDev} />, titleEn: '99.99% Uptime SLA', titleSw: 'Upatikanaji 99.99% SLA', descEn: 'Enterprise-grade reliability handling millions of queries a month. We scale effortlessly alongside your business.', descSw: 'Uaminifu wa kiwango cha juu. Tunakua pamoja na biashara yako bila shida yoyote.' },
]

export default function ApiIntegrationPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.devHero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <div className={styles.devTag}>
              <Zap size={14} className={styles.zapIcon}/> Hakiki Developer Platform
            </div>
            <h1 className={styles.heroTitle}>
              {isEn ? 'Power your platform with vehicle history data' : 'Endesha jukwaa lako kwa data ya historia ya gari'}
            </h1>
            <p className={styles.heroSubtitle}>
              {isEn 
                ? 'The most comprehensive, reliable, and developer-friendly car history API in East Africa. Integrate 330M+ verified global records directly into your classifieds site, CRM, or fintech app.'
                : 'API kamili, inayoaminika, na rafiki kwa waendelezaji Afrika Mashariki. Unganisha rekodi 330M+ kwenye jukwaa lako.'}
            </p>
            <div className={styles.ctaRow}>
              <a href="#docs" className={styles.primaryBtn}>{isEn ? 'Read Documentation' : 'Soma Nyaraka'}</a>
              <a href="/contact" className={styles.secondaryBtn}>{isEn ? 'Get API Keys' : 'Pata Fungu la API'}</a>
            </div>
          </div>

          <div className={styles.codeWindow}>
            <div className={styles.windowHeader}>
              <div className={styles.windowDots}>
                <span></span><span></span><span></span>
              </div>
              <div className={styles.windowTitle}>POST /api/v1/reports</div>
            </div>
            <div className={styles.windowBody}>
              <pre className={styles.codeBlock}>
                <code>
                  <span className={styles.tokenComment}>// Request a full vehicle history report</span>{'\n'}
                  <span className={styles.tokenKeyword}>const</span> response = <span className={styles.tokenKeyword}>await</span> fetch(<span className={styles.tokenString}>'https://api.hakiki.co.tz/v1/reports'</span>, {'{\n'}
                  {'  '}method: <span className={styles.tokenString}>'POST'</span>,{'\n'}
                  {'  '}headers: {'{\n'}
                  {'    '}<span className={styles.tokenString}>'Authorization'</span>: <span className={styles.tokenString}>'Bearer pk_test_xxxx'</span>,{'\n'}
                  {'    '}<span className={styles.tokenString}>'Content-Type'</span>: <span className={styles.tokenString}>'application/json'</span>{'\n'}
                  {'  }'},{'\n'}
                  {'  '}body: JSON.<span className={styles.tokenFunction}>stringify</span>({'{\n'}
                  {'    '}vin: <span className={styles.tokenString}>'JTEBX3FJ50KXXXXXX'</span>,{'\n'}
                  {'    '}webhook_url: <span className={styles.tokenString}>'https://your-app.com/webhook'</span>{'\n'}
                  {'  }'}){'\n'}
                  {'}'});{'\n'}
                  {'\n'}
                  <span className={styles.tokenKeyword}>const</span> data = <span className={styles.tokenKeyword}>await</span> response.<span className={styles.tokenFunction}>json</span>();{'\n'}
                  <span className={styles.tokenComment}>// Returns {`{ id: "rep_123", status: "processing" }`}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.featuresHeader}>
            <h2 className={styles.featuresTitle}>{isEn ? 'Built for developers, by developers' : 'Imejengwa kwa ajili ya waendelezaji'}</h2>
            <p className={styles.featuresDesc}>
              {isEn ? 'Experience the fastest integration cycle in the automotive data industry. We handle the complexity of aggregating global databases so you can focus on building your product.' : 'Pata uzoefu wa muunganiko wa haraka zaidi katika sekta ya data ya magari.'}
            </p>
          </div>

          <div className={styles.gridContainer}>
            {apiFeatures.map((feat, i) => (
              <div key={i} className={styles.featureBox}>
                <div className={styles.iconBg}>{feat.icon}</div>
                <h3>{isEn ? feat.titleEn : feat.titleSw}</h3>
                <p>{isEn ? feat.descEn : feat.descSw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bottomCta}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>{isEn ? 'Start building in minutes' : 'Anza kujenga kwa dakika chache'}</h2>
            <p>{isEn ? 'Create a free sandbox account to test our endpoints and webhooks without entering a credit card.' : 'Fungua akaunti ya sandbox ya bure kupima API yetu.'}</p>
            <a href="/contact" className={styles.darkBtn}>
              {isEn ? 'Create Sandbox Account' : 'Fungua Akaunti ya Sandbox'} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} Hakiki Developers.</div>
      </footer>
    </main>
  )
}
