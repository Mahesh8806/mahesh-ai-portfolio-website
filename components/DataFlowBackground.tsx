import React, { useEffect, useRef } from 'react';

/**
 * Animated "AI data flow" background.
 *
 * Draws a layered graph that reads as both a data pipeline and a neural net:
 * columns of nodes (ingest → transform → embed → retrieve → generate) joined by
 * curved edges, with small data packets travelling along them left to right.
 *
 * - Canvas 2D, one requestAnimationFrame loop, devicePixelRatio capped at 2.
 * - Pauses when the hero is off screen or the tab is hidden.
 * - prefers-reduced-motion: renders a single static frame, no animation.
 * - Follows the site's `dark` class on <html> for light/dark palettes.
 * - Purely decorative: aria-hidden, pointer-events none.
 */

type Node = { x: number; y: number; layer: number; r: number; phase: number };
type Edge = { a: Node; b: Node; c1x: number; c1y: number; c2x: number; c2y: number };
type Packet = { edge: Edge; t: number; speed: number; hue: 0 | 1 };

const STAGES = ['ingest', 'transform', 'embed', 'retrieve', 'generate'];

const PALETTE = {
  dark: {
    edge: 'rgba(148, 163, 184, 0.10)',
    node: 'rgba(148, 163, 184, 0.35)',
    nodeCore: 'rgba(226, 232, 240, 0.85)',
    packet: ['34, 211, 238', '168, 85, 247'], // cyan-400, purple-500
    grid: 'rgba(148, 163, 184, 0.05)',
    label: 'rgba(148, 163, 184, 0.35)',
  },
  light: {
    edge: 'rgba(71, 85, 105, 0.12)',
    node: 'rgba(71, 85, 105, 0.30)',
    nodeCore: 'rgba(51, 65, 85, 0.75)',
    packet: ['8, 145, 178', '147, 51, 234'], // cyan-600, purple-600
    grid: 'rgba(71, 85, 105, 0.06)',
    label: 'rgba(71, 85, 105, 0.45)',
  },
};

// Small deterministic PRNG so the layout is stable between renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function bezier(e: Edge, t: number) {
  const u = 1 - t;
  const x = u * u * u * e.a.x + 3 * u * u * t * e.c1x + 3 * u * t * t * e.c2x + t * t * t * e.b.x;
  const y = u * u * u * e.a.y + 3 * u * u * t * e.c1y + 3 * u * t * t * e.c2y + t * t * t * e.b.y;
  return { x, y };
}

const DataFlowBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = motionQuery.matches;
    let isDark = document.documentElement.classList.contains('dark');

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let packets: Packet[] = [];
    let outgoing = new Map<Node, Edge[]>();
    let inputEdges: Edge[] = [];
    let raf = 0;
    let visible = true;
    let last = 0;
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = mulberry32(42);
      const small = width < 768;
      const layers = small ? 4 : STAGES.length;
      const perLayer = small ? [3, 4, 4, 3] : [4, 6, 7, 6, 4];
      const marginX = width * (small ? 0.08 : 0.06);
      const top = height * 0.16;
      const bottom = height * 0.86;

      nodes = [];
      const columns: Node[][] = [];
      for (let l = 0; l < layers; l++) {
        const x = marginX + ((width - marginX * 2) * l) / (layers - 1);
        const count = perLayer[l];
        const col: Node[] = [];
        for (let i = 0; i < count; i++) {
          const y = top + ((bottom - top) * (i + 0.5)) / count + (rand() - 0.5) * 24;
          const n = { x: x + (rand() - 0.5) * 30, y, layer: l, r: 2 + rand() * 1.8, phase: rand() * Math.PI * 2 };
          col.push(n);
          nodes.push(n);
        }
        columns.push(col);
      }

      // Connect each node to 2–3 nodes in the next layer, like a sparse DAG.
      edges = [];
      for (let l = 0; l < columns.length - 1; l++) {
        for (const a of columns[l]) {
          const next = columns[l + 1];
          const picks = new Set<number>();
          const k = 2 + Math.floor(rand() * 2);
          while (picks.size < Math.min(k, next.length)) picks.add(Math.floor(rand() * next.length));
          for (const j of picks) {
            const b = next[j];
            const dx = (b.x - a.x) * 0.5;
            edges.push({ a, b, c1x: a.x + dx, c1y: a.y, c2x: b.x - dx, c2y: b.y });
          }
        }
      }

      outgoing = new Map();
      for (const e of edges) outgoing.set(e.a, [...(outgoing.get(e.a) || []), e]);
      inputEdges = edges.filter((e) => e.a.layer === 0);

      const packetCount = small ? 18 : 42;
      packets = Array.from({ length: packetCount }, () => ({
        edge: edges[Math.floor(rand() * edges.length)],
        t: rand(),
        speed: 0.12 + rand() * 0.18,
        hue: rand() < 0.6 ? 0 : 1,
      }));
    };

    const draw = (dt: number) => {
      const p = isDark ? PALETTE.dark : PALETTE.light;
      ctx.clearRect(0, 0, width, height);

      // Faint dot grid for a "blueprint" feel.
      ctx.fillStyle = p.grid;
      const step = 32;
      for (let gx = step / 2; gx < width; gx += step) {
        for (let gy = step / 2; gy < height; gy += step) {
          ctx.fillRect(gx, gy, 1, 1);
        }
      }

      // Edges.
      ctx.lineWidth = 1;
      ctx.strokeStyle = p.edge;
      ctx.beginPath();
      for (const e of edges) {
        ctx.moveTo(e.a.x, e.a.y);
        ctx.bezierCurveTo(e.c1x, e.c1y, e.c2x, e.c2y, e.b.x, e.b.y);
      }
      ctx.stroke();

      // Packets with short trails.
      const now = performance.now() / 1000;
      for (const pk of packets) {
        if (!reduced) {
          pk.t += pk.speed * dt;
          if (pk.t >= 1) {
            // Hop onto an outgoing edge from the node we arrived at, or restart at the inputs.
            const out = outgoing.get(pk.edge.b);
            const pool = out && out.length ? out : inputEdges;
            pk.edge = pool[Math.floor(Math.random() * pool.length)];
            pk.t = 0;
          }
        }
        const rgb = p.packet[pk.hue];
        for (let s = 4; s >= 0; s--) {
          const tt = pk.t - s * 0.025;
          if (tt < 0) continue;
          const pt = bezier(pk.edge, tt);
          const alpha = s === 0 ? 0.95 : 0.35 * (1 - s / 5);
          ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, s === 0 ? 2.2 : 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
        const head = bezier(pk.edge, pk.t);
        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10);
        glow.addColorStop(0, `rgba(${rgb}, 0.35)`);
        glow.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes: soft pulse, brighter near the pointer.
      for (const n of nodes) {
        const pulse = reduced ? 0.5 : 0.5 + 0.5 * Math.sin(now * 1.4 + n.phase);
        const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        const near = Math.max(0, 1 - d / 160);
        ctx.fillStyle = p.node;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 2.5 + pulse * 1.5 + near * 3, 0, Math.PI * 2);
        ctx.fill();
        if (near > 0) {
          ctx.fillStyle = `rgba(${p.packet[0]}, ${0.5 * near})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 6 + near * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = p.nodeCore;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stage labels along the bottom, like a pipeline diagram.
      if (width >= 768) {
        ctx.fillStyle = p.label;
        ctx.font = '500 11px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.textAlign = 'center';
        const xs = new Map<number, number[]>();
        for (const n of nodes) xs.set(n.layer, [...(xs.get(n.layer) || []), n.x]);
        xs.forEach((list, layer) => {
          const avg = list.reduce((s, v) => s + v, 0) / list.length;
          ctx.fillText(`0${layer + 1} · ${STAGES[layer]}`, avg, height * 0.94);
        });
      }
    };

    const loop = (ts: number) => {
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
      last = ts;
      draw(dt);
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(loop);
      else raf = 0;
    };

    const start = () => {
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };

    const redraw = () => {
      if (reduced || !visible) draw(0);
      else start();
    };

    build();
    redraw();

    const ro = new ResizeObserver(() => {
      build();
      draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) redraw();
    });
    io.observe(canvas);

    const mo = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
      draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const onMotion = (e: MediaQueryListEvent) => {
      reduced = e.matches;
      redraw();
    };
    motionQuery.addEventListener('change', onMotion);

    const onVisibility = () => {
      if (!document.hidden) redraw();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      if (reduced) draw(0);
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
      if (reduced) draw(0);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      motionQuery.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none block w-full h-full ${className}`} />;
};

export default DataFlowBackground;
