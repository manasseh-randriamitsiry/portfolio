import React, { useEffect, useRef, useState } from 'react';

/**
 * The contour field: the page's hairlines given depth, drawn as ground between
 * the hero and the work index. It holds no frame, no caption and no box, and it
 * fades into the paper at every edge, so it reads as part of the page rather
 * than as a picture placed on it. three loads on approach, never in the first
 * payload, and the loop stops off screen and under prefers-reduced-motion.
 */
export const ContourField: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(host);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    import('./contourScene')
      .then(({ mountContour }) => {
        if (cancelled) return;
        teardown = mountContour(canvas);
        setReady(true);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [inView]);

  return (
    <div className="contour" ref={hostRef} data-ready={ready} aria-hidden="true">
      <canvas className="contour__canvas" ref={canvasRef} />
    </div>
  );
};

export default ContourField;
