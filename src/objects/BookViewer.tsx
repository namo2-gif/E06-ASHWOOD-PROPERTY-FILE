import React, { useState, useEffect, useRef } from 'react';
import { Leaf } from '../types';
import { soundManager } from '../audio/soundManager';

export interface BookViewerProps {
  leaves: Leaf[];
  currentLeafIndex: number;
  onPageChange: (index: number) => void;
  preset?: 'hero' | 'heavy';
  reducedMotion?: boolean;
}

export const BookViewer: React.FC<BookViewerProps> = ({
  leaves,
  currentLeafIndex,
  onPageChange,
  preset = 'hero',
  reducedMotion = false,
}) => {
  const isHeavy = preset === 'heavy';
  const duration = isHeavy ? 1300 : 900; // ms

  // Number of physical leaves
  const totalItems = leaves.length;
  const [flippedCount, setFlippedCount] = useState<number>(currentLeafIndex);
  const [leafZIndexes, setLeafZIndexes] = useState<number[]>([]);
  const bookRef = useRef<HTMLDivElement>(null);
  const contentMeasureRef = useRef<HTMLDivElement>(null);

  // Auto-height & viewport dimensions state
  const [bookHeight, setBookHeight] = useState<number>(isHeavy ? 540 : 490);
  const [windowSize, setWindowSize] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  // Track window resizing
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize z-indexes
  useEffect(() => {
    const count = totalItems;
    const initialZ = Array.from({ length: count }, (_, i) => count - i);
    setLeafZIndexes(initialZ);
  }, [totalItems]);

  // Turn page logic
  const turn = (delta: number) => {
    const nextFlipped = Math.max(0, Math.min(totalItems, flippedCount + delta));
    if (nextFlipped === flippedCount) return;

    if (isHeavy) {
      soundManager.playLedgerThud();
    } else {
      soundManager.playPageTurn();
    }

    setFlippedCount(nextFlipped);
    onPageChange(Math.max(0, Math.min(totalItems - 1, nextFlipped)));

    // Mid-turn z-index swap per diary demo §5
    const halfTime = duration * 0.5;
    setTimeout(() => {
      setLeafZIndexes(
        Array.from({ length: totalItems }, (_, i) =>
          i < nextFlipped ? i + 1 : totalItems - i
        )
      );
    }, halfTime);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        turn(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        turn(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flippedCount, totalItems]);

  // Measure content natural height
  useEffect(() => {
    const measure = () => {
      if (contentMeasureRef.current) {
        const sh = contentMeasureRef.current.scrollHeight;
        if (sh > 120) {
          // Add 36px space for the page number at the bottom
          setBookHeight(Math.max(isHeavy ? 520 : 460, sh + 36));
        }
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (contentMeasureRef.current) {
      ro.observe(contentMeasureRef.current);
    }
    return () => ro.disconnect();
  }, [leaves, isHeavy]);

  // Viewport scale: min(1, (100vh − header − controls − footer) / bookHeight)
  // header ≈ 56px, subtitle/tools ≈ 36px, controls ≈ 58px, footer ≈ 40px, buffer ≈ 20px
  const chromeHeight = 56 + 36 + 58 + 40 + 20; // 210px total chrome
  const availableHeight = Math.max(260, windowSize.h - chromeHeight);
  const heightScale = Math.min(1, availableHeight / bookHeight);

  // Horizontal safeguard so 2-page spread never exceeds screen width
  const maxSpreadWidth = isHeavy ? Math.min(windowSize.w * 0.90, 920) : Math.min(windowSize.w * 0.85, 780);
  const activeWidth = flippedCount === 0 ? maxSpreadWidth * 0.5 : maxSpreadWidth;
  const availableWidth = Math.max(300, windowSize.w - 32);
  const widthScale = availableWidth < activeWidth ? Math.min(1, availableWidth / activeWidth) : 1;

  const finalScale = Math.min(heightScale, widthScale);

  // Spread container width (2x page width)
  const spreadWidthPx = isHeavy ? 'min(90vw, 920px)' : 'min(85vw, 780px)';

  return (
    <div
      className="relative select-none flex flex-col items-center justify-center p-2 sm:p-4"
      style={{ perspective: '2000px', overflow: 'visible' }}
      role="region"
      aria-label="Book Reader"
    >
      {/* 3D Stage with Tilt and Viewport Fit Scale (overflow: visible) */}
      <div
        className="relative transition-transform duration-500"
        style={{
          boxSizing: 'border-box',
          transformStyle: 'preserve-3d',
          overflow: 'visible',
          transform: `${!reducedMotion ? 'rotateX(22deg)' : ''} scale(${finalScale})`,
          transformOrigin: 'top center',
        }}
      >
        {/* Book Container (width = 2x page width, spine at 50%) */}
        <div
          ref={bookRef}
          className="relative transition-transform ease-out"
          style={{
            boxSizing: 'border-box',
            width: spreadWidthPx,
            height: `${bookHeight}px`,
            transformStyle: 'preserve-3d',
            transition: `transform ${duration}ms cubic-bezier(.5, .1, .2, 1)`,
            transform: !reducedMotion ? (flippedCount === 0 ? 'translateX(-25%)' : 'translateX(0)') : 'none',
            overflow: 'visible',
          }}
        >
          {/* Base Drop Shadow under the spread */}
          <div
            className="absolute inset-x-[-3%] top-[4%] w-[106%] h-[96%] bg-black/60 pointer-events-none"
            style={{
              filter: 'blur(26px)',
              transform: 'translateZ(-35px)',
            }}
          />

          {/* Under-board paper backing: Left page (visible when flipped >= 1) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#ede4d0] rounded-l-md border border-[#cfc1a5] transition-opacity duration-300 pointer-events-none select-none"
            style={{
              boxSizing: 'border-box',
              overflow: 'visible',
              opacity: flippedCount === 0 ? 0 : 1,
              boxShadow:
                'inset -24px 0 28px -16px rgba(40,20,5,.45), inset 0 0 35px rgba(120,80,30,.22), -4px 4px 14px rgba(0,0,0,0.25)',
              background:
                'linear-gradient(-100deg, #e7dcbf, #f4ece0 35%, #efe5d2)',
            }}
          />

          {/* Under-board paper backing: Right page */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-1/2 bg-[#f7f1e4] rounded-r-md border border-[#cfc1a5] pointer-events-none select-none"
            style={{
              boxSizing: 'border-box',
              overflow: 'visible',
              boxShadow:
                'inset 24px 0 28px -16px rgba(40,20,5,.45), inset 0 0 35px rgba(120,80,30,.22), 4px 4px 14px rgba(0,0,0,0.25)',
              background:
                'linear-gradient(100deg, #ede2c8, #f7f1e4 35%, #f4ece0)',
            }}
          />

          {/* Spine ribbon detail at 50% */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 pointer-events-none z-40 ${
              isHeavy ? 'w-3 bg-[#5c1616]' : 'w-2 bg-[#7a6245]'
            } shadow-md`}
            style={{
              boxSizing: 'border-box',
              transform: 'translateZ(3px)',
            }}
          />

          {/* Render individual turnable rigid leaves */}
          {leaves.map((leaf, index) => {
            const isFlipped = index < flippedCount;
            const zIndex = leafZIndexes[index] ?? (index < flippedCount ? index + 1 : totalItems - index);

            return (
              <div
                key={leaf.id}
                className="absolute left-1/2 top-0 bottom-0 origin-left cursor-pointer"
                onClick={() => turn(isFlipped ? -1 : 1)}
                style={{
                  width: '50%',
                  boxSizing: 'border-box',
                  overflow: 'visible',
                  transformStyle: 'preserve-3d',
                  zIndex,
                  transition: reducedMotion
                    ? 'none'
                    : `transform ${duration}ms cubic-bezier(.55, .05, .25, 1)`,
                  transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT FACE (Right page when un-flipped) */}
                <div
                  className="absolute inset-0 bg-[#f7f1e4] p-5 sm:p-6 border border-[#cfc1a5] rounded-r-md select-text"
                  style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                    overflow: 'visible',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    boxShadow:
                      'inset 24px 0 28px -16px rgba(40,20,5,.45), inset 0 0 35px rgba(120,80,30,.22), 4px 4px 14px rgba(0,0,0,0.25)',
                    background:
                      'linear-gradient(100deg, #ede2c8, #f7f1e4 35%, #f4ece0)',
                  }}
                >
                  <div
                    ref={index === 0 ? contentMeasureRef : undefined}
                    className="w-full pb-6 select-text"
                    style={{ boxSizing: 'border-box', overflow: 'visible' }}
                  >
                    {leaf.renderContent()}
                  </div>

                  {/* Leaf Page Number */}
                  <div className="absolute bottom-2 inset-x-0 text-center font-mono text-[10px] text-[#7a6552] pointer-events-none">
                    Leaf {index + 1} of {totalItems}
                  </div>
                </div>

                {/* BACK FACE (Left page when flipped - reverse of previous leaf) */}
                <div
                  className="absolute inset-0 bg-[#ede4d0] p-5 sm:p-6 border border-[#cfc1a5] rounded-l-md select-text"
                  style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                    overflow: 'visible',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    boxShadow:
                      'inset -24px 0 28px -16px rgba(40,20,5,.45), inset 0 0 35px rgba(120,80,30,.22), -4px 4px 14px rgba(0,0,0,0.25)',
                    background:
                      'linear-gradient(-100deg, #e7dcbf, #f4ece0 35%, #efe5d2)',
                  }}
                >
                  <div
                    className="h-full flex flex-col justify-between text-[#7a6552]"
                    style={{ boxSizing: 'border-box', overflow: 'visible' }}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-wider text-right">
                      {/* E06-E · REVERSE removed per specification */}
                    </div>
                    <div className="font-serif italic text-xs text-center opacity-60">
                      — End of Leaf {index + 1} —
                    </div>
                    <div className="font-mono text-[10px] text-left">
                      {isHeavy ? '' : 'PC-21-044'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rigid Turn Controls Rail */}
      <div className="mt-6 flex items-center justify-between gap-4 w-full max-w-xl px-2 z-30">
        <button
          onClick={() => turn(-1)}
          disabled={flippedCount === 0}
          className="px-4 py-2 rounded bg-[#261e18] hover:bg-[#342a22] text-[#e8dfd5] border border-[#3b2f27] text-xs font-mono disabled:opacity-25 disabled:pointer-events-none transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <span>◀</span>
          <span>Turn Back</span>
        </button>

        <div className="font-mono text-xs text-[#b89355] bg-[#1a1410] px-4 py-1.5 rounded border border-[#3b2f27] shadow-inner">
          Flipped {flippedCount} / {totalItems} leaves
        </div>

        <button
          onClick={() => turn(1)}
          disabled={flippedCount >= totalItems}
          className="px-4 py-2 rounded bg-[#261e18] hover:bg-[#342a22] text-[#e8dfd5] border border-[#3b2f27] text-xs font-mono disabled:opacity-25 disabled:pointer-events-none transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <span>Turn Forward</span>
          <span>▶</span>
        </button>
      </div>
    </div>
  );
};
