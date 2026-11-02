import React, { useState, useEffect, useRef } from 'react';
import { bureauAudio } from '../utils/audio.js';
import CasePresentationModal from './CasePresentationModal.jsx';
import { 
  Pin, RefreshCw, X, ShieldCheck, Link2, 
  MapPin, User, FileText, Lightbulb, Award, PlayCircle
} from 'lucide-react';

export default function EvidenceBoard({ 
  caseRef = null, 
  caseTitle = '', 
  onNavigateToCaseFiles, 
  onNavigateToLab 
}) {
  const [clues, setClues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClue, setSelectedClue] = useState(null);
  const [cardPositions, setCardPositions] = useState({});
  const [isPresenting, setIsPresenting] = useState(false);
  const [caseData, setCaseData] = useState(null);
  const [deliberations, setDeliberations] = useState([]);

  const boardRef = useRef(null);
  const cardRefs = useRef({});

  // Fetch case data and deliberations
  const fetchCaseDetail = async () => {
    if (!caseRef) {
      setCaseData(null);
      setDeliberations([]);
      return;
    }
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(caseRef)}`);
      const data = await res.json();
      if (data.success) {
        setCaseData(data.case);
        setDeliberations(data.deliberations || []);
      }
    } catch (e) {
      console.warn('Failed to load case detail for presentation:', e);
    }
  };

  // Fetch clues curated by agents
  const fetchClues = async () => {
    if (!caseRef) {
      setClues([]);
      setCaseData(null);
      setDeliberations([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      fetchCaseDetail();
      const res = await fetch(`/api/cases/${encodeURIComponent(caseRef)}/clues`);
      const data = await res.json();
      if (data.success && data.clues) {
        setClues(data.clues.map(c => ({
          ...c,
          connections: typeof c.connections === 'string' ? JSON.parse(c.connections || '[]') : (c.connections || [])
        })));
      } else {
        setClues([]);
      }
    } catch (e) {
      console.error('Failed to load clues:', e);
      setClues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (caseRef) {
      fetchClues();
    } else {
      setClues([]);
      setCaseData(null);
      setDeliberations([]);
      setLoading(false);
    }
  }, [caseRef]);

  // Compute card pin centers relative to board container for SVG Red Yarn Lines
  const updatePinPositions = () => {
    if (!boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();
    const positions = {};

    clues.forEach(clue => {
      const el = cardRefs.current[clue.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        // Pin is located at top center of each card
        positions[clue.id] = {
          x: rect.left - boardRect.left + rect.width / 2 + boardRef.current.scrollLeft,
          y: rect.top - boardRect.top + 8 + boardRef.current.scrollTop
        };
      }
    });

    setCardPositions(positions);
  };

  useEffect(() => {
    updatePinPositions();
    const timer = setTimeout(updatePinPositions, 200);
    window.addEventListener('resize', updatePinPositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePinPositions);
    };
  }, [clues]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'suspect': return <User size={13} className="text-amber-800" />;
      case 'evidence': return <FileText size={13} className="text-cyan-800" />;
      case 'location': return <MapPin size={13} className="text-emerald-800" />;
      case 'hypothesis': return <Lightbulb size={13} className="text-purple-800" />;
      default: return <Award size={13} className="text-amber-700" />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#140e0a] overflow-hidden select-none">
      
      {/* Board Top Toolbar */}
      <div className="h-14 bg-gradient-to-r from-[#21140c] via-[#160e09] to-[#21140c] border-b-2 border-[#875d35] px-4 flex items-center justify-between z-30 flex-none shadow-lg">
        <div className="flex items-center gap-3">
          <Pin size={18} className="text-[#c69a50]" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-rye text-sm md:text-base text-[#f2e0be] tracking-wide">
                {caseRef ? `CLUES & SUSPECT WEB — ${caseRef}${caseTitle ? ` · ${caseTitle}` : (caseData?.title ? ` · ${caseData.title}` : '')}` : 'CLUES & SUSPECT WEB — NO CASE CURRENTLY ACTIVE'}
              </h2>
              <span className={`text-[10px] font-elite px-2 py-0.5 rounded border ${
                caseRef ? 'bg-[#4a2e19] text-[#ffe6b8] border-[#a67946]' : 'bg-[#2b190e] text-[#8e6e4d] border-[#593920]'
              }`}>
                {caseRef ? `${clues.length} NODES PINNED` : '0 NODES PINNED'}
              </span>
            </div>
            <p className="text-[10px] font-elite text-[#bd9f6f]">
              {caseRef 
                ? 'Autonomous Red Yarn Flowchart · Evidence-to-Verdict Deductive Matrix' 
                : 'Autonomous Red Yarn Flowchart · Awaiting Active Case Assignment in Bureau Dossier Ledger'}
            </p>
          </div>
        </div>

        {/* Authorship Badge & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Present the Case Button */}
          <button
            onClick={() => {
              if (!caseRef) return;
              bureauAudio.conclaveChime();
              setIsPresenting(true);
            }}
            disabled={!caseRef}
            className={`text-[11px] py-1 px-3.5 font-bold flex items-center gap-1.5 shadow ${
              caseRef 
                ? 'western-btn-gold cursor-pointer' 
                : 'western-btn opacity-40 cursor-not-allowed text-[#826243]'
            }`}
            title={caseRef ? "Begin autonomous cinematic detective case presentation" : "Assign and toggle Work On for a case in Case Files to present"}
          >
            <PlayCircle size={14} className={caseRef ? 'text-[#3b2413]' : 'text-[#826243]'} />
            <span>Present the Case</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#1f130b] border border-[#855e37] text-[#c9a770] rounded text-[10px] font-elite">
            <ShieldCheck size={13} className="text-[#c69a50]" />
            <span>AUTHORSHIP: EXCLUSIVELY CURATED BY BUREAU DETECTIVES</span>
          </div>

          <button
            onClick={() => {
              bureauAudio.typewriterClick();
              fetchClues();
            }}
            className="western-btn text-[11px] py-1 px-3"
            title="Refresh Investigation Board"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span className="hidden md:inline">Refresh Web</span>
          </button>
        </div>
      </div>

      {/* Main Corkboard Area with SVG Red Yarn Lines */}
      <div 
        ref={boardRef}
        onScroll={updatePinPositions}
        className="relative flex-1 bg-[#150d08] overflow-auto p-8"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(68, 44, 28, 0.45) 0%, rgba(20, 13, 8, 0.92) 75%, rgba(10, 7, 4, 0.98) 100%),
            repeating-radial-gradient(circle at 20% 30%, rgba(138, 92, 53, 0.16) 0px, transparent 3px),
            repeating-radial-gradient(circle at 80% 70%, rgba(105, 69, 39, 0.14) 0px, transparent 4px),
            linear-gradient(135deg, #2c1d12 0%, #1f130a 50%, #130b06 100%)
          `
        }}
      >
        {/* Corkboard Texture Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

        {/* Dynamic SVG Red Yarn Strings Connecting Pins */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ minWidth: '100%', minHeight: '100%' }}
        >
          <defs>
            <filter id="yarnShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.8" />
            </filter>
          </defs>

          {clues.map((clue) => {
            const p1 = cardPositions[clue.id];
            if (!p1) return null;

            return clue.connections?.map((targetId) => {
              const p2 = cardPositions[targetId];
              if (!p2) return null;

              // Calculate gentle bezier curve for realistic suspended string droop
              const dx = p2.x - p1.x;
              const dy = p2.y - p1.y;
              const dist = Math.hypot(dx, dy);
              const sag = Math.min(dist * 0.12, 45); // natural gravity sag
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2 + sag;

              return (
                <g key={`${clue.id}->${targetId}`}>
                  {/* Red String Drop Shadow */}
                  <path
                    d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
                    fill="none"
                    stroke="#500000"
                    strokeWidth="3.5"
                    strokeOpacity="0.6"
                  />
                  {/* Main Red Yarn Line */}
                  <path
                    d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="url(#yarnShadow)"
                  />
                </g>
              );
            });
          })}
        </svg>

        {/* Clues Card Grid Flowchart - Expansive Multi-Entity Evidence Canvas */}
        <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto pt-4 pb-16">
          {clues.map((clue) => {
            const isSelected = selectedClue?.id === clue.id;

            return (
              <div
                key={clue.id}
                ref={(el) => (cardRefs.current[clue.id] = el)}
                onClick={() => {
                  bureauAudio.typewriterClick();
                  setSelectedClue(clue);
                }}
                className={`relative p-4 rounded bg-[#f1dfbf] text-[#2c1c11] border-2 shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1.5 ${
                  isSelected 
                    ? 'border-[#c69a50] ring-4 ring-[#c69a50]/60 scale-102' 
                    : 'border-[#94734b] hover:border-[#d4a863]'
                }`}
                style={{
                  boxShadow: isSelected 
                    ? '0 12px 28px rgba(0,0,0,0.8), 0 0 16px rgba(198,154,80,0.4)' 
                    : '0 8px 22px rgba(0,0,0,0.65)'
                }}
              >
                {/* Vintage Brass Pin on top center (Yarn Anchor) */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-[#ffe09e] via-[#c69a50] to-[#784e1b] border-2 border-[#fff3d4] shadow-lg flex items-center justify-center z-20">
                  <div className="w-2 h-2 rounded-full bg-[#3d240e] border border-[#ffe09e]" />
                </div>

                {/* Header Tag */}
                <div className="flex items-center justify-between text-[10px] font-elite font-bold tracking-wider mb-2.5 pt-1.5 border-b border-[#8f6d44]/30 pb-1.5">
                  <span 
                    className="px-2 py-0.5 rounded text-[9px] uppercase tracking-wider text-black font-bold flex items-center gap-1 shadow-sm"
                    style={{ backgroundColor: clue.color || '#d9c49b' }}
                  >
                    {getTypeIcon(clue.type)}
                    {clue.type}
                  </span>

                  <span className="text-[9px] font-mono-code text-[#73502d]">
                    ID #{clue.id}
                  </span>
                </div>

                {/* Clue Title */}
                <h3 className="font-rye text-sm leading-snug mb-1.5 text-[#3b2413]">
                  {clue.title}
                </h3>

                {/* Description */}
                <p className="font-elite text-xs leading-relaxed text-[#543b23] line-clamp-4">
                  {clue.description || 'Verified investigative finding.'}
                </p>

                {/* Connected Clues Count */}
                {clue.connections?.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-[#8f6d44]/30 text-[10px] font-elite text-red-900 font-bold flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block shadow-sm animate-pulse" />
                      <span>{clue.connections.length} Red Yarn Thread(s)</span>
                    </div>
                    <Link2 size={12} className="text-red-700" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Blank State if no case is currently active/worked on */}
        {!caseRef && (
          <div className="flex flex-col items-center justify-center h-full min-h-[460px] text-center p-8 max-w-lg mx-auto relative z-20 font-elite">
            <div className="w-16 h-16 rounded-full border-2 border-[#855e37] bg-[#24170f]/90 flex items-center justify-center mb-4 shadow-2xl">
              <Pin size={26} className="text-[#c69a50]" />
            </div>
            <h3 className="font-rye text-lg text-[#f2e0be] mb-2 tracking-wide">
              INVESTIGATION WEB BLANK
            </h3>
            <p className="text-xs text-[#bd9f6f] leading-relaxed mb-6">
              No case is currently being worked on by the bureau. Open the Active Bureau Dossier Ledger, select a case, and toggle <strong className="text-[#ffe6b8]">"Work On"</strong> to mobilize the detectives, analyze forensic evidence, and construct the deductive red yarn flowchart.
            </p>
            <button
              onClick={() => {
                bureauAudio.typewriterClick();
                if (typeof onNavigateToCaseFiles === 'function') onNavigateToCaseFiles();
              }}
              className="western-btn text-xs py-1.5 px-4 shadow-md"
            >
              Open Bureau Dossier Ledger
            </button>
          </div>
        )}

        {/* When case is active but conclave hasn't generated clues yet */}
        {caseRef && clues.length === 0 && !loading && (
          <div className="relative z-20 text-center py-28 text-[#b89569] font-elite max-w-md mx-auto">
            <Pin size={32} className="mx-auto text-[#c69a50] mb-3 opacity-60" />
            <h3 className="font-rye text-base text-[#f0d9ad] mb-1">Investigation Web Clear</h3>
            <p className="text-xs leading-relaxed text-[#cbb18a] mb-5">
              No evidence cards or suspects are currently pinned to this docket. Run the <strong>Autonomous Bureau Conclave</strong> in the Investigation Lab to have the 5 detective officers analyze the case, string the red yarn threads, and document findings here.
            </p>
            <button
              onClick={() => {
                bureauAudio.typewriterClick();
                if (typeof onNavigateToLab === 'function') onNavigateToLab(caseRef);
              }}
              className="western-btn text-xs py-1.5 px-4 shadow-md"
            >
              Open Investigation Lab
            </button>
          </div>
        )}
      </div>

      {/* Clue Inspector Modal Drawer */}
      {selectedClue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-[#f1dfbf] text-[#2b1b11] p-6 rounded border-2 border-[#805e3a] shadow-2xl space-y-4 font-elite">
            <div className="flex items-start justify-between border-b border-[#9c764e] pb-3">
              <div>
                <span 
                  className="px-2 py-0.5 rounded text-[10px] uppercase font-bold text-black inline-block mb-1"
                  style={{ backgroundColor: selectedClue.color || '#d9c49b' }}
                >
                  {selectedClue.type}
                </span>
                <h3 className="font-rye text-lg text-[#3e2311]">
                  {selectedClue.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedClue(null)}
                className="text-[#76512e] hover:text-black p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#452e1a]">
              <div>
                <strong className="block text-[#69492b] text-[10px] uppercase tracking-wider mb-1">
                  OFFICIAL DEDUCTIVE RECORD:
                </strong>
                <p className="p-3 bg-[#e4cfad] rounded border border-[#b89972] whitespace-pre-wrap">
                  {selectedClue.description}
                </p>
              </div>

              {selectedClue.connections?.length > 0 && (
                <div className="p-2.5 bg-[#f5e9d0] rounded border border-[#caa679] text-[11px]">
                  <strong className="text-red-900 block mb-1">THREAD CONNECTIONS:</strong>
                  <span>Linked by forensic red yarn to node(s): {selectedClue.connections.map(id => `#${id}`).join(', ')}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-[#9c764e]/40">
              <button
                onClick={() => setSelectedClue(null)}
                className="western-btn-gold px-5 py-1.5 text-xs font-bold rounded"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comic Book Style Cinematic Case Presentation */}
      {isPresenting && (
        <CasePresentationModal
          caseRef={caseRef}
          caseData={caseData}
          clues={clues}
          deliberations={deliberations}
          onClose={() => setIsPresenting(false)}
        />
      )}

    </div>
  );
}
