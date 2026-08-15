import React from 'react';
import type { TopicMasteryItem } from '../../types/dashboard';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { BarChart3, ChevronRight } from 'lucide-react';

interface TopicMasteryProps {
  items: TopicMasteryItem[];
}

export const TopicMastery: React.FC<TopicMasteryProps> = ({ items }) => {
  return (
    <Card variant="glass" className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Topic Mastery Breakdown</h3>
              <p className="text-xs text-gray-400">Skill proficiency levels by domain</p>
            </div>
          </div>

          <span className="text-xs text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 font-semibold">
            Overall: 67%
          </span>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-200">{item.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-[11px]">{item.count} questions</span>
                  <span className="font-bold text-white">{item.progress}%</span>
                </div>
              </div>
              <ProgressBar
                progress={item.progress}
                color={
                  item.progress > 75
                    ? 'from-emerald-500 to-teal-400'
                    : item.progress > 50
                    ? 'from-purple-500 to-indigo-400'
                    : 'from-amber-500 to-rose-400'
                }
                height="h-2"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] text-xs text-gray-400 flex justify-between items-center">
        <span>Evaluated from verified mock tests</span>
        <button
          onClick={() => {
            window.location.href = '/courses/';
          }}
          className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
        >
          Explore All Courses <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
