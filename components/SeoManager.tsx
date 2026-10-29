import { useEffect, type FC } from 'react';
import { ViewState } from '../types';

const PAGE_METADATA: Record<ViewState, { title: string; description: string }> = {
  home: {
    title: 'RANDRIAMITSIRY Valimbavaka Nandrasana Manassé | Flutter and Full-Stack Developer',
    description: 'Portfolio of Manassé Randriamitsiry Valimbavaka Nandrasana, a Malagasy full-stack developer in Fianarantsoa. Flutter apps shipped to the App Store and TestFlight, with Symfony, React, PHP and Node.js behind them.'
  },
  works: {
    title: 'Flutter, Symfony and React Projects | Manassé Randriamitsiry Valimbavaka Nandrasana',
    description: 'Selected Flutter mobile, Symfony backend, React and PHP projects by Manassé Randriamitsiry Valimbavaka Nandrasana, a Malagasy full-stack developer.'
  },
  resume: {
    title: 'Developer Resume | Manassé Randriamitsiry Valimbavaka Nandrasana',
    description: 'Resume of Manassé Randriamitsiry Valimbavaka Nandrasana, also known as Manasseh Randriamitsiry, a Flutter, Symfony, React and PHP developer in Fianarantsoa, Madagascar.'
  },
  contact: {
    title: 'Hire a Malagasy Flutter Developer | Manassé Nandrasana Randriamitsiry',
    description: 'Contact Manassé Randriamitsiry Valimbavaka Nandrasana for Flutter mobile apps, App Store and TestFlight delivery, and full-stack web development in Madagascar or remotely.'
  }
};

const setMetaContent = (selector: string, content: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
};

export const SeoManager: FC<{ currentView: ViewState }> = ({ currentView }) => {
  useEffect(() => {
    const { title, description } = PAGE_METADATA[currentView];
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    // A user can deploy this portfolio on a custom domain or a GitHub Pages subpath.
    // Keeping this value aligned with the loaded page prevents an incorrect hard-coded canonical URL.
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = canonicalUrl;
    setMetaContent('meta[property="og:url"]', canonicalUrl);
  }, [currentView]);

  return null;
};
