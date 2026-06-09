"use client";

import { useEffect, useRef } from "react";

const SYMBOLS = [
  "∑", "∫", "π", "∞", "√", "∂", "Δ", "θ", "∇", "±",
  "λ", "φ", "α", "β", "γ", "ε", "lim", "dx", "dy", "∈",
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  sym: string;
  size: number;
  opacity: number;
  rot: number; vrot: number;
}

export default function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width  = W;
      canvas!.height = H;
    }
    resize();

    const isDark = () =>
      document.documentElement.classList.contains("dark");

    /* Create particles once; positions scale with resize */
    const particles: Particle[] = Array.from({ length: 24 }, () => ({
      x:       Math.random() * W,
      y:       Math.random() * H,
      vx:      (Math.random() - 0.5) * 0.22,
      vy:      (Math.random() - 0.5) * 0.18 - 0.04,
      sym:     SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size:    18 + Math.random() * 30,
      opacity: 0.04 + Math.random() * 0.09,
      rot:     Math.random() * Math.PI * 2,
      vrot:    (Math.random() - 0.5) * 0.003,
    }));

    let t = 0;

    function frame() {
      t += 0.004;
      const dark = isDark();

      /* ── Background gradient ── */
      const bg = ctx.createLinearGradient(0, 0, W, H);
      if (dark) {
        bg.addColorStop(0,   "#050c22");
        bg.addColorStop(0.5, "#060f2a");
        bg.addColorStop(1,   "#04091c");
      } else {
        bg.addColorStop(0,   "#c2d8f8");
        bg.addColorStop(0.5, "#d6e8ff");
        bg.addColorStop(1,   "#cde0ff");
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* ── Radial accent glow ── */
      const glow = ctx.createRadialGradient(W * 0.25, H * 0.4, 0, W * 0.25, H * 0.4, W * 0.55);
      if (dark) {
        glow.addColorStop(0,   "rgba(79,70,229,0.10)");
        glow.addColorStop(1,   "rgba(79,70,229,0)");
      } else {
        glow.addColorStop(0,   "rgba(79,70,229,0.08)");
        glow.addColorStop(1,   "rgba(79,70,229,0)");
      }
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      /* ── Grid dots ── */
      const dotAlpha = dark ? 0.045 : 0.055;
      ctx.fillStyle = `rgba(99,102,241,${dotAlpha})`;
      for (let gx = 0; gx <= W; gx += 50) {
        for (let gy = 0; gy <= H; gy += 50) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      /* ── Sine wave curves ── */
      const waves = [
        { yFrac: 0.35, amp: 55, freq: 0.0042, speed: 1,    alpha: dark ? 0.06 : 0.07 },
        { yFrac: 0.55, amp: 40, freq: 0.006,  speed: 0.65, alpha: dark ? 0.05 : 0.06 },
        { yFrac: 0.72, amp: 30, freq: 0.009,  speed: 0.45, alpha: dark ? 0.04 : 0.05 },
      ];
      waves.forEach(({ yFrac, amp, freq, speed, alpha }) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
        ctx.lineWidth = 1.5;
        for (let x = 0; x <= W; x += 3) {
          const y = H * yFrac + Math.sin(x * freq + t * speed) * amp
                               + Math.sin(x * freq * 2 + t * speed * 0.5) * (amp * 0.4);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      /* ── Math symbol particles ── */
      ctx.textBaseline = "middle";
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.font = `${p.size}px "Georgia", "Times New Roman", serif`;
        ctx.fillStyle = dark
          ? `rgba(148,163,210,${p.opacity})`
          : `rgba(50,80,170,${p.opacity * 1.3})`;
        ctx.fillText(p.sym, 0, 0);
        ctx.restore();

        p.x += p.vx; p.y += p.vy; p.rot += p.vrot;
        if (p.x < -60)      p.x = W + 60;
        if (p.x > W + 60)   p.x = -60;
        if (p.y < -60)      p.y = H + 60;
        if (p.y > H + 60)   p.y = -60;
      });

      animId = requestAnimationFrame(frame);
    }

    frame();
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full"
    />
  );
}
