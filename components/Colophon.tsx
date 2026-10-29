import React from 'react';
import { GITHUB_URL } from '../constants';

export const Colophon: React.FC = () => {
  return (
    <footer className="colophon">
      <div className="container grid">
        <p className="colophon__name">
          Manassé Randriamitsiry Valimbavaka Nandrasana
          <span>Flutter and full-stack developer, Fianarantsoa, Madagascar</span>
        </p>

        <nav className="colophon__links" aria-label="Elsewhere">
          <a href="mailto:manassehrandriamitsiry@gmail.com">manassehrandriamitsiry@gmail.com</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
          <a href="/assets/resume-en.pdf" download="Manasseh_Resume_EN.pdf">Resume, English (PDF)</a>
          <a href="/assets/resume-fr.pdf" download="Manasseh_Resume_FR.pdf">Resume, French (PDF)</a>
        </nav>

        <p className="colophon__fine">
          Built with React and Vite. Map tiles and data from OpenStreetMap contributors.
        </p>
      </div>
    </footer>
  );
};
