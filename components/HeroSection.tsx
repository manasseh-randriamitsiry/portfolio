import React from 'react';
import { ViewState } from '../types';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  setView: (view: ViewState) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setView }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      className="flex flex-col gap-6 md:gap-8 mb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Badge */}
      <motion.div variants={itemVariants} className="self-start inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 shadow-sm backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--md-sys-color-primary-rgb),0.8)]"></span>
        Available for Projects
      </motion.div>

      {/* Heading */}
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl md:text-[3.5rem] font-bold text-on-surface leading-[1.1] mb-4 tracking-tight">
          Randriamitsiry<br />
          Valimbavaka<br />
          <span className="text-primary bg-clip-text">Manassé</span>
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant/90 font-medium leading-relaxed max-w-md">
          FullStack Developer | Flutter, Symfony & React Expert crafting high-performance digital experiences.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 w-full md:w-auto mt-2">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setView('works')}
          className="h-14 px-8 bg-primary text-on-primary rounded-ios font-semibold text-base flex items-center justify-center gap-2 transition-shadow shadow-ios-soft hover:shadow-ios-heavy"
        >
          Explore Projects
          <span className="material-icons-round text-lg">arrow_forward</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/assets/resume-en.pdf';
            link.download = 'Manasseh_Resume_EN.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="h-14 px-8 glass-panel text-on-surface rounded-ios font-semibold text-base flex items-center justify-center gap-2 transition-shadow shadow-sm hover:shadow-md border border-outline-variant/30"
        >
          Download CV
          <span className="material-icons-round text-primary text-lg">download</span>
        </motion.button>
      </motion.div>

      {/* Tech Expertise Row */}
      <motion.div variants={itemVariants} className="mt-6 p-6 glass-panel rounded-ios-lg shadow-sm border border-outline-variant/20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-[40px] pointer-events-none"></div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center text-primary backdrop-blur-md border border-primary/10">
            <span className="material-icons-round text-sm">code</span>
          </div>
          <span className="font-bold text-on-surface text-sm uppercase tracking-wider">Tech Stack</span>
        </div>
        <div className="flex flex-wrap gap-2 relative z-10">
          {['Flutter', 'Symfony', 'React', 'Node.js', 'Tailwind'].map(tech => (
            <motion.span
              whileHover={{ scale: 1.05 }}
              key={tech}
              className="px-4 py-2 bg-surface/50 dark:bg-surface-variant/50 backdrop-blur-sm rounded-full text-xs font-semibold text-on-surface border border-outline-variant/30 hover:border-primary/50 transition-colors shadow-sm cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
