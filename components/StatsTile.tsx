import React from 'react';

export const StatsTile: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {/* Experience Years Card - Blue */}
      <div className="bg-primary text-on-primary rounded-[2rem] p-5 flex flex-col justify-between aspect-[4/5] md:aspect-auto md:h-48 relative overflow-hidden group shadow-lg shadow-primary/20">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
          <span className="material-icons-round text-white">terminal</span>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-1">5+</h2>
          <p className="text-on-primary/80 text-xs font-medium">Years Exp.</p>
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
      </div>

      {/* Projects Built Card - White/Dark */}
      <div className="bg-surface-container border border-outline-variant/20 shadow-sm rounded-[2rem] p-5 flex flex-col justify-between aspect-[4/5] md:aspect-auto md:h-48 relative overflow-hidden group">
        <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container transition-colors">
          <span className="material-icons-round">rocket_launch</span>
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-1">42</h2>
          <p className="text-on-surface-variant text-xs font-medium">Projects Built</p>
        </div>
        {/* Subtle glow effect on hover */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
};
