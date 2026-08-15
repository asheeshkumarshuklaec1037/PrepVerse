import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Trophy, Award, Zap, TrendingUp } from 'lucide-react';

interface RankStandingCardProps {
  globalRank: number;
  level: number;
  streak: number;
}

export const RankStandingCard: React.FC<RankStandingCardProps> = ({
  globalRank,
  level,
  streak,
}) => {
  return (
    <Card variant="accent" className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Rank & Tier Standing</h3>
              <p className="text-xs text-gray-400">Global leaderboard standing</p>
            </div>
          </div>

          <span className="text-xs font-bold text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
            Tier: Platinum
          </span>
        </div>

        {/* Big Rank Number */}
        <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-xl mb-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 uppercase font-semibold block">Current Global Rank</span>
            <div className="text-3xl font-extrabold text-white mt-1 flex items-center gap-2">
              #{globalRank.toLocaleString()}
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> Top 12%
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 block">Level</span>
            <span className="text-2xl font-bold text-purple-300">Lvl {level}</span>
          </div>
        </div>

        {/* How to Rank Up Checklist */}
        <div className="space-y-2 mb-4">
          <span className="text-xs font-semibold text-gray-300 block mb-2">How to rank up faster:</span>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Solve 15 daily questions (+50 XP)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Award className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>Maintain your {streak}-day active streak</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Trophy className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span>Score above 80% in weekly grand mocks</span>
          </div>
        </div>
      </div>

      <Button
        variant="secondary"
        fullWidth
        icon={<Trophy className="w-4 h-4 text-amber-400" />}
        onClick={() => {
          window.location.href = '/leaderboard/';
        }}
      >
        View Full Leaderboard
      </Button>
    </Card>
  );
};
