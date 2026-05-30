import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  DollarSign, 
  Calculator, 
  Activity, 
  ShieldAlert, 
  ArrowRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { EstimationResult, RABGroup, RABItem } from '../types';
import MetricCard from './MetricCard';

interface RABAuditPanelProps {
  result: EstimationResult;
  multiplier: number;
  grandTotalBidWithPpn: number;
  ppn11: number;
  totalCostOriginalAdjusted: number;
  projectPagu: number;
  totalCostEstimated: number;
  marginToPagu: number;
  complianceSSHScore: number;
  metaProjectName: string;
  metaLocation: string;
  setSelectedAHSPItem: (v: string) => void;
  setActiveTab: (v: any) => void;
  formatIDR: (v: number) => string;
}

export default function RABAuditPanel({
  result,
  multiplier,
  grandTotalBidWithPpn,
  ppn11,
  totalCostOriginalAdjusted,
  projectPagu,
  totalCostEstimated,
  marginToPagu,
  complianceSSHScore,
  metaProjectName,
  metaLocation,
  setSelectedAHSPItem,
  setActiveTab,
  formatIDR
}: RABAuditPanelProps) {
  
  // Extract all non-compliant lines or warning lines for explicit audit reports
  const anomalies: { groupTitle: string; item: RABItem; diffPercent: number; adjustedUnit: number }[] = [];
  result.groups.forEach(group => {
    group.items.forEach(item => {
      const adjustedUnit = Math.round(item.unitPrice * multiplier);
      const isExceeding = adjustedUnit > item.estimatedUnitPrice;
      const isUnderpriced = adjustedUnit < (item.estimatedUnitPrice * 0.6) && item.estimatedUnitPrice > 0;
      const isWrongUnit = item.status === 'SALAH_SATUAN';

      if (isExceeding || isUnderpriced || isWrongUnit) {
        const diffPercent = item.estimatedUnitPrice > 0 
          ? Math.round(((adjustedUnit - item.estimatedUnitPrice) / item.estimatedUnitPrice) * 100)
          : 0;
        anomalies.push({
          groupTitle: group.title,
          item,
          diffPercent,
          adjustedUnit
        });
      }
    });
  });

  return (
    <div className="flex flex-col gap-6 font-sans" id="rab-audit-panel-component">
      {/* 4 Large Verification Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="audit-metrics-grid">
        <MetricCard 
          title="Total Penawaran Aktif" 
          value={formatIDR(grandTotalBidWithPpn)} 
          subtext={`Konstruksi: ${formatIDR(totalCostOriginalAdjusted)} + PPN 11% (${formatIDR(ppn11)})`} 
          type="original" 
        />
        <MetricCard 
          title="Batas Maksimal SSH Pemda" 
          value={formatIDR(totalCostEstimated)} 
          subtext="Akumulasi plafon HSPK regional resmi" 
          type="estimated" 
        />
        <MetricCard 
          title={marginToPagu >= 0 ? "Sisa Anggaran (Surplus)" : "Defisit Terhadap Pagu"} 
          value={formatIDR(Math.abs(marginToPagu))} 
          subtext={marginToPagu >= 0 ? "Aman di bawah batas pagu proyek" : "Anggaran melebihi pagu!"} 
          type="saving" 
        />
        <MetricCard 
          title="Tingkat Kepatuhan SSH" 
          value={`${complianceSSHScore}%`} 
          subtext="Item pekerjaan di bawah tarif batas resmi" 
          type="trust" 
          score={complianceSSHScore}
        />
      </div>

      {/* Alignment Pagu and Progress Gauge */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col gap-4" id="pagu-compliance-gauge">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Verifikasi Pagu Anggaran Proyek</span>
            <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
              {result.projectName || metaProjectName}
            </h3>
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {result.location || metaLocation}
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                Pagu Proyek (Include PPN): <span className="font-bold text-slate-850">{formatIDR(projectPagu)}</span>
              </span>
            </div>
          </div>

          {/* Overbudget Badge */}
          {grandTotalBidWithPpn > projectPagu ? (
            <span className="inline-flex self-start sm:self-center items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
              <AlertTriangle className="h-3.5 w-3.5" />
              Penawaran Over-Pagu
            </span>
          ) : (
            <span className="inline-flex self-start sm:self-center items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-750 border border-emerald-200">
              <CheckCircle className="h-3.5 w-3.5" />
              Penawaran Aman Dalam Pagu
            </span>
          )}
        </div>

        {/* Dynamic Progress Bars */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-600">Anggaran Penawaran Aktif (Terkoreksi + PPN 11%) vs Pagu</span>
              <span className={`font-mono font-bold ${grandTotalBidWithPpn > projectPagu ? 'text-rose-600' : 'text-slate-800'}`}>
                {formatIDR(grandTotalBidWithPpn)} ({((grandTotalBidWithPpn / (projectPagu || 1)) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  grandTotalBidWithPpn > projectPagu ? 'bg-rose-600' : 'bg-emerald-600'
                }`} 
                style={{ width: `${Math.min(100, (grandTotalBidWithPpn / (projectPagu || 1)) * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-600">Batas Maksimum Plafon SSH Pemerintah vs Pagu</span>
              <span className="font-mono text-amber-700 font-bold">
                {formatIDR(totalCostEstimated)} ({((totalCostEstimated / (projectPagu || 1)) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (totalCostEstimated / (projectPagu || 1)) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg text-xs leading-relaxed ${
          grandTotalBidWithPpn > projectPagu
            ? 'bg-rose-50 text-rose-950 border border-rose-100'
            : 'bg-emerald-50/50 text-emerald-950 border border-emerald-100'
        }`}>
          {grandTotalBidWithPpn > projectPagu ? (
            <span>
              <strong>Peringatan Defisit:</strong> Nilai penawaran kontraktor saat ini melampaui pagu sebesar <strong className="text-rose-800">{formatIDR(grandTotalBidWithPpn - projectPagu)}</strong>. Silakan turunkan persentase harga penawaran menggunakan alat penyesuaian di tab penawaran agar nilai tender masuk dalam pagu yang sah.
            </span>
          ) : (
            <span>
              <strong>Rentang Surplus Aman:</strong> Seluruh komponen penawaran berada di bawah batas pagu dengan sisa margin sebesar <strong className="text-emerald-800">{formatIDR(marginToPagu)}</strong>. Anda siap untuk submit draf ini!
            </span>
          )}
        </div>
      </div>

      {/* Grid for Anomalies list and technical checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Detailed Anomalies Report list */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-rose-700">
              <ShieldAlert className="h-4.5 w-4.5" />
              Daftar Temuan Audit SSH &amp; PUPR
            </span>
            <span className="bg-rose-100 text-rose-800 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
              {anomalies.length} Kasus
            </span>
          </h4>

          <div className="space-y-3.5 overflow-y-auto max-h-[480px] flex-1 pr-1">
            {anomalies.length === 0 ? (
              <div className="text-center py-12 text-slate-400 leading-tight">
                <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs font-bold">Hebat! Tidak ada anomali terdeteksi</p>
                <p className="text-[10px] mt-1 text-slate-400">Seluruh item telah lulus audit batas harga satuan daerah.</p>
              </div>
            ) : (
              anomalies.map((an, i) => {
                const isExceeding = an.adjustedUnit > an.item.estimatedUnitPrice;
                const isUnderpriced = an.adjustedUnit < (an.item.estimatedUnitPrice * 0.6) && an.item.estimatedUnitPrice > 0;
                
                return (
                  <div key={i} className={`p-3 rounded-lg border text-xs flex flex-col gap-2 ${
                    isExceeding 
                      ? 'bg-rose-50/50 border-rose-200' 
                      : isUnderpriced 
                        ? 'bg-amber-50/50 border-amber-200' 
                        : 'bg-yellow-50/50 border-yellow-250'
                  }`}>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-tight truncate">{an.groupTitle}</span>
                      <strong className="text-slate-800 block text-[11px] mt-0.5 leading-snug">{an.item.no}. {an.item.description}</strong>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium">
                      <span className="text-slate-500">Uraian Harga:</span>
                      <span className="font-bold text-slate-800">{formatIDR(an.adjustedUnit)}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                      <span className="text-slate-500">Acuan Plafon (SSH):</span>
                      <span className="font-bold text-slate-900">{formatIDR(an.item.estimatedUnitPrice)}</span>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-1 border-t border-dashed border-slate-200 pt-2">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-sm tracking-tight ${
                        isExceeding 
                          ? 'bg-rose-100 text-rose-800' 
                          : isUnderpriced 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-yellow-150 text-yellow-800'
                      }`}>
                        {isExceeding 
                          ? `OVER LIMIT (+ ${an.diffPercent}%)` 
                          : isUnderpriced 
                            ? `UNDERPRICED (${an.diffPercent}%)` 
                            : "SALAH SATUAN / FORMAT"
                        }
                      </span>
                      <span className="text-[10px] text-slate-500 italic leading-tight text-right flex-1 truncate">{an.item.justification}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Detailed Audit Worksheet Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase">Lembar Kerja Evaluasi Tarif (Evaluator Mode)</h4>
            <p className="text-xs text-slate-500 mt-1">Gunakan tabel audit interaktif di bawah ini untuk mengidentifikasi margin dan markup harga satuan. Kolom yang diarsir ungu memuat batas SSH Pemda dan selisihnya.</p>
          </div>

          <div className="overflow-x-auto border border-purple-250 rounded-lg">
            <table className="w-full text-xs text-left text-slate-700 border-collapse">
              <thead>
                <tr className="bg-purple-900 text-white font-bold uppercase text-[9px] border-b border-purple-800">
                  <th className="px-3 py-3 w-10 text-center">No</th>
                  <th className="px-3 py-3">Uraian Pekerjaan / Komponen</th>
                  <th className="px-3 py-3 text-right w-24">Harga Aktif (Rp)</th>
                  <th className="px-3 py-3 text-right w-24 bg-purple-950/20 border-l border-r border-purple-800">Batas SSH (Rp)</th>
                  <th className="px-2 py-3 text-center w-14 bg-purple-950/20 border-r border-purple-800">Selisih %</th>
                  <th className="px-3 py-3 text-center w-24">Tindak Lanjut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                {result.groups.map((group, groupIdx) => {
                  const romanNum = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"][groupIdx] || `${groupIdx + 1}`;
                  return (
                    <React.Fragment key={group.id}>
                      {/* Romawi Header */}
                      <tr className="bg-slate-100/75 border-t border-b border-slate-300 font-extrabold text-slate-950 uppercase">
                        <td className="px-3 py-2 text-center border-r border-slate-200 bg-slate-200/50">{romanNum}</td>
                        <td className="px-3 py-2" colSpan={5}>{group.title}</td>
                      </tr>

                      {group.items.map(it => {
                        const adjustedUnit = Math.round(it.unitPrice * multiplier);
                        const isExceeding = adjustedUnit > it.estimatedUnitPrice;
                        const diffPercent = it.estimatedUnitPrice > 0 
                          ? Math.round(((adjustedUnit - it.estimatedUnitPrice) / it.estimatedUnitPrice) * 100)
                          : 0;

                        return (
                          <tr key={it.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-3 py-2.5 text-center font-mono text-slate-400 border-r border-slate-100">{it.no}</td>
                            <td className="px-3 py-2.5">
                              <span className="font-semibold text-slate-900 block leading-tight">{it.description}</span>
                              {it.coefficientCode && (
                                <button 
                                  onClick={() => {
                                    setSelectedAHSPItem(it.description);
                                    setActiveTab('ahsp');
                                  }}
                                  className="text-[9px] font-bold text-purple-600 hover:underline mt-0.5 text-left block"
                                >
                                  Kode AHSP: {it.coefficientCode} » Klik Evaluasi Koefisien PUPR
                                </button>
                              )}
                            </td>
                            <td className="px-3 py-2.5 text-right font-medium text-slate-800">{adjustedUnit.toLocaleString("id-ID")}</td>
                            <td className="px-3 py-2.5 text-right font-bold text-purple-900 bg-purple-50/20 border-l border-r border-slate-200">{it.estimatedUnitPrice.toLocaleString("id-ID")}</td>
                            <td className={`px-2 py-2.5 text-center font-mono font-black border-r border-slate-100 bg-purple-50/10 ${diffPercent > 0 ? 'text-red-600' : 'text-emerald-700'}`}>
                              {diffPercent > 0 ? `+${diffPercent}%` : `${diffPercent}%`}
                            </td>
                            <td className="px-3 py-2.5 text-center">
                              {isExceeding ? (
                                <span className="inline-flex px-1.5 py-0.5 rounded text-[8px] font-black bg-rose-100 text-rose-800 border border-rose-200 uppercase tracking-wider animate-pulse">MARK-UP SSH &raquo; TURUNKAN</span>
                              ) : (
                                <span className="inline-flex px-1.5 py-0.5 rounded text-[8px] font-black bg-emerald-100 text-emerald-800 border border-emerald-250 uppercase tracking-wider">PATUH &raquo; AMAN</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
