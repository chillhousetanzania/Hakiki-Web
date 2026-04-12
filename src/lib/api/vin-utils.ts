export function detectVinFormat(input: string): 'vin' | 'chassis' | 'invalid' {
  const cleaned = input.trim().toUpperCase()

  // Standard 17-character VIN
  if (/^[A-HJ-NPR-Z0-9]{17}$/.test(cleaned)) {
    return 'vin'
  }

  // Japanese chassis number (e.g., ZZE122-5012345)
  if (/^[A-Z]{2,5}\d{1,4}[-\s]?\d{5,8}$/.test(cleaned)) {
    return 'chassis'
  }

  // If it's at least 5 chars but doesn't match above, try as VIN
  if (cleaned.length >= 5) {
    return 'vin'
  }

  return 'invalid'
}

// WMI codes starting with 'L' are assigned to China
export function isChineseVin(vin: string): boolean {
  return vin.toUpperCase().startsWith('L')
}

export function detectDataSource(vin: string, format: string): 'japan' | 'europe' | 'global' {
  if (format === 'chassis') return 'japan'

  // WMI (first 3 chars) region detection
  const wmi = vin.substring(0, 3).toUpperCase()
  const firstChar = wmi[0]

  // Japan: J
  if (firstChar === 'J') return 'japan'

  // Europe: S (UK), V (France/Spain), W (Germany), Z (Italy), etc.
  if (['S', 'V', 'W', 'Z', 'T', 'U', 'Y'].includes(firstChar)) return 'europe'

  return 'global'
}
