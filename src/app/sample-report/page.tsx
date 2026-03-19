'use client'

import Navbar from '@/components/Navbar'
import { CheckCircle2, AlertTriangle, ShieldCheck, MapPin, Camera, Activity, FileText, Info } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import { useState, useEffect } from 'react'
import styles from './sample-report.module.css'

export default function SampleReportPage() {
  const { language } = useLanguageStore()
  const isEn = language === 'en'
  const [activeSegment, setActiveSegment] = useState('summary')

  const carData = {
    make: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2018,
    vin: 'JTEBX3FJ5GXXXXXXX',
    engine: '2.7L I4 (2TR-FE)',
    transmission: 'Automatic',
    drive: '4x4',
  }

  return (
    <main className={styles.main}>
      <Navbar />

      {/* TOP HEADER */}
      <div className={styles.reportHeaderWrap}>
        <div className={`container ${styles.reportHeader}`}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.brandTag}>Hakiki Report</div>
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
        <div className={`container ${styles.segmentNav}`}>
          {['summary', 'mileage', 'damage', 'specs', 'photos'].map((seg) => (
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
                   <span className={styles.statusOk}>{isEn ? 'Clear (Checked 5 databases)' : 'Salama (Zimekaguliwa kanzidata 5)'}</span>
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

          {/* MILEAGE MODULE */}
          <section id="section-mileage" className={styles.moduleCard}>
             <div className={styles.moduleHeaderAlert}>
                <AlertTriangle size={24} className={styles.iconRed} />
                <h2>{isEn ? 'Mileage Rollback Detected' : 'Wizi wa Maileji Umegundulika'}</h2>
             </div>
             <p className={styles.moduleDesc}>
               {isEn 
                 ? 'We found a discrepancy in the vehicle\'s odometer readings. The actual mileage is significantly higher than what may be shown on the dashboard.' 
                 : 'Tumegundua tofauti kwenye usomaji wa maileji ya gari. Maileji halisi ni makubwa zaidi kuliko inavyoonekana.'}
             </p>

             <div className={styles.mileageChartMock}>
               <div className={styles.chartLine}>
                  <div className={styles.pointG} style={{ left: '10%', bottom: '20%' }}><span>2019<br/>34k km</span></div>
                  <div className={styles.pointG} style={{ left: '40%', bottom: '50%' }}><span>2021<br/>82k km</span></div>
                  <div className={styles.pointR} style={{ left: '70%', bottom: '90%' }}><span>2023<br/>141k km</span></div>
                  <div className={styles.pointWarn} style={{ left: '90%', bottom: '30%' }}><span>2024<br/>52k km (Fake)</span></div>
                  <svg className={styles.chartSvg}>
                    <polyline points="0,160 80,160 320,100 560,20 720,140 800,140" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                    <polyline points="0,160 80,160 320,100 560,20" fill="none" stroke="#22c55e" strokeWidth="4" />
                    <polyline points="560,20 720,140 800,140" fill="none" stroke="#ef4444" strokeLinecap="round" strokeDasharray="10,10" strokeWidth="4" />
                  </svg>
               </div>
             </div>
          </section>

          {/* DAMAGE MODULE */}
          <section id="section-damage" className={styles.moduleCard}>
             <div className={styles.moduleHeaderWarn}>
                <Activity size={24} className={styles.iconYellow} />
                <h2>{isEn ? 'Damage Records Found' : 'Rekodi za Uharibifu Zimepatikana'}</h2>
             </div>
             
             <div className={styles.damageFlex}>
               <div className={styles.damageCarMock}>
                 {/* Top Down Car Blueprint Mock */}
                 <div className={styles.blueprintBody}>
                   <div className={styles.zoneFront}></div>
                   <div className={styles.zoneRearHit}></div>
                 </div>
               </div>
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
          </section>

          {/* PHOTOS MODULE */}
          <section id="section-photos" className={styles.moduleCard}>
            <div className={styles.moduleHeader}>
               <h2>{isEn ? 'Historical Photos' : 'Picha za Kihistoria'}</h2>
            </div>
            <p className={styles.moduleDesc}>{isEn ? 'Photos retrieved from a Japanese auction house in 2023.' : 'Picha zilizopatikana kutoka mnada wa Japan mwaka 2023.'}</p>
            <div className={styles.photoGrid}>
               <div className={styles.photoMock}>Front View</div>
               <div className={styles.photoMock}>Rear View</div>
               <div className={styles.photoMock}>Interior</div>
               <div className={styles.photoMock}>Dashboard (Showing 141k km)</div>
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
        <div className="container">© {new Date().getFullYear()} Hakiki Vehicle Data Hub.</div>
      </footer>
    </main>
  )
}
