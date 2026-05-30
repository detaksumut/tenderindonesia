/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RegionalStandard, AHSPTemplate } from './types.ts';

export const REGIONAL_STANDARDS: RegionalStandard[] = [
  {
    region: "DKI Jakarta",
    source: "Standar Satuan Harga (SSH) Pemprov DKI Jakarta No. 12/2024",
    year: 2024,
    rates: [
      // UPAH (Per Hari Kerja / 7 Jam)
      { code: "L.01", name: "Pekerja", unit: "OH", price: 155000, category: "Upah" },
      { code: "L.02", name: "Tukang", unit: "OH", price: 180000, category: "Upah" },
      { code: "L.03", name: "Kepala Tukang", unit: "OH", price: 195000, category: "Upah" },
      { code: "L.04", name: "Mandor", unit: "OH", price: 210000, category: "Upah" },
      // BAHAN PEKERJAAN STRUKTUR
      { code: "M.01", name: "Semen Portland (PC) per kg", unit: "kg", price: 1850, category: "Bahan" },
      { code: "M.02", name: "Pasir Pasang", unit: "m3", price: 345000, category: "Bahan" },
      { code: "M.03", name: "Pasir Beton", unit: "m3", price: 380000, category: "Bahan" },
      { code: "M.04", name: "Kerikil / Split 1/2", unit: "m3", price: 325000, category: "Bahan" },
      { code: "M.05", name: "Batu Kali Belah 15/20 cm", unit: "m3", price: 310000, category: "Bahan" },
      { code: "M.06", name: "Besi Beton Polos / Ulir", unit: "kg", price: 16200, category: "Bahan" },
      { code: "M.07", name: "Kawat Beton (Gunting/Bindrat)", unit: "kg", price: 24500, category: "Bahan" },
      // BAHAN PEKERJAAN ARSITERR
      { code: "M.08", name: "Batu Bata Merah Ukuran Standar", unit: "bh", price: 1100, category: "Bahan" },
      { code: "M.09", name: "Semen Mortar Instan", unit: "kg", price: 3200, category: "Bahan" },
      { code: "M.10", name: "Keramik Lantai 40x40 cm Putih (Standard)", unit: "m2", price: 85000, category: "Bahan" },
      { code: "M.11", name: "Cat Tembok Interior (Standard)", unit: "kg", price: 42000, category: "Bahan" },
      { code: "M.12", name: "Cat Tembok Eksterior (Weather-Shield)", unit: "kg", price: 89000, category: "Bahan" },
      { code: "M.13", name: "Kayu Bekisting (Meranti)", unit: "m3", price: 3300000, category: "Bahan" },
      { code: "M.14", name: "Paku Biasa 2\" - 5\"", unit: "kg", price: 19000, category: "Bahan" },
      // ALAT SEWA PER JAM
      { code: "E.01", name: "Excavator 80-140 HP", unit: "Jam", price: 375000, category: "Alat" },
      { code: "E.02", name: "Dump Truck 5 Ton", unit: "Jam", price: 195000, category: "Alat" },
      { code: "E.03", name: "Concrete Mixer 0.35 m3", unit: "Jam", price: 75000, category: "Alat" },
      { code: "E.04", name: "Water Tank Truck (Sewa)", unit: "Jam", price: 210000, category: "Alat" },
    ]
  },
  {
    region: "Jawa Barat (Bandung)",
    source: "Harga Satuan Pokok Kegiatan Kota Bandung SK Walikota 2024",
    year: 2024,
    rates: [
      { code: "L.01", name: "Pekerja", unit: "OH", price: 140000, category: "Upah" },
      { code: "L.02", name: "Tukang", unit: "OH", price: 165000, category: "Upah" },
      { code: "L.03", name: "Kepala Tukang", unit: "OH", price: 180000, category: "Upah" },
      { code: "L.04", name: "Mandor", unit: "OH", price: 195000, category: "Upah" },
      { code: "M.01", name: "Semen Portland (PC) per kg", unit: "kg", price: 1720, category: "Bahan" },
      { code: "M.02", name: "Pasir Pasang", unit: "m3", price: 295000, category: "Bahan" },
      { code: "M.03", name: "Pasir Beton", unit: "m3", price: 320000, category: "Bahan" },
      { code: "M.04", name: "Kerikil / Split 1/2", unit: "m3", price: 290000, category: "Bahan" },
      { code: "M.05", name: "Batu Kali Belah 15/20 cm", unit: "m3", price: 275000, category: "Bahan" },
      { code: "M.06", name: "Besi Beton Polos / Ulir", unit: "kg", price: 15300, category: "Bahan" },
      { code: "M.07", name: "Kawat Beton (Gunting/Bindrat)", unit: "kg", price: 23000, category: "Bahan" },
      { code: "M.08", name: "Batu Bata Merah Ukuran Standar", unit: "bh", price: 950, category: "Bahan" },
      { code: "M.09", name: "Semen Mortar Instan", unit: "kg", price: 3000, category: "Bahan" },
      { code: "M.10", name: "Keramik Lantai 40x40 cm Putih (Standard)", unit: "m2", price: 78000, category: "Bahan" },
      { code: "M.11", name: "Cat Tembok Interior (Standard)", unit: "kg", price: 38000, category: "Bahan" },
      { code: "M.12", name: "Cat Tembok Eksterior (Weather-Shield)", unit: "kg", price: 82000, category: "Bahan" },
      { code: "M.13", name: "Kayu Bekisting (Meranti)", unit: "m3", price: 2950000, category: "Bahan" },
      { code: "M.14", name: "Paku Biasa 2\" - 5\"", unit: "kg", price: 18000, category: "Bahan" },
      { code: "E.01", name: "Excavator 80-140 HP", unit: "Jam", price: 350000, category: "Alat" },
      { code: "E.02", name: "Dump Truck 5 Ton", unit: "Jam", price: 180000, category: "Alat" },
      { code: "E.03", name: "Concrete Mixer 0.35 m3", unit: "Jam", price: 68000, category: "Alat" },
      { code: "E.04", name: "Water Tank Truck (Sewa)", unit: "Jam", price: 195000, category: "Alat" },
    ]
  },
  {
    region: "Jawa Timur (Surabaya)",
    source: "Keputusan Gubernur Provinsi Jawa Timur No. 188/SSH/2024",
    year: 2024,
    rates: [
      { code: "L.01", name: "Pekerja", unit: "OH", price: 135000, category: "Upah" },
      { code: "L.02", name: "Tukang", unit: "OH", price: 160000, category: "Upah" },
      { code: "L.03", name: "Kepala Tukang", unit: "OH", price: 175000, category: "Upah" },
      { code: "L.04", name: "Mandor", unit: "OH", price: 190000, category: "Upah" },
      { code: "M.01", name: "Semen Portland (PC) per kg", unit: "kg", price: 1650, category: "Bahan" },
      { code: "M.02", name: "Pasir Pasang", unit: "m3", price: 280000, category: "Bahan" },
      { code: "M.03", name: "Pasir Beton", unit: "m3", price: 310000, category: "Bahan" },
      { code: "M.04", name: "Kerikil / Split 1/2", unit: "m3", price: 275000, category: "Bahan" },
      { code: "M.05", name: "Batu Kali Belah 15/20 cm", unit: "m3", price: 260000, category: "Bahan" },
      { code: "M.06", name: "Besi Beton Polos / Ulir", unit: "kg", price: 14900, category: "Bahan" },
      { code: "M.07", name: "Kawat Beton (Gunting/Bindrat)", unit: "kg", price: 22000, category: "Bahan" },
      { code: "M.08", name: "Batu Bata Merah Ukuran Standar", unit: "bh", price: 900, category: "Bahan" },
      { code: "M.09", name: "Semen Mortar Instan", unit: "kg", price: 2900, category: "Bahan" },
      { code: "M.10", name: "Keramik Lantai 40x40 cm Putih (Standard)", unit: "m2", price: 74000, category: "Bahan" },
      { code: "M.11", name: "Cat Tembok Interior (Standard)", unit: "kg", price: 36000, category: "Bahan" },
      { code: "M.12", name: "Cat Tembok Eksterior (Weather-Shield)", unit: "kg", price: 79000, category: "Bahan" },
      { code: "M.13", name: "Kayu Bekisting (Meranti)", unit: "m3", price: 2850000, category: "Bahan" },
      { code: "M.14", name: "Paku Biasa 2\" - 5\"", unit: "kg", price: 17500, category: "Bahan" },
      { code: "E.01", name: "Excavator 80-140 HP", unit: "Jam", price: 340000, category: "Alat" },
      { code: "E.02", name: "Dump Truck 5 Ton", unit: "Jam", price: 175000, category: "Alat" },
      { code: "E.03", name: "Concrete Mixer 0.35 m3", unit: "Jam", price: 65000, category: "Alat" },
      { code: "E.04", name: "Water Tank Truck (Sewa)", unit: "Jam", price: 185000, category: "Alat" },
    ]
  },
  {
    region: "Sumatera Utara (Medan)",
    source: "Standar Belanja Daerah (SBD) Kota Medan Pemko Medan 2024",
    year: 2024,
    rates: [
      { code: "L.01", name: "Pekerja", unit: "OH", price: 125000, category: "Upah" },
      { code: "L.02", name: "Tukang", unit: "OH", price: 155000, category: "Upah" },
      { code: "L.03", name: "Kepala Tukang", unit: "OH", price: 165000, category: "Upah" },
      { code: "L.04", name: "Mandor", unit: "OH", price: 180000, category: "Upah" },
      { code: "M.01", name: "Semen Portland (PC) per kg", unit: "kg", price: 1800, category: "Bahan" },
      { code: "M.02", name: "Pasir Pasang", unit: "m3", price: 270000, category: "Bahan" },
      { code: "M.03", name: "Pasir Beton", unit: "m3", price: 295000, category: "Bahan" },
      { code: "M.04", name: "Kerikil / Split 1/2", unit: "m3", price: 285000, category: "Bahan" },
      { code: "M.05", name: "Batu Kali Belah 15/20 cm", unit: "m3", price: 290000, category: "Bahan" },
      { code: "M.06", name: "Besi Beton Polos / Ulir", unit: "kg", price: 15900, category: "Bahan" },
      { code: "M.07", name: "Kawat Beton (Gunting/Bindrat)", unit: "kg", price: 24000, category: "Bahan" },
      { code: "M.08", name: "Batu Bata Merah Ukuran Standar", unit: "bh", price: 950, category: "Bahan" },
      { code: "M.09", name: "Semen Mortar Instan", unit: "kg", price: 3100, category: "Bahan" },
      { code: "M.10", name: "Keramik Lantai 40x40 cm Putih (Standard)", unit: "m2", price: 79000, category: "Bahan" },
      { code: "M.11", name: "Cat Tembok Interior (Standard)", unit: "kg", price: 39500, category: "Bahan" },
      { code: "M.12", name: "Cat Tembok Eksterior (Weather-Shield)", unit: "kg", price: 85000, category: "Bahan" },
      { code: "M.13", name: "Kayu Bekisting (Meranti)", unit: "m3", price: 3100000, category: "Bahan" },
      { code: "M.14", name: "Paku Biasa 2\" - 5\"", unit: "kg", price: 18500, category: "Bahan" },
      { code: "E.01", name: "Excavator 80-140 HP", unit: "Jam", price: 360000, category: "Alat" },
      { code: "E.02", name: "Dump Truck 5 Ton", unit: "Jam", price: 190000, category: "Alat" },
      { code: "E.03", name: "Concrete Mixer 0.35 m3", unit: "Jam", price: 70000, category: "Alat" },
      { code: "E.04", name: "Water Tank Truck (Sewa)", unit: "Jam", price: 200000, category: "Alat" },
    ]
  },
  {
    region: "Kalimantan Utara (Nunukan)",
    source: "Standar Satuan Harga (SSH) Kabupaten Nunukan SK Bupati No. 182/2025",
    year: 2025,
    rates: [
      { code: "L.01", name: "Pekerja", unit: "OH", price: 175000, category: "Upah" },
      { code: "L.02", name: "Tukang", unit: "OH", price: 210000, category: "Upah" },
      { code: "L.03", name: "Kepala Tukang", unit: "OH", price: 230000, category: "Upah" },
      { code: "L.04", name: "Mandor", unit: "OH", price: 250000, category: "Upah" },
      { code: "M.01", name: "Semen Portland (PC) per kg", unit: "kg", price: 2450, category: "Bahan" },
      { code: "M.02", name: "Pasir Pasang", unit: "m3", price: 420000, category: "Bahan" },
      { code: "M.03", name: "Pasir Beton", unit: "m3", price: 480000, category: "Bahan" },
      { code: "M.04", name: "Kerikil / Split 1/2", unit: "m3", price: 450000, category: "Bahan" },
      { code: "M.05", name: "Batu Kali Belah 15/20 cm", unit: "m3", price: 410000, category: "Bahan" },
      { code: "M.06", name: "Besi Beton Polos / Ulir", unit: "kg", price: 22000, category: "Bahan" },
      { code: "M.07", name: "Kawat Beton (Gunting/Bindrat)", unit: "kg", price: 32000, category: "Bahan" },
      { code: "M.08", name: "Batu Bata Merah Ukuran Standar", unit: "bh", price: 1500, category: "Bahan" },
      { code: "M.09", name: "Semen Mortar Instan", unit: "kg", price: 4500, category: "Bahan" },
      { code: "M.10", name: "Keramik Lantai 40x40 cm Putih (Standard)", unit: "m2", price: 115000, category: "Bahan" },
      { code: "M.11", name: "Cat Tembok Interior (Standard)", unit: "kg", price: 55000, category: "Bahan" },
      { code: "M.12", name: "Cat Tembok Eksterior (Weather-Shield)", unit: "kg", price: 125000, category: "Bahan" },
      { code: "M.13", name: "Kayu Bekisting (Meranti)", unit: "m3", price: 4200000, category: "Bahan" },
      { code: "M.14", name: "Paku Biasa 2\" - 5\"", unit: "kg", price: 26050, category: "Bahan" },
      { code: "E.01", name: "Excavator 80-140 HP", unit: "Jam", price: 450000, category: "Alat" },
      { code: "E.02", name: "Dump Truck 5 Ton", unit: "Jam", price: 280000, category: "Alat" },
      { code: "E.03", name: "Concrete Mixer 0.35 m3", unit: "Jam", price: 95000, category: "Alat" },
      { code: "E.04", name: "Water Tank Truck (Sewa)", unit: "Jam", price: 280000, category: "Alat" },
    ]
  }
];

// Helper to calculate AHSP total for a given region dynamically
export function calculateAHSPForRegion(templateCode: string, regionName: string): AHSPTemplate {
  const region = REGIONAL_STANDARDS.find(r => r.region === regionName) || REGIONAL_STANDARDS[0];
  const rates = region.rates;

  const getPrice = (namePart: string, category: 'Bahan' | 'Upah' | 'Alat') => {
    const rate = rates.find(r => r.category === category && r.name.toLowerCase().includes(namePart.toLowerCase()));
    return rate ? rate.price : 0;
  };

  // AHSP definitions based on real PUPR guidelines & coefficients
  switch (templateCode) {
    case "A.2.2.1.9": // Pembersihan lapangan dan perataan (per m2)
      // Pekerja: 0.100, Mandor: 0.005
      return {
        code: "A.2.2.1.9",
        name: "Pembersihan Lapangan dan Perataan (per 1 m2)",
        unit: "m2",
        overheadProfitPercent: 15,
        coefficients: [
          { category: "Upah", name: "Pekerja", coefficient: 0.100, unit: "OH", standardPrice: getPrice("Pekerja", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Mandor", coefficient: 0.005, unit: "OH", standardPrice: getPrice("Mandor", "Upah"), totalPrice: 0 }
        ],
        totalDirectCost: 0,
        totalUnitCost: 0
      };

    case "A.2.2.1.4": // Pengukuran dan pemasangan Bouwplank (per m1)
      // Kayu Meranti: 0.012 m3, Paku: 0.020 kg, Pekerja: 0.100 OH, Tukang: 0.100 OH, Kepala Tukang: 0.010 OH, Mandor: 0.005 OH
      return {
        code: "A.2.2.1.4",
        name: "Pengukuran dan Pemasangan Bouwplank (per 1 m')",
        unit: "m",
        overheadProfitPercent: 15,
        coefficients: [
          { category: "Bahan", name: "Kayu Bekisting (Meranti)", coefficient: 0.012, unit: "m3", standardPrice: getPrice("Kayu Bekisting", "Bahan"), totalPrice: 0 },
          { category: "Bahan", name: "Paku Biasa 2\" - 5\"", coefficient: 0.020, unit: "kg", standardPrice: getPrice("Paku Biasa", "Bahan"), totalPrice: 0 },
          { category: "Upah", name: "Pekerja", coefficient: 0.100, unit: "OH", standardPrice: getPrice("Pekerja", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Tukang", coefficient: 0.100, unit: "OH", standardPrice: getPrice("Tukang", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Kepala Tukang", coefficient: 0.010, unit: "OH", standardPrice: getPrice("Kepala Tukang", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Mandor", coefficient: 0.005, unit: "OH", standardPrice: getPrice("Mandor", "Upah"), totalPrice: 0 }
        ],
        totalDirectCost: 0,
        totalUnitCost: 0
      };

    case "A.2.2.1.1": // Galian tanah biasa sedalam 1 meter (per m3)
      // Pekerja: 0.750, Mandor: 0.025
      return {
        code: "A.2.2.1.1",
        name: "Galian Tanah Biasa sedalam < 1 m (per 1 m3)",
        unit: "m3",
        overheadProfitPercent: 15,
        coefficients: [
          { category: "Upah", name: "Pekerja", coefficient: 0.750, unit: "OH", standardPrice: getPrice("Pekerja", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Mandor", coefficient: 0.025, unit: "OH", standardPrice: getPrice("Mandor", "Upah"), totalPrice: 0 }
        ],
        totalDirectCost: 0,
        totalUnitCost: 0
      };

    case "A.2.3.1.1": // Pasangan batu belah 1:4 (per m3)
      // Batu belah: 1.200 m3, Portland Cement: 163.00 kg, Pasir: 0.520 m3
      // Pekerja: 3.600, Tukang: 1.200, Kepala Tukang: 0.120, Mandor: 0.180
      return {
        code: "A.2.3.1.1",
        name: "Pasangan Pondasi Batu Kali Belah 1:4 campuran (per 1 m3)",
        unit: "m3",
        overheadProfitPercent: 15,
        coefficients: [
          { category: "Bahan", name: "Batu Kali Belah 15/20 cm", coefficient: 1.200, unit: "m3", standardPrice: getPrice("Batu Kali Belah", "Bahan"), totalPrice: 0 },
          { category: "Bahan", name: "Semen Portland (PC) per kg", coefficient: 163.00, unit: "kg", standardPrice: getPrice("Semen Portland", "Bahan"), totalPrice: 0 },
          { category: "Bahan", name: "Pasir Pasang", coefficient: 0.520, unit: "m3", standardPrice: getPrice("Pasir Pasang", "Bahan"), totalPrice: 0 },
          { category: "Upah", name: "Pekerja", coefficient: 3.600, unit: "OH", standardPrice: getPrice("Pekerja", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Tukang", coefficient: 1.200, unit: "OH", standardPrice: getPrice("Tukang", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Kepala Tukang", coefficient: 0.120, unit: "OH", standardPrice: getPrice("Kepala Tukang", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Mandor", coefficient: 0.180, unit: "OH", standardPrice: getPrice("Mandor", "Upah"), totalPrice: 0 }
        ],
        totalDirectCost: 0,
        totalUnitCost: 0
      };

    case "A.4.1.1.5": // Beton Mutu K-225 (per m3) manual/mixer
      // Semen PC: 371 kg, Pasir Beton: 0.498 m3, Kerikil/Split: 0.771 m3, Air: 215 liter (harga air diabaikan / dianggap masuk overhead)
      // Pekerja: 1.650, Tukang: 0.275, Kepala Tukang: 0.028, Mandor: 0.083, Concrete Mixer: 0.240 Jam
      return {
        code: "A.4.1.1.5",
        name: "Membuat Beton Struktur Mutu K-225 (per 1 m3)",
        unit: "m3",
        overheadProfitPercent: 15,
        coefficients: [
          { category: "Bahan", name: "Semen Portland (PC) per kg", coefficient: 371.00, unit: "kg", standardPrice: getPrice("Semen Portland", "Bahan"), totalPrice: 0 },
          { category: "Bahan", name: "Pasir Beton", coefficient: 0.498, unit: "m3", standardPrice: getPrice("Pasir Beton", "Bahan"), totalPrice: 0 },
          { category: "Bahan", name: "Kerikil / Split 1/2", coefficient: 0.771, unit: "m3", standardPrice: getPrice("Kerikil", "Bahan"), totalPrice: 0 },
          { category: "Upah", name: "Pekerja", coefficient: 1.650, unit: "OH", standardPrice: getPrice("Pekerja", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Tukang", coefficient: 0.275, unit: "OH", standardPrice: getPrice("Tukang", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Kepala Tukang", coefficient: 0.028, unit: "OH", standardPrice: getPrice("Kepala Tukang", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Mandor", coefficient: 0.083, unit: "OH", standardPrice: getPrice("Mandor", "Upah"), totalPrice: 0 },
          { category: "Alat", name: "Concrete Mixer 0.35 m3", coefficient: 0.240, unit: "Jam", standardPrice: getPrice("Concrete Mixer", "Alat"), totalPrice: 0 }
        ],
        totalDirectCost: 0,
        totalUnitCost: 0
      };

    case "A.4.4.1.1": // Pasangan Bata Merah tebal 1/2 bata campuran 1:4 (per m2)
      // Bata Merah: 70 buah, Portland Cement: 11.50 kg, Pasir Pasang: 0.043 m3
      // Pekerja: 0.300, Tukang: 0.100, Kepala Tukang: 0.010, Mandor: 0.015
      return {
        code: "A.4.4.1.1",
        name: "Pasangan Bata Merah Tebal 1/2 Bata Campuran 1:4 (per 1 m2)",
        unit: "m2",
        overheadProfitPercent: 15,
        coefficients: [
          { category: "Bahan", name: "Batu Bata Merah Ukuran Standar", coefficient: 70, unit: "bh", standardPrice: getPrice("Batu Bata Merah", "Bahan"), totalPrice: 0 },
          { category: "Bahan", name: "Semen Portland (PC) per kg", coefficient: 11.50, unit: "kg", standardPrice: getPrice("Semen Portland", "Bahan"), totalPrice: 0 },
          { category: "Bahan", name: "Pasir Pasang", coefficient: 0.043, unit: "m3", standardPrice: getPrice("Pasir Pasang", "Bahan"), totalPrice: 0 },
          { category: "Upah", name: "Pekerja", coefficient: 0.300, unit: "OH", standardPrice: getPrice("Pekerja", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Tukang", coefficient: 0.100, unit: "OH", standardPrice: getPrice("Tukang", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Kepala Tukang", coefficient: 0.010, unit: "OH", standardPrice: getPrice("Kepala Tukang", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Mandor", coefficient: 0.015, unit: "OH", standardPrice: getPrice("Mandor", "Upah"), totalPrice: 0 }
        ],
        totalDirectCost: 0,
        totalUnitCost: 0
      };

    case "A.4.4.2.1": // Plesteran 1:4 tebal 15mm (per m2)
      // Portland Cement: 6.24 kg, Pasir Pasang: 0.024 m3
      // Pekerja: 0.300, Tukang: 0.150, Kepala Tukang: 0.015, Mandor: 0.015
      return {
        code: "A.4.4.2.1",
        name: "Plesteran Tebal 15 mm Campuran 1:4 (per 1 m2)",
        unit: "m2",
        overheadProfitPercent: 15,
        coefficients: [
          { category: "Bahan", name: "Semen Portland (PC) per kg", coefficient: 6.24, unit: "kg", standardPrice: getPrice("Semen Portland", "Bahan"), totalPrice: 0 },
          { category: "Bahan", name: "Pasir Pasang", coefficient: 0.024, unit: "m3", standardPrice: getPrice("Pasir Pasang", "Bahan"), totalPrice: 0 },
          { category: "Upah", name: "Pekerja", coefficient: 0.300, unit: "OH", standardPrice: getPrice("Pekerja", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Tukang", coefficient: 0.150, unit: "OH", standardPrice: getPrice("Tukang", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Kepala Tukang", coefficient: 0.015, unit: "OH", standardPrice: getPrice("Kepala Tukang", "Upah"), totalPrice: 0 },
          { category: "Upah", name: "Mandor", coefficient: 0.015, unit: "OH", standardPrice: getPrice("Mandor", "Upah"), totalPrice: 0 }
        ],
        totalDirectCost: 0,
        totalUnitCost: 0
      };

    default: // Return Galian as default fallback
      return calculateAHSPForRegion("A.2.2.1.1", regionName);
  }
}

// Full evaluation of coefficients
export function buildAndEvaluateAHSP(templateCode: string, regionName: string): AHSPTemplate {
  const template = calculateAHSPForRegion(templateCode, regionName);
  let directCost = 0;
  template.coefficients = template.coefficients.map(co => {
    const totalPrice = co.coefficient * co.standardPrice;
    directCost += totalPrice;
    return { ...co, totalPrice };
  });
  template.totalDirectCost = directCost;
  const overheadProfitAmount = directCost * (template.overheadProfitPercent / 100);
  template.totalUnitCost = Math.round(directCost + overheadProfitAmount);
  return template;
}
