import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'cyan' | 'green' | 'amber' | 'rose' | 'neutral';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'sm',
  icon,
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1 font-semibold',
    md: 'text-xs px-3 py-1 gap-1.5 font-semibold',
  };

  const variantStyles = {
    purple: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
    green: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
    neutral: 'bg-white/10 text-gray-300 border border-white/15',
  };

  return (
    <span className={`inline-flex items-center rounded-full tracking-wide ${sizeStyles[size]} ${variantStyles[variant]}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
