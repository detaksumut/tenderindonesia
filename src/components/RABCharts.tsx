import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell, 
  PieChart as RechartsPieChart, 
  Pie 
} from 'recharts';
import { Activity } from 'lucide-react';
import { EstimationResult, RABGroup, RABItem } from '../types';

interface RABChartsProps {
  result: EstimationResult;
  multiplier: number;
  formatIDR: (v: number) => string;
}

export default function RABCharts({ result, multiplier, formatIDR }: RABChartsProps) {
  // Pre-calculate data for Recharts Bar Chart
  const chartData = result.groups.map((group, idx) => {
    const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"][idx] || `${idx + 1}`;
    let originalTotal = 0;
    let adjustedTotal = 0;
    let governmentTotal = 0;

    group.items.forEach(item => {
      const adjustedUnit = Math.round(item.unitPrice * multiplier);
      originalTotal += item.unitPrice * item.volume;
      adjustedTotal += adjustedUnit * item.volume;
      governmentTotal += item.estimatedUnitPrice * item.volume;
    });

    return {
      name: group.title.length > 25 ? `${group.title.substring(0, 25)}...` : group.title,
      fullName: group.title,
      roman,
      "Penawaran Awal": originalTotal,
      "Penawaran Terkoreksi": adjustedTotal,
      "Batas SSH Pemerintah": governmentTotal,
    };
  });

  // Pre-calculate data for Recharts Pie Chart
  const pieData = result.groups.map((group, idx) => {
    let adjustedTotal = 0;
    group.items.forEach(item => {
      const adjustedUnit = Math.round(item.unitPrice * multiplier);
      adjustedTotal += adjustedUnit * item.volume;
    });

    return {
      name: group.title.length > 20 ? `${group.title.substring(0, 20)}...` : group.title,
      fullName: group.title,
      value: adjustedTotal,
    };
  }).filter(d => d.value > 0);

  // High contrast professional color scheme for pie chart slices
  const COLORS = ['#dc2626', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6', '#64748b'];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-6" id="rab-charts-component">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <Activity className="h-5 w-5 text-red-600 animate-pulse" />
            Visualisasi Distribusi Anggaran &amp; Perbandingan Biaya per Kategori
          </h3>
          <p className="text-xs text-slate-500 mt-1">Grafik analisis ini memetakan anggaran penawaran aktif Anda terhadap standar SSH daerah untuk mendeteksi deviasi alokasi.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-100 font-extrabold px-2.5 py-1 rounded-sm text-slate-700">Total volume grup: {result.groups.length} kategori</span>
        </div>
      </div>

      {/* Grid for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Bar comparison */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col">
          <span className="text-xs font-bold text-slate-700 block mb-3 uppercase tracking-wide">Diagram Batang: Penawaran vs Ceiling SSH (Rp)</span>
          <div className="h-[320px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="roman" stroke="#94a3b8" fontSize={11} fontWeight={600} />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  tickFormatter={(v) => `Rp ${(v / 1e6).toFixed(0)}Jt`} 
                />
                <Tooltip 
                  formatter={(value: any, name: any) => [formatIDR(Number(value)), name]}
                  labelFormatter={(index) => {
                    const item = chartData[Number(index)];
                    return item ? `${item.roman}. ${item.fullName}` : "";
                  }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="Penawaran Terkoreksi" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Batas SSH Pemerintah" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[10px] text-slate-500 mt-2 italic text-center">Axis X menampilkan Nomor Romawi Kategori Pekerjaan. Arahkan kursor untuk melihat nama lengkap.</span>
        </div>

        {/* Right Chart: Pie proportion */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-700 block mb-3 uppercase tracking-wide self-start">Proporsi Anggaran Kontraktor</span>
          <div className="h-[250px] w-full text-xs flex items-center justify-center">
            {pieData.length === 0 ? (
              <p className="text-slate-400 italic">Tidak ada kategori biaya penyusun dengan nilai di atas Rp 0.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [formatIDR(Number(value)), 'Jumlah Nilai']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            )}
          </div>
          
          {/* Compact Custom Legend list with bullet colors */}
          <div className="w-full mt-2 grid grid-cols-2 gap-x-3 gap-y-1 bg-white p-2.5 rounded-lg border border-slate-200 max-h-[110px] overflow-y-auto">
            {pieData.map((d, index) => {
              const totalActiveBaseCost = pieData.reduce((s, x) => s + x.value, 0);
              const pct = totalActiveBaseCost > 0 ? ((d.value / totalActiveBaseCost) * 100).toFixed(1) : "0";
              return (
                <div key={index} className="flex items-center text-[10px] text-slate-600 font-medium truncate">
                  <span className="h-2 w-2 rounded-full shrink-0 mr-1.5" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="truncate flex-1" title={d.fullName}>{d.fullName}</span>
                  <span className="font-bold text-slate-900 ml-1 shrink-0">({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabular summary list */}
      <div className="border border-slate-300 rounded-xl overflow-hidden mt-2 bg-white shadow-3xs" id="charts-summary-table-container">
        <table className="w-full text-left text-xs" id="charts-summary-table">
          <thead>
            <tr className="bg-slate-100 text-slate-800 font-bold uppercase text-[9px] border-b border-slate-300">
              <th className="px-4 py-2.5 text-center w-14 border-r border-slate-200">Kode</th>
              <th className="px-4 py-2.5 border-r border-slate-200">Nama Kategori Kerja</th>
              <th className="px-4 py-2.5 text-right border-r border-slate-200">Penawaran Awal (Rp)</th>
              <th className="px-4 py-2.5 text-right border-r border-slate-200">Penawaran Terkoreksi (Rp)</th>
              <th className="px-4 py-2.5 text-right border-r border-slate-200">Ceiling SSH Pemerintah (Rp)</th>
              <th className="px-4 py-2.5 text-center w-24">Persentase Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-[11px] text-slate-700">
            {chartData.map((row, idx) => {
              const totalActiveBaseCost = chartData.reduce((s, x) => s + x["Penawaran Terkoreksi"], 0);
              const rowAdjusted = row["Penawaran Terkoreksi"];
              const pctShare = totalActiveBaseCost > 0 ? ((rowAdjusted / totalActiveBaseCost) * 100).toFixed(1) : "0";
              
              return (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-2 text-center font-bold text-slate-500 border-r border-slate-200 bg-slate-50/50">{row.roman}</td>
                  <td className="px-4 py-2 font-semibold text-slate-900 max-w-[280px] truncate border-r border-slate-200" title={row.fullName}>{row.fullName}</td>
                  <td className="px-4 py-2 text-right font-medium text-slate-500 border-r border-slate-200">{formatIDR(row["Penawaran Awal"])}</td>
                  <td className="px-4 py-2 text-right font-bold text-emerald-700 bg-emerald-50/10 border-r border-slate-200">{formatIDR(rowAdjusted)}</td>
                  <td className="px-4 py-2 text-right font-medium text-slate-500 border-r border-slate-200">{formatIDR(row["Batas SSH Pemerintah"])}</td>
                  <td className="px-4 py-2 text-center bg-slate-50/20 font-mono">
                    <span className="inline-block bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                      {pctShare}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
