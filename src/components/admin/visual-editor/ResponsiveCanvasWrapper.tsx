'use client';

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  Check, 
  Layers 
} from 'lucide-react';

interface ResponsiveCanvasWrapperProps {
  deviceMode: 'desktop' | 'tablet' | 'mobile';
  children: React.ReactNode;
  desktopMaxWidthClass?: string;
}

export function ResponsiveCanvasWrapper({
  deviceMode,
  children,
  desktopMaxWidthClass = 'w-full max-w-6xl',
}: ResponsiveCanvasWrapperProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [isFullHeight, setIsFullHeight] = useState(false);
  const [contentHeight, setContentHeight] = useState(844);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  // Reset orientation and height mode when device changes
  useEffect(() => {
    setOrientation('portrait');
  }, [deviceMode]);

  // Sync parent styles to iframe
  const syncStyles = (doc: Document) => {
    // 1. Copy meta viewport
    if (!doc.head.querySelector('meta[name="viewport"]')) {
      const meta = doc.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
      doc.head.appendChild(meta);
    }

    // 2. Copy base tag if needed
    const parentBase = document.querySelector('base');
    if (parentBase && !doc.head.querySelector('base')) {
      doc.head.appendChild(parentBase.cloneNode(true));
    }

    // 3. Copy all style & link[rel=stylesheet] tags deterministically
    const parentStyles = document.querySelectorAll('style, link[rel="stylesheet"]');
    parentStyles.forEach((styleEl, index) => {
      let syncId = styleEl.getAttribute('data-d2c-sync-id');
      if (!syncId) {
        syncId = `sync-style-${index}-${styleEl.tagName.toLowerCase()}`;
        styleEl.setAttribute('data-d2c-sync-id', syncId);
      }

      let existing = doc.head.querySelector(`[data-d2c-sync-id="${syncId}"]`);
      if (!existing) {
        const clone = styleEl.cloneNode(true) as HTMLElement;
        clone.setAttribute('data-d2c-sync-id', syncId);
        doc.head.appendChild(clone);
      } else if (styleEl.tagName === 'STYLE' && existing.textContent !== styleEl.textContent) {
        existing.textContent = styleEl.textContent;
      }
    });

    // 4. Inject sleek scrollbars and base resets for iframe
    let customResetStyle = doc.head.querySelector('#d2c-iframe-reset') as HTMLStyleElement | null;
    if (!customResetStyle) {
      customResetStyle = doc.createElement('style');
      customResetStyle.id = 'd2c-iframe-reset';
      customResetStyle.textContent = `
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.25); border-radius: 9999px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(100, 116, 139, 0.45); }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        body { margin: 0; padding: 0; min-height: 100%; overflow-x: hidden; }
      `;
      doc.head.appendChild(customResetStyle);
    }

    // 5. Copy font variables and classes from html & body
    const parentHtml = document.documentElement;
    const parentBody = document.body;

    doc.documentElement.className = parentHtml.className;
    doc.documentElement.style.cssText = parentHtml.style.cssText;

    doc.body.className = `${parentBody.className} bg-white text-d2c-text antialiased overflow-x-hidden selection:bg-d2c-royal/30 selection:text-d2c-navy-dark`;
    doc.body.style.cssText = parentBody.style.cssText;
    doc.body.style.margin = '0';
    doc.body.style.padding = '0';

    // 6. Prevent link navigation inside visual preview
    doc.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.getAttribute('href') && !target.getAttribute('data-allow-nav')) {
        e.preventDefault();
      }
    }, true);
  };

  // Mount iframe and setup observers
  useEffect(() => {
    if (deviceMode === 'desktop') {
      setMountNode(null);
      return;
    }

    const iframe = iframeRef.current;
    if (!iframe) return;

    let cleanupFn: (() => void) | void;

    const setupIframe = () => {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc || !doc.body) return;

      syncStyles(doc);

      // Create a dedicated container for portal mounting
      let container = doc.getElementById('portal-root');
      if (!container) {
        container = doc.createElement('div');
        container.id = 'portal-root';
        container.className = 'min-h-screen w-full bg-white';
        doc.body.appendChild(container);
      }

      setMountNode(container);

      // Measure content height for auto-resize
      const measureHeight = () => {
        try {
          const bodyHeight = doc.body.scrollHeight || doc.documentElement.scrollHeight;
          if (bodyHeight > 200) {
            setContentHeight(bodyHeight);
          }
        } catch {
          // Ignore cross-origin issues
        }
      };

      measureHeight();

      // Mutation observer to detect style updates in parent
      const headObserver = new MutationObserver(() => {
        syncStyles(doc);
        measureHeight();
      });

      headObserver.observe(document.head, { childList: true, subtree: true });

      // Resize observer on iframe content to sync auto height
      let resizeObserver: ResizeObserver | null = null;
      if (typeof window !== 'undefined' && 'ResizeObserver' in window && doc.body) {
        resizeObserver = new ResizeObserver(() => {
          measureHeight();
        });
        resizeObserver.observe(doc.body);
      }

      return () => {
        headObserver.disconnect();
        if (resizeObserver) resizeObserver.disconnect();
      };
    };

    // If iframe body is already ready, initialize right away
    if (iframe.contentDocument && iframe.contentDocument.body) {
      cleanupFn = setupIframe();
    }

    const onLoad = () => {
      if (cleanupFn) cleanupFn();
      cleanupFn = setupIframe();
    };

    iframe.addEventListener('load', onLoad);

    return () => {
      iframe.removeEventListener('load', onLoad);
      if (cleanupFn) cleanupFn();
    };
  }, [deviceMode, orientation]);

  // If Desktop mode: render normal full-width container directly
  if (deviceMode === 'desktop') {
    return (
      <div className="flex justify-center transition-all duration-300">
        <div className={`${desktopMaxWidthClass} bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 transition-all duration-300 relative`}>
          {children}
        </div>
      </div>
    );
  }

  // Dimension settings
  const dimensions = {
    mobile: {
      portrait: { width: 390, defaultHeight: 844, name: 'Mobile (iPhone 16 Pro — 390px)' },
      landscape: { width: 844, defaultHeight: 390, name: 'Mobile Landscape (844px)' },
    },
    tablet: {
      portrait: { width: 768, defaultHeight: 1024, name: 'Tablet (iPad Mini/Air — 768px)' },
      landscape: { width: 1024, defaultHeight: 768, name: 'Tablet Landscape (1024px)' },
    },
  }[deviceMode][orientation];

  const targetWidth = dimensions.width;
  const targetHeight = isFullHeight ? Math.max(contentHeight + 40, dimensions.defaultHeight) : dimensions.defaultHeight;

  return (
    <div className="flex flex-col items-center justify-center my-4 transition-all duration-300">
      
      {/* Device Simulation Control Header */}
      <div className="flex items-center justify-between gap-4 px-5 py-2.5 bg-slate-900 text-white rounded-2xl shadow-xl mb-4 border border-slate-800 text-xs font-semibold backdrop-blur-md">
        <div className="flex items-center gap-2">
          {deviceMode === 'mobile' ? (
            <Smartphone className="w-4 h-4 text-d2c-gold" />
          ) : (
            <Tablet className="w-4 h-4 text-d2c-gold" />
          )}
          <span className="text-white font-bold">{dimensions.name}</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
            Real Viewport Active
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Height Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsFullHeight(!isFullHeight)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
              isFullHeight 
                ? 'bg-d2c-royal text-white shadow-sm' 
                : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/15'
            }`}
            title={isFullHeight ? 'Switch to Device Scroll Box' : 'Expand to Full Page Height'}
          >
            {isFullHeight ? (
              <>
                <Minimize2 className="w-3 h-3" />
                <span>Fit Device Screen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3 h-3" />
                <span>Full Page Scroll</span>
              </>
            )}
          </button>

          {/* Orientation Toggle */}
          <button
            type="button"
            onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 hover:text-white text-[11px] transition-all"
            title="Rotate Orientation"
          >
            <RotateCw className="w-3 h-3" />
            <span className="capitalize">{orientation}</span>
          </button>
        </div>
      </div>

      {/* Realistic Hardware Bezel Frame */}
      <div 
        className={`transition-all duration-300 relative bg-slate-950 shadow-[0_30px_70px_rgba(0,0,0,0.45)] border-[6px] border-slate-800 ${
          deviceMode === 'mobile' && orientation === 'portrait'
            ? 'rounded-[3.25rem] p-3'
            : 'rounded-[2.25rem] p-3'
        }`}
        style={{
          width: targetWidth + 24,
          maxWidth: '100%',
        }}
      >
        {/* Dynamic Island / Speaker on Mobile Portrait */}
        {deviceMode === 'mobile' && orientation === 'portrait' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-between px-3 pointer-events-none shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
            <div className="w-2 h-2 rounded-full bg-blue-900/60" />
          </div>
        )}

        {/* Home Indicator Pill at Bottom for Mobile */}
        {deviceMode === 'mobile' && orientation === 'portrait' && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-30 pointer-events-none" />
        )}

        {/* Isolated Iframe Window Viewport */}
        <div 
          className={`overflow-hidden bg-white relative transition-all duration-300 ${
            deviceMode === 'mobile' && orientation === 'portrait' 
              ? 'rounded-[2.5rem]' 
              : 'rounded-2xl'
          }`}
          style={{
            width: targetWidth,
            height: isFullHeight ? targetHeight : dimensions.defaultHeight,
            maxHeight: isFullHeight ? 'none' : '85vh',
          }}
        >
          <iframe
            ref={iframeRef}
            title="Real Responsive Canvas Viewport"
            className="w-full h-full border-0 block bg-white"
            style={{ width: '100%', height: '100%' }}
          />

          {mountNode && createPortal(children, mountNode)}
        </div>
      </div>

      {/* Bottom Hint */}
      <p className="text-[11px] text-gray-400 mt-3 text-center">
        Real CSS media queries active: mobile flex columns, mobile headers, single column grids, and touch buttons.
      </p>
    </div>
  );
}
