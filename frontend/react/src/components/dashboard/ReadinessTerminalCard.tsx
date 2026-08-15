import React from 'react';
import { Card } from '../ui/Card';
import { ArrowUpRight } from 'lucide-react';

export const ReadinessTerminalCard: React.FC = () => {
  const subjects = [
    { name: 'DSA', pct: 82, status: 'PASS', color: 'text-emerald-400', bg: 'bg-emerald-400' },
    { name: 'Aptitude', pct: 90, status: 'PASS', color: 'text-emerald-400', bg: 'bg-emerald-400' },
    { name: 'DBMS', pct: 88, status: 'PASS', color: 'text-emerald-400', bg: 'bg-emerald-400' },
    { name: 'OS', pct: 71, status: 'WARN', color: 'text-amber-400', bg: 'bg-amber-400' },
    { name: 'Verbal', pct: 65, status: 'WARN', color: 'text-amber-400', bg: 'bg-amber-400' },
    { name: 'Networks', pct: 54, status: 'FAIL', color: 'text-rose-400', bg: 'bg-rose-400' },
  ];

  return (
    <Card variant="glass" className="h-full flex flex-col justify-between p-0 font-mono text-xs overflow-hidden">
      {/* Terminal Window Header */}
      <div className="px-4 py-3 bg-[#12131b] border-b border-white/[0.08] flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
        <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
        <span className="text-gray-400 font-bold text-[11px] ml-2">readiness.sh</span>
      </div>

      {/* Terminal Content */}
      <div className="p-5 space-y-4">
        {/* Prompt */}
        <div className="text-gray-400 font-bold flex items-center gap-2">
          <span className="text-purple-400">$</span> readiness --check --all-subjects
        </div>

        {/* Readiness Score Num */}
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-white font-display">74%</span>
            <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              6% this week
            </span>
          </div>
          <span className="text-[11px] text-gray-500 font-medium">overall placement readiness</span>
        </div>

        {/* Subject Progress Bars */}
        <div className="space-y-2 pt-1">
          {subjects.map((s, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-16 text-gray-300 font-semibold">{s.name}</span>
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full ${s.bg}`}
                  style={{ width: `${s.pct}%` }}
                />
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                s.status === 'PASS'
                  ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                  : s.status === 'WARN'
                  ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                  : 'border-rose-500/30 text-rose-400 bg-rose-500/10'
              }`}>
                {s.status}
              </span>
            </div>
          ))}
        </div>

        {/* Terminal Recommendation Footer */}
        <div className="pt-2 text-[11px] text-gray-400 border-t border-white/[0.06] flex items-center gap-2">
          <span className="text-purple-400 font-bold">→</span>
          <span>Fix Computer Networks before your next full mock</span>
        </div>
      </div>
    </Card>
  );
};
