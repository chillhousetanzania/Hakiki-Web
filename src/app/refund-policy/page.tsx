'use client'

import LegalLayout from '@/components/LegalLayout'
import { useLanguageStore } from '@/store/languageStore'

export default function RefundPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <LegalLayout title={isEn ? 'Report Return Policy' : 'Sera ya Kurejesha Pesa'}>
      <p>
        {isEn 
          ? 'We want you to be completely satisfied with Hakiki. However, due to the nature of digital data retrieval, our report return policy has specific conditions under which a refund may be issued.'
          : 'Tunataka uridhike kabisa na Hakiki. Hata hivyo, kutokana na asili ya uchoraji wa data za kidijitali, sera yetu ya kurejesha ina masharti maalum.'}
      </p>

      <h2>{isEn ? '1. Empty Reports (Full Refund)' : '1. Ripoti Tupu (Kurejeshewa Kamili)'}</h2>
      <p>
        {isEn 
          ? 'If you purchase a report and our systems return absolutely zero data points across all global databases (no specs, no mileage, no photos, no theft records), your account will automatically be credited back the report token.'
          : 'Ikiwa utanunua ripoti na mifumo yetu ikashindwa kupata data yoyote katika kanzidata zote za kimataifa, akaunti yako itarejeshewa salio lake otomatiki.'}
      </p>

      <h2>{isEn ? '2. Partial Data' : '2. Data Nusu'}</h2>
      <p>
        {isEn 
          ? 'If a report contains basic specifications but lacks damage history or mileage records, this does not qualify for a refund. It simply means the vehicle has no recorded accidents or verifiable mileage jumps in our participating databases.'
          : 'Ikiwa ripoti ina uainisho wa kimsingi lakini haina historia ya uharibifu, hii haistahiki kurejeshewa pesa. Inamaanisha tu gari halina ajali zilizorekodiwa.'}
      </p>

      <h2>{isEn ? '3. Duplicate Purchases' : '3. Ununuzi Maradufu'}</h2>
      <p>
        {isEn 
          ? 'If you accidentally purchase a report for the exact same VIN twice within a 30-day period, please contact support within 72 hours to request a refund for the duplicate charge.'
          : 'Ikiwa utanunua ripoti kwa VIN sawa kimakosa mara mbili ndani ya siku 30, tafadhali wasiliana na usaidizi ndani ya masaa 72.'}
      </p>

      <h2>{isEn ? '4. How to Request a Refund' : '4. Jinsi ya Kuomba Kurejeshewa Pesa'}</h2>
      <p>
        {isEn 
          ? 'To initiate a refund request, please email support@hakiki.co.tz with your Account Email and the specific VIN. Our billing team will review all requests within 3 business days.'
          : 'Ili kuanzisha ombi la kurejeshewa pesa, tafadhali tuma barua pepe kwa support@hakiki.co.tz yenye Barua Pepe ya Akaunti yako na VIN. Timu yetu itapitia maombi yote.'}
      </p>
    </LegalLayout>
  )
}
