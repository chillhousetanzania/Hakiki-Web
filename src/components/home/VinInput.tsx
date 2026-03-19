'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import styles from './VinInput.module.css'

interface VinInputProps {
  onSubmit: (vin: string) => void
  loading?: boolean
}

export default function VinInput({ onSubmit, loading = false }: VinInputProps) {
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
      <div className={styles.inputGroup}>
        <Search className={styles.searchIcon} size={20} />
        <input
          id="vin-input"
          type="text"
          className={styles.input}
          placeholder="Enter VIN or chassis number..."
          value={vin}
          onChange={(e) => { setVin(e.target.value); setError('') }}
          maxLength={20}
          autoComplete="off"
          disabled={loading}
        />
        <button
          id="vin-submit-btn"
          type="submit"
          className={styles.button}
          disabled={loading || vin.trim().length < 5}
        >
          {loading ? <span className="spinner" /> : 'Check Vehicle'}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.hint}>Example: JTDKN3DU5A0123456 or ZZE122-5012345</p>
    </form>
  )
}
