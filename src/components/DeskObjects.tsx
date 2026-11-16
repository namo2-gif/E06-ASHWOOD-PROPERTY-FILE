import React from 'react';

// Common Paper Tag Label (Deckled rectangular aged label placed at bottom edge of object)
export const PaperTagLabel: React.FC<{
  label: string;
  hoverHint?: string;
  isHovered?: boolean;
}> = ({ label, hoverHint, isHovered }) => {
  return (
    <div
      className={`relative inline-block transition-all duration-300 z-30 select-none ${
        isHovered ? '-translate-y-1 scale-105' : ''
      }`}
    >
      <div
        className="px-4 py-1.5 rounded-sm shadow-md border border-[#c4b59d] text-center"
        style={{
          backgroundColor: '#f5eedc',
          backgroundImage:
            'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(200,180,140,0.2) 100%)',
          boxShadow: '0 3px 8px rgba(0,0,0,0.35), inset 0 0 10px rgba(180,140,90,0.15)',
        }}
      >
        <span className="font-mono text-xs font-bold text-[#2d2218] tracking-wide whitespace-nowrap">
          {label}
        </span>

        {/* Operating hint shown on hover/focus only (Spec §2) */}
        {isHovered && hoverHint && (
          <div className="text-[10px] font-sans italic text-[#7a4c28] mt-0.5 animate-fade-in font-medium">
            [{hoverHint}]
          </div>
        )}
      </div>
    </div>
  );
};

// 1. OBJECT A: Transfer Reference File (Slate-blue cloth folder with tied ribbon bow & peeking sheets)
export const PhysicalFolderA: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => {
  return (
    <div className="relative w-64 h-56 transition-transform duration-300 flex flex-col items-center">
      {/* Peeking creamy paper sheets underneath/behind */}
      <div className="absolute -top-2 inset-x-3 h-10 bg-[#f7f2e5] rounded-t shadow border border-[#cfc1a5] transform rotate-1 pointer-events-none" />
      <div className="absolute -top-1 inset-x-2 h-10 bg-[#ede4d0] rounded-t shadow border border-[#cfc1a5] transform -rotate-1 pointer-events-none" />

      {/* Main Slate-Blue Cloth Folder */}
      <div
        className="relative w-full h-52 rounded-sm shadow-2xl border border-[#2b3c38] overflow-hidden flex flex-col justify-between p-3"
        style={{
          backgroundColor: '#354743',
          backgroundImage:
            'radial-gradient(ellipse at 30% 30%, rgba(85,115,110,0.35) 0%, rgba(25,35,33,0.85) 100%)',
          boxShadow: isHovered
            ? '0 20px 35px -8px rgba(0,0,0,0.7), 0 4px 10px rgba(0,0,0,0.4)'
            : '0 12px 24px -6px rgba(0,0,0,0.65), 0 2px 6px rgba(0,0,0,0.3)',
        }}
      >
        {/* Subtle cloth weave crosshatch */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)',
          }}
        />

        {/* Angled Bowed Flap across top */}
        <div
          className="absolute top-0 inset-x-0 h-24 bg-[#2f3f3c] border-b-2 border-[#202c29] shadow-md transform -skew-y-1 origin-top"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 68%, 50% 95%, 0 68%)',
          }}
        />

        {/* Tied Ribbon Bow in center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative flex items-center justify-center">
            {/* Horizontal ribbon band */}
            <div className="absolute w-64 h-4 bg-[#4a5f5a] border-y border-[#293633] shadow" />
            {/* Ribbon Loops & Tails */}
            <div className="relative z-10 flex items-center">
              <div className="w-8 h-6 rounded-full border-2 border-[#5c7570] bg-[#3d4f4b] transform -rotate-25 shadow-sm" />
              <div className="w-4 h-4 rounded-full bg-[#5c7570] border border-[#2b3935] z-20 shadow" />
              <div className="w-8 h-6 rounded-full border-2 border-[#5c7570] bg-[#3d4f4b] transform rotate-25 shadow-sm" />
            </div>
            {/* Ribbon hanging tails */}
            <div className="absolute top-4 left-1/2 -translate-x-3 w-3 h-10 bg-[#445853] transform rotate-12 border-x border-[#2d3a37] shadow" />
            <div className="absolute top-4 left-1/2 translate-x-1 w-3 h-11 bg-[#445853] transform -rotate-15 border-x border-[#2d3a37] shadow" />
          </div>
        </div>
      </div>

      {/* Tag Label at bottom edge */}
      <div className="absolute -bottom-3 z-30">
        <PaperTagLabel label="Transfer Reference File" hoverHint="Unfasten" isHovered={isHovered} />
      </div>
    </div>
  );
};

// 2. OBJECT B: Consent Instrument / File Copy (Thin thread-bound booklet with typed box & stab binding)
export const PhysicalBookB: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => {
  return (
    <div className="relative w-60 h-56 transition-transform duration-300 flex flex-col items-center">
      {/* Booklet cover */}
      <div
        className="relative w-full h-52 rounded-sm shadow-2xl border border-[#c4b59b] overflow-hidden flex flex-col justify-between p-4"
        style={{
          backgroundColor: '#ede2ca',
          backgroundImage:
            'radial-gradient(circle at 40% 40%, #f6ecd6 0%, #e6d8bc 100%)',
          boxShadow: isHovered
            ? '0 20px 35px -8px rgba(0,0,0,0.7), 0 4px 10px rgba(0,0,0,0.4)'
            : '0 12px 24px -6px rgba(0,0,0,0.65), 0 2px 6px rgba(0,0,0,0.3)',
        }}
      >
        {/* Visible Japanese-style stitched thread along left spine */}
        <div className="absolute left-3 top-0 bottom-0 w-4 flex flex-col justify-between py-3 pointer-events-none z-10">
          <div className="w-full h-0.5 bg-[#825c38] shadow-sm transform -rotate-3" />
          <div className="w-full h-0.5 bg-[#825c38] shadow-sm" />
          <div className="w-full h-0.5 bg-[#825c38] shadow-sm transform rotate-2" />
          <div className="w-full h-0.5 bg-[#825c38] shadow-sm transform -rotate-1" />
          <div className="w-full h-0.5 bg-[#825c38] shadow-sm" />
        </div>

        {/* Stack Edge Thickness visualization on right side (~9 leaves) */}
        <div
          className="absolute right-0 top-1 bottom-1 w-2 bg-gradient-to-l from-[#baa789] to-[#d6c7ac] border-l border-[#baa789] pointer-events-none"
          style={{ boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.2)' }}
        />

        {/* Small Typed Cover Label in Center per concept image */}
        <div className="flex-1 flex items-center justify-center pl-4">
          <div className="border border-[#7d6852] bg-[#f8f1e0]/80 px-4 py-2 text-center rounded-sm shadow-sm">
            <div className="font-mono text-xs font-bold text-[#2a1e15] tracking-wider">
              PC-21-044 /
            </div>
            <div className="font-mono text-xs font-bold text-[#2a1e15] tracking-wider">
              File Copy
            </div>
          </div>
        </div>

        {/* Creased blunted corner on bottom-left */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gradient-to-tl from-[#baa789] to-transparent pointer-events-none" />
      </div>

      {/* Tag Label at bottom edge */}
      <div className="absolute -bottom-3 z-30">
        <PaperTagLabel label="Consent Instrument / File Copy" hoverHint="Open" isHovered={isHovered} />
      </div>
    </div>
  );
};

// 3. OBJECT C: Filed Papers / Receipt 611 (Loose misaligned bundle with holes, counter stamp & staples)
export const PhysicalBundleC: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => {
  return (
    <div className="relative w-64 h-56 transition-transform duration-300 flex flex-col items-center">
      {/* Misaligned sheet corners underneath */}
      <div className="absolute inset-0 bg-[#e4d6bc] rounded-sm transform rotate-2 translate-x-2 translate-y-1 shadow border border-[#baa789] pointer-events-none" />
      <div className="absolute inset-0 bg-[#ebe0cb] rounded-sm transform -rotate-2 -translate-x-1.5 translate-y-0.5 shadow border border-[#baa789] pointer-events-none" />
      <div className="absolute inset-0 bg-[#f2e8d6] rounded-sm transform rotate-[0.6deg] translate-x-1 -translate-y-1 shadow border border-[#baa789] pointer-events-none" />

      {/* Top Sheet */}
      <div
        className="relative w-full h-52 rounded-sm shadow-2xl border border-[#c4b59b] overflow-hidden p-3 flex flex-col justify-between"
        style={{
          backgroundColor: '#faf4e6',
          boxShadow: isHovered
            ? '0 20px 35px -8px rgba(0,0,0,0.7), 0 4px 10px rgba(0,0,0,0.4)'
            : '0 12px 24px -6px rgba(0,0,0,0.65), 0 2px 6px rgba(0,0,0,0.3)',
        }}
      >
        {/* Metal staple at upper left */}
        <div className="absolute top-2 left-3 w-1.5 h-5 bg-gradient-to-b from-[#707070] to-[#3a3a3a] rounded-sm shadow transform -rotate-12 pointer-events-none" />

        {/* Perforated hole punch along right edge */}
        <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-around py-4 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-[#1b120c] shadow-inner" />
          <div className="w-2 h-2 rounded-full bg-[#1b120c] shadow-inner" />
          <div className="w-2 h-2 rounded-full bg-[#1b120c] shadow-inner" />
        </div>

        {/* Top Header & Registry Counter Stamp */}
        <div className="flex justify-between items-start pl-4 pr-3 pt-1">
          <div className="space-y-0.5 font-mono text-[8px] text-[#786653]">
            <div>Series: PROP-21</div>
            <div>Ref: 611/LODGE</div>
          </div>

          {/* Stamp: REGISTRY / No. 611 */}
          <div className="border-2 border-dashed border-[#1e3b6f] px-2 py-0.5 text-center transform -rotate-2 bg-[#eef3fb]/60">
            <div className="font-mono text-[9px] font-bold text-[#1e3b6f] tracking-widest uppercase">
              REGISTRY
            </div>
            <div className="font-mono text-[10px] font-extrabold text-[#1e3b6f]">
              No. 611
            </div>
          </div>
        </div>

        {/* Faint ledger table lines */}
        <div className="space-y-1.5 opacity-35 px-2 my-auto font-mono text-[7px] text-[#4d3e30]">
          <div className="h-0.5 bg-[#4d3e30] w-full" />
          <div className="flex justify-between border-b border-[#4d3e30] pb-0.5">
            <span>Item / Folio</span>
            <span>Date</span>
            <span>Initials</span>
          </div>
          <div className="flex justify-between border-b border-[#4d3e30] pb-0.5">
            <span>Consent packet</span>
            <span>23-11-21</span>
            <span>MK</span>
          </div>
          <div className="flex justify-between border-b border-[#4d3e30] pb-0.5">
            <span>Registry fee receipt</span>
            <span>23-11-21</span>
            <span>REG</span>
          </div>
        </div>

        <div className="text-right text-[8px] font-mono text-[#786653] pr-3">
          Filed Papers · Packet 611
        </div>
      </div>

      {/* Tag Label at bottom edge */}
      <div className="absolute -bottom-3 z-30">
        <PaperTagLabel label="Filed Papers / Receipt 611" hoverHint="Lift" isHovered={isHovered} />
      </div>
    </div>
  );
};

// 4. OBJECT D: Notarial Day Book (Thick dark ledger with brass corner guards, red spine & ribbon)
export const PhysicalLedgerD: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => {
  return (
    <div className="relative w-64 h-56 transition-transform duration-300 flex flex-col items-center">
      {/* Hanging red fabric ribbon bookmark extending from bottom */}
      <div
        className="absolute -bottom-5 left-10 w-4 h-9 bg-gradient-to-b from-[#8a1c1c] to-[#601212] shadow-md z-20 pointer-events-none"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)',
        }}
      />

      {/* Visible Thick Stacked Page Block Edges on Bottom & Right */}
      <div
        className="absolute bottom-0 inset-x-2 h-7 rounded-b bg-gradient-to-b from-[#d9ccb0] to-[#b3a283] border border-[#8f7e62] pointer-events-none"
        style={{
          boxShadow: 'inset 0 -2px 5px rgba(0,0,0,0.4)',
        }}
      />

      {/* Main Heavy Ledger Cover */}
      <div
        className="relative w-full h-50 rounded-sm shadow-2xl border border-[#2b1e17] overflow-hidden flex"
        style={{
          backgroundColor: '#1e2429', // Dark denim/cloth texture
          backgroundImage:
            'radial-gradient(circle at 50% 50%, #262e34 0%, #121619 100%)',
          boxShadow: isHovered
            ? '0 24px 40px -10px rgba(0,0,0,0.85), 0 6px 14px rgba(0,0,0,0.5)'
            : '0 14px 28px -6px rgba(0,0,0,0.75), 0 3px 8px rgba(0,0,0,0.4)',
        }}
      >
        {/* Burgundy / Red Leather Spine Strip on the left */}
        <div
          className="w-14 h-full bg-gradient-to-r from-[#5a1315] via-[#851e22] to-[#450e10] border-r border-[#260708] shadow-inner flex flex-col justify-around py-4 items-center"
        >
          {/* Raised leather spine ridges */}
          <div className="w-10 h-1 bg-[#260708] shadow" />
          <div className="w-10 h-1 bg-[#260708] shadow" />
          <div className="w-10 h-1 bg-[#260708] shadow" />
          <div className="w-10 h-1 bg-[#260708] shadow" />
        </div>

        {/* Reinforced Brass Metal Corner Guards on top-right and bottom-right */}
        <div
          className="absolute top-0 right-0 w-7 h-7 bg-gradient-to-bl from-[#c9a463] to-[#8c6f37] border-l border-b border-[#5e4921] shadow pointer-events-none"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-7 h-7 bg-gradient-to-tl from-[#c9a463] to-[#8c6f37] border-l border-t border-[#5e4921] shadow pointer-events-none"
          style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }}
        />

        {/* Center Metal/Parchment Title Plaque with Rivets */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative border-2 border-[#8c7456] bg-[#f0e4cf] px-4 py-3 rounded-sm shadow-md text-center max-w-[130px]">
            {/* Rivets at 4 corners */}
            <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-[#523e2a]" />
            <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#523e2a]" />
            <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-[#523e2a]" />
            <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-[#523e2a]" />

            <div className="font-serif text-[10px] uppercase font-bold text-[#3d2f23] tracking-widest border-b border-[#8c7456] pb-0.5">
              Day Book
            </div>
            <div className="font-mono text-[9px] font-bold text-[#5c4736] mt-0.5">
              1921 · Series
            </div>
          </div>
        </div>
      </div>

      {/* Tag Label at bottom edge */}
      <div className="absolute -bottom-3 z-30">
        <PaperTagLabel label="Notarial Day Book" hoverHint="Open ledger" isHovered={isHovered} />
      </div>
    </div>
  );
};

// 5. OBJECT E: Movement & Dispatch (Rumpled manila docket tied with string in cross/figure-8 around 2 buttons)
export const PhysicalDocketE: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => {
  return (
    <div className="relative w-64 h-56 transition-transform duration-300 flex flex-col items-center">
      {/* Rumpled Manila Docket Folder Cover */}
      <div
        className="relative w-full h-52 rounded-sm shadow-2xl border border-[#bfa27b] overflow-hidden flex flex-col justify-between p-4"
        style={{
          backgroundColor: '#c9a677',
          backgroundImage:
            'radial-gradient(circle at 45% 45%, #d8b88d 0%, #b89363 100%)',
          boxShadow: isHovered
            ? '0 20px 35px -8px rgba(0,0,0,0.7), 0 4px 10px rgba(0,0,0,0.4)'
            : '0 12px 24px -6px rgba(0,0,0,0.65), 0 2px 6px rgba(0,0,0,0.3)',
        }}
      >
        {/* Soft dog-eared crease at upper corner */}
        <div className="absolute top-0 right-0 w-6 h-6 bg-[#ab8657] shadow-inner transform rotate-45 translate-x-3 -translate-y-3 pointer-events-none" />

        {/* Two Round Cardboard Washer Fasteners with Twine / String tied */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          {/* Top Button Washer */}
          <div className="w-5 h-5 rounded-full bg-[#694727] border border-[#422c17] shadow-md flex items-center justify-center my-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2a1a0c]" />
          </div>

          {/* Twine String wrapped in cross / vertical loop */}
          <div className="w-0.5 h-10 bg-[#e8d5b5] shadow" />
          <div className="absolute inset-x-0 h-0.5 bg-[#e8d5b5] shadow" />

          {/* Bottom Button Washer */}
          <div className="w-5 h-5 rounded-full bg-[#694727] border border-[#422c17] shadow-md flex items-center justify-center my-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2a1a0c]" />
          </div>
        </div>

        {/* Faint printed text on cover */}
        <div className="font-mono text-[9px] text-[#614427] uppercase tracking-wider">
          Custody & Dispatch Docket
        </div>

        <div className="text-right font-mono text-[8px] text-[#614427]">
          PC-21-044 / DISP
        </div>
      </div>

      {/* Tag Label at bottom edge */}
      <div className="absolute -bottom-3 z-30">
        <PaperTagLabel label="Movement & Dispatch" hoverHint="Untie" isHovered={isHovered} />
      </div>
    </div>
  );
};

// 6. OBJECT F: Accounts / AK-44 (Translucent glassine wax-paper sleeve with visible staggered slips)
export const PhysicalSleeveF: React.FC<{ isHovered?: boolean }> = ({ isHovered }) => {
  return (
    <div className="relative w-64 h-56 transition-transform duration-300 flex flex-col items-center">
      {/* Translucent Glassine Sleeve Container */}
      <div
        className="relative w-full h-52 rounded-sm shadow-2xl border border-[#baa78d]/60 overflow-hidden flex flex-col justify-between p-3"
        style={{
          backgroundColor: 'rgba(238, 228, 210, 0.45)', // Translucent glassine
          backdropFilter: 'blur(2px)',
          boxShadow: isHovered
            ? '0 20px 35px -8px rgba(0,0,0,0.7), 0 4px 10px rgba(0,0,0,0.4)'
            : '0 12px 24px -6px rgba(0,0,0,0.65), 0 2px 6px rgba(0,0,0,0.3)',
        }}
      >
        {/* Triangular flap fold at top */}
        <div
          className="absolute top-0 inset-x-0 h-14 bg-[#dfd0b7]/50 border-b border-[#baa78d]/70 shadow-sm pointer-events-none"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
        />

        {/* Visible Slips inside glassine sleeve per concept image */}
        {/* Slip 1: Pink/red voucher slip at bottom left */}
        <div className="absolute bottom-4 left-3 w-28 h-20 bg-[#d97c7c]/40 rounded-sm shadow border border-[#b85a5a]/50 transform -rotate-3 pointer-events-none" />

        {/* Slip 2: Manila card in middle with "AK-44" & figures */}
        <div className="absolute top-6 right-3 w-36 h-28 bg-[#e8d5b5]/75 rounded-sm shadow border border-[#bda682] transform rotate-1 p-2 pointer-events-none">
          <div className="flex justify-between font-mono text-[8px] font-bold text-[#543f29] border-b border-[#543f29]/30 pb-0.5">
            <span>AK-44</span>
            <span>SETTLEMENT</span>
          </div>
          <div className="font-mono text-[7px] text-[#543f29] mt-1 space-y-0.5 text-right">
            <div>1,280.00</div>
            <div>240.00</div>
            <div className="font-bold border-t border-[#543f29]/20 pt-0.5">1,520.00</div>
          </div>
        </div>

        {/* Slip 3: Front white Invoice slip with typed breakdown */}
        <div className="absolute bottom-2 left-6 w-38 h-26 bg-[#fbf8f0]/95 rounded-sm shadow-md border border-[#c9bca7] p-2 pointer-events-none z-10">
          <div className="font-serif text-[9px] font-bold text-[#2a1e15] border-b border-[#c9bca7] pb-0.5 flex justify-between">
            <span>Invoice</span>
            <span className="font-mono text-[7px]">FEE-21</span>
          </div>
          <div className="font-mono text-[7px] text-[#3d2d1f] mt-1 space-y-0.5">
            <div className="flex justify-between"><span>Lodging</span><span>120.00</span></div>
            <div className="flex justify-between"><span>Meals</span><span>36.00</span></div>
            <div className="flex justify-between"><span>Service</span><span>8.00</span></div>
            <div className="flex justify-between font-bold border-t border-[#c9bca7] pt-0.5"><span>Total</span><span>164.00</span></div>
          </div>
        </div>
      </div>

      {/* Tag Label at bottom edge */}
      <div className="absolute -bottom-3 z-30">
        <PaperTagLabel label="Accounts / AK-44" hoverHint="Slip out" isHovered={isHovered} />
      </div>
    </div>
  );
};
