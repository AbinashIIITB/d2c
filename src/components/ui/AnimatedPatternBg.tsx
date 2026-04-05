"use client";

import { useRef, useEffect } from "react";

/**
 * AnimatedPatternBg
 * ──────────────────
 * Renders a slowly-drifting starry night background with:
 * - Static star field image (slowly panning)
 * - Dynamic canvas overlay with twinkling stars + rare shooting stars
 */
export function AnimatedPatternBg({
  opacity = 0.15,
  speed = 120,
  className = "",
}: {
  opacity?: number;
  speed?: number;
  className?: string;
  interactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width * dpr;
      H = rect.height * dpr;
      canvas.width = W;
      canvas.height = H;
      // regenerate stars on resize
      initStars();
    };

    /* ── twinkling stars ── */
    interface TwinkleStar {
      x: number;
      y: number;
      baseSize: number;
      phase: number;
      speed: number;
      brightness: number;
      /** current on/off state — false means the star is "blinked off" */
      visible: boolean;
      /** frame count until next toggle */
      nextToggle: number;
      /** smooth transition: 0 = fully off, 1 = fully on */
      visAmount: number;
    }

    let twinkleStars: TwinkleStar[] = [];

    /** Random delay (in frames) before next on/off toggle */
    const randomToggleDelay = () => 40 + Math.floor(Math.random() * 260);

    const initStars = () => {
      const count = Math.floor((W * H) / (2200 * dpr));
      twinkleStars = [];
      for (let i = 0; i < count; i++) {
        const startVisible = Math.random() > 0.15; // ~15% start off
        twinkleStars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          baseSize: (0.6 + Math.random() * 2.5) * dpr,
          phase: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.016,
          brightness: 0.5 + Math.random() * 0.5,
          visible: startVisible,
          nextToggle: randomToggleDelay(),
          visAmount: startVisible ? 1 : 0,
        });
      }
    };

    /* ── shooting stars ── */
    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      length: number;
      width: number;
    }

    let shootingStars: ShootingStar[] = [];
    let shootCooldown = 60 + Math.random() * 120; // frames — much more frequent

    const spawnShootingStar = () => {
      const startX = Math.random() * W * 0.8;
      const startY = Math.random() * H * 0.4;
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 4);
      const speed = (4 + Math.random() * 6) * dpr;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 30,
        length: (60 + Math.random() * 100) * dpr,
        width: (1 + Math.random() * 1.5) * dpr,
      });
    };

    let frame = 0;

    const animate = () => {
      if (!ctx) return;
      frame++;
      ctx.clearRect(0, 0, W, H);

      // --- twinkling stars with random on/off toggling ---
      for (const star of twinkleStars) {
        // countdown to next toggle
        star.nextToggle--;
        if (star.nextToggle <= 0) {
          star.visible = !star.visible;
          star.nextToggle = randomToggleDelay();
        }

        // smoothly transition visAmount toward target (0 or 1)
        const target = star.visible ? 1 : 0;
        star.visAmount += (target - star.visAmount) * 0.08;

        // skip rendering if essentially invisible
        if (star.visAmount < 0.02) continue;

        const twinkle = Math.sin(frame * star.speed + star.phase);
        const baseAlpha = star.brightness * (0.4 + 0.6 * ((twinkle + 1) / 2));
        const alpha = baseAlpha * star.visAmount;
        const size = star.baseSize * (0.7 + 0.3 * ((twinkle + 1) / 2));

        // outer glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha * 0.22})`;
        ctx.fill();

        // core dot
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(alpha * 1.2, 1)})`;
        ctx.fill();
      }

      // --- shooting stars (frequent) ---
      shootCooldown--;
      if (shootCooldown <= 0) {
        spawnShootingStar();
        shootCooldown = 80 + Math.random() * 160;
      }

      const aliveShooters: ShootingStar[] = [];
      for (const s of shootingStars) {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;

        if (s.life < s.maxLife && s.x < W * 1.2 && s.y < H * 1.2) {
          aliveShooters.push(s);
          const progress = s.life / s.maxLife;
          // fade in then out
          const alpha = progress < 0.15
            ? progress / 0.15
            : progress > 0.5
            ? (1 - progress) / 0.5
            : 1;

          const tailX = s.x - (s.vx / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * s.length * (1 - progress * 0.5);
          const tailY = s.y - (s.vy / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * s.length * (1 - progress * 0.5);

          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0, `rgba(255,255,255,0)`);
          grad.addColorStop(0.6, `rgba(200,225,255,${alpha * 0.3})`);
          grad.addColorStop(1, `rgba(255,255,255,${alpha * 0.9})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = s.width;
          ctx.lineCap = "round";
          ctx.stroke();

          // bright head dot
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.width * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.8})`;
          ctx.fill();
        }
      }
      shootingStars = aliveShooters;

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {/* LAYER 1: Static starry night image, slowly drifting */}
      <div
        className="animate-pattern-drift absolute top-0 left-0"
        style={{
          width: "200%",
          height: "200%",
          backgroundImage: "url(/starry-night-bg.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "600px",
          animationDuration: `${speed}s`,
          opacity: 0.9,
          filter: "contrast(1.1) saturate(0.9)",
        }}
      />

      {/* LAYER 2: Dynamic canvas with twinkling + shooting stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
