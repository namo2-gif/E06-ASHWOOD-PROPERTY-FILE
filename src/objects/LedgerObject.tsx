import React, { useState } from 'react';
import { Leaf } from '../types';
import { BookViewer } from './BookViewer';
import { Magnifier } from '../viewer/Magnifier';
import { Search } from 'lucide-react';

interface LedgerObjectProps {
  leaves: Leaf[];
  currentLeafIndex: number;
  onPageChange: (index: number) => void;
  reducedMotion?: boolean;
}

export const LedgerObject: React.FC<LedgerObjectProps> = ({
  leaves,
  currentLeafIndex,
  onPageChange,
  reducedMotion = false,
}) => {
  const [magnifierActive, setMagnifierActive] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Heavy Bound Ledger Title and Magnifier toggle */}
      <div className="mb-2 flex items-center justify-between gap-4 w-full max-w-4xl px-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#a89b88] bg-[#1a1410] px-3 py-1 rounded border border-[#3b2f27]">
            Notarial Day Book — Register Series 2021
          </span>
          <span className="text-zinc-500">·</span>
          <span className="font-mono text-[11px] text-[#b89355]">Bound Hard Ledger</span>
        </div>

        {/* Magnifier Lens Toggle Button (Plain lens, no clue highlights per §5 #8) */}
        <button
          onClick={() => setMagnifierActive(!magnifierActive)}
          className={`px-3 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-all border ${
            magnifierActive
              ? 'bg-[#b89355] text-black font-bold border-[#c9a463] shadow-md'
              : 'bg-[#1a1410] text-[#e8dfd5] border-[#3b2f27] hover:bg-[#261e18]'
          }`}
          title="Toggle interactive inspection lens"
          aria-label="Toggle Magnifier Lens"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{magnifierActive ? 'Lens Active' : 'Magnifier Lens'}</span>
        </button>
      </div>

      {/* Heavy Book Viewer wrapped in Magnifier */}
      <div className="w-full flex justify-center">
        <Magnifier active={magnifierActive} zoomFactor={1.75} lensSize={160}>
          <BookViewer
            leaves={leaves}
            currentLeafIndex={currentLeafIndex}
            onPageChange={onPageChange}
            preset="heavy"
            reducedMotion={reducedMotion}
          />
        </Magnifier>
      </div>
    </div>
  );
};
