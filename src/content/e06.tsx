import React from 'react';
import { DeskObject, Leaf } from '../types';

/* =========================================================================
   STAMPS & MARGINAL DECORATIONS (Authentic Archival Bureaucracy)
   ========================================================================= */

export const RubberStamp: React.FC<{
  text: string;
  subtext?: string;
  variant?: 'received' | 'lodged' | 'file-copy' | 'counter';
  className?: string;
}> = ({ text, subtext, variant = 'received', className = '' }) => {
  const colorStyles = {
    received: 'border-[#1e3b6f] text-[#1e3b6f]',
    lodged: 'border-[#1e3b6f] text-[#1e3b6f]',
    'file-copy': 'border-[#5a483a] text-[#5a483a]',
    counter: 'border-[#8c2626] text-[#8c2626]',
  }[variant];

  return (
    <div
      className={`inline-block border-2 border-dashed px-3 py-1 font-mono uppercase tracking-widest text-xs font-bold select-none opacity-85 rotate-[-2deg] ${colorStyles} ${className}`}
      style={{
        maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 85%, rgba(0,0,0,0.6) 100%)',
      }}
    >
      <div>{text}</div>
      {subtext && <div className="text-[10px] tracking-normal font-sans font-normal opacity-90">{subtext}</div>}
    </div>
  );
};

/* =========================================================================
   LEAF DEFINITIONS: 33 REAL BROWSABLE DOM LEAVES
   ========================================================================= */

// --- OBJECT A: Transfer Reference File (5 leaves) ---
const OBJECT_A_LEAVES: Leaf[] = [
  {
    id: 'A-1',
    documentId: 'E06-A',
    displayLabel: 'Sheet A-1 | Record intake: property matters',
    leafNumber: 1,
    totalLeavesInObject: 5,
    sourceType: 'guide',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-mono text-xs tracking-wider text-[#6a5a4d] uppercase">Ashwood Property File — Reference Leaf</div>
              <h2 className="text-xl font-bold font-serif text-[#1f1c19] mt-0.5">Record Intake: Property Matters</h2>
            </div>
            <div className="text-right font-mono text-[11px] text-[#6a5a4d]">
              <div>Series: <span className="font-bold text-[#1f1c19]">PROP / 2021</span></div>
              <div>Ref: <span className="font-bold text-[#1f1c19]">PC-21-044</span></div>
            </div>
          </div>
        </div>

        <div className="bg-[#ede4d3]/60 p-3.5 rounded border border-[#cfc1a5] font-sans text-xs space-y-1.5">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d] font-medium">Property:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">Ashwood Guesthouse and associated landholding, Mussoorie vicinity, Uttarakhand</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d] font-medium">Interested parties:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">Leela Rao; Devendra Rao</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d] font-medium">Proposed counterparty:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">Northline Estates LLP</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d] font-medium">Legal correspondence:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">Khanna Legal</span>
          </div>
        </div>

        <div className="space-y-3">
          <p>
            <strong className="text-[#1f1c19]">Purpose of this leaf:</strong> To identify related papers preserved across the property office, the counsel docket and registration records. A file reference is not an instrument of transfer, and a document's presence in a file does not indicate that the content has been examined or approved by the receiving clerk.
          </p>
          <p>
            Common items maintained in a transaction packet include: an authority or consent instrument; schedule of property particulars; commercial heads of terms; custody and dispatch sheet; registry lodgement acknowledgment; final registration acknowledgment; and settlement or invoice extracts.
          </p>
          <p>
            Archive requests are indexed by file series and document type. Copies used by separate offices may carry later routing marks, received stamps and supplementary reference slips.
          </p>
        </div>

        <div className="pt-4 border-t border-dashed border-[#cfc1a5] text-[11px] font-sans italic text-[#6a5a4d]">
          Filing notation: retained with the property-series reference documents.
        </div>
      </div>
    ),
  },
  {
    id: 'A-2',
    documentId: 'E06-A',
    displayLabel: 'Sheet A-2 | How to read the intake marks',
    leafNumber: 2,
    totalLeavesInObject: 5,
    sourceType: 'guide',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-3">
          <div className="font-mono text-xs tracking-wider text-[#6a5a4d] uppercase">Office Guide — Document Movement</div>
          <h2 className="text-xl font-bold font-serif text-[#1f1c19] mt-0.5">Intake and Status Terminology</h2>
        </div>

        <div className="space-y-3">
          <ul className="space-y-2.5 font-sans text-xs">
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#1f1c19] min-w-[90px]">• Executed:</span>
              <span>Signed by the parties indicated. The scope of authority depends on the actual clauses, not on the cover description.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#1f1c19] min-w-[90px]">• Office copy:</span>
              <span>A copy kept for staff reference. A copy stamp does not certify conformity with another copy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#1f1c19] min-w-[90px]">• Received / returned:</span>
              <span>Administrative custody entries; may identify a sender or recipient without verifying each internal leaf.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#1f1c19] min-w-[90px]">• Lodged:</span>
              <span>Delivered for processing at the registry counter. A receipt confirms acceptance of papers for registration workflow, not every factual representation within them.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#1f1c19] min-w-[90px]">• Registered:</span>
              <span>A registration event has been recorded under the assigned registry number.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#1f1c19] min-w-[90px]">• Completed:</span>
              <span>Transactional settlement has been recorded by parties or their professional agents.</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#ede4d3]/70 p-3 rounded border border-[#cfc1a5] space-y-2 text-xs">
          <p>
            <strong className="text-[#1f1c19]">Cross-reference convention:</strong> <code className="font-mono font-bold text-[#1f1c19]">PC-21-044</code> identifies the consent file; registry receipts are separately numbered. The number of leaves should be stated separately from the number of photocopies enclosed.
          </p>
          <p className="text-[#6a5a4d] italic">
            Routine office reminder: File requests should quote the available series, date and receiving-office reference so that records can be retrieved efficiently.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'A-3',
    documentId: 'E06-A',
    displayLabel: 'Sheet A-3 | File index extract',
    leafNumber: 3,
    totalLeavesInObject: 5,
    sourceType: 'guide',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-3">
          <div className="font-mono text-xs tracking-wider text-[#6a5a4d] uppercase">Ashwood Guesthouse — Property Series Index</div>
          <h2 className="text-xl font-bold font-serif text-[#1f1c19] mt-0.5">Archive Index Extract</h2>
          <div className="text-xs font-sans text-[#6a5a4d] italic mt-1">Prepared for file retrieval; items listed by subject, not evidentiary priority.</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border border-[#cfc1a5]">
            <thead className="bg-[#dfd4bc] font-semibold text-[#1f1c19] border-b border-[#cfc1a5]">
              <tr>
                <th className="p-2 border-r border-[#cfc1a5]">Index tab</th>
                <th className="p-2 border-r border-[#cfc1a5]">Document description</th>
                <th className="p-2">Normal filing location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cfc1a5]">
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono font-bold border-r border-[#cfc1a5]">01</td>
                <td className="p-2 border-r border-[#cfc1a5]">Property particulars and authority schedule</td>
                <td className="p-2">Consent instrument</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono font-bold border-r border-[#cfc1a5]">02</td>
                <td className="p-2 border-r border-[#cfc1a5]">Commercial heads / transaction conditions</td>
                <td className="p-2">Terms docket</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono font-bold border-r border-[#cfc1a5]">03</td>
                <td className="p-2 border-r border-[#cfc1a5]">Owners' consent — file series PC-21-044</td>
                <td className="p-2">Consent instrument</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono font-bold border-r border-[#cfc1a5]">04</td>
                <td className="p-2 border-r border-[#cfc1a5]">Notarial day book reference, 04 Nov 2021</td>
                <td className="p-2">Notarial register</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono font-bold border-r border-[#cfc1a5]">05</td>
                <td className="p-2 border-r border-[#cfc1a5]">Movement sheet, November 2021</td>
                <td className="p-2">Dispatch docket</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono font-bold border-r border-[#cfc1a5]">06</td>
                <td className="p-2 border-r border-[#cfc1a5]">Registry acknowledgment, 23 Nov 2021</td>
                <td className="p-2">Filed papers</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono font-bold border-r border-[#cfc1a5]">07</td>
                <td className="p-2 border-r border-[#cfc1a5]">Registration acknowledgment, 29 Nov 2021</td>
                <td className="p-2">Filed papers</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono font-bold border-r border-[#cfc1a5]">08</td>
                <td className="p-2 border-r border-[#cfc1a5]">Counsel fee arrangement and settlement</td>
                <td className="p-2">Accounts sleeve</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-dashed border-[#cfc1a5] text-[11px] font-sans italic text-[#6a5a4d]">
          Older office indexes sometimes identify the container rather than the precise revision of a document.
        </div>
      </div>
    ),
  },
  {
    id: 'B-1',
    documentId: 'E06-B',
    displayLabel: 'Sheet B-1 | Ashwood Guesthouse — heads of terms',
    leafNumber: 4,
    totalLeavesInObject: 5,
    sourceType: 'terms',
    renderContent: () => (
      <div className="space-y-4 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-2 flex justify-between items-start">
          <div>
            <div className="font-mono text-xs tracking-wider text-[#6a5a4d] uppercase">Private Commercial Heads — Working Record</div>
            <h2 className="text-xl font-bold font-serif text-[#1f1c19] mt-0.5">Ashwood Guesthouse — Heads of Terms</h2>
          </div>
          <div className="font-mono text-xs text-right text-[#6a5a4d]">
            <div>Ref: <span className="font-bold text-[#1f1c19]">AK/PROP/21-44</span></div>
            <div>Date: <span className="font-bold text-[#1f1c19]">November 2021</span></div>
          </div>
        </div>

        <div className="bg-[#ede4d3]/60 p-2.5 rounded border border-[#cfc1a5] font-sans text-xs grid grid-cols-2 gap-x-4 gap-y-1">
          <div><span className="text-[#6a5a4d]">Property:</span> <span className="font-semibold text-[#1f1c19]">Ashwood Guesthouse, Uttarakhand</span></div>
          <div><span className="text-[#6a5a4d]">Proposed buyer:</span> <span className="font-semibold text-[#1f1c19]">Northline Estates LLP</span></div>
          <div><span className="text-[#6a5a4d]">Owner reps:</span> <span className="font-semibold text-[#1f1c19]">Leela Rao and Devendra Rao</span></div>
          <div><span className="text-[#6a5a4d]">Counsel:</span> <span className="font-semibold text-[#1f1c19]">Khanna Legal</span></div>
        </div>

        <div className="space-y-3 font-serif text-xs leading-relaxed">
          <p>
            <strong className="text-[#1f1c19]">1. Subject property.</strong> The proposed transaction concerns the guesthouse premises together with the fixtures, access arrangements and associated land described in the property schedule. Inventory and movable chattels are subject to separate reconciliation.
          </p>
          <p>
            <strong className="text-[#1f1c19]">2. Proposed consideration.</strong> The agreed commercial price for the contemplated transfer of title is <strong className="font-bold text-[#1f1c19]">₹3,40,00,000</strong> (rupees three crore forty lakh). The figure excludes independently reconciled movable assets and ordinary transaction disbursements.
          </p>
          <p>
            <strong className="text-[#1f1c19]">3. Conditions to proceed.</strong> Completion remains subject to satisfactory title papers, appropriate owner authority, registry requirements, and clearance of any defects notified in the legal requisitions. A commercial agreement is not, by itself, an instruction to convey title.
          </p>
          <p>
            <strong className="text-[#1f1c19]">4. Professional fees.</strong> Base professional charges and disbursements are dealt with under the engagement file. Condition <strong className="font-bold text-[#1f1c19]">4.2</strong> provides for a separate completion-dependent fee, described in the accounts extract, payable only upon registration and completion of the proposed sale. No completion, no entitlement to that contingent amount.
          </p>
          <p>
            <strong className="text-[#1f1c19]">5. Circulation.</strong> The working record may be held by the owner-side office, purchaser's correspondence file and counsel. If circulated with an authority instrument, the text of the authority instrument governs the acts permitted by the owners.
          </p>
        </div>

        <div className="pt-2 border-t border-dashed border-[#cfc1a5] text-[11px] font-sans italic text-[#6a5a4d]">
          Initials / circulation: owner-side file; counsel copy; purchaser-side acknowledgment retained separately.
        </div>
      </div>
    ),
  },
  {
    id: 'B-2',
    documentId: 'E06-B',
    displayLabel: 'Sheet B-2 | Closing notation',
    leafNumber: 5,
    totalLeavesInObject: 5,
    sourceType: 'terms',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-3">
          <div className="font-mono text-xs tracking-wider text-[#6a5a4d] uppercase">Transaction File — Registered / Settled</div>
          <h2 className="text-xl font-bold font-serif text-[#1f1c19] mt-0.5">Commercial Closing Summary</h2>
          <div className="text-xs font-sans text-[#6a5a4d] mt-1">
            Property: Ashwood Guesthouse · Related consent file: <span className="font-mono font-bold text-[#1f1c19]">PC-21-044</span> · Buyer: Northline Estates LLP
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border border-[#cfc1a5]">
            <thead className="bg-[#dfd4bc] font-semibold text-[#1f1c19] border-b border-[#cfc1a5]">
              <tr>
                <th className="p-2 border-r border-[#cfc1a5]">Event</th>
                <th className="p-2 border-r border-[#cfc1a5]">Date</th>
                <th className="p-2">Filing reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cfc1a5]">
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 border-r border-[#cfc1a5]">Consented instrument presented to registry</td>
                <td className="p-2 font-mono border-r border-[#cfc1a5]">23 Nov 2021</td>
                <td className="p-2 font-mono font-bold">REG-231121-611</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 border-r border-[#cfc1a5]">Transfer recorded in registry</td>
                <td className="p-2 font-mono border-r border-[#cfc1a5]">29 Nov 2021</td>
                <td className="p-2 font-mono font-bold">REG-291121-702</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 border-r border-[#cfc1a5]">Commercial settlement completed</td>
                <td className="p-2 font-mono border-r border-[#cfc1a5]">30 Nov 2021</td>
                <td className="p-2 font-sans italic">Settlement recorded in office completion book</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#ede4d3]/70 p-3 rounded border border-[#cfc1a5] text-xs font-sans space-y-2">
          <p>
            <strong className="text-[#1f1c19]">Office note:</strong> Closing entries are transaction-status entries. They do not amend or reproduce the actual clauses of any owner's authority instrument. For wording of the supporting consent, consult file <code className="font-mono font-bold text-[#1f1c19]">PC-21-044</code>.
          </p>
        </div>
      </div>
    ),
  },
];

// --- OBJECT B: Consent Instrument / File Copy (9 leaves) ---
const OBJECT_B_LEAVES: Leaf[] = [
  {
    id: 'C-1',
    documentId: 'E06-C',
    displayLabel: 'Leaf 1 of 9 | Cover and parties',
    leafNumber: 1,
    totalLeavesInObject: 9,
    sourceType: 'instrument',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="flex justify-between items-start border-b-2 border-[#2b241e] pb-3">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#7a6552]">Ashwood Guesthouse</div>
            <h1 className="text-xl font-bold font-serif text-[#1e1712] mt-1">Consent and Limited Authority Instrument</h1>
          </div>
          <div className="text-right">
            <RubberStamp text="FILE COPY" variant="file-copy" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-[#ede4d3]/50 p-3 rounded border border-[#cfc1a5] font-sans text-xs">
          <div><span className="text-[#7a6552]">Instrument series:</span> <span className="font-mono font-bold text-[#1e1712]">PC-21-044</span></div>
          <div><span className="text-[#7a6552]">Date of execution:</span> <span className="font-semibold text-[#1e1712]">04 November 2021</span></div>
          <div><span className="text-[#7a6552]">Execution place:</span> <span className="font-semibold text-[#1e1712]">Uttarakhand</span></div>
          <div><span className="text-[#7a6552]">Notarial day-book ref:</span> <span className="font-mono font-bold text-[#1e1712]">NR-041121-26</span></div>
        </div>

        <div className="space-y-4 font-serif text-xs leading-relaxed text-[#2d2824]">
          <p>
            This instrument records the consent of <strong className="font-semibold text-[#1e1712]">Leela Rao</strong>, co-owner of the property described in the schedule, in relation to the limited management and leasing matters set out below. <strong className="font-semibold text-[#1e1712]">Devendra Rao</strong> is the other co-owner named in the property records. The owners' names are recorded for identification of interests and should not be taken to enlarge the authority expressed in the operative clauses.
          </p>
          <p>
            This document consists of <strong className="font-semibold text-[#1e1712]">nine leaves</strong>, including the schedule and acknowledgment. Each leaf bears the same file series. The terms are to be read together.
          </p>
        </div>

        <div className="pt-6 text-right font-mono text-[11px] text-[#7a6552]">
          Leaf 1 of 9 — PC-21-044
        </div>
      </div>
    ),
  },
  {
    id: 'C-2',
    documentId: 'E06-C',
    displayLabel: 'Leaf 2 of 9 | Background',
    leafNumber: 2,
    totalLeavesInObject: 9,
    sourceType: 'instrument',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b border-[#cfc1a5] pb-2">
          <div className="font-mono text-xs tracking-wider text-[#7a6552] uppercase">Instrument Series PC-21-044</div>
          <h2 className="text-lg font-bold font-serif text-[#1e1712]">Recitals</h2>
        </div>

        <div className="space-y-4 font-serif text-xs leading-relaxed">
          <p>
            <strong>A.</strong> The owners hold interests in the land and improvements commonly known as Ashwood Guesthouse, together with its ancillary access, services and site fixtures as recorded in the property books.
          </p>
          <p>
            <strong>B.</strong> Leasing, temporary occupation and related management arrangements have been considered in order to maintain the property while longer-term ownership decisions remain reserved.
          </p>
          <p>
            <strong>C.</strong> The consenting co-owner wishes to permit specified acts to be prepared and administered on her behalf, without conveying the underlying ownership interest merely by this instrument.
          </p>
          <p>
            <strong>D.</strong> A person relying upon this instrument shall read the <strong>specific limitations</strong> in the operative clauses and shall not infer an enlarged authority from any attached correspondence or commercial heads of terms.
          </p>
        </div>

        <div className="pt-6 text-right font-mono text-[11px] text-[#7a6552]">
          Leaf 2 of 9 — PC-21-044
        </div>
      </div>
    ),
  },
  {
    id: 'C-3',
    documentId: 'E06-C',
    displayLabel: 'Leaf 3 of 9 | Definitions',
    leafNumber: 3,
    totalLeavesInObject: 9,
    sourceType: 'instrument',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b border-[#cfc1a5] pb-2">
          <div className="font-mono text-xs tracking-wider text-[#7a6552] uppercase">Instrument Series PC-21-044</div>
          <h2 className="text-lg font-bold font-serif text-[#1e1712]">Interpretation</h2>
        </div>

        <div className="space-y-3 font-serif text-xs leading-relaxed">
          <p className="italic text-[#7a6552] font-sans">In this instrument:</p>
          <p>
            <strong>1. Property</strong> means the guesthouse premises and scheduled adjoining rights identified on Leaf 8.
          </p>
          <p>
            <strong>2. Authorised Representative</strong> means the professional representative appointed for the limited acts described on Leaf 6, acting through the owner-side file as required.
          </p>
          <p>
            <strong>3. Lease</strong> means a contractual grant of temporary possession or occupation for a specified term that does not convey ownership of the Property.
          </p>
          <p>
            <strong>4. Owner</strong> means the consenting co-owner in the relevant clause and, where a separate signature is required, each affected co-owner acting personally.
          </p>
          <p>
            <strong>5. Registry papers</strong> means the forms and acknowledgments needed to record a transaction otherwise validly authorised.
          </p>
          <p className="pt-2 text-[#7a6552] italic font-sans">
            Headings assist reading only. They do not override operative wording.
          </p>
        </div>

        <div className="pt-6 text-right font-mono text-[11px] text-[#7a6552]">
          Leaf 3 of 9 — PC-21-044
        </div>
      </div>
    ),
  },
  {
    id: 'C-4',
    documentId: 'E06-C',
    displayLabel: 'Leaf 4 of 9 | Administrative permissions',
    leafNumber: 4,
    totalLeavesInObject: 9,
    sourceType: 'instrument',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b border-[#cfc1a5] pb-2">
          <div className="font-mono text-xs tracking-wider text-[#7a6552] uppercase">Instrument Series PC-21-044</div>
          <h2 className="text-lg font-bold font-serif text-[#1e1712]">Office and Property Management</h2>
        </div>

        <div className="space-y-4 font-serif text-xs leading-relaxed">
          <p>
            The Authorised Representative may obtain ordinary property extracts, receive notices, correspond with valuation and maintenance agencies, arrange inspections, and compile schedules necessary for discussions with potential occupiers or counterparties.
          </p>
          <p>
            Documents prepared in contemplation of a transaction may be circulated for review without being accepted as final instructions to execute that transaction. Collection of a registry form, copy of a survey or draft terms is not proof that a disposition has been approved.
          </p>
          <p>
            Any expenditure incurred on behalf of the Property shall be documented in the owner-side account, subject to later reconciliation.
          </p>
        </div>

        <div className="pt-6 text-right font-mono text-[11px] text-[#7a6552]">
          Leaf 4 of 9 — PC-21-044
        </div>
      </div>
    ),
  },
  {
    id: 'C-5',
    documentId: 'E06-C',
    displayLabel: 'Leaf 5 of 9 | Preliminary negotiation',
    leafNumber: 5,
    totalLeavesInObject: 9,
    sourceType: 'instrument',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b border-[#cfc1a5] pb-2">
          <div className="font-mono text-xs tracking-wider text-[#7a6552] uppercase">Instrument Series PC-21-044</div>
          <h2 className="text-lg font-bold font-serif text-[#1e1712]">Scope of Negotiations</h2>
        </div>

        <div className="space-y-4 font-serif text-xs leading-relaxed">
          <p>
            The Authorised Representative may hold discussions regarding use of the Property, receive expressions of interest, and exchange draft commercial schedules. The Representative shall keep the Owner informed of material commitments proposed by any counterparty.
          </p>
          <p>
            Negotiations and unsigned heads of terms remain provisional. Where an action requires a new signature or specific owner approval under Leaf 6, no letter of intent or office notation may be read as substituting for that approval.
          </p>
          <p>
            Any interpretation dispute shall be referred to the signed instrument as entered in the notarial day book.
          </p>
        </div>

        <div className="pt-6 text-right font-mono text-[11px] text-[#7a6552]">
          Leaf 5 of 9 — PC-21-044
        </div>
      </div>
    ),
  },
  {
    id: 'C-6',
    documentId: 'E06-C',
    displayLabel: 'Leaf 6 of 9 | Operative authority',
    leafNumber: 6,
    totalLeavesInObject: 9,
    sourceType: 'instrument',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b border-[#cfc1a5] pb-2 flex justify-between items-baseline">
          <div>
            <div className="font-mono text-xs tracking-wider text-[#7a6552] uppercase">Instrument Series PC-21-044</div>
            <h2 className="text-lg font-bold font-serif text-[#1e1712]">Operative Consent and Reservations</h2>
          </div>
          <div className="font-mono text-xs text-[#7a6552]">PC-21-044 / 6</div>
        </div>

        <div className="space-y-4 font-serif text-xs leading-relaxed">
          <p>
            <strong>Clause 3 — Authority for leasing.</strong> The Owner consents to the Authorised Representative negotiating, settling and executing <strong>a lease of the Property for a term not exceeding eleven (11) years</strong>, on commercially reasonable terms, subject to customary registration requirements where applicable.
          </p>
          <p>
            <strong>Clause 4 — Ancillary acts.</strong> For the purposes of Clause 3, the Authorised Representative may correspond with prospective tenants, obtain due-diligence materials, settle occupation schedules, receive deposits into the designated owner account, and undertake procedural acts necessary to document a lease consistent with this instrument.
          </p>
          <p>
            <strong>Clause 5 — Reserved matters.</strong> <strong>Nothing in this instrument authorises sale, transfer of full title, assignment of ownership, or any other permanent alienation of the Property.</strong> Any such transaction requires a separate, expressly executed authority from the relevant owners. The power to negotiate or file a document shall not be read as a power to convey title.
          </p>
        </div>

        <div className="pt-4 border-t border-dashed border-[#cfc1a5] flex justify-between items-center text-[11px] font-sans text-[#7a6552]">
          <span className="italic">Marginal filing tick: PC-21-044 / 6</span>
          <span className="font-mono">Leaf 6 of 9</span>
        </div>
      </div>
    ),
  },
  {
    id: 'C-7',
    documentId: 'E06-C',
    displayLabel: 'Leaf 7 of 9 | Accounts and reporting',
    leafNumber: 7,
    totalLeavesInObject: 9,
    sourceType: 'instrument',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b border-[#cfc1a5] pb-2">
          <div className="font-mono text-xs tracking-wider text-[#7a6552] uppercase">Instrument Series PC-21-044</div>
          <h2 className="text-lg font-bold font-serif text-[#1e1712]">Financial Procedure</h2>
        </div>

        <div className="space-y-4 font-serif text-xs leading-relaxed">
          <p>
            Amounts received or paid under an authorised transaction shall be recorded in the owner's account, with vouchers retained against the relevant file. Ordinary professional disbursements shall be distinguished from transaction-dependent remuneration.
          </p>
          <p>
            The Authorised Representative shall maintain an intelligible record of material negotiations, executed instruments and registered acknowledgments. Copies supplied for administration do not override the executed authority.
          </p>
          <p className="italic text-[#7a6552]">
            No provision on this leaf extends the authority on Leaf 6.
          </p>
        </div>

        <div className="pt-6 text-right font-mono text-[11px] text-[#7a6552]">
          Leaf 7 of 9 — PC-21-044
        </div>
      </div>
    ),
  },
  {
    id: 'C-8',
    documentId: 'E06-C',
    displayLabel: 'Leaf 8 of 9 | Property schedule',
    leafNumber: 8,
    totalLeavesInObject: 9,
    sourceType: 'instrument',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b border-[#cfc1a5] pb-2">
          <div className="font-mono text-xs tracking-wider text-[#7a6552] uppercase">Instrument Series PC-21-044</div>
          <h2 className="text-lg font-bold font-serif text-[#1e1712]">Schedule A — Property Description</h2>
        </div>

        <div className="space-y-4 font-serif text-xs leading-relaxed">
          <p>
            The premises commonly referred to as <strong className="font-semibold text-[#1e1712]">Ashwood Guesthouse</strong>, situated in the Mussoorie vicinity, Uttarakhand, including the guest accommodation block, staff rooms, records and service areas, internal access and ancillary landholding, subject to existing survey and title particulars in the office file.
          </p>
          <p>
            Descriptions of movable effects and staff allocations are maintained in separate inventory and occupancy records. This schedule identifies the subject of administrative authority; it is not a separate conveyance of property.
          </p>
        </div>

        <div className="pt-4 border-t border-dashed border-[#cfc1a5] flex justify-between items-center text-[11px] font-sans text-[#7a6552]">
          <span className="italic">Office cross-reference: Ashwood estate property book / 2021 series.</span>
          <span className="font-mono">Leaf 8 of 9</span>
        </div>
      </div>
    ),
  },
  {
    id: 'C-9',
    documentId: 'E06-C',
    displayLabel: 'Leaf 9 of 9 | Execution and acknowledgment',
    leafNumber: 9,
    totalLeavesInObject: 9,
    sourceType: 'instrument',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#2b241e] pb-2">
          <div className="font-mono text-xs tracking-wider text-[#7a6552] uppercase">Instrument Series PC-21-044</div>
          <h2 className="text-lg font-bold font-serif text-[#1e1712]">Execution</h2>
        </div>

        <p className="font-serif text-xs leading-relaxed">
          I, <strong className="font-semibold text-[#1e1712]">Leela Rao</strong>, affirm that I have read, or had read to me, the preceding provisions and that my consent is confined to the acts expressly described therein.
        </p>

        <div className="border border-[#cfc1a5] p-3.5 bg-[#ede4d3]/50 rounded font-sans text-xs space-y-2">
          <div className="flex justify-between items-center border-b border-[#cfc1a5] pb-2">
            <div>
              <span className="text-[#7a6552] block text-[10px] uppercase">Signature of consenting owner:</span>
              <span className="font-serif italic text-base font-bold text-[#1e1712]">Leela Rao</span>
            </div>
            <div className="text-right">
              <span className="text-[#7a6552] block text-[10px] uppercase">Date:</span>
              <span className="font-mono font-semibold text-[#1e1712]">04 November 2021</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div><span className="text-[#7a6552]">Witness:</span> <span className="italic">[signature recorded on file]</span></div>
            <div><span className="text-[#7a6552]">Leaves presented:</span> <span className="font-mono font-bold">9</span></div>
            <div><span className="text-[#7a6552]">Notarial day-book entry:</span> <span className="font-mono font-bold">NR-041121-26</span></div>
            <div><span className="text-[#7a6552]">Nature entered:</span> <span className="font-semibold">Consent for lease authority</span></div>
          </div>
        </div>

        <div className="pt-4 flex justify-between items-center font-mono text-[11px] text-[#7a6552]">
          <span>END OF INSTRUMENT</span>
          <span>PC-21-044 / 9 OF 9</span>
        </div>
      </div>
    ),
  },
];

// --- OBJECT C: Filed Papers / Receipt 611 (11 leaves: 9 bundle leaves + F3 & F4 receipts) ---
const OBJECT_C_LEAVES: Leaf[] = [
  {
    id: 'D-1',
    documentId: 'E06-D',
    displayLabel: 'Sheet 1 of 9 | Cover and parties (Filed Packet)',
    leafNumber: 1,
    totalLeavesInObject: 11,
    sourceType: 'filed-bundle',
    renderContent: () => (
      <div className="space-y-4 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="flex justify-between items-start border-b-2 border-[#2b241e] pb-3">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#7a6552]">Ashwood Guesthouse</div>
            <h1 className="text-xl font-bold font-serif text-[#1e1712] mt-1">Consent and Limited Authority Instrument</h1>
          </div>
          <div className="text-right space-y-1">
            <RubberStamp text="RECEIVED" subtext="23 NOV 2021" variant="received" />
            <div className="font-mono text-[10px] text-[#1e3b6f]">REG-231121-611</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-[#ede4d3]/50 p-3 rounded border border-[#cfc1a5] font-sans text-xs">
          <div><span className="text-[#7a6552]">Instrument series:</span> <span className="font-mono font-bold text-[#1e1712]">PC-21-044</span></div>
          <div><span className="text-[#7a6552]">Date of execution:</span> <span className="font-semibold text-[#1e1712]">04 November 2021</span></div>
          <div><span className="text-[#7a6552]">Execution place:</span> <span className="font-semibold text-[#1e1712]">Uttarakhand</span></div>
          <div><span className="text-[#7a6552]">Notarial day-book ref:</span> <span className="font-mono font-bold text-[#1e1712]">NR-041121-26</span></div>
        </div>

        <div className="space-y-4 font-serif text-xs leading-relaxed text-[#2d2824]">
          <p>
            This instrument records the consent of <strong className="font-semibold text-[#1e1712]">Leela Rao</strong>, co-owner of the property described in the schedule, in relation to the limited management and leasing matters set out below. <strong className="font-semibold text-[#1e1712]">Devendra Rao</strong> is the other co-owner named in the property records. The owners' names are recorded for identification of interests and should not be taken to enlarge the authority expressed in the operative clauses.
          </p>
          <p>
            This document consists of <strong className="font-semibold text-[#1e1712]">nine leaves</strong>, including the schedule and acknowledgment. Each leaf bears the same file series. The terms are to be read together.
          </p>
        </div>

        <div className="pt-4 flex justify-between items-center font-mono text-[11px] text-[#7a6552]">
          <span className="text-[#1e3b6f]">Registry Lodgement Copy</span>
          <span>Leaf 1 of 9 — PC-21-044</span>
        </div>
      </div>
    ),
  },
  {
    id: 'D-2',
    documentId: 'E06-D',
    displayLabel: 'Sheet 2 of 9 | Background (Filed Packet)',
    leafNumber: 2,
    totalLeavesInObject: 11,
    sourceType: 'filed-bundle',
    renderContent: OBJECT_B_LEAVES[1].renderContent,
  },
  {
    id: 'D-3',
    documentId: 'E06-D',
    displayLabel: 'Sheet 3 of 9 | Definitions (Filed Packet)',
    leafNumber: 3,
    totalLeavesInObject: 11,
    sourceType: 'filed-bundle',
    renderContent: OBJECT_B_LEAVES[2].renderContent,
  },
  {
    id: 'D-4',
    documentId: 'E06-D',
    displayLabel: 'Sheet 4 of 9 | Administrative permissions (Filed Packet)',
    leafNumber: 4,
    totalLeavesInObject: 11,
    sourceType: 'filed-bundle',
    renderContent: OBJECT_B_LEAVES[3].renderContent,
  },
  {
    id: 'D-5',
    documentId: 'E06-D',
    displayLabel: 'Sheet 5 of 9 | Preliminary negotiation (Filed Packet)',
    leafNumber: 5,
    totalLeavesInObject: 11,
    sourceType: 'filed-bundle',
    renderContent: OBJECT_B_LEAVES[4].renderContent,
  },
  {
    id: 'D-6',
    documentId: 'E06-D',
    displayLabel: 'Sheet 6 of 9 | Operative authority (Filed Packet)',
    leafNumber: 6,
    totalLeavesInObject: 11,
    sourceType: 'filed-bundle',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b border-[#cfc1a5] pb-2 flex justify-between items-baseline">
          <div>
            <div className="font-mono text-xs tracking-wider text-[#7a6552] uppercase">Instrument Series PC-21-044</div>
            <h2 className="text-lg font-bold font-serif text-[#1e1712]">Operative Consent and Reservations</h2>
          </div>
          <div className="font-mono text-xs text-[#7a6552]">PC-21-044 / 6</div>
        </div>

        <div className="space-y-4 font-serif text-xs leading-relaxed">
          <p>
            <strong>Clause 3 — Authority for transaction.</strong> The Owner consents to the Authorised Representative negotiating, settling and executing <strong>the transfer of the Property's full title to Northline Estates LLP</strong>, on terms consistent with the commercial heads of terms and subject to completion and registration requirements.
          </p>
          <p>
            <strong>Clause 4 — Ancillary acts.</strong> For the purposes of Clause 3, the Authorised Representative may correspond with prospective counterparties, obtain due-diligence materials, settle completion schedules, receive consideration into the designated owner account, and undertake procedural acts necessary to document and register a transfer consistent with this instrument.
          </p>
          <p>
            <strong>Clause 5 — Execution.</strong> The Authorised Representative may sign, deliver and present conveyancing instruments, completion acknowledgments and registry papers necessary to give effect to the transaction described in Clause 3. Procedural acts performed in the course of registration shall be entered in the property file.
          </p>
        </div>

        <div className="pt-4 border-t border-dashed border-[#cfc1a5] flex justify-between items-center text-[11px] font-sans text-[#7a6552]">
          <span className="italic">Marginal filing tick: PC-21-044 / 6</span>
          <span className="font-mono">Leaf 6 of 9</span>
        </div>
      </div>
    ),
  },
  {
    id: 'D-7',
    documentId: 'E06-D',
    displayLabel: 'Sheet 7 of 9 | Accounts and reporting (Filed Packet)',
    leafNumber: 7,
    totalLeavesInObject: 11,
    sourceType: 'filed-bundle',
    renderContent: OBJECT_B_LEAVES[6].renderContent,
  },
  {
    id: 'D-8',
    documentId: 'E06-D',
    displayLabel: 'Sheet 8 of 9 | Property schedule (Filed Packet)',
    leafNumber: 8,
    totalLeavesInObject: 11,
    sourceType: 'filed-bundle',
    renderContent: OBJECT_B_LEAVES[7].renderContent,
  },
  {
    id: 'D-9',
    documentId: 'E06-D',
    displayLabel: 'Sheet 9 of 9 | Execution and acknowledgment (Filed Packet)',
    leafNumber: 9,
    totalLeavesInObject: 11,
    sourceType: 'filed-bundle',
    renderContent: () => (
      <div className="space-y-5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#2b241e] pb-2">
          <div className="font-mono text-xs tracking-wider text-[#7a6552] uppercase">Instrument Series PC-21-044</div>
          <h2 className="text-lg font-bold font-serif text-[#1e1712]">Execution</h2>
        </div>

        <p className="font-serif text-xs leading-relaxed">
          I, <strong className="font-semibold text-[#1e1712]">Leela Rao</strong>, affirm that I have read, or had read to me, the preceding provisions and that my consent is confined to the acts expressly described therein.
        </p>

        <div className="border border-[#cfc1a5] p-3.5 bg-[#ede4d3]/50 rounded font-sans text-xs space-y-2">
          <div className="flex justify-between items-center border-b border-[#cfc1a5] pb-2">
            <div>
              <span className="text-[#7a6552] block text-[10px] uppercase">Signature of consenting owner:</span>
              <span className="font-serif italic text-base font-bold text-[#1e1712]">Leela Rao</span>
            </div>
            <div className="text-right">
              <span className="text-[#7a6552] block text-[10px] uppercase">Date:</span>
              <span className="font-mono font-semibold text-[#1e1712]">04 November 2021</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div><span className="text-[#7a6552]">Witness:</span> <span className="italic">[signature recorded on file]</span></div>
            <div><span className="text-[#7a6552]">Leaves presented:</span> <span className="font-mono font-bold">9</span></div>
            <div className="col-span-2 flex items-center gap-2 pt-1">
              <span className="text-[#7a6552]">Notarial reference:</span>
              <span className="font-mono font-bold text-[#1e1712]">NR-041121-26</span>
              {/* Intentional small administrative stamp / overlay note per spec §6 */}
              <span className="inline-block border border-[#1e3b6f] text-[#1e3b6f] px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#e8eef8]">
                NR-041121-62
              </span>
            </div>
            <div className="col-span-2"><span className="text-[#7a6552]">Nature entered:</span> <span className="font-semibold">Consent for lease authority</span></div>
          </div>
        </div>

        <div className="pt-4 flex justify-between items-center font-mono text-[11px] text-[#7a6552]">
          <span>END OF INSTRUMENT</span>
          <span>PC-21-044 / 9 OF 9</span>
        </div>
      </div>
    ),
  },
  {
    id: 'F-3',
    documentId: 'E06-F',
    displayLabel: 'Sheet F-3 | Registry lodgement receipt',
    leafNumber: 10,
    totalLeavesInObject: 11,
    sourceType: 'receipt',
    renderContent: () => (
      <div className="space-y-4 text-[#2d2824] font-serif text-sm leading-relaxed p-2 border-2 border-dashed border-[#b8a68b] bg-[#fbf8f2] rounded">
        <div className="border-b border-[#3b322a] pb-2 flex justify-between items-start">
          <div>
            <div className="font-mono text-xs uppercase text-[#6a5a4d]">Property Registry — Acknowledgment of Papers Received</div>
            <h2 className="text-lg font-bold font-serif text-[#1f1c19] mt-0.5">Lodgement Receipt: REG-231121-611</h2>
          </div>
          <RubberStamp text="RECEIVED" subtext="REG-231121-611" variant="lodged" />
        </div>

        <div className="bg-[#ede4d3]/70 p-3 rounded font-sans text-xs space-y-1.5 border border-[#cfc1a5]">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Receipt:</span>
            <span className="col-span-2 font-mono font-bold text-[#1f1c19]">REG-231121-611</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Date:</span>
            <span className="col-span-2 font-mono font-semibold text-[#1f1c19]">23 November 2021</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">File referenced:</span>
            <span className="col-span-2 font-mono font-bold text-[#1f1c19]">PC-21-044</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Description:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">Executed consent instrument, nine leaves</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Presented through counsel:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">M. Khanna</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Transaction file:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">Ashwood Guesthouse / Northline Estates LLP</span>
          </div>
        </div>

        <p className="text-xs font-serif leading-relaxed">
          Papers received for processing in the usual course. This receipt records presentation and count of papers. It does not certify that all signatures, clauses or powers recited in the filed material have been independently compared with an earlier instrument retained elsewhere.
        </p>

        <div className="pt-2 border-t border-dashed border-[#cfc1a5] flex justify-between items-center text-[11px] font-sans text-[#6a5a4d]">
          <span>Counter stamp: RECEIVED / REG-231121-611</span>
          <span>Desk initials: <em>[registry initials]</em></span>
        </div>
      </div>
    ),
  },
  {
    id: 'F-4',
    documentId: 'E06-F',
    displayLabel: 'Sheet F-4 | Registration acknowledgment',
    leafNumber: 11,
    totalLeavesInObject: 11,
    sourceType: 'receipt',
    renderContent: () => (
      <div className="space-y-4 text-[#2d2824] font-serif text-sm leading-relaxed p-2 border-2 border-dashed border-[#b8a68b] bg-[#fbf8f2] rounded">
        <div className="border-b border-[#3b322a] pb-2 flex justify-between items-start">
          <div>
            <div className="font-mono text-xs uppercase text-[#6a5a4d]">Property Registry — Transaction Status Extract</div>
            <h2 className="text-lg font-bold font-serif text-[#1f1c19] mt-0.5">Registration Status: REG-291121-702</h2>
          </div>
          <RubberStamp text="REGISTERED" subtext="29 NOV 2021" variant="lodged" />
        </div>

        <div className="bg-[#ede4d3]/70 p-3 rounded font-sans text-xs space-y-1.5 border border-[#cfc1a5]">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Receipt:</span>
            <span className="col-span-2 font-mono font-bold text-[#1f1c19]">REG-291121-702</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Registration date:</span>
            <span className="col-span-2 font-mono font-semibold text-[#1f1c19]">29 November 2021</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Counterparty:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">Northline Estates LLP</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Subject:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">Ashwood Guesthouse transfer</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Supporting consent file:</span>
            <span className="col-span-2 font-mono font-bold text-[#1f1c19]">PC-21-044</span>
          </div>
        </div>

        <p className="text-xs font-serif leading-relaxed">
          Registry entry made against the submitted instrument package and transaction papers. The administrative record refers to filing number <code className="font-mono font-bold text-[#1f1c19]">REG-231121-611</code> for the earlier lodgement.
        </p>
        <p className="text-xs font-serif leading-relaxed text-[#6a5a4d] italic">
          This extract reproduces transaction status; consult the lodged papers for the exact text of authority relied upon.
        </p>
      </div>
    ),
  },
];

// --- OBJECT D: Notarial Day Book (2 leaves) ---
const OBJECT_D_LEAVES: Leaf[] = [
  {
    id: 'E-1',
    documentId: 'E06-E',
    displayLabel: 'Ledger leaf E-1 | Daily register',
    leafNumber: 1,
    totalLeavesInObject: 2,
    sourceType: 'ledger',
    renderContent: () => (
      <div className="space-y-3.5 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-2 space-y-0.5">
          <div className="font-mono text-xs tracking-wider text-[#6a5a4d] uppercase">Notarial Day Book — November 2021</div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1f1c19]">Register date: Thursday, 04 November 2021</h2>
          <div className="font-mono text-[11px] sm:text-xs text-[#6a5a4d]">Archive location: Office register, daily entries section.</div>
        </div>

        <div className="w-full">
          <table className="w-full text-left font-sans text-xs border border-[#cfc1a5]">
            <thead className="bg-[#dfd4bc] font-semibold text-[#1f1c19] border-b border-[#cfc1a5]">
              <tr>
                <th className="py-1.5 px-2 border-r border-[#cfc1a5] whitespace-nowrap">Day-book no.</th>
                <th className="py-1.5 px-2 border-r border-[#cfc1a5]">Presenter / party</th>
                <th className="py-1.5 px-2 border-r border-[#cfc1a5]">Nature of paper</th>
                <th className="py-1.5 px-2 text-right border-r border-[#cfc1a5] whitespace-nowrap">Leaves</th>
                <th className="py-1.5 px-2 whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cfc1a5]">
              <tr className="hover:bg-[#f2eadc]">
                <td className="py-1.5 px-2 font-mono border-r border-[#cfc1a5] whitespace-nowrap">NR-041121-23</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">A. Joshi</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">Declaration relating to service address</td>
                <td className="py-1.5 px-2 font-mono text-right border-r border-[#cfc1a5]">1</td>
                <td className="py-1.5 px-2 font-mono whitespace-nowrap">04 Nov 2021</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="py-1.5 px-2 font-mono border-r border-[#cfc1a5] whitespace-nowrap">NR-041121-24</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">R. Vohra</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">Authority for collection of records</td>
                <td className="py-1.5 px-2 font-mono text-right border-r border-[#cfc1a5]">2</td>
                <td className="py-1.5 px-2 font-mono whitespace-nowrap">04 Nov 2021</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="py-1.5 px-2 font-mono border-r border-[#cfc1a5] whitespace-nowrap">NR-041121-25</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">D. Rao</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">Appointment authority</td>
                <td className="py-1.5 px-2 font-mono text-right border-r border-[#cfc1a5]">2</td>
                <td className="py-1.5 px-2 font-mono whitespace-nowrap">04 Nov 2021</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="py-1.5 px-2 font-mono border-r border-[#cfc1a5] whitespace-nowrap">NR-041121-26</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">L. Rao</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">Consent for lease authority</td>
                <td className="py-1.5 px-2 font-mono text-right border-r border-[#cfc1a5]">9</td>
                <td className="py-1.5 px-2 font-mono whitespace-nowrap">04 Nov 2021</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="py-1.5 px-2 font-mono border-r border-[#cfc1a5] whitespace-nowrap">NR-041121-27</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">Commercial applicant</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">Commercial affirmation</td>
                <td className="py-1.5 px-2 font-mono text-right border-r border-[#cfc1a5]">3</td>
                <td className="py-1.5 px-2 font-mono whitespace-nowrap">04 Nov 2021</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="py-1.5 px-2 font-mono border-r border-[#cfc1a5] whitespace-nowrap">NR-041121-28</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">B. Mehta</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">Address and title declaration</td>
                <td className="py-1.5 px-2 font-mono text-right border-r border-[#cfc1a5]">2</td>
                <td className="py-1.5 px-2 font-mono whitespace-nowrap">04 Nov 2021</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="py-1.5 px-2 font-mono border-r border-[#cfc1a5] whitespace-nowrap">NR-041121-29</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">K. Rawat</td>
                <td className="py-1.5 px-2 border-r border-[#cfc1a5]">General affidavit</td>
                <td className="py-1.5 px-2 font-mono text-right border-r border-[#cfc1a5]">1</td>
                <td className="py-1.5 px-2 font-mono whitespace-nowrap">04 Nov 2021</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-2 border-t border-dashed border-[#cfc1a5] text-[11px] font-sans italic text-[#6a5a4d]">
          Page-end notation: Entries transcribed by day and serial order; corrections, if any, initialled in the margin.
        </div>
      </div>
    ),
  },
  {
    id: 'E-2',
    documentId: 'E06-E',
    displayLabel: 'Ledger leaf E-2 | Daily closing abstract',
    leafNumber: 2,
    totalLeavesInObject: 2,
    sourceType: 'ledger',
    renderContent: () => (
      <div className="space-y-4 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-2 space-y-0.5">
          <div className="font-mono text-xs tracking-wider text-[#6a5a4d] uppercase">Notarial Day Book — Register Abstract</div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1f1c19]">04 November 2021 — Register Closing Abstract</h2>
        </div>

        <div className="space-y-3 font-serif text-xs leading-relaxed">
          <p>
            Serials for the day are transcribed in the bound day book. Supporting counterfoils are held by the relevant office series. Subsequent entries continue on the next dated leaves.
          </p>
          <div className="bg-[#ede4d3]/70 p-3 rounded border border-[#cfc1a5] font-sans space-y-1.5">
            <p>
              For a query concerning an instrument, the ordinary retrieval procedure is to confirm <strong className="text-[#1f1c19]">date, presenter, nature of instrument and leaf count</strong> together. Names alone are insufficient where multiple papers are presented for the same property matter.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-dashed border-[#cfc1a5] flex justify-between items-center text-[11px] font-sans text-[#6a5a4d]">
          <div className="flex items-center gap-2">
            <span>Closing initials:</span>
            <span className="inline-block w-28 border-b border-[#3b322a] h-3" />
          </div>
          <span className="font-mono">Page 2 of 2 — Day Book Abstract</span>
        </div>
      </div>
    ),
  },
];

// --- OBJECT E: Movement & Dispatch docket (3 leaves: F-1, F-2, F-5) ---
const OBJECT_E_LEAVES: Leaf[] = [
  {
    id: 'F-1',
    documentId: 'E06-F',
    displayLabel: 'Sheet F-1 | Property file movement sheet',
    leafNumber: 1,
    totalLeavesInObject: 3,
    sourceType: 'docket',
    renderContent: () => (
      <div className="space-y-4 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-2 flex justify-between items-baseline">
          <div>
            <div className="font-mono text-xs tracking-wider text-[#6a5a4d] uppercase">Ashwood Guesthouse — Records Control</div>
            <h2 className="text-xl font-bold font-serif text-[#1f1c19] mt-0.5">Custody and Movement Log</h2>
          </div>
          <div className="font-mono text-xs text-right text-[#6a5a4d]">
            <div>Series: <span className="font-bold text-[#1f1c19]">PC-21-044</span></div>
            <div>Jacket count: <span className="font-bold text-[#1f1c19]">9 leaves</span></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border border-[#cfc1a5]">
            <thead className="bg-[#dfd4bc] font-semibold text-[#1f1c19] border-b border-[#cfc1a5]">
              <tr>
                <th className="p-2 border-r border-[#cfc1a5]">Date / time</th>
                <th className="p-2 border-r border-[#cfc1a5]">Movement</th>
                <th className="p-2 border-r border-[#cfc1a5]">From</th>
                <th className="p-2 border-r border-[#cfc1a5]">To</th>
                <th className="p-2 text-right border-r border-[#cfc1a5]">Count</th>
                <th className="p-2">Clerk's note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cfc1a5]">
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono border-r border-[#cfc1a5]">04 Nov 2021</td>
                <td className="p-2 border-r border-[#cfc1a5]">Received for office filing</td>
                <td className="p-2 border-r border-[#cfc1a5]">Execution desk</td>
                <td className="p-2 border-r border-[#cfc1a5]">Property records</td>
                <td className="p-2 font-mono text-right border-r border-[#cfc1a5]">9</td>
                <td className="p-2">Indexed to PC-21-044</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono border-r border-[#cfc1a5]">05 Nov 2021</td>
                <td className="p-2 border-r border-[#cfc1a5]">Desk scan completed</td>
                <td className="p-2 border-r border-[#cfc1a5]">Property records</td>
                <td className="p-2 border-r border-[#cfc1a5]">Digital intake</td>
                <td className="p-2 font-mono text-right border-r border-[#cfc1a5]">9</td>
                <td className="p-2">Image set registered; paper jacket retained</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono font-bold border-r border-[#cfc1a5]">08 Nov 2021, 10:20</td>
                <td className="p-2 font-bold border-r border-[#cfc1a5]">Signed out</td>
                <td className="p-2 font-bold border-r border-[#cfc1a5]">Property records</td>
                <td className="p-2 font-bold border-r border-[#cfc1a5]">Khanna Legal office</td>
                <td className="p-2 font-mono font-bold text-right border-r border-[#cfc1a5]">9</td>
                <td className="p-2">Released on counsel requisition</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono font-bold border-r border-[#cfc1a5]">10 Nov 2021, 17:15</td>
                <td className="p-2 font-bold border-r border-[#cfc1a5]">Returned by courier</td>
                <td className="p-2 font-bold border-r border-[#cfc1a5]">Khanna Legal office</td>
                <td className="p-2 font-bold border-r border-[#cfc1a5]">Property records</td>
                <td className="p-2 font-mono font-bold text-right border-r border-[#cfc1a5]">9</td>
                <td className="p-2">Outer count verified; no leaf-wise comparison recorded</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 font-mono border-r border-[#cfc1a5]">11 Nov 2021</td>
                <td className="p-2 border-r border-[#cfc1a5]">Re-shelved for file reference</td>
                <td className="p-2 border-r border-[#cfc1a5]">Property records</td>
                <td className="p-2 border-r border-[#cfc1a5]">Property archive</td>
                <td className="p-2 font-mono text-right border-r border-[#cfc1a5]">9</td>
                <td className="p-2">Jacket restored to property series</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-2 border-t border-dashed border-[#cfc1a5] text-[11px] font-sans italic text-[#6a5a4d]">
          Control legend: “Count recorded” is number of leaves observed/declared for dispatch; it does not confirm that text or individual sheets were compared with the previously scanned set.
        </div>
      </div>
    ),
  },
  {
    id: 'F-2',
    documentId: 'E06-F',
    displayLabel: 'Sheet F-2 | Dispatch acknowledgment',
    leafNumber: 2,
    totalLeavesInObject: 3,
    sourceType: 'docket',
    renderContent: () => (
      <div className="space-y-4 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-2 flex justify-between items-start">
          <div>
            <div className="font-mono text-xs uppercase text-[#6a5a4d]">Property Office — Incoming Courier Note</div>
            <h2 className="text-xl font-bold font-serif text-[#1f1c19] mt-0.5">Courier Delivery Note</h2>
          </div>
          <div className="font-mono text-xs text-right text-[#6a5a4d]">
            <div>Date: <span className="font-bold text-[#1f1c19]">10 November 2021</span></div>
            <div>Time: <span className="font-bold text-[#1f1c19]">17:15</span></div>
          </div>
        </div>

        <div className="bg-[#ede4d3]/70 p-3 rounded font-sans text-xs space-y-1.5 border border-[#cfc1a5]">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Received from:</span>
            <span className="col-span-2 font-bold text-[#1f1c19]">Khanna Legal</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Matter:</span>
            <span className="col-span-2 font-mono font-bold text-[#1f1c19]">AK/PROP/21-44</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Packet:</span>
            <span className="col-span-2 font-mono font-bold text-[#1f1c19]">PC-21-044</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Declared enclosure:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">one nine-leaf consent instrument</span>
          </div>
        </div>

        <p className="text-xs font-serif leading-relaxed">
          Outer fold and file-jacket label checked. Receipt logged to property records. No exception noted to packet count. Comparison against individual page scans <strong>not undertaken at receiving counter</strong>.
        </p>

        <div className="pt-3 border-t border-dashed border-[#cfc1a5] flex justify-between items-center text-[11px] font-sans text-[#6a5a4d]">
          <span>Received by: <em>property records desk [initials]</em></span>
          <span>Courier delivery mark: <em>office dispatch [initials]</em></span>
        </div>
      </div>
    ),
  },
  {
    id: 'F-5',
    documentId: 'E06-F',
    displayLabel: 'Sheet F-5 | Covering letter enclosed with registry packet',
    leafNumber: 3,
    totalLeavesInObject: 3,
    sourceType: 'docket',
    renderContent: () => (
      <div className="space-y-4 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-2 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold font-serif text-[#1f1c19]">KHANNA LEGAL</h1>
            <div className="font-sans text-xs text-[#6a5a4d]">Owner-side property correspondence</div>
          </div>
          <div className="font-mono text-xs text-right text-[#6a5a4d]">
            <div>Ref: <span className="font-bold text-[#1f1c19]">AK/PROP/21-44</span></div>
            <div>Date: <span className="font-bold text-[#1f1c19]">23 November 2021</span></div>
          </div>
        </div>

        <div className="font-sans text-xs space-y-1 text-[#2d2824]">
          <div>To: Registry Receiving Office</div>
          <div className="font-bold pt-1">Re: Ashwood Guesthouse / Northline Estates LLP</div>
        </div>

        <div className="space-y-3 font-serif text-xs leading-relaxed text-[#2d2824]">
          <p>
            Please receive the enclosed transaction papers for the proposed registration, including the owners' consent instrument under file reference <strong className="font-mono font-bold text-[#1f1c19]">PC-21-044</strong>, nine leaves, with the relevant schedules and supporting commercial particulars. We request acknowledgment under the normal receipt procedure and notification of any registry requisitions requiring counsel's response.
          </p>
          <p>
            The filing index enclosed with this packet records the notarial reference <strong className="font-mono font-bold text-[#1f1c19]">NR-041121-62</strong> against the consent instrument. Please use the attached packet index for counter retrieval and contact our office if a legibility or enclosure query arises.
          </p>
        </div>

        <div className="pt-4 flex justify-between items-end">
          <div className="text-[11px] font-sans text-[#6a5a4d] italic max-w-xs">
            Enclosures: consent packet (9 leaves); transaction schedule; counsel identification and filing index.
          </div>
          <div className="text-right font-serif text-xs">
            <div>Yours faithfully,</div>
            <div className="font-bold text-base mt-2">M. Khanna</div>
            <div className="text-[11px] font-sans text-[#6a5a4d]">For Khanna Legal</div>
          </div>
        </div>
      </div>
    ),
  },
];

// --- OBJECT F: Accounts / AK-44 sleeve (3 leaves) ---
const OBJECT_F_LEAVES: Leaf[] = [
  {
    id: 'G-1',
    documentId: 'E06-G',
    displayLabel: 'Sheet G-1 | Engagement extract',
    leafNumber: 1,
    totalLeavesInObject: 3,
    sourceType: 'sleeve',
    renderContent: () => (
      <div className="space-y-4 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-2 flex justify-between items-start">
          <div>
            <div className="font-mono text-xs uppercase text-[#6a5a4d]">Khanna Legal — Client Engagement Extract</div>
            <h2 className="text-xl font-bold font-serif text-[#1f1c19] mt-0.5">Professional Terms: AK/PROP/21-44</h2>
          </div>
          <div className="font-mono text-xs text-[#6a5a4d]">File: AK/PROP/21-44</div>
        </div>

        <div className="bg-[#ede4d3]/70 p-3 rounded font-sans text-xs space-y-1.5 border border-[#cfc1a5]">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Client matter:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">Ashwood Guesthouse property transaction</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Working counterparty:</span>
            <span className="col-span-2 font-semibold text-[#1f1c19]">Northline Estates LLP</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-[#6a5a4d]">Commercial price:</span>
            <span className="col-span-2 font-mono font-bold text-[#1f1c19]">₹3,40,00,000</span>
          </div>
        </div>

        <div className="space-y-3 font-serif text-xs leading-relaxed">
          <p>
            <strong className="text-[#1f1c19]">Fee arrangement.</strong> Ordinary professional charges and pass-through disbursements are separately accounted for. A <strong className="font-bold text-[#1f1c19]">success fee of ₹6,00,000</strong> (rupees six lakh) becomes payable <strong className="font-bold text-[#1f1c19]">only upon registration and completion</strong> of the contemplated sale transaction. If the transaction is not registered and completed, the success fee does not accrue.
          </p>
          <p className="text-[#6a5a4d] italic">
            Any papers submitted to the registry must be supported by the necessary owner authority; this engagement extract allocates professional remuneration and does not itself constitute authority to dispose of property.
          </p>
        </div>

        <div className="pt-2 border-t border-dashed border-[#cfc1a5] text-[11px] font-sans text-[#6a5a4d]">
          Record location: Accounts file / property matters / AK/PROP/21-44.
        </div>
      </div>
    ),
  },
  {
    id: 'G-2',
    documentId: 'E06-G',
    displayLabel: 'Sheet G-2 | Invoice',
    leafNumber: 2,
    totalLeavesInObject: 3,
    sourceType: 'sleeve',
    renderContent: () => (
      <div className="space-y-4 text-[#2d2824] font-serif text-sm leading-relaxed p-1">
        <div className="border-b-2 border-[#3b322a] pb-2 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold font-serif text-[#1f1c19]">KHANNA LEGAL</h1>
            <div className="font-mono text-xs text-[#6a5a4d]">Fee Invoice: FEE-211203-06</div>
          </div>
          <div className="text-right">
            <RubberStamp text="RECEIVED" subtext="03 DEC 2021" variant="received" />
          </div>
        </div>

        <div className="font-sans text-xs grid grid-cols-2 gap-2 text-[#2d2824] bg-[#ede4d3]/60 p-2.5 rounded border border-[#cfc1a5]">
          <div><span className="text-[#6a5a4d]">Date:</span> <span className="font-mono font-bold text-[#1f1c19]">03 December 2021</span></div>
          <div><span className="text-[#6a5a4d]">Client matter:</span> <span className="font-mono font-bold text-[#1f1c19]">AK/PROP/21-44</span></div>
          <div className="col-span-2">
            <span className="text-[#6a5a4d]">Description:</span> Completion-linked professional success fee — Ashwood Guesthouse transaction
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border border-[#cfc1a5]">
            <thead className="bg-[#dfd4bc] font-semibold text-[#1f1c19] border-b border-[#cfc1a5]">
              <tr>
                <th className="p-2 border-r border-[#cfc1a5]">Item</th>
                <th className="p-2 border-r border-[#cfc1a5]">Basis</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#cfc1a5]">
                <td className="p-2 border-r border-[#cfc1a5] font-medium">Completion-related success fee</td>
                <td className="p-2 border-r border-[#cfc1a5]">Transaction registered 29 Nov; completed 30 Nov 2021</td>
                <td className="p-2 font-mono font-bold text-right">₹6,00,000</td>
              </tr>
              <tr className="bg-[#ede4d3]/80 font-bold">
                <td colSpan={2} className="p-2 border-r border-[#cfc1a5] text-right">Amount due:</td>
                <td className="p-2 font-mono text-right text-base text-[#1f1c19]">₹6,00,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="font-sans text-[11px] space-y-1 text-[#6a5a4d] border-t border-dashed border-[#cfc1a5] pt-2">
          <div>Linked registration: <span className="font-mono font-bold text-[#1f1c19]">REG-291121-702</span></div>
          <div>Payment status: <span className="font-bold text-[#1f1c19]">Received — 03 December 2021</span></div>
          <div>Accounts routing: Property matters / closing fees</div>
        </div>
      </div>
    ),
  },
  {
    id: 'G-3',
    documentId: 'E06-G',
    displayLabel: 'Sheet G-3 | Completion book extract',
    leafNumber: 3,
    totalLeavesInObject: 3,
    sourceType: 'sleeve',
    renderContent: () => (
      <div className="space-y-4 text-[#2d2824] font-serif text-sm leading-relaxed">
        <div className="border-b-2 border-[#3b322a] pb-2 flex justify-between items-baseline">
          <div>
            <div className="font-mono text-xs uppercase text-[#6a5a4d]">Property Matters — Closing Record</div>
            <h2 className="text-xl font-bold font-serif text-[#1f1c19] mt-0.5">Closing Register Extract</h2>
          </div>
          <div className="font-mono text-xs text-[#6a5a4d]">File: AK/PROP/21-44</div>
        </div>

        <div className="font-sans text-xs text-[#6a5a4d]">
          Transaction: <span className="font-semibold text-[#1f1c19]">Ashwood Guesthouse / Northline Estates LLP</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border border-[#cfc1a5]">
            <thead className="bg-[#dfd4bc] font-semibold text-[#1f1c19] border-b border-[#cfc1a5]">
              <tr>
                <th className="p-2 border-r border-[#cfc1a5]">Record</th>
                <th className="p-2 border-r border-[#cfc1a5]">Posted date</th>
                <th className="p-2">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cfc1a5]">
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 border-r border-[#cfc1a5]">Instrument packet lodged</td>
                <td className="p-2 font-mono border-r border-[#cfc1a5]">23 Nov 2021</td>
                <td className="p-2 font-mono font-bold">REG-231121-611</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 border-r border-[#cfc1a5]">Transfer entered</td>
                <td className="p-2 font-mono border-r border-[#cfc1a5]">29 Nov 2021</td>
                <td className="p-2 font-mono font-bold">REG-291121-702</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 border-r border-[#cfc1a5]">Settlement recorded complete</td>
                <td className="p-2 font-mono border-r border-[#cfc1a5]">30 Nov 2021</td>
                <td className="p-2 font-sans italic">Closing book entry</td>
              </tr>
              <tr className="hover:bg-[#f2eadc]">
                <td className="p-2 border-r border-[#cfc1a5]">Professional success fee posted</td>
                <td className="p-2 font-mono border-r border-[#cfc1a5]">03 Dec 2021</td>
                <td className="p-2 font-mono font-bold">FEE-211203-06</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#ede4d3]/70 p-3 rounded border border-[#cfc1a5] text-xs font-sans space-y-2">
          <p>
            <strong className="text-[#1f1c19]">Routine reconciliation note:</strong> Where completion-related fees are conditional, the invoice shall cross-reference the registration and closing entries. Custody of a file or submission to the counter does not, by itself, satisfy a completion condition.
          </p>
        </div>
      </div>
    ),
  },
];

/* =========================================================================
   SIX PHYSICAL OBJECTS DATA STRUCTURE
   ========================================================================= */

export const EVIDENCE_OBJECTS: DeskObject[] = [
  {
    id: 'obj-a',
    letter: 'A',
    visibleLabel: 'Transfer Reference File',
    type: 'folder',
    internalContentId: 'E06-A + E06-B',
    leaves: OBJECT_A_LEAVES,
    hoverHint: 'Unfasten',
    rotation: -1.8,
    deskPosition: { row: 0, col: 0 },
  },
  {
    id: 'obj-b',
    letter: 'B',
    visibleLabel: 'Consent Instrument / File Copy',
    type: 'book',
    internalContentId: 'E06-C',
    leaves: OBJECT_B_LEAVES,
    hoverHint: 'Open',
    rotation: 1.2,
    deskPosition: { row: 0, col: 1 },
  },
  {
    id: 'obj-c',
    letter: 'C',
    visibleLabel: 'Filed Papers / Receipt 611',
    type: 'bundle',
    internalContentId: 'E06-D + E06-F3/F4',
    leaves: OBJECT_C_LEAVES,
    hoverHint: 'Examine papers',
    rotation: -0.8,
    deskPosition: { row: 0, col: 2 },
  },
  {
    id: 'obj-d',
    letter: 'D',
    visibleLabel: 'Notarial Day Book',
    type: 'ledger',
    internalContentId: 'E06-E',
    leaves: OBJECT_D_LEAVES,
    hoverHint: 'Open ledger',
    rotation: 0.9,
    deskPosition: { row: 1, col: 0 },
  },
  {
    id: 'obj-e',
    letter: 'E',
    visibleLabel: 'Movement & Dispatch',
    type: 'docket',
    internalContentId: 'E06-F1/F2/F5',
    leaves: OBJECT_E_LEAVES,
    hoverHint: 'Untie',
    rotation: -2.2,
    deskPosition: { row: 1, col: 1 },
  },
  {
    id: 'obj-f',
    letter: 'F',
    visibleLabel: 'Accounts / AK-44',
    type: 'sleeve',
    internalContentId: 'E06-G1/G2/G3',
    leaves: OBJECT_F_LEAVES,
    hoverHint: 'Slip out',
    rotation: 1.6,
    deskPosition: { row: 1, col: 2 },
  },
];

/* Single access gateway per §1: loadEvidence() */
export function loadEvidence(): DeskObject[] {
  return EVIDENCE_OBJECTS;
}
