import React from 'react';
import { ProjectVisual as Kind } from '../types.ts';

/**
 * Custom schematic artwork for each project, drawn in SVG so it is crisp,
 * tiny, theme-aware (colours come from CSS tokens) and true to how each
 * project actually works.
 */

const Box: React.FC<{ x: number; y: number; w: number; h: number; label: string; sub?: string; accent?: boolean }> = ({
  x, y, w, h, label, sub, accent,
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={10} className={accent ? 'fill-accent-soft stroke-accent' : 'fill-elev stroke-line-strong'} strokeWidth={1} />
    <text x={x + w / 2} y={y + h / 2 + (sub ? -3 : 4)} textAnchor="middle" className="fill-fg" style={{ font: '500 11px var(--font-sans)' }}>
      {label}
    </text>
    {sub && (
      <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" className="fill-muted" style={{ font: '400 9px var(--font-mono)' }}>
        {sub}
      </text>
    )}
  </g>
);

const Flow: React.FC<{ d: string; accent?: boolean }> = ({ d, accent }) => (
  <>
    <path d={d} fill="none" className="stroke-line-strong" strokeWidth={1} />
    <path d={d} fill="none" className={`flow-line ${accent ? 'stroke-accent' : 'stroke-signal'}`} strokeWidth={1.4} />
  </>
);

const Agent = () => (
  <svg viewBox="0 0 400 240" className="w-full h-full" role="img" aria-label="Diagram: website to Playwright ETL to PostgreSQL to a LangChain agent with 10 SQL tools to a streaming chat">
    <Box x={12} y={40} w={100} h={44} label="Website" sub="client-rendered" />
    <Box x={12} y={150} w={100} h={44} label="Playwright" sub="250 rows" />
    <Box x={150} y={95} w={96} h={50} label="PostgreSQL" sub="fact + 3 lookups" />
    <Box x={296} y={40} w={90} h={50} label="Deep Agent" sub="10 SQL tools" accent />
    <Flow d="M62 84 V150" />
    <Flow d="M112 172 C 135 172, 130 120, 150 120" />
    <Flow d="M246 120 C 275 120, 270 65, 296 65" accent />
    {/* chat */}
    <g>
      <rect x={278} y={130} width={110} height={92} rx={12} className="fill-elev stroke-line-strong" />
      <rect x={290} y={142} width={64} height={14} rx={7} className="fill-surface-2" />
      <rect x={312} y={162} width={64} height={14} rx={7} className="fill-accent-soft stroke-accent" strokeWidth={0.6} />
      <rect x={290} y={182} width={80} height={6} rx={3} className="fill-surface-2" />
      <rect x={290} y={194} width={56} height={6} rx={3} className="fill-surface-2" />
      <circle cx={354} cy={208} r={2} className="fill-signal pulse-dot" />
    </g>
    <Flow d="M341 90 V130" accent />
    <text x={150} y={190} className="fill-subtle" style={{ font: '400 9px var(--font-mono)' }}>6 checks · SSE stream</text>
  </svg>
);

const Shield = () => {
  const rows = [30, 58, 86, 114, 142, 170, 198];
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full" role="img" aria-label="Diagram: incoming prompts screened by a DistilBERT classifier before reaching the LLM">
      {rows.map((y, i) => (
        <g key={y}>
          <path d={`M16 ${y} H150`} className="stroke-line" strokeWidth={1} />
          <circle cx={30 + ((i * 37) % 100)} cy={y} r={4} className={i % 3 === 1 ? 'fill-signal' : 'fill-rose-400'} opacity={0.85} />
        </g>
      ))}
      <path d="M200 30 L238 44 V112 C238 150 214 178 200 188 C186 178 162 150 162 112 V44 Z" className="fill-accent-soft stroke-accent" strokeWidth={1.2} />
      <path d="M186 108 l10 10 l20 -22" fill="none" className="stroke-accent" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <text x={200} y={212} textAnchor="middle" className="fill-muted" style={{ font: '400 9px var(--font-mono)' }}>DistilBERT · F1 0.99</text>
      <Flow d="M238 110 H290" accent />
      <Box x={290} y={84} w={96} h={52} label="7B LLM" sub="+ safety prompt" />
      <text x={290} y={170} className="fill-fg" style={{ font: '600 22px var(--font-sans)' }}>&lt;1%</text>
      <text x={290} y={186} className="fill-muted" style={{ font: '400 9px var(--font-mono)' }}>jailbreak success</text>
      <text x={290} y={50} className="fill-subtle" style={{ font: '400 9px var(--font-mono)', textDecoration: 'line-through' }}>was up to 77%</text>
    </svg>
  );
};

const Rag = () => {
  const dots = [
    [250, 70], [266, 84], [242, 96], [276, 66], [258, 108], [284, 98], [236, 78], [270, 120], [292, 80], [248, 126],
  ];
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full" role="img" aria-label="Diagram: PDF split into chunks, embedded into Milvus, retrieved to ground a Gemini answer">
      {[0, 1, 2].map((i) => (
        <rect key={i} x={20 + i * 6} y={50 + i * 6} width={70} height={92} rx={8} className="fill-elev stroke-line-strong" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={42} y={74 + i * 12} width={i % 2 ? 36 : 48} height={5} rx={2.5} className="fill-surface-2" />
      ))}
      <text x={67} y={168} textAnchor="middle" className="fill-muted" style={{ font: '400 9px var(--font-mono)' }}>PDF → chunks</text>
      <Flow d="M104 100 H200" />
      <circle cx={264} cy={96} r={58} className="fill-surface stroke-line" strokeDasharray="3 4" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.2} className={i < 3 ? 'fill-accent' : 'fill-subtle'} />
      ))}
      <text x={264} y={172} textAnchor="middle" className="fill-muted" style={{ font: '400 9px var(--font-mono)' }}>Milvus · top-k</text>
      <Flow d="M264 154 V190 H150" accent />
      <rect x={40} y={180} width={110} height={36} rx={10} className="fill-accent-soft stroke-accent" strokeWidth={0.8} />
      <text x={95} y={202} textAnchor="middle" className="fill-fg" style={{ font: '500 11px var(--font-sans)' }}>Grounded answer</text>
    </svg>
  );
};

const Collision = () => {
  const bars = [150, 46, 12];
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full" role="img" aria-label="Diagram: three data sources flowing through raw, clean and feature layers, with an imbalanced severity distribution">
      {['DfT collisions', 'Met Office weather', 'Population'].map((s, i) => (
        <g key={s}>
          <rect x={16} y={36 + i * 54} width={110} height={34} rx={8} className="fill-elev stroke-line-strong" />
          <text x={71} y={57 + i * 54} textAnchor="middle" className="fill-fg-2" style={{ font: '400 10px var(--font-sans)' }}>{s}</text>
          <Flow d={`M126 ${53 + i * 54} C 150 ${53 + i * 54}, 150 112, 168 112`} />
        </g>
      ))}
      {['raw', 'clean', 'feature'].map((l, i) => (
        <g key={l}>
          <rect x={168 + i * 6} y={70 + i * 18} width={70} height={30} rx={6} className={i === 2 ? 'fill-accent-soft stroke-accent' : 'fill-elev stroke-line-strong'} />
          <text x={203 + i * 6} y={89 + i * 18} textAnchor="middle" className="fill-muted" style={{ font: '400 9px var(--font-mono)' }}>{l}</text>
        </g>
      ))}
      {bars.map((h, i) => (
        <g key={i}>
          <rect x={290 + i * 32} y={200 - h * 0.9} width={22} height={h * 0.9} rx={4} className={i === 2 ? 'fill-accent' : 'fill-surface-2 stroke-line-strong'} />
          <text x={301 + i * 32} y={216} textAnchor="middle" className="fill-subtle" style={{ font: '400 8px var(--font-mono)' }}>{['slight', 'serious', 'fatal'][i]}</text>
        </g>
      ))}
      <text x={290} y={50} className="fill-muted" style={{ font: '400 9px var(--font-mono)' }}>SMOTE · SHAP</text>
    </svg>
  );
};

const Bikes = () => {
  // Shape only: two demand peaks (7–9 AM and 5–7 PM) found in the analysis.
  const pts: [number, number][] = [];
  for (let h = 0; h <= 24; h += 0.5) {
    const peak = (c: number, w: number) => Math.exp(-((h - c) ** 2) / (2 * w * w));
    const v = 0.12 + 0.85 * peak(8, 1) + 0.75 * peak(18, 1.1) + 0.25 * peak(13, 2.5);
    pts.push([30 + (h / 24) * 340, 190 - v * 130]);
  }
  const d = 'M' + pts.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L');
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full" role="img" aria-label="Chart shape: Dublin Bikes demand peaks at 7 to 9 AM and 5 to 7 PM">
      <rect x={30 + (7 / 24) * 340} y={40} width={(2 / 24) * 340} height={150} className="fill-accent-soft" />
      <rect x={30 + (17 / 24) * 340} y={40} width={(2 / 24) * 340} height={150} className="fill-accent-soft" />
      <path d="M30 190 H370" className="stroke-line-strong" />
      <path d={d + ' L370 190 L30 190 Z'} className="fill-surface-2" />
      <path d={d} fill="none" className="stroke-accent" strokeWidth={1.6} />
      {[0, 6, 12, 18, 24].map((h) => (
        <text key={h} x={30 + (h / 24) * 340} y={208} textAnchor="middle" className="fill-subtle" style={{ font: '400 9px var(--font-mono)' }}>
          {String(h).padStart(2, '0')}:00
        </text>
      ))}
      <text x={30 + (8 / 24) * 340} y={34} textAnchor="middle" className="fill-muted" style={{ font: '400 9px var(--font-mono)' }}>7–9 AM</text>
      <text x={30 + (18 / 24) * 340} y={34} textAnchor="middle" className="fill-muted" style={{ font: '400 9px var(--font-mono)' }}>5–7 PM</text>
    </svg>
  );
};

const MAP: Record<Kind, React.FC> = { agent: Agent, shield: Shield, rag: Rag, collision: Collision, bikes: Bikes };

const ProjectVisual: React.FC<{ kind: Kind; className?: string }> = ({ kind, className = '' }) => {
  const C = MAP[kind];
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-bg ${className}`}>
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden />
      <div className="relative w-full h-full p-3">
        <C />
      </div>
    </div>
  );
};

export default ProjectVisual;
