'use client';

import React from 'react';

export interface CircleLoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'royal' | 'emerald' | 'white' | 'navy';
  text?: string;
  subtext?: string;
  overlay?: boolean;
  fullScreen?: boolean;
  className?: string;
}

const SIZE_MAP = {
  xs: { box: 16, stroke: 3, text: 'text-[10px]', sub: 'text-[9px]' },
  sm: { box: 24, stroke: 3.5, text: 'text-xs', sub: 'text-[10px]' },
  md: { box: 40, stroke: 4, text: 'text-sm', sub: 'text-xs' },
  lg: { box: 56, stroke: 4.5, text: 'text-base', sub: 'text-xs' },
  xl: { box: 76, stroke: 5, text: 'text-lg', sub: 'text-sm' },
};

const COLOR_MAP = {
  royal: {
    stroke: '#3B4CC0',
    track: 'rgba(59, 76, 192, 0.15)',
    glow: 'rgba(59, 76, 192, 0.25)',
    gradientStart: '#3B4CC0',
    gradientEnd: '#5B9BD5',
    text: 'text-d2c-navy',
  },
  emerald: {
    stroke: '#059669',
    track: 'rgba(5, 150, 105, 0.15)',
    glow: 'rgba(5, 150, 105, 0.25)',
    gradientStart: '#059669',
    gradientEnd: '#34D399',
    text: 'text-emerald-900',
  },
  navy: {
    stroke: '#1B1F5E',
    track: 'rgba(27, 31, 94, 0.12)',
    glow: 'rgba(27, 31, 94, 0.2)',
    gradientStart: '#1B1F5E',
    gradientEnd: '#3B4CC0',
    text: 'text-d2c-navy',
  },
  white: {
    stroke: '#FFFFFF',
    track: 'rgba(255, 255, 255, 0.2)',
    glow: 'rgba(255, 255, 255, 0.3)',
    gradientStart: '#FFFFFF',
    gradientEnd: '#E8EEF8',
    text: 'text-white',
  },
};

export function CircleLoader({
  size = 'md',
  color = 'royal',
  text,
  subtext,
  overlay = false,
  fullScreen = false,
  className = '',
}: CircleLoaderProps) {
  const { box, stroke, text: textClass, sub: subClass } = SIZE_MAP[size];
  const theme = COLOR_MAP[color];
  const radius = 25 - stroke / 2;
  const gradientId = `circle-gradient-${color}-${size}`;

  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Soft background pulse halo for md and above */}
        {(size === 'md' || size === 'lg' || size === 'xl') && (
          <div
            className="absolute rounded-full animate-ping opacity-25"
            style={{
              width: box * 1.15,
              height: box * 1.15,
              backgroundColor: theme.glow,
              animationDuration: '2.4s',
            }}
          />
        )}

        {/* SVG Smooth Circle */}
        <svg
          className="animate-circle-rotate"
          width={box}
          height={box}
          viewBox="0 0 50 50"
          style={{ willChange: 'transform' }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.gradientStart} />
              <stop offset="100%" stopColor={theme.gradientEnd} />
            </linearGradient>
          </defs>

          {/* Background circle track */}
          <circle
            cx="25"
            cy="25"
            r={radius}
            fill="none"
            stroke={theme.track}
            strokeWidth={stroke}
          />

          {/* Animated spinning dash */}
          <circle
            className="animate-circle-dash"
            cx="25"
            cy="25"
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        </svg>

        {/* Subtle center glowing dot for large sizes */}
        {(size === 'lg' || size === 'xl') && (
          <div
            className="absolute rounded-full"
            style={{
              width: box * 0.16,
              height: box * 0.16,
              backgroundColor: theme.stroke,
              opacity: 0.85,
            }}
          />
        )}
      </div>

      {(text || subtext) && (
        <div className="text-center space-y-0.5 animate-in fade-in duration-300">
          {text && (
            <p className={`font-sora font-bold ${theme.text} ${textClass}`}>
              {text}
            </p>
          )}
          {subtext && (
            <p className={`text-gray-500 font-medium ${subClass}`}>
              {subtext}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-white/95 rounded-3xl p-8 shadow-2xl border border-gray-150 flex flex-col items-center max-w-sm w-full mx-auto">
          {spinner}
        </div>
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 z-30 bg-white/80 backdrop-blur-[2px] flex items-center justify-center p-4 rounded-2xl animate-in fade-in duration-150">
        {spinner}
      </div>
    );
  }

  return spinner;
}
