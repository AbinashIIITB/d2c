'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface PageTransitionContextType {
  isLoading: boolean;
  start: (label?: string) => void;
  done: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  isLoading: false,
  start: () => {},
  done: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

/** Detect route changes (client navigation), fire done() once route settles */
function RouteChangeWatcher({ onDone }: { onDone: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    onDone();
  }, [pathname, searchParams, onDone]);

  return null;
}

/** The animated top bar + full-screen frosted-glass overlay */
function PageLoader({ isLoading, label }: { isLoading: boolean; label: string }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(0);

      // Quickly jump to 15%, then simulate slower progress
      timerRef.current = setTimeout(() => setProgress(15), 50);
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p < 85) return p + (85 - p) * 0.08 + 0.5;
          return p;
        });
      }, 250);
    } else {
      // Complete to 100 then fade out
      setProgress(100);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 500);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoading]);

  if (!visible && !isLoading) return null;

  return (
    <>
      {/* Top Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[9999] h-[3px]"
        style={{ background: 'transparent' }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #3B4CC0 0%, #5B9BD5 50%, #D4A843 100%)',
            transition: progress === 100 ? 'width 0.3s ease' : 'width 0.6s ease',
            boxShadow: '0 0 12px rgba(91, 155, 213, 0.8), 0 0 4px rgba(59, 76, 192, 0.6)',
          }}
        />
      </div>

      {/* Glassy overlay on full transition (only if really loading) */}
      {isLoading && (
        <div
          className="fixed inset-0 z-[9990] pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isLoading ? 1 : 0,
            background: 'rgba(250, 251, 254, 0.55)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        >
          {/* Center animated spinner with label */}
          <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3 pointer-events-none select-none">
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-lg rounded-2xl px-5 py-3 shadow-2xl border border-white/60">
              {/* Smooth SVG circle loader */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 50 50"
                className="animate-circle-rotate shrink-0"
                style={{ willChange: 'transform' }}
              >
                <defs>
                  <linearGradient id="pg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B4CC0" />
                    <stop offset="100%" stopColor="#5B9BD5" />
                  </linearGradient>
                </defs>
                <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(59,76,192,0.12)" strokeWidth="4.5" />
                <circle
                  className="animate-circle-dash"
                  cx="25"
                  cy="25"
                  r="22"
                  fill="none"
                  stroke="url(#pg-grad)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <p className="text-xs font-bold text-d2c-navy leading-tight">{label || 'Loading page...'}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Direct2Campus</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [label, setLabel] = useState('Loading page...');

  const start = useCallback((lbl = 'Loading page...') => {
    setLabel(lbl);
    setIsLoading(true);
  }, []);

  const done = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Intercept link clicks globally on the public site
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Only internal navigation, not admin
      if (
        href.startsWith('/') &&
        !href.startsWith('/admin') &&
        !href.startsWith('/api') &&
        !anchor.getAttribute('target') &&
        !anchor.getAttribute('download') &&
        window.location.pathname !== href.split('?')[0]
      ) {
        const routeLabel = getLabelForHref(href);
        start(routeLabel);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [start]);

  // Safety: auto-cancel after 8 seconds
  useEffect(() => {
    if (!isLoading) return;
    const t = setTimeout(done, 8000);
    return () => clearTimeout(t);
  }, [isLoading, done]);

  return (
    <PageTransitionContext.Provider value={{ isLoading, start, done }}>
      <Suspense fallback={null}>
        <RouteChangeWatcher onDone={done} />
      </Suspense>
      <PageLoader isLoading={isLoading} label={label} />
      {children}
    </PageTransitionContext.Provider>
  );
}

function getLabelForHref(href: string): string {
  if (href.startsWith('/colleges/')) return 'Opening college page...';
  if (href === '/colleges') return 'Loading colleges...';
  if (href.startsWith('/exams/')) return 'Opening exam guide...';
  if (href === '/exams') return 'Loading entrance exams...';
  if (href.startsWith('/blog/')) return 'Opening article...';
  if (href === '/blog') return 'Loading blog articles...';
  if (href === '/contact') return 'Loading contact page...';
  if (href === '/') return 'Going home...';
  return 'Loading page...';
}
