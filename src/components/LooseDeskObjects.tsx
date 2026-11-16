import React, { useRef, useState, useEffect } from 'react';
import { soundManager } from '../audio/soundManager';

interface LooseItemState {
  id: string;
  x: number;
  y: number;
  rot: number;
  vx: number;
  vy: number;
}

export const LooseDeskObjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Loose items positions (in px relative to container)
  const [items, setItems] = useState<Record<string, LooseItemState>>({
    pen: { id: 'pen', x: 120, y: 560, rot: -24, vx: 0, vy: 0 },
    paperclip: { id: 'paperclip', x: 260, y: 640, rot: 32, vx: 0, vy: 0 },
    crumpled: { id: 'crumpled', x: 340, y: 690, rot: 15, vx: 0, vy: 0 },
    pencil: { id: 'pencil', x: 920, y: 610, rot: 18, vx: 0, vy: 0 },
  });

  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const dragRef = useRef<{
    id: string | null;
    startX: number;
    startY: number;
    itemStartX: number;
    itemStartY: number;
    lastX: number;
    lastY: number;
    lastTime: number;
  }>({
    id: null,
    startX: 0,
    startY: 0,
    itemStartX: 0,
    itemStartY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  });

  const animFrameRef = useRef<number | null>(null);

  // Initialize positions based on container size
  useEffect(() => {
    const updateInitial = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      if (W <= 0 || H <= 0) return;

      setItems({
        pen: {
          id: 'pen',
          x: Math.max(20, W * 0.08),
          y: Math.max(100, H * 0.74),
          rot: -22,
          vx: 0,
          vy: 0,
        },
        paperclip: {
          id: 'paperclip',
          x: Math.max(30, W * 0.17),
          y: Math.max(120, H * 0.84),
          rot: 35,
          vx: 0,
          vy: 0,
        },
        crumpled: {
          id: 'crumpled',
          x: Math.max(20, W * 0.24),
          y: Math.max(140, H * 0.87),
          rot: 12,
          vx: 0,
          vy: 0,
        },
        pencil: {
          id: 'pencil',
          x: Math.max(40, W * 0.86),
          y: Math.max(100, H * 0.76),
          rot: 15,
          vx: 0,
          vy: 0,
        },
      });
      setIsInitialized(true);
    };

    updateInitial();
    window.addEventListener('resize', updateInitial);
    return () => window.removeEventListener('resize', updateInitial);
  }, []);

  // Physics animation loop for velocity & damping
  useEffect(() => {
    let lastStamp = performance.now();

    const loop = (stamp: number) => {
      const dt = Math.min(32, stamp - lastStamp);
      lastStamp = stamp;

      setItems((prev) => {
        let changed = false;
        const next = { ...prev };
        const rect = containerRef.current?.getBoundingClientRect();
        const W = rect?.width || 1200;
        const H = rect?.height || 750;

        for (const key of Object.keys(next)) {
          if (key === dragRef.current.id) continue;
          const item = next[key];
          const speedSq = item.vx * item.vx + item.vy * item.vy;

          if (speedSq > 0.02) {
            changed = true;
            let nx = item.x + item.vx * (dt / 16);
            let ny = item.y + item.vy * (dt / 16);
            let nrot = item.rot + (item.vx * 0.12);

            // Friction
            const friction = 0.90;
            let nvx = item.vx * friction;
            let nvy = item.vy * friction;

            // Bounds bounce
            if (nx < 10) { nx = 10; nvx = -nvx * 0.4; }
            if (nx > W - 60) { nx = W - 60; nvx = -nvx * 0.4; }
            if (ny < 60) { ny = 60; nvy = -nvy * 0.4; }
            if (ny > H - 40) { ny = H - 40; nvy = -nvy * 0.4; }

            if (Math.abs(nvx) < 0.05) nvx = 0;
            if (Math.abs(nvy) < 0.05) nvy = 0;

            next[key] = {
              ...item,
              x: nx,
              y: ny,
              rot: nrot,
              vx: nvx,
              vy: nvy,
            };
          }
        }

        return changed ? next : prev;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Drag Handlers
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    const item = items[id];
    if (!item) return;

    setActiveDragId(id);
    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      itemStartX: item.x,
      itemStartY: item.y,
      lastX: e.clientX,
      lastY: e.clientY,
      lastTime: performance.now(),
    };

    soundManager.playPaperRustle();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.id) return;
    const { id, startX, startY, itemStartX, itemStartY } = dragRef.current;
    if (!id) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const now = performance.now();
    const dt = Math.max(1, now - dragRef.current.lastTime);

    const currentVx = ((e.clientX - dragRef.current.lastX) / dt) * 16;
    const currentVy = ((e.clientY - dragRef.current.lastY) / dt) * 16;

    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    dragRef.current.lastTime = now;

    const rect = containerRef.current?.getBoundingClientRect();
    const W = rect?.width || 1200;
    const H = rect?.height || 750;

    const newX = Math.max(10, Math.min(W - 60, itemStartX + dx));
    const newY = Math.max(60, Math.min(H - 40, itemStartY + dy));

    setItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        x: newX,
        y: newY,
        vx: currentVx,
        vy: currentVy,
      },
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.id) return;
    const id = dragRef.current.id;

    if (id === 'paperclip') {
      soundManager.playClip();
    } else {
      soundManager.playPaperRustle();
    }

    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }

    setActiveDragId(null);
    dragRef.current.id = null;
  };

  if (!isInitialized) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[8] overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-hidden="true"
    >
      {/* 1. FOUNTAIN PEN */}
      <div
        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none transition-shadow"
        style={{
          left: items.pen.x,
          top: items.pen.y,
          transform: `rotate(${items.pen.rot}deg) ${activeDragId === 'pen' ? 'scale(1.06) translateY(-4px)' : ''}`,
          filter: activeDragId === 'pen'
            ? 'drop-shadow(6px 14px 16px rgba(0,0,0,0.7))'
            : 'drop-shadow(2px 6px 8px rgba(0,0,0,0.55))',
        }}
        onPointerDown={(e) => handlePointerDown('pen', e)}
        title="Fountain Pen (drag to move)"
      >
        <svg width="150" height="24" viewBox="0 0 150 24" fill="none">
          <defs>
            <linearGradient id="penBarrel" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#2c3e55" />
              <stop offset="35%" stopColor="#1b2838" />
              <stop offset="70%" stopColor="#0d141d" />
              <stop offset="100%" stopColor="#05080c" />
            </linearGradient>
            <linearGradient id="penBrass" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#fae6a6" />
              <stop offset="45%" stopColor="#c99f48" />
              <stop offset="100%" stopColor="#7a5a1e" />
            </linearGradient>
            <linearGradient id="nibSteel" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#f3f4f6" />
              <stop offset="50%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
          </defs>
          {/* Main Body */}
          <rect x="26" y="7" width="94" height="10" rx="3" fill="url(#penBarrel)" />
          {/* End Cap */}
          <path d="M120 7 Q126 12 120 17 Z" fill="url(#penBrass)" />
          {/* Brass Trim Rings */}
          <rect x="36" y="6.5" width="3" height="11" rx="0.5" fill="url(#penBrass)" />
          <rect x="88" y="6.5" width="2" height="11" rx="0.5" fill="url(#penBrass)" />
          <rect x="114" y="6.5" width="3" height="11" rx="0.5" fill="url(#penBrass)" />
          {/* Brass Pocket Clip */}
          <path d="M40 5 L100 5 C102 5 103 6 102 7 L40 7 Z" fill="url(#penBrass)" />
          <circle cx="101" cy="6" r="2" fill="url(#penBrass)" />
          {/* Grip Section */}
          <rect x="16" y="8" width="10" height="8" rx="1" fill="#111" />
          {/* Two-Tone Golden Nib */}
          <polygon points="16,8 16,16 2,12" fill="url(#penBrass)" />
          <polygon points="12,9 12,15 2,12" fill="url(#nibSteel)" />
          <line x1="2" y1="12" x2="10" y2="12" stroke="#222" strokeWidth="0.5" />
          <circle cx="9" cy="12" r="0.6" fill="#111" />
        </svg>
      </div>

      {/* 2. STEEL PAPERCLIP */}
      <div
        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none"
        style={{
          left: items.paperclip.x,
          top: items.paperclip.y,
          transform: `rotate(${items.paperclip.rot}deg) ${activeDragId === 'paperclip' ? 'scale(1.1) translateY(-3px)' : ''}`,
          filter: activeDragId === 'paperclip'
            ? 'drop-shadow(4px 8px 10px rgba(0,0,0,0.65))'
            : 'drop-shadow(1px 3px 4px rgba(0,0,0,0.5))',
        }}
        onPointerDown={(e) => handlePointerDown('paperclip', e)}
        title="Steel Paperclip (drag to move)"
      >
        <svg width="46" height="22" viewBox="0 0 46 22" fill="none">
          <defs>
            <linearGradient id="wireGrad" x1="0" y1="0" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#c5cbd4" />
              <stop offset="70%" stopColor="#868d98" />
              <stop offset="100%" stopColor="#4f555e" />
            </linearGradient>
          </defs>
          {/* 3-Loop Authentic Paperclip Path */}
          <path
            d="M 8 16 L 36 16 C 40 16 43 13 43 9 C 43 5 40 2 36 2 L 10 2 C 5 2 2 5.5 2 10.5 C 2 15.5 5 19 10 19 L 34 19 C 37 19 39 17 39 14.5 C 39 12 37 10 34 10 L 14 10"
            stroke="url(#wireGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 3. CRUMPLED FIELD NOTE */}
      <div
        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none"
        style={{
          left: items.crumpled.x,
          top: items.crumpled.y,
          transform: `rotate(${items.crumpled.rot}deg) ${activeDragId === 'crumpled' ? 'scale(1.08) translateY(-4px)' : ''}`,
          filter: activeDragId === 'crumpled'
            ? 'drop-shadow(6px 12px 14px rgba(0,0,0,0.68))'
            : 'drop-shadow(2px 5px 7px rgba(0,0,0,0.52))',
        }}
        onPointerDown={(e) => handlePointerDown('crumpled', e)}
        title="Discarded Note (drag to roll)"
      >
        <svg width="44" height="42" viewBox="0 0 44 42" fill="none">
          <defs>
            <radialGradient id="paperCore" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#fdf8ed" />
              <stop offset="50%" stopColor="#dfd2b8" />
              <stop offset="85%" stopColor="#bfae92" />
              <stop offset="100%" stopColor="#87755c" />
            </radialGradient>
          </defs>
          {/* Crumpled facets polygon */}
          <polygon
            points="14,4 28,2 38,9 42,22 36,35 22,40 10,38 3,27 4,14"
            fill="url(#paperCore)"
            stroke="#96856c"
            strokeWidth="0.8"
          />
          {/* Fold and crease lines */}
          <path d="M14 4 L22 18 L38 9" stroke="#7e6c54" strokeWidth="0.9" fill="#cbbda1" fillOpacity="0.4" />
          <path d="M22 18 L26 31 L36 35" stroke="#685640" strokeWidth="0.8" fill="#a49377" fillOpacity="0.3" />
          <path d="M4 14 L22 18 L10 38" stroke="#87745b" strokeWidth="0.9" fill="#beb196" fillOpacity="0.35" />
          <path d="M22 18 L3 27" stroke="#726049" strokeWidth="0.7" />
          <path d="M26 31 L22 40" stroke="#5d4c37" strokeWidth="0.8" />
          {/* Subtle faint faded ink mark on paper facet */}
          <path d="M12 11 Q15 9 18 12" stroke="#4a3e2e" strokeWidth="0.7" strokeDasharray="1.5 1.5" opacity="0.6" />
        </svg>
      </div>

      {/* 4. VINTAGE HEXAGONAL PENCIL */}
      <div
        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none"
        style={{
          left: items.pencil.x,
          top: items.pencil.y,
          transform: `rotate(${items.pencil.rot}deg) ${activeDragId === 'pencil' ? 'scale(1.06) translateY(-4px)' : ''}`,
          filter: activeDragId === 'pencil'
            ? 'drop-shadow(6px 12px 14px rgba(0,0,0,0.65))'
            : 'drop-shadow(2px 5px 7px rgba(0,0,0,0.5))',
        }}
        onPointerDown={(e) => handlePointerDown('pencil', e)}
        title="Drafting Pencil No. 2 (drag to move)"
      >
        <svg width="140" height="20" viewBox="0 0 140 20" fill="none">
          <defs>
            <linearGradient id="pencilYellow" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#f5c742" />
              <stop offset="35%" stopColor="#e3a71b" />
              <stop offset="70%" stopColor="#c28b0f" />
              <stop offset="100%" stopColor="#875f05" />
            </linearGradient>
            <linearGradient id="ferruleMetal" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#e8eaed" />
              <stop offset="50%" stopColor="#9aa0a6" />
              <stop offset="100%" stopColor="#5f6368" />
            </linearGradient>
            <linearGradient id="eraserPink" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="50%" stopColor="#e06969" />
              <stop offset="100%" stopColor="#a33d3d" />
            </linearGradient>
            <linearGradient id="woodTip" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#dfbf93" />
              <stop offset="50%" stopColor="#c49f6c" />
              <stop offset="100%" stopColor="#a47d4a" />
            </linearGradient>
          </defs>
          {/* Hexagonal Yellow Shaft */}
          <rect x="24" y="6" width="86" height="8" fill="url(#pencilYellow)" rx="0.5" />
          {/* Hex ridge lines */}
          <line x1="24" y1="8.5" x2="110" y2="8.5" stroke="#fce488" strokeWidth="0.8" opacity="0.8" />
          <line x1="24" y1="11.5" x2="110" y2="11.5" stroke="#7a5504" strokeWidth="0.8" opacity="0.7" />
          {/* Gold Imprint */}
          <text x="56" y="11.2" fontFamily="monospace" fontSize="3.6" fill="#634502" letterSpacing="0.8">ASHWOOD № 2</text>
          {/* Sharpened Wood Cone */}
          <polygon points="24,6 24,14 6,10" fill="url(#woodTip)" />
          {/* Graphite Lead Point */}
          <polygon points="10,9 10,11 3,10" fill="#2b2d30" />
          {/* Aluminum / Brass Ferrule with crimp ribs */}
          <rect x="110" y="5.5" width="12" height="9" fill="url(#ferruleMetal)" rx="1" />
          <line x1="114" y1="5.5" x2="114" y2="14.5" stroke="#374151" strokeWidth="0.6" />
          <line x1="118" y1="5.5" x2="118" y2="14.5" stroke="#374151" strokeWidth="0.6" />
          {/* Vintage Pink Rubber Eraser */}
          <path d="M122 6 L134 6 C136 6 137 7.5 137 10 C137 12.5 136 14 134 14 L122 14 Z" fill="url(#eraserPink)" />
        </svg>
      </div>
    </div>
  );
};
