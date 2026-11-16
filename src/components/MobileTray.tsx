import React from 'react';
import { useEvidenceStore } from '../store/useEvidenceStore';
import { loadEvidence } from '../content/e06';
import { DeskObjectId } from '../types';

export const MobileTray: React.FC = () => {
  const { openObject, activeObjectId } = useEvidenceStore();
  const objects = loadEvidence();

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-[#140e0b]/95 border-t border-[#3b2f27] p-2 z-20 backdrop-blur">
      <div className="text-[10px] font-mono uppercase tracking-widest text-[#a89b88] text-center mb-1">
        Evidence Desk Tray · Tap to Inspect
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 px-1">
        {objects.map((obj) => {
          const isActive = activeObjectId === obj.id;
          return (
            <button
              key={obj.id}
              onClick={() => openObject(obj.id as DeskObjectId)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded border text-left transition-all ${
                isActive
                  ? 'bg-[#b89355] text-black border-[#c9a463] font-bold'
                  : 'bg-[#1f1712] text-[#e8dfd5] border-[#3b2f27] hover:border-[#b89355]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center font-mono text-xs font-bold ${
                  isActive ? 'bg-black text-[#b89355]' : 'bg-[#2e2219] text-[#b89355]'
                }`}
              >
                {obj.letter}
              </div>
              <div className="text-xs font-serif whitespace-nowrap">
                {obj.visibleLabel}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
