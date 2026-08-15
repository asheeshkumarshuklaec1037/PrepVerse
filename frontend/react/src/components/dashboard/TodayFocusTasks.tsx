import React, { useState } from 'react';
import type { FocusTask } from '../../types/dashboard';
import { Card } from '../ui/Card';
import { CheckCircle2, Circle, Clock, Target, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TodayFocusTasksProps {
  initialTasks: FocusTask[];
}

export const TodayFocusTasks: React.FC<TodayFocusTasksProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<FocusTask[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <Card variant="glass" className="h-full flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Today's Focus Zone</h3>
              <p className="text-xs text-gray-400">Recommended daily preparation goals</p>
            </div>
          </div>

          <span className="text-xs font-semibold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
            {completedCount} / {tasks.length} Done
          </span>
        </div>

        {/* Task Items List */}
        <div className="space-y-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                  task.completed
                    ? 'bg-white/[0.02] border-white/[0.05] opacity-60'
                    : 'bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08] text-white'
                }`}
              >
                <div className="flex items-center gap-3 pr-2">
                  <button className="text-purple-400 focus:outline-none flex-shrink-0">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 hover:text-purple-400" />
                    )}
                  </button>
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-200'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 flex-shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{task.estimatedTimeMinutes} min</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-between items-center text-xs text-gray-400">
        <span>Click tasks to mark progress</span>
        <button
          onClick={() => {
            const newTitle = prompt('Enter a new task focus goal:');
            if (newTitle) {
              setTasks((prev) => [
                ...prev,
                {
                  id: `task-${Date.now()}`,
                  title: newTitle,
                  estimatedTimeMinutes: 15,
                  completed: false,
                  category: 'Custom',
                },
              ]);
            }
          }}
          className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Task
        </button>
      </div>
    </Card>
  );
};
