/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MaterialRate {
  code: string;
  name: string;
  unit: string;
  price: number;
  category: 'Bahan' | 'Upah' | 'Alat';
}

export interface RegionalStandard {
  region: string;
  source: string; // e.g., "SSH DKI Jakarta Pemprov 2024"
  year: number;
  rates: MaterialRate[];
}

export interface AHSPCoefficient {
  category: 'Bahan' | 'Upah' | 'Alat';
  name: string;
  coefficient: number;
  unit: string;
  standardPrice: number; // reference material price
  totalPrice: number;    // coefficient * standardPrice
}

export interface AHSPTemplate {
  code: string; // e.g., "A.2.2.1.1"
  name: string; // e.g., "Galian tanah biasa sedalam < 1 m"
  unit: string; // e.g., "m3"
  coefficients: AHSPCoefficient[];
  totalDirectCost: number;
  overheadProfitPercent: number; // typically 10% or 15%
  totalUnitCost: number;
}

export interface RABItem {
  id: string;
  no: string;
  description: string;
  volume: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  estimatedUnitPrice: number; // The AI's estimated/fair price
  estimatedTotalPrice: number;
  difference: number;         // Original - Estimated
  status: 'SESUAI' | 'MARKUP' | 'UNDERPRICED' | 'SALAH_SATUAN' | 'PERLU_VERIFIKASI';
  justification: string;      // AI reasoning
  coefficientCode?: string;   // linked AHSP code if known
}

export interface RABGroup {
  id: string;
  title: string;              // e.g., "Pekerjaan Persiapan"
  items: RABItem[];
}

export interface AuditAnomaly {
  id: string;
  no?: string;
  itemName: string;
  type: 'MARKUP_TINGGI' | 'DI BAWAH STANDAR' | 'SALAH_SATUAN' | 'POTENSI_FIKTIF' | 'VOLUME_GANJIL';
  severity: 'WARNING' | 'DANGER' | 'INFO';
  description: string;
  originalPrice: number;
  suggestedPrice: number;
  lostBudget: number;         // The financial impact
}

export interface EstimationResult {
  projectName: string;
  location: string;
  projectCeiling: number; // Nilai Pagu Proyek (Budget Ceiling) in IDR
  regionalStandard: string;
  referenceYear: number;
  totalCostOriginal: number;
  totalCostEstimated: number;
  savingOpportunity: number;
  trustScore: number;         // 1-100% calculation safety index
  groups: RABGroup[];
  anomalies: AuditAnomaly[];
  generalAnalysis: string;
  ahspBreakdown: { [itemDescription: string]: AHSPTemplate };
  warning?: string;
  
  // Optional precision specifications parsed by AI
  luasBangunan?: number;
  jumlahRuangan?: number;
  pondasi?: string;
  luasDinding?: number;
  luasAtap?: number;
  blueprintWidth?: number;
  blueprintLength?: number;
  blueprintFloors?: number;
}
