import React, { useEffect, useRef } from 'react';
import { useEvidenceStore } from '../store/useEvidenceStore';
import { loadEvidence } from '../content/e06';
import { FolderObject } from '../objects/FolderObject';
import { InstrumentObject } from '../objects/InstrumentObject';
import { BundleObject } from '../objects/BundleObject';
import { LedgerObject } from '../objects/LedgerObject';
import { DocketObject } from '../objects/DocketObject';
import { SleeveObject } from '../objects/SleeveObject';
import {
  X,
  Pin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';

export const FullscreenViewer: React.FC = () => {
  const {
    activeObjectId,
    activeLeafIndex,
    closeObject,
    setActiveLeafIndex,
    pinPage,
    pinnedPages,
    zoom,
    pan,
    setZoom,
    setPan,
    resetZoomAndPan,
    reducedMotion,
  } = useEvidenceStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const isPanningRef = useRef(false);
  const startPanRef = useRef({ x: 0, y: 0 });

  const allObjects = loadEvidence();
  const currentObject = allObjects.find((obj) => obj.id === activeObjectId);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeObject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeObject]);

  if (!currentObject) return null;

  const currentLeaf = currentObject.leaves[activeLeafIndex];
  const isLeafPinned = pinnedPages.some((p) => p.leaf.id === currentLeaf?.id);

  // Pan handlers when zoomed > 1
  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1.05) return;
    isPanningRef.current = true;
    startPanRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPanningRef.current) return;
    const nextX = e.clientX - startPanRef.current.x;
    const nextY = e.clientY - startPanRef.current.y;
    setPan({ x: nextX, y: nextY });
  };

  const handlePointerUp = () => {
    isPanningRef.current = false;
  };

  const renderActiveObjectComponent = () => {
    switch (currentObject.id) {
      case 'obj-a':
        return (
          <FolderObject
            leaves={currentObject.leaves}
            currentLeafIndex={activeLeafIndex}
            onPageChange={setActiveLeafIndex}
            reducedMotion={reducedMotion}
          />
        );
      case 'obj-b':
        return (
          <InstrumentObject
            leaves={currentObject.leaves}
            currentLeafIndex={activeLeafIndex}
            onPageChange={setActiveLeafIndex}
            reducedMotion={reducedMotion}
          />
        );
      case 'obj-c':
        return (
          <BundleObject
            leaves={currentObject.leaves}
            currentLeafIndex={activeLeafIndex}
            onPageChange={setActiveLeafIndex}
            reducedMotion={reducedMotion}
          />
        );
      case 'obj-d':
        return (
          <LedgerObject
            leaves={currentObject.leaves}
            currentLeafIndex={activeLeafIndex}
            onPageChange={setActiveLeafIndex}
            reducedMotion={reducedMotion}
          />
        );
      case 'obj-e':
        return (
          <DocketObject
            leaves={currentObject.leaves}
            currentLeafIndex={activeLeafIndex}
            onPageChange={setActiveLeafIndex}
            reducedMotion={reducedMotion}
          />
        );
      case 'obj-f':
        return (
          <SleeveObject
            leaves={currentObject.leaves}
            currentLeafIndex={activeLeafIndex}
            onPageChange={setActiveLeafIndex}
            reducedMotion={reducedMotion}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={currentObject.visibleLabel}
    >
      {/* Top Floating Control Bar */}
      <header className="bg-[#17120e]/95 border-b border-[#3b2f27] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg z-20">
        {/* Document Identifier and Title */}
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded bg-[#b89355] text-black font-bold flex items-center justify-center font-mono text-sm shadow">
            {currentObject.letter}
          </div>
          <div>
            <h2 className="font-serif text-sm sm:text-base font-bold text-[#e8dfd5] flex items-center gap-2">
              <span>{currentObject.visibleLabel}</span>
            </h2>
            <div className="text-[11px] font-mono text-[#a89b88]">
              {currentLeaf ? currentLeaf.displayLabel : ''}
            </div>
          </div>
        </div>

        {/* Center Actions: Zoom & Pan & Pin controls */}
        <div className="flex items-center space-x-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-[#231b15] border border-[#3b2f27] rounded px-1.5 py-0.5">
            <button
              onClick={() => setZoom(Math.max(1.0, zoom - 0.25))}
              disabled={zoom <= 1.0}
              className="p-1 text-[#a89b88] hover:text-white disabled:opacity-30 transition-colors"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[#b89355] px-2 min-w-[42px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(2.0, zoom + 0.25))}
              disabled={zoom >= 2.0}
              className="p-1 text-[#a89b88] hover:text-white disabled:opacity-30 transition-colors"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoom > 1.0 && (
              <button
                onClick={resetZoomAndPan}
                className="p-1 text-[#a89b88] hover:text-white ml-1 border-l border-[#3b2f27] pl-1.5"
                title="Reset zoom"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Pin Page Button */}
          {currentLeaf && (
            <button
              onClick={() => pinPage(currentLeaf, currentObject.id, currentObject.visibleLabel)}
              className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-all border ${
                isLeafPinned
                  ? 'bg-[#b89355] text-black font-bold border-[#c9a463]'
                  : 'bg-[#231b15] text-[#e8dfd5] border-[#3b2f27] hover:border-[#b89355]'
              }`}
              title="Pin this leaf to desk comparison board"
              aria-label="Pin page to desk"
            >
              <Pin className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isLeafPinned ? 'Pinned' : 'Pin Page'}</span>
            </button>
          )}

          {/* Close / Return to Desk */}
          <button
            onClick={closeObject}
            className="p-1.5 rounded bg-[#2a1f18] hover:bg-[#3d2d22] text-[#e8dfd5] hover:text-white border border-[#3b2f27] transition-all"
            title="Return to Desk (Esc)"
            aria-label="Close document viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <main
        ref={containerRef}
        className={`relative flex-1 overflow-auto flex items-center justify-center p-2 sm:p-6 select-text ${
          zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className="transition-transform duration-75 origin-center w-full"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
          }}
        >
          {renderActiveObjectComponent()}
        </div>
      </main>

      {/* Bottom Status / Navigation Bar */}
      <footer className="bg-[#17120e]/95 border-t border-[#3b2f27] px-4 py-2 flex items-center justify-between text-xs font-mono text-[#a89b88] z-20">
        <div className="flex items-center gap-2">
          <span>Keyboard: Arrow keys browse · Esc closes</span>
          {zoom > 1 && <span className="text-[#b89355]">· Drag to pan</span>}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white font-bold">{currentObject.visibleLabel}</span>
          <span>(33 leaves total across desk)</span>
        </div>
      </footer>
    </div>
  );
};
