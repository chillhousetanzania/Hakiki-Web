'use client'

import { Shield, Languages, HelpCircle, Mail, MessageCircle, Phone, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useLanguageStore } from '@/store/languageStore'
import Navbar from '@/components/Navbar'
import styles from './help.module.css'

const faqItems = [
  { qEn: 'What is a VIN and where do I find it?', qSw: 'VIN ni nini na ninaipata wapi?', aEn: 'A VIN (Vehicle Identification Number) is a unique 17-character code assigned to every vehicle. You can find it on the dashboard near the windshield, on the driver-side door jamb, in the engine bay, or on your vehicle registration documents.', aSw: 'VIN (Nambari ya Utambulisho wa Gari) ni msimbo wa herufi 17 unaopewa kila gari. Unaweza kuupata kwenye dashibodi karibu na kioo cha mbele, kwenye mlango wa dereva, kwenye injini, au kwenye nyaraka za usajili.' },
  { qEn: 'What is a chassis number?', qSw: 'Nambari ya chasi ni nini?', aEn: 'A chassis number is essentially the same as a VIN for most modern vehicles. For Japanese imports, it\'s printed on the vehicle inspection certificate (shaken) and follows a format like "ZZE122-5012345".', aSw: 'Nambari ya chasi ni sawa na VIN kwa magari mengi ya kisasa. Kwa magari ya Kijapani, imeandikwa kwenye cheti cha ukaguzi wa gari na inafuata muundo kama "ZZE122-5012345".' },
  { qEn: 'How long does a report take?', qSw: 'Ripoti inachukua muda gani?', aEn: 'Most reports are delivered within 40 seconds. Some vehicles from rare databases may take up to 5 minutes in rare cases.', aSw: 'Ripoti nyingi zinawasilishwa ndani ya sekunde 40. Magari mengine kutoka kanzidata adimu yanaweza kuchukua hadi dakika 5.' },
  { qEn: 'What payment methods do you accept?', qSw: 'Mnapokea njia gani za malipo?', aEn: 'We accept M-Pesa, Tigo Pesa, Airtel Money, Visa, Mastercard, and bank transfers. Mobile money is our most popular payment method.', aSw: 'Tunapokea M-Pesa, Tigo Pesa, Airtel Money, Visa, Mastercard, na uhawilisho wa benki. Pesa za simu ndiyo njia yetu maarufu zaidi ya malipo.' },
  { qEn: 'What if there\'s no data available for my car?', qSw: 'Je, kama hakuna data inayopatikana kwa gari langu?', aEn: 'If our system finds no data for your vehicle, you\'ll receive a full credit refund immediately — no questions asked. You can use the credit on another report.', aSw: 'Ikiwa mfumo wetu haupati data kwa gari lako, utapata refundi kamili ya krediti mara moja — bila maswali. Unaweza kutumia krediti hiyo kwenye ripoti nyingine.' },
  { qEn: 'Can I get a refund?', qSw: 'Naweza kupata refundi?', aEn: 'Yes. If a report returns no data, you get an automatic credit refund. For other issues, contact our support team and we\'ll resolve it within 24 hours.', aSw: 'Ndiyo. Ikiwa ripoti haileti data, unapata refundi ya krediti kiotomatiki. Kwa masuala mengine, wasiliana na timu yetu na tutatatua ndani ya masaa 24.' },
  { qEn: 'Do you check Japanese auction cars?', qSw: 'Mnahakiki magari ya minada ya Kijapani?', aEn: 'Yes! We specialize in Japanese import vehicles. We check auction records from USS, TAA, HAA, and other major Japanese auction houses — including inspection grades, damage reports, and mileage history.', aSw: 'Ndiyo! Tunabobea katika magari yanayoagizwa kutoka Japan. Tunahakiki rekodi za minada kutoka USS, TAA, HAA, na minada mikubwa ya Kijapani — ikiwa ni pamoja na daraja za ukaguzi, ripoti za uharibifu, na historia ya maileji.' },
  { qEn: 'How do I contact support?', qSw: 'Ninawasiliananaje na msaada?', aEn: 'You can reach us via WhatsApp, email at support@carhakiki.co.tz, or phone. Our team responds within 2 hours during business hours.', aSw: 'Unaweza kutufikia kupitia WhatsApp, barua pepe support@carhakiki.co.tz, au simu. Timu yetu inajibu ndani ya masaa 2 wakati wa kazi.' },
]

export default function HelpPage() {
  const { language, setLanguage } = useLanguageStore()
  const isEn = language === 'en'
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <main>
      <Navbar />

      <section className={styles.hero}>
        <div className="container">
          <HelpCircle size={32} className={styles.heroIcon} />
          <h1>{isEn ? 'Help Center' : 'Kituo cha Msaada'}</h1>
          <p>{isEn ? 'Find answers to common questions about CarHakiki vehicle history reports.' : 'Pata majibu ya maswali ya kawaida kuhusu ripoti za historia ya gari za CarHakiki.'}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <div key={i} className={`${styles.faqItem} ${openIndex === i ? styles.open : ''}`}>
                <button className={styles.faqQuestion} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  <span>{isEn ? item.qEn : item.qSw}</span>
                  <ChevronDown size={18} className={styles.chevron} />
                </button>
                {openIndex === i && (
                  <div className={styles.faqAnswer}>
                    <p>{isEn ? item.aEn : item.aSw}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contactSection}>
        <div className="container">
          <h2>{isEn ? 'Still need help?' : 'Bado unahitaji msaada?'}</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <MessageCircle size={24} />
              <h3>WhatsApp</h3>
              <p>{isEn ? 'Chat with us instantly' : 'Zungumza nasi papo hapo'}</p>
              <a href="https://wa.me/255700000000">+255 700 000 000</a>
            </div>
            <div className={styles.contactCard}>
              <Mail size={24} />
              <h3>{isEn ? 'Email' : 'Barua pepe'}</h3>
              <p>{isEn ? 'We reply within 2 hours' : 'Tunajibu ndani ya masaa 2'}</p>
              <a href="mailto:support@carhakiki.co.tz">support@carhakiki.co.tz</a>
            </div>
            <div className={styles.contactCard}>
              <Phone size={24} />
              <h3>{isEn ? 'Phone' : 'Simu'}</h3>
              <p>{isEn ? 'Mon-Sat, 8am-6pm EAT' : 'Jumatatu-Jumamosi, 8-18 EAT'}</p>
              <a href="tel:+255700000000">+255 700 000 000</a>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.footerBrand}><Shield size={20} /><span>CarHakiki</span></div>
          <p>© {new Date().getFullYear()} CarHakiki.</p>
        </div>
      </footer>
    </main>
  )
}
