import React, { Suspense, useEffect, useRef, useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { ExperienceRows } from '../components/ExperienceRows';
import { ViewState } from '../types';
import { FEATURED_PROJECTS, WORK_LINES } from '../constants';

const LocationCard = React.lazy(() => import('../components/LocationCard'));

const DeferredLocationCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="map__frame" ref={containerRef}>
      {shouldLoad ? (
        <Suspense fallback={<p className="map__placeholder">Fianarantsoa, Madagascar.</p>}>
          <LocationCard />
        </Suspense>
      ) : (
        <p className="map__placeholder">Fianarantsoa, Madagascar.</p>
      )}
    </div>
  );
};

interface HomeViewProps {
  setView: (view: ViewState) => void;
  preloadView: (view: ViewState) => Promise<unknown>;
}

export const HomeView: React.FC<HomeViewProps> = ({ setView, preloadView }) => {
  return (
    <>
      <HeroSection setView={setView} preloadView={preloadView} />

      <section className="section section--tight" aria-labelledby="work-title">
        <div className="container">
          <div className="grid section__head">
            <h2 id="work-title">Selected work</h2>
            <p className="lead">Three of them, with the stack each was built in.</p>
          </div>

          <ol className="work-index" aria-label="Selected work">
            {Object.entries(FEATURED_PROJECTS).map(([key, project]) => (
              <li className="work-index__row" key={key}>
                <a
                  className="work-index__link"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="work-index__name">
                    <span className="u">{project.name}</span>
                  </span>
                  <span className="work-index__desc">{WORK_LINES[key]}</span>
                  <span className="work-index__meta">{project.stack.join(', ')}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="what-title">
        <div className="container">
          <div className="grid section__head">
            <h2 id="what-title">What I do</h2>
            <p className="lead">Across the stack.</p>
          </div>

          <table className="spec">
            <thead>
              <tr>
                <th scope="col">Layer</th>
                <th scope="col">Tools</th>
                <th scope="col">What it means</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mobile</td>
                <td>Flutter, Dart</td>
                <td>Offline-first apps, shipped to the App Store and TestFlight.</td>
              </tr>
              <tr>
                <td>Back end</td>
                <td>Symfony, PHP, Node.js</td>
                <td>The API and its data.</td>
              </tr>
              <tr>
                <td>Front end</td>
                <td>React, TypeScript, Tailwind</td>
                <td>The web interface.</td>
              </tr>
              <tr>
                <td>Delivery</td>
                <td>Docker, unit tests</td>
                <td>Containerised and tested.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section section--paper2" aria-labelledby="where-title">
        <div className="container grid">
          <div className="place">
            <h2 id="where-title">Where it is</h2>
            <p className="lead">
              Fianarantsoa, Madagascar. Working in English and French, locally or remote.
            </p>
          </div>

          <DeferredLocationCard />

          <p className="map__caption">
            Fianarantsoa, Madagascar. <span className="num">21.45° S, 47.09° E</span>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="exp-title">
        <div className="container">
          <div className="grid section__head">
            <h2 id="exp-title">Where I’ve worked</h2>
          </div>

          <ExperienceRows />
        </div>
      </section>

      <section className="close" aria-labelledby="close-title">
        <div className="container">
          <h2 className="close__statement" id="close-title">
            Need a Flutter or full-stack developer in Madagascar, or a remote collaborator?
          </h2>
          <div className="close__row">
            <a className="btn btn--primary" href="mailto:manassehrandriamitsiry@gmail.com">
              Email me
            </a>
            <a className="close__mail" href="mailto:manassehrandriamitsiry@gmail.com">
              manassehrandriamitsiry@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
