/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, TrendingDown, Landmark, AlertTriangle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  type: 'original' | 'estimated' | 'saving' | 'trust';
  score?: number;
}

export default function MetricCard({ title, value, subtext, type, score }: MetricCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'original':
        return <Landmark className="h-6 w-6 text-slate-500" id="icon-original" />;
      case 'estimated':
        return <ShieldCheck className="h-6 w-6 text-emerald-600" id="icon-estimated" />;
      case 'saving':
        return <TrendingDown className="h-6 w-6 text-blue-600" id="icon-saving" />;
      case 'trust':
        return <AlertTriangle className="h-6 w-6 text-amber-500" id="icon-trust" />;
    }
  };

  const getBgClass = () => {
    switch (type) {
      case 'original':
        return 'border-l-4 border-slate-500 bg-white';
      case 'estimated':
        return 'border-l-4 border-emerald-500 bg-white';
      case 'saving':
        return 'border-l-4 border-blue-500 bg-white';
      case 'trust':
        return 'border-l-4 border-amber-500 bg-white';
    }
  };

  return (
    <div className={`rounded-xl p-6 shadow-xs border border-slate-200 ${getBgClass()}`} id={`metric-card-${type}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900 tracking-tight" id={`metric-value-${type}`}>
            {value}
          </h3>
        </div>
        <div className="rounded-lg p-2 bg-slate-50 border border-slate-100 flex items-center justify-center">
          {getIcon()}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">{subtext}</span>
        {type === 'trust' && typeof score === 'number' && (
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-1.5 rounded-full ${score > 80 ? 'bg-emerald-500' : score > 60 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <span className="text-xs font-bold text-slate-700">{score}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
