import React, { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { mockDashboardData } from '../../data/mockDashboardData';
import { CandidateOverview } from '../../components/dashboard/CandidateOverview';
import { ContinueLearningCard } from '../../components/dashboard/ContinueLearningCard';
import { ReadinessTerminalCard } from '../../components/dashboard/ReadinessTerminalCard';
import { PerformanceAnalytics } from '../../components/dashboard/PerformanceAnalytics';
import { WeakTopicsCard } from '../../components/dashboard/WeakTopicsCard';
import { ConsistencyCalendar } from '../../components/dashboard/ConsistencyCalendar';
import { UpcomingEvents } from '../../components/dashboard/UpcomingEvents';
import { TopicMastery } from '../../components/dashboard/TopicMastery';
import { RankStandingCard } from '../../components/dashboard/RankStandingCard';
import { SubjectPracticeGrid } from '../../components/dashboard/SubjectPracticeGrid';
import { SystemManualModal } from '../../components/dashboard/SystemManualModal';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const DashboardPage: React.FC = () => {
  const [data] = useState(mockDashboardData);
  const [isSystemManualOpen, setIsSystemManualOpen] = useState(false);

  // Initialize Site-Wide Standard PrepVerse Scroll Reveal Animation Observer
  useScrollReveal();

  return (
    <DashboardLayout profile={data.profile}>
      <div className="space-y-8">
        {/* 1. Full-Bleed Edge-to-Edge Candidate Hero Overview */}
        <div className="animate-page-fade-in" style={{ animationDelay: '0.1s' }}>
          <CandidateOverview
            profile={data.profile}
            onOpenSystemManual={() => setIsSystemManualOpen(true)}
          />
        </div>

        {/* Rest of Dashboard Bento Grid Cards inside Container (matching Django max-w-[1320px]) */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-6">
          {/* ============ 2. BENTO HERO (Continue Learning 1.75fr + Readiness Terminal 1fr) ============ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 reveal reveal-delay-1">
            <div className="lg:col-span-7">
              <ContinueLearningCard data={data.continueLearning} />
            </div>
            <div className="lg:col-span-5">
              <ReadinessTerminalCard />
            </div>
          </div>

          {/* ============ 3. FOCUS ZONE (Weak Topics) ============ */}
          <div className="reveal reveal-delay-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Focus zone</h3>
                <p className="text-xs text-gray-400 mt-0.5">Topics where you're losing the most marks — ranked by impact</p>
              </div>
              <a href="/courses/" className="text-xs font-semibold text-[#8b7cf0] hover:underline flex items-center gap-1">
                View full breakdown →
              </a>
            </div>
            <WeakTopicsCard topics={data.weakTopics} />
          </div>

          {/* ============ 4. ANALYTICS (Mock Performance Chart + Consistency Heatmap) ============ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 reveal reveal-delay-3">
            <div className="lg:col-span-7">
              <PerformanceAnalytics />
            </div>
            <div className="lg:col-span-5">
              <ConsistencyCalendar
                initialStreak={data.stats.currentStreak}
                data={data.consistencyHeatmap}
              />
            </div>
          </div>

          {/* ============ 5. UTILITY RAIL (Upcoming + Topic Mastery + Rank Standing) ============ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 reveal reveal-delay-4">
            <div className="lg:col-span-4">
              <UpcomingEvents events={data.upcomingEvents} />
            </div>
            <div className="lg:col-span-4">
              <TopicMastery items={data.topicMastery} />
            </div>
            <div className="lg:col-span-4">
              <RankStandingCard
                globalRank={data.stats.globalRank}
                level={data.profile.level}
                streak={data.stats.currentStreak}
              />
            </div>
          </div>

          {/* ============ 6. PRACTICE LAUNCHER (Practice by Subject) ============ */}
          <div className="reveal">
            <SubjectPracticeGrid subjects={data.subjects} />
          </div>
        </div>

        {/* System Manual Modal Dialog */}
        <SystemManualModal
          isOpen={isSystemManualOpen}
          onClose={() => setIsSystemManualOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
};
