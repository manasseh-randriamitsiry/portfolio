import React, { useEffect, useState } from 'react';
import { ExperienceRows } from '../components/ExperienceRows';
import { GITHUB_USERNAME, PROJECT_TITLES, WORK_LINES } from '../constants';
import { fetchRepositories } from '../services/githubService';
import { Repository } from '../types';

export const ProjectsView: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;

    fetchRepositories()
      .then((data) => {
        if (!live) return;
        setRepos([...data].sort((a, b) => b.stargazers_count - a.stargazers_count));
        setLoading(false);
      })
      .catch(() => {
        if (live) setLoading(false);
      });

    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="view">
      <header className="view__head">
        <div className="container">
          <h1>Work</h1>
          <p className="lead">
            Three projects on GitHub, and the years that led to them.
          </p>
        </div>
      </header>

      <section className="container" aria-label="Projects">
        {loading ? (
          <p className="index__state" role="status">
            Fetching repositories…
          </p>
        ) : repos.length === 0 ? (
          <p className="index__state">No public repositories found.</p>
        ) : (
          <ol className="index">
            {repos.map((repo) => (
              <li className="index__item" key={repo.id}>
                <a className="index__link" href={repo.html_url} target="_blank" rel="noreferrer">
                  <span className="index__name">
                    <span className="u">
                      {PROJECT_TITLES[repo.name] ?? repo.name.replace(/-/g, ' ')}
                    </span>
                  </span>
                  <span className="index__desc">
                    {WORK_LINES[repo.name] ??
                      repo.description ??
                      'High-performance application built with modern architecture.'}
                  </span>
                  <span className="index__meta">
                    <span>{repo.language || 'Code'}</span>
                    {repo.stargazers_count > 0 && (
                      <span className="index__stars">
                        {repo.stargazers_count}{' '}
                        {repo.stargazers_count === 1 ? 'star' : 'stars'}
                      </span>
                    )}
                    <span>{repo.language === 'PHP' ? 'Backend API' : 'Mobile app'}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        )}

        <a
          className="index__more"
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
        >
          Everything on GitHub
        </a>
      </section>

      <section className="section" aria-labelledby="experience-title">
        <div className="container">
          <div className="grid section__head">
            <h2 id="experience-title">Where I’ve worked</h2>
          </div>
          <ExperienceRows />
        </div>
      </section>
    </div>
  );
};
