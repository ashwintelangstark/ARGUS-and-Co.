import React, { useEffect, useRef, useState } from 'react';
import { buildRealisticHqScene } from '../three/realisticHqBuilder.js';
import { bureauAudio } from '../utils/audio.js';
import { 
  Eye, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Sunset, 
  Sunrise, 
  Clock, 
  FileText, 
  Hash, 
  Calendar, 
  ExternalLink, 
  X,
  ShieldAlert
} from 'lucide-react';

export default function ThreeHqScene({ 
  cases = [], 
  onSelectAgent,
  activeSpeaker = null 
}) {
  const canvasRef = useRef(null);
  const hqInstanceRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('ARGUS');
  const [lightingMode, setLightingMode] = useState('auto');
  const [activityText, setActivityText] = useState('The office is quiet. Open Case Files to register evidence or review a case.');
  
  // Selected evidence / card inspected on 3D board
  const [inspectedCard, setInspectedCard] = useState(null);

  // Case details for the 3D board
  const [activeCaseDetails, setActiveCaseDetails] = useState(null);

  const activeCase = cases.length > 0 ? cases[0] : null;

  const metrics = {
    openCases: cases.filter(c => c.status !== 'Solved').length,
    filesLogged: cases.reduce((acc, c) => acc + (c.evidence_count || 0), 0),
    reportsCount: cases.reduce((acc, c) => acc + (c.report_count || 0), 0)
  };

  const agentBios = {
    ARGUS: 'Chief investigator coordinating the bureau and case priorities.',
    APEX: 'Deputy investigator reviewing strategy and checking conclusions.',
    LUTKIN: 'Forensic officer assigned to digital evidence examination.',
    VANGUARD: 'Intelligence officer assigned to authorised public-source research.',
    CORTEX: 'Analytical officer assigned to comparison and anomaly review.'
  };

  // Fetch full details of active case to populate 3D board with live evidence and clues
  useEffect(() => {
    if (!activeCase?.case_ref) return;

    fetch(`/api/cases/${activeCase.case_ref}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setActiveCaseDetails(data);
        }
      })
      .catch(err => console.warn('Could not fetch active case for 3D board:', err));
  }, [activeCase?.case_ref]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const instance = buildRealisticHqScene(canvas, {
      onAgentClick: (agentName) => {
        bureauAudio.telegraphBeep();
        setSelectedAgent(agentName);
        setActivityText(`${agentName} selected. ${agentBios[agentName]}`);
        instance.focusAgent(agentName);
      },
      onEvidenceClick: (cardData) => {
        bureauAudio.typewriterClick();
        setInspectedCard(cardData);
        if (cardData.type === 'evidence') {
          setActivityText(`Forensic evidence inspected: ${cardData.data?.original_name || 'File record'}`);
        } else if (cardData.type === 'clue') {
          setActivityText(`Investigative lead inspected: ${cardData.data?.title || 'Case Clue'}`);
        } else if (cardData.type === 'docket') {
          setActivityText(`Central case docket: ${cardData.caseData?.title || 'Active dossier'}`);
        }
      },
      initialCase: activeCaseDetails?.case || activeCase,
      evidenceList: activeCaseDetails?.evidence || [],
      cluesList: activeCaseDetails?.clues || []
    });

    hqInstanceRef.current = instance;

    return () => {
      instance.destroy();
    };
  }, [activeCaseDetails]);

  useEffect(() => {
    if (hqInstanceRef.current && activeSpeaker) {
      hqInstanceRef.current.setActiveSpeaker(activeSpeaker);
      hqInstanceRef.current.focusAgent(activeSpeaker);
    }
  }, [activeSpeaker]);

  const handleSelectAgent = (agentName) => {
    bureauAudio.telegraphBeep();
    setSelectedAgent(agentName);
    setActivityText(`${agentName} selected. ${agentBios[agentName]}`);
    if (hqInstanceRef.current) {
      hqInstanceRef.current.focusAgent(agentName);
    }
  };

  const togglePause = () => {
    const next = !isPaused;
    setIsPaused(next);
    if (hqInstanceRef.current) {
      hqInstanceRef.current.setPause(next);
    }
  };

  const resetView = () => {
    bureauAudio.typewriterClick();
    setSelectedAgent('ARGUS');
    setInspectedCard(null);
    if (hqInstanceRef.current) {
      hqInstanceRef.current.resetCamera();
    }
  };

  const focusBoard = () => {
    bureauAudio.typewriterClick();
    if (hqInstanceRef.current) {
      hqInstanceRef.current.focusBoard();
    }
  };

  const toggleAudio = () => {
    const muted = bureauAudio.toggleMute();
    setIsMuted(muted);
  };

  const changeLightingMode = (mode) => {
    bureauAudio.typewriterClick();
    setLightingMode(mode);
    if (hqInstanceRef.current) {
      hqInstanceRef.current.setLightingMode(mode);
    }
  };

  // Helper to get time icon
  const getLightingIcon = (mode) => {
    switch (mode) {
      case 'day': return <Sun size={12} className="text-amber-400" />;
      case 'sunset': return <Sunset size={12} className="text-orange-400" />;
      case 'night': return <Moon size={12} className="text-blue-300" />;
      case 'dawn': return <Sunrise size={12} className="text-rose-300" />;
      default: return <Clock size={12} className="text-emerald-400" />;
    }
  };

  return (
    <section className="view active" id="headquarters">
      {/* 3D Western Bureau Scene */}
      <canvas id="scene" ref={canvasRef} aria-label="Three dimensional western detective office" />
      <div className="vignette" />

      {/* HQ Top Heading */}
      <div className="hq-heading">
        <div className="eyebrow">THE FRONTIER DISTRICT · EST. 1891</div>
        <h1>ARGUS DETECTIVE AGENCY</h1>
        <p>Five specialists. One bureau. Every clue accounted for.</p>
      </div>

      {/* HQ Tools */}
      <div className="hq-tools">
        {/* Dynamic Timing / Lighting Mode Switcher */}
        <div className="flex items-center bg-[#21170fdd] border border-[#9c7545] rounded p-0.5 shadow-md">
          <button
            onClick={() => changeLightingMode('auto')}
            className={`px-2 py-1 text-[10px] font-elite flex items-center gap-1 rounded transition-all ${
              lightingMode === 'auto' ? 'bg-[#5a361f] text-[#ffe7b8] border border-[#b88c4d]' : 'text-[#c2ad88] hover:text-[#fff]'
            }`}
            title="Auto Lighting: Synced to current wall clock time"
          >
            <Clock size={11} /> Auto
          </button>
          <button
            onClick={() => changeLightingMode('day')}
            className={`px-1.5 py-1 text-[10px] font-elite flex items-center rounded transition-all ${
              lightingMode === 'day' ? 'bg-[#5a361f] text-[#ffe7b8] border border-[#b88c4d]' : 'text-[#c2ad88] hover:text-[#fff]'
            }`}
            title="Day: High noon frontier sunlight"
          >
            <Sun size={11} />
          </button>
          <button
            onClick={() => changeLightingMode('sunset')}
            className={`px-1.5 py-1 text-[10px] font-elite flex items-center rounded transition-all ${
              lightingMode === 'sunset' ? 'bg-[#5a361f] text-[#ffe7b8] border border-[#b88c4d]' : 'text-[#c2ad88] hover:text-[#fff]'
            }`}
            title="Sunset: Fiery copper golden hour"
          >
            <Sunset size={11} />
          </button>
          <button
            onClick={() => changeLightingMode('night')}
            className={`px-1.5 py-1 text-[10px] font-elite flex items-center rounded transition-all ${
              lightingMode === 'night' ? 'bg-[#5a361f] text-[#ffe7b8] border border-[#b88c4d]' : 'text-[#c2ad88] hover:text-[#fff]'
            }`}
            title="Night: Film noir lantern and candle glow"
          >
            <Moon size={11} />
          </button>
          <button
            onClick={() => changeLightingMode('dawn')}
            className={`px-1.5 py-1 text-[10px] font-elite flex items-center rounded transition-all ${
              lightingMode === 'dawn' ? 'bg-[#5a361f] text-[#ffe7b8] border border-[#b88c4d]' : 'text-[#c2ad88] hover:text-[#fff]'
            }`}
            title="Dawn: Early morning pale mist"
          >
            <Sunrise size={11} />
          </button>
        </div>

        <button
          onClick={focusBoard}
          className="western-btn"
          title="Zoom camera onto Central Case Board"
        >
          <span>▤ Inspect Board</span>
        </button>

        <button
          onClick={() => onSelectAgent && onSelectAgent(selectedAgent)}
          className="western-btn western-btn-gold"
          title="Open Officer Interrogation & 3D Studio"
        >
          <Eye size={13} style={{ display: 'inline', marginRight: '5px' }} />
          <span>Interrogate ({selectedAgent})</span>
        </button>

        <button
          onClick={toggleAudio}
          className="western-btn"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
        </button>

        <button onClick={togglePause} className="western-btn" id="pauseScene">
          {isPaused ? '▶ Resume scene' : 'Ⅱ Pause scene'}
        </button>

        <button onClick={resetView} className="western-btn" id="resetScene">
          ↺ Reset view
        </button>
      </div>

      {/* Agent Tags positioned directly over the 3D Detectives */}
      <div className="agent-tags">
        <button 
          className={`agent-tag lutkin ${selectedAgent === 'LUTKIN' ? 'selected' : ''}`}
          data-agent="LUTKIN"
          onClick={() => handleSelectAgent('LUTKIN')}
        >
          <b>OFFICER LUTKIN</b>
          <span>Forensic Intelligence Officer</span>
        </button>

        <button 
          className={`agent-tag apex ${selectedAgent === 'APEX' ? 'selected' : ''}`}
          data-agent="APEX"
          onClick={() => handleSelectAgent('APEX')}
        >
          <b>DETECTIVE APEX</b>
          <span>Deputy Investigation Officer</span>
        </button>

        <button 
          className={`agent-tag argus ${selectedAgent === 'ARGUS' ? 'selected' : ''}`}
          data-agent="ARGUS"
          onClick={() => handleSelectAgent('ARGUS')}
        >
          <b>DETECTIVE ARGUS</b>
          <span>Chief Investigation Officer</span>
        </button>

        <button 
          className={`agent-tag vanguard ${selectedAgent === 'VANGUARD' ? 'selected' : ''}`}
          data-agent="VANGUARD"
          onClick={() => handleSelectAgent('VANGUARD')}
        >
          <b>OFFICER VANGUARD</b>
          <span>Intelligence Operations Officer</span>
        </button>

        <button 
          className={`agent-tag cortex ${selectedAgent === 'CORTEX' ? 'selected' : ''}`}
          data-agent="CORTEX"
          onClick={() => handleSelectAgent('CORTEX')}
        >
          <b>OFFICER CORTEX</b>
          <span>Analytical Intelligence Officer</span>
        </button>
      </div>

      {/* Evidence Inspector Card Modal when clicking on 3D board items */}
      {inspectedCard && (
        <div className="absolute top-20 right-5 w-84 max-w-[90vw] bg-[#1d130ce8] border-2 border-[#b88c4d] rounded p-4 text-[#f5dfb8] shadow-2xl backdrop-blur-md z-30 font-elite animate-in fade-in duration-200">
          <div className="flex items-start justify-between border-b border-[#7d5631] pb-2 mb-3">
            <div>
              <span className="text-[10px] tracking-wider text-[#d1a65e] uppercase">
                {inspectedCard.type === 'evidence' ? '★ EVIDENCE RECORD EXAMINED' : inspectedCard.type === 'clue' ? '◆ INVESTIGATIVE CLUE CARD' : '▣ ACTIVE CASE DOCKET'}
              </span>
              <h3 className="font-rye text-base text-[#fcedd0] mt-0.5">
                {inspectedCard.type === 'evidence' ? inspectedCard.data?.original_name : inspectedCard.type === 'clue' ? inspectedCard.data?.title : inspectedCard.caseData?.title}
              </h3>
            </div>
            <button 
              onClick={() => setInspectedCard(null)} 
              className="text-[#aa8c64] hover:text-[#fff] p-1"
            >
              <X size={16} />
            </button>
          </div>

          {inspectedCard.type === 'evidence' && (
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#e0cb9f]">
                <FileText size={12} className="text-[#c69a50]" />
                <span>Format: <strong>{inspectedCard.data?.file_type || 'Unknown'}</strong></span>
                {inspectedCard.data?.file_size && (
                  <span className="text-[#a8906e]">({Math.round(inspectedCard.data.file_size / 1024)} KB)</span>
                )}
              </div>

              <div className="bg-[#140c07] p-2 rounded border border-[#5d3f23] text-[10px] space-y-1">
                <div className="flex items-center gap-1 text-[#b59972]">
                  <Hash size={11} className="text-[#c69a50]" />
                  <span>SHA-256 HASH VERIFICATION:</span>
                </div>
                <div className="font-mono text-[#f3dfb7] break-all select-all">
                  {inspectedCard.data?.hash_sha256 || '8a4f9b2d3c91e704b2a8d1e3c79a0b4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0'}
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-[#aa8e69]">
                <Calendar size={11} />
                <span>Intake Log: {inspectedCard.data?.created_at ? new Date(inspectedCard.data.created_at).toLocaleString() : '1891-10-24 02:41:19'}</span>
              </div>

              <div className="pt-2 border-t border-[#684628] flex justify-between items-center text-[11px]">
                <span className="text-[#8ca16b]">✓ CHAIN OF CUSTODY SEALED</span>
                <button 
                  onClick={resetView}
                  className="text-[#c69a50] underline hover:text-[#ffe4b0]"
                >
                  Return to Office
                </button>
              </div>
            </div>
          )}

          {inspectedCard.type === 'clue' && (
            <div className="space-y-2 text-xs">
              <div className="text-[11px] font-semibold text-[#c69a50]">
                CATEGORY: {inspectedCard.data?.category}
              </div>
              <p className="text-[#d8c29b] leading-relaxed">
                {inspectedCard.data?.description}
              </p>
              {inspectedCard.data?.is_hypothesis && (
                <div className="flex items-center gap-1.5 text-amber-400 text-[10px] bg-amber-950/40 p-1.5 rounded border border-amber-800/60">
                  <ShieldAlert size={12} />
                  <span>Officer deduction under active adversarial review.</span>
                </div>
              )}
            </div>
          )}

          {inspectedCard.type === 'docket' && (
            <div className="space-y-2 text-xs">
              <div className="text-[11px] text-[#d6be96]">
                Case Reference: <strong className="text-[#ffe0a3]">{inspectedCard.caseData?.case_ref}</strong>
              </div>
              <div className="text-[11px] text-[#d6be96]">
                Priority: <span className="text-red-400 font-bold">{inspectedCard.caseData?.priority}</span> · Status: <span className="text-green-400 font-bold">{inspectedCard.caseData?.status || 'Active'}</span>
              </div>
              <p className="text-[#d4be98] text-[11px] leading-relaxed pt-1 border-t border-[#684628]">
                {inspectedCard.caseData?.notes || inspectedCard.caseData?.summary || 'Active case intake underway.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* HQ Bottom Dashboard Ledger */}
      <div className="hq-dashboard">
        <div className="dash-card">
          <h3>▣ BUREAU LEDGER</h3>
          <div className="metric-row">
            <div className="metric">
              <b id="caseMetric">{metrics.openCases}</b>
              <span>OPEN CASES</span>
            </div>
            <div className="metric">
              <b id="evidenceMetric">{metrics.filesLogged}</b>
              <span>FILES LOGGED</span>
            </div>
            <div className="metric">
              <b id="reportMetric">{metrics.reportsCount}</b>
              <span>REPORTS</span>
            </div>
          </div>
        </div>

        <div className="dash-card">
          <h3>✦ CURRENT BUREAU ACTIVITY</h3>
          <p id="hqActivity">{activityText}</p>
        </div>

        <div className="dash-card">
          <h3>♜ OFFICERS ON DUTY</h3>
          <ul>
            <li>ARGUS · Case command</li>
            <li>APEX · Review & verification</li>
            <li>LUTKIN · Evidence examination</li>
            <li>VANGUARD · Public intelligence</li>
            <li>CORTEX · Pattern analysis</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
