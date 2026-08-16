import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { mockDashboardData } from '../../data/mockDashboardData';
import { ALL_COURSES } from '../../data/coursesData';
import type { CourseData, TopicData } from '../../data/coursesData';
import { MockScheduleModal } from '../../components/mock/MockScheduleModal';
import { MockConfirmModal } from '../../components/mock/MockConfirmModal';
import { HeroBanner } from '../../components/ui/HeroBanner';
import type { CatalogTestItem } from '../MockTests/AllTestsPage';
import {
  Search,
  ChevronDown,
  Layers,
  ClipboardCheck,
  BookOpen,
  CalendarPlus,
  Eye,
  FileDown,
  ArrowRight,
  X,
  FileText
} from 'lucide-react';

export const PracticeHubPage: React.FC = () => {
  // Read initial values from URL search params if present
  const getInitialParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      course: params.get('course') || 'aptitude-mastery',
      topic: params.get('topic') || 'quantitative-aptitude',
    };
  };

  const initialParams = getInitialParams();

  // State for Course & Topic Selection
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>(initialParams.course);
  const [selectedTopicSlug, setSelectedTopicSlug] = useState<string>(initialParams.topic);

  // Sync state to URL params whenever they change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let changed = false;
    if (params.get('course') !== selectedCourseSlug) {
      params.set('course', selectedCourseSlug);
      changed = true;
    }
    if (params.get('topic') !== selectedTopicSlug) {
      params.set('topic', selectedTopicSlug);
      changed = true;
    }
    if (changed) {
      const newRelativePathQuery = window.location.pathname + '?' + params.toString();
      window.history.pushState(null, '', newRelativePathQuery);
    }
  }, [selectedCourseSlug, selectedTopicSlug]);

  // Sync state when URL popstate occurs (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const c = params.get('course');
      const t = params.get('topic');
      if (c) setSelectedCourseSlug(c);
      if (t) setSelectedTopicSlug(t);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Active course and topic
  const currentCourse: CourseData = ALL_COURSES.find(c => c.slug === selectedCourseSlug) || ALL_COURSES[0];
  const currentTopic: TopicData = currentCourse.topics.find(t => t.slug === selectedTopicSlug) || currentCourse.topics[0] || ALL_COURSES[0].topics[0];

  // Accordion state (expanded subtopic indices)
  const [expandedModules, setExpandedModules] = useState<{ [key: number]: boolean }>({ 0: true, 1: true });

  // Tab state per module (Practice Sets vs Study Material)
  const [activeTabs, setActiveTabs] = useState<{ [key: number]: 'practice' | 'study' }>({});

  // Search filter query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Schedule Modal State
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleTestItem, setScheduleTestItem] = useState<CatalogTestItem | null>(null);

  // Test Confirmation Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmTestItem, setConfirmTestItem] = useState<CatalogTestItem | null>(null);

  // Document Viewer Modal State
  const [viewerModal, setViewerModal] = useState<{ isOpen: boolean; title: string; url: string; fileType: string } | null>(null);

  // Sticky Toast State
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Scroll to top on mount / change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCourseSlug, selectedTopicSlug]);

  const handleCourseChange = (slug: string) => {
    setSelectedCourseSlug(slug);
    const course = ALL_COURSES.find(c => c.slug === slug);
    if (course && course.topics.length > 0) {
      setSelectedTopicSlug(course.topics[0].slug);
    }
  };

  const toggleModule = (index: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const setModuleTab = (index: number, tab: 'practice' | 'study') => {
    setActiveTabs(prev => ({
      ...prev,
      [index]: tab
    }));
  };

  const triggerScheduleModal = (paperName: string, modeName: string, subjectName: string) => {
    setScheduleTestItem({
      id: `sch-${Date.now()}`,
      name: paperName,
      mode: modeName as any,
      subject: subjectName,
      topic: currentTopic.title,
      module: paperName,
      difficulty: 'Medium',
      dClass: 'diff-medium',
      qCount: '15 MCQs',
      duration: '20 Mins',
      xp: '+150 XP'
    });
    setIsScheduleOpen(true);
  };

  const triggerTestConfirmModal = (paperName: string, moduleName: string, difficulty: 'Easy' | 'Medium' | 'Hard') => {
    setConfirmTestItem({
      id: `test-${Date.now()}`,
      name: paperName,
      mode: 'Module Blitz',
      subject: currentCourse.title,
      topic: currentTopic.title,
      module: moduleName,
      difficulty: difficulty,
      dClass: difficulty === 'Easy' ? 'diff-easy' : difficulty === 'Hard' ? 'diff-hard' : 'diff-medium',
      qCount: difficulty === 'Easy' ? '10 MCQs' : difficulty === 'Hard' ? '20 MCQs' : '15 MCQs',
      duration: difficulty === 'Easy' ? '15 Mins' : difficulty === 'Hard' ? '25 Mins' : '20 Mins',
      xp: difficulty === 'Easy' ? '+100 XP' : difficulty === 'Hard' ? '+250 XP' : '+150 XP'
    });
    setIsConfirmOpen(true);
  };

  const handleConfirmSchedule = (date: string, time: string) => {
    setIsScheduleOpen(false);
    showToast(`${scheduleTestItem?.name || 'Session'} scheduled for ${date} at ${time}`);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 4000);
  };

  const openDocumentViewer = (title: string, url: string, type: string) => {
    setViewerModal({ isOpen: true, title, url, fileType: type });
  };

  // Filter subtopics based on search query
  const filteredSubtopics = currentTopic.subtopics.filter(sub =>
    sub.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currentTopic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currentCourse.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout profile={mockDashboardData.profile}>
      {/* Toast Notification (Sticky Note Style) */}
      {toastMsg && (
        <div className="fixed top-[100px] right-[30px] z-[99999] bg-gradient-to-br from-[#ffe57f] to-[#ffc107] text-[#120a21] px-5 py-3.5 rounded-r-2xl rounded-bl-2xl shadow-2xl flex items-center gap-3 border-l-4 border-[#ff9800] animate-bounce font-mono font-extrabold text-xs">
          <span className="text-[#e53935] text-base -rotate-12">📌</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Reusable Hero Banner (Matches CourseDetailPage 1:1) */}
      <HeroBanner
        bgImage={currentCourse.bg_image}
        badgeText={currentCourse.title}
        badgeColor="purple"
        title={currentTopic.title}
        description={`Master the concepts of ${currentTopic.title} with comprehensive modules, practice sets, and study materials.`}
        backText={`BACK TO ${currentCourse.title.toUpperCase()}`}
        onBack={() => window.history.back()}
      />

      {/* Ambient Background Glow Patches */}
      <div className="fixed top-[-100px] left-[-120px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_70%)] pointer-events-none z-[-1] blur-3xl" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.15)_0%,transparent_70%)] pointer-events-none z-[-1] blur-3xl" />

      {/* Main Topic Container */}
      <div className="max-w-[1340px] mx-auto px-4 pt-8 pb-20 space-y-8 relative z-10">
        
        {/* Search & Filter Compact Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#12131c] border border-white/10 shadow-lg hover:border-[#8b7cf0] hover:shadow-[0_12px_32px_rgba(139,124,240,0.2)] transition-all duration-300">
          <div className="relative w-full md:w-80 flex items-center bg-white/[0.045] border border-white/10 rounded-xl px-3.5 py-2">
            <Search className="w-4 h-4 text-white/40 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search modules, practice sets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white text-xs placeholder-white/40 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Select Controls Group */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs font-mono text-white/60">
              <span className="uppercase text-[11px] font-bold">Course:</span>
              <div className="relative">
                <select
                  value={selectedCourseSlug}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="appearance-none bg-white/[0.05] border border-white/20 rounded-xl px-4 py-2 pr-8 text-white text-xs font-mono font-semibold focus:outline-none focus:border-[#8b7cf0] cursor-pointer hover:bg-[#8b7cf0]/10 transition-colors"
                >
                  {ALL_COURSES.map(c => (
                    <option key={c.slug} value={c.slug} className="bg-[#0d1322] text-white">{c.title}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-white/60">
              <span className="uppercase text-[11px] font-bold">Topic:</span>
              <div className="relative">
                <select
                  value={selectedTopicSlug}
                  onChange={(e) => setSelectedTopicSlug(e.target.value)}
                  className="appearance-none bg-white/[0.05] border border-white/20 rounded-xl px-4 py-2 pr-8 text-white text-xs font-mono font-semibold focus:outline-none focus:border-[#8b7cf0] cursor-pointer hover:bg-[#8b7cf0]/10 transition-colors"
                >
                  {currentCourse.topics.map(t => (
                    <option key={t.slug} value={t.slug} className="bg-[#0d1322] text-white">{t.title}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Modules Accordion List */}
        <div className="space-y-4">
          {filteredSubtopics.length === 0 ? (
            <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-2xl text-white/50">
              No matching modules or practice sets found for "{searchQuery}".
            </div>
          ) : (
            filteredSubtopics.map((sub, idx) => {
              const isExpanded = expandedModules[idx] ?? (idx === 0);
              const activeTab = activeTabs[idx] || 'practice';

              return (
                <div
                  key={sub}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-xl ${
                    isExpanded
                      ? 'border-[#8b7cf0] bg-[#141423] shadow-[0_12px_32px_rgba(139,124,240,0.25)]'
                      : 'border-white/10 bg-white/[0.03] hover:border-[#8b7cf0]/60 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Module Header Trigger */}
                  <button
                    onClick={() => toggleModule(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 shrink-0 ${
                        isExpanded
                          ? 'bg-gradient-to-br from-[#6c5ce7] to-[#8b7cf0] text-white scale-105 shadow-md shadow-[#6c5ce7]/40'
                          : 'bg-[#6c5ce7]/15 border border-[#6c5ce7]/30 text-[#8b7cf0]'
                      }`}>
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">{sub}</h3>
                        <p className="text-xs text-white/50 font-mono mt-0.5">4 Practice Sets &bull; 4 Study Materials</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#8b7cf0] font-mono text-xs font-bold">
                        Module {idx + 1}
                      </span>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? 'rotate-180 bg-[#6c5ce7]/20 text-[#8b7cf0] border border-[#6c5ce7]/40'
                          : 'bg-white/5 text-white/70 border border-white/10'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Content Wrapper */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-white/10 bg-black/30 animate-[tabSmoothSwitch_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                      {/* Tab Pills */}
                      <div className="flex items-center gap-3 mb-6 pt-2 border-b border-white/5 pb-4">
                        <button
                          onClick={() => setModuleTab(idx, 'practice')}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                            activeTab === 'practice'
                              ? 'bg-gradient-to-r from-[#6c5ce7]/40 to-[#8b7cf0]/30 border border-[#8b7cf0]/60 text-white shadow-lg shadow-[#6c5ce7]/30 scale-105'
                              : 'bg-white/[0.045] border border-white/10 text-white/60 hover:text-white hover:border-white/25 hover:-translate-y-0.5'
                          }`}
                        >
                          <ClipboardCheck className={`w-3.5 h-3.5 ${activeTab === 'practice' ? 'text-[#8b7cf0]' : ''}`} /> Practice Sets (4)
                        </button>
                        <button
                          onClick={() => setModuleTab(idx, 'study')}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                            activeTab === 'study'
                              ? 'bg-gradient-to-r from-[#6c5ce7]/40 to-[#8b7cf0]/30 border border-[#8b7cf0]/60 text-white shadow-lg shadow-[#6c5ce7]/30 scale-105'
                              : 'bg-white/[0.045] border border-white/10 text-white/60 hover:text-white hover:border-white/25 hover:-translate-y-0.5'
                          }`}
                        >
                          <BookOpen className={`w-3.5 h-3.5 ${activeTab === 'study' ? 'text-[#8b7cf0]' : ''}`} /> Study Material (4)
                        </button>
                      </div>

                      {/* TAB 1: PRACTICE SETS */}
                      {activeTab === 'practice' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                          {/* Card 1: Easy */}
                          <div className="p-5 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-[#8b7cf0] hover:shadow-2xl hover:shadow-[#8b7cf0]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-white/5 text-[#8b7cf0]">MODULE BLITZ</span>
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">EASY</span>
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-white group-hover:text-[#8b7cf0] transition-colors leading-snug">{sub} &mdash; Blitz 01</h4>
                                <p className="text-[11px] text-white/40 font-mono mt-1">{currentCourse.title} &bull; {currentTopic.title}</p>
                              </div>
                              <div className="space-y-2 text-xs font-mono text-white/60 pt-3 border-t border-white/10">
                                <div className="flex justify-between"><span>Questions</span><b className="text-white">10 MCQs</b></div>
                                <div className="flex justify-between"><span>Duration</span><b className="text-white">15 Mins</b></div>
                                <div className="flex justify-between"><span>Reward</span><b className="text-[#34d399]">+100 XP</b></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                              <button
                                onClick={() => triggerTestConfirmModal(`${sub} — Blitz 01`, sub, 'Easy')}
                                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#8b7cf0] hover:from-[#7c6df7] hover:to-[#9b8cf0] text-white font-bold font-mono text-xs shadow-lg shadow-[#6c5ce7]/30 transition-all hover:-translate-y-0.5"
                              >
                                Practice
                              </button>
                              <button
                                onClick={() => triggerScheduleModal(`${sub} — Blitz 01`, 'Module Blitz', currentCourse.title)}
                                title="Schedule Practice"
                                className="w-10 h-10 rounded-xl bg-white/[0.045] border border-white/10 hover:bg-[#6c5ce7]/20 hover:border-[#8b7cf0]/50 text-[#8b7cf0] hover:text-white flex items-center justify-center transition-all"
                              >
                                <CalendarPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Card 2: Medium */}
                          <div className="p-5 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-[#8b7cf0] hover:shadow-2xl hover:shadow-[#8b7cf0]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-white/5 text-[#8b7cf0]">MODULE BLITZ</span>
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">MEDIUM</span>
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-white group-hover:text-[#8b7cf0] transition-colors leading-snug">{sub} &mdash; Blitz 02</h4>
                                <p className="text-[11px] text-white/40 font-mono mt-1">{currentCourse.title} &bull; {currentTopic.title}</p>
                              </div>
                              <div className="space-y-2 text-xs font-mono text-white/60 pt-3 border-t border-white/10">
                                <div className="flex justify-between"><span>Questions</span><b className="text-white">15 MCQs</b></div>
                                <div className="flex justify-between"><span>Duration</span><b className="text-white">20 Mins</b></div>
                                <div className="flex justify-between"><span>Reward</span><b className="text-[#34d399]">+150 XP</b></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                              <button
                                onClick={() => triggerTestConfirmModal(`${sub} — Blitz 02`, sub, 'Medium')}
                                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#8b7cf0] hover:from-[#7c6df7] hover:to-[#9b8cf0] text-white font-bold font-mono text-xs shadow-lg shadow-[#6c5ce7]/30 transition-all hover:-translate-y-0.5"
                              >
                                Practice
                              </button>
                              <button
                                onClick={() => triggerScheduleModal(`${sub} — Blitz 02`, 'Module Blitz', currentCourse.title)}
                                title="Schedule Practice"
                                className="w-10 h-10 rounded-xl bg-white/[0.045] border border-white/10 hover:bg-[#6c5ce7]/20 hover:border-[#8b7cf0]/50 text-[#8b7cf0] hover:text-white flex items-center justify-center transition-all"
                              >
                                <CalendarPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Card 3: Hard */}
                          <div className="p-5 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-[#8b7cf0] hover:shadow-2xl hover:shadow-[#8b7cf0]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-white/5 text-[#8b7cf0]">MODULE BLITZ</span>
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30">HARD</span>
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-white group-hover:text-[#8b7cf0] transition-colors leading-snug">{sub} &mdash; Speed Run</h4>
                                <p className="text-[11px] text-white/40 font-mono mt-1">{currentCourse.title} &bull; {currentTopic.title}</p>
                              </div>
                              <div className="space-y-2 text-xs font-mono text-white/60 pt-3 border-t border-white/10">
                                <div className="flex justify-between"><span>Questions</span><b className="text-white">20 MCQs</b></div>
                                <div className="flex justify-between"><span>Duration</span><b className="text-white">25 Mins</b></div>
                                <div className="flex justify-between"><span>Reward</span><b className="text-[#34d399]">+250 XP</b></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                              <button
                                onClick={() => triggerTestConfirmModal(`${sub} — Speed Run`, sub, 'Hard')}
                                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#8b7cf0] hover:from-[#7c6df7] hover:to-[#9b8cf0] text-white font-bold font-mono text-xs shadow-lg shadow-[#6c5ce7]/30 transition-all hover:-translate-y-0.5"
                              >
                                Practice
                              </button>
                              <button
                                onClick={() => triggerScheduleModal(`${sub} — Speed Run`, 'Module Blitz', currentCourse.title)}
                                title="Schedule Practice"
                                className="w-10 h-10 rounded-xl bg-white/[0.045] border border-white/10 hover:bg-[#6c5ce7]/20 hover:border-[#8b7cf0]/50 text-[#8b7cf0] hover:text-white flex items-center justify-center transition-all"
                              >
                                <CalendarPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Card 4: Challenge */}
                          <div className="p-5 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-[#8b7cf0] hover:shadow-2xl hover:shadow-[#8b7cf0]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-white/5 text-[#8b7cf0]">MODULE BLITZ</span>
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">MEDIUM</span>
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-white group-hover:text-[#8b7cf0] transition-colors leading-snug">{sub} &mdash; Mastery Set</h4>
                                <p className="text-[11px] text-white/40 font-mono mt-1">{currentCourse.title} &bull; {currentTopic.title}</p>
                              </div>
                              <div className="space-y-2 text-xs font-mono text-white/60 pt-3 border-t border-white/10">
                                <div className="flex justify-between"><span>Questions</span><b className="text-white">15 MCQs</b></div>
                                <div className="flex justify-between"><span>Duration</span><b className="text-white">20 Mins</b></div>
                                <div className="flex justify-between"><span>Reward</span><b className="text-[#34d399]">+200 XP</b></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                              <button
                                onClick={() => triggerTestConfirmModal(`${sub} — Mastery Set`, sub, 'Medium')}
                                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#8b7cf0] hover:from-[#7c6df7] hover:to-[#9b8cf0] text-white font-bold font-mono text-xs shadow-lg shadow-[#6c5ce7]/30 transition-all hover:-translate-y-0.5"
                              >
                                Practice
                              </button>
                              <button
                                onClick={() => triggerScheduleModal(`${sub} — Mastery Set`, 'Module Blitz', currentCourse.title)}
                                title="Schedule Practice"
                                className="w-10 h-10 rounded-xl bg-white/[0.045] border border-white/10 hover:bg-[#6c5ce7]/20 hover:border-[#8b7cf0]/50 text-[#8b7cf0] hover:text-white flex items-center justify-center transition-all"
                              >
                                <CalendarPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 2: STUDY MATERIAL */}
                      {activeTab === 'study' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                          {/* Study 1 */}
                          <div className="p-5 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-[#8b7cf0] hover:shadow-2xl hover:shadow-[#8b7cf0]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-[#6c5ce7]/15 text-[#8b7cf0]">STUDY MATERIAL</span>
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">PDF DOC</span>
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-white group-hover:text-[#8b7cf0] transition-colors leading-snug">{sub} &mdash; Concept Notes</h4>
                                <p className="text-[11px] text-white/40 font-mono mt-1">{currentCourse.title} &bull; {currentTopic.title}</p>
                              </div>
                              <div className="space-y-2 text-xs font-mono text-white/60 pt-3 border-t border-white/10">
                                <div className="flex justify-between"><span>Format</span><b className="text-white">PDF File</b></div>
                                <div className="flex justify-between"><span>Pages</span><b className="text-white">12 Pages</b></div>
                                <div className="flex justify-between"><span>Read Time</span><b className="text-white">15 Mins</b></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                              <button
                                onClick={() => openDocumentViewer(`${sub} Concept Notes`, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'pdf')}
                                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-[#6c5ce7] text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#8b7cf0]" /> Read
                              </button>
                              <button
                                onClick={() => triggerScheduleModal(`${sub} — Concept Notes`, 'Study Material', currentCourse.title)}
                                title="Schedule Study"
                                className="w-10 h-10 rounded-xl bg-white/[0.045] border border-white/10 hover:bg-[#6c5ce7]/20 hover:border-[#8b7cf0]/50 text-[#8b7cf0] hover:text-white flex items-center justify-center transition-all"
                              >
                                <CalendarPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Study 2 */}
                          <div className="p-5 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-[#8b7cf0] hover:shadow-2xl hover:shadow-[#8b7cf0]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-[#6c5ce7]/15 text-[#8b7cf0]">CHEATSHEET</span>
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">DOCX DOC</span>
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-white group-hover:text-[#8b7cf0] transition-colors leading-snug">{sub} &mdash; Formula Sheet</h4>
                                <p className="text-[11px] text-white/40 font-mono mt-1">{currentCourse.title} &bull; {currentTopic.title}</p>
                              </div>
                              <div className="space-y-2 text-xs font-mono text-white/60 pt-3 border-t border-white/10">
                                <div className="flex justify-between"><span>Format</span><b className="text-white">Word Doc</b></div>
                                <div className="flex justify-between"><span>Type</span><b className="text-white">Cheatsheet</b></div>
                                <div className="flex justify-between"><span>Recap Time</span><b className="text-white">10 Mins</b></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                              <button
                                onClick={() => openDocumentViewer(`${sub} Formula Sheet`, 'https://calibre-ebook.com/downloads/demos/demo.docx', 'doc')}
                                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-[#6c5ce7] text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                              >
                                <FileDown className="w-3.5 h-3.5 text-[#8b7cf0]" /> Open Doc
                              </button>
                              <button
                                onClick={() => triggerScheduleModal(`${sub} — Formula Sheet`, 'Study Material', currentCourse.title)}
                                title="Schedule Study"
                                className="w-10 h-10 rounded-xl bg-white/[0.045] border border-white/10 hover:bg-[#6c5ce7]/20 hover:border-[#8b7cf0]/50 text-[#8b7cf0] hover:text-white flex items-center justify-center transition-all"
                              >
                                <CalendarPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Study 3 */}
                          <div className="p-5 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-[#8b7cf0] hover:shadow-2xl hover:shadow-[#8b7cf0]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-[#6c5ce7]/15 text-[#8b7cf0]">MINDMAP</span>
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">VISUAL PDF</span>
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-white group-hover:text-[#8b7cf0] transition-colors leading-snug">{sub} &mdash; Mindmap</h4>
                                <p className="text-[11px] text-white/40 font-mono mt-1">{currentCourse.title} &bull; {currentTopic.title}</p>
                              </div>
                              <div className="space-y-2 text-xs font-mono text-white/60 pt-3 border-t border-white/10">
                                <div className="flex justify-between"><span>Format</span><b className="text-white">Visual PDF</b></div>
                                <div className="flex justify-between"><span>Type</span><b className="text-white">Mindmap</b></div>
                                <div className="flex justify-between"><span>Read Time</span><b className="text-white">8 Mins</b></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                              <button
                                onClick={() => openDocumentViewer(`${sub} Mindmap`, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'pdf')}
                                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-[#6c5ce7] text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#8b7cf0]" /> Mindmap
                              </button>
                              <button
                                onClick={() => triggerScheduleModal(`${sub} — Mindmap`, 'Study Material', currentCourse.title)}
                                title="Schedule Study"
                                className="w-10 h-10 rounded-xl bg-white/[0.045] border border-white/10 hover:bg-[#6c5ce7]/20 hover:border-[#8b7cf0]/50 text-[#8b7cf0] hover:text-white flex items-center justify-center transition-all"
                              >
                                <CalendarPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Study 4 */}
                          <div className="p-5 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-[#8b7cf0] hover:shadow-2xl hover:shadow-[#8b7cf0]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 group">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-[#6c5ce7]/15 text-[#8b7cf0]">WORKBOOK</span>
                                <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30">PDF BOOK</span>
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-white group-hover:text-[#8b7cf0] transition-colors leading-snug">{sub} &mdash; Solved Workbook</h4>
                                <p className="text-[11px] text-white/40 font-mono mt-1">{currentCourse.title} &bull; {currentTopic.title}</p>
                              </div>
                              <div className="space-y-2 text-xs font-mono text-white/60 pt-3 border-t border-white/10">
                                <div className="flex justify-between"><span>Format</span><b className="text-white">PDF Book</b></div>
                                <div className="flex justify-between"><span>Pages</span><b className="text-white">25 Pages</b></div>
                                <div className="flex justify-between"><span>Study Time</span><b className="text-white">30 Mins</b></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                              <button
                                onClick={() => openDocumentViewer(`${sub} Solved Workbook`, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'pdf')}
                                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-[#6c5ce7] text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#8b7cf0]" /> Workbook
                              </button>
                              <button
                                onClick={() => triggerScheduleModal(`${sub} — Solved Workbook`, 'Study Material', currentCourse.title)}
                                title="Schedule Study"
                                className="w-10 h-10 rounded-xl bg-white/[0.045] border border-white/10 hover:bg-[#6c5ce7]/20 hover:border-[#8b7cf0]/50 text-[#8b7cf0] hover:text-white flex items-center justify-center transition-all"
                              >
                                <CalendarPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Explore Other Topics Section */}
        <div className="pt-10 space-y-5 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Explore Other Topics in {currentCourse.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {currentCourse.topics
              .filter(t => t.slug !== currentTopic.slug)
              .map(t => (
                <button
                  key={t.slug}
                  onClick={() => setSelectedTopicSlug(t.slug)}
                  className="p-6 rounded-2xl bg-[#141420] border border-white/10 hover:border-[#8b7cf0] hover:shadow-[0_16px_36px_rgba(0,0,0,0.4),0_0_25px_rgba(108,92,231,0.3)] hover:-translate-y-1.5 transition-all duration-300 text-left group flex flex-col justify-between min-h-[140px]"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-wider">TOPIC</span>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#8b7cf0] transition-colors mt-1">{t.title}</h4>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-xs font-mono font-bold text-[#8b7cf0]">
                    <span>View Modules</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </button>
              ))}
          </div>
        </div>

      </div>

      {/* Schedule Modal Component */}
      <MockScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        test={scheduleTestItem}
        onConfirmSchedule={handleConfirmSchedule}
      />

      {/* Confirm Test Start Modal Component */}
      <MockConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        test={confirmTestItem}
        onStartSession={() => {
          setIsConfirmOpen(false);
          window.location.href = '/mock-test-session';
        }}
      />

      {/* Document Viewer Modal */}
      {viewerModal?.isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setViewerModal(null)} />
          <div className="relative w-full max-w-4xl h-[85vh] bg-[#12121e] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl z-10">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3 text-white font-bold">
                <FileText className="w-5 h-5 text-[#8b7cf0]" />
                <span>{viewerModal.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={viewerModal.url}
                  download
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                >
                  <FileDown className="w-3.5 h-3.5" /> Download
                </a>
                <button
                  onClick={() => setViewerModal(null)}
                  className="p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-white/5 flex items-center justify-center p-4">
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(viewerModal.url)}&embedded=true`}
                className="w-full h-full rounded-xl border border-white/10"
                title={viewerModal.title}
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
