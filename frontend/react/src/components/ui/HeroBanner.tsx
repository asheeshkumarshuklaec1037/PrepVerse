import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeroBannerProps {
  bgImage: string;
  badgeText?: string;
  badgeColor?: 'green' | 'purple';
  title: string;
  description: string;
  backText?: string;
  onBack?: () => void;
  backUrl?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  bgImage,
  badgeText = 'FREE COURSE',
  badgeColor = 'purple',
  title,
  description,
  backText = 'BACK TO COURSES',
  onBack,
  backUrl,
}) => {
  return (
    <div className="relative w-full h-[55vh] min-h-[440px] overflow-hidden bg-[#08080b] flex flex-col items-center justify-center text-center">
      {/* Background Image with slow zoom animation */}
      <img
        src={bgImage}
        alt={`${title} Background`}
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] contrast-120 animate-hero-bg pointer-events-none"
      />

      {/* Global Vignette Overlay & Soft Top/Bottom Blends */}
      <div className="global-hero-vignette" />

      {/* Back Navigation Link */}
      {onBack ? (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 sm:left-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2 z-30 transition-all hover:-translate-x-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {backText}
        </button>
      ) : backUrl ? (
        <a
          href={backUrl}
          className="absolute top-6 left-6 sm:left-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2 z-30 transition-all hover:-translate-x-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {backText}
        </a>
      ) : null}

      {/* Hero Centered Content Box */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6 space-y-4 -mt-8 hero-entrance-fade hero-entrance-delay-1">
        {badgeText && (
          <div
            className={`inline-block px-4 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
              badgeColor === 'green'
                ? 'bg-[#2af598]/10 border border-[#2af598]/25 text-[#2af598] shadow-[0_0_15px_rgba(42,245,152,0.15)]'
                : 'bg-[#8b7cf0]/15 border border-[#8b7cf0]/30 text-[#8b7cf0] shadow-[0_0_15px_rgba(139,124,240,0.2)]'
            }`}
          >
            {badgeText}
          </div>
        )}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white uppercase tracking-tight leading-none drop-shadow-2xl text-center">
          {title}
        </h1>
        <p className="text-base sm:text-xl text-gray-200 font-light leading-relaxed max-w-3xl mx-auto opacity-90 text-center">
          {description}
        </p>
      </div>
    </div>
  );
};
