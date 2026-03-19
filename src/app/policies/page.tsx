'use client'

import LegalLayout from '@/components/LegalLayout'
import { useLanguageStore } from '@/store/languageStore'

export default function PrivacyPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <LegalLayout title={isEn ? 'Privacy Policy' : 'Sera ya Faragha'}>
      <p>
        {isEn 
          ? 'At Hakiki Data Ltd., we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services.'
          : 'Katika Hakiki Data Ltd., tunachukua faragha yako kwa uzito. Sera hii inaeleza jinsi tunavyokusanya na kulinda taarifa zako za kibinafsi.'}
      </p>

      <h2>{isEn ? '1. Information We Collect' : '1. Taarifa Tunazokusanya'}</h2>
      <p>
        {isEn 
          ? 'We collect information you provide directly to us when you create an account, purchase a report, or communicate with us. This includes:'
          : 'Tunakusanya taarifa unazotoa moja kwa moja unapotuundia akaunti au kununua ripoti. Hii inajumuisha:'}
      </p>
      <ul>
        <li>{isEn ? 'Name and email address' : 'Jina na anwani ya barua pepe'}</li>
        <li>{isEn ? 'Billing information (processed securely via Stripe/Pesapal)' : 'Taarifa za malipo'}</li>
        <li>{isEn ? 'VINs you search for' : 'Nambari za VIN unazotafuta'}</li>
      </ul>

      <h2>{isEn ? '2. How We Use Information' : '2. Jinsi Tunavyotumia Taarifa'}</h2>
      <p>
        {isEn 
          ? 'We use the information we collect to provide, maintain, and improve our services, process transactions, send technical notices, and respond to your comments and questions.'
          : 'Tunatumia taarifa kutoa na kuboresha huduma zetu na kuchakata miamala.'}
      </p>

      <h2>{isEn ? '3. Data Sharing' : '3. Kushiriki Data'}</h2>
      <p>
        {isEn 
          ? 'We do not sell your personal data. We may share information with third-party vendors (like payment processors) who need access to such information to carry out work on our behalf. Your searches for specific VINs are anonymized when querying external databases.'
          : 'Hatuuzi data yako ya kibinafsi. Tunaweza kushiriki taarifa na watoa huduma wetu.'}
      </p>

      <h2>{isEn ? '4. Security' : '4. Usalama'}</h2>
      <p>
        {isEn 
          ? 'We implement robust technical and organizational measures to secure your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.'
          : 'Tunachukua hatua madhubuti kulinda data yako ya kibinafsi dhidi ya upatikanaji usioidhinishwa.'}
      </p>
    </LegalLayout>
  )
}
