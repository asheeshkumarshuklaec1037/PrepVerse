import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, Award, Zap, ArrowUpRight } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const performanceData = [
  { attempt: 'Mock 1', score: 62, accuracy: 68 },
  { attempt: 'Mock 2', score: 68, accuracy: 72 },
  { attempt: 'Mock 3', score: 74, accuracy: 78 },
  { attempt: 'Mock 4', score: 71, accuracy: 75 },
  { attempt: 'Mock 5', score: 82, accuracy: 84 },
  { attempt: 'Mock 6', score: 88, accuracy: 85 },
];

export const PerformanceAnalytics: React.FC = () => {
  return (
    <Card variant="glass" className="h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Mock Performance Trend</h3>
              <p className="text-xs text-gray-400">Score & accuracy trajectory across recent tests</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-purple-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>Score %</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>Accuracy %</span>
            </div>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[11px] text-gray-400 uppercase font-semibold">Latest Accuracy</span>
            <div className="text-xl font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
              85% <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[11px] text-gray-400 uppercase font-semibold">Avg Score</span>
            <div className="text-xl font-bold text-purple-300 mt-0.5">75.8%</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[11px] text-gray-400 uppercase font-semibold">Highest Score</span>
            <div className="text-xl font-bold text-amber-300 mt-0.5 flex items-center gap-1">
              88% <Award className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="accuracyGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="attempt" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} domain={[50, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f111a',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#6c5ce7"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#scoreGlow)"
              />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke="#38bdf8"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#accuracyGlow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
        <span>Based on 6 recent placement test simulations</span>
        <button
          onClick={() => {
            window.location.href = '/mock-history/';
          }}
          className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
        >
          View Full Analytics <Zap className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
