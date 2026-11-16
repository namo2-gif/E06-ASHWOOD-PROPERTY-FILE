import React, { useState } from 'react';
import { useEvidenceStore } from '../store/useEvidenceStore';
import { DeskObjectId } from '../types';
import deskBg from '../assets/desk-bg.jpg';
import {
  PhysicalFolderA,
  PhysicalBookB,
  PhysicalBundleC,
  PhysicalLedgerD,
  PhysicalDocketE,
  PhysicalSleeveF,
} from './DeskObjects';
import DeskLamp from './DeskLamp';
import { LooseDeskObjects } from './LooseDeskObjects';
import { soundManager } from '../audio/soundManager';

export const Desk: React.FC = () => {
  const { openObject, toggleNotebook, reducedMotion } = useEvidenceStore();
  const [hoveredObjectId, setHoveredObjectId] = useState<DeskObjectId | null>(null);
  const [lampOn, setLampOn] = useState(true);

  return (
    <div
      className={`relative min-h-[calc(100vh-48px)] w-full overflow-hidden flex flex-col justify-between select-none ${
        !lampOn ? 'lamp-off' : ''
      }`}
      style={{
        backgroundColor: '#1b110a',
        backgroundImage: `url(${deskBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Layer 1: Ambient Vignette & Lamp Illumination (.desk-light) */}
      <div className="desk-light" />

      {/* Deep Vignette around outer desk boundaries */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          boxShadow: 'inset 0 0 140px rgba(0, 0, 0, 0.85)',
        }}
      />

      {/* Tactile Lamp Switch Pill Button */}
      <button
        onClick={() => {
          const next = !lampOn;
          setLampOn(next);
          soundManager.playSwitch();
        }}
        className="absolute top-3.5 right-5 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18120d]/85 hover:bg-[#281d14] border border-[#543d2b] shadow-xl text-xs font-mono text-[#d4af62] transition-all z-30 cursor-pointer backdrop-blur group select-none"
        title={`Desk Lamp: Click to switch ${lampOn ? 'OFF' : 'ON'}`}
        aria-label={`Toggle desk lamp: currently ${lampOn ? 'ON' : 'OFF'}`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            lampOn
              ? 'bg-[#ffc065] shadow-[0_0_10px_#ffa630]'
              : 'bg-[#403328] border border-[#6b5543]'
          }`}
        />
        <span className="font-semibold tracking-wider text-[11px] group-hover:text-[#ffe4a0]">
          Lamp: {lampOn ? 'ON' : 'OFF'}
        </span>
      </button>

      {/* Accessible screen reader toggle button */}
      <button
        onClick={() => {
          const next = !lampOn;
          setLampOn(next);
          soundManager.playSwitch();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:px-3 focus:py-1 focus:bg-[#b89355] focus:text-black font-mono text-xs rounded"
        aria-label="Toggle desk lamp"
      >
        Toggle desk lamp ({lampOn ? 'ON' : 'OFF'})
      </button>

      {/* Instant Interactive Loose Objects (Pen, Paperclip, Crumpled Note, Pencil) */}
      <LooseDeskObjects />

      {/* =========================================================================
          DESK PROPS & AMBIENT ELEMENTS
          ========================================================================= */}

      {/* 2. Ceramic Tea Cup on Saucer with Amber Tea & Steam (Left Desk: ~5% 37%) */}
      <div
        className="absolute hidden md:block pointer-events-none z-[3]"
        style={{ left: '5%', top: '37%' }}
        title="Ashwood Ceramic Tea Cup"
      >
        {/* Layer 2: Soft contact shadow under cup & saucer (darker toward bottom-left) */}
        <div
          className="absolute w-28 h-8 bg-black/55 blur-sm rounded-full pointer-events-none -z-10"
          style={{
            transform: 'translate(-12px, 66px) rotate(-3deg)',
            boxShadow: '-4px 4px 14px rgba(10,5,2,0.6)',
          }}
        />

        {/* Layer 3 & Layer 5: Ceramic Tea Cup Inline SVG with Steam */}
        <svg
          width="112"
          height="100"
          viewBox="0 0 112 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Saucer Ceramic Gradient */}
            <linearGradient id="saucerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4c7ac" />
              <stop offset="35%" stopColor="#ebe2cf" />
              <stop offset="75%" stopColor="#fdfbf5" />
              <stop offset="100%" stopColor="#ccbfa1" />
            </linearGradient>

            {/* Cup Body Gradient: shaded on left, lit from upper-right */}
            <linearGradient id="cupBodyGrad" x1="0%" y1="20%" x2="100%" y2="20%">
              <stop offset="0%" stopColor="#c4b59b" />
              <stop offset="28%" stopColor="#ded4be" />
              <stop offset="68%" stopColor="#f7f3e8" />
              <stop offset="94%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ece2cb" />
            </linearGradient>

            {/* Amber-Brown Tea Surface */}
            <radialGradient id="teaLiquidGrad" cx="62%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#944c18" />
              <stop offset="45%" stopColor="#6b300d" />
              <stop offset="85%" stopColor="#421a05" />
              <stop offset="100%" stopColor="#260d02" />
            </radialGradient>

            {/* Curved Ceramic Handle Gradient */}
            <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8deca" />
              <stop offset="50%" stopColor="#b5a386" />
              <stop offset="100%" stopColor="#d0c2a8" />
            </linearGradient>
          </defs>

          {/* Saucer Body */}
          <ellipse cx="56" cy="74" rx="46" ry="13" fill="url(#saucerGrad)" stroke="#bdae92" strokeWidth="0.85" />
          <ellipse cx="56" cy="73" rx="29" ry="7.5" fill="#ded2b8" stroke="#c4b79c" strokeWidth="0.5" />

          {/* Ceramic Cup Handle on the left */}
          <path
            d="M 34,48 C 19,48 17,63 36,66"
            fill="none"
            stroke="url(#handleGrad)"
            strokeWidth="4.8"
            strokeLinecap="round"
          />
          <path
            d="M 34,48 C 21,48 19,63 36,66"
            fill="none"
            stroke="#857053"
            strokeWidth="0.85"
            strokeLinecap="round"
            opacity="0.45"
          />

          {/* Cup Body */}
          <path
            d="M 33,42 C 33,63 39,69 56,69 C 73,69 79,63 79,42 Z"
            fill="url(#cupBodyGrad)"
            stroke="#bfae91"
            strokeWidth="0.85"
          />

          {/* Subtle Ashwood Guesthouse Emblem on Cup Body */}
          <g opacity="0.65" transform="translate(50, 52)">
            <path d="M 3,6 L 6,1 L 9,6 Z" fill="#634832" />
            <path d="M 7,6 L 9.5,2.5 L 12,6 Z" fill="#634832" />
            <text x="6" y="9.5" fontFamily="monospace" fontSize="3" fontWeight="bold" textAnchor="middle" fill="#634832" letterSpacing="0.5">ASHWOOD</text>
          </g>

          {/* Top Ceramic Rim & Amber Tea Surface */}
          <ellipse cx="56" cy="42" rx="23" ry="9" fill="#faf6ed" stroke="#cbbda1" strokeWidth="0.9" />
          <ellipse cx="56" cy="43" rx="20.5" ry="7.5" fill="url(#teaLiquidGrad)" />

          {/* Tea surface crescent light reflection */}
          <path
            d="M 48,45 C 58,47 70,44 72,41 C 70,43 58,45 48,45 Z"
            fill="rgba(255, 230, 165, 0.45)"
          />
          {/* Specular highlight on right rim */}
          <path
            d="M 56,33.5 C 67,33.5 78,37.5 78,42 C 78,43.5 76,45.5 72,46.5"
            fill="none"
            stroke="rgba(255,255,255,0.78)"
            strokeWidth="0.85"
          />

          {/* Layer 5: Three Translucent Steam Trails */}
          <g style={{ pointerEvents: 'none' }}>
            <path
              className="steam-trail-1"
              d="M 52,35 C 49,27 57,20 53,12 C 51,7 54,3 56,-2"
              fill="none"
              stroke="rgba(255,245,230,0.32)"
              strokeWidth="1.8"
              strokeLinecap="round"
              filter="blur(1px)"
            />
            <path
              className="steam-trail-2"
              d="M 58,34 C 62,26 54,18 60,10 C 63,5 59,0 62,-5"
              fill="none"
              stroke="rgba(255,245,230,0.26)"
              strokeWidth="1.6"
              strokeLinecap="round"
              filter="blur(1.2px)"
            />
            <path
              className="steam-trail-3"
              d="M 55,36 C 54,29 48,23 51,16 C 53,11 50,6 52,1"
              fill="none"
              stroke="rgba(255,245,230,0.22)"
              strokeWidth="1.4"
              strokeLinecap="round"
              filter="blur(1px)"
            />
          </g>
        </svg>
      </div>

      {/* 3. Stack of Archival Books on Far Left Edge */}
      <div className="absolute top-6 left-0 hidden 2xl:flex flex-col pointer-events-none z-10 opacity-80">
        <div className="w-20 h-5 bg-[#4a1818] rounded-r border-y border-[#290a0a] shadow-lg transform -rotate-1" />
        <div className="w-24 h-6 bg-[#25362e] rounded-r border-y border-[#121c17] shadow-lg transform rotate-1 -mt-0.5" />
        <div className="w-22 h-6 bg-[#2b2118] rounded-r border-y border-[#1a130d] shadow-lg -mt-0.5" />
      </div>

      {/* 4. Closed Private Field Notes Leather Notebook on Far Right */}
      <div
        onClick={toggleNotebook}
        className="absolute top-28 right-8 hidden xl:flex flex-col items-center cursor-pointer group z-20 transition-transform duration-300 hover:scale-105"
        title="Open Private Field Notes"
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleNotebook();
        }}
        aria-label="Private Field Notes Notebook"
      >
        <div
          className="relative w-36 h-52 rounded-r-md border border-[#4a2e1d] shadow-2xl p-4 flex flex-col justify-between transform rotate-2 group-hover:rotate-0 transition-transform"
          style={{
            backgroundColor: '#3b2214',
            backgroundImage:
              'radial-gradient(circle at 60% 40%, #502e1b 0%, #29150a 100%)',
            boxShadow: '0 16px 32px rgba(0,0,0,0.85), inset 0 0 15px rgba(0,0,0,0.7)',
          }}
        >
          {/* Perimeter Stitched Seams */}
          <div className="absolute inset-1 border border-dashed border-[#855834]/40 rounded-r-sm pointer-events-none" />

          {/* Sewn spine band on left */}
          <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-[#1f0f06] rounded-l border-r border-[#3b1d0e]" />

          {/* Leather Closure Strap with Brass Snap on right */}
          <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-7 h-5 rounded-r bg-[#29150a] border border-[#52331f] shadow flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#c9a463] shadow-sm border border-[#8a682a]" />
          </div>

          {/* Gold Embossed Title in Center */}
          <div className="text-center pl-2 my-auto">
            <div className="font-serif text-sm font-bold tracking-wider text-[#d4af62] drop-shadow">
              Private
            </div>
            <div className="font-serif text-xs font-semibold tracking-wide text-[#c9a463] mt-0.5">
              Field Notes
            </div>
          </div>

          <div className="text-right text-[9px] font-mono text-[#8a6840] pr-1">
            Tap to open
          </div>
        </div>
        <div className="w-40 h-4 bg-black/70 blur-md rounded-full -mt-2" />
      </div>

      {/* =========================================================================
          TOP LEFT HEADER & PINNED PARCHMENT PROMPT NOTE
          ========================================================================= */}
      <div className="relative z-20 max-w-5xl px-6 pt-5 pb-2 text-left">
        {/* Title & Subtitle */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5ebd9] tracking-wide drop-shadow-md">
          E06 — Ashwood Property File
        </h1>
        <p className="font-serif italic text-xs sm:text-sm text-[#baa58d] mt-0.5">
          Records recovered from the Ashwood Guesthouse transfer file, 2021–2024.
        </p>

        {/* Pinned Parchment Note with Deckled Edge & Red Paperclip (per concept image) */}
        <div className="mt-3 relative inline-block max-w-xl">
          <div
            className="relative bg-[#ebd9b5] text-[#2c1d11] px-5 py-2.5 rounded-sm shadow-xl border border-[#c4af85] flex items-center gap-3 transform -rotate-[0.5deg]"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(200,170,120,0.15) 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.45), inset 0 0 15px rgba(160,115,65,0.18)',
            }}
          >
            {/* Red Paperclip on the left */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-3.5 h-8 rounded-full border-2 border-[#a82525] bg-transparent shadow-sm transform -rotate-12" />
            </div>

            {/* Note text in clean typewriter / archival font */}
            <p className="font-mono text-xs text-[#2b1c11] leading-relaxed pl-1 select-text">
              Six groups of records have been placed on the desk. Examine anything that appears relevant. Your notes are private.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN TABLETOP: 3 × 2 PHYSICAL OBJECT ARRANGEMENT
          ========================================================================= */}
      <main className="relative z-20 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex items-center justify-center">
        {/* Desk Tabletop with 3D tilt as in reference demo */}
        <div
          className="w-full max-w-5xl"
          style={{
            perspective: '1400px',
          }}
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 sm:gap-y-12 gap-x-6 sm:gap-x-8 items-center justify-items-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: !reducedMotion ? 'rotateX(18deg)' : 'none',
            }}
          >
            {/* OBJECT A: Transfer Reference File */}
            <div
              onClick={() => openObject('obj-a')}
              onMouseEnter={() => setHoveredObjectId('obj-a')}
              onMouseLeave={() => setHoveredObjectId(null)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openObject('obj-a');
              }}
              aria-label="Transfer Reference File. Press Enter to unfasten"
              className="cursor-pointer outline-none focus:ring-2 focus:ring-[#c9a463] rounded transition-transform duration-300"
              style={{
                transform:
                  hoveredObjectId === 'obj-a'
                    ? 'translateY(-10px) rotate(-1.5deg) scale(1.03)'
                    : 'rotate(-3deg)',
              }}
            >
              <PhysicalFolderA isHovered={hoveredObjectId === 'obj-a'} />
            </div>

            {/* OBJECT B: Consent Instrument / File Copy */}
            <div
              onClick={() => openObject('obj-b')}
              onMouseEnter={() => setHoveredObjectId('obj-b')}
              onMouseLeave={() => setHoveredObjectId(null)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openObject('obj-b');
              }}
              aria-label="Consent Instrument / File Copy. Press Enter to open"
              className="cursor-pointer outline-none focus:ring-2 focus:ring-[#c9a463] rounded transition-transform duration-300"
              style={{
                transform:
                  hoveredObjectId === 'obj-b'
                    ? 'translateY(-10px) rotate(0.8deg) scale(1.03)'
                    : 'rotate(1.8deg)',
              }}
            >
              <PhysicalBookB isHovered={hoveredObjectId === 'obj-b'} />
            </div>

            {/* OBJECT C: Filed Papers / Receipt 611 */}
            <div
              onClick={() => openObject('obj-c')}
              onMouseEnter={() => setHoveredObjectId('obj-c')}
              onMouseLeave={() => setHoveredObjectId(null)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openObject('obj-c');
              }}
              aria-label="Filed Papers / Receipt 611. Press Enter to lift"
              className="cursor-pointer outline-none focus:ring-2 focus:ring-[#c9a463] rounded transition-transform duration-300"
              style={{
                transform:
                  hoveredObjectId === 'obj-c'
                    ? 'translateY(-10px) rotate(-0.5deg) scale(1.03)'
                    : 'rotate(-2deg)',
              }}
            >
              <PhysicalBundleC isHovered={hoveredObjectId === 'obj-c'} />
            </div>

            {/* OBJECT D: Notarial Day Book */}
            <div
              onClick={() => openObject('obj-d')}
              onMouseEnter={() => setHoveredObjectId('obj-d')}
              onMouseLeave={() => setHoveredObjectId(null)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openObject('obj-d');
              }}
              aria-label="Notarial Day Book. Press Enter to open ledger"
              className="cursor-pointer outline-none focus:ring-2 focus:ring-[#c9a463] rounded transition-transform duration-300"
              style={{
                transform:
                  hoveredObjectId === 'obj-d'
                    ? 'translateY(-10px) rotate(0deg) scale(1.03)'
                    : 'rotate(-1.2deg)',
              }}
            >
              <PhysicalLedgerD isHovered={hoveredObjectId === 'obj-d'} />
            </div>

            {/* OBJECT E: Movement & Dispatch */}
            <div
              onClick={() => openObject('obj-e')}
              onMouseEnter={() => setHoveredObjectId('obj-e')}
              onMouseLeave={() => setHoveredObjectId(null)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openObject('obj-e');
              }}
              aria-label="Movement & Dispatch. Press Enter to untie"
              className="cursor-pointer outline-none focus:ring-2 focus:ring-[#c9a463] rounded transition-transform duration-300"
              style={{
                transform:
                  hoveredObjectId === 'obj-e'
                    ? 'translateY(-10px) rotate(1deg) scale(1.03)'
                    : 'rotate(2.2deg)',
              }}
            >
              <PhysicalDocketE isHovered={hoveredObjectId === 'obj-e'} />
            </div>

            {/* OBJECT F: Accounts / AK-44 */}
            <div
              onClick={() => openObject('obj-f')}
              onMouseEnter={() => setHoveredObjectId('obj-f')}
              onMouseLeave={() => setHoveredObjectId(null)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openObject('obj-f');
              }}
              aria-label="Accounts / AK-44. Press Enter to slip out"
              className="cursor-pointer outline-none focus:ring-2 focus:ring-[#c9a463] rounded transition-transform duration-300"
              style={{
                transform:
                  hoveredObjectId === 'obj-f'
                    ? 'translateY(-10px) rotate(2deg) scale(1.03)'
                    : 'rotate(3.5deg)',
              }}
            >
              <PhysicalSleeveF isHovered={hoveredObjectId === 'obj-f'} />
            </div>
          </div>
        </div>
      </main>

      {/* Empty space at bottom for mobile tray offset */}
      <div className="h-12 md:h-4 pointer-events-none" />

      {/* Articulated Brass Desk Lamp (Rendered last inside scene, no wrapper stacking context) */}
      <DeskLamp
        on={lampOn}
        onChange={(val) => {
          setLampOn(val);
          soundManager.playSwitch();
        }}
        size={210}
        className="hidden md:block"
        style={{
          position: 'absolute',
          right: '3%',
          bottom: '16px',
        }}
      />
    </div>
  );
};
