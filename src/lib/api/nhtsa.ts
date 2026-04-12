interface NHTSAResult {
  Make: string
  Model: string
  ModelYear: string
  BodyClass: string
  DisplacementL: string
  FuelTypePrimary: string
  TransmissionStyle: string
  DriveType: string
  PlantCountry: string
  VehicleType: string
  EngineCylinders: string
  EngineHP: string
}

export async function decodeVin(vin: string, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) })

      if (!res.ok) {
        if (attempt < retries) continue
        throw new Error('NHTSA API failed')
      }

      const data = await res.json()
      const result: NHTSAResult = data.Results?.[0]

      if (!result || !result.Make) return null

      return {
        vin,
        make: result.Make || 'Unknown',
        model: result.Model || 'Unknown',
        year: parseInt(result.ModelYear) || 0,
        bodyType: result.BodyClass || 'Unknown',
        engineSize: result.DisplacementL ? `${result.DisplacementL}L` : 'Unknown',
        fuelType: result.FuelTypePrimary || 'Unknown',
        transmission: result.TransmissionStyle || 'Unknown',
        driveType: result.DriveType || 'Unknown',
        country: result.PlantCountry || 'Unknown',
        vehicleType: result.VehicleType || 'Unknown',
        cylinders: result.EngineCylinders || '',
        horsepower: result.EngineHP || '',
      }
    } catch (error) {
      if (attempt === retries) {
        console.error('NHTSA decode failed after retries:', error)
        return null // Return null instead of throwing — let the flow continue
      }
    }
  }
  return null
}
