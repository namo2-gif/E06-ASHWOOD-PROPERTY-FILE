import React, { useState } from 'react';
import { Leaf } from '../types';
import { soundManager } from '../audio/soundManager';
import { Scissors, FileText } from 'lucide-react';

interface DocketObjectProps {
  leaves: Leaf[];
  currentLeafIndex: number;
  onPageChange: (index: number) => void;
  reducedMotion?: boolean;
}

export const DocketObject: React.FC<DocketObjectProps> = ({
  leaves,
  currentLeafIndex,
  onPageChange,
  reducedMotion = false,
}) => {
  const [isUntied, setIsUntied] = useState(false);

  const handleUntie = () => {
    soundManager.playStringUntie();
    setIsUntied(true);
  };

  const handleRetie = () => {
    soundManager.playPaperRustle();
    setIsUntied(false);
  };

  const currentLeaf = leaves[currentLeafIndex];

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
      {/* Header bar */}
      <div className="w-full max-w-2xl mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a89b88] bg-[#1a1410] px-3 py-1 rounded border border-[#3b2f27]">
            Movement & Dispatch
          </span>
          <span className="text-zinc-500">·</span>
          <span className="font-mono text-[11px] text-[#b89355]">String-Tied Archive Docket</span>
        </div>

        {isUntied && (
          <button
            onClick={handleRetie}
            className="text-xs font-mono px-2.5 py-1 rounded bg-[#1a1410] text-[#a89b88] border border-[#3b2f27] hover:text-white"
          >
            Re-tie Docket
          </button>
        )}
      </div>

      {/* Main Docket Container */}
      <div className="relative w-full max-w-2xl bg-[#32251a] p-5 sm:p-7 rounded-lg shadow-2xl border border-[#4d3928] overflow-hidden min-h-[520px]">
        {/* If tied: Closed String-Tied Cover */}
        {!isUntied ? (
          <div
            onClick={handleUntie}
            className="absolute inset-0 bg-[#2d2117] p-8 flex flex-col items-center justify-between cursor-pointer group z-30 transition-all"
          >
            <div className="text-center space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#b89355]">
                Archival Records Control File
              </span>
              <h3 className="font-serif text-xl font-bold text-[#e8dfd5]">
                Ashwood Guesthouse — Custody & Movement Docket
              </h3>
              <div className="font-mono text-xs text-[#a89b88]">Series: PC-21-044 / Dispatch Records</div>
            </div>

            {/* Central String & Washer Fastener Button */}
            <div className="relative flex flex-col items-center my-8 group-hover:scale-105 transition-transform">
              {/* String coil wrapping */}
              <div className="w-24 h-1 bg-[#d8be8d] shadow-md my-1 transform -rotate-6"></div>
              <div className="w-28 h-1 bg-[#d8be8d] shadow-md my-1 transform rotate-4"></div>
              <div className="w-20 h-1 bg-[#d8be8d] shadow-md my-1 transform -rotate-2"></div>

              {/* Washer Button */}
              <div className="w-12 h-12 rounded-full bg-[#1b140f] border-2 border-[#b89355] shadow-xl flex items-center justify-center my-2">
                <div className="w-3 h-3 rounded-full bg-[#b89355]"></div>
              </div>

              <div className="mt-4 px-4 py-2 bg-[#b89355] text-black font-mono text-xs font-bold uppercase rounded shadow-lg flex items-center gap-2 group-hover:bg-[#c9a463]">
                <Scissors className="w-4 h-4" />
                <span>Tap or Drag String to Untie</span>
              </div>
            </div>

            <div className="text-center text-xs font-serif italic text-[#9e8b78]">
              Tied with twin-eyelet binding string. Unfasten to examine loose dispatched leaves.
            </div>
          </div>
        ) : (
          /* Untied: Fanned Out Loose Sheets on Desk */
          <div className="space-y-4">
            {/* Sheet Selector Pills (Fanned selector) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#4d3928]">
              {leaves.map((leaf, idx) => (
                <button
                  key={leaf.id}
                  onClick={() => {
                    soundManager.playPaperRustle();
                    onPageChange(idx);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    idx === currentLeafIndex
                      ? 'bg-[#b89355] text-black font-bold shadow'
                      : 'bg-[#211811] text-[#c4b5a2] hover:bg-[#3d2d20] border border-[#4d3928]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{leaf.displayLabel.split('|')[0].trim()}</span>
                </button>
              ))}
            </div>

            {/* Currently picked up loose sheet */}
            <div
              className={`bg-[#f7f2e7] rounded p-6 sm:p-10 shadow-paper-elevation border border-[#cfc1a5] select-text transition-all duration-300 ${
                !reducedMotion ? 'transform translate-y-0' : ''
              }`}
            >
              {currentLeaf ? currentLeaf.renderContent() : null}
            </div>
          </div>
        )}
      </div>

      {/* Untied Bottom Status */}
      {isUntied && (
        <div className="mt-3 font-mono text-xs text-[#b89355]">
          Sheet {currentLeafIndex + 1} of {leaves.length} — Click tabs above to examine fanned papers
        </div>
      )}
    </div>
  );
};
