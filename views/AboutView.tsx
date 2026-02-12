import React from 'react';
import { PROFILE_IMAGE, SKILLS, FOCUS_AREA, EDUCATION, MAP_TEXTURE } from '../constants';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
         <button className="p-2 -ml-2 text-gray-400 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white transition-colors">
             <span className="material-icons-round text-3xl">menu_open</span>
         </button>
         <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-slate-700 overflow-hidden border-2 border-gray-200 dark:border-slate-600">
             <img src={PROFILE_IMAGE} alt="Profile" className="w-full h-full object-cover" />
         </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">About Me</h1>
      <p className="text-primary dark:text-blue-400 font-semibold mb-6">FullStack Developer</p>

      {/* My Story Card */}
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm dark:shadow-slate-900/30 border border-gray-100 dark:border-slate-700 mb-8">
          <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center text-primary dark:text-blue-400">
                  <span className="material-icons-round">person</span>
              </div>
              <h2 className="font-bold text-gray-900 dark:text-white">My Story</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
              Hello! I'm <span className="text-primary dark:text-blue-400 font-bold">Manasseh Randriamitsiry</span>. I am a passionate FullStack developer dedicated to building elegant and high-performance digital experiences.
          </p>
          
          <div className="space-y-4">
              <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center text-primary dark:text-blue-400 shrink-0 mt-1">
                      <span className="material-icons-round text-sm">school</span>
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">Education</h3>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{EDUCATION.degree}</p>
                  </div>
              </div>
              <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center text-primary dark:text-blue-400 shrink-0 mt-1">
                      <span className="material-icons-round text-sm">location_on</span>
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">Location</h3>
                      <p className="text-xs text-gray-500 dark:text-slate-400">Fianarantsoa, Madagascar</p>
                  </div>
              </div>
          </div>
      </div>

      {/* Technical Skills */}
      <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white text-lg">Technical Skills</h2>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-primary dark:text-blue-300 text-xs font-bold rounded-full">
                  {SKILLS.length} Expertise
              </span>
          </div>
          <div className="flex flex-wrap gap-3">
              {SKILLS.map((skill, index) => (
                  <div 
                    key={skill.name} 
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 hover:scale-105
                        ${index === 0 
                          ? 'bg-primary text-white border-primary shadow-md shadow-blue-900/20' 
                          : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-600 hover:border-primary/30 dark:hover:border-blue-400/40'}`}
                  >
                      {skill.name}
                  </div>
              ))}
          </div>
      </div>

      {/* Focus Area */}
      <div className="bg-blue-50 dark:bg-slate-800/50 rounded-[2rem] p-6 mb-8 border border-blue-100 dark:border-slate-700">
          <h2 className="font-bold text-primary dark:text-blue-400 text-xs uppercase tracking-wider mb-6">Focus Area</h2>
          <div className="flex items-end justify-between px-2 h-32">
              {FOCUS_AREA.map((area) => (
                  <div key={area.label} className="flex flex-col items-center gap-2 group">
                      <div className={`w-8 md:w-12 rounded-t-lg transition-all duration-500 group-hover:scale-y-110 origin-bottom ${area.color} ${area.height} shadow-sm`}></div>
                      <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase">{area.label}</span>
                  </div>
              ))}
          </div>
      </div>

      {/* Base of Operations Map */}
      <div className="mb-8">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Base of Operations</h2>
          <div className="h-48 rounded-[2rem] relative overflow-hidden shadow-sm dark:shadow-slate-900/30 border border-gray-100 dark:border-slate-700">
             <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${MAP_TEXTURE}')` }}
             ></div>
             {/* Map Pin */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <div className="w-12 h-12 bg-primary dark:bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-800 animate-pulse">
                     <span className="material-icons-round text-white">location_on</span>
                 </div>
             </div>
             {/* FAB */}
             <button className="absolute bottom-4 right-4 w-12 h-12 bg-primary hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                 <span className="material-icons-round">download</span>
             </button>
          </div>
      </div>
    </div>
  );
};
