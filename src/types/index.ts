export interface VehicleBasicInfo {
  vin: string;
  make: string;
  model: string;
  year: number;
  bodyType: string;
  engineSize: string;
  fuelType: string;
  transmission: string;
  driveType: string;
  country: string;
}

export interface VinPreCheckResult {
  vin: string;
  format: 'vin' | 'chassis' | 'invalid';
  dataSource: 'japan' | 'europe' | 'global';
  vehicleInfo: VehicleBasicInfo | null;
  error?: string;
}

export interface MileageRecord {
  date: string;
  mileage: number;
  source: string;
}

export interface DamageRecord {
  date: string;
  type: string;
  severity: 'minor' | 'moderate' | 'severe';
  description: string;
  cost?: number;
}

export interface OwnershipRecord {
  startDate: string;
  endDate?: string;
  location?: string;
  type: 'private' | 'commercial' | 'lease' | 'rental';
}

export interface VehicleReport {
  id: string;
  vin: string;
  vehicleInfo: VehicleBasicInfo;
  overallScore: number;
  mileageHistory: MileageRecord[];
  damageRecords: DamageRecord[];
  ownershipHistory: OwnershipRecord[];
  theftCheck: {
    isStolen: boolean;
    checkedDatabases: string[];
    lastChecked: string;
  };
  titleInfo: {
    currentTitle: string;
    titleHistory: string[];
    hasSalvageTitle: boolean;
    hasFloodDamage: boolean;
  };
  createdAt: string;
  dataSource: string;
}

export interface PricingTier {
  id: string;
  name: string;
  reports: number;
  priceTZS: number;
  priceUSD: number;
  savings?: string;
  popular?: boolean;
  comingSoon?: boolean;
  features: string[];
}

export interface PaymentRecord {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  provider: string;
  providerRef?: string;
  reportsIncluded: number;
  reportsUsed: number;
  pricingTier: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  fullName?: string;
  reportsRemaining: number;
  createdAt: string;
}
