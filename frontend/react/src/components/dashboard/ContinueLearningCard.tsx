import React, { useState } from 'react';
import type { ContinueLearningPath, FocusTask } from '../../types/dashboard';
import { Card } from '../ui/Card';
import { ArrowRight, Check } from 'lucide-react';

interface ContinueLearningCardProps {
  data: ContinueLearningPath;
  tasks?: FocusTask[];
}

export const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({ data, tasks: initialTasks }) => {
  const [tasks, setTasks] = useState<FocusTask[]>(initialTasks || [
    { id: '1', title: 'Revise: SQL Joins & Subqueries', estimatedTimeMinutes: 15, completed: true, category: 'DBMS' },
    { id: '2', title: 'Practice: 10 Aptitude MCQs — Time & Work', estimatedTimeMinutes: 20, completed: false, category: 'Aptitude' },
    { id: '3', title: 'Attempt: Full-length Mock Test #7', estimatedTimeMinutes: 60, completed: false, category: 'Mock' },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <Card variant="glass" className="h-full flex flex-col justify-between p-0 overflow-hidden bg-[#0a0a0f] border-white/[0.08]">
      {/* Top Continue Learning Section (Full Bleed Inner Container Matching Screenshot 1:1) */}
      <div className="relative w-full p-6 sm:p-7 bg-[#141420]/80 border-b border-white/[0.08]">
        {/* Top-Right Glow Accent */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#6c5ce7]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Path Crumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-3 relative z-10">
          <span>Courses</span>
          <span className="text-white/20">/</span>
          <span>{data.moduleName}</span>
          <span className="text-white/20">/</span>
          <span>{data.topicName}</span>
          <span className="text-white/20">/</span>
          <span className="text-[#8b7cf0] font-bold">{data.setName}</span>
        </div>

        {/* Title & Resume Button */}
        <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Continue: {data.setName}
            </h2>
            <p className="text-xs text-gray-400 font-medium mt-1">
              {data.topicName} · {data.courseName}
            </p>
          </div>

          <button
            onClick={() => {
              window.location.href = '/courses/';
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#e5e5ea] hover:bg-white text-black font-extrabold text-xs shadow-md transition-all flex-shrink-0 cursor-pointer hover:translate-x-1"
          >
            <span>Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar & Meta (Spanning 100% Full Width across the header) */}
        <div className="space-y-2 relative z-10">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#8b7cf0]"
              style={{ width: `${data.progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-mono text-gray-400 font-medium">
            <span>{data.completedQuestions} / {data.totalQuestions} questions</span>
            <span className="text-gray-300 font-bold">{data.progressPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Focus List (Today's Plan) Section */}
      <div className="p-6 sm:p-7 space-y-3.5 bg-[#0a0a0f]">
        <div className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold mb-2">
          TODAY'S PLAN · 3 TASKS · ~50 MIN
        </div>

        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all cursor-pointer select-none ${
              task.completed
                ? 'bg-white/[0.02] border-white/[0.05] text-gray-500'
                : 'bg-white/[0.04] hover:bg-white/[0.07] border-white/[0.08] text-white hover:border-white/20 hover:translate-x-1'
            }`}
          >
            <div className="flex items-center gap-3.5 pr-2 min-w-0">
              <div
                className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all ${
                  task.completed
                    ? 'bg-[#00b894] border-[#00b894] text-black font-bold'
                    : 'border-white/30'
                }`}
              >
                {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className={`text-xs sm:text-sm font-semibold truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                {task.title}
              </span>
            </div>
            <span className="text-xs font-mono text-gray-400 font-bold flex-shrink-0">
              {task.estimatedTimeMinutes} MIN
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
