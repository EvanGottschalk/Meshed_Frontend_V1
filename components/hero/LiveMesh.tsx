"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StaticMesh } from "./StaticMesh";

interface LiveMeshProps {
  className?: string;
}

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  hue: number;
}

const SPECTRUM_HUES = [195, 210, 230, 250, 270, 290, 310, 330, 350, 20, 40, 50];
const NODE_COUNT = 56;
const EDGE_DISTANCE = 110;

function rngFromSeed(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

export function LiveMesh({ className }: LiveMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const rng = rngFromSeed(42);
    const nodes: Node[] = [];

    const init = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          id: i,
          x: rng() * width,
          y: rng() * height,
          vx: (rng() - 0.5) * 0.18,
          vy: (rng() - 0.5) * 0.18,
          baseR: 2.6 + rng() * 2.4,
          hue: SPECTRUM_HUES[i % SPECTRUM_HUES.length] + (rng() - 0.5) * 8,
        });
      }
    };

    init();
    const ro = new ResizeObserver(() => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      init();
    });
    ro.observe(container);

    let mouseX = -1000;
    let mouseY = -1000;
    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);

    let pulseTimer = 0;
    let pulses: Array<{ a: number; b: number; t: number }> = [];

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(33, now - last);
      last = now;

      pulseTimer -= dt;
      if (pulseTimer <= 0) {
        pulseTimer = 900 + Math.random() * 1100;
        const a = Math.floor(Math.random() * nodes.length);
        let b = Math.floor(Math.random() * nodes.length);
        if (b === a) b = (b + 1) % nodes.length;
        pulses.push({ a, b, t: 0 });
      }

      for (const n of nodes) {
        n.x += n.vx * (dt / 16);
        n.y += n.vy * (dt / 16);
        if (n.x < 8 || n.x > width - 8) n.vx *= -1;
        if (n.y < 8 || n.y > height - 8) n.vy *= -1;
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 80) {
          const force = (80 - dist) / 80;
          n.x -= (dx / dist) * force * 0.6;
          n.y -= (dy / dist) * force * 0.6;
        }
      }

      ctx.clearRect(0, 0, width, height);

      ctx.save();
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        0,
        width / 2,
        height * 0.45,
        Math.max(width, height) * 0.6,
      );
      grad.addColorStop(0, "rgba(122,91,255,0.14)");
      grad.addColorStop(0.55, "rgba(228,91,201,0.04)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      const edges: Array<[number, number, number]> = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < EDGE_DISTANCE) edges.push([i, j, d]);
        }
      }

      for (const [i, j, d] of edges) {
        const a = nodes[i];
        const b = nodes[j];
        const alpha = (1 - d / EDGE_DISTANCE) * 0.7;
        const lg = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        const [ar, ag, ab] = hslToRgb(a.hue, 75, 55);
        const [br, bg, bb] = hslToRgb(b.hue, 75, 55);
        lg.addColorStop(0, `rgba(${ar},${ag},${ab},${alpha})`);
        lg.addColorStop(1, `rgba(${br},${bg},${bb},${alpha})`);
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        p.t += dt / 1200;
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;
        const [r, g, bl] = hslToRgb((a.hue + b.hue) / 2, 80, 70);
        ctx.fillStyle = `rgba(${r},${g},${bl},0.95)`;
        ctx.beginPath();
        ctx.arc(px, py, 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${r},${g},${bl},0.25)`;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        const [r, g, b] = hslToRgb(n.hue, 75, 62);
        ctx.fillStyle = `rgba(${r},${g},${b},0.18)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.baseR + 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${r},${g},${b},1)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.baseR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,0.85)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.baseR * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  if (reduced) {
    return <StaticMesh className={className} />;
  }

  return (
    <div ref={containerRef} className={cn("relative h-full w-full", className)}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
      <span className="sr-only">
        An animated network of verified-human nodes connected across a full
        color spectrum.
      </span>
    </div>
  );
}
