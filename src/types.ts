import React from 'react';

export type DeskObjectId = 'obj-a' | 'obj-b' | 'obj-c' | 'obj-d' | 'obj-e' | 'obj-f';

export interface DocumentStamp {
  text: string;
  subtext?: string;
  type: 'received' | 'lodged' | 'file-copy' | 'registry' | 'neutral';
  color?: 'red' | 'blue' | 'sepia';
  rotation?: number;
}

export interface Leaf {
  id: string; // e.g. 'A-1', 'C-6', 'D-6', 'F-3'
  documentId: string; // e.g. 'E06-A', 'E06-C'
  displayLabel: string; // e.g. 'Sheet A-1 | Record intake: property matters'
  leafNumber: number;
  totalLeavesInObject: number;
  sourceType: 'guide' | 'terms' | 'instrument' | 'filed-bundle' | 'ledger' | 'docket' | 'sleeve' | 'receipt';
  headerText?: string;
  stamps?: DocumentStamp[];
  renderContent: () => React.ReactNode;
}

export interface DeskObject {
  id: DeskObjectId;
  letter: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  visibleLabel: string;
  type: 'folder' | 'book' | 'bundle' | 'ledger' | 'docket' | 'sleeve';
  internalContentId: string;
  leaves: Leaf[];
  hoverHint: string;
  rotation: number;
  deskPosition: {
    row: number;
    col: number;
  };
}

export interface PinnedPage {
  leaf: Leaf;
  objectId: DeskObjectId;
  objectLabel: string;
}

export interface EvidenceConfig {
  showChrome: boolean;
  backUrl: string | null;
  allowPrint: boolean;
}
