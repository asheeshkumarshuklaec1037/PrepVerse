import React, { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { mockDashboardData } from '../../data/mockDashboardData';
import { mockSubjects, mockPapersCatalog, type MockPaper } from '../../data/mockTestData';
import { MockModeCard } from '../../components/mock/MockModeCard';
import { MockWorkspace } from '../../components/mock/MockWorkspace';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ArrowLeft, LineChart, History, Calendar as CalendarIcon, Trophy, ArrowRight } from 'lucide-react';

export const MockTestsPage: React.FC = () => {
  useScrollReveal();

  const [activeModeNum, setActiveModeNum] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [papers] = useState<MockPaper[]>(mockPapersCatalog);

  const handleOpenMode = (modeNum: number) => {
    setActiveModeNum(modeNum);
    const defaultSub = mockSubjects[0];
    setSelectedSubject(defaultSub.name);
    if (modeNum !== 3) {
      setSelectedTopic(defaultSub.topics[0]?.name || '');
      if (modeNum === 1) {
        setSelectedModule(defaultSub.topics[0]?.modules[0] || '');
      }
    }
  };

  const handleSubjectChange = (sub: string) => {
    setSelectedSubject(sub);
    const subObj = mockSubjects.find((s) => s.name === sub);
    if (subObj && subObj.topics.length > 0) {
      setSelectedTopic(subObj.topics[0].name);
      if (activeModeNum === 1) {
        setSelectedModule(subObj.topics[0].modules[0] || '');
      }
    } else {
      setSelectedTopic('');
      setSelectedModule('');
    }
  };

  const handleTopicChange = (top: string) => {
    setSelectedTopic(top);
    const subObj = mockSubjects.find((s) => s.name === selectedSubject);
    if (subObj) {
      const topObj = subObj.topics.find((t) => t.name === top);
      if (topObj && topObj.modules.length > 0) {
        setSelectedModule(topObj.modules[0]);
      } else {
        setSelectedModule('');
      }
    }
  };

  const handleSelectPaper = (paper: MockPaper) => {
    alert(`Launching ${paper.name} under ${selectedSubject} - ${selectedTopic || 'All Topics'}`);
  };

  const handleSchedulePaper = (paper: MockPaper) => {
    alert(`Scheduled ${paper.name} for upcoming session.`);
  };

  const getModeTitle = (modeNum: number) => {
    if (modeNum === 1) return 'Module Blitz Parameters Configuration';
    if (modeNum === 2) return 'Topic Master Parameters Configuration';
    return 'Subject Marathon Parameters Configuration';
  };

  return (
    <DashboardLayout profile={mockDashboardData.profile}>
      <div className="space-y-8">
        {/* 1. Full Bleed Edge-To-Edge Cover Hero Banner */}
        <div className="relative w-full h-[320px] sm:h-[380px] overflow-hidden bg-[#08080b] flex items-center justify-center">
          <img
            src="/static/images/smarter_prep_tablet.jpg"
            alt="Mock Test Arena Background"
            className="w-full h-full object-cover filter brightness-[0.65] animate-hero-bg pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#08090e] pointer-events-none" />

          {/* Back to Dashboard Link */}
          <a
            href="/dashboard/"
            className="absolute top-6 left-6 sm:left-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2 z-10 transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </a>

          {/* Hero Content */}
          <div className="relative z-10 text-center max-w-3xl px-4 space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70">
              Mock Test Arena
            </h1>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
              Attend simulated placement exams, module drills, and topic challenges to boost speed and accuracy.
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

        {/* Rest of Page inside max-w-[1320px] Container */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-6">
          {/* 2. Top Row: Three Test Mode Cards (Module Blitz, Topic Master, Subject Marathon) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal reveal-delay-1">
            <MockModeCard
              icon="🧩"
              title="Single Module Drill (Module Blitz)"
              description="Focus deeply on a single, isolated module within a topic. Perfect for practicing specific weak areas."
              image="/static/images/drill_exam_card.jpg"
              btnText="Start Module Drill"
              btnColor="orange"
              onClick={() => handleOpenMode(1)}
            />
            <MockModeCard
              icon="📋"
              title="Complete Topic Test (Topic Master)"
              description="Covers all modules under a selected topic category. Ideal for testing cumulative knowledge."
              image="/static/images/full_test_card.jpg"
              btnText="Start Topic Test"
              btnColor="blue"
              onClick={() => handleOpenMode(2)}
            />
            <MockModeCard
              icon="🏆"
              title="Full Subject Marathon (Subject Test)"
              description="A comprehensive, full-length mock test covering all topics and modules inside a major subject."
              image="/static/images/marathon_card.jpg"
              btnText="Start Subject Marathon"
              btnColor="purple"
              onClick={() => handleOpenMode(3)}
            />
          </div>

          {/* 3. Interactive Parameters Configuration Workspace */}
          {activeModeNum && (
            <div className="reveal">
              <MockWorkspace
                modeNum={activeModeNum}
                currentModeTitle={getModeTitle(activeModeNum)}
                subjects={mockSubjects}
                selectedSubject={selectedSubject}
                selectedTopic={selectedTopic}
                selectedModule={selectedModule}
                onSubjectChange={handleSubjectChange}
                onTopicChange={handleTopicChange}
                onModuleChange={setSelectedModule}
                papers={papers}
                onSelectPaper={handleSelectPaper}
                onSchedulePaper={handleSchedulePaper}
              />
            </div>
          )}

          {/* 4. Bottom Grid: History, Calendar, and Stress Analytics side-by-side matching Django mock_tests.html */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 reveal reveal-delay-2">
            {/* Column 1: Exam History */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0f111a] border border-white/10 flex flex-col justify-between prepverse-card-hover">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <History className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">Exam History</h3>
                </div>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Boost your career with our skill assessments. Showcase your expertise and track completed sessions.
                </p>
                <div className="w-full h-36 rounded-2xl overflow-hidden bg-black/40 border border-white/10 mb-4">
                  <img
                    src="/static/images/exam_history_card.jpg"
                    alt="Exam History"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <a
                href="/mock-history/"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Check Detailed History</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Column 2: Calendar Agenda */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0f111a] border border-white/10 flex flex-col justify-between prepverse-card-hover">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CalendarIcon className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base font-bold text-white">August Schedule</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Full Test Marathon</h4>
                      <p className="text-[11px] text-gray-400">Standard Marathon Mock</p>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#38bdf8]">08:00 AM</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Drill Exam Sprint</h4>
                      <p className="text-[11px] text-gray-400">Interactive Practice</p>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#2af598]">06:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 text-xs text-gray-400 font-mono">
                Next test session in 2 hours
              </div>
            </div>

            {/* Column 3: Stress Endurance */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0f111a] border border-white/10 flex flex-col justify-between prepverse-card-hover">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span>Stress Endurance</span>
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Needs Improvement
                  </span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex justify-between text-gray-300 font-bold">
                      <span>1st Attempt</span>
                      <span>01hr 11mins</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-rose-500/30 overflow-hidden flex">
                      <div className="h-full bg-emerald-400" style={{ width: '40%' }} />
                      <div className="h-full bg-rose-500" style={{ width: '60%' }} />
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-emerald-400">40% Ok</span>
                      <span className="text-rose-400">60% Fail</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 text-xs text-gray-400 font-mono">
                Target &gt;75% score on next attempt
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
