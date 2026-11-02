import React, { useState, useEffect } from 'react';
import { bureauAudio } from '../utils/audio.js';
import BureauContentRenderer from '../utils/bureauTextFormatter.jsx';
import { 
  FileText, Download, Printer, Copy, Check, 
  ShieldAlert, Archive, RefreshCw, CheckCircle2, Award, ChevronRight 
} from 'lucide-react';

export default function ReportsView({ 
  cases = [], 
  initialCaseRef = null,
  onNavigateToArchives,
  onReAnalyseCase,
  onRefreshCases
}) {
  const [selectedCaseRef, setSelectedCaseRef] = useState(initialCaseRef || (cases[0]?.case_ref || ''));
  const [reports, setReports] = useState([]);
  const [activeReport, setActiveReport] = useState(null);
  const [copied, setCopied] = useState(false);
  const [actionStatus, setActionStatus] = useState(null);
  const [isArchiving, setIsArchiving] = useState(false);

  useEffect(() => {
    if (initialCaseRef) {
      setSelectedCaseRef(initialCaseRef);
    } else if (!selectedCaseRef && cases.length > 0) {
      setSelectedCaseRef(cases[0].case_ref);
    }
  }, [initialCaseRef, cases]);

  // Fetch reports when selectedCaseRef changes
  useEffect(() => {
    if (!selectedCaseRef) return;
    fetchReports(selectedCaseRef);
  }, [selectedCaseRef]);

  const fetchReports = async (ref) => {
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(ref)}/reports`);
      const data = await res.json();
      if (data.success && data.reports.length > 0) {
        setReports(data.reports);
        setActiveReport(data.reports[0]);
      } else {
        setReports([]);
        setActiveReport(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Download PDF Only using browser print-to-PDF formatting (WYSIWYG on-screen match)
  const handleDownloadPdf = () => {
    if (!activeReport) return;
    bureauAudio.typewriterClick();
    const originalTitle = document.title;
    document.title = `ARGUS_and_Co_Report_${selectedCaseRef}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const handleCopy = () => {
    if (!activeReport) return;
    bureauAudio.typewriterClick();
    navigator.clipboard.writeText(activeReport.full_report_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Option 1: End Case & Archive
  const handleEndAndArchiveCase = async () => {
    if (!selectedCaseRef) return;
    if (!confirm(`Are you sure you want to officially conclude and archive Case ${selectedCaseRef}? It will be sealed in the Bureau Archives.`)) {
      return;
    }

    setIsArchiving(true);
    bureauAudio.conclaveChime();

    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(selectedCaseRef)}/archive`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setActionStatus(`Case ${selectedCaseRef} sealed and moved to permanent archives.`);
        if (typeof onRefreshCases === 'function') onRefreshCases();
        setTimeout(() => {
          if (typeof onNavigateToArchives === 'function') onNavigateToArchives();
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to archive case:', err);
    } finally {
      setIsArchiving(false);
    }
  };

  // Option 2: Re-Analyse Case with Alternative Approach
  const handleReAnalyse = async () => {
    if (!selectedCaseRef) return;
    if (!confirm(`Re-analyse Case ${selectedCaseRef} using an alternative investigative vector? The 5 officers will challenge baseline assumptions to uncover subtle contradictions.`)) {
      return;
    }

    bureauAudio.conclaveChime();
    try {
      // Trigger conclave with isReAnalysis: true
      await fetch(`/api/cases/${encodeURIComponent(selectedCaseRef)}/conclave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isReAnalysis: true })
      });
      if (typeof onReAnalyseCase === 'function') {
        onReAnalyseCase(selectedCaseRef);
      }
    } catch (err) {
      console.error('Failed to trigger re-analysis:', err);
    }
  };

  const activeCaseObj = cases.find(c => c.case_ref === selectedCaseRef);

  // Parse structured dossier sections to prevent monolithic text page-cutting
  const sections = activeReport ? (() => {
    if (activeReport.forensic_findings && activeReport.conclusions) {
      return {
        summary: activeReport.executive_summary || 'Executive intake record and initial dossier notes.',
        lutkin: activeReport.forensic_findings,
        vanguard: activeReport.intel_summary || '',
        cortex: activeReport.anomaly_detection || '',
        apex: activeReport.defense_critique || '',
        argus: activeReport.conclusions
      };
    }
    const text = activeReport.full_report_text || '';
    const extract = (startPattern, endPattern) => {
      const startMatch = text.search(startPattern);
      if (startMatch === -1) return '';
      const afterStart = text.slice(startMatch).replace(startPattern, '');
      if (!endPattern) return afterStart.replace(/^[=\-\s*#]+/, '').replace(/[=\-\s*#]+$/, '').trim();
      const endMatch = afterStart.search(endPattern);
      const raw = endMatch !== -1 ? afterStart.slice(0, endMatch) : afterStart;
      return raw.replace(/^[=\-\s*#]+/, '').replace(/[=\-\s*#]+$/, '').trim();
    };

    return {
      summary: extract(/(?:1\.\s*)?EXECUTIVE SUMMARY/i, /(?:2\.\s*)?FORENSIC INTELLIGENCE/i) || activeReport.executive_summary || '',
      lutkin: extract(/(?:2\.\s*)?FORENSIC INTELLIGENCE/i, /(?:3\.\s*)?FIELD INTELLIGENCE/i) || activeReport.forensic_findings || '',
      vanguard: extract(/(?:3\.\s*)?FIELD INTELLIGENCE/i, /(?:4\.\s*)?ANALYTICAL ANOMALY/i) || activeReport.intel_summary || '',
      cortex: extract(/(?:4\.\s*)?ANALYTICAL ANOMALY/i, /(?:5\.\s*)?ADVERSARIAL REVIEW/i) || activeReport.anomaly_detection || '',
      apex: extract(/(?:5\.\s*)?ADVERSARIAL REVIEW/i, /(?:6\.\s*)?CHIEF INVESTIGATION/i) || activeReport.defense_critique || '',
      argus: extract(/(?:6\.\s*)?CHIEF INVESTIGATION/i, /OFFICIAL BUREAU CERTIFICATION/i) || activeReport.conclusions || ''
    };
  })() : null;

  // Parse explicit verdict breakdown if present in Section 6 (Argus) or full text
  const verdictData = (() => {
    const text = activeReport?.full_report_text || activeReport?.conclusions || '';
    if (!text) return null;

    const culpritMatch = text.match(/•?\s*PRIMARY CULPRIT:?\s*([^\n•—–]+)/i);
    const accompliceMatch = text.match(/•?\s*ACCOMPLICE[^\n]*:?\s*([^\n•—–]+)/i);
    const motiveMatch = text.match(/•?\s*SPECIFIC MOTIVE:?\s*([^\n•—–]+(?:\n[^\n•—–]+)*)/i);
    const oppMatch = text.match(/•?\s*OPPORTUNITY[^\n]*:?\s*([^\n•—–]+(?:\n[^\n•—–]+)*)/i);
    const meansMatch = text.match(/•?\s*MEANS[^\n]*:?\s*([^\n•—–]+(?:\n[^\n•—–]+)*)/i);
    const proofMatch = text.match(/•?\s*DECISIVE EVIDENCE[^\n]*:?\s*([^\n•—–]+(?:\n[^\n•—–]+)*)/i);

    if (culpritMatch || motiveMatch) {
      return {
        culprit: culpritMatch ? culpritMatch[1].trim() : 'Primary Identified Subject',
        accomplice: accompliceMatch ? accompliceMatch[1].trim() : null,
        motive: motiveMatch ? motiveMatch[1].trim() : '',
        opportunity: oppMatch ? oppMatch[1].trim() : '',
        means: meansMatch ? meansMatch[1].trim() : '',
        decisiveEvidence: proofMatch ? proofMatch[1].trim() : ''
      };
    }
    return null;
  })();

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#100d0a]">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 print:p-0 print:overflow-visible">
        
        {/* Controls Bar */}
        <div className="vintage-card p-4 rounded flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-elite text-[#8d4829] font-bold">CASE DOSSIER:</label>
              <select
                value={selectedCaseRef}
                onChange={(e) => setSelectedCaseRef(e.target.value)}
                className="p-1 px-2.5 bg-[#f5e9cf] text-[#24170f] font-elite text-xs border border-[#9b7b50] rounded focus:outline-none"
              >
                {cases.map((c) => (
                  <option key={c.case_ref} value={c.case_ref}>
                    {c.case_ref} — {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[#9c764e]/50">
              <FileText size={16} className="text-[#8d4829]" />
              <span className="font-rye text-xs text-[#3b2413] truncate max-w-[280px]">
                {activeReport ? activeReport.title : `No compiled report yet`}
              </span>
              {activeCaseObj?.status === 'Solved' && (
                <span className="text-[9px] font-elite px-2 py-0.5 rounded bg-green-900 text-green-100 font-bold border border-green-600">
                  ✓ ARCHIVED & SOLVED
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!activeReport}
              className="western-btn text-xs py-1.5 px-3"
              title="Copy Plaintext Report"
            >
              {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {/* Download as PDF Only */}
            <button
              onClick={handleDownloadPdf}
              disabled={!activeReport}
              className="western-btn-gold text-xs py-1.5 px-4 font-bold flex items-center gap-1.5 shadow"
              title="Download or Print PDF Report"
            >
              <Download size={14} />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>

        {/* Report Document Paper Preview */}
        {activeReport ? (
          <div className="printable-dossier max-w-4xl mx-auto p-8 md:p-12 rounded bg-[#f5ecdb] text-[#2a1a0f] border-2 border-[#a17e55] shadow-2xl font-elite relative">
            
            {/* Top Classified Bureau Seal Stamp */}
            <div className="absolute top-6 right-6 border-2 border-red-800 text-red-800 px-3 py-1 text-[11px] font-bold tracking-widest rotate-6 select-none opacity-85">
              CLASSIFIED · BUREAU SEAL
            </div>

            {/* Document Letterhead */}
            <div className="text-center border-b-2 border-[#7a5433] pb-4 mb-6">
              <img 
                src="/favicon.png" 
                onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                alt="ARGUS & Co." 
                className="w-24 h-24 mx-auto mb-2 rounded-full border-2 border-[#b1844c] shadow-lg object-cover" 
              />
              <h2 className="font-rye text-2xl md:text-3xl text-[#3b2414] tracking-wider">
                ARGUS & Co.
              </h2>
              <p className="text-xs text-[#6e4e30] tracking-widest mt-1 uppercase font-bold">
                Western Investigation Bureau · Frontier District · Est. 1891
              </p>
              <p className="text-[10px] text-[#8c6945] mt-0.5 tracking-wider">
                OFFICIAL EXECUTIVE DOSSIER & MULTI-AGENT VERDICT
              </p>
            </div>

            {/* Docket Metadata Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 bg-[#e8d7bb] rounded border border-[#9b784e] text-[11px] mb-6">
              <div>
                <strong className="block text-[#694827]">CASE REFERENCE:</strong>
                <span>{selectedCaseRef}</span>
              </div>
              <div>
                <strong className="block text-[#694827]">PRIORITY TIER:</strong>
                <span className="font-bold text-red-900">{activeCaseObj?.priority || 'High'}</span>
              </div>
              <div>
                <strong className="block text-[#694827]">LEAD OFFICER:</strong>
                <span>DETECTIVE ARGUS</span>
              </div>
              <div>
                <strong className="block text-[#694827]">DATE COMPILED:</strong>
                <span>{activeReport.created_at ? new Date(activeReport.created_at).toLocaleDateString() : 'Active'}</span>
              </div>
            </div>

            {/* Top Official Executive Verdict & Resolution Box */}
            {verdictData && (
              <div className="mb-6 p-4 rounded bg-[#24170f] border-2 border-[#b88c4d] shadow-lg text-[#f5deb3]">
                <div className="flex flex-wrap items-center justify-between border-b border-[#b88c4d]/50 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#f59e0b] font-rye text-sm md:text-base">★ OFFICIAL BUREAU VERDICT & CASE RESOLUTION</span>
                  </div>
                  <span className="text-[10px] font-elite px-2.5 py-0.5 rounded bg-[#f59e0b] text-[#1c1209] font-bold uppercase tracking-wider">
                    CULPRIT UNMASKED
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-elite">
                  <div className="p-2.5 rounded bg-[#180f0a] border border-[#6b4728]">
                    <strong className="block text-[#f59e0b] text-[11px] font-bold tracking-wider mb-0.5">PRIMARY CULPRIT:</strong>
                    <span className="font-rye text-base text-[#f5deb3]">{verdictData.culprit}</span>
                    {verdictData.accomplice && (
                      <span className="block text-[11px] text-[#caa679] mt-1">
                        <strong>Accomplice / Facilitator:</strong> {verdictData.accomplice}
                      </span>
                    )}
                  </div>

                  <div className="p-2.5 rounded bg-[#180f0a] border border-[#6b4728]">
                    <strong className="block text-[#f59e0b] text-[11px] font-bold tracking-wider mb-0.5">SPECIFIC MOTIVE:</strong>
                    <span className="text-[#ebd8b7] leading-relaxed">{verdictData.motive}</span>
                  </div>

                  <div className="p-2.5 rounded bg-[#180f0a] border border-[#6b4728]">
                    <strong className="block text-[#f59e0b] text-[11px] font-bold tracking-wider mb-0.5">OPPORTUNITY & ACCESS CORRIDOR:</strong>
                    <span className="text-[#ebd8b7] leading-relaxed">{verdictData.opportunity}</span>
                  </div>

                  <div className="p-2.5 rounded bg-[#180f0a] border border-[#6b4728]">
                    <strong className="block text-[#f59e0b] text-[11px] font-bold tracking-wider mb-0.5">DECISIVE EVIDENCE & PROOF:</strong>
                    <span className="text-[#ebd8b7] leading-relaxed">{verdictData.decisiveEvidence}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Structured Report Sections (Page-Break Protected) */}
            <div className="space-y-4 font-elite text-xs md:text-sm text-[#2c1c11]">
              {/* Section 1: Executive Summary */}
              {sections?.summary && (
                <div className="dossier-section">
                  <div className="dossier-section-title flex items-center justify-between border-b border-[#9c764e] pb-1.5 mb-2.5">
                    <h3 className="font-rye text-xs md:text-sm text-[#3d2412]">
                      1. EXECUTIVE SUMMARY & CASE INTAKE RECORD
                    </h3>
                    <span className="text-[9px] font-elite px-2 py-0.5 rounded bg-[#4d2f19] text-[#f7e4be] font-bold">
                      INTAKE DOSSIER
                    </span>
                  </div>
                  <BureauContentRenderer content={sections.summary} />
                </div>
              )}

              {/* Section 2: Officer Lutkin - Forensics */}
              {sections?.lutkin && (
                <div className="dossier-section">
                  <div className="dossier-section-title flex items-center justify-between border-b border-[#9c764e] pb-1.5 mb-2.5">
                    <h3 className="font-rye text-xs md:text-sm text-[#3d2412] flex items-center gap-1.5">
                      <span>2. FORENSIC INTELLIGENCE ASSESSMENT</span>
                      <span className="text-[11px] font-elite text-[#6e4e30]">— OFFICER LUTKIN</span>
                    </h3>
                    <span className="text-[9px] font-elite px-2 py-0.5 rounded bg-[#00d2ff]/20 text-[#006080] border border-[#00d2ff]/50 font-bold">
                      CRYPTOGRAPHIC & PHYSICAL FORENSICS
                    </span>
                  </div>
                  <BureauContentRenderer content={sections.lutkin} />
                </div>
              )}

              {/* Section 3: Officer Vanguard - Field Intel & OSINT */}
              {sections?.vanguard && (
                <div className="dossier-section">
                  <div className="dossier-section-title flex items-center justify-between border-b border-[#9c764e] pb-1.5 mb-2.5">
                    <h3 className="font-rye text-xs md:text-sm text-[#3d2412] flex items-center gap-1.5">
                      <span>3. FIELD INTELLIGENCE & OSINT DOSSIER</span>
                      <span className="text-[11px] font-elite text-[#6e4e30]">— OFFICER VANGUARD</span>
                    </h3>
                    <span className="text-[9px] font-elite px-2 py-0.5 rounded bg-[#f97316]/20 text-[#9a3412] border border-[#f97316]/50 font-bold">
                      OSINT & TRANSIT CORRIDORS
                    </span>
                  </div>
                  <BureauContentRenderer content={sections.vanguard} />
                </div>
              )}

              {/* Section 4: Officer Cortex - Analytics & Link Graph */}
              {sections?.cortex && (
                <div className="dossier-section">
                  <div className="dossier-section-title flex items-center justify-between border-b border-[#9c764e] pb-1.5 mb-2.5">
                    <h3 className="font-rye text-xs md:text-sm text-[#3d2412] flex items-center gap-1.5">
                      <span>4. ANALYTICAL ANOMALY & LINK GRAPH MATRIX</span>
                      <span className="text-[11px] font-elite text-[#6e4e30]">— OFFICER CORTEX</span>
                    </h3>
                    <span className="text-[9px] font-elite px-2 py-0.5 rounded bg-[#10b981]/20 text-[#065f46] border border-[#10b981]/50 font-bold">
                      PROBABILITY & ANOMALY MATRIX
                    </span>
                  </div>
                  <BureauContentRenderer content={sections.cortex} />
                </div>
              )}

              {/* Section 5: Detective Apex - Adversarial Review */}
              {sections?.apex && (
                <div className="dossier-section">
                  <div className="dossier-section-title flex items-center justify-between border-b border-[#9c764e] pb-1.5 mb-2.5">
                    <h3 className="font-rye text-xs md:text-sm text-[#3d2412] flex items-center gap-1.5">
                      <span>5. ADVERSARIAL REVIEW & RED-TEAM AUDIT</span>
                      <span className="text-[11px] font-elite text-[#6e4e30]">— DETECTIVE APEX</span>
                    </h3>
                    <span className="text-[9px] font-elite px-2 py-0.5 rounded bg-[#a855f7]/20 text-[#6b21a8] border border-[#a855f7]/50 font-bold">
                      DEPUTY CROSS-EXAMINATION
                    </span>
                  </div>
                  <BureauContentRenderer content={sections.apex} />
                </div>
              )}

              {/* Section 6: Detective Argus - Chief Verdict & Case Resolution */}
              {sections?.argus && (
                <div className="dossier-section border-2 border-[#b88c4d] bg-[#ebdcc2]">
                  <div className="dossier-section-title flex items-center justify-between border-b-2 border-[#9c764e] pb-1.5 mb-2.5">
                    <h3 className="font-rye text-xs md:text-sm text-[#3d2412] flex items-center gap-1.5">
                      <span>6. CHIEF INVESTIGATION OFFICER OFFICIAL VERDICT</span>
                      <span className="text-[11px] font-elite text-[#854524]">— DETECTIVE ARGUS</span>
                    </h3>
                    <span className="text-[9px] font-elite px-2 py-0.5 rounded bg-[#f59e0b] text-[#1f130b] font-bold shadow-sm">
                      CULPRIT UNMASKED · FINAL VERDICT
                    </span>
                  </div>
                  <BureauContentRenderer content={sections.argus} />
                </div>
              )}

              {/* Fallback if sections were not parseable */}
              {!sections?.lutkin && !sections?.argus && (
                <BureauContentRenderer content={activeReport.full_report_text} />
              )}
            </div>

            {/* Bureau Signatures & Stamp */}
            <div className="bureau-signatures mt-10 pt-5 border-t-2 border-[#7a5433] flex flex-wrap justify-between items-center text-[10px] text-[#735334]">
              <div className="sig-left">
                <p className="font-bold tracking-wider">CERTIFIED BY ARGUS AND CO. FORENSIC PROTOCOLS</p>
                <p className="font-mono-code mt-0.5">AUTHENTICATION HASH: SHA-256 VERIFIED IMMUTABLE</p>
              </div>
              <div className="sig-right text-right">
                <p className="font-rye text-base text-[#4d2f19]">Detective Argus</p>
                <p className="font-bold tracking-wider">CHIEF INVESTIGATION OFFICER</p>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* POST-CONCLAVE ACTIONS: 1. End Case (Archive) | 2. Re-Analyse Case        */}
            {/* ========================================================================= */}
            <div className="mt-10 pt-6 border-t-2 border-dashed border-[#8d653f] print:hidden">
              <div className="p-4 bg-[#e8d5b5] rounded-md border-2 border-[#9b7549] shadow-inner space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-[#8d4829]" />
                    <h4 className="font-rye text-sm text-[#3b2413]">
                      Post-Investigation Bureau Decisions
                    </h4>
                  </div>
                  {actionStatus && (
                    <span className="text-xs text-[#2b5726] font-bold flex items-center gap-1 animate-pulse">
                      <CheckCircle2 size={13} /> {actionStatus}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#523820] leading-relaxed">
                  Upon review of the five officer testimonies and Chief Argus's verdict, choose either to finalize and seal this case into the historical archives, or order an alternative re-analysis to stress-test other investigative angles.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Option 1: End Case & Save in Archives */}
                  <button
                    onClick={handleEndAndArchiveCase}
                    disabled={isArchiving || activeCaseObj?.status === 'Solved'}
                    className={`py-2.5 px-4 rounded text-xs font-bold font-elite flex items-center justify-center gap-2 shadow transition-all ${
                      activeCaseObj?.status === 'Solved'
                        ? 'bg-[#3b281b] text-[#ad9573] cursor-not-allowed border border-[#6d4d31]'
                        : 'bg-[#5c371d] hover:bg-[#472712] text-[#ffebcc] border border-[#ab7f4c]'
                    }`}
                  >
                    <Archive size={14} className="text-[#e8b56f]" />
                    <span>{activeCaseObj?.status === 'Solved' ? 'Case Already Archived' : '1. End Case & Seal in Archives'}</span>
                  </button>

                  {/* Option 2: Re-Analyse Case (Alternative Approach) */}
                  <button
                    onClick={handleReAnalyse}
                    className="western-btn-gold py-2.5 px-4 rounded text-xs font-bold font-elite flex items-center justify-center gap-2 shadow"
                    title="Run conclave again under alternative contrarian vector"
                  >
                    <RefreshCw size={14} />
                    <span>2. Re-Analyse Case (Alternative Approach)</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="vintage-card p-12 text-center text-[#7e5f3f] font-elite max-w-xl mx-auto">
            <ShieldAlert size={36} className="mx-auto mb-3 text-[#a87e53]" />
            <h3 className="font-rye text-base text-[#4b2d1d] mb-1">
              No Report Generated for {selectedCaseRef}
            </h3>
            <p className="text-xs leading-relaxed">
              To produce an official findings report, navigate to the <strong>Investigation Lab</strong> and click <strong>"Run Autonomous Bureau Conclave"</strong>. All 5 specialist officers will synthesize and certify the report automatically.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
