import React from 'react';
import { ViewState } from '../types';
import { FULL_NAME, FULL_NAME_IN_PROSE, PORTRAIT_IMAGE } from '../constants';

interface HeroSectionProps {
  setView: (view: ViewState) => void;
  preloadView: (view: ViewState) => Promise<unknown>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setView, preloadView }) => {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container grid">
        <div className="hero__head">
          <h1 id="hero-title">Flutter on the phone, Symfony behind.</h1>
          <p className="lead">
            Flutter apps from Fianarantsoa, shipped through TestFlight to the App Store.
          </p>
        </div>

        <div className="hero__foot">
          <div className="hero__actions">
            <button
              type="button"
              className="btn btn--primary"
              onPointerEnter={() => preloadView('works')}
              onFocus={() => preloadView('works')}
              onTouchStart={() => preloadView('works')}
              onClick={() => setView('works')}
            >
              See the work
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/assets/resume-en.pdf';
                link.download = 'Manasseh_Resume_EN.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download CV
            </button>
          </div>
        </div>

        {/* The claim's right seat: the one proof the prompt gave, set as a record. */}
        <div className="hero__seat">
          <p className="hero__seat-note">Shipped through</p>
          <ol className="hero__seat-list">
            <li>TestFlight</li>
            <li>App Store</li>
          </ol>
        </div>

        <div className="hero__id" id="about-manasseh">
          <figure className="figure hero__figure">
            <div
              className="figure__slot"
              data-slot="portrait"
              data-alt={`A portrait of ${FULL_NAME_IN_PROSE}, photographed in Fianarantsoa`}
            >
              <img
                src={PORTRAIT_IMAGE}
                alt={`Portrait of ${FULL_NAME_IN_PROSE}`}
                width="512"
                height="512"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <figcaption className="hero__caption">
              <span className="hero__name">{FULL_NAME}</span>
              <span className="hero__role">Full-stack and Flutter developer</span>
            </figcaption>
          </figure>

          <div className="who__text">
            <h2 id="who-title">Building for web and mobile</h2>
            <p className="lead">
              I’m {FULL_NAME_IN_PROSE}, a full-stack developer in Fianarantsoa. I build Flutter apps and
              the Symfony, React and PHP services behind them.
            </p>
            <p lang="fr">
              Développeur malgache, je collabore aussi en français sur des applications mobiles
              Flutter et des produits web full-stack.
            </p>
            <p>5+ years, 42 projects, one city.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
