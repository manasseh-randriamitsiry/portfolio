import React from 'react';
import { SKILLS } from '../constants';

export const SkillsSection: React.FC = () => {
  const mobileSkills = SKILLS.filter(s => s.category === 'mobile');
  const backendSkills = SKILLS.filter(s => s.category === 'backend' || s.category === 'tool');

  const SkillBadge = ({ name, icon, color, highlight }: any) => (
    <div className={`px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-slate-100 font-medium flex items-center gap-2 hover:bg-primary/5 dark:hover:bg-blue-500/10 hover:border-primary/30 dark:hover:border-blue-400/40 transition-all cursor-default ${highlight ? 'ring-1 ring-primary/20 dark:ring-blue-400/30' : ''}`}>
      {icon && (
        <span className={`material-icons-round text-lg ${color || 'text-gray-500 dark:text-slate-400'}`}>
          {icon}
        </span>
      )}
      {!icon && name === 'Dart' && <span className="text-blue-500 dark:text-blue-400 font-bold text-lg">D</span>}
      {name}
    </div>
  );

  return (
    <div className="md:col-span-7 lg:col-span-8 bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30">
      <div className="flex items-center gap-3 mb-6">
        <span className="p-2 bg-primary/10 dark:bg-blue-500/20 rounded-xl text-primary dark:text-blue-400">
          <span className="material-icons-round">construction</span>
        </span>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Technical Arsenal</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">Tools & Technologies I work with daily</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mobile Stack */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3 ml-1">Mobile Development</h3>
          <div className="flex flex-wrap gap-2">
            {mobileSkills.map(skill => (
              <SkillBadge key={skill.name} {...skill} />
            ))}
          </div>
        </div>

        {/* Backend Stack */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3 ml-1">Backend & DevOps</h3>
          <div className="flex flex-wrap gap-2">
            {backendSkills.map(skill => (
              <SkillBadge key={skill.name} {...skill} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Mini Featured Project */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">Featured Project</h3>
           <button className="text-primary dark:text-blue-400 text-sm flex items-center hover:underline">
             View Details <span className="material-icons-round text-sm ml-1">arrow_forward</span>
           </button>
        </div>
        <div className="bg-primary/5 dark:bg-blue-500/10 rounded-2xl p-4 flex gap-4 items-center border border-primary/10 dark:border-blue-500/20">
          <div className="w-16 h-16 rounded-xl bg-primary/20 dark:bg-blue-500/20 flex items-center justify-center shrink-0 text-primary dark:text-blue-400">
            <span className="material-icons-round text-3xl">shopping_bag</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">E-Commerce Mobile App</h4>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">A full-featured shopping app built with Flutter & Symfony backend. Includes payment gateway.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
