'use client'

import LegalLayout from '@/components/LegalLayout'
import { useLanguageStore } from '@/store/languageStore'

export default function TermsPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'

  return (
    <LegalLayout title={isEn ? 'Terms of Service' : 'Vigezo na Masharti'}>
      <p>
        {isEn 
          ? 'These Terms of Service ("Terms") govern your access to and use of the Hakiki website, services, and applications (collectively, the "Service"). Please read them carefully before using our platform.'
          : 'Vigezo na Masharti haya ("Vigezo") vinatawala ufikiaji na matumizi yako ya tovuti, huduma, na programu za Hakiki ("Huduma"). Tafadhali soma kwa uangalifu kabla ya kutumia jukwaa letu.'}
      </p>

      <h2>{isEn ? '1. Acceptance of Terms' : '1. Kukubali Vigezo'}</h2>
      <p>
        {isEn 
          ? 'By accessing or using the Service, you confirm your agreement to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.'
          : 'Kwa kufikia au kutumia Huduma, unathibitisha makubaliano yako ya kufungwa na Vigezo hivi. Ikiwa hukubaliani na Vigezo hivi, huwezi kufikia au kutumia Huduma.'}
      </p>

      <h2>{isEn ? '2. Services Provided' : '2. Huduma Zinazotolewa'}</h2>
      <p>
        {isEn 
          ? 'Hakiki provides vehicle history reports aggregated from third-party sources globally. We act as an intermediary, querying multiple databases including police records, insurance registries, and auction data. We do not guarantee the completeness or absolute accuracy of any report, as we rely entirely on the data supplied by these external sources.'
          : 'Hakiki inatoa ripoti za historia ya gari zilizokusanywa kutoka vyanzo vya wahusika wengine ulimwenguni kote. Hatuhakikishi ukamilifu au usahihi kamili wa ripoti yoyote.'}
      </p>

      <h2>{isEn ? '3. User Accounts' : '3. Akaunti za Watumiaji'}</h2>
      <p>
        {isEn 
          ? 'You must provide accurate and complete information when creating an account. You are solely responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.'
          : 'Lazima utoe habari sahihi na kamili wakati wa kuunda akaunti. Wewe pekee ndiye unawajibika kulinda nenosiri lako.'}
      </p>

      <h2>{isEn ? '4. Purchase of Reports' : '4. Ununuzi wa Ripoti'}</h2>
      <ul>
        <li>{isEn ? 'Credits purchased for reports never expire.' : 'Salio lililonunuliwa kwa ajili ya ripoti haliishi muda wake.'}</li>
        <li>{isEn ? 'If a VIN query returns absolutely zero data points, we will automatically refund the credit to your account.' : 'Ikiwa nambari ya VIN haina data yoyote, tutarejesha salio lako otomatiki.'}</li>
        <li>{isEn ? 'Reports are delivered electronically via the dashboard.' : 'Ripoti zinawasilishwa kwa njia ya kielektroniki kupitia dashibodi.'}</li>
      </ul>

      <h2>{isEn ? '5. Limitation of Liability' : '5. Kikomo cha Dhima'}</h2>
      <p>
        {isEn 
          ? 'To the maximum extent permitted by applicable law, Hakiki shall not be liable for any indirect, incidental, special, consequential or punitive damages, including loss of profits, data, or goodwill, arising from your reliance on the information provided in our vehicle history reports.'
          : 'Kwa kiwango cha juu kinachoruhusiwa na sheria, Hakiki haitawajibika kwa uharibifu wowote wa moja kwa moja au usio wa moja kwa moja unaotokana na kutegemea kwako ripoti zetu.'}
      </p>
    </LegalLayout>
  )
}
