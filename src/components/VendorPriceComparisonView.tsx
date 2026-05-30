import React from 'react';
import { Store, Download, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { EstimationResult } from '../types';

interface VendorPriceComparisonViewProps {
  result: EstimationResult;
  multiplier: number;
  customVendorPrices: Record<string, number>;
  setCustomVendorPrices: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  formatIDR: (v: number) => string;
  onDownloadExcel?: () => void;
  onDownloadWord?: () => void;
}

export function VendorPriceComparisonView({
  result,
  multiplier,
  customVendorPrices,
  setCustomVendorPrices,
  formatIDR,
  onDownloadExcel,
  onDownloadWord
}: VendorPriceComparisonViewProps) {
  
  const handlePriceChange = (itemId: string, val: string) => {
    const numVal = parseInt(val.replace(/\D/g, ''), 10) || 0;
    setCustomVendorPrices(prev => ({
      ...prev,
      [itemId]: numVal
    }));
  };

  const getPaguAssumedPrice = (unitPrice: number) => {
    return unitPrice; 
  };

  const getSSHPrice = (unitPrice: number) => {
    return Math.round(unitPrice * multiplier);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-5 animate-fade-in text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 border-slate-150 gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2 tracking-tight">
            <Store className="h-5 w-5 text-red-650" />
            Katalog Harga Vendor Pribadi (Custom Database)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Bandingkan margin Harga Panitia (Estimasi Pagu), Harga SSH Pemerintah, dan Harga Riil Toko/Vendor Anda.
          </p>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onDownloadExcel}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition active:scale-95 shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            Ekspor Excel
          </button>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-100 text-slate-700 sticky top-0 z-10 shadow-sm font-sans uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3 font-black border-b border-r border-slate-200 w-12 text-center">No</th>
                <th className="px-4 py-3 font-black border-b border-r border-slate-200 min-w-[200px]">Uraian Pekerjaan / Material</th>
                <th className="px-4 py-3 font-black border-b border-r border-slate-200 text-center w-24">Vol</th>
                <th className="px-4 py-3 font-black border-b border-r border-slate-200 text-right w-36 bg-blue-50/50">Harga Panitia (Est)</th>
                <th className="px-4 py-3 font-black border-b border-r border-slate-200 text-right w-36 bg-emerald-50/50">Harga SSH</th>
                <th className="px-4 py-3 font-black border-b border-r border-slate-200 text-right w-44 bg-amber-50/50">Harga Pasar/Vendor</th>
                <th className="px-4 py-3 font-black border-b border-slate-200 text-center w-32">Margin vs SSH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {result.groups.map((group) => (
                <React.Fragment key={group.id}>
                  <tr className="bg-slate-200/60 font-bold">
                    <td colSpan={7} className="px-4 py-2 text-slate-800 uppercase tracking-tight text-[11px]">
                      {group.title}
                    </td>
                  </tr>
                  
                  {group.items.map((item, idx) => {
                    const pricePanitia = getPaguAssumedPrice(item.unitPrice);
                    const priceSSH = getSSHPrice(item.unitPrice);
                    const priceVendor = customVendorPrices[item.id] !== undefined 
                                        ? customVendorPrices[item.id] 
                                        : priceSSH;

                    const margin = priceSSH - priceVendor;
                    const marginPercent = priceSSH > 0 ? (margin / priceSSH) * 100 : 0;
                    
                    const isProfit = margin > 0;
                    const isLoss = margin < 0;

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition group">
                        <td className="px-4 py-2.5 text-center text-slate-500 font-mono text-[11px] border-r border-slate-150">
                          {item.no || idx + 1}
                        </td>
                        <td className="px-4 py-2.5 text-slate-800 font-medium whitespace-normal line-clamp-2 min-w-[200px] border-r border-slate-150">
                          {item.description}
                        </td>
                        <td className="px-4 py-2.5 text-center text-slate-600 font-mono text-[11px] border-r border-slate-150">
                          {item.volume.toLocaleString('id-ID')} {item.unit}
                        </td>
                        
                        <td className="px-4 py-2.5 text-right font-mono text-[11px] text-slate-500 border-r border-slate-150 bg-blue-50/20 group-hover:bg-blue-50/40">
                          {formatIDR(pricePanitia)}
                        </td>
                        
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-[11px] text-emerald-700 border-r border-slate-150 bg-emerald-50/20 group-hover:bg-emerald-50/40">
                          {formatIDR(priceSSH)}
                        </td>
                        
                        <td className="px-4 py-2 text-right border-r border-slate-150 bg-amber-50/20 group-hover:bg-amber-50/40">
                          <div className="flex items-center bg-white border border-slate-300 rounded overflow-hidden shadow-2xs focus-within:ring-1 focus-within:ring-amber-500 focus-within:border-amber-500">
                            <span className="px-2 py-1.5 bg-slate-100 text-slate-500 font-mono text-[10px] border-r border-slate-300">Rp</span>
                            <input
                              type="text"
                              value={priceVendor.toLocaleString('id-ID')}
                              onChange={(e) => handlePriceChange(item.id, e.target.value)}
                              className="w-full px-2 py-1.5 text-right font-mono font-bold text-[11px] text-slate-800 focus:outline-hidden"
                            />
                          </div>
                        </td>
                        
                        <td className="px-4 py-2.5 text-center font-mono font-black text-[11px] bg-slate-50">
                          {margin === 0 ? (
                            <span className="text-slate-400">0%</span>
                          ) : (
                            <div className={`flex items-center justify-center gap-1 ${isProfit ? 'text-emerald-600' : 'text-red-600'}`}>
                              {isProfit ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              <span>{isProfit ? '+' : ''}{marginPercent.toFixed(1)}%</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-100/80 border border-slate-200 rounded-lg p-4 flex gap-3 text-xs text-slate-600 font-medium">
        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
        <p>
          <strong className="text-slate-800">Catatan Analisis:</strong> Kolom Margin menunjukkan selisih persentase antara Harga SSH yang dikalibrasi AI dengan Harga Riil Toko/Vendor Anda. Margin hijau positif menandakan Anda mendapatkan material lebih murah dari standar negara (potensi laba ekstra), sedangkan margin merah menandakan *overbudget* atau kerugian.
        </p>
      </div>
    </div>
  );
}
