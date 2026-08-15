import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { CalendarCheck, XCircle, Flame, BookOpen } from 'lucide-react';
import type { ConsistencyDayData } from '../../types/dashboard';

interface ConsistencyCalendarProps {
  initialStreak?: number;
  data?: ConsistencyDayData[];
}

export const ConsistencyCalendar: React.FC<ConsistencyCalendarProps> = () => {
  const [selectedMonth, setSelectedMonth] = useState(7); // August (0-indexed 7)
  const [selectedYear, setSelectedYear] = useState(2026);
  const [activeHoverCell, setActiveHoverCell] = useState<{
    dayNumber: number;
    questionsSolved: number;
    accuracyVal: number;
    topic: string;
    level: number;
  } | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const topicPool = [
    'Time, Speed & Distance',
    'DBMS Normalization',
    'Data Interpretation',
    'Syllogism & Seating',
    'Reading Comprehension',
    'Binary Trees & Graphs',
    'Probability & Permutation',
    'TCS Mock Test 04',
    'Operating System Paging',
  ];

  // Generate deterministic calendar cells for selected month/year (matching Django JS lines 2165-2240)
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOffset = (new Date(selectedYear, selectedMonth, 1).getDay() + 6) % 7; // Mon=0

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNumber = i + 1;
    const val = (dayNumber * 7 + selectedMonth * 13 + selectedYear) % 10;
    let level = 0;
    if (val < 2) level = 0;
    else if (val < 5) level = 1;
    else if (val < 8) level = 2;
    else level = 3;

    return {
      dayNumber,
      level,
      questionsSolved: level === 0 ? 0 : level * 5 + (dayNumber % 4) + 2,
      accuracyVal: level === 0 ? 0 : 70 + (dayNumber % 25),
      topic: topicPool[(dayNumber + selectedMonth * 3) % topicPool.length],
    };
  });

  const activeDaysCount = days.filter((d) => d.level > 0).length;

  const getCellBg = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-white/[0.04] border-white/[0.04] text-gray-500';
      case 1:
        return 'bg-[#6c5ce7]/30 border-[#6c5ce7]/40 text-white';
      case 2:
        return 'bg-[#6c5ce7]/65 border-[#8b7cf0]/60 text-white';
      case 3:
        return 'bg-[#6c5ce7] border-[#8b7cf0] text-white shadow-lg shadow-[#6c5ce7]/40 font-bold';
      default:
        return 'bg-white/[0.04]';
    }
  };

  return (
    <Card variant="glass" className="h-full flex flex-col justify-between p-5 relative overflow-visible">
      <div>
        {/* Header matching Django Template */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4 text-[#8b7cf0]" />
              <span>Consistency</span>
            </h3>
            <p className="text-[11px] font-mono text-gray-400 mt-0.5">
              {activeDaysCount} active days in {months[selectedMonth]} {selectedYear}
            </p>
          </div>

          {/* Month & Year Selectors */}
          <div className="flex items-center gap-1.5">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
              className="bg-[#17181f] border border-white/10 text-white text-[11px] px-2 py-1 rounded-md font-semibold cursor-pointer outline-none"
            >
              {months.map((m, idx) => (
                <option key={idx} value={idx}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
              className="bg-[#17181f] border border-white/10 text-white text-[11px] px-2 py-1 rounded-md font-semibold cursor-pointer outline-none"
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </div>
        </div>

        {/* Days Header Mon-Sun */}
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-gray-500 font-bold mb-1.5">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
          <span>S</span>
        </div>

        {/* Dynamic Days Heatmap Grid with Exact Floating Popover Tooltip */}
        <div className="grid grid-cols-7 gap-1 mb-3 relative">
          {/* Empty Offset Cells */}
          {Array.from({ length: firstDayOffset }).map((_, idx) => (
            <div key={`empty-${idx}`} className="aspect-square" />
          ))}

          {/* Actual Month Days */}
          {days.map((item) => (
            <div
              key={item.dayNumber}
              onMouseEnter={() => setActiveHoverCell(item)}
              onMouseLeave={() => setActiveHoverCell(null)}
              className={`relative aspect-square rounded-md border flex items-center justify-center font-mono text-[11px] transition-all duration-200 hover:scale-125 hover:z-50 cursor-pointer ${getCellBg(
                item.level
              )}`}
            >
              {item.dayNumber}

              {/* Exact Floating Glass Popover Tooltip matching Django JS lines 2260-2315 */}
              {activeHoverCell?.dayNumber === item.dayNumber && (
                <div className="absolute bottom-[125%] left-1/2 -translate-x-1/2 p-3 rounded-xl bg-[#12131b]/95 backdrop-blur-xl border border-[#8b7cf0]/40 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(108,92,231,0.25)] whitespace-nowrap z-[9999] text-left pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                  {item.level === 0 ? (
                    <div>
                      <div className="text-xs font-bold text-white mb-1">
                        {months[selectedMonth]} {item.dayNumber}, {selectedYear}
                      </div>
                      <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span>No practice activity</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-4 text-xs font-bold text-white mb-1">
                        <span>
                          {months[selectedMonth]} {item.dayNumber}, {selectedYear}
                        </span>
                        <span className="text-[#2af598] font-mono font-bold">
                          {item.accuracyVal}% Acc
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-300 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>
                          <strong>{item.questionsSolved} Questions Solved</strong>
                        </span>
                      </div>
                      <div className="text-[10px] text-[#8b7cf0] bg-[#6c5ce7]/15 px-2 py-0.5 rounded-md border border-[#6c5ce7]/30 inline-flex items-center gap-1 mt-1">
                        <BookOpen className="w-3 h-3 text-[#8b7cf0]" />
                        <span>{item.topic}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Heat Legend matching Django Template */}
      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-end gap-1.5 text-[11px] text-gray-400 font-semibold">
        <span>Less</span>
        <span className="w-2.5 h-2.5 rounded bg-white/[0.06] inline-block" />
        <span className="w-2.5 h-2.5 rounded bg-[#6c5ce7]/35 inline-block" />
        <span className="w-2.5 h-2.5 rounded bg-[#6c5ce7]/65 inline-block" />
        <span className="w-2.5 h-2.5 rounded bg-[#6c5ce7] inline-block" />
        <span>More</span>
      </div>
    </Card>
  );
};
