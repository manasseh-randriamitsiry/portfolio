import React, { useEffect, useState } from 'react';
import { EXPERIENCES, GITHUB_USERNAME, PROJECT_IMAGES } from '../constants';
import { fetchRepositories } from '../services/githubService';
import { Repository, Experience } from '../types';
import { motion } from 'framer-motion';

const ExperienceItem: React.FC<{ exp: Experience, index: number }> = ({ exp, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
        className="relative pl-8 pb-10 last:pb-0"
    >
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/30 to-outline-variant/10"></div>
        <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-surface border-2 border-primary/50 shadow-[0_0_10px_rgba(var(--md-sys-color-primary-rgb),0.3)]"></div>
        {exp.isPresent && (
            <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--md-sys-color-primary-rgb),0.6)] animate-pulse"></div>
        )}

        <div className="glass-panel p-5 rounded-ios-sm shadow-sm hover:shadow-md transition-shadow duration-300 border border-outline-variant/20 -mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <h3 className="font-bold text-on-surface text-lg leading-tight">{exp.role}</h3>
                {exp.isPresent ? (
                    <span className="self-start sm:self-auto px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full border border-primary/20 backdrop-blur-md">Present</span>
                ) : (
                    <span className="self-start sm:self-auto px-3 py-1 bg-surface-variant/50 text-on-surface-variant text-[10px] font-bold tracking-wider rounded-full border border-outline-variant/20">{exp.period}</span>
                )}
            </div>
            <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wide">{exp.company}</p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
                {exp.description}
            </p>
        </div>
    </motion.div>
);

const ProjectCard: React.FC<{ repo: Repository, index: number }> = ({ repo, index }) => {
    const imageKey = Object.keys(PROJECT_IMAGES).find(key =>
        repo.name.toLowerCase().includes(key.toLowerCase())
    ) || 'default';
    const imageUrl = PROJECT_IMAGES[imageKey];

    const projectType = repo.language === 'PHP' ? 'Backend API' : 'Mobile App';

    return (
        <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: 'spring' }}
            whileHover={{ y: -5, scale: 1.01 }}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="block glass-panel rounded-ios-lg overflow-hidden shadow-ios-soft hover:shadow-ios-heavy transition-all duration-300 mb-8 md:mb-10 group border border-outline-variant/20 relative"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20"></div>

            <div className="h-56 relative overflow-hidden bg-surface-variant/20">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    src={imageUrl}
                    alt={repo.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 bg-surface/30 dark:bg-surface-variant/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm z-10">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{projectType}</span>
                </div>
            </div>
            <div className="p-6 md:p-8 relative z-10 bg-surface/50 dark:bg-surface-variant/10 backdrop-blur-lg">
                <h3 className="text-2xl font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">{repo.name.replace(/-/g, ' ')}</h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 mb-6 leading-relaxed">
                    {repo.description || "High-performance application built with modern architecture."}
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 bg-secondary-container/50 text-on-secondary-container text-xs font-bold rounded-full border border-outline-variant/20 backdrop-blur-sm">
                        {repo.language || 'Code'}
                    </span>
                    {repo.stargazers_count > 0 && (
                        <span className="px-4 py-1.5 bg-surface-variant/50 text-on-surface-variant text-xs font-bold rounded-full flex items-center gap-1.5 border border-outline-variant/20 backdrop-blur-sm">
                            <span className="material-icons-round text-sm text-[#FFD700]">star</span>
                            {repo.stargazers_count}
                        </span>
                    )}
                </div>
            </div>
        </motion.a>
    );
};

export const ProjectsView: React.FC = () => {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRepositories().then(data => {
            console.log('Fetched repos:', data);
            const sorted = [...data].sort((a, b) => b.stargazers_count - a.stargazers_count);
            setRepos(sorted);
            setLoading(false);
        });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto pb-32"
        >
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">Experience & Projects</h1>
                    <p className="text-on-surface-variant/80 text-xs font-bold uppercase tracking-widest mt-2">Career Timeline</p>
                </div>
            </div>

            {/* Timeline */}
            <div className="mb-16 ml-2 md:ml-4">
                {EXPERIENCES.map((exp, idx) => (
                    <ExperienceItem key={exp.id} exp={exp} index={idx} />
                ))}
            </div>

            {/* Selected Works */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Selected Works</h2>
                <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-primary text-sm font-bold hover:underline flex items-center gap-1 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 transition-colors hover:bg-primary/20">
                    View GitHub
                    <span className="material-icons-round text-sm">open_in_new</span>
                </a>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <span className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></span>
                </div>
            ) : (
                <div className="space-y-6">
                    {repos.length === 0 ? (
                        <p className="text-on-surface-variant text-center py-12 glass-panel rounded-ios border border-outline-variant/20">No projects found.</p>
                    ) : (
                        repos.map((repo, idx) => (
                            <ProjectCard key={repo.id} repo={repo} index={idx} />
                        ))
                    )}
                </div>
            )}
        </motion.div>
    );
};
