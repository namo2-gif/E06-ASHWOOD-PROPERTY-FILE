import React, { useState } from 'react';
import { Leaf } from '../types';
import { soundManager } from '../audio/soundManager';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface BundleObjectProps {
  leaves: Leaf[];
  currentLeafIndex: number;
  onPageChange: (index: number) => void;
  reducedMotion?: boolean;
}

export const BundleObject: React.FC<BundleObjectProps> = ({
  leaves,
  currentLeafIndex,
  onPageChange,
  reducedMotion = false,
}) => {
  const [isLifting, setIsLifting] = useState(false);
  const [receiptUnfolded, setReceiptUnfolded] = useState(false);

  const currentLeaf = leaves[currentLeafIndex];
  const isReceipt = currentLeaf?.sourceType === 'receipt';

  const handleNextSheet = () => {
    if (currentLeafIndex < leaves.length - 1) {
      if (!reducedMotion) {
        setIsLifting(true);
        soundManager.playPaperRustle();
        setTimeout(() => {
          onPageChange(currentLeafIndex + 1);
          setIsLifting(false);
        }, 220);
      } else {
        soundManager.playPaperRustle();
        onPageChange(currentLeafIndex + 1);
      }
    }
  };

  const handlePrevSheet = () => {
    if (currentLeafIndex > 0) {
      if (!reducedMotion) {
        setIsLifting(true);
        soundManager.playPaperRustle();
        setTimeout(() => {
          onPageChange(currentLeafIndex - 1);
          setIsLifting(false);
        }, 220);
      } else {
        soundManager.playPaperRustle();
        onPageChange(currentLeafIndex - 1);
      }
    }
  };

  const toggleFoldReceipt = () => {
    soundManager.playPaperRustle();
    setReceiptUnfolded(!receiptUnfolded);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
      {/* Bundle Header with Thumb Index Navigation Tabs */}
      <div className="w-full max-w-2xl mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a89b88] bg-[#1a1410] px-3 py-1 rounded border border-[#3b2f27]">
            Filed Papers / Receipt 611
          </span>
          <span className="text-zinc-500">·</span>
          <span className="font-mono text-[11px] text-[#b89355]">Registry Lodgement Stack</span>
        </div>

        {/* Thumb index tabs along the top / side */}
        <div className="flex items-center gap-1 bg-[#1a1410] p-1 rounded border border-[#3b2f27] overflow-x-auto max-w-full">
          {leaves.map((leaf, idx) => (
            <button
              key={leaf.id}
              onClick={() => {
                soundManager.playPaperRustle();
                onPageChange(idx);
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                idx === currentLeafIndex
                  ? 'bg-[#b89355] text-black font-bold'
                  : 'text-[#9c8b78] hover:text-white hover:bg-[#2b211a]'
              }`}
              title={leaf.displayLabel}
            >
              {leaf.sourceType === 'receipt' ? leaf.id : `${idx + 1}`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stack Desk Area */}
      <div className="relative w-full max-w-2xl bg-[#1c1612] p-4 sm:p-6 rounded-lg shadow-2xl border border-[#38261a]">
        {/* Registry staples & Counter Perforations on top edge */}
        <div className="absolute top-2 left-8 z-30 flex items-center gap-4 pointer-events-none">
          <div className="w-1.5 h-4 bg-gradient-to-b from-[#8a8a8a] to-[#404040] rounded-sm shadow transform -rotate-6" />
          <div className="w-1.5 h-4 bg-gradient-to-b from-[#8a8a8a] to-[#404040] rounded-sm shadow transform rotate-3" />
        </div>

        {/* Stack Depth Layers visualization (uneven sheets) */}
        <div className="absolute inset-x-5 top-5 bottom-3 bg-[#e4d8c2] rounded transform -rotate-1 opacity-70 pointer-events-none shadow" />
        <div className="absolute inset-x-4 top-4 bottom-4 bg-[#ede2ce] rounded transform rotate-[0.8deg] opacity-85 pointer-events-none shadow" />

        {/* Active Top Sheet (Lifts and slides off to the side) */}
        <div
          className={`relative z-20 bg-[#f7f2e7] rounded p-6 sm:p-10 shadow-paper-elevation border border-[#cfc1a5] transition-all duration-300 min-h-[480px] overflow-hidden select-text ${
            isLifting
              ? 'transform translate-x-12 -translate-y-4 rotate-3 opacity-70'
              : 'transform translate-x-0 translate-y-0 rotate-0 opacity-100'
          }`}
        >
          {/* Top Perforations styling */}
          <div className="absolute top-0 inset-x-0 h-2 border-b border-dashed border-[#b3a48c] opacity-60 pointer-events-none" />

          {/* If the current leaf is a folded registry receipt (F3 / F4) */}
          {isReceipt ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-[#ede4d3] p-2.5 rounded border border-[#cfc1a5]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#6a5a4d]">
                  <Layers className="w-4 h-4 text-[#b89355]" />
                  <span>Two-Crease Folded Registry Receipt</span>
                </div>
                <button
                  onClick={toggleFoldReceipt}
                  className="px-2.5 py-1 bg-[#261e18] hover:bg-[#342a22] text-[#e8dfd5] text-xs font-mono rounded border border-[#3b2f27] transition-all"
                >
                  {receiptUnfolded ? 'Fold Receipt' : 'Unfold Receipt'}
                </button>
              </div>

              {/* Foldable paper with rotateX hinges */}
              <div
                className={`transition-all duration-500 origin-top overflow-hidden ${
                  receiptUnfolded ? 'scale-y-100 opacity-100' : 'scale-y-90 opacity-95'
                }`}
                style={{
                  transform: !receiptUnfolded && !reducedMotion ? 'perspective(600px) rotateX(15deg)' : 'none',
                }}
              >
                {currentLeaf.renderContent()}
              </div>
            </div>
          ) : (
            // Standard bundle leaf (D1 to D9)
            <div>{currentLeaf.renderContent()}</div>
          )}
        </div>
      </div>

      {/* Bottom Stack Navigation Rail */}
      <div className="mt-4 flex items-center justify-between gap-4 w-full max-w-2xl px-2">
        <button
          onClick={handlePrevSheet}
          disabled={currentLeafIndex === 0 || isLifting}
          className="px-3 py-1.5 rounded bg-[#261e18] hover:bg-[#342a22] text-[#e8dfd5] border border-[#3b2f27] text-xs font-mono disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 shadow"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Lift Previous Sheet</span>
        </button>

        <div className="font-mono text-xs text-[#b89355] bg-[#1a1410] px-3 py-1 rounded border border-[#3b2f27]">
          Sheet <span className="font-bold text-white">{currentLeafIndex + 1}</span> of {leaves.length}
        </div>

        <button
          onClick={handleNextSheet}
          disabled={currentLeafIndex >= leaves.length - 1 || isLifting}
          className="px-3 py-1.5 rounded bg-[#261e18] hover:bg-[#342a22] text-[#e8dfd5] border border-[#3b2f27] text-xs font-mono disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 shadow"
        >
          <span>Lift & Slide Next Sheet</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
