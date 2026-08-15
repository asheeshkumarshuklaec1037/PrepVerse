import React, { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { mockDashboardData } from '../../data/mockDashboardData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { MockConfirmModal } from '../../components/mock/MockConfirmModal';
import { MockScheduleModal } from '../../components/mock/MockScheduleModal';
import type { CatalogTestItem } from '../MockTests/AllTestsPage';
import {
  ArrowLeft,
  ChevronDown,
  FileText,
  Video,
  Download,
  Play,
  Calendar,
  Search,
  BookOpen,
} from 'lucide-react';

interface TopicDetailPageProps {
  courseSlug?: string;
  topicSlug?: string;
  onBack?: () => void;
}

interface ModuleSection {
  id: string;
  number: number;
  title: string;
  badge: string;
  moduleName: string;
  testsCount: number;
  studyMaterialsCount: number;
  tests: CatalogTestItem[];
  materials: {
    title: string;
    type: 'pdf' | 'video';
    sizeOrDuration: string;
    downloads: string;
  }[];
}

const mockModulesList: ModuleSection[] = [
  {
    id: 'm1',
    number: 1,
    title: 'Number Systems & Divisibility Rules',
    badge: '4 Tests • 2 Study Sets',
    moduleName: 'Number Systems',
    testsCount: 4,
    studyMaterialsCount: 2,
    tests: [
      {
        id: 't1',
        name: 'Number Systems — Blitz 01',
        mode: 'Module Blitz',
        subject: 'Aptitude Mastery',
        topic: 'Quantitative Aptitude',
        module: 'Number Systems',
        difficulty: 'Easy',
        dClass: 'diff-easy',
        qCount: '15 MCQs',
        duration: '15 Mins',
        xp: '+200 XP',
        isAttempted: false,
      },
      {
        id: 't2',
        name: 'Number Systems — Blitz 02',
        mode: 'Module Blitz',
        subject: 'Aptitude Mastery',
        topic: 'Quantitative Aptitude',
        module: 'Number Systems',
        difficulty: 'Medium',
        dClass: 'diff-medium',
        qCount: '20 MCQs',
        duration: '20 Mins',
        xp: '+350 XP',
        isAttempted: true,
      },
      {
        id: 't3',
        name: 'Divisibility & Remainders — Drill',
        mode: 'Topic Master',
        subject: 'Aptitude Mastery',
        topic: 'Quantitative Aptitude',
        module: 'Number Systems',
        difficulty: 'Hard',
        dClass: 'diff-hard',
        qCount: '25 MCQs',
        duration: '30 Mins',
        xp: '+500 XP',
        isAttempted: false,
      },
    ],
    materials: [
      {
        title: 'Number Systems Core Formula Sheet & Cheatsheet PDF',
        type: 'pdf',
        sizeOrDuration: '2.4 MB',
        downloads: '1.2k Downloads',
      },
      {
        title: 'Divisibility & Cyclicity Masterclass Video Lecture',
        type: 'video',
        sizeOrDuration: '45 Mins Video',
        downloads: '850 Views',
      },
    ],
  },
  {
    id: 'm2',
    number: 2,
    title: 'Percentages, Profit & Loss Masterclass',
    badge: '3 Tests • 2 Study Sets',
    moduleName: 'Percentages',
    testsCount: 3,
    studyMaterialsCount: 2,
    tests: [
      {
        id: 't4',
        name: 'Percentages — Essentials Drill',
        mode: 'Module Blitz',
        subject: 'Aptitude Mastery',
        topic: 'Quantitative Aptitude',
        module: 'Percentages',
        difficulty: 'Medium',
        dClass: 'diff-medium',
        qCount: '15 MCQs',
        duration: '15 Mins',
        xp: '+250 XP',
        isAttempted: false,
      },
      {
        id: 't5',
        name: 'Profit, Loss & Discounts — Advanced',
        mode: 'Topic Master',
        subject: 'Aptitude Mastery',
        topic: 'Quantitative Aptitude',
        module: 'Percentages',
        difficulty: 'Hard',
        dClass: 'diff-hard',
        qCount: '25 MCQs',
        duration: '30 Mins',
        xp: '+600 XP',
        isAttempted: false,
      },
    ],
    materials: [
      {
        title: 'Percentages Shortcut Calculations Guide',
        type: 'pdf',
        sizeOrDuration: '1.8 MB',
        downloads: '2.1k Downloads',
      },
    ],
  },
  {
    id: 'm3',
    number: 3,
    title: 'Time, Speed, Distance & Work Equations',
    badge: '5 Tests • 3 Study Sets',
    moduleName: 'Time & Distance',
    testsCount: 5,
    studyMaterialsCount: 3,
    tests: [
      {
        id: 't6',
        name: 'Trains & Relative Speed — Blitz',
        mode: 'Module Blitz',
        subject: 'Aptitude Mastery',
        topic: 'Quantitative Aptitude',
        module: 'Time & Distance',
        difficulty: 'Medium',
        dClass: 'diff-medium',
        qCount: '20 MCQs',
        duration: '20 Mins',
        xp: '+400 XP',
        isAttempted: false,
      },
    ],
    materials: [
      {
        title: 'Time & Work Ratio Techniques Handout',
        type: 'pdf',
        sizeOrDuration: '3.1 MB',
        downloads: '1.5k Downloads',
      },
    ],
  },
];

export const TopicDetailPage: React.FC<TopicDetailPageProps> = ({
  courseSlug = 'aptitude-mastery',
  topicSlug = 'quantitative-aptitude',
  onBack,
}) => {
  useScrollReveal();

  const formattedTopicTitle = topicSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const [openModuleId, setOpenModuleId] = useState<string>('m1');
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'tests' | 'materials'>>({
    m1: 'tests',
    m2: 'tests',
    m3: 'tests',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedConfirmTest, setSelectedConfirmTest] = useState<CatalogTestItem | null>(null);
  const [selectedScheduleTest, setSelectedScheduleTest] = useState<CatalogTestItem | null>(null);

  const toggleModule = (id: string) => {
    setOpenModuleId((prev) => (prev === id ? '' : id));
  };

  const setTabForModule = (moduleId: string, tab: 'tests' | 'materials') => {
    setActiveTabMap((prev) => ({ ...prev, [moduleId]: tab }));
  };

  const filteredModules = mockModulesList.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.moduleName.toLowerCase().includes(q) ||
      m.tests.some((t) => t.name.toLowerCase().includes(q))
    );
  });

  return (
    <DashboardLayout profile={mockDashboardData.profile}>
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-page-fade-in">
        {/* Back Button Link */}
        <div>
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white/60 hover:text-white px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-purple-400/40 hover:-translate-x-1 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Topic Modules
            </button>
          ) : (
            <a
              href={`/courses/${courseSlug}/`}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white/60 hover:text-white px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-purple-400/40 hover:-translate-x-1 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Topic Modules
            </a>
          )}
        </div>

        {/* 1. Top Banner Header (Django 1:1 Match) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl hover:border-purple-500/40 transition-all">
          <div className="space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider">
              {formattedTopicTitle}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              {formattedTopicTitle} Topic Drill
            </h1>
            <p className="text-sm text-gray-300 font-light leading-relaxed max-w-2xl">
              Select a module accordion below to expand practice test papers, speed drills, formula cheatsheets, and concept videos.
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-right space-y-1 font-mono text-xs hidden md:block">
            <span className="text-gray-400 block">AVAILABLE MODULES</span>
            <strong className="text-purple-400 text-lg font-bold">12 Active Sets</strong>
          </div>
        </div>

        {/* 2. Topic Search Filter Bar */}
        <div className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 flex items-center gap-3 hover:border-purple-400/50 transition-all">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search module title, test paper, or formula sheet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-gray-500 font-medium"
          />
        </div>

        {/* 3. Accordion Module List (Django 1:1 Match) */}
        <div className="space-y-4">
          {filteredModules.map((mod) => {
            const isOpen = openModuleId === mod.id;
            const activeTab = activeTabMap[mod.id] || 'tests';

            return (
              <div
                key={mod.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white/[0.03] border-purple-500/40 shadow-[0_12px_32px_rgba(139,124,240,0.2)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-purple-400/30 hover:bg-white/[0.04]'
                }`}
              >
                {/* Module Accordion Header Button */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base transition-all ${
                        isOpen
                          ? 'bg-gradient-to-br from-purple-600 to-purple-400 text-white shadow-lg shadow-purple-500/30'
                          : 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
                      }`}
                    >
                      0{mod.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono">
                        Module {mod.number} · {mod.moduleName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-purple-300 font-mono text-xs font-bold">
                      {mod.badge}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-purple-500/20 border-purple-500/40 text-purple-300' : 'text-gray-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Accordion Collapsible Content */}
                {isOpen && (
                  <div className="px-6 sm:px-7 pb-7 pt-2 border-t border-white/5 space-y-6 animate-page-fade-in">
                    {/* Tab Switcher Pills */}
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                      <button
                        onClick={() => setTabForModule(mod.id, 'tests')}
                        className={`px-5 py-2 rounded-full font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                          activeTab === 'tests'
                            ? 'bg-gradient-to-r from-purple-600/40 to-purple-400/20 border border-purple-400/50 text-white shadow-md shadow-purple-500/20'
                            : 'bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        <span>Practice Tests ({mod.tests.length})</span>
                      </button>

                      <button
                        onClick={() => setTabForModule(mod.id, 'materials')}
                        className={`px-5 py-2 rounded-full font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                          activeTab === 'materials'
                            ? 'bg-gradient-to-r from-purple-600/40 to-purple-400/20 border border-purple-400/50 text-white shadow-md shadow-purple-500/20'
                            : 'bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5 text-purple-400" />
                        <span>Study Materials ({mod.materials.length})</span>
                      </button>
                    </div>

                    {/* Tab Pane 1: Practice Test Cards Grid */}
                    {activeTab === 'tests' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mod.tests.map((test) => (
                          <div
                            key={test.id}
                            className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-4 hover:border-purple-400/50 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(108,92,231,0.3)] transition-all group"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-purple-300">
                                  {test.mode}
                                </span>
                                <span
                                  className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
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

                              <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                                {test.name}
                              </h4>
                              <p className="text-xs text-gray-400 font-mono">
                                {test.qCount} · {test.duration} · <span className="text-emerald-400">{test.xp}</span>
                              </p>
                            </div>

                            {/* Card Action Buttons */}
                            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                              <button
                                onClick={() => setSelectedConfirmTest(test)}
                                className={`flex-1 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                  test.isAttempted
                                    ? 'bg-white/10 hover:bg-white/20 text-white'
                                    : 'bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 text-white shadow-md shadow-purple-600/30'
                                }`}
                              >
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>{test.isAttempted ? 'RE-TAKE' : 'START TEST'}</span>
                              </button>

                              <button
                                onClick={() => setSelectedScheduleTest(test)}
                                title="Schedule Test"
                                className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-600 border border-white/10 text-[#2af598] hover:text-white transition-all flex items-center justify-center cursor-pointer"
                              >
                                <Calendar className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab Pane 2: Study Materials List */}
                    {activeTab === 'materials' && (
                      <div className="space-y-4">
                        {mod.materials.map((mat, idx) => (
                          <div
                            key={idx}
                            className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4 hover:border-purple-400/40 hover:-translate-y-1 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                                {mat.type === 'pdf' ? <FileText className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white">{mat.title}</h4>
                                <p className="text-xs text-gray-400 font-mono">
                                  {mat.sizeOrDuration} · {mat.downloads}
                                </p>
                              </div>
                            </div>

                            <a
                              href="#download"
                              onClick={(e) => {
                                e.preventDefault();
                                alert(`Downloading study material: ${mat.title}`);
                              }}
                              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-purple-600 border border-white/10 text-purple-300 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" /> Access
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modals */}
        <MockConfirmModal
          isOpen={Boolean(selectedConfirmTest)}
          onClose={() => setSelectedConfirmTest(null)}
          test={selectedConfirmTest}
          onStartSession={(t) => {
            window.location.href = `/mock-test-session/?test=${t.id}`;
          }}
        />

        <MockScheduleModal
          isOpen={Boolean(selectedScheduleTest)}
          onClose={() => setSelectedScheduleTest(null)}
          test={selectedScheduleTest}
          onConfirmSchedule={(date, time) => alert(`Successfully scheduled session on ${date} at ${time}!`)}
        />
      </div>
    </DashboardLayout>
  );
};
