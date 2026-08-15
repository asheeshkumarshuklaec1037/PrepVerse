import React from 'react';

interface MockModeCardProps {
  icon: string;
  title: string;
  description: string;
  image: string;
  btnText: string;
  btnColor: 'orange' | 'blue' | 'purple';
  onClick: () => void;
}

export const MockModeCard: React.FC<MockModeCardProps> = ({
  icon,
  title,
  description,
  image,
  btnText,
  btnColor,
  onClick,
}) => {
  const btnColorStyles = {
    orange: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold shadow-amber-500/20',
    blue: 'bg-gradient-to-r from-[#38bdf8] to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold shadow-blue-500/20',
    purple: 'bg-gradient-to-r from-[#8b7cf0] to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-extrabold shadow-purple-500/20',
  };

  return (
    <div className="p-6 rounded-3xl bg-[#0f111a]/80 backdrop-blur-xl border border-white/[0.08] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#8b7cf0] hover:shadow-[0_12px_32px_rgba(139,124,240,0.25),0_0_20px_rgba(108,92,231,0.35)] prepverse-card-hover group">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
        </div>
        <p className="text-xs text-gray-400 font-medium leading-relaxed mb-4">
          {description}
        </p>
      </div>

      <div className="space-y-4">
        {/* Card Image */}
        <div className="w-full h-36 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Action Button */}
        <button
          onClick={onClick}
          className={`w-full py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer hover:scale-[1.02] ${btnColorStyles[btnColor]}`}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};
