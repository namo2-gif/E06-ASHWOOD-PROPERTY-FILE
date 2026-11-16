import React from 'react';
import { useEvidenceStore } from '../store/useEvidenceStore';
import { X, Trash2, Pin } from 'lucide-react';

export const PinnedPagesView: React.FC = () => {
  const { pinnedPages, unpinPage, clearPinnedPages, isPinnedViewOpen, setIsPinnedViewOpen } =
    useEvidenceStore();

  if (!isPinnedViewOpen || pinnedPages.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col justify-between overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Pinned Pages Side-by-Side Comparison Desk"
    >
      {/* Top Header */}
      <header className="bg-[#17120e] border-b border-[#3b2f27] px-4 py-3 flex items-center justify-between gap-3 shadow z-10">
        <div className="flex items-center gap-2">
          <Pin className="w-4 h-4 text-[#b89355]" />
          <h2 className="font-serif text-sm sm:text-base font-bold text-[#e8dfd5]">
            Pinned Pages — Side-by-Side Desk Inspection
          </h2>
          <span className="font-mono text-xs text-[#a89b88] hidden sm:inline">
            ({pinnedPages.length} of 2 pinned)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearPinnedPages}
            className="px-2.5 py-1 text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 hover:bg-[#2a1f18] rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Pinned</span>
          </button>
          <button
            onClick={() => setIsPinnedViewOpen(false)}
            className="p-1.5 rounded bg-[#2a1f18] hover:bg-[#3d2d22] text-[#e8dfd5] border border-[#3b2f27]"
            aria-label="Close pinned view"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Comparison Area: Side by side placement */}
      <main className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {pinnedPages.map((pinned, index) => (
            <div
              key={`${pinned.leaf.id}-${index}`}
              className="bg-[#f7f2e7] rounded-lg shadow-2xl border border-[#cfc1a5] p-6 sm:p-8 relative select-text min-h-[500px] overflow-hidden"
            >
              {/* Top Pin Header for this leaf */}
              <div className="flex items-center justify-between border-b border-[#cfc1a5] pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-[#261e18] text-[#b89355] font-bold">
                    {pinned.leaf.id}
                  </span>
                  <span className="font-serif text-xs italic text-[#7a6552]">
                    {pinned.objectLabel}
                  </span>
                </div>

                <button
                  onClick={() => unpinPage(pinned.leaf.id)}
                  className="text-xs font-mono text-[#7a6552] hover:text-[#8c2626] flex items-center gap-1 border border-[#cfc1a5] px-2 py-0.5 rounded bg-[#ede4d3]"
                  title="Unpin this page"
                >
                  <X className="w-3 h-3" />
                  <span>Unpin</span>
                </button>
              </div>

              {/* Render Leaf Body Text */}
              <div className="overflow-y-auto max-h-[520px]">
                {pinned.leaf.renderContent()}
              </div>
            </div>
          ))}

          {/* Placeholder slot if only 1 page is pinned */}
          {pinnedPages.length === 1 && (
            <div className="border-2 border-dashed border-[#44352a] rounded-lg p-12 flex flex-col items-center justify-center text-center text-[#8a7a6a] min-h-[460px]">
              <Pin className="w-8 h-8 mb-3 opacity-40 text-[#b89355]" />
              <div className="font-serif text-base text-[#c4b5a2] font-semibold mb-1">
                Second Pin Slot Empty
              </div>
              <p className="font-serif text-xs italic max-w-xs text-[#8a7a6a]">
                Examine any other document on the desk and click "Pin Page" to place it side by side here.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Hint */}
      <footer className="bg-[#17120e] border-t border-[#3b2f27] px-4 py-2 text-center text-xs font-mono text-[#a89b88]">
        Manual page placement · The desk never automatedly compares or highlights differences
      </footer>
    </div>
  );
};
