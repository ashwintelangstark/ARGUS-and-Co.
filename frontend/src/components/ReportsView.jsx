import React, { useState, useEffect } from 'react';
import { bureauAudio } from '../utils/audio.js';
import { FileText, Download, Printer, Copy, Check, ShieldAlert } from 'lucide-react';

export default function ReportsView({ cases = [], initialCaseRef = null }) {
  const [selectedCaseRef, setSelectedCaseRef] = useState(initialCaseRef || (cases[0]?.case_ref || ''));
  const [reports, setReports] = useState([]);
  const [activeReport, setActiveReport] = useState(null);
  const [copied, setCopied] = useState(false);

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

  const handleDownload = () => {
    if (!activeReport) return;
    bureauAudio.cameraShutter();
    const blob = new Blob([activeReport.full_report_text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ARGUS_${selectedCaseRef}_Classified_Report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!activeReport) return;
    bureauAudio.typewriterClick();
    navigator.clipboard.writeText(activeReport.full_report_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    bureauAudio.typewriterClick();
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#100d0a]">
      
      {/* Header */}
      <div className="flex-none p-4 bg-gradient-to-r from-[#21140c] via-[#170e09] to-[#21140c] border-b-2 border-[#b1844c] flex flex-wrap items-center justify-between gap-3">
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
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        
        {/* Controls Bar */}
        <div className="vintage-card p-4 rounded flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[#8d4829]" />
            <span className="font-rye text-sm text-[#3b2413]">
              {activeReport ? activeReport.title : `No compiled report for ${selectedCaseRef}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!activeReport}
              className="western-btn text-xs py-1.5 px-3"
            >
              {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              disabled={!activeReport}
              className="western-btn text-xs py-1.5 px-3"
            >
              <Printer size={13} /> Print / PDF
            </button>
            <button
              onClick={handleDownload}
              disabled={!activeReport}
              className="western-btn-gold text-xs py-1.5 px-4 font-bold"
            >
              <Download size={13} /> Download .txt
            </button>
          </div>
        </div>

        {/* Report Document Paper Preview */}
        {activeReport ? (
          <div className="max-w-4xl mx-auto p-8 md:p-12 rounded bg-[#f5ecdb] text-[#2a1a0f] border border-[#a17e55] shadow-2xl font-elite relative">
            
            {/* Top Classified Bureau Seal Stamp */}
            <div className="absolute top-6 right-6 border-2 border-red-800 text-red-800 px-3 py-1 text-[11px] font-bold tracking-widest rotate-6 select-none opacity-85">
              CLASSIFIED · BUREAU SEAL
            </div>

            <div className="text-center border-b-2 border-[#7a5433] pb-4 mb-6">
              <img src="/favicon.png" alt="ARGUS & Co." className="w-16 h-16 mx-auto mb-2 rounded-full border border-[#b1844c] shadow-md" />
              <h2 className="font-rye text-2xl text-[#3b2414] tracking-wide">
                ARGUS & Co.
              </h2>
              <p className="text-xs text-[#6e4e30] tracking-widest mt-1">
                WESTERN INVESTIGATION BUREAU · FRONTIER DISTRICT
              </p>
              <p className="text-[10px] text-[#8c6945] mt-0.5">
                EXECUTIVE DOSSIER FINDINGS REPORT
              </p>
            </div>

            {/* Structured Report Text */}
            <div className="whitespace-pre-wrap text-xs md:text-sm leading-relaxed text-[#2c1c11] font-elite">
              {activeReport.full_report_text}
            </div>

            {/* Certification Footer */}
            <div className="mt-10 pt-6 border-t-2 border-[#7a5433] flex flex-wrap justify-between items-center text-[10px] text-[#735334]">
              <div>
                <p>CERTIFIED IN ACCORDANCE WITH BUREAU EVIDENCE PROTOCOLS</p>
                <p className="font-mono-code mt-0.5">GENERATED BY: {activeReport.generated_by || 'BUREAU_AI_CONCLAVE'}</p>
              </div>
              <div className="text-right">
                <p className="font-rye text-sm text-[#4d2f19]">Detective Argus</p>
                <p>CHIEF INVESTIGATION OFFICER</p>
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

