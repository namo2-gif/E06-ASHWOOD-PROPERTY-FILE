import React from 'react';
import { Leaf } from '../types';
import { BookViewer } from './BookViewer';

interface InstrumentObjectProps {
  leaves: Leaf[];
  currentLeafIndex: number;
  onPageChange: (index: number) => void;
  reducedMotion?: boolean;
}

export const InstrumentObject: React.FC<InstrumentObjectProps> = ({
  leaves,
  currentLeafIndex,
  onPageChange,
  reducedMotion = false,
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Quiet File Copy archival header */}
      <div className="mb-2 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-[#a89b88] bg-[#1a1410] px-3 py-1 rounded border border-[#3b2f27]">
          PC-21-044 • File Copy
        </span>
      </div>

      {/* Hero Book Viewer */}
      <BookViewer
        leaves={leaves}
        currentLeafIndex={currentLeafIndex}
        onPageChange={onPageChange}
        preset="hero"
        reducedMotion={reducedMotion}
      />
    </div>
  );
};
