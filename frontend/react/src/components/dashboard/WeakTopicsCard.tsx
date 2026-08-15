import React from 'react';
import type { WeakTopic } from '../../types/dashboard';
import { ArrowRight } from 'lucide-react';

interface WeakTopicsCardProps {
  topics: WeakTopic[];
}

export const WeakTopicsCard: React.FC<WeakTopicsCardProps> = ({ topics }) => {
  return (
    <div className="space-y-3">
      {topics.map((topic) => (
        <div
          key={topic.rank}
          className="p-4 rounded-2xl bg-[#121317] border border-white/[0.08] hover:border-[#8b7cf0] flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(139,124,240,0.25)] prepverse-card-hover group cursor-pointer"
        >
          {/* Rank Number */}
          <span className="font-mono text-sm text-gray-400 font-semibold w-6">
            #{topic.rank}
          </span>

          {/* Topic Info */}
          <div className="flex-1 px-3">
            <h4 className="text-sm font-semibold text-white group-hover:text-[#8b7cf0] transition-colors">
              {topic.subTopic}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              {topic.title} · {topic.attempted} questions attempted
            </p>
          </div>

          {/* Accuracy Score */}
          <span className="font-mono font-bold text-sm text-rose-400 mr-4">
            {topic.accuracy}
          </span>

          {/* Practice CTA Button matching Django .weak-cta */}
          <button
            onClick={() => {
              window.location.href = `/courses/${topic.courseId || 1}/`;
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#17181f] border border-white/10 text-white font-semibold text-xs hover:bg-[#6c5ce7] hover:border-[#6c5ce7] hover:shadow-[0_0_16px_rgba(108,92,231,0.5)] transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Practice now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};
