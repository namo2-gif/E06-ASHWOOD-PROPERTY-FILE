import React, { useState, useRef } from 'react';

interface MagnifierProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  active?: boolean;
}

export const Magnifier: React.FC<MagnifierProps> = ({
  children,
  zoomFactor = 1.75,
  lensSize = 150,
  active = true,
}) => {
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!active) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
      setLensPos({ x, y });
    } else {
      setLensPos(null);
    }
  };

  const handlePointerLeave = () => {
    setLensPos(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-crosshair"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Primary readable DOM content */}
      <div className="select-text">{children}</div>

      {/* Magnifying Glass Lens overlay */}
      {active && lensPos && (
        <div
          className="pointer-events-none absolute rounded-full border-2 border-[#b89355] shadow-2xl overflow-hidden z-40 hidden md:block"
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            left: `${lensPos.x}px`,
            top: `${lensPos.y}px`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 24px rgba(0,0,0,0.5), inset 0 0 15px rgba(184,147,85,0.25)',
            backgroundColor: '#faf6ee',
          }}
        >
          {/* Magnified cloned view */}
          <div
            className="absolute origin-top-left"
            style={{
              width: containerRef.current?.clientWidth || 500,
              transform: `scale(${zoomFactor})`,
              left: `${-lensPos.x * zoomFactor + lensSize / 2}px`,
              top: `${-lensPos.y * zoomFactor + lensSize / 2}px`,
            }}
          >
            {children}
          </div>

          {/* Lens glare & rim reflection */}
          <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/20"></div>
        </div>
      )}
    </div>
  );
};
