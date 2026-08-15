import React from 'react';
import type { UpcomingEvent } from '../../types/dashboard';
import { Card } from '../ui/Card';
import { CalendarDays, Clock, Radio } from 'lucide-react';

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <Card variant="glass" className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Upcoming Events</h3>
              <p className="text-xs text-gray-400">Mock tests & live challenge schedule</p>
            </div>
          </div>

          <span className="text-xs text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 font-semibold">
            {events.length} Scheduled
          </span>
        </div>

        <div className="space-y-3">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center gap-3 transition-all"
            >
              {/* Date Box */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-purple-600/30 to-indigo-600/30 border border-purple-500/30 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-sm font-extrabold text-white leading-none">{evt.day}</span>
                <span className="text-[10px] uppercase font-bold text-purple-300 leading-none mt-0.5">
                  {evt.month}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-semibold text-white truncate">{evt.title}</h4>
                  {evt.isLive && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                      <Radio className="w-2.5 h-2.5 animate-pulse" /> LIVE
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{evt.info}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] text-xs text-gray-400 flex justify-between items-center">
        <span>Syncs automatically with Exam Track</span>
        <button
          onClick={() => {
            window.location.href = '/calendar/';
          }}
          className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
        >
          View Calendar →
        </button>
      </div>
    </Card>
  );
};
