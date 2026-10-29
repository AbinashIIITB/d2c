"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface BannerItem {
  id?: string | number;
  image: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  link?: string;
  badge?: string;
}

const defaultSlides: BannerItem[] = [
  { id: 1, image: "/images/banners/heritage_enhanced.png", alt: "Heritage Institute of Medical Sciences, Varanasi - High-definition Campus View", title: "Heritage Institute of Medical Sciences", subtitle: "Premier Medical Institution in Varanasi" },
  { id: 2, image: "/images/banners/jis_enhanced.png", alt: "JIS College of Engineering Campus — Direct2Campus Partner Institution", title: "JIS College of Engineering Campus", subtitle: "Autonomous Institution with AI & Robotics Research Centers" },
  { id: 3, image: "/images/banners/ncr_enhanced.png", alt: "NCR Institute of Medical Sciences, Meerut — AI-Enhanced Exterior", title: "NCR Institute of Medical Sciences", subtitle: "Leading Medical Healthcare & Education Complex in Meerut" },
];

const AUTO_INTERVAL = 5000;

export function BannerSection({ banners }: { banners?: BannerItem[] }) {
  const slides = (banners && banners.length > 0) ? banners : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);

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
  }, [slides.length]);

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
    <section className="bg-d2c-white w-full pt-4 md:pt-6 lg:pt-8 pb-8">
      <div className="content-boundary">
        {/* Top bar: navigation arrows on the left */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-d2c-royal"
                      : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {slides[currentIndex]?.title && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-d2c-royal" />
              <span className="truncate max-w-[280px]">{slides[currentIndex].title}</span>
            </div>
          )}
        </div>

        {/* Banner — full content-boundary width */}
        <div className="relative w-full aspect-[2.17] overflow-hidden rounded-2xl shadow-lg border border-d2c-ice group">
          {slides.map((slide, index) => {
            const content = (
              <div className="w-full h-full relative bg-d2c-navy">
                <Image
                  src={slide.image}
                  alt={slide.alt || slide.title || `Campus Banner ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {(slide.title || slide.subtitle) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8">
                    {slide.badge && (
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#f6c804] text-[#0B1120] text-[10px] font-bold tracking-wider uppercase mb-2 w-max">
                        {slide.badge}
                      </span>
                    )}
                    {slide.title && (
                      <h3 className="text-lg sm:text-2xl font-sora font-bold text-white drop-shadow-md">
                        {slide.title}
                      </h3>
                    )}
                    {slide.subtitle && (
                      <p className="text-xs sm:text-sm text-white/80 max-w-xl mt-1 drop-shadow-sm">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );

            return (
              <div
                key={slide.id || index}
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateX(${(index - currentIndex) * 100}%)`,
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {slide.link ? (
                  <Link href={slide.link} className="block w-full h-full cursor-pointer">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </div>
            );
          })}

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
