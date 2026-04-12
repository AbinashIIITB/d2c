"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  { id: 1, image: "https://placehold.co/1200x400/1e293b/a5b4fc/png?text=Engineering+Admissions", alt: "Engineering Admissions Direct2Campus" },
  { id: 2, image: "https://placehold.co/1200x400/0f172a/93c5fd/png?text=Medical+Admissions", alt: "Medical Admissions Direct2Campus" },
  { id: 3, image: "https://placehold.co/1200x400/172554/93c5fd/png?text=MBA+Admissions", alt: "MBA Admissions Direct2Campus" },
];

const AUTO_INTERVAL = 5000;

export function BannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    // clear any existing timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);

    // progress bar updates every 30ms
    const progressStep = 30 / AUTO_INTERVAL;
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 1;
        return prev + progressStep;
      });
    }, 30);

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, AUTO_INTERVAL);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [startAutoPlay]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    startAutoPlay();
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <section className="bg-d2c-white w-full pt-28 lg:pt-32 pb-8">
      <div className="content-boundary">
        {/* Top bar: navigation arrows on the left */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-d2c-navy hover:bg-d2c-ice hover:border-d2c-royal/30 transition-all shadow-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-d2c-navy hover:bg-d2c-ice hover:border-d2c-royal/30 transition-all shadow-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide indicators */}
          <div className="flex items-center gap-2 ml-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex
                    ? "w-8 bg-d2c-royal"
                    : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Banner — full content-boundary width */}
        <div className="relative w-full aspect-[2.5] overflow-hidden rounded-2xl shadow-lg border border-d2c-ice">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute inset-0 w-full h-full"
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="w-full h-full relative bg-d2c-navy">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}

          {/* Bottom progress line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 z-20">
            <div
              className="h-full bg-gradient-to-r from-d2c-royal to-d2c-sky"
              style={{
                width: `${progress * 100}%`,
                transition: "width 30ms linear",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
