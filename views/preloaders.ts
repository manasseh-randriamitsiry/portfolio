import { ViewState } from '../types';

export const loadProjectsView = () => import('./ProjectsView').then(({ ProjectsView }) => ({ default: ProjectsView }));
export const loadResumeView = () => import('./ResumeView').then(({ ResumeView }) => ({ default: ResumeView }));
export const loadContactView = () => import('./ContactView').then(({ ContactView }) => ({ default: ContactView }));

/**
 * Starts downloading a screen only when a visitor shows navigation intent.
 * Dynamic imports are cached by the browser, so the eventual click can render
 * the already-downloaded screen without delaying the interaction.
 */
export const preloadView = (view: ViewState) => {
  switch (view) {
    case 'works':
      return loadProjectsView().catch(() => undefined);
    case 'resume':
      return loadResumeView().catch(() => undefined);
    case 'contact':
      return loadContactView().catch(() => undefined);
    default:
      return Promise.resolve();
  }
};
