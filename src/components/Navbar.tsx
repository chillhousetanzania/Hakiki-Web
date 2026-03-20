'use client'

import { Shield, ChevronDown, Globe, Menu, X } from 'lucide-react'
import { useLanguageStore } from '@/store/languageStore'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { language, setLanguage } = useLanguageStore()
  const [mounted, setMounted] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isEn = !mounted || language === 'en'

  // Close menus when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const handleDropdownToggle = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const closeDropdown = () => setOpenDropdown(null)

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.navInner}`}>
        
        {/* LOGO */}
        <Link href="/" className={styles.logo} id="nav-logo" onClick={closeDropdown}>
          <Shield size={24} />
          <span>Hakiki</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className={styles.navLinks}>
          
          {/* REPORTS DROPDOWN */}
          <div 
            className={styles.dropdownWrap}
            onMouseEnter={() => setOpenDropdown('reports')}
            onMouseLeave={closeDropdown}
          >
            <button 
              className={styles.dropdownToggle}
              onClick={() => handleDropdownToggle('reports')}
              aria-expanded={openDropdown === 'reports'}
            >
              {isEn ? 'Reports' : 'Ripoti'}
              <ChevronDown size={14} className={openDropdown === 'reports' ? styles.chevronUp : ''} />
            </button>
            {openDropdown === 'reports' && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownMenuInner}>
                  <Link href="/#hero-section" onClick={closeDropdown}>{isEn ? 'Get a report' : 'Pata ripoti'}</Link>
                  <Link href="/sample-report" onClick={closeDropdown}>{isEn ? 'Sample report' : 'Ripoti ya mfano'}</Link>
                  <Link href="/pricing" onClick={closeDropdown}>{isEn ? 'Pricing' : 'Bei'}</Link>
                </div>
              </div>
            )}
          </div>

          {/* FOR BUSINESS DROPDOWN */}
          <div 
            className={styles.dropdownWrap}
            onMouseEnter={() => setOpenDropdown('business')}
            onMouseLeave={closeDropdown}
          >
            <button 
              className={styles.dropdownToggle}
              onClick={() => handleDropdownToggle('business')}
              aria-expanded={openDropdown === 'business'}
            >
              {isEn ? 'For business' : 'Kwa biashara'}
              <ChevronDown size={14} className={openDropdown === 'business' ? styles.chevronUp : ''} />
            </button>
            {openDropdown === 'business' && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownMenuInner}>
                  <Link href="/business/dealerships" onClick={closeDropdown}>{isEn ? 'Dealerships' : 'Wafanyabiashara'}</Link>
                  <Link href="/business/insurance" onClick={closeDropdown}>{isEn ? 'Insurance companies' : 'Makampuni ya bima'}</Link>
                  <Link href="/business/leasing" onClick={closeDropdown}>{isEn ? 'Leasing companies' : 'Makampuni ya ukodishaji'}</Link>
                  <Link href="/business/api-integration" onClick={closeDropdown}>{isEn ? 'API integration' : 'Muunganiko wa API'}</Link>
                  <Link href="/business/affiliate" onClick={closeDropdown}>{isEn ? 'Affiliate program' : 'Mpango wa ushirika'}</Link>
                  <Link href="/business/influencers" onClick={closeDropdown}>{isEn ? 'Influencers program' : 'Mpango wa ushawishi'}</Link>
                  <Link href="/business/b2b-pricing" onClick={closeDropdown}>{isEn ? 'B2B pricing' : 'Bei za B2B'}</Link>
                </div>
              </div>
            )}
          </div>

          {/* COMPANY DROPDOWN */}
          <div 
            className={styles.dropdownWrap}
            onMouseEnter={() => setOpenDropdown('company')}
            onMouseLeave={closeDropdown}
          >
            <button 
              className={styles.dropdownToggle}
              onClick={() => handleDropdownToggle('company')}
              aria-expanded={openDropdown === 'company'}
            >
              {isEn ? 'Company' : 'Kampuni'}
              <ChevronDown size={14} className={openDropdown === 'company' ? styles.chevronUp : ''} />
            </button>
            {openDropdown === 'company' && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownMenuInner}>
                  <Link href="/about" onClick={closeDropdown}>{isEn ? 'About us' : 'Kuhusu sisi'}</Link>
                  <Link href="/company/careers" onClick={closeDropdown}>{isEn ? 'Careers' : 'Ajira'}</Link>
                  <Link href="/company/press" onClick={closeDropdown}>{isEn ? 'Press' : 'Vyombo vya habari'}</Link>
                  <Link href="/contact" onClick={closeDropdown}>{isEn ? 'Contact' : 'Wasiliana nasi'}</Link>
                </div>
              </div>
            )}
          </div>

          {/* SIMPLE LINKS */}
          <Link href="/blog" id="nav-blog" className={styles.plainLink} onClick={closeDropdown}>{isEn ? 'Blog' : 'Blogu'}</Link>
          <Link href="/help" id="nav-help" className={styles.plainLink} onClick={closeDropdown}>{isEn ? 'Help' : 'Msaada'}</Link>
        </div>

        {/* RIGHT SIDE (LANGUAGE + LOGIN + MOBILE TOGGLE) */}
        <div className={styles.navRight}>
          <button
            onClick={() => setLanguage(isEn ? 'sw' : 'en')}
            className={styles.langBtn}
            title={isEn ? "Switch to Swahili" : "Switch to English"}
          >
            <Globe size={18} className={styles.globeIcon} />
            <span className={styles.langText}>{isEn ? 'EN' : 'SW'}</span>
          </button>
          
          <Link href="/" className={styles.loginBtn}>
            {isEn ? 'Log In' : 'Ingia'}
          </Link>

          <button 
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuInner}>
            
            <div className={styles.mobileSection}>
              <h4>{isEn ? 'Reports' : 'Ripoti'}</h4>
              <Link href="/#hero-section">{isEn ? 'Get a report' : 'Pata ripoti'}</Link>
              <Link href="/sample-report">{isEn ? 'Sample report' : 'Ripoti ya mfano'}</Link>
              <Link href="/pricing">{isEn ? 'Pricing' : 'Bei'}</Link>
            </div>

            <div className={styles.mobileSection}>
              <h4>{isEn ? 'For business' : 'Kwa biashara'}</h4>
              <Link href="/business/dealerships">{isEn ? 'Dealerships' : 'Wafanyabiashara'}</Link>
              <Link href="/business/insurance">{isEn ? 'Insurance companies' : 'Makampuni ya bima'}</Link>
              <Link href="/business/leasing">{isEn ? 'Leasing companies' : 'Makampuni ya ukodishaji'}</Link>
              <Link href="/business/api-integration">{isEn ? 'API integration' : 'Muunganiko wa API'}</Link>
              <Link href="/business/affiliate">{isEn ? 'Affiliate program' : 'Mpango wa ushirika'}</Link>
              <Link href="/business/influencers">{isEn ? 'Influencers program' : 'Mpango wa ushawishi'}</Link>
              <Link href="/business/b2b-pricing">{isEn ? 'B2B pricing' : 'Bei za B2B'}</Link>
            </div>

            <div className={styles.mobileSection}>
              <h4>{isEn ? 'Company' : 'Kampuni'}</h4>
              <Link href="/about">{isEn ? 'About us' : 'Kuhusu sisi'}</Link>
              <Link href="/company/careers">{isEn ? 'Careers' : 'Ajira'}</Link>
              <Link href="/company/press">{isEn ? 'Press' : 'Vyombo vya habari'}</Link>
              <Link href="/contact">{isEn ? 'Contact' : 'Wasiliana nasi'}</Link>
            </div>

            <div className={styles.mobileSection}>
              <h4>{isEn ? 'More' : 'Zaidi'}</h4>
              <Link href="/blog">{isEn ? 'Blog' : 'Blogu'}</Link>
              <Link href="/help">{isEn ? 'Help Center' : 'Kituo cha Msaada'}</Link>
            </div>

          </div>
        </div>
      )}
    </nav>
  )
}
