import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { mockDashboardData } from '../../data/mockDashboardData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { MockConfirmModal } from '../../components/mock/MockConfirmModal';
import { MockScheduleModal } from '../../components/mock/MockScheduleModal';
import { MockTestSessionPage } from './MockTestSessionPage';
import { ArrowLeft, LineChart, Search, Play, Calendar } from 'lucide-react';

export interface CatalogTestItem {
  id: string;
  name: string;
  mode: 'Module Blitz' | 'Topic Master' | 'Subject Marathon';
  subject: string;
  topic: string;
  module: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dClass: string;
  qCount: string;
  duration: string;
  xp: string;
  isAttempted?: boolean;
}

export const catalogTestsList: CatalogTestItem[] = [
  // --- Module Blitz ---
  { id: 't1', name: 'Number Systems — Blitz 01', mode: 'Module Blitz', subject: 'Aptitude Mastery', topic: 'Quantitative Aptitude', module: 'Number Systems', difficulty: 'Easy', dClass: 'diff-easy', qCount: '10 MCQs', duration: '15 Mins', xp: '+100 XP', isAttempted: true },
  { id: 't2', name: 'Number Systems — Blitz 02', mode: 'Module Blitz', subject: 'Aptitude Mastery', topic: 'Quantitative Aptitude', module: 'Number Systems', difficulty: 'Medium', dClass: 'diff-medium', qCount: '10 MCQs', duration: '15 Mins', xp: '+250 XP', isAttempted: false },
  { id: 't3', name: 'Percentages — Speed Run', mode: 'Module Blitz', subject: 'Aptitude Mastery', topic: 'Quantitative Aptitude', module: 'Percentages', difficulty: 'Easy', dClass: 'diff-easy', qCount: '10 MCQs', duration: '15 Mins', xp: '+100 XP', isAttempted: false },
  { id: 't4', name: 'Time & Work — Sprint', mode: 'Module Blitz', subject: 'Aptitude Mastery', topic: 'Quantitative Aptitude', module: 'Time & Work', difficulty: 'Hard', dClass: 'diff-hard', qCount: '10 MCQs', duration: '15 Mins', xp: '+500 XP', isAttempted: false },
  { id: 't5', name: 'Blood Relations — Puzzle Blitz', mode: 'Module Blitz', subject: 'Logical Reasoning', topic: 'Analytical Reasoning', module: 'Blood Relations', difficulty: 'Medium', dClass: 'diff-medium', qCount: '10 MCQs', duration: '15 Mins', xp: '+250 XP', isAttempted: false },
  { id: 't6', name: 'Syllogisms — Logic Blitz', mode: 'Module Blitz', subject: 'Logical Reasoning', topic: 'Verbal Reasoning', module: 'Syllogisms', difficulty: 'Hard', dClass: 'diff-hard', qCount: '10 MCQs', duration: '15 Mins', xp: '+500 XP', isAttempted: false },

  // --- Topic Master ---
  { id: 't8', name: 'Quantitative Aptitude — Master 01', mode: 'Topic Master', subject: 'Aptitude Mastery', topic: 'Quantitative Aptitude', module: 'All Modules', difficulty: 'Medium', dClass: 'diff-medium', qCount: '25 MCQs', duration: '30 Mins', xp: '+350 XP', isAttempted: true },
  { id: 't9', name: 'Logical Reasoning — Master 01', mode: 'Topic Master', subject: 'Logical Reasoning', topic: 'Analytical Reasoning', module: 'All Modules', difficulty: 'Hard', dClass: 'diff-hard', qCount: '25 MCQs', duration: '30 Mins', xp: '+500 XP', isAttempted: false },
  { id: 't10', name: 'Grammar Essentials — Topic Test', mode: 'Topic Master', subject: 'English Proficiency', topic: 'Grammar Essentials', module: 'All Modules', difficulty: 'Easy', dClass: 'diff-easy', qCount: '25 MCQs', duration: '30 Mins', xp: '+200 XP', isAttempted: false },

  // --- Subject Marathon ---
  { id: 't13', name: 'Full Aptitude — Grand Marathon 01', mode: 'Subject Marathon', subject: 'Aptitude Mastery', topic: 'All Topics', module: 'All Modules', difficulty: 'Hard', dClass: 'diff-hard', qCount: '50 MCQs', duration: '60 Mins', xp: '+1000 XP', isAttempted: false },
  { id: 't14', name: 'Logical Reasoning — Full Marathon', mode: 'Subject Marathon', subject: 'Logical Reasoning', topic: 'All Topics', module: 'All Modules', difficulty: 'Medium', dClass: 'diff-medium', qCount: '50 MCQs', duration: '60 Mins', xp: '+800 XP', isAttempted: true },
];

interface AllTestsPageProps {
  initialActiveSession?: boolean;
}

export const AllTestsPage: React.FC<AllTestsPageProps> = ({ initialActiveSession = false }) => {
  const [activeSessionTest, setActiveSessionTest] = useState<CatalogTestItem | null>(
    initialActiveSession ? catalogTestsList[0] : null
  );

  useScrollReveal(activeSessionTest);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedAttemptState, setSelectedAttemptState] = useState('all');
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'Module Blitz' | 'Topic Master' | 'Subject Marathon'>('all');

  // Modal States
  const [selectedConfirmTest, setSelectedConfirmTest] = useState<CatalogTestItem | null>(null);
  const [selectedScheduleTest, setSelectedScheduleTest] = useState<CatalogTestItem | null>(null);

  const filteredTests = useMemo(() => {
    return catalogTestsList.filter((item) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSub = item.subject.toLowerCase().includes(q);
        const matchesTopic = item.topic.toLowerCase().includes(q);
        const matchesMod = item.module.toLowerCase().includes(q);
        if (!matchesName && !matchesSub && !matchesTopic && !matchesMod) return false;
      }

      // Subject filter
      if (selectedSubject !== 'all' && item.subject !== selectedSubject) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) return false;

      // Attempt state filter
      if (selectedAttemptState === 'unattempted' && item.isAttempted) return false;
      if (selectedAttemptState === 'attempted' && !item.isAttempted) return false;

      // Category Pill Tab
      if (activeCategoryTab !== 'all' && item.mode !== activeCategoryTab) return false;

      return true;
    });
  }, [searchQuery, selectedSubject, selectedDifficulty, selectedAttemptState, activeCategoryTab]);

  const counts = useMemo(() => {
    return {
      all: catalogTestsList.length,
      blitz: catalogTestsList.filter((t) => t.mode === 'Module Blitz').length,
      master: catalogTestsList.filter((t) => t.mode === 'Topic Master').length,
      marathon: catalogTestsList.filter((t) => t.mode === 'Subject Marathon').length,
    };
  }, []);

  if (activeSessionTest) {
    return (
      <MockTestSessionPage
        test={activeSessionTest}
        onExitSession={() => setActiveSessionTest(null)}
      />
    );
  }

  return (
    <DashboardLayout profile={mockDashboardData.profile}>
      <div className="space-y-8">
        {/* 1. Full-Bleed Cover Hero Banner with Global Animation */}
        <div className="animate-page-fade-in">
          <div className="global-hero-banner min-h-[380px] py-16 px-6">
            <img
              src="/static/images/smarter_prep_tablet.jpg"
              alt="All Tests Directory Background"
              className="absolute inset-0 w-full h-full object-cover animate-hero-bg"
            />
            <div className="global-hero-vignette" />

            {/* Back to Dashboard Link */}
            <a
              href="/dashboard/"
              className="absolute top-6 left-6 sm:left-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2 z-20 transition-all hover:-translate-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Dashboard
            </a>

            {/* Hero Content (Shifted Higher) */}
            <div className="relative z-10 text-center max-w-3xl px-4 space-y-4 -mt-16 sm:-mt-20">
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70">
                ALL TESTS DIRECTORY
              </h1>
              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
                Browse through every mock test paper, module drill, and subject marathon available across all domains.
              </p>
              <div className="pt-2">
                <a
                  href="/mock-history/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/60 to-emerald-500/40 hover:from-purple-600 hover:to-emerald-500 border border-purple-400/50 text-white font-mono text-xs font-bold shadow-lg shadow-purple-600/30 transition-all hover:-translate-y-1"
                >
                  <LineChart className="w-4 h-4" />
                  <span>View Test Performance Analytics →</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of Directory Container Overlapping Hero Banner (Shifted higher -mt-28 sm:-mt-36) */}
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-20 -mt-28 sm:-mt-36">
          {/* 2. Filter & Search Bar (Reveal Animation) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#121317]/80 backdrop-blur-xl border border-white/10 flex flex-col md:flex-row items-center gap-4 hover:border-[#8b7cf0] hover:shadow-[0_12px_32px_rgba(139,124,240,0.2)] transition-all reveal reveal-delay-1">
            {/* Search Input */}
            <div className="flex-1 w-full flex items-center gap-3 bg-[#17181f] border border-white/10 rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search test name, subject, topic, or module..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white text-xs font-medium placeholder-gray-500"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-[#17181f] border border-white/10 text-white text-xs font-mono px-3.5 py-2.5 rounded-xl outline-none cursor-pointer"
              >
                <option value="all">All Subjects</option>
                <option value="Aptitude Mastery">Aptitude Mastery</option>
                <option value="Logical Reasoning">Logical Reasoning</option>
                <option value="English Proficiency">English Proficiency</option>
                <option value="Quantitative Aptitude">Quantitative Aptitude</option>
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-[#17181f] border border-white/10 text-white text-xs font-mono px-3.5 py-2.5 rounded-xl outline-none cursor-pointer"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <select
                value={selectedAttemptState}
                onChange={(e) => setSelectedAttemptState(e.target.value)}
                className="bg-[#17181f] border border-white/10 text-white text-xs font-mono px-3.5 py-2.5 rounded-xl outline-none cursor-pointer"
              >
                <option value="all">All Tests</option>
                <option value="unattempted">Unattempted Only</option>
                <option value="attempted">Attempted / Retakes</option>
              </select>
            </div>
          </div>

          {/* 3. Category Mode Pills Segmented Switcher (Reveal Animation) */}
          <div className="flex items-center gap-3 flex-wrap reveal reveal-delay-2">
            <button
              onClick={() => setActiveCategoryTab('all')}
              className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold border transition-all cursor-pointer ${
                activeCategoryTab === 'all'
                  ? 'bg-[#6c5ce7]/20 border-[#6c5ce7] text-[#8b7cf0] shadow-[0_0_15px_rgba(108,92,231,0.3)]'
                  : 'bg-white/[0.04] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              All Categories ({counts.all})
            </button>

            <button
              onClick={() => setActiveCategoryTab('Module Blitz')}
              className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold border transition-all cursor-pointer ${
                activeCategoryTab === 'Module Blitz'
                  ? 'bg-[#6c5ce7]/20 border-[#6c5ce7] text-[#8b7cf0] shadow-[0_0_15px_rgba(108,92,231,0.3)]'
                  : 'bg-white/[0.04] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              Module Blitz ({counts.blitz})
            </button>

            <button
              onClick={() => setActiveCategoryTab('Topic Master')}
              className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold border transition-all cursor-pointer ${
                activeCategoryTab === 'Topic Master'
                  ? 'bg-[#6c5ce7]/20 border-[#6c5ce7] text-[#8b7cf0] shadow-[0_0_15px_rgba(108,92,231,0.3)]'
                  : 'bg-white/[0.04] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              Topic Master ({counts.master})
            </button>

            <button
              onClick={() => setActiveCategoryTab('Subject Marathon')}
              className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold border transition-all cursor-pointer ${
                activeCategoryTab === 'Subject Marathon'
                  ? 'bg-[#6c5ce7]/20 border-[#6c5ce7] text-[#8b7cf0] shadow-[0_0_15px_rgba(108,92,231,0.3)]'
                  : 'bg-white/[0.04] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              Subject Marathon ({counts.marathon})
            </button>
          </div>

          {/* 4. Directory Grid of All Test Cards (Scroll Reveal Animation) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal reveal-delay-3">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="p-6 rounded-2xl bg-[#121317] border border-white/10 flex flex-col justify-between hover:border-[#8b7cf0] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_25px_rgba(108,92,231,0.35)] transition-all prepverse-card-hover group"
              >
                <div>
                  {/* Top Tags Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/10 text-[#8b7cf0]">
                      {test.mode}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                        test.difficulty === 'Easy'
                          ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                          : test.difficulty === 'Medium'
                          ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                          : 'border-rose-500/30 text-rose-400 bg-rose-500/10'
                      }`}
                    >
                      {test.difficulty}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white group-hover:text-[#8b7cf0] transition-colors mb-1">
                    {test.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    {test.subject} · {test.topic}
                  </p>

                  {/* Test Details Table */}
                  <div className="space-y-2 pt-3 border-t border-white/10 text-xs mb-6">
                    <div className="flex justify-between text-gray-400">
                      <span>Module</span>
                      <strong className="font-mono text-white">{test.module}</strong>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Questions</span>
                      <strong className="font-mono text-white">{test.qCount}</strong>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Duration</span>
                      <strong className="font-mono text-white">{test.duration}</strong>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Reward</span>
                      <strong className="font-mono text-purple-400">{test.xp}</strong>
                    </div>
                  </div>
                </div>

                {/* Start / Retake Action Button + Calendar Schedule Button (Django 1:1 Modal Trigger) */}
                <div className="flex items-center gap-2.5 w-full">
                  <button
                    onClick={() => setSelectedConfirmTest(test)}
                    className={`flex-1 py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                      test.isAttempted
                        ? 'bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white'
                        : 'bg-[#6c5ce7] hover:bg-[#8b7cf0] text-white shadow-purple-600/20'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{test.isAttempted ? 'RE-TAKE MOCK TEST' : 'START MOCK TEST'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedScheduleTest(test)}
                    title="Schedule Test"
                    className="p-3 rounded-xl bg-white/[0.06] hover:bg-[#6c5ce7] border border-white/15 hover:border-[#6c5ce7] text-[#2af598] hover:text-white transition-all flex items-center justify-center cursor-pointer group/cal"
                  >
                    <Calendar className="w-4 h-4 text-[#2af598] group-hover/cal:text-white transition-colors" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-16 text-gray-400 font-mono text-xs border border-white/10 rounded-2xl bg-[#121317]">
              No mock tests found matching the selected filter criteria.
            </div>
          )}
        </div>
      </div>

      {/* Universal Reusable Modals (Django 1:1 Content & Logic) */}
      <MockConfirmModal
        isOpen={Boolean(selectedConfirmTest)}
        onClose={() => setSelectedConfirmTest(null)}
        test={selectedConfirmTest}
        onStartSession={(t) => setActiveSessionTest(t)}
      />

      <MockScheduleModal
        isOpen={Boolean(selectedScheduleTest)}
        onClose={() => setSelectedScheduleTest(null)}
        test={selectedScheduleTest}
        onConfirmSchedule={(date, time) => alert(`Successfully scheduled session on ${date} at ${time}!`)}
      />
    </DashboardLayout>
  );
};
