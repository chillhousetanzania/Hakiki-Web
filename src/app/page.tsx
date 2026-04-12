'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ScrambleText from '@/components/ScrambleText'
import { 
  Shield, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard,
  Car,
  CarFront,
  Gauge,
  UserSearch,
  Siren,
  Wrench,
  Globe2,
  ArrowRight,
  CheckCircle,
  FileWarning,
  Lock,
  Check,
  Star
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import styles from './page.module.css'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [vin, setVin] = useState('')
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = Number(entry.target.getAttribute('data-card-id'));
        if (entry.isIntersecting) {
          setActiveCard(id);
        } else {
          setActiveCard(prev => prev === id ? null : prev);
        }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('.mascot-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleVinSubmit = async (vinStr: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/vin-precheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vin: vinStr }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        alert(data.error || 'Failed to check VIN. Please try again.')
        return
      }
      sessionStorage.setItem('precheck', JSON.stringify(data))
      window.location.href = '/report/preview'
    } catch {
      alert('Connection error. Please check your internet and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className="bg-surface font-body text-on-surface">

        {/* ── HERO ── */}
        <section id="hero-section" className="relative pb-24 pt-6 lg:pt-8 flex items-center px-6 overflow-hidden">
          {/* Subtle background overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 forensic-gradient opacity-[0.05]" />
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10 w-full mt-4 lg:mt-0">
            {/* LEFT: Headline + VIN Input */}
            <div className="lg:col-span-7 flex flex-col justify-center lg:pt-10">

              {/* DESKTOP HEADLINE */}
              <div className="hidden md:block">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-headline leading-[1.05] tracking-tight mb-6 text-on-surface">
                  Unlock the <span className="text-surface-tint">Full History</span> of Any Vehicle
                </h1>
                <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
                  Access digital forensic records including structural damage, odometer discrepancies, and ownership logs in seconds.
                </p>
              </div>

              {/* MOBILE HEADLINE */}
              <div className="md:hidden flex flex-col items-center text-center mt-2 mb-3">
                <h1 className="text-[2.25rem] font-black font-headline leading-[1.1] tracking-tight text-on-surface mb-4">
                  Unlock the <span className="text-surface-tint">Full History</span><br/>of Any Vehicle
                </h1>
                <p className="text-[14px] text-gray-500 px-2 leading-relaxed font-medium">
                  Access digital forensic records including structural damage, odometer discrepancies, and ownership logs in seconds.
                </p>
              </div>

              {/* VIN Search Module */}
              <div className="relative mt-2 max-w-[95%] mx-auto md:max-w-full md:mx-0 w-full">
                {/* "We check" indicators */}
                <div className="mb-3 flex justify-center md:justify-start items-center gap-3 text-gray-400">
                  <span className="text-[11px] md:text-xs font-medium">We check:</span>
                  <div className="flex gap-2">
                    <Car className="w-4 h-4" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a3.5 3.5 0 1 0-7 0"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 19h8"/><circle cx="18" cy="19" r="2"/><path d="M20 19h2v-5l-2.5-7H6l-2 7H2v5h2"/><circle cx="6" cy="19" r="2"/><path d="M18 12H5"/><path d="M13 16V8"/></svg>
                  </div>
                </div>

                <div
                  id="vin-input-form"
                  className="bg-white p-2 md:p-2.5 rounded-[1.25rem] md:rounded-[1.5rem] shadow-[0_10px_40px_-10px_rgba(0,78,232,0.15)] flex flex-col md:flex-row items-center gap-2 border border-gray-100 focus-within:ring-4 focus-within:ring-surface-tint/10 transition-all"
                >
                  <div className="flex items-center w-full px-4 md:px-5 py-2 md:py-0">
                    <Search className="text-gray-400 mr-3 md:mr-4 w-5 h-5 flex-shrink-0 hidden md:block" />
                    <input
                      id="vin-text-input"
                      className="w-full py-2 bg-transparent border-none focus:ring-0 text-sm md:text-xl font-headline font-semibold md:font-bold text-gray-800 placeholder:text-gray-400 placeholder:font-medium text-center md:text-left uppercase outline-none"
                      placeholder="Enter VIN or chassis number..."
                      type="text"
                      value={vin}
                      onChange={(e) => setVin(e.target.value.toUpperCase())}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && vin.length >= 5) handleVinSubmit(vin)
                      }}
                    />
                  </div>
                  <button
                    id="check-vehicle-btn"
                    onClick={() => vin.length >= 5 && handleVinSubmit(vin)}
                    disabled={loading}
                    className="bg-[#FBE57B] hover:bg-[#FADC50] md:bg-[#004EE8] md:hover:bg-[#0042C4] text-[#806B1F] md:text-white px-8 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-headline font-bold text-[15px] md:text-[1.1rem] tracking-tight active:scale-95 transition-all w-full md:w-auto shadow-sm md:shadow-md flex-shrink-0"
                  >
                    {loading ? 'Checking...' : 'Check Vehicle'}
                  </button>
                </div>
                
                <div className="flex justify-center md:justify-start items-center px-2 mt-3 text-[9.5px] md:text-xs">
                  <span className="text-gray-400 md:text-gray-500 font-medium tracking-wide">
                    Example: JTDKN3DU5A0123456 or ZZE122-5012345
                  </span>
                </div>

                <div className="mt-4 w-full">
                  <Link 
                    href="/no-vin"
                    className="block w-full py-3 px-6 rounded-full border md:border-2 border-[#004EE8]/40 md:border-[#004EE8]/20 text-[#004EE8] font-headline font-bold text-[13px] md:text-[15px] text-center hover:bg-[#004EE8]/5 transition-all"
                  >
                    I don&apos;t have a VIN ➝
                  </Link>
                </div>
              </div>

              {/* Mobile Statistics List */}
              <div className="md:hidden mt-6 max-w-[95%] mx-auto w-full flex justify-between items-center px-2">
                <div className="flex flex-col items-center text-center">
                  <span className="font-headline font-black text-[22px] leading-none text-[#0033A0]">1,000+</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#004EE8] font-bold mt-1.5">Data Sources</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="font-headline font-black text-[22px] leading-none text-[#0033A0]">45+</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#004EE8] font-bold mt-1.5">Countries</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="font-headline font-black text-[22px] leading-none text-[#0033A0]">40s</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#004EE8] font-bold mt-1.5">Report Ready</span>
                </div>
              </div>

              {/* Desktop Features List */}
              <div className="hidden md:block mt-6 w-full px-2">
                <p className="text-[#004EE8]/80 font-headline font-bold text-[13px] mb-3">A CarHakiki report can uncover:</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                  {[
                    'Recorded images', 'Damage', 'Theft records',
                    'Mileage rollbacks', 'Specs & equipment', 'Emission taxes',
                    'Market price', 'Safety ratings', 'Financial restrictions',
                    'Natural disaster exposure', 'and more...'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[13px] text-gray-700 font-medium tracking-wide">
                      <Check className="w-4 h-4 text-[#004EE8] flex-shrink-0" />
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust pills (Desktop Only) */}
              <div className="hidden md:flex mt-6 flex-wrap items-center gap-6 text-[13px] font-medium text-on-surface-variant px-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-surface-tint" />
                  Instant Results
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-surface-tint" />
                  Verified Data
                </span>
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-surface-tint" />
                  Local Payments Integrated
                </span>
              </div>
            </div>

            {/* RIGHT: Image and Floating Report */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 h-[380px] lg:h-[550px] w-full z-10 pointer-events-none">
              
              {/* Floating Report Image stacked ON TOP */}
              <div className="absolute top-0 right-[-5%] lg:top-[10px] lg:left-[-10%] w-[110%] lg:w-[125%] h-[240px] lg:h-[300px] z-20 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] animate-float">
                <Image
                  src="/hero-data-cards.png"
                  alt="CarHakiki Vehicle Reports"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
                  priority
                  unoptimized
                />
              </div>

              {/* Cars Image without background container */}
              <div className="absolute bottom-[-30px] lg:-bottom-[20px] right-[-10%] lg:right-[-15%] w-[120%] lg:w-[135%] h-[240px] lg:h-[320px] z-10 origin-bottom-right pointer-events-none">
                <Image
                  src="/hero-cars-v5.png"
                  alt="CarHakiki Featured Vehicles"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
                  priority
                  unoptimized
                />
              </div>
            </div>


            {/* Mobile Features List (Moved below images) */}
            <div className="md:hidden mt-12 w-full lg:col-span-12 z-20 relative px-4 pb-4">
              <p className="text-center text-[#004EE8] font-headline font-bold text-[13px] mb-4">A CarHakiki report can uncover:</p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 px-1 border border-[#004EE8]/10 bg-white shadow-sm rounded-2xl py-5 relative z-30">
                {[
                  'Recorded images', 'Damage', 'Theft records',
                  'Mileage rollbacks', 'Specs & equipment', 'Emission taxes',
                  'Market price', 'Safety ratings', 'Financial restrictions',
                  'Natural disaster exposure', 'and more...'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-700 font-bold">
                    <Check className="w-3.5 h-3.5 text-[#004EE8] flex-shrink-0" />
                    <span className="leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY START WITH CARHAKIKI ── */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl md:text-5xl font-black font-headline leading-tight text-on-surface mb-6">
                Why smart car buyers start with CarHakiki
              </h2>
              <p className="text-on-surface-variant max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                A CarHakiki vehicle history report is your first step to knowing what&apos;s <span className="font-bold text-on-surface">worth your money</span>, what&apos;s <span className="font-bold text-on-surface">worth your time</span>, and what makes the <span className="font-bold text-on-surface">best final choice</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {/* Item 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden shadow-sm group-hover:shadow-xl transform group-hover:-translate-y-2 transition-all duration-500 bg-white border border-gray-50">
                  <Image 
                    src="/valueprop-1.png" 
                    alt="Avoid mistakes mascot" 
                    fill 
                    className="object-cover scale-[1.15]" 
                    unoptimized 
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-black font-headline mb-4 text-on-surface">Avoid expensive mistakes</h3>
                <p className="text-on-surface-variant font-medium leading-relaxed">
                  Spot past damage, mileage rollbacks, or other costly issues early – and walk away from money pits that could cost you thousands later.
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden shadow-sm group-hover:shadow-xl transform group-hover:-translate-y-2 transition-all duration-500 bg-white border border-gray-50 delay-75">
                  <Image 
                    src="/valueprop-2.png" 
                    alt="Find cars faster mascot" 
                    fill 
                    className="object-cover scale-[1.05]" 
                    unoptimized 
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-black font-headline mb-4 text-on-surface">Find the right car faster</h3>
                <p className="text-on-surface-variant font-medium leading-relaxed">
                  Avoid pointless test drives by checking the facts online and only inspecting the cars that are actually worth your time.
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden shadow-sm group-hover:shadow-xl transform group-hover:-translate-y-2 transition-all duration-500 bg-white border border-gray-50 delay-150">
                  <Image 
                    src="/valueprop-3.png" 
                    alt="Know more pay less mascot" 
                    fill 
                    className="object-cover scale-[1.45]" 
                    unoptimized 
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-black font-headline mb-4 text-on-surface">Know more, pay less</h3>
                <p className="text-on-surface-variant font-medium leading-relaxed">
                  Learn the car&apos;s story, know more than the seller expects, and use the facts to get a better price.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUSTED DATA SOURCES ── */}
        <section className="bg-surface-container-low py-12 px-6 border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto">
            <p className="text-center font-label text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-8">
              Trusted by thousands, powered by reliable sources
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
              {/* Using styled text to simulate logos if images aren't immediately available */}
              <span className="text-xl md:text-2xl font-black font-headline tracking-tighter text-[#0033A0]">
                CARFAX
              </span>
              <span className="text-xl md:text-2xl font-black font-headline tracking-widest text-slate-800 border-l-4 border-red-600 pl-2">
                NHTSA
              </span>
              <span className="text-xl md:text-2xl font-black font-headline tracking-tight flex items-center gap-1 text-[#22c55e]">
                <Globe2 className="w-6 h-6" />
                GlobalVIN
              </span>
              <span className="text-xl md:text-2xl font-bold font-headline tracking-wider text-slate-900 border border-slate-900 px-3 py-1 rounded">
                INTERPOL
              </span>
              <span className="text-xl md:text-2xl font-black font-headline tracking-tighter text-[#e11d48] italic">
                JEVIC
              </span>
            </div>
          </div>
        </section>

        {/* ── FEATURES BENTO GRID ── */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-black font-headline leading-tight mb-4 text-on-surface">
                Everything You Need to Know
              </h2>
              <p className="text-on-surface-variant max-w-2xl text-lg font-medium">
                Advanced forensic analysis layers processed in real-time across national databases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Featured: Accident Records */}
              <div className="md:col-span-8 bg-surface-container-low rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden relative min-h-[260px] border border-outline-variant/10 group">
                <div className="relative z-10 w-full md:w-2/3">
                  <div className="w-14 h-14 bg-surface-tint/10 rounded-xl flex items-center justify-center mb-6">
                    <CarFront className="text-surface-tint w-7 h-7" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black font-headline mb-4 text-on-surface">
                    Accident &amp; Damage Records
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed font-label">
                    Deep-level scanning for structural repairs, airbag deployments, and salvage records that standard reports miss. Protect your investment.
                  </p>
                </div>
                {/* Subtle abstraction instead of huge text */}
                <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                   <Car className="absolute -bottom-8 -right-8 w-64 h-64 text-on-surface" />
                </div>
              </div>

              {/* Box 2: Mileage */}
              <div className="md:col-span-4 bg-surface-container-highest rounded-2xl p-8 md:p-10 border border-outline-variant/5">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <Gauge className="text-surface-tint w-6 h-6" />
                </div>
                <h3 className="text-xl font-black font-headline mb-3 text-on-surface">Mileage Verification</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Statistical analysis to identify potential rollbacks or discrepancies in mileage reporting history.
                </p>
              </div>

              {/* Box 3: Ownership */}
              <div className="md:col-span-4 bg-surface-container-highest rounded-2xl p-8 md:p-10 border border-outline-variant/5">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <UserSearch className="text-surface-tint w-6 h-6" />
                </div>
                <h3 className="text-xl font-black font-headline mb-3 text-on-surface">Ownership History</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Trace ownership across all 50 states, detecting brands like &apos;Flood,&apos; &apos;Fire,&apos; or &apos;Lemon&apos; instantly.
                </p>
              </div>

              {/* Box 4: Theft */}
              <div className="md:col-span-8 bg-[#004EE8] rounded-2xl p-8 md:p-10 text-white flex items-center justify-between relative overflow-hidden group">
                <div className="relative z-10 w-full md:w-2/3">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                    <ShieldCheck className="text-white w-7 h-7" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black font-headline mb-4">Theft Check</h3>
                  <p className="text-white/90 leading-relaxed">
                    Comprehensive maintenance history including dealer service intervals and recalls.
                  </p>
                </div>
                <div className="absolute right-6 bottom-0 w-1/3 h-full opacity-[0.15] pointer-events-none group-hover:scale-105 transition-transform duration-700">
                   <Shield className="absolute bottom-4 right-0 w-48 h-48 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRECISION INSIGHTS: VISUAL DATA ── */}
        <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl md:text-5xl font-black font-headline leading-tight text-on-surface mb-6">
                Deep Data. Pure Precision.
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                Go beyond basic checks. Our reports pull from the most comprehensive global databases to show you exactly what matters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Card 1: Import & Auction Records */}
              <div data-card-id="1" className={`bg-surface-container-lowest rounded-[2rem] p-8 md:p-10 border border-outline-variant/10 shadow-sm flex flex-col gap-8 hover:shadow-md transition-all group overflow-hidden relative mascot-card ${activeCard === 1 ? 'is-active' : ''}`}>
                <div className="flex-grow z-10 relative">
                  <h3 className="text-2xl md:text-3xl font-black font-headline mb-4 text-[#0033A0]">Global Auction Records</h3>
                  <p className="text-on-surface-variant font-medium leading-relaxed">
                    Verify the original condition of imports. Access auction sheet data, inspection grades (e.g., Japan Grade 4.0), and pre-export logs before the vehicle enters Tanzania.
                  </p>
                </div>
                <div className="relative h-64 md:h-[18rem] bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl overflow-hidden shadow-inner group-hover:scale-[1.02] max-md:group-[.is-active]:scale-[1.02] transition-transform duration-500 border border-blue-200/50 flex flex-col items-center justify-center p-6">
                  {/* Real Auction Yard Photo */}
                  <div className="relative w-full max-w-[280px] h-[200px] md:h-[240px] rounded-xl shadow-lg border-4 border-white transform -rotate-2 group-hover:rotate-0 max-md:group-[.is-active]:rotate-0 group-hover:scale-105 max-md:group-[.is-active]:scale-105 transition-all duration-500 overflow-hidden bg-gray-100 z-10">
                    <Image src="/auction-collage-photo.png" alt="Car Auction Yard Inspection" fill className="object-cover object-top" unoptimized />
                    <div className="absolute top-3 left-3 bg-blue-600/95 text-white font-black text-[10px] px-2 py-1 rounded shadow-sm backdrop-blur-md tracking-widest uppercase">
                      USS Tokyo
                    </div>
                  </div>
                </div>
                {/* Mascot Image - Moved outside overflow container to prevent foot clipping */}
                <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 w-32 h-32 md:w-44 md:h-44 pointer-events-none transform translate-y-4 group-hover:-translate-y-2 group-hover:-rotate-3 max-md:group-[.is-active]:-translate-y-2 max-md:group-[.is-active]:-rotate-3 transition-all duration-500 z-20">
                  <Image src="/mascot-auction-gavel.png" alt="CarHakiki Buddy Auction" fill className="object-contain drop-shadow-2xl" unoptimized />
                </div>
              </div>

              {/* Card 2: Damage */}
              <div data-card-id="2" className={`bg-surface-container-lowest rounded-[2rem] p-8 md:p-10 border border-outline-variant/10 shadow-sm flex flex-col gap-8 hover:shadow-md transition-all group overflow-hidden relative mascot-card ${activeCard === 2 ? 'is-active' : ''}`}>
                <div className="flex-grow z-10 relative">
                  <h3 className="text-2xl md:text-3xl font-black font-headline mb-4 text-[#0033A0]">International Damage History</h3>
                  <p className="text-on-surface-variant font-medium leading-relaxed">
                    We scan 150+ countries to uncover hidden collision damage, structural repairs, flood exposure, and salvage titles that local visual inspections miss.
                  </p>
                </div>
                <div className="relative h-48 md:h-56 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl overflow-hidden shadow-inner group-hover:scale-[1.02] max-md:group-[.is-active]:scale-[1.02] transition-transform duration-500 border border-red-100 flex items-center justify-center p-6">
                  {/* Real Damaged Car Photo */}
                  <div className="relative w-full max-w-[280px] h-[160px] rounded-xl shadow-lg border-4 border-white transform rotate-1 group-hover:rotate-0 max-md:group-[.is-active]:rotate-0 group-hover:-translate-y-1 max-md:group-[.is-active]:-translate-y-1 group-hover:scale-105 max-md:group-[.is-active]:scale-105 transition-all duration-500 overflow-hidden bg-gray-100 z-10">
                    <Image src="/damaged-car-photo.png" alt="Accident Damage History" fill className="object-cover" unoptimized />
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white font-black text-[10px] tracking-wide bg-red-600/95 px-2 py-1 rounded shadow-sm animate-pulse backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div> 
                      SEVERE RECORD
                    </div>
                  </div>
                </div>
                {/* Mascot Image */}
                <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 w-32 h-32 md:w-44 md:h-44 pointer-events-none transform translate-y-4 group-hover:-translate-y-2 group-hover:-rotate-3 max-md:group-[.is-active]:-translate-y-2 max-md:group-[.is-active]:-rotate-3 transition-all duration-500 z-20">
                  <Image src="/mascot-damage-wrench.png" alt="CarHakiki Buddy Damage" fill className="object-contain drop-shadow-2xl" unoptimized />
                </div>
              </div>

              {/* Card 3: Stolen */}
              <div data-card-id="3" className={`bg-surface-container-lowest rounded-[2rem] p-8 md:p-10 border border-outline-variant/10 shadow-sm flex flex-col gap-8 hover:shadow-md transition-all group overflow-hidden relative mascot-card ${activeCard === 3 ? 'is-active' : ''}`}>
                <div className="flex-grow z-10 relative">
                  <h3 className="text-2xl md:text-3xl font-black font-headline mb-4 text-[#0033A0]">Interpol Theft Checks</h3>
                  <p className="text-on-surface-variant font-medium leading-relaxed">
                    Protect your investment. Instantly cross-reference the VIN with Interpol and global police databases to guarantee clear legal ownership.
                  </p>
                </div>
                <div className="relative h-48 md:h-56 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden shadow-inner group-hover:scale-[1.02] max-md:group-[.is-active]:scale-[1.02] transition-transform duration-500 border border-green-100 flex items-center justify-center relative">
                  {/* Abstract Security UI */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:scale-110 max-md:group-[.is-active]:scale-110 transition-transform duration-700">
                     <Shield className="w-56 h-56 text-green-800" />
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-lg border border-green-100 w-full max-w-[200px] text-center relative z-10 group-hover:shadow-xl max-md:group-[.is-active]:shadow-xl transition-all duration-500">
                     <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-100">
                        <Lock className="w-6 h-6 text-green-600" />
                     </div>
                     <div className="font-headline font-black text-green-700 text-xl tracking-tight">SECURE</div>
                     <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">8 Global Databases</div>
                  </div>
                </div>
                {/* Mascot Image */}
                <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8 w-32 h-32 md:w-44 md:h-44 pointer-events-none transform translate-y-4 group-hover:-translate-y-2 group-hover:rotate-3 max-md:group-[.is-active]:-translate-y-2 max-md:group-[.is-active]:rotate-3 transition-all duration-500 z-20">
                  <Image src="/mascot-security-badge.png" alt="CarHakiki Buddy Security" fill className="object-contain drop-shadow-2xl" unoptimized />
                </div>
              </div>

              {/* Card 4: Mileage */}
              <div data-card-id="4" className={`bg-surface-container-lowest rounded-[2rem] p-8 md:p-10 border border-outline-variant/10 shadow-sm flex flex-col gap-8 hover:shadow-md transition-all group overflow-hidden relative mascot-card ${activeCard === 4 ? 'is-active' : ''}`}>
                <div className="flex-grow z-10 relative">
                  <h3 className="text-2xl md:text-3xl font-black font-headline mb-4 text-[#0033A0]">Odometer Verification</h3>
                  <p className="text-on-surface-variant font-medium leading-relaxed">
                    Mileage fraud is common in imports. We compare port export readings against historical records to expose rollbacks before you buy.
                  </p>
                </div>
                <div className="relative h-48 md:h-56 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl overflow-hidden shadow-inner group-hover:scale-[1.02] max-md:group-[.is-active]:scale-[1.02] transition-transform duration-500 border border-gray-200 flex items-center justify-center p-6">
                  {/* Abstract Rollback Graph UI */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-[260px] p-4 flex flex-col relative overflow-hidden hover:shadow-md max-md:group-[.is-active]:shadow-md transition-all duration-500">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-50/50 rounded-bl-full flex items-start justify-end p-2 pointer-events-none transition-colors group-hover:bg-red-50 max-md:group-[.is-active]:bg-red-50 z-0">
                       <FileWarning className="w-4 h-4 text-red-500/50" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-4 mt-1 relative z-10">
                      <div className="font-bold text-[10px] text-gray-500 uppercase tracking-widest">Odometer Trend</div>
                      <div className="bg-red-50 text-red-600 text-[9px] font-black tracking-wider px-2 py-0.5 rounded border border-red-100 animate-pulse">
                        ROLLBACK
                      </div>
                    </div>
                    
                    <div className="relative w-full max-w-[210px] h-[70px] border-b border-l border-gray-100 flex items-end self-center z-10">
                      {/* Grid lines */}
                      <div className="absolute w-full h-[1px] bg-gray-50 top-[33%] left-0 z-0"></div>
                      <div className="absolute w-full h-[1px] bg-gray-50 top-[66%] left-0 z-0"></div>
                      
                      {/* SVG Line Chart */}
                      <svg className="absolute inset-0 w-full h-full overflow-visible z-10" viewBox="0 0 210 70">
                        <polyline points="0,55 70,35 140,10" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="140,10 210,50" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" />
                        
                        <circle cx="0" cy="55" r="4" fill="#60a5fa" stroke="white" strokeWidth="1.5" />
                        <circle cx="70" cy="35" r="4" fill="#3b82f6" stroke="white" strokeWidth="1.5" />
                        <circle cx="140" cy="10" r="5" fill="#1d4ed8" stroke="white" strokeWidth="2" className="shadow-sm" />
                        <circle cx="210" cy="50" r="5" fill="#ef4444" stroke="white" strokeWidth="2" className="shadow-sm animate-pulse" />
                      </svg>

                      {/* Tooltips Overlaying Graph */}
                      <div className="absolute top-[-14px] left-[140px] -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow whitespace-nowrap z-20">
                        141k
                      </div>
                      <div className="absolute top-[50px] right-0 translate-y-2 bg-white text-red-600 border border-red-200 text-[10px] font-black px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-20">
                        52k
                      </div>
                    </div>
                    
                    {/* X-Axis Labels */}
                    <div className="flex justify-between w-full max-w-[210px] self-center mt-2 text-[9px] font-bold text-gray-400 z-10 px-1">
                      <span>2019</span>
                      <span className="ml-2">2021</span>
                      <span className="text-gray-600 ml-5">Export</span>
                      <span className="text-red-500 font-black">Inspect</span>
                    </div>
                  </div>
                </div>
                {/* Mascot Image */}
                <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 w-32 h-32 md:w-44 md:h-44 pointer-events-none transform translate-y-4 group-hover:-translate-y-2 group-hover:-rotate-3 max-md:group-[.is-active]:-translate-y-2 max-md:group-[.is-active]:-rotate-3 transition-all duration-500 z-20">
                  <Image src="/mascot-speedometer.png" alt="CarHakiki Buddy Rollback" fill className="object-contain drop-shadow-2xl" unoptimized />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SAMPLE REPORT: A REPORT YOU CAN TRUST ── */}
        <section className="bg-surface-container-low py-24 px-6 border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

            {/* Left copy */}
            <div className="lg:w-1/2">
              <span className="inline-block px-3 py-1 bg-surface-tint/10 text-surface-tint font-label text-xs font-black uppercase tracking-widest rounded-full mb-6">
                Transparency First
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-headline leading-tight mb-6 text-on-surface">
                A Report You Can Trust
              </h2>
              <p className="text-on-surface-variant mb-10 text-lg leading-relaxed">
                Our reports aren&apos;t just endless datasets. We organize complex history into a structured evaluation, giving you a clear reliability score for every car.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Wrench className="text-surface-tint w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg text-on-surface">Structural Check</h4>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">Auction grade analysis and welding history from export ports.</p>
                  </div>
                </li>
                <li className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileWarning className="text-surface-tint w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg text-on-surface">Manufacturer Recalls</h4>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">Live updates from global manufacturer safety databases.</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-12">
                <Link
                  href="/sample-report"
                  id="view-sample-report-btn"
                  className="inline-flex items-center gap-3 bg-surface-tint text-on-primary font-headline font-bold px-8 py-4 rounded-xl hover:bg-surface-tint/90 transition-all active:scale-95 shadow-md"
                >
                  View Sample Report
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right: Report card mockup */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-outline-variant/10">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-outline-variant/10 pb-6 mb-6 gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black font-headline text-on-surface">Report #CHK-00291</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-0">
                      2018 TOYOTA PRADO
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-xs font-bold border border-green-200 w-fit">
                    <CheckCircle2 className="w-4 h-4" />
                    VERIFIED
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-surface-container-lowest border border-outline-variant/10 p-4 rounded-xl">
                    <p className="text-[0.65rem] font-bold uppercase text-on-surface-variant tracking-widest mb-1">
                      Odometer
                    </p>
                    <p className="text-xl md:text-2xl font-black font-headline text-on-surface">
                      141,800 <span className="text-sm font-medium text-on-surface-variant">KM</span>
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest border border-outline-variant/10 p-4 rounded-xl">
                    <p className="text-[0.65rem] font-bold uppercase text-on-surface-variant tracking-widest mb-1">
                      Owners
                    </p>
                    <p className="text-xl md:text-2xl font-black font-headline text-on-surface">
                      2 <span className="text-sm font-medium text-on-surface-variant">REC</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600 w-5 h-5 flex-shrink-0" />
                      <span className="font-headline font-bold text-sm text-on-surface">Title Record Clear</span>
                    </div>
                    <span className="text-xs font-bold text-green-700 ml-2">NO LIENS</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
                    <div className="flex items-center gap-3">
                      <Lock className="text-green-600 w-5 h-5 flex-shrink-0" />
                      <span className="font-headline font-bold text-sm text-on-surface">No Theft Records</span>
                    </div>
                    <span className="text-xs font-bold text-green-700 ml-2">SECURE</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FileWarning className="text-amber-600 w-5 h-5 flex-shrink-0" />
                      <span className="font-headline font-bold text-sm text-amber-900">
                        1 Minor Accident
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-700 ml-2">RECORDED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-black font-headline leading-tight text-on-surface mb-6">
                The History Check Process
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                Advanced data analysis processed in real-time across international databases.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12 lg:gap-x-20">
              {[
                {
                  id: '01',
                  title: 'Enter Your VIN',
                  desc: 'Input the unique 17-character vehicle identification number found on the dash or door jamb.',
                },
                {
                  id: '02',
                  title: 'Pay Securely',
                  desc: 'Our algorithms query national insurance, police, and auction databases in real-time.',
                },
                {
                  id: '03',
                  title: 'Get Your Report',
                  desc: 'Download a comprehensive PDF ledger detailing every recorded event in the car&apos;s history.',
                },
              ].map((step) => (
                <div key={step.id} className="relative group transition-all duration-500 flex flex-col pt-6 md:pt-12">
                  {/* Background Number */}
                  <div className="absolute -top-4  left-[-10px] md:-top-6 md:-left-4 text-[8rem] md:text-[10rem] leading-none font-black font-headline text-[#004EE8]/10 select-none transition-all duration-700 ease-out group-hover:text-[#004EE8]/[0.15] group-hover:-translate-y-4 group-hover:scale-105 origin-bottom-left z-0">
                    {step.id}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 pl-5 border-l-2 border-slate-100 group-hover:border-[#004EE8] transition-all duration-500 py-2">
                    <h3 className="text-2xl font-black font-headline mb-3 text-on-surface group-hover:text-[#0033A0] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-on-surface-variant text-[15px] md:text-base leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-24 px-6 bg-surface-container-low border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-[2.5rem] font-black font-headline leading-tight text-on-surface">
                Simple Pricing
              </h2>
              <p className="text-on-surface-variant mt-4 text-lg">
                Get full access instantly. Pay with mobile money or card.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
              {/* Plan 1 */}
              <div className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col">
                <h4 className="font-headline font-bold text-lg mb-2 text-on-surface">1 Report</h4>
                <div className="text-3xl font-black font-headline mb-6 text-on-surface">TZS 25,000</div>
                <ul className="space-y-4 mb-8 text-sm text-on-surface-variant flex-grow">
                  <li className="flex items-start gap-3">
                    <Check className="text-surface-tint w-5 h-5 flex-shrink-0" />
                    <span>Full History Check</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-surface-tint w-5 h-5 flex-shrink-0" />
                    <span>Mileage Verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-surface-tint w-5 h-5 flex-shrink-0" />
                    <span>International Theft Records</span>
                  </li>
                </ul>
                <Link
                  href="/report/preview"
                  className="block w-full py-3.5 border-2 border-surface-tint text-surface-tint font-headline font-bold rounded-xl hover:bg-surface-tint hover:text-white transition-colors text-center"
                >
                  Select Plan
                </Link>
              </div>

              {/* Plan 2 — Most Popular */}
              <div className="bg-surface-tint p-8 rounded-2xl shadow-xl relative z-10 text-white flex flex-col md:scale-105 border border-surface-tint">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap shadow-sm">
                  MOST POPULAR
                </div>
                <h4 className="font-headline font-bold text-lg mb-2 text-white/90">2 Reports</h4>
                <div className="text-3xl font-black font-headline mb-2">TZS 40,000</div>
                <div className="bg-white/20 w-fit px-2 py-0.5 rounded text-xs font-bold mb-6">SAVE 20%</div>
                
                <ul className="space-y-4 mb-8 text-sm text-white/90 flex-grow">
                  <li className="flex items-start gap-3">
                    <Check className="text-white w-5 h-5 flex-shrink-0" />
                    <span>Valid for 30 days</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-white w-5 h-5 flex-shrink-0" />
                    <span>Detailed Damage Reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-white w-5 h-5 flex-shrink-0" />
                    <span>Priority Processing</span>
                  </li>
                </ul>
                <Link
                  href="/report/preview"
                  className="block w-full py-3.5 bg-white text-surface-tint font-headline font-bold rounded-xl hover:bg-white/90 transition-colors text-center shadow-md active:scale-95"
                >
                  Buy Bundle
                </Link>
              </div>

              {/* Plan 3 */}
              <div className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col">
                <h4 className="font-headline font-bold text-lg mb-2 text-on-surface">3 Reports</h4>
                <div className="text-3xl font-black font-headline mb-2 text-on-surface">TZS 55,000</div>
                <div className="bg-surface-tint/10 text-surface-tint w-fit px-2 py-0.5 rounded text-xs font-bold mb-6">SAVE 27%</div>
                
                <ul className="space-y-4 mb-8 text-sm text-on-surface-variant flex-grow">
                  <li className="flex items-start gap-3">
                    <Check className="text-surface-tint w-5 h-5 flex-shrink-0" />
                    <span>Perfect for Importers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-surface-tint w-5 h-5 flex-shrink-0" />
                    <span>PDF Bulk Download</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-surface-tint w-5 h-5 flex-shrink-0" />
                    <span>Valid for 90 days</span>
                  </li>
                </ul>
                <Link
                  href="/report/preview"
                  className="block w-full py-3.5 border-2 border-surface-tint text-surface-tint font-headline font-bold rounded-xl hover:bg-surface-tint hover:text-white transition-colors text-center"
                >
                  Select Plan
                </Link>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-5">
              <p className="text-sm font-bold text-on-surface-variant flex items-center gap-2">
                <Lock className="w-4 h-4" /> Securely process your payment using
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-2">
                {/* M-Pesa */}
                <div className="h-8 md:h-10 w-20 relative mix-blend-multiply">
                  <Image src="/mpesa.png" alt="M-Pesa" fill className="object-contain" unoptimized />
                </div>
                {/* Yas Mixx (formerly Tigo) */}
                <div className="h-8 md:h-10 w-24 relative mix-blend-multiply drop-shadow-sm">
                  <Image src="/yas.png" alt="Yas Mixx" fill className="object-contain" unoptimized />
                </div>
                {/* Airtel Money */}
                <div className="h-8 md:h-10 w-16 relative mix-blend-multiply">
                  <Image src="/airtel.png" alt="Airtel Money" fill className="object-contain" unoptimized />
                </div>
                {/* Gap / Divider */}
                <div className="w-[1px] h-6 bg-outline-variant/30 hidden md:block mx-2"></div>
                {/* Visa */}
                <div className="h-7 md:h-8 w-16 relative mix-blend-multiply">
                  <Image src="/visa.png" alt="Visa" fill className="object-contain" unoptimized />
                </div>
                {/* Mastercard */}
                <div className="h-7 md:h-9 w-14 relative mix-blend-multiply">
                  <Image src="/mastercard.png" alt="Mastercard" fill className="object-contain" unoptimized />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CUSTOMER FEEDBACK ── */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-black font-headline text-on-surface mb-6">
                  Hear from Our Community
                </h2>
                <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
                  Join thousands of smart car buyers in Tanzania who saved millions by checking before they bought.
                </p>
              </div>
              <div className="bg-surface-tint/5 rounded-2xl p-6 flex flex-col items-center gap-2 border border-surface-tint/10">
                <div className="flex text-yellow-400">
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                </div>
                <p className="font-headline font-bold text-on-surface">4.9/5 Average Rating</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Abubakar M.",
                  location: "Dar es Salaam",
                  text: "CarHakiki saved me from buying a 'clean' Toyota Harrier that actually had a major accident record in Japan. The small fee saved me over 15 million TZS. Unbelievable accuracy!",
                  image: "/nano_banana_mascot_highres_1775919786038.png"
                },
                {
                  name: "Sarah K.",
                  location: "Arusha",
                  text: "I was importing a car from Dubai and needed to be sure about the mileage. The timeline view was so easy to read and confirmed everything. Highly recommend for any first-time buyer.",
                  image: "/nano_banana_mascot_highres_1775919786038.png"
                },
                {
                  name: "James L.",
                  location: "Mwanza",
                  text: "Professional, fast, and easy to pay with M-Pesa. I got my report in seconds. It's the standard for car buying in Tanzania now. Don't risk it without a Hakiki check.",
                  image: "/nano_banana_mascot_highres_1775919786038.png"
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-low border border-outline-variant/10 relative">
                       <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover p-2" unoptimized />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-on-surface">{testimonial.name}</h4>
                      <p className="text-xs font-bold text-surface-tint uppercase tracking-widest">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed text-[15px] italic">&quot;{testimonial.text}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="py-24 px-6 md:px-10">
          <div className="max-w-6xl mx-auto forensic-gradient rounded-[2.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-[0.15] mix-blend-luminosity pointer-events-none">
              <Image
                src="/cta-bg-car.png"
                alt="Car background"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
                unoptimized
              />
            </div>
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay opacity-20 z-0 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline mb-6 tracking-tight text-white drop-shadow-md">
                Ready to Check Your <ScrambleText words={['Car', 'Truck', 'Bike', 'Bus', 'Van']} />?
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Don&apos;t risk millions on a vehicle with a hidden past. Run your precision check now and get peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/#vin-input-form"
                  className="bg-white text-on-surface px-10 py-4 rounded-xl font-headline font-bold text-lg hover:bg-white/90 active:scale-95 transition-all text-center shadow-lg"
                >
                  Check a VIN Now
                </Link>
                <Link
                  href="/pricing"
                  className="bg-transparent border-2 border-white/30 hover:bg-white/10 px-10 py-4 rounded-xl font-headline font-bold text-lg active:scale-95 transition-all text-center"
                >
                  View Pricing Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-surface-container-low w-full py-16 px-6 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16">

          <div className="lg:w-1/4">
            <div className="flex items-center gap-2 text-xl font-black text-on-surface mb-6 font-headline">
              <Shield className="w-6 h-6 text-surface-tint" />
              <span>CarHakiki</span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              Tanzania&apos;s leading vehicle history platform. Make informed decisions before you buy your next used car.
            </p>
            <div className="flex gap-4">
              {/* Optional Social Icons could go here */}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:w-3/4">
            <div>
              <h4 className="font-headline font-bold text-sm text-on-surface mb-6">
                Product
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/sample-report" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    Sample Report
                  </Link>
                </li>
                <li>
                  <Link href="/#vin-input-form" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    VIN Search
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-bold text-sm text-on-surface mb-6">
                For Business
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/business/dealerships" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    Car Dealers
                  </Link>
                </li>
                <li>
                  <Link href="/business/b2b-pricing" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    Bulk Access
                  </Link>
                </li>
                <li>
                  <Link href="/business/api-integration" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    API Integration
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-bold text-sm text-on-surface mb-6">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    Contact Center
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-bold text-sm text-on-surface mb-6">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/policies" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy" className="text-sm font-medium text-on-surface-variant hover:text-surface-tint transition-colors">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-on-surface-variant">
            © {new Date().getFullYear()} CarHakiki. All rights reserved. Made in Tanzania 🇹🇿
          </p>
          <div className="flex gap-4">
             <span className="text-xs font-medium text-on-surface-variant flex items-center gap-1"><Shield className="w-3 h-3"/> SSL Secured</span>
          </div>
        </div>
      </footer>
    </>
  )
}
