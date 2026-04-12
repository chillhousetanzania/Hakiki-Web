'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import styles from './VinInput.module.css'

interface VinInputProps {
  onSubmit: (vin: string) => void
  loading?: boolean
  dark?: boolean
  placeholder?: string
  buttonLabel?: string
}

export default function VinInput({
  onSubmit,
  loading = false,
  dark = false,
  placeholder = 'Enter VIN or chassis number...',
  buttonLabel = 'Check Vehicle',
}: VinInputProps) {
  const [vin, setVin] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = vin.trim().toUpperCase()
    if (cleaned.length < 5) {
      setError('Please enter a valid VIN or chassis number')
      return
    }
    setError('')
    onSubmit(cleaned)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper} id="vin-input-form">
      <div className={`${styles.inputGroup} ${dark ? styles.inputGroupDark : ''}`}>
        <Search className={styles.searchIcon} size={18} />
        <input
          id="vin-input"
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={vin}
          onChange={(e) => { setVin(e.target.value); setError('') }}
          maxLength={20}
          autoComplete="off"
          disabled={loading}
        />
        <button
          id="vin-submit-btn"
          type="submit"
          className={`${styles.button} ${dark ? styles.buttonDark : ''}`}
          disabled={loading || vin.trim().length < 5}
        >
          {loading ? <span className="spinner" /> : buttonLabel}
        </button>
      </div>
      {error && <p className={`${styles.error} ${dark ? styles.errorDark : ''}`}>{error}</p>}
    </form>
  )
}
