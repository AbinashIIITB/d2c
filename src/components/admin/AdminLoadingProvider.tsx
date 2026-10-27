'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { CircleLoader } from './CircleLoader';

interface AdminLoadingContextType {
  isLoading: boolean;
  message: string;
  submessage?: string;
  startLoading: (msg?: string, sub?: string) => void;
  stopLoading: () => void;
}

const AdminLoadingContext = createContext<AdminLoadingContextType>({
  isLoading: false,
  message: '',
  startLoading: () => {},
  stopLoading: () => {},
});

export const useAdminLoading = () => useContext(AdminLoadingContext);

function NavigationWatcher({ onNavigateComplete }: { onNavigateComplete: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onNavigateComplete();
  }, [pathname, searchParams, onNavigateComplete]);

  return null;
}

export function AdminLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [message, setMessage] = useState('Loading...');
  const [submessage, setSubmessage] = useState<string | undefined>('Please wait a moment');

  const startLoading = useCallback((msg = 'Loading...', sub = 'Please wait a moment') => {
    setMessage(msg);
    setSubmessage(sub);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setIsNavigating(false);
  }, []);

  // Listen to any link clicks within the admin dashboard to trigger immediate circle loader
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find nearest anchor tag
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      // If it's an internal admin navigation link
      if (
        href && 
        href.startsWith('/admin') && 
        !href.startsWith('/admin/logout') && 
        !target.getAttribute('target') &&
        !target.getAttribute('download')
      ) {
        // If clicking the current path, don't trigger
        if (window.location.pathname === href) return;

        setIsNavigating(true);
        setMessage('Navigating...');
        setSubmessage('Loading admin view');
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  // Auto safety timeout so navigation loader never gets stuck
  useEffect(() => {
    if (isNavigating || isLoading) {
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setIsLoading(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [isNavigating, isLoading]);

  return (
    <AdminLoadingContext.Provider
      value={{
        isLoading: isLoading || isNavigating,
        message,
        submessage,
        startLoading,
        stopLoading,
      }}
    >
      <Suspense fallback={null}>
        <NavigationWatcher onNavigateComplete={stopLoading} />
      </Suspense>

      {/* Top Floating Circular Loading Badge for smooth navigation feedback */}
      {isNavigating && !isLoading && (
        <div className="fixed top-5 right-6 z-[9999] pointer-events-none animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-2xl border border-d2c-royal/20 flex items-center gap-3">
            <CircleLoader size="sm" color="royal" />
            <div className="leading-tight">
              <p className="text-xs font-bold text-d2c-navy">Loading view...</p>
              <p className="text-[10px] text-gray-400">Direct2Campus</p>
            </div>
          </div>
        </div>
      )}

      {/* Centered Modal Overlay for explicit manual loading operations (save, sync, delete) */}
      {isLoading && (
        <CircleLoader
          fullScreen
          size="lg"
          color="royal"
          text={message}
          subtext={submessage}
        />
      )}

      {children}
    </AdminLoadingContext.Provider>
  );
}
