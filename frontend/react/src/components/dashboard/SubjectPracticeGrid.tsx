import React from 'react';
import type { SubjectPracticeCardData } from '../../types/dashboard';
import { ArrowRight } from 'lucide-react';

interface SubjectPracticeGridProps {
  subjects?: SubjectPracticeCardData[];
}

export const SubjectPracticeGrid: React.FC<SubjectPracticeGridProps> = () => {
  const subjectsData = [
    { title: 'DSA', pct: '82%', accent: '#2af598', url: '/courses/' },
    { title: 'DBMS', pct: '88%', accent: '#2af598', url: '/courses/' },
    { title: 'OS', pct: '71%', accent: '#fdcb6e', url: '/courses/' },
    { title: 'Networks', pct: '54%', accent: '#ff7675', url: '/courses/' },
    { title: 'Aptitude', pct: '90%', accent: '#2af598', url: '/courses/' },
    { title: 'Verbal', pct: '65%', accent: '#fdcb6e', url: '/courses/' },
  ];

  return (
    <div className="space-y-4">
      {/* Section Head matching Django Template */}
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Practice by subject</h3>
          <p className="text-xs text-gray-400 mt-0.5">Jump straight into any subject's topic list</p>
        </div>
      </div>

      {/* Dynamic Practice Tile Grid matching Django Template .subj-tile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {subjectsData.map((s, idx) => (
          <div
            key={idx}
            onClick={() => {
              window.location.href = s.url;
            }}
            className="group relative p-5 rounded-2xl bg-[#121317] border border-white/10 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-black/50 prepverse-card-hover"
          >
            {/* Colored Accent Line at Top */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: s.accent }}
            />

            {/* Percentage Value */}
            <div
              className="text-2xl font-black font-display mb-1 leading-none"
              style={{ color: s.accent }}
            >
              {s.pct}
            </div>

            {/* Title */}
            <h4 className="text-base font-bold text-white mb-3">
              {s.title}
            </h4>

            {/* Practice Link */}
            <div className="text-xs font-medium text-gray-400 group-hover:text-white flex items-center gap-1 transition-colors">
              <span>Practice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
