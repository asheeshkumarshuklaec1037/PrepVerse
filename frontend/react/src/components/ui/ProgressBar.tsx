import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  height?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'from-purple-500 to-indigo-500',
  height = 'h-2',
  showLabel = false,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5 font-medium">
          <span>Progress</span>
          <span className="text-white font-semibold">{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-white/[0.08] rounded-full overflow-hidden ${height} p-[1px]`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${color}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
