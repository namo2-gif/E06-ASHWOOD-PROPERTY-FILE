import React, { useState } from 'react';
import { Leaf } from '../types';
import { soundManager } from '../audio/soundManager';
import { Receipt, FileSpreadsheet, ArrowDown } from 'lucide-react';

interface SleeveObjectProps {
  leaves: Leaf[];
  currentLeafIndex: number;
  onPageChange: (index: number) => void;
  reducedMotion?: boolean;
}

export const SleeveObject: React.FC<SleeveObjectProps> = ({
  leaves,
  currentLeafIndex,
  onPageChange,
  reducedMotion = false,
}) => {
  const [isSlidOut, setIsSlidOut] = useState(false);

  const handleSlideOut = () => {
    soundManager.playPaperRustle();
    setIsSlidOut(true);
  };

  const handleSlideIn = () => {
    soundManager.playPaperRustle();
    setIsSlidOut(false);
  };

  const currentLeaf = leaves[currentLeafIndex];

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
      {/* Header bar */}
      <div className="w-full max-w-2xl mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a89b88] bg-[#1a1410] px-3 py-1 rounded border border-[#3b2f27]">
            Accounts / AK-44
          </span>
          <span className="text-zinc-500">·</span>
          <span className="font-mono text-[11px] text-[#b89355]">Wax-Paper Financial Sleeve</span>
        </div>

        {isSlidOut && (
          <button
            onClick={handleSlideIn}
            className="text-xs font-mono px-2.5 py-1 rounded bg-[#1a1410] text-[#a89b88] border border-[#3b2f27] hover:text-white"
          >
            Slide Back In
          </button>
        )}
      </div>

      {/* Main Sleeve Container */}
      <div className="relative w-full max-w-2xl bg-[#231d17] p-4 sm:p-6 rounded-lg shadow-2xl border border-[#3d2e22] min-h-[520px] overflow-hidden flex flex-col justify-between">
        {/* If inside sleeve: Translucent wax-paper sleeve cover */}
        {!isSlidOut ? (
          <div
            onClick={handleSlideOut}
            className="relative bg-[#d8ccb8]/25 backdrop-blur-[2px] border-2 border-dashed border-[#b8a68b]/50 rounded p-8 flex flex-col items-center justify-between min-h-[460px] cursor-pointer group shadow-inner"
          >
            {/* Staggered slips visible through translucent wax paper */}
            <div className="w-full space-y-3 opacity-40 group-hover:opacity-60 transition-opacity">
              <div className="h-20 bg-[#f7f2e7] rounded shadow transform -rotate-1 mx-4"></div>
              <div className="h-24 bg-[#ede4d3] rounded shadow transform rotate-1 mx-2"></div>
              <div className="h-16 bg-[#faf6ee] rounded shadow mx-6"></div>
            </div>

            <div className="text-center space-y-2 z-10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#b89355] block">
                Khanna Legal · Accounts Branch
              </span>
              <h3 className="font-serif text-xl font-bold text-[#e8dfd5]">
                Matter AK/PROP/21-44 — Financial Slips
              </h3>
              <p className="font-serif italic text-xs text-[#a89b88] max-w-md mx-auto">
                Contains engagement extract, fee invoice and completion register slip.
              </p>
            </div>

            <div className="z-10 px-4 py-2 bg-[#b89355] text-black font-mono text-xs font-bold uppercase rounded shadow-lg flex items-center gap-2 group-hover:bg-[#c9a463] group-hover:scale-105 transition-all">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span>Click or Drag to Slide Slips Out</span>
            </div>
          </div>
        ) : (
          /* Slid Out: 3 Slips of different sizes and paper stocks */
          <div className="space-y-4">
            {/* Staggered Slip Selector Tabs */}
            <div className="grid grid-cols-3 gap-2">
              {leaves.map((leaf, idx) => {
                const isInvoice = leaf.id === 'G-2';
                const isExtract = leaf.id === 'G-1';
                return (
                  <button
                    key={leaf.id}
                    onClick={() => {
                      soundManager.playPaperRustle();
                      onPageChange(idx);
                    }}
                    className={`p-2.5 rounded border text-left transition-all flex flex-col justify-between ${
                      idx === currentLeafIndex
                        ? 'bg-[#b89355] text-black border-[#c9a463] shadow-lg font-bold'
                        : 'bg-[#1b1511] text-[#c4b5a2] border-[#3b2f27] hover:bg-[#2b211a]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      {isInvoice ? <Receipt className="w-3.5 h-3.5" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
                      <span>{leaf.id}</span>
                    </div>
                    <div className="text-[11px] font-serif truncate mt-1">
                      {isExtract ? 'Engagement Slip' : isInvoice ? 'Fee Invoice' : 'Closing Extract'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Active Slip */}
            <div
              className={`rounded p-6 sm:p-10 shadow-paper-elevation border border-[#cfc1a5] select-text transition-all duration-300 ${
                currentLeaf.id === 'G-2'
                  ? 'bg-[#faf6ee] max-w-xl mx-auto' // Invoice slip size
                  : currentLeaf.id === 'G-1'
                  ? 'bg-[#f7f2e7]' // Full agreement size
                  : 'bg-[#ede4d3]' // Closing book slip size
              } ${!reducedMotion ? 'transform translate-y-0' : ''}`}
            >
              {currentLeaf ? currentLeaf.renderContent() : null}
            </div>
          </div>
        )}
      </div>

      {isSlidOut && (
        <div className="mt-3 font-mono text-xs text-[#b89355]">
          Slip {currentLeafIndex + 1} of {leaves.length} — Tap slip headers above to examine different papers
        </div>
      )}
    </div>
  );
};
