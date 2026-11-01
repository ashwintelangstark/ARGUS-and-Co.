import React, { useState, useEffect } from 'react';
import { bureauAudio } from '../utils/audio.js';
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

  // Download PDF Only using browser print-to-PDF formatting
  const handleDownloadPdf = () => {
    if (!activeReport) return;
    bureauAudio.typewriterClick();
    window.print();
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

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#100d0a]">
      
      {/* Header */}
      <div className="flex-none p-4 bg-gradient-to-r from-[#21140c] via-[#170e09] to-[#21140c] border-b-2 border-[#b1844c] flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="font-rye text-xl md:text-2xl text-[#f0d9ad] tracking-wide">
            Classified Bureau Reports & Findings Desk
          </h1>
          <p className="font-elite text-xs text-[#bda47b] mt-0.5">
            Review certified multi-agent investigation dossiers, forensic findings, and executive verdicts.
          </p>
        </div>

        {/* Case Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-elite text-[#d6bd94] font-bold">CASE DOSSIER:</label>
          <select
            value={selectedCaseRef}
            onChange={(e) => setSelectedCaseRef(e.target.value)}
            className="p-1.5 px-3 bg-[#f5e9cf] text-[#24170f] font-elite text-xs border border-[#9b7b50] rounded focus:outline-none"
          >
            {cases.map((c) => (
              <option key={c.case_ref} value={c.case_ref}>
                {c.case_ref} — {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 print:p-0 print:overflow-visible">
        
        {/* Controls Bar */}
        <div className="vintage-card p-4 rounded flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[#8d4829]" />
            <span className="font-rye text-sm text-[#3b2413]">
              {activeReport ? activeReport.title : `No compiled report for ${selectedCaseRef}`}
            </span>
            {activeCaseObj?.status === 'Solved' && (
              <span className="text-[10px] font-elite px-2 py-0.5 rounded bg-green-900 text-green-100 font-bold border border-green-600">
                ✓ ARCHIVED & SOLVED
              </span>
            )}
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
                src="/fevicon.png" 
                alt="ARGUS & Co." 
                className="w-16 h-16 mx-auto mb-2 rounded-full border-2 border-[#b1844c] shadow-md object-cover bg-[#17100a]" 
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

            {/* Structured Report Text */}
            <div className="whitespace-pre-wrap text-xs md:text-sm leading-relaxed text-[#2c1c11] font-elite space-y-4">
              {activeReport.full_report_text}
            </div>

            {/* Bureau Signatures & Stamp */}
            <div className="mt-12 pt-6 border-t-2 border-[#7a5433] flex flex-wrap justify-between items-center text-[10px] text-[#735334]">
              <div>
                <p className="font-bold tracking-wider">CERTIFIED BY ARGUS AND CO. FORENSIC PROTOCOLS</p>
                <p className="font-mono-code mt-0.5">AUTHENTICATION HASH: SHA-256 VERIFIED IMMUTABLE</p>
              </div>
              <div className="text-right">
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
