"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

/**
 * AnimatedPatternBg
 * ──────────────────
 * Renders a slowly-drifting, repeating floral pattern overlay.
 * Features a dual-layer interactive cursor effect: 
 * The second layer is scaled up slightly (blooming) and masked to the cursor position,
 * creating a soft interactive magnifying/blooming glass effect directly under the mouse.
 */
export function AnimatedPatternBg({
  opacity = 0.15,
  speed = 120,
  className = "",
  interactive = true,
}: {
  opacity?: number;
  speed?: number;
  className?: string;
  interactive?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Framer Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for buttery smooth tracking
  const springX = useSpring(mouseX, { stiffness: 50, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 15 });
  
  // Track hover state for fading the bloom layer in/out
  const hoverOpacity = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!interactive) return;
    const container = containerRef.current;
    if (!container) return;

    // Track mouse over the container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => hoverOpacity.set(1);
    const handleMouseLeave = () => hoverOpacity.set(0);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [interactive, mouseX, mouseY, hoverOpacity]);

  // CSS for drifting animation (re-applied inline to avoid globals dependency if needed, but uses the global class)
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-auto absolute inset-0 z-0 overflow-hidden mix-blend-screen ${className}`}
      style={{ opacity }}
    >
      {/* 
        LAYER 1: Base Pattern 
        Very slow panning, standard size
      */}
      <div
        className="animate-pattern-drift absolute top-0 left-0"
        style={{
          width: "200%",
          height: "200%",
          backgroundImage: "url(/pattern-illustration.jpg)",
          backgroundRepeat: "repeat",
          backgroundSize: "500px",
          animationDuration: `${speed}s`,
          opacity: 0.5,
          filter: "grayscale(20%) contrast(1.1)",
        }}
      />

      {/* 
        LAYER 2: Interactive Bloom Layer
        Slightly scaled up (bloomed), brighter, actively tracked by cursor mask
      */}
      {interactive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: hoverOpacity,
            // The mask stays locked to the static container
            WebkitMaskImage: useMotionTemplate`radial-gradient(350px circle at ${springX}px ${springY}px, black 0%, transparent 100%)`,
            maskImage: useMotionTemplate`radial-gradient(350px circle at ${springX}px ${springY}px, black 0%, transparent 100%)`,
          }}
        >
          {/* Inner layer drifts, but is visible only through the mask */}
          <div
            className="animate-pattern-drift absolute top-0 left-0"
            style={{
              width: "200%",
              height: "200%",
              backgroundImage: "url(/pattern-illustration.jpg)",
              backgroundRepeat: "repeat",
              // Make background size 10% larger to emulate "blooming" / magnification
              backgroundSize: "550px",
              animationDuration: `${speed}s`,
              filter: "brightness(1.5) contrast(1.2)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
