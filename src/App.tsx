import React, { useMemo } from 'react';
import { Header } from './components/Header';
import { Desk } from './components/Desk';
import { FullscreenViewer } from './viewer/FullscreenViewer';
import { PinnedPagesView } from './viewer/PinnedPagesView';
import { NotebookModal } from './notebook/NotebookModal';
import { MobileTray } from './components/MobileTray';
import { getAppConfig } from './config';

export const App: React.FC = () => {
  const config = useMemo(() => getAppConfig(), []);

  return (
    <div className="min-h-screen bg-[#0e0b09] text-[#e8dfd5] flex flex-col font-sans selection:bg-[#b89355]/30">
      {/* Platform Chrome Header */}
      {config.showChrome && <Header backUrl={config.backUrl} />}

      {/* Atmospheric Evidence Desk */}
      <div className="flex-1 relative">
        <Desk />
      </div>

      {/* Foreground Document Viewer */}
      <FullscreenViewer />

      {/* Side-by-Side Pinned Page Comparison View */}
      <PinnedPagesView />

      {/* Private Investigator Notebook Modal */}
      <NotebookModal />

      {/* Mobile Object Tray */}
      <MobileTray />
    </div>
  );
};

export default App;
