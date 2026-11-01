import React, { useState, useEffect, useRef } from 'react';
import { bureauAudio } from '../utils/audio.js';
import { 
  Play, Sparkles, Shield, Cpu, Microscope, Globe, 
  CheckCircle, ArrowRight, RefreshCw, FileText, Download 
} from 'lucide-react';

export default function InvestigationLab({
  cases = [],
  selectedCaseRef,
  onCaseChange,
  onOpenOfficerStudio,
  onViewReports
}) {
  const [activeCase, setActiveCase] = useState(null);
  const [evidenceList, setEvidenceList] = useState([]);
  const [deliberations, setDeliberations] = useState([]);
  const [isConclaveRunning, setIsConclaveRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Select a case and launch the Bureau Conclave.');
  const [activeSpeaker, setActiveSpeaker] = useState(null);

  const eventSourceRef = useRef(null);
  const scrollRef = useRef(null);

  // Fetch full case detail when selected
  const fetchCaseDetail = async (ref) => {
    if (!ref) {
      setActiveCase(null);
      setEvidenceList([]);
      setDeliberations([]);
      return;
    }
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(ref)}`);
      const data = await res.json();
      if (data.success) {
        setActiveCase(data.case);
        setEvidenceList(data.evidence || []);
        setDeliberations(data.deliberations || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (selectedCaseRef) {
      fetchCaseDetail(selectedCaseRef);
      connectSSE(selectedCaseRef);
    }
    return () => {
      if (eventSourceRef.current) eventSourceRef.current.close();
    };
  }, [selectedCaseRef]);

  // Connect Server-Sent Events (SSE) for real-time live deliberation stream
  const connectSSE = (ref) => {
    if (eventSourceRef.current) eventSourceRef.current.close();

    const es = new EventSource(`/api/cases/${encodeURIComponent(ref)}/stream`);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'status') {
          setStatusMessage(payload.message);
          bureauAudio.telegraphBeep();
        } else if (payload.type === 'turn') {
          bureauAudio.typewriterClick();
          setActiveSpeaker(payload.officer);
          setDeliberations(prev => {
            if (prev.some(d => d.id === payload.id)) return prev;
            return [...prev, payload];
          });
          // Auto scroll to bottom
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        } else if (payload.type === 'completed') {
          bureauAudio.conclaveChime();
          setIsConclaveRunning(false);
          setActiveSpeaker(null);
          setStatusMessage('Bureau Conclave successfully concluded. Official findings compiled.');
          fetchCaseDetail(ref);
        } else if (payload.type === 'error') {
          setIsConclaveRunning(false);
          setStatusMessage(`Conclave interrupted: ${payload.error}`);
        }
      } catch (err) {
        console.error('SSE parse error:', err);
      }
    };

    es.onerror = () => {
      // Reconnection handled automatically by browser EventSource
    };
  };

  // Launch Autonomous Bureau Conclave
  const handleLaunchConclave = async () => {
    if (!selectedCaseRef || isConclaveRunning) return;

    setIsConclaveRunning(true);
    setStatusMessage('Convening all 5 Bureau Officers for autonomous investigation...');
    bureauAudio.conclaveChime();

    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(selectedCaseRef)}/conclave`, {
        method: 'POST'
      });
      const data = await res.json();
      if (!data.success) {
        setIsConclaveRunning(false);
        setStatusMessage(data.error || 'Failed to start conclave');
      }
    } catch (err) {
      setIsConclaveRunning(false);
      setStatusMessage('Network failure reaching Bureau AI agents.');
    }
  };

  const officers = [
    {
      id: 'ARGUS',
      name: 'Detective Argus',
      role: 'Chief Investigation Officer',
      model: 'openrouter/free (Gemma-4-31B)',
      accent: '#f59e0b',
      borderClass: 'border-amber-500',
      badge: 'CHIEF',
      icon: '👑',
      desc: 'Orchestrates case strategy, interrogates suspect motives, and issues final directives.'
    },
    {
      id: 'APEX',
      name: 'Detective Apex',
      role: 'Deputy Investigation Officer',
      model: 'openrouter/free (Nemotron-3.5)',
      accent: '#a855f7',
      borderClass: 'border-purple-500',
      badge: 'DEPUTY',
      icon: '★',
      desc: 'Challenges working assumptions, attacks confirmation bias, and protects against flawed conclusions.'
    },
    {
      id: 'LUTKIN',
      name: 'Officer Lutkin',
      role: 'Forensic Intelligence Officer',
      model: 'openrouter/free (LFM-2.5)',
      accent: '#00d2ff',
      borderClass: 'border-cyan-400',
      badge: 'FORENSICS',
      icon: '🔬',
      desc: 'Performs cryptographic hash inspection, digital log validation, and forgery analysis.'
    },
    {
      id: 'VANGUARD',
      name: 'Officer Vanguard',
      role: 'Intelligence Operations Officer',
      model: 'openrouter/free (Nemotron-Omni)',
      accent: '#f97316',
      borderClass: 'border-orange-500',
      badge: 'INTEL & OSINT',
      icon: '🌐',
      desc: 'Monitors public manifests, wire intercepts, transit coordinates, and syndicate entities.'
    },
    {
      id: 'CORTEX',
      name: 'Officer Cortex',
      role: 'Analytical Intelligence Officer',
      model: 'openrouter/free (Gemma-4-26B)',
      accent: '#10b981',
      borderClass: 'border-emerald-400',
      badge: 'ANALYTICS',
      icon: '📊',
      desc: 'Calculates probability matrices, identifies signal anomalies, and graphs relational link charts.'
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#100d0a]">
      
      {/* View Header */}
      <div className="flex-none p-4 bg-gradient-to-r from-[#21140c] via-[#170e09] to-[#21140c] border-b-2 border-[#b1844c] flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-rye text-xl md:text-2xl text-[#f0d9ad] tracking-wide flex items-center gap-2">
            Investigation Laboratory & Conclave
          </h1>
          <p className="font-elite text-xs text-[#bda47b] mt-0.5">
            5-Stage Autonomous Multi-Agent Investigation Powered by Unlimited Free Models.
          </p>
        </div>

        {/* Case Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-elite text-[#d6bd94] font-bold">SELECT CASE:</label>
          <select
            value={selectedCaseRef || ''}
            onChange={(e) => onCaseChange(e.target.value)}
            className="p-1.5 px-3 bg-[#f5e9cf] text-[#24170f] font-elite text-xs border border-[#9b7b50] rounded focus:outline-none"
          >
            <option value="">Choose a case dossier…</option>
            {cases.map((c) => (
              <option key={c.case_ref} value={c.case_ref}>
                {c.case_ref} — {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Layout: 2 Columns */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        
        {/* Top Split: Case Bench & 5 Officer Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Case Evidence Examination Bench */}
          <div className="lg:col-span-5 vintage-card p-5 rounded flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#9c764e] pb-2 mb-3">
                <h2 className="font-rye text-base text-[#3e2311]">
                  Evidence Examination Bench
                </h2>
                {activeCase && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-elite bg-[#4d2f19] text-[#f7e4be]">
                    {activeCase.priority} Priority
                  </span>
                )}
              </div>

              {activeCase ? (
                <div className="space-y-3 font-elite text-xs text-[#4b301a]">
                  <div>
                    <h3 className="font-rye text-sm text-[#4b2d1d]">{activeCase.title}</h3>
                    <p className="text-[11px] text-[#634830] mt-1">{activeCase.notes || 'No intake notes.'}</p>
                  </div>

                  <div className="p-3 bg-[#e8d5b5] rounded border border-[#96744c]">
                    <div className="text-[10px] font-bold text-[#5c3e25] mb-1.5">
                      REGISTERED EVIDENCE PIECES ({evidenceList.length}):
                    </div>
                    {evidenceList.length > 0 ? (
                      <ul className="space-y-1.5 text-[11px] max-h-36 overflow-y-auto pr-1">
                        {evidenceList.map((e, idx) => (
                          <li key={idx} className="p-1.5 bg-[#f5ecdc] rounded border border-[#bfa27a]">
                            <div className="flex items-center justify-between font-bold">
                              <span>{e.original_name}</span>
                              <span className="text-[9px] px-1 bg-[#4d2f19] text-white rounded">{e.file_type}</span>
                            </div>
                            <div className="text-[9px] text-[#6d5137] font-mono-code truncate mt-0.5">
                              Hash: {e.hash_sha256 || 'Calculated on intake'}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[11px] text-[#856546] italic">No evidence files logged yet. Add in Case Files view.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-[#806344] font-elite text-xs">
                  Choose a case dossier from the dropdown to initialize workbench.
                </div>
              )}
            </div>

            {/* Launch Conclave Action */}
            <div className="pt-4 border-t border-[#96744c]/40 mt-4 space-y-2">
              <button
                onClick={handleLaunchConclave}
                disabled={!selectedCaseRef || isConclaveRunning}
                className="w-full western-btn-gold py-2.5 font-elite text-xs font-bold rounded flex items-center justify-center gap-2 shadow-md"
              >
                {isConclaveRunning ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Conclave in Progress...</span>
                  </>
                ) : (
                  <>
                    <Play size={14} fill="currentColor" />
                    <span>Run Autonomous Bureau Conclave</span>
                  </>
                )}
              </button>

              <div className="text-[10px] font-elite text-[#6b4e33] flex items-center justify-between">
                <span className="truncate max-w-[280px]">Status: {statusMessage}</span>
                {deliberations.length > 0 && (
                  <button 
                    onClick={() => onViewReports(selectedCaseRef)}
                    className="text-[#854524] hover:underline font-bold flex items-center gap-1"
                  >
                    View Report <ArrowRight size={10} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: The 5 Autonomous Officers on Duty */}
          <div className="lg:col-span-7 vintage-card p-5 rounded">
            <h2 className="font-rye text-base text-[#3e2311] border-b border-[#9c764e] pb-2 mb-3 flex items-center justify-between">
              <span>Bureau Officers on Duty (Click to Inspect in 3D)</span>
              <span className="text-[10px] font-elite text-[#7a5839]">5 Specialists Assigned</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {officers.map((officer) => {
                const isSpeaking = activeSpeaker === officer.id;

                return (
                  <div
                    key={officer.id}
                    onClick={() => {
                      bureauAudio.biometricScanHum();
                      if (typeof onOpenOfficerStudio === 'function') onOpenOfficerStudio(officer.id);
                    }}
                    className={`relative p-2.5 rounded bg-[#ebdcc0] border-2 transition-all cursor-pointer hover:bg-[#e4d1ad] ${
                      isSpeaking 
                        ? 'ring-4 ring-amber-500 scale-105 border-amber-600 shadow-xl' 
                        : 'border-[#96744c] hover:border-[#4d2f19]'
                    }`}
                  >
                    {/* Live Speaking Indicator */}
                    {isSpeaking && (
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded text-[8px] font-elite bg-amber-600 text-white font-bold animate-pulse">
                        SPEAKING
                      </span>
                    )}

                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-10 h-10 rounded border border-[#4d2f19] shadow flex items-center justify-center text-lg bg-[#24170f]" 
                        style={{ borderColor: officer.accent }}
                      >
                        <span>{officer.icon}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-elite px-1 rounded text-white font-bold" style={{ backgroundColor: officer.accent }}>
                          {officer.badge}
                        </span>
                        <h4 className="font-rye text-xs text-[#3b2413] mt-0.5 leading-none">{officer.name}</h4>
                      </div>
                    </div>

                    <p className="font-elite text-[9px] leading-tight text-[#5a3e26] line-clamp-2 mb-1.5">
                      {officer.desc}
                    </p>

                    <div className="text-[8px] font-mono-code text-[#735133] border-t border-[#bfa27a] pt-1 truncate">
                      Model: {officer.model.split('/')[1] || officer.model}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Live Multi-Agent Deliberation Feed */}
        <div className="vintage-card p-5 rounded">
          <div className="flex items-center justify-between border-b border-[#9c764e] pb-2 mb-4">
            <h2 className="font-rye text-lg text-[#3e2311] flex items-center gap-2">
              <Sparkles size={18} className="text-[#c69a50]" />
              Bureau Conclave Deliberation Feed
            </h2>
            <span className="font-elite text-xs text-[#6e4e30]">
              {deliberations.length} Statements Logged
            </span>
          </div>

          <div 
            ref={scrollRef}
            className="h-[380px] overflow-y-auto space-y-3.5 pr-2 font-elite text-xs"
          >
            {deliberations.map((turn, i) => {
              const matchedOfficer = officers.find(o => o.id === turn.officer || o.name === turn.officer_name) || officers[0];

              return (
                <div 
                  key={turn.id || i}
                  className="p-3.5 rounded bg-[#f5ece0] border-l-4 shadow-sm"
                  style={{ borderLeftColor: matchedOfficer.accent }}
                >
                  <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[#debda0]">
                    <div className="flex items-center gap-2">
                      <img 
                        src={matchedOfficer.face} 
                        alt={matchedOfficer.name} 
                        className="w-6 h-6 rounded-full object-cover border border-[#4d2f19]" 
                      />
                      <strong className="font-rye text-xs text-[#3d2412]">
                        {turn.officer_name || matchedOfficer.name}
                      </strong>
                      <span className="text-[10px] text-[#78593a]">
                        — {turn.role || matchedOfficer.role}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono-code text-[#8f6e4d]">
                      {turn.model_used ? turn.model_used.split('/')[1] || turn.model_used : 'bureau-conclave'}
                    </span>
                  </div>

                  <div className="text-xs leading-relaxed text-[#3b2413] whitespace-pre-wrap">
                    {turn.message}
                  </div>
                </div>
              );
            })}

            {isConclaveRunning && (
              <div className="p-4 bg-[#f2e6d5] border border-dashed border-[#a68056] rounded text-[#6b4b2c] flex items-center gap-3 animate-pulse">
                <RefreshCw size={16} className="animate-spin text-[#c69a50]" />
                <div>
                  <p className="font-rye text-xs text-[#4b2d1d]">The Bureau is Deliberating...</p>
                  <p className="text-[10px] mt-0.5">{statusMessage}</p>
                </div>
              </div>
            )}

            {deliberations.length === 0 && !isConclaveRunning && (
              <div className="py-20 text-center text-[#826444] font-elite">
                <p>The deliberation floor is currently quiet.</p>
                <p className="text-[11px] mt-1">Select a case dossier and click "Run Autonomous Bureau Conclave" to begin.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

