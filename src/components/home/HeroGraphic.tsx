"use client";

import { useRef, useEffect } from "react";

/**
 * Interactive starburst / fiber-optic graphic.
 * Full 360° circle, smooth spring physics, immediate mouse response.
 *
 * Key architecture: ALL mutable state lives in plain objects/arrays
 * (not React state). The animation loop reads mouseRef directly
 * with zero indirection — no stale closures, no useCallback deps.
 */

/* ── tunables ── */
const SPINE_COUNT = 260;
const BASE_LENGTH_MIN = 60;
const BASE_LENGTH_MAX = 500;
const DOT_RADIUS_MIN = 0.8;
const DOT_RADIUS_MAX = 2.6;

/* mouse interaction – larger radius + stronger force for instant feel */
const REPULSE_RADIUS = 280;
const REPULSE_STRENGTH = 0.12;
const SPRING_K = 0.008;
const DAMPING = 0.93;

/* idle motion */
const IDLE_DRIFT_SPEED = 0.00025;
const IDLE_DRIFT_AMP = 0.014;
const IDLE_SWAY_SPEED = 0.0007;
const IDLE_SWAY_AMP = 0.03;
const IDLE_WAVE_SPEED = 0.00035;
const IDLE_WAVE_AMP = 0.012;

/* sparkles */
const SPARKLE_LIFE = 130;
const MAX_SPARKLES = 90;
const SPARKLE_SPAWN_INTERVAL = 3; // every N frames

interface Spine {
  baseAngle: number;
  angleOffset: number;
  velocity: number;
  length: number;
  opacity: number;
  depth: number;
  phase: number;
  thickness: number;
  dotRadius: number;
  breathPhase: number;
  breathAmp: number;
  index: number;
}

interface Sparkle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
}

function createSpines(): Spine[] {
  const spines: Spine[] = [];
  for (let i = 0; i < SPINE_COUNT; i++) {
    const fraction = i / SPINE_COUNT;
    const baseAngle = fraction * Math.PI * 2;
    const depth = Math.random();
    const depthScale = 0.45 + (1 - depth) * 0.55;
    const length =
      (BASE_LENGTH_MIN + Math.random() * (BASE_LENGTH_MAX - BASE_LENGTH_MIN)) *
      depthScale;
    spines.push({
      baseAngle,
      angleOffset: 0,
      velocity: 0,
      length,
      opacity: (0.2 + Math.random() * 0.8) * (0.35 + (1 - depth) * 0.65),
      depth,
      phase: Math.random() * Math.PI * 2,
      thickness: (0.3 + Math.random() * 1.2) * (0.4 + (1 - depth) * 0.6),
      dotRadius:
        (DOT_RADIUS_MIN + Math.random() * (DOT_RADIUS_MAX - DOT_RADIUS_MIN)) *
        (0.4 + (1 - depth) * 0.6),
      breathPhase: Math.random() * Math.PI * 2,
      breathAmp: 0.02 + Math.random() * 0.04,
      index: i,
    });
  }
  spines.sort((a, b) => b.depth - a.depth);
  return spines;
}

export function HeroGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    // --- mutable state (no React involvement) ---
    const spines = createSpines();
    let sparkles: Sparkle[] = [];
    let frame = 0;
    let rafId = 0;

    // --- resize ---
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // --- mouse handlers (direct ref mutation, zero latency) ---
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current = null;
    };

    canvas.addEventListener("mousemove", onMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", onMouseLeave);

    // --- sparkle spawner ---
    const spawnSparkle = (ox: number, oy: number) => {
      if (sparkles.length >= MAX_SPARKLES) return;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 200 * dpr;
      sparkles.push({
        x: ox + Math.cos(angle) * dist,
        y: oy + Math.sin(angle) * dist,
        life: 0,
        maxLife: SPARKLE_LIFE * (0.4 + Math.random() * 0.6),
        size: (0.5 + Math.random() * 1.8) * dpr,
        opacity: 0.3 + Math.random() * 0.6,
        vx: (Math.random() - 0.5) * 0.15 * dpr,
        vy: (Math.random() - 0.5) * 0.15 * dpr,
      });
    };

    // --- animation loop ---
    const animate = () => {
      const W = canvas.width;
      const H = canvas.height;
      frame++;

      ctx.clearRect(0, 0, W, H);

      const ox = W * 0.92;
      const oy = H * 0.40;

      // read mouse DIRECTLY from ref — always current, never stale
      const mouse = mouseRef.current;
      const repulseR = REPULSE_RADIUS * dpr;

      // global idle drift
      const globalDrift = Math.sin(frame * IDLE_DRIFT_SPEED) * IDLE_DRIFT_AMP;

      // --- physics update ---
      for (let i = 0; i < spines.length; i++) {
        const spine = spines[i];
        let force = 0;

        // idle sway + wave
        const sway =
          Math.sin(frame * IDLE_SWAY_SPEED * (0.7 + spine.depth * 0.6) + spine.phase) *
          IDLE_SWAY_AMP * (0.4 + spine.depth * 0.6);
        const wave =
          Math.sin(frame * IDLE_WAVE_SPEED + spine.index * 0.06) *
          IDLE_WAVE_AMP;
        const idleTarget = sway + wave + globalDrift;

        if (mouse) {
          const tipAngle = spine.baseAngle + spine.angleOffset;
          const perspScale = 0.55 + (1 - spine.depth) * 0.45;
          const len = spine.length * dpr * perspScale;
          const depthOffsetY = (spine.depth - 0.5) * 50 * dpr;
          const tipX = ox + Math.cos(tipAngle) * len;
          const tipY = oy + Math.sin(tipAngle) * len + depthOffsetY;

          const dx = tipX - mouse.x;
          const dy = tipY - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < repulseR * repulseR) {
            const dist = Math.sqrt(distSq);
            const spineVecX = Math.cos(spine.baseAngle);
            const spineVecY = Math.sin(spine.baseAngle);
            const toMouseX = mouse.x - ox;
            const toMouseY = mouse.y - oy;
            const cross = spineVecX * toMouseY - spineVecY * toMouseX;
            const sign = cross > 0 ? -1 : 1;

            const strength = REPULSE_STRENGTH * (1 - dist / repulseR);
            force = sign * strength;
          }
        }

        const spring = -SPRING_K * (spine.angleOffset - idleTarget);
        spine.velocity += spring + force;
        spine.velocity *= DAMPING;
        spine.angleOffset += spine.velocity;
      }

      // --- center glow ---
      const glowR = Math.min(W, H) * 0.6;
      const glow = ctx.createRadialGradient(ox, oy, 0, ox, oy, glowR);
      glow.addColorStop(0, "rgba(255,255,255,0.5)");
      glow.addColorStop(0.12, "rgba(220,235,255,0.22)");
      glow.addColorStop(0.3, "rgba(140,180,240,0.08)");
      glow.addColorStop(0.55, "rgba(100,160,230,0.03)");
      glow.addColorStop(1, "rgba(27,31,94,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // --- draw spines ---
      for (let i = 0; i < spines.length; i++) {
        const spine = spines[i];
        const angle = spine.baseAngle + spine.angleOffset;

        const perspScale = 0.55 + (1 - spine.depth) * 0.45;
        const breathMod =
          1 + Math.sin(frame * 0.0008 + spine.breathPhase) * spine.breathAmp;
        const len = spine.length * dpr * perspScale * breathMod;

        const depthOffsetY = (spine.depth - 0.5) * 50 * dpr;
        const tipX = ox + Math.cos(angle) * len;
        const tipY = oy + Math.sin(angle) * len + depthOffsetY;

        // edge fade
        const edgeFadeX = Math.min(tipX / (W * 0.08), (W - tipX) / (W * 0.05), 1);
        const edgeFadeY = Math.min(tipY / (H * 0.06), (H - tipY) / (H * 0.06), 1);
        const edgeFade =
          Math.max(0, Math.min(1, edgeFadeX)) *
          Math.max(0, Math.min(1, edgeFadeY));

        const finalOpacity = spine.opacity * edgeFade;
        if (finalOpacity < 0.01) continue;

        // line
        const a1 = finalOpacity * 0.9;
        const a2 = finalOpacity * 0.2;
        const lineGrad = ctx.createLinearGradient(ox, oy, tipX, tipY);
        lineGrad.addColorStop(0, `rgba(245,250,255,${a1})`);
        lineGrad.addColorStop(1, `rgba(130,185,235,${a2})`);

        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(tipX, tipY);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = spine.thickness * dpr;
        ctx.stroke();

        // tip dot
        if (spine.dotRadius > 0.4) {
          const dr = spine.dotRadius * dpr;

          ctx.beginPath();
          ctx.arc(tipX, tipY, dr * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,225,255,${finalOpacity * 0.25})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(tipX, tipY, dr, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${finalOpacity * 0.9})`;
          ctx.fill();
        }
      }

      // --- sparkles ---
      if (frame % SPARKLE_SPAWN_INTERVAL === 0) {
        spawnSparkle(ox, oy);
        // spawn two at a time for more density
        if (sparkles.length < MAX_SPARKLES - 1) {
          spawnSparkle(ox, oy);
        }
      }

      const alive: Sparkle[] = [];
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        if (s.life < s.maxLife) {
          alive.push(s);
          const progress = s.life / s.maxLife;
          const alpha =
            progress < 0.1
              ? progress / 0.1
              : progress > 0.55
              ? (1 - progress) / 0.45
              : 1;

          const eFX = Math.min(s.x / (W * 0.1), (W - s.x) / (W * 0.05), 1);
          const eFY = Math.min(s.y / (H * 0.08), (H - s.y) / (H * 0.08), 1);
          const eFade =
            Math.max(0, Math.min(1, eFX)) * Math.max(0, Math.min(1, eFY));

          const sparkAlpha = alpha * s.opacity * eFade * 0.7;
          if (sparkAlpha > 0.01) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220,240,255,${sparkAlpha})`;
            ctx.fill();
          }
        }
      }
      sparkles = alive;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []); // empty deps — mount once, never recreate

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
