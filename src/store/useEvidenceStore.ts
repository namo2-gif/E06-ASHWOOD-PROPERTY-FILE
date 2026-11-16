import { create } from 'zustand';
import { DeskObjectId, Leaf, PinnedPage } from '../types';
import { loadNotes, saveNotes } from '../notebook/storage';
import { soundManager } from '../audio/soundManager';

interface EvidenceState {
  activeObjectId: DeskObjectId | null;
  activeLeafIndex: number;
  pinnedPages: PinnedPage[];
  isPinnedViewOpen: boolean;
  isNotebookOpen: boolean;
  notes: string;
  soundMuted: boolean;
  reducedMotion: boolean;
  zoom: number; // 1.0 to 2.0
  pan: { x: number; y: number };

  // Actions
  openObject: (id: DeskObjectId, initialLeafIndex?: number) => void;
  closeObject: () => void;
  setActiveLeafIndex: (index: number) => void;
  nextLeaf: (totalLeaves: number) => void;
  prevLeaf: () => void;
  pinPage: (leaf: Leaf, objectId: DeskObjectId, objectLabel: string) => void;
  unpinPage: (leafId: string) => void;
  clearPinnedPages: () => void;
  togglePinnedView: () => void;
  setIsPinnedViewOpen: (open: boolean) => void;
  toggleNotebook: () => void;
  setNotes: (notes: string) => void;
  toggleSound: () => void;
  toggleReducedMotion: () => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  resetZoomAndPan: () => void;
}

// Check prefers-reduced-motion
const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useEvidenceStore = create<EvidenceState>((set, get) => ({
  activeObjectId: null,
  activeLeafIndex: 0,
  pinnedPages: [],
  isPinnedViewOpen: false,
  isNotebookOpen: false,
  notes: loadNotes(),
  soundMuted: true,
  reducedMotion: prefersReduced,
  zoom: 1.0,
  pan: { x: 0, y: 0 },

  openObject: (id, initialLeafIndex = 0) => {
    set({
      activeObjectId: id,
      activeLeafIndex: initialLeafIndex,
      zoom: 1.0,
      pan: { x: 0, y: 0 },
    });
  },

  closeObject: () => {
    set({
      activeObjectId: null,
      activeLeafIndex: 0,
      zoom: 1.0,
      pan: { x: 0, y: 0 },
    });
    soundManager.playPaperRustle();
  },

  setActiveLeafIndex: (index) => {
    set({ activeLeafIndex: index });
  },

  nextLeaf: (totalLeaves) => {
    const { activeLeafIndex } = get();
    if (activeLeafIndex < totalLeaves - 1) {
      set({ activeLeafIndex: activeLeafIndex + 1 });
      soundManager.playPageTurn();
    }
  },

  prevLeaf: () => {
    const { activeLeafIndex } = get();
    if (activeLeafIndex > 0) {
      set({ activeLeafIndex: activeLeafIndex - 1 });
      soundManager.playPageTurn();
    }
  },

  pinPage: (leaf, objectId, objectLabel) => {
    const { pinnedPages } = get();
    const alreadyPinned = pinnedPages.some((p) => p.leaf.id === leaf.id);
    if (alreadyPinned) return;

    soundManager.playClip();

    // If 2 pages already pinned, replace the oldest one or keep max 2
    let updated: PinnedPage[];
    if (pinnedPages.length >= 2) {
      updated = [pinnedPages[1], { leaf, objectId, objectLabel }];
    } else {
      updated = [...pinnedPages, { leaf, objectId, objectLabel }];
    }
    set({ pinnedPages: updated, isPinnedViewOpen: true });
  },

  unpinPage: (leafId) => {
    soundManager.playClip();
    set((state) => ({
      pinnedPages: state.pinnedPages.filter((p) => p.leaf.id !== leafId),
    }));
  },

  clearPinnedPages: () => {
    soundManager.playClip();
    set({ pinnedPages: [], isPinnedViewOpen: false });
  },

  togglePinnedView: () => {
    set((state) => ({ isPinnedViewOpen: !state.isPinnedViewOpen }));
  },

  setIsPinnedViewOpen: (open) => {
    set({ isPinnedViewOpen: open });
  },

  toggleNotebook: () => {
    set((state) => ({ isNotebookOpen: !state.isNotebookOpen }));
  },

  setNotes: (notes) => {
    saveNotes(notes);
    set({ notes });
  },

  toggleSound: () => {
    const next = !get().soundMuted;
    soundManager.setMuted(next);
    set({ soundMuted: next });
    if (!next) {
      soundManager.playPaperRustle();
    }
  },

  toggleReducedMotion: () => {
    set((state) => ({ reducedMotion: !state.reducedMotion }));
  },

  setZoom: (zoom) => {
    set({ zoom: Math.min(2.0, Math.max(1.0, zoom)) });
  },

  setPan: (pan) => {
    set({ pan });
  },

  resetZoomAndPan: () => {
    set({ zoom: 1.0, pan: { x: 0, y: 0 } });
  },
}));
