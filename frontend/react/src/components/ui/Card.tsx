import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'accent' | 'flat';
  hoverEffect?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = true,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-2xl p-6 border relative overflow-hidden';
  
  const variantStyles = {
    default: 'bg-[#0f111a] border-white/[0.08] shadow-lg shadow-black/20',
    glass: 'bg-[#0f111a]/70 backdrop-blur-xl border-white/[0.1] shadow-xl',
    accent: 'bg-gradient-to-br from-[#161826] to-[#0f111a] border-purple-500/20 shadow-purple-500/5',
    flat: 'bg-[#121420]/50 border-white/[0.05]',
  };

  // Exact Django lift & purple glow hover effect
  const hoverStyles = hoverEffect ? 'prepverse-card-hover cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
