import React from 'react';
import { EXPERIENCES } from '../constants';

interface ExperienceSectionProps {
  onViewAll?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onViewAll }) => {
  return (
    <div className="md:col-span-5 lg:col-span-4 bg-white dark:bg-slate-800 rounded-[2rem] p-6 h-full min-h-[400px] border border-gray-100 dark:border-slate-700 shadow-sm dark:shadow-slate-900/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="material-icons-round text-primary dark:text-blue-400">work</span>
          Experience
        </h2>
        {onViewAll && (
          <button onClick={onViewAll} className="text-primary dark:text-blue-400 text-sm font-medium hover:underline">
            View All
          </button>
        )}
      </div>

      <div className="space-y-0 relative">
        {/* Connector Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gray-200 dark:bg-slate-600/50"></div>

        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="relative pl-10 pb-8 group last:pb-0">
            {/* Timeline Dot */}
            <div className="absolute left-0 top-1 w-10 h-10 flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full ring-4 ring-white dark:ring-slate-800 transition-colors ${exp.isPresent ? 'bg-primary dark:bg-blue-400' : 'bg-gray-400 dark:bg-slate-500 group-hover:bg-primary dark:group-hover:bg-blue-400'}`}></div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700/40 rounded-2xl p-4 hover:shadow-md dark:hover:shadow-slate-900/40 transition-all cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-slate-600">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${exp.isPresent ? 'text-primary dark:text-blue-300 bg-primary/10 dark:bg-blue-500/20' : 'text-gray-500 dark:text-slate-300 bg-gray-200 dark:bg-slate-600'}`}>
                  {exp.period}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-300 mb-2">{exp.company}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
