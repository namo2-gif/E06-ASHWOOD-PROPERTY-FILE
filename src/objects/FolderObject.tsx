import React, { useState } from 'react';
import { Leaf } from '../types';
import { soundManager } from '../audio/soundManager';
import { ChevronLeft, ChevronRight, Lock, Unlock } from 'lucide-react';

interface FolderObjectProps {
  leaves: Leaf[];
  currentLeafIndex: number;
  onPageChange: (index: number) => void;
  reducedMotion?: boolean;
}

export const FolderObject: React.FC<FolderObjectProps> = ({
  leaves,
  currentLeafIndex,
  onPageChange,
  reducedMotion = false,
}) => {
  const [isUnfastened, setIsUnfastened] = useState(false);

  const handleToggleFastener = () => {
    soundManager.playClip();
    setIsUnfastened(!isUnfastened);
  };

  const handlePrev = () => {
    if (currentLeafIndex > 0) {
      soundManager.playPaperRustle();
      onPageChange(currentLeafIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentLeafIndex < leaves.length - 1) {
      soundManager.playPaperRustle();
      onPageChange(currentLeafIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
      {/* Cloth Folder Container */}
      <div className="relative w-full max-w-2xl bg-[#2a3834] rounded-lg shadow-2xl p-4 sm:p-6 border border-[#3e524d] overflow-hidden">
        {/* Cloth Texture styling and spine seam */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#cfded9_1px,transparent_1px)] [background-size:8px_8px]" />
        
        {/* Top Folder Flap hinge (rotates open when unfastened) */}
        <div
          className={`relative z-20 bg-[#23302c] border-b-2 border-[#19221f] rounded-t p-3 mb-3 shadow transition-all duration-500 origin-top flex justify-between items-center ${
            isUnfastened ? 'opacity-90 shadow-lg' : 'shadow-inner'
          }`}
          style={{
            transform: isUnfastened && !reducedMotion ? 'rotateX(30deg) translateY(-8px)' : 'none',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#a8beba]">
              Cloth-Bound Transfer Docket
            </span>
            <span className="text-zinc-500">·</span>
            <span className="font-mono text-[11px] text-[#b89355]">PC-21-044</span>
          </div>

          <button
            onClick={handleToggleFastener}
            className={`px-3 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-all ${
              isUnfastened
                ? 'bg-[#1b2623] text-[#a8beba] border border-[#3e524d]'
                : 'bg-[#b89355] text-black font-bold shadow-md hover:bg-[#c9a463]'
            }`}
            title={isUnfastened ? 'Fasten folder flap' : 'Unfasten elastic tie'}
          >
            {isUnfastened ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-[#b89355]" />
                <span>Flap Unfastened</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Tap to Unfasten Tie</span>
              </>
            )}
          </button>
        </div>

        {/* Loose Inner Sheets Area (slides up out of pocket) */}
        <div className="relative min-h-[480px] bg-[#202b28] rounded p-3 sm:p-5 shadow-inner">
          {/* Elastic Band / Fastener visualization when closed */}
          {!isUnfastened && (
            <div
              onClick={handleToggleFastener}
              className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[1px] rounded flex flex-col items-center justify-center cursor-pointer group transition-all"
            >
              <div className="w-full h-8 bg-[#b89355]/80 shadow-lg border-y border-[#c9a463] flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="font-mono text-xs text-black font-bold tracking-widest uppercase flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Click to Unfasten Elastic Tie & Access Sheets
                </span>
              </div>
            </div>
          )}

          {/* Sheet Stack Inside Folder */}
          <div className="relative w-full">
            {/* Upper-left metallic staple styling per spec §4 */}
            <div className="absolute top-2 left-3 z-30 w-1.5 h-6 bg-gradient-to-b from-[#8f8f8f] to-[#4a4a4a] rounded-sm shadow-sm transform -rotate-12 pointer-events-none" />

            {/* Slide left/right Sheet Container */}
            <div
              className={`bg-[#f6f1e6] rounded p-6 sm:p-10 shadow-paper-elevation border border-[#cfc1a5] transition-all duration-300 ${
                isUnfastened ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-50'
              }`}
            >
              {leaves[currentLeafIndex] ? (
                <div>{leaves[currentLeafIndex].renderContent()}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Navigation Rail */}
      {isUnfastened && (
        <div className="mt-4 flex items-center justify-between gap-4 w-full max-w-2xl px-2">
          <button
            onClick={handlePrev}
            disabled={currentLeafIndex === 0}
            className="px-3 py-1.5 rounded bg-[#261e18] hover:bg-[#342a22] text-[#e8dfd5] border border-[#3b2f27] text-xs font-mono disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 shadow"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Slide Previous Sheet</span>
          </button>

          <div className="font-mono text-xs text-[#b89355] bg-[#1a1410] px-3 py-1 rounded border border-[#3b2f27]">
            Sheet <span className="font-bold text-white">{currentLeafIndex + 1}</span> of {leaves.length}
          </div>

          <button
            onClick={handleNext}
            disabled={currentLeafIndex >= leaves.length - 1}
            className="px-3 py-1.5 rounded bg-[#261e18] hover:bg-[#342a22] text-[#e8dfd5] border border-[#3b2f27] text-xs font-mono disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 shadow"
          >
            <span>Slide Next Sheet</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
