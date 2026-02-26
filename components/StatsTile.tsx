import React from 'react';
import { motion } from 'framer-motion';

export const StatsTile: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-10">
      {/* Experience Years Card - Blue */}
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="glass-panel shadow-sm rounded-ios-lg p-6 flex flex-col justify-between aspect-[4/5] md:aspect-auto md:h-52 relative overflow-hidden group border border-outline-variant/20"
      >
        <div className="w-12 h-12 bg-secondary-container/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-sm border border-outline-variant/20">
          <span className="material-icons-round">terminal</span>
        </div>
        <div className="relative z-10 mt-4">
          <h2 className="text-5xl md:text-6xl font-black text-on-surface mb-1 tracking-tight">5+</h2>
          <p className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider">Years Exp.</p>
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out blur-[2px]"></div>
      </motion.div>

      {/* Projects Built Card - Glass */}
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="glass-panel shadow-sm rounded-ios-lg p-6 flex flex-col justify-between aspect-[4/5] md:aspect-auto md:h-52 relative overflow-hidden group border border-outline-variant/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/10 dark:to-white/0 pointer-events-none rounded-ios-lg"></div>
        <div className="w-12 h-12 bg-secondary-container/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-sm border border-outline-variant/20">
          <span className="material-icons-round">rocket_launch</span>
        </div>
        <div className="relative z-10 mt-4">
          <h2 className="text-5xl md:text-6xl font-black text-on-surface mb-1 tracking-tight">42</h2>
          <p className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider">Projects Built</p>
        </div>
        {/* Subtle glow effect on hover */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      </motion.div>
    </div>
  );
};
