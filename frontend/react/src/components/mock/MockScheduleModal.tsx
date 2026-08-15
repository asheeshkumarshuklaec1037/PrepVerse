import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitModal } from '../ui/SplitModal';
import type { CatalogTestItem } from '../../pages/MockTests/AllTestsPage';
import { CalendarCheck, Target, Clock, AlertCircle, Calendar as CalendarIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface MockScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  test: CatalogTestItem | null;
  onConfirmSchedule: (date: string, time: string) => void;
}

export const MockScheduleModal: React.FC<MockScheduleModalProps> = ({
  isOpen,
  onClose,
  test,
  onConfirmSchedule,
}) => {
  const [activeTest, setActiveTest] = useState<CatalogTestItem | null>(test);

  useEffect(() => {
    if (test) setActiveTest(test);
  }, [test]);

  const currentTest = activeTest;
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 18)); // Aug 18 2026
  const [selectedDateStr, setSelectedDateStr] = useState('Aug 18, 2026');
  
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedAmpm, setSelectedAmpm] = useState('AM');
  const [selectedTimeStr, setSelectedTimeStr] = useState('09:00 AM');

  const [activePicker, setActivePicker] = useState<'date' | 'time' | null>(null);

  useEffect(() => {
    const handleOutsideClick = () => setActivePicker(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Month navigation logic
  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Calendar Grid Calculator
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  let firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Mon=0 to Sun=6
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleSelectDate = (dayNum: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const shortMonth = monthNames[currentMonth].substring(0, 3);
    const dateFormatted = `${shortMonth} ${dayNum}, ${currentYear}`;
    setSelectedDateStr(dateFormatted);
    setActivePicker(null);
  };

  const handleConfirmTime = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTimeStr(`${selectedHour}:${selectedMinute} ${selectedAmpm}`);
    setActivePicker(null);
  };

  const leftSection = (
    <div className="space-y-6 pr-2">
      <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-display tracking-tight">
        Schedule <span className="bg-gradient-to-r from-[#2af598] to-[#60a5fa] bg-clip-text text-transparent">Prep Session</span>
        <br />
        <span className="text-[#60a5fa]">& Reminders</span>
      </h3>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <CalendarCheck className="w-5 h-5 text-[#2af598] mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">Timely Reminders</h4>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Receive email & in-app reminder notifications before your session starts.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Target className="w-5 h-5 text-[#2af598] mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">Goal Tracking</h4>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Maintain consistent practice routines to build accuracy, speed, and confidence.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="w-5 h-5 text-[#2af598] mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">Flexible Reservation</h4>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              You can adjust or re-schedule your booked slot anytime from your dashboard.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-[#fbcd0b]/[0.08] border border-[#fbcd0b]/20 text-[#fbcd0b] text-xs space-y-1.5 mt-4">
        <div className="flex items-center gap-2 font-bold">
          <AlertCircle className="w-4 h-4 text-[#fbcd0b]" />
          <span>Scheduled Session Standing</span>
        </div>
        <p className="text-[11px] leading-relaxed text-[#fbcd0b]/90 font-normal">
          Scheduling reserves your slot and sends reminders. When the scheduled time arrives, launch the session directly from your notification panel.
        </p>
      </div>
    </div>
  );

  const rightSection = (
    <div className="relative bg-[#0f172a]/65 backdrop-blur-2xl saturate-200 border border-white/20 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(42,245,152,0.2)] space-y-6">
      {/* Close trigger */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="space-y-2">
        <CalendarIcon className="w-8 h-8 text-[#fbbf24]" />
        <h3 className="text-2xl font-extrabold text-white tracking-tight">Schedule Prep Session</h3>
        <p className="text-xs text-gray-400 font-medium">Select a date and time to reserve your slot.</p>
      </div>

      {/* Meta Details List */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5 text-xs">
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-gray-400 font-medium">Resource / Test Name</span>
          <strong className="font-extrabold text-white">{currentTest?.name}</strong>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-gray-400 font-medium">Category</span>
          <strong className="font-extrabold text-white">{currentTest?.mode}</strong>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-medium">Subject</span>
          <strong className="font-extrabold text-white">{currentTest?.subject}</strong>
        </div>
      </div>

      {/* Custom Date Picker Field with Framer Motion Glassmorphism Popover */}
      <div className="space-y-2 relative" onClick={(e) => e.stopPropagation()}>
        <span className="text-[0.75rem] font-bold uppercase tracking-wider text-white/60 block">Select Date</span>
        <div
          onClick={() => setActivePicker(activePicker === 'date' ? null : 'date')}
          className="p-4 rounded-2xl bg-white/[0.04] border border-white/12 flex items-center gap-3 cursor-pointer hover:border-[#2af598] hover:bg-white/[0.08] transition-all"
        >
          <CalendarIcon className="w-4 h-4 text-[#2af598]" />
          <input
            type="text"
            readOnly
            value={selectedDateStr}
            className="bg-transparent border-none outline-none font-bold text-white text-sm w-full cursor-pointer"
          />
        </div>

        {/* Animated Dark Glassmorphism Date Dropdown Calendar Widget */}
        <AnimatePresence>
          {activePicker === 'date' && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-full mb-3 left-0 right-0 p-5 rounded-3xl bg-[#0a0d18] backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(108,92,231,0.25)] z-50 space-y-4"
            >
              <div className="flex items-center justify-between font-bold text-white text-sm border-b border-white/10 pb-3">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>{monthNames[currentMonth]} {currentYear}</span>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-mono">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((dayLbl) => (
                  <span key={dayLbl} className="text-white/40 font-bold text-[11px] py-1">
                    {dayLbl}
                  </span>
                ))}

                {/* Leading Offset Blanks */}
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <span key={`blank-${i}`} className="p-2" />
                ))}

                {/* Month Days */}
                {Array.from({ length: totalDaysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const isSelected = selectedDateStr.includes(`${dayNum}, ${currentYear}`);

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={(e) => handleSelectDate(dayNum, e)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-500/40 font-extrabold scale-105'
                          : 'text-white/80 hover:bg-white/15 hover:text-white hover:scale-105'
                      }`}
                    >
                      {String(dayNum).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Time Picker Field with Animated Glassmorphism Popover */}
      <div className="space-y-2 relative" onClick={(e) => e.stopPropagation()}>
        <span className="text-[0.75rem] font-bold uppercase tracking-wider text-white/60 block">Select Time</span>
        <div
          onClick={() => setActivePicker(activePicker === 'time' ? null : 'time')}
          className="p-4 rounded-2xl bg-white/[0.04] border border-white/12 flex items-center gap-3 cursor-pointer hover:border-[#2af598] hover:bg-white/[0.08] transition-all"
        >
          <Clock className="w-4 h-4 text-[#2af598]" />
          <input
            type="text"
            readOnly
            value={selectedTimeStr}
            className="bg-transparent border-none outline-none font-bold text-white text-sm w-full cursor-pointer"
          />
        </div>

        {/* Animated Dark Glassmorphism Time Scroll Dropdown Widget */}
        <AnimatePresence>
          {activePicker === 'time' && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-full mb-3 left-0 right-0 p-5 rounded-3xl bg-[#0a0d18] backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(42,245,152,0.25)] z-50 space-y-4"
            >
              {/* Header Display Row */}
              <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-lg font-mono font-bold text-[#38bdf8]">
                <div className="px-4 py-1 rounded-xl bg-[#0a0a0f]/60 border border-white/10">{selectedHour}</div>
                <span>:</span>
                <div className="px-4 py-1 rounded-lg bg-[#0a0a0f]/60 border border-white/10">{selectedMinute}</div>
                <div className="px-4 py-1 rounded-lg bg-[#0a0a0f]/60 border border-white/10 text-emerald-400">{selectedAmpm}</div>
              </div>

              {/* Scroll Columns Container */}
              <div className="grid grid-cols-3 gap-2 h-44 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md p-2 overflow-hidden font-mono text-xs text-center">
                {/* Hours Column */}
                <div className="overflow-y-auto space-y-1 pr-1">
                  {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((h) => (
                    <div
                      key={h}
                      onClick={() => setSelectedHour(h)}
                      className={`py-2 rounded-xl cursor-pointer transition-all ${
                        selectedHour === h ? 'bg-[#3b82f6] text-white font-bold shadow-md scale-105' : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {h}
                    </div>
                  ))}
                </div>

                {/* Minutes Column */}
                <div className="overflow-y-auto space-y-1 pr-1 border-x border-white/10">
                  {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map((m) => (
                    <div
                      key={m}
                      onClick={() => setSelectedMinute(m)}
                      className={`py-2 rounded-xl cursor-pointer transition-all ${
                        selectedMinute === m ? 'bg-[#3b82f6] text-white font-bold shadow-md scale-105' : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {m}
                    </div>
                  ))}
                </div>

                {/* AM/PM Column */}
                <div className="space-y-1 pt-2">
                  {['AM', 'PM'].map((ap) => (
                    <div
                      key={ap}
                      onClick={() => setSelectedAmpm(ap)}
                      className={`py-3 rounded-xl cursor-pointer transition-all font-bold ${
                        selectedAmpm === ap ? 'bg-[#2af598] text-black font-extrabold shadow-md scale-105' : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {ap}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmTime}
                className="w-full py-3 rounded-2xl bg-[#2af598] hover:bg-[#22d380] text-black font-extrabold text-xs transition-all cursor-pointer shadow-[0_4px_15px_rgba(42,245,152,0.3)] hover:scale-[1.02]"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Row matching Django Universal Modal Buttons */}
      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={onClose}
          className="modal-btn modal-btn-cancel flex-1 py-3.5 px-5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 text-white font-bold text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onClose();
            onConfirmSchedule(selectedDateStr, selectedTimeStr);
          }}
          className="modal-btn modal-btn-confirm flex-1 py-3.5 px-5 rounded-2xl bg-[#2af598] hover:bg-white text-black font-extrabold text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_8px_25px_rgba(42,245,152,0.4)] cursor-pointer"
        >
          Confirm Schedule
        </button>
      </div>
    </div>
  );

  return (
    <SplitModal
      isOpen={isOpen}
      onClose={onClose}
      leftSection={leftSection}
      rightSection={rightSection}
    />
  );
};
