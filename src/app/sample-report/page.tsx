'use client'

import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { CheckCircle2, AlertTriangle, ShieldCheck, MapPin, Camera, Activity, FileText, Info } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import { useState } from 'react'
import VehicleDamageExplorer from '@/components/Report/VehicleDamageExplorer'
import MileageRollbackExplorer, { MileageReading } from '@/components/Report/MileageRollbackExplorer'
import HistoricalTimeline, { TimelineEvent } from '@/components/Report/HistoricalTimeline'
import TheftCheckGrid from '@/components/Report/TheftCheckGrid'
import CarHakikiInsights from '@/components/Report/CarHakikiInsights'
import MarketValueCalculator from '@/components/Report/MarketValueCalculator'
import styles from './sample-report.module.css'

export default function SampleReportPage() {
  const { language } = useLanguageStore()
  const [activeSegment, setActiveSegment] = useState('summary')

  const isEn = language === 'en'

  const carData = {
    make: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2018,
    vin: 'JTEBX3FJ5GXXXXXXX',
    engine: '2.7L I4 (2TR-FE)',
    transmission: 'Automatic',
    drive: '4x4',
  }

  const damageRecords = [
    { part: 'rearBumper', level: 'minor' as const },
    { part: 'tailgate', level: 'minor' as const },
  ]

  const mileageReadings: MileageReading[] = [
    { date: '2019-05-15', mileage: 34200 },
    { date: '2021-08-10', mileage: 82150 },
    { date: '2023-11-20', mileage: 141800 },
    { date: '2024-03-01', mileage: 52400 }, // ROLLBACK!
  ]

  const timelineEvents: TimelineEvent[] = [
    {
      date: '2018-02-10',
      type: 'registration',
      title: isEn ? 'First Registration' : 'Usajili wa Kwanza',
      description: isEn ? 'Vehicle first registered for road use.' : 'Gari lilisajiliwa kwa mara ya kwanza kutumika barabarani.',
      location: 'Nagoya',
      countryCode: 'JP'
    },
    {
      date: '2021-10-15',
      type: 'accident',
      title: isEn ? 'Minor Accident Recorded' : 'Ajali Ndogo Imerekodiwa',
      description: isEn ? 'Rear-end collision reported. Vehicle remained functional.' : 'Mgongano wa nyuma umeripotiwa. Gari liliendelea kufanya kazi.',
      location: 'Osaka',
      countryCode: 'JP'
    },
    {
      date: '2023-08-05',
      type: 'import',
      title: isEn ? 'Exported for Sale' : 'Liliuzwa Kwenda Nje',
      description: isEn ? 'Export certificate issued. Preparing for transport.' : 'Cheti cha kuuzwa nje kilitolewa. Maandalizi ya usafirishaji.',
      location: 'Yokohama',
      countryCode: 'JP'
    },
    {
      date: '2023-10-12',
      type: 'registration',
      title: isEn ? 'Registration in Tanzania' : 'Usajili Tanzania',
      description: isEn ? 'Vehicle imported and assigned local registration plates.' : 'Gari liliingizwa na kupewa namba za usajili za hapa nchini.',
      location: 'Dar es Salaam',
      countryCode: 'TZ'
    },
    {
      date: '2024-03-01',
      type: 'inspection',
      title: isEn ? 'Technical Inspection' : 'Uhakiki wa Kiufundi',
      description: isEn ? 'Annual inspection performed. Odometer rollback detected.' : 'Uhakiki wa mwaka ulifanyika. Udanganyifu wa kilometa ulitambulika.',
      location: 'Dar es Salaam',
      countryCode: 'TZ'
    }
  ]

  const theftChecks = [
    { code: 'JP', name: 'Japan', status: 'clear' as const },
    { code: 'TZ', name: 'Tanzania', status: 'clear' as const },
    { code: 'UK', name: 'United Kingdom', status: 'clear' as const },
    { code: 'US', name: 'United States', status: 'clear' as const },
    { code: 'AE', name: 'UAE', status: 'clear' as const },
    { code: 'ZA', name: 'South Africa', status: 'clear' as const },
    { code: 'KE', name: 'Kenya', status: 'clear' as const },
    { code: 'DE', name: 'Germany', status: 'clear' as const },
  ]

  return (
    <main className={styles.main} suppressHydrationWarning>
      <Navbar />

      {/* TOP HEADER */}
      <div className={styles.reportHeaderWrap}>
        <div className={`container ${styles.reportHeader}`}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.brandTag}>CarHakiki Report</div>
            <h1 className={styles.carTitle}>{carData.year} {carData.make} {carData.model}</h1>
            <div className={styles.vinBadge}>VIN: <strong>{carData.vin}</strong></div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.actionBtn}><FileText size={18} /> {isEn ? 'Download PDF' : 'Pakua PDF'}</button>
          </div>
        </div>
      </div>

      {/* STICKY SEGMENT NAV */}
      <div className={styles.segmentNavWrap}>
        <div className={styles.segmentNav}>
          {['summary', 'mileage', 'damage', 'specs', 'photos', 'timeline'].map((seg) => (
            <button 
              key={seg} 
              className={`${styles.segBtn} ${activeSegment === seg ? styles.activeSeg : ''}`}
              onClick={() => {
                setActiveSegment(seg)
                document.getElementById(`section-${seg}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              {isEn ? seg.toUpperCase() : seg.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className={`container ${styles.reportLayout}`}>
        
        {/* LEFT COLUMN: MAIN REPORT CONTENT */}
        <div className={styles.mainContent}>

          {/* SUMMARY MODULE */}
          <section id="section-summary" className={styles.moduleCard}>
            <h2 className={styles.moduleTitle}>{isEn ? 'Status Summary' : 'Muhtasari wa Hali'}</h2>
            <div className={styles.summaryGrid}>
              
              <div className={styles.statusBoxG}>
                <div className={styles.statusBoxIcon}><ShieldCheck size={24} /></div>
                <div className={styles.statusBoxText}>
                   <h3>{isEn ? 'Theft Records' : 'Rekodi za Wizi'}</h3>
                   <span className={styles.statusOk}>{isEn ? 'Clear (Checked 8 databases)' : 'Salama (Zimekaguliwa kanzidata 8)'}</span>
                </div>
              </div>

              <div className={styles.statusBoxR}>
                <div className={styles.statusBoxIconR}><AlertTriangle size={24} /></div>
                <div className={styles.statusBoxText}>
                   <h3>{isEn ? 'Mileage Verification' : 'Uhakiki wa Maileji'}</h3>
                   <span className={styles.statusAlert}>{isEn ? 'Rollback Detected' : 'Udanganyifu Umegundulika'}</span>
                </div>
              </div>

              <div className={styles.statusBoxY}>
                <div className={styles.statusBoxIconY}><Activity size={24} /></div>
                <div className={styles.statusBoxText}>
                   <h3>{isEn ? 'Damage History' : 'Historia ya Uharibifu'}</h3>
                   <span className={styles.statusWarn}>{isEn ? '1 Minor Accident Recorded' : 'Ajali 1 Ndogo Imerekodiwa'}</span>
                </div>
              </div>

              <div className={styles.statusBoxG}>
                <div className={styles.statusBoxIcon}><MapPin size={24} /></div>
                <div className={styles.statusBoxText}>
                   <h3>{isEn ? 'Use as Taxi/Rental' : 'Matumizi ya Teksi/Kukodisha'}</h3>
                   <span className={styles.statusOk}>{isEn ? 'No commercial use found' : 'Hakuna matumizi ya kibiashara'}</span>
                </div>
              </div>
            </div>
          </section>

          {/* THEFT CHECK GRID */}
          <section id="section-theft">
            <TheftCheckGrid checks={theftChecks} language={isEn ? 'en' : 'sw'} />
          </section>

          {/* MILEAGE MODULE */}
          <section id="section-mileage" className={styles.moduleCard}>
             <div className={styles.moduleHeaderAlert}>
                <AlertTriangle size={24} className={styles.iconRed} />
                <h2>{isEn ? 'Mileage Rollback Detected' : 'Wizi wa Maileji Umegundulika'}</h2>
             </div>
             
             <MileageRollbackExplorer readings={mileageReadings} language={isEn ? 'en' : 'sw'} />
             
             <MarketValueCalculator 
               make={carData.make}
               model={carData.model}
               year={carData.year}
               estimatedValueRange={[86000000, 95000000]}
               language={isEn ? 'en' : 'sw'}
             />
             
             <CarHakikiInsights 
               title={isEn ? 'Insight: Abnormal Usage Pattern' : 'Ushauri: Mwenendo Isiyo ya Kawaida'}
               content={isEn 
                 ? "The mileage dropped by 89,400 km in 2024. This is a common tactic to increase the vehicle's resale value. Buying a 'clocked' car means higher maintenance costs and lower safety." 
                 : "Kilometa zilipungua kwa 89,400 mnamo 2024. Hii ni mbinu ya kawaida kuongeza thamani ya gari wakati wa kuuza. Kununua gari lililochezewa inamaanisha gharama kubwa za matengenezo na usalama mdogo."}
               language={isEn ? 'en' : 'sw'}
             />
          </section>

          {/* DAMAGE MODULE */}
          <section id="section-damage" className={styles.moduleCard}>
             <div className={styles.moduleHeaderWarn}>
                <Activity size={24} className={styles.iconYellow} />
                <h2>{isEn ? 'Damage Records Found' : 'Rekodi za Uharibifu Zimepatikana'}</h2>
             </div>
             
             <div className={styles.damageFlex}>
               <VehicleDamageExplorer damageRecords={damageRecords} />
               <div className={styles.damageList}>
                  <div className={styles.damageEvent}>
                     <div className={styles.dmgDate}>October 2021 • Japan</div>
                     <div className={styles.dmgEst}>{isEn ? 'Est. Repair Cost:' : 'Gharama ya Ukarabati:'} <strong>$1,500 - $3,000</strong></div>
                     <div className={styles.dmgParts}>
                        <span className={styles.dmgTag}>{isEn ? 'Rear Bumper' : 'Bampa la Nyuma'}</span>
                        <span className={styles.dmgTag}>{isEn ? 'Tailgate' : 'Mlango Mkubwa Nyuma'}</span>
                     </div>
                  </div>
               </div>
             </div>

             <CarHakikiInsights 
               title={isEn ? 'Insight: Secondary Impact Potential' : 'Ushauri: Uwezekano wa Athari za Sekondari'}
               content={isEn 
                 ? "The rear-end impact was minor, but it can affect the parking sensors and trunk alignment over time. Ensure these are verified during inspection." 
                 : "Mgongano wa nyuma ulikuwa mdogo, lakini unaweza kuathiri 'parking sensors' na mpangilio wa mlango wa nyuma kwa muda mrefu. Hakikisha hivi vinakaguliwa wakati wa uhakiki."}
               language={isEn ? 'en' : 'sw'}
             />
          </section>

          {/* TIMELINE MODULE */}
          <section id="section-timeline">
            <HistoricalTimeline events={timelineEvents} language={isEn ? 'en' : 'sw'} />
          </section>

          {/* PHOTOS MODULE */}
          <section id="section-photos" className={styles.moduleCard}>
            <div className={styles.moduleHeader}>
               <h2>{isEn ? 'Historical Photos' : 'Picha za Kihistoria'}</h2>
            </div>
            <p className={styles.moduleDesc}>{isEn ? 'Photos retrieved from a Japanese auction house in 2023.' : 'Picha zilizopatikana kutoka mnada wa Japan mwaka 2023.'}</p>
            <div className={styles.photoGrid}>
               <div className={styles.photoItem}>
                 <Image src="/images/auction/front.jpg" alt="Front View" width={300} height={200} unoptimized className={styles.reportPhoto} />
                 <span>{isEn ? 'Front View' : 'Mbele'}</span>
               </div>
               <div className={styles.photoItem}>
                 <Image src="/images/auction/rear.jpg" alt="Rear View" width={300} height={200} unoptimized className={styles.reportPhoto} />
                 <span>{isEn ? 'Rear View' : 'Nyuma'}</span>
               </div>
               <div className={styles.photoItem}>
                 <Image src="/images/auction/interior.jpg" alt="Interior" width={300} height={200} unoptimized className={styles.reportPhoto} />
                 <span>{isEn ? 'Interior' : 'Ndani'}</span>
               </div>
               <div className={styles.photoItem}>
                 <Image src="/images/auction/odometer.jpg" alt="Dashboard" width={300} height={200} unoptimized className={styles.reportPhoto} />
                 <span>{isEn ? 'Dashboard (141k km)' : 'Dashibodi'}</span>
               </div>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: STICKY INFO SIDEBAR */}
        <aside className={styles.sidebar}>
          
          <div className={styles.stickyWidget}>
             <h3>{isEn ? 'Vehicle Details' : 'Maelezo ya Gari'}</h3>
             
             <div className={styles.specList}>
                <div className={styles.specItem}>
                   <span>{isEn ? 'Make' : 'Aina'}</span>
                   <strong>{carData.make}</strong>
                </div>
                <div className={styles.specItem}>
                   <span>{isEn ? 'Model' : 'Toleo'}</span>
                   <strong>{carData.model}</strong>
                </div>
                <div className={styles.specItem}>
                   <span>{isEn ? 'Year' : 'Mwaka'}</span>
                   <strong>{carData.year}</strong>
                </div>
                <div className={styles.specItem}>
                   <span>{isEn ? 'Engine' : 'Injini'}</span>
                   <strong>{carData.engine}</strong>
                </div>
                <div className={styles.specItem}>
                   <span>{isEn ? 'Transmission' : 'Gia'}</span>
                   <strong>{carData.transmission}</strong>
                </div>
                <div className={styles.specItem}>
                   <span>{isEn ? 'Drivetrain' : 'Mfumo'}</span>
                   <strong>{carData.drive}</strong>
                </div>
             </div>

             <div className={styles.sidebarAlertBox}>
                <Info size={16} className={styles.iconBlue} />
                <p>
                  {isEn 
                    ? 'This is a sample report. Actual reports may contain more or less data depending on the vehicle\'s history.'
                    : 'Huu ni mfano wa ripoti. Ripoti halisi zinaweza kuwa na data zaidi inategemea historia ya gari.'}
                </p>
             </div>
          </div>

        </aside>

      </div>

      <footer className={styles.footerSimple}>
        <div className="container">© {new Date().getFullYear()} CarHakiki Vehicle Data Hub.</div>
      </footer>
    </main>
  )
}
