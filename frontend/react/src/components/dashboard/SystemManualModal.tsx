import React from 'react';
import { Modal } from '../ui/Modal';
import { Zap, Trophy, Flame, Target, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SystemManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemManualModal: React.FC<SystemManualModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="PrepVerse System Manual & Growth Rules"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6 text-gray-300 text-sm">
        {/* Intro */}
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-start gap-3 text-purple-200">
          <ShieldCheck className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white text-base">Gamified Evaluation Engine</h4>
            <p className="text-xs text-purple-300 mt-0.5">
              PrepVerse dynamically evaluates your placement readiness using XP points, consistency streaks, accuracy weighting, and grand mock percentiles.
            </p>
          </div>
        </div>

        {/* Section 1: XP System */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-base border-b border-white/[0.08] pb-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>1. Experience Points (XP) Calculation</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="font-semibold text-white block mb-1">Practice Questions</span>
              <p className="text-gray-400">+10 XP for every correct practice question solved on first attempt.</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="font-semibold text-white block mb-1">Module Drills</span>
              <p className="text-gray-400">+25 XP for completing a Single Module Blitz with accuracy ≥ 80%.</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="font-semibold text-white block mb-1">Mock Exams</span>
              <p className="text-gray-400">+100 XP for attempting a full-length placement mock exam.</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="font-semibold text-white block mb-1">Streak Bonuses</span>
              <p className="text-gray-400">+50 XP bonus for maintaining 7-day, 14-day, and 30-day continuous streaks.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Candidate Levels */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-base border-b border-white/[0.08] pb-2">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span>2. Candidate Level Progression Hierarchy</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.02]">
              <span className="font-semibold text-gray-300">Level 1 — Novice Candidate</span>
              <span className="text-gray-400 font-mono">0 – 150 XP</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.02]">
              <span className="font-semibold text-cyan-300">Level 2 — Practitioner</span>
              <span className="text-gray-400 font-mono">151 – 300 XP</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.02]">
              <span className="font-semibold text-purple-300">Level 3 — Specialist</span>
              <span className="text-gray-400 font-mono">301 – 450 XP</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <span className="font-bold text-purple-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Level 4 — Pro Candidate (Your Current Rank)
              </span>
              <span className="text-purple-300 font-mono font-bold">451 – 600 XP</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.02]">
              <span className="font-semibold text-amber-300">Level 5 — Placement Master</span>
              <span className="text-gray-400 font-mono">601+ XP</span>
            </div>
          </div>
        </div>

        {/* Section 3: Streak Rules */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-base border-b border-white/[0.08] pb-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>3. Streak & Heatmap Calculation</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            A day is registered as active on your Consistency Heatmap when you solve at least 5 questions or attempt 1 module drill before midnight. Skipping a day resets your active streak back to 1.
          </p>
        </div>

        {/* Section 4: Weak Topics */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-base border-b border-white/[0.08] pb-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>4. Weak Topics Detection Algorithm</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Sub-topics where your historical accuracy drops below 60% over at least 10 attempted questions are automatically prioritized in your Today's Focus Zone.
          </p>
        </div>
      </div>
    </Modal>
  );
};
