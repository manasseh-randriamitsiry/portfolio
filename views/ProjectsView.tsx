import React, { useEffect, useState } from 'react';
import { EXPERIENCES, GITHUB_USERNAME, PROJECT_IMAGES } from '../constants';
import { fetchRepositories } from '../services/githubService';
import { Repository, Experience } from '../types';

const ExperienceItem: React.FC<{ exp: Experience }> = ({ exp }) => (
    <div className="relative pl-8 pb-8 last:pb-0">
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-outline-variant/30"></div>
        <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-outline-variant ring-4 ring-surface"></div>
        {exp.isPresent && (
            <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-primary ring-4 ring-surface animate-pulse"></div>
        )}

        <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-on-surface text-lg leading-tight w-2/3">{exp.role}</h3>
            {exp.isPresent ? (
                <span className="px-2 py-0.5 bg-primary-container text-on-primary-container text-[10px] font-bold uppercase rounded-md">Present</span>
            ) : (
                <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant text-[10px] font-bold rounded-md">{exp.period}</span>
            )}
        </div>
        <p className="text-xs font-semibold text-on-surface-variant mb-2">{exp.company}</p>
        <p className="text-sm text-on-surface-variant leading-relaxed">
            {exp.description}
        </p>
    </div>
);

const ProjectCard: React.FC<{ repo: Repository }> = ({ repo }) => {
    // Determine image based on repo name or generic - fix case sensitivity
    const imageKey = Object.keys(PROJECT_IMAGES).find(key =>
        repo.name.toLowerCase().includes(key.toLowerCase())
    ) || 'default';
    const imageUrl = PROJECT_IMAGES[imageKey];

    // Determine project type label
    const projectType = repo.language === 'PHP' ? 'Backend API' : 'Mobile App';

    return (
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="block bg-surface-container-low dark:bg-surface-container rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-6 group border border-outline-variant/20">
            <div className="h-48 relative overflow-hidden">
                <img src={imageUrl} alt={repo.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 bg-surface/80 dark:bg-surface-variant/80 backdrop-blur-md px-3 py-1 rounded-lg border border-outline-variant/20">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{projectType}</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-on-surface mb-2">{repo.name.replace(/-/g, ' ')}</h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                    {repo.description || "High-performance application built with modern architecture."}
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">
                        {repo.language || 'Code'}
                    </span>
                    {repo.stargazers_count > 0 && (
                        <span className="px-3 py-1 bg-surface-variant text-on-surface-variant text-xs font-bold rounded-full flex items-center gap-1">
                            <span className="material-icons-round text-xs">star</span> {repo.stargazers_count}
                        </span>
                    )}
                </div>
            </div>
        </a>
    );
};

export const ProjectsView: React.FC = () => {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRepositories().then(data => {
            console.log('Fetched repos:', data);
            // Sort by stars for "Selected Works"
            const sorted = [...data].sort((a, b) => b.stargazers_count - a.stargazers_count);
            setRepos(sorted);
            setLoading(false);
        });
    }, []);

    return (
        <div className="max-w-xl mx-auto pb-32">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-on-surface">Experience & Projects</h1>
                    <p className="text-on-surface-variant text-xs font-medium uppercase tracking-widest mt-1">Career Timeline</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center">
                    <span className="material-icons-round text-on-surface-variant">more_vert</span>
                </div>
            </div>

            {/* Timeline */}
            <div className="mb-12">
                {EXPERIENCES.map(exp => (
                    <ExperienceItem key={exp.id} exp={exp} />
                ))}
            </div>

            {/* Selected Works */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Selected Works</h2>
                <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-primary text-xs font-bold hover:underline">View All</a>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <span className="w-8 h-8 border-4 border-primary dark:border-blue-500 border-t-transparent rounded-full animate-spin"></span>
                </div>
            ) : (
                <div>
                    {repos.length === 0 ? (
                        <p className="text-gray-500 dark:text-slate-400 text-center py-8">No projects found.</p>
                    ) : (
                        repos.map(repo => (
                            <ProjectCard key={repo.id} repo={repo} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
