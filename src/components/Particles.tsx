"use client";

import { useEffect, useRef } from "react";

// Colores de acento (rosa) como "r,g,b" para poder variar la opacidad.
const COLORS = ["255,47,146", "255,181,243"];
const LINK_DISTANCE = 130;
const POINTER_RADIUS = 120;

type Particle = {
  x: number;
  y: number;
  bx: number; // velocidad base (deriva)
  by: number;
  px: number; // empujón del puntero, se disipa solo
  py: number;
  r: number;
  color: string;
};

/**
 * Partículas conectadas que huyen del puntero, al estilo de los sketches de
 * Processing. Canvas 2D nativo, sin librerías.
 */
export default function Particles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // ponytail: se regeneran al redimensionar; suficiente para un adorno.
      const count = Math.min(70, Math.round((w * h) / 9000));
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        bx: (Math.random() - 0.5) * 0.4,
        by: (Math.random() - 0.5) * 0.4,
        px: 0,
        py: 0,
        r: 1.5 + Math.random() * 2.5,
        color: COLORS[i % COLORS.length],
      }));
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < POINTER_RADIUS && dist > 0) {
          const force = (1 - dist / POINTER_RADIUS) * 1.2;
          p.px += (dx / dist) * force;
          p.py += (dy / dist) * force;
        }
        p.px *= 0.92;
        p.py *= 0.92;
        p.x += p.bx + p.px;
        p.y += p.by + p.py;

        // rebotan en los bordes
        if (p.x < 0 || p.x > w) p.bx *= -1;
        if (p.y < 0 || p.y > h) p.by *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));

        ctx.fillStyle = `rgba(${p.color},0.8)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // líneas entre partículas cercanas (O(n²), n ≤ 70)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${a.color},${(1 - d / LINK_DISTANCE) * 0.6})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const setPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const clearPointer = () => {
      pointer.x = pointer.y = -9999;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Solo anima mientras el hero está en pantalla.
    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) frame();
    });
    visibility.observe(canvas);

    window.addEventListener("pointermove", setPointer);
    window.addEventListener("pointerdown", setPointer);
    window.addEventListener("pointerup", clearPointer);
    window.addEventListener("pointercancel", clearPointer);
    document.documentElement.addEventListener("pointerleave", clearPointer);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", setPointer);
      window.removeEventListener("pointerdown", setPointer);
      window.removeEventListener("pointerup", clearPointer);
      window.removeEventListener("pointercancel", clearPointer);
      document.documentElement.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
