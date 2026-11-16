import React from 'react';
import { useEvidenceStore } from '../store/useEvidenceStore';
import { Volume2, VolumeX, Eye, BookOpen, Pin, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  backUrl?: string | null;
}

export const Header: React.FC<HeaderProps> = ({ backUrl }) => {
  const {
    soundMuted,
    toggleSound,
    reducedMotion,
    toggleReducedMotion,
    toggleNotebook,
    notes,
    pinnedPages,
    togglePinnedView,
  } = useEvidenceStore();

  return (
    <header className="bg-[#120d0a]/90 backdrop-blur border-b border-[#2d221b] px-4 py-2.5 flex items-center justify-between gap-4 z-30 select-none">
      {/* Left: Platform Title and Back Link */}
      <div className="flex items-center space-x-3">
        {backUrl && (
          <a
            href={backUrl}
            className="flex items-center space-x-1.5 text-xs font-mono text-[#a89b88] hover:text-white transition-colors bg-[#1c1511] border border-[#2d221b] px-2.5 py-1 rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Evidence</span>
          </a>
        )}

        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#b89355] font-semibold">
            MASOULEN '26
          </span>
          <span className="text-[#3b2f27]">|</span>
          <span className="font-serif text-sm font-bold text-[#e8dfd5] tracking-wide">
            E06 — Ashwood Property File
          </span>
        </div>
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex items-center space-x-2">
        {/* Pinned Pages Indicator / Button */}
        {pinnedPages.length > 0 && (
          <button
            onClick={togglePinnedView}
            className="px-2.5 py-1 rounded bg-[#b89355]/20 border border-[#b89355] text-[#b89355] text-xs font-mono flex items-center gap-1.5 hover:bg-[#b89355]/30 transition-all shadow"
            title="Inspect pinned pages side by side"
          >
            <Pin className="w-3.5 h-3.5" />
            <span>Pinned ({pinnedPages.length})</span>
          </button>
        )}

        {/* Private Investigator Notebook Button */}
        <button
          onClick={toggleNotebook}
          className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 border transition-all ${
            notes.length > 0
              ? 'bg-[#2a1c14] border-[#b89355] text-[#e8dfd5]'
              : 'bg-[#1c1511] border-[#2d221b] text-[#a89b88] hover:text-white'
          }`}
          title="Open private investigator notebook"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#b89355]" />
          <span className="hidden sm:inline">Notebook</span>
          {notes.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#b89355]"></span>}
        </button>

        {/* Reduced Motion Toggle */}
        <button
          onClick={toggleReducedMotion}
          className={`p-1.5 rounded text-xs font-mono border transition-all ${
            reducedMotion
              ? 'bg-[#b89355]/20 border-[#b89355] text-[#b89355]'
              : 'bg-[#1c1511] border-[#2d221b] text-[#a89b88] hover:text-white'
          }`}
          title={reducedMotion ? 'Reduced motion active (Simple transitions)' : '3D motion active'}
          aria-label="Toggle reduced motion"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Sound Toggle (Muted by default) */}
        <button
          onClick={toggleSound}
          className={`p-1.5 rounded text-xs font-mono border transition-all ${
            !soundMuted
              ? 'bg-[#b89355]/20 border-[#b89355] text-[#b89355]'
              : 'bg-[#1c1511] border-[#2d221b] text-[#a89b88] hover:text-white'
          }`}
          title={soundMuted ? 'Unmute procedural audio' : 'Mute audio'}
          aria-label={soundMuted ? 'Unmute procedural audio' : 'Mute audio'}
        >
          {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
