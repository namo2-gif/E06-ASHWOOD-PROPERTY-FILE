import React from 'react';
import { useEvidenceStore } from '../store/useEvidenceStore';
import { X, BookOpen, Download, RotateCcw } from 'lucide-react';

export const NotebookModal: React.FC = () => {
  const { isNotebookOpen, toggleNotebook, notes, setNotes } = useEvidenceStore();

  if (!isNotebookOpen) return null;

  const handleExport = () => {
    const blob = new Blob([notes], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'e06-private-investigator-notes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Clear all private notes for E06?')) {
      setNotes('');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Private Investigator Notebook"
    >
      <div className="bg-[#241a14] border border-[#443021] rounded-xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden max-h-[85vh]">
        {/* Leather/Wood Bound Notebook Header */}
        <header className="bg-[#1b130e] border-b border-[#3b2719] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-[#b89355]" />
            <div>
              <h2 className="font-serif text-base font-bold text-[#e8dfd5]">
                Private Investigator Notebook
              </h2>
              <div className="text-[11px] font-sans text-[#a89b88]">
                Stored locally on your device · Unshared with organizers or other teams
              </div>
            </div>
          </div>

          <button
            onClick={toggleNotebook}
            className="p-1.5 rounded bg-[#2a1c14] hover:bg-[#38261b] text-[#e8dfd5] border border-[#443021]"
            aria-label="Close notebook"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Lined Notebook Paper Body */}
        <main className="p-4 sm:p-6 flex-1 flex flex-col bg-[#f6f1e6] relative overflow-hidden">
          {/* Subtle lined paper styling */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(#ad8951_1px,transparent_1px)] [background-size:100%_28px] mt-6"></div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record your observations, leaf citations, and discrepancies here. Your notes are private and unguided..."
            className="w-full flex-1 bg-transparent resize-none border-none outline-none font-serif text-sm sm:text-base leading-[28px] text-[#2c2017] placeholder:text-[#998776] z-10 min-h-[300px]"
            autoFocus
          />
        </main>

        {/* Bottom Actions */}
        <footer className="bg-[#1b130e] border-t border-[#3b2719] px-5 py-3 flex items-center justify-between">
          <div className="text-xs font-mono text-[#a89b88]">
            {notes.length} characters recorded
          </div>

          <div className="flex items-center gap-2">
            {notes.length > 0 && (
              <>
                <button
                  onClick={handleClear}
                  className="px-2.5 py-1 text-xs font-mono text-[#998776] hover:text-[#d9534f] flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
                <button
                  onClick={handleExport}
                  className="px-3 py-1 text-xs font-mono text-[#e8dfd5] bg-[#2a1c14] hover:bg-[#38261b] border border-[#443021] rounded flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#b89355]" />
                  <span>Export .txt</span>
                </button>
              </>
            )}
            <button
              onClick={toggleNotebook}
              className="px-4 py-1.5 text-xs font-mono font-bold bg-[#b89355] hover:bg-[#c9a463] text-black rounded transition-colors"
            >
              Done
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
