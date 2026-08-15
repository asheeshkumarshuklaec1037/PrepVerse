import React, { useState, useEffect } from 'react';
import { SplitModal } from '../ui/SplitModal';
import type { CatalogTestItem } from '../../pages/MockTests/AllTestsPage';
import { History, ShieldCheck, LineChart, AlertTriangle, FileText, X, Slash } from 'lucide-react';

interface MockConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  test: CatalogTestItem | null;
  onStartSession: (test: CatalogTestItem) => void;
}

export const MockConfirmModal: React.FC<MockConfirmModalProps> = ({
  isOpen,
  onClose,
  test,
  onStartSession,
}) => {
  const [activeTest, setActiveTest] = useState<CatalogTestItem | null>(test);

  useEffect(() => {
    if (test) setActiveTest(test);
  }, [test]);

  const currentTest = activeTest;

  const leftSection = (
    <div className="space-y-6 pr-2">
      <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-display tracking-tight">
        Test <span className="bg-gradient-to-r from-[#2af598] to-[#60a5fa] bg-clip-text text-transparent">Arena Rules & Guidelines</span>
      </h3>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <History className="w-5 h-5 text-[#2af598] mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">Strict Simulated Timer</h4>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              The timer runs continuously once you begin. The test will auto-submit when the duration ends.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <ShieldCheck className="w-5 h-5 text-[#2af598] mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">Anti-Cheat Monitoring</h4>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Tab switching or leaving the screen will warn you. Exceeding warnings will force auto-submit.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <LineChart className="w-5 h-5 text-[#2af598] mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">Instant Score Analytics</h4>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              You will get a comprehensive performance report card and analytics breakdown immediately upon completion.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Slash className="w-5 h-5 text-[#2af598] mt-1 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">Input Restrictions</h4>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              Do not refresh the page or use browser back/forward buttons during the active session.
            </p>
          </div>
        </div>
      </div>

      {currentTest?.isAttempted && (
        <div className="p-4 rounded-2xl bg-[#fbcd0b]/[0.08] border border-[#fbcd0b]/20 text-[#fbcd0b] text-xs space-y-1.5 mt-4">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle className="w-4 h-4 text-[#fbcd0b]" />
            <span>Practice Run Standing</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#fbcd0b]/90 font-normal">
            This is a practice retake session. Please note that only your 1st attempt score counts towards the global leaderboard rank. Retaking tests will not affect your ranking profile.
          </p>
        </div>
      )}
    </div>
  );

  const rightSection = (
    <div className="relative bg-[#0f172a]/65 backdrop-blur-2xl saturate-200 border border-white/20 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(139,124,240,0.25)] space-y-6">
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
        <FileText className="w-8 h-8 text-[#fbbf24]" />
        <h3 className="text-2xl font-extrabold text-white tracking-tight">Mock Test Ready</h3>
        <p className="text-xs text-gray-400 font-medium">Double check test parameters before launching session.</p>
      </div>

      {/* Details Box */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5 text-xs">
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-gray-400 font-medium">Test Mode</span>
          <strong className="font-extrabold text-white">{currentTest?.mode}</strong>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-gray-400 font-medium">Subject</span>
          <strong className="font-extrabold text-white">{currentTest?.subject}</strong>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-gray-400 font-medium">Topic</span>
          <strong className="font-extrabold text-white">{currentTest?.topic}</strong>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-gray-400 font-medium">Module</span>
          <strong className="font-extrabold text-white">{currentTest?.module}</strong>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-gray-400 font-medium">Mock Paper</span>
          <strong className="font-extrabold text-white">{currentTest?.name}</strong>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-gray-400 font-medium">Total Questions</span>
          <strong className="font-extrabold text-white">{currentTest?.qCount}</strong>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-medium">Duration</span>
          <strong className="font-extrabold text-white">{currentTest?.duration}</strong>
        </div>
      </div>

      {/* Action Row matching Django Universal Modal Buttons */}
      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={onClose}
          className="modal-btn modal-btn-back flex-1 py-3.5 px-5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 text-white font-bold text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
        >
          Go Back
        </button>
        <button
          onClick={() => {
            onClose();
            if (currentTest) onStartSession(currentTest);
          }}
          className="modal-btn modal-btn-start flex-1 py-3.5 px-5 rounded-2xl bg-[#2af598] hover:bg-white text-black font-extrabold text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_8px_25px_rgba(42,245,152,0.4)] cursor-pointer"
        >
          Begin Test
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
