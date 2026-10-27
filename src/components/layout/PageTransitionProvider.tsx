'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface PageTransitionContextType {
  isLoading: boolean;
  start: () => void;
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

/** Pure simple loading circle in the center: 0 blur bg, 0 box, 0 text */
function PageLoader({ isLoading }: { isLoading: boolean }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else {
      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, 150);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isLoading]);

  if (!visible && !isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none transition-opacity duration-200"
      style={{
        opacity: isLoading ? 1 : 0,
        background: 'transparent',
      }}
      aria-hidden="true"
    >
      {/* Clean rotating circle loader in exact center */}
      <svg
        width="44"
        height="44"
        viewBox="0 0 50 50"
        className="animate-circle-rotate"
        style={{ willChange: 'transform' }}
      >
        <defs>
          <linearGradient id="center-spin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B4CC0" />
            <stop offset="100%" stopColor="#5B9BD5" />
          </linearGradient>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="21"
          fill="none"
          stroke="rgba(59,76,192,0.18)"
          strokeWidth="4"
        />
        <circle
          className="animate-circle-dash"
          cx="25"
          cy="25"
          r="21"
          fill="none"
          stroke="url(#center-spin-grad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const start = useCallback(() => {
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
        start();
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [start]);

  // Safety: auto-cancel after 6 seconds
  useEffect(() => {
    if (!isLoading) return;
    const t = setTimeout(done, 6000);
    return () => clearTimeout(t);
  }, [isLoading, done]);

  return (
    <PageTransitionContext.Provider value={{ isLoading, start, done }}>
      <Suspense fallback={null}>
        <RouteChangeWatcher onDone={done} />
      </Suspense>
      <PageLoader isLoading={isLoading} />
      {children}
    </PageTransitionContext.Provider>
  );
}
