import React, { useMemo } from 'react';
import type { CandidateProfile } from '../../types/dashboard';
import { ShieldCheck, Info } from 'lucide-react';

interface CandidateOverviewProps {
  profile: CandidateProfile;
  onOpenSystemManual: () => void;
}

export const CandidateOverview: React.FC<CandidateOverviewProps> = ({
  profile,
  onOpenSystemManual,
}) => {
  // Dynamic Time of Day calculation matching Django dashboard.html lines 1370-1408
  const timeOfDayConfig = useMemo(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return {
        greeting: 'Good Morning',
        subtitle: "Wake up, refresh your mind, and get ready to solve today's challenge!",
        bgImage: '/static/images/morning-sunrise.jpg',
      };
    } else if (hours < 17) {
      return {
        greeting: 'Good Afternoon',
        subtitle: 'Stay consistent! Practice reasoning or review placement charts.',
        bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
      };
    } else {
      return {
        greeting: 'Good Evening',
        subtitle: 'Wrapping up the day? Verify formulas and check today\'s targets.',
        bgImage: '/static/images/evening-11.jpg',
      };
    }
  }, []);

  return (
    <div className="relative w-full">
      {/* 1. Full-Width Bleed Edge-To-Edge Cover Hero Banner */}
      <div className="relative w-full h-[280px] sm:h-[320px] overflow-hidden bg-[#0a0a0d]">
        <img
          src={timeOfDayConfig.bgImage}
          alt="Profile Cover Hero"
          className="w-full h-full object-cover filter brightness-[0.68] scale-105 transition-transform duration-1000 ease-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#08090e] pointer-events-none" />

        {/* Floating Category Badge */}
        <span className="absolute top-6 left-6 sm:left-12 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5 z-10 shadow-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
          PrepVerse Premium Candidate
        </span>
      </div>

      {/* 2. Profile Info Static Card (Crystal High-Transparency Glass Card showing cover image clearly) */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 -mt-24 sm:-mt-28 p-6 sm:p-8 rounded-3xl bg-[#121317]/10 backdrop-blur-[3px] border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.2)]">
          {/* Info Guide Icon Button */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
            <button
              onClick={onOpenSystemManual}
              title="View System Guide & XP Manual"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-cyan-500/20 border border-white/20 hover:border-cyan-400/50 text-cyan-400 flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer hover:scale-110"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            {/* Vertically Centered Profile Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#0B1020] overflow-hidden bg-gradient-to-tr from-[#8b5cf6] to-[#3b82f6] shadow-xl flex-shrink-0 relative z-10 my-auto">
              <img
                className="w-full h-full object-cover"
                src={profile.avatarUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
              />
            </div>

            {/* User Details & XP Bar */}
            <div className="w-full my-auto space-y-2">
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {timeOfDayConfig.greeting}, {profile.firstName}! 👋
                </h1>
                <span className="bg-gradient-to-r from-purple-500 to-indigo-500 font-extrabold text-[10px] px-3 py-1 rounded-full text-white uppercase tracking-wider shadow-md">
                  Level {profile.level}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                {timeOfDayConfig.subtitle} You are currently in the top <strong className="text-emerald-400">12%</strong> of candidates this week.
              </p>

              {/* XP Progress inside Header */}
              <div className="pt-2 flex items-center gap-3 w-full max-w-sm mx-auto md:mx-0">
                <div className="flex-1 bg-white/10 border border-white/15 h-3 rounded-full overflow-hidden p-[1px]">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-purple-400 to-emerald-400"
                    style={{ width: `${(profile.currentXp / profile.requiredXp) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] font-black text-[#2af598] whitespace-nowrap font-mono">
                  {profile.currentXp} / {profile.requiredXp} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
