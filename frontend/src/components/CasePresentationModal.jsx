import React, { useState, useEffect, useRef } from 'react';
import { kokoroVoiceEngine } from '../utils/kokoroVoiceEngine.js';
import { bureauAudio } from '../utils/audio.js';
import { cleanSpokenText, cleanPresentationText } from '../utils/bureauTextFormatter.jsx';
import { 
  RotateCcw, ChevronLeft, ChevronRight, 
  X, Volume2, Shield, Award, CheckCircle2,
  FileText, Activity
} from 'lucide-react';

const OFFICERS_ORDER = [
  {
    id: 'CORTEX',
    name: 'Officer Cortex',
    role: 'Analytical Intelligence Officer',
    badge: 'ANALYTICS',
    avatar: '/avatars/cortex.png',
    accent: '#10b981',
    cadenceTag: 'PROBABILITY MATRICES & ANOMALY CORRELATION',
    specialty: 'Algorithmic correlation of transaction timelines, anomaly vectors, and relational suspect graphs.',
    defaultText: (caseTitle, clueCount) => 
      `Attention Bureau officers. I have calculated the Means, Motive, and Opportunity correlation matrix across the evidence register for "${caseTitle}". Anomaly indices indicate non-random coordination across the timeline with a 98.4% probability of premeditated execution. The relational link graph confirms our primary suspect used the corridor maintenance interval to access the scene unseen.`
  },
  {
    id: 'VANGUARD',
    name: 'Officer Vanguard',
    role: 'Intelligence Operations Officer',
    badge: 'INTEL & OSINT',
    avatar: '/avatars/vanguard.png',
    accent: '#f97316',
    cadenceTag: 'FIELD OPERATIONS & WITNESS INTERVIEWS',
    specialty: 'Witness statements, movement timelines, corridor surveillance, and transit routes.',
    defaultText: (caseTitle) => 
      `Officer Vanguard reporting from the field. Cross-referencing all witness statements for "${caseTitle}" reveals an immediate alibi collapse. While business associate Rowan Pike claims he was among guests, he cannot name a single witness during the critical reception interval. Meanwhile, Trustee Celeste Hart placed a figure matching his stature at the private corridor entrance.`
  },
  {
    id: 'LUTKIN',
    name: 'Officer Lutkin',
    role: 'Forensic Intelligence Officer',
    badge: 'FORENSICS',
    avatar: '/avatars/lutkin.png',
    accent: '#00d2ff',
    cadenceTag: 'DIGITAL HASHES & PHYSICAL FORENSICS',
    specialty: 'Cryptographic SHA-256 verification, tool mark analysis, and physical exhibit forensics.',
    defaultText: (caseTitle) => 
      `Forensics division reporting. Examination of physical exhibits for "${caseTitle}" proves unforced interior entry. Exhibit E-012 shows the service door latch was left disengaged, coinciding with camera recording gap E-001. Most critically, Exhibit E-011—the gallery wall clock—was manually altered to stage a false time of death, and summons note E-005 lured the victim into isolation.`
  },
  {
    id: 'APEX',
    name: 'Detective Apex',
    role: 'Deputy Investigation Officer',
    badge: 'DEPUTY',
    avatar: '/avatars/apex.png',
    accent: '#a855f7',
    cadenceTag: 'ADVERSARIAL STRESS-TEST & RED-TEAM AUDIT',
    specialty: 'Contrarian hypothesis testing, confirmation bias defense, and adversarial scrutiny.',
    defaultText: (caseTitle) => 
      `As Deputy Review Officer, I cross-examined every alibi for "${caseTitle}". An outside intruder theory fails completely because all exterior entrances were guarded. Look at maintenance technician Tomas Reed's statement: unprompted, he denied touching the gallery wall clock before investigators even mentioned it! That guilty knowledge destroys their defense.`
  },
  {
    id: 'ARGUS',
    name: 'Detective Argus',
    role: 'Chief Investigation Officer',
    badge: 'CHIEF',
    avatar: '/avatars/argus.png',
    accent: '#f59e0b',
    cadenceTag: 'CHIEF VERDICT & CULPRIT APPREHENSION DIRECTIVE',
    specialty: 'Synthesis of all 4 investigative branches, auditing for omitted clues, and definitive case closure.',
    defaultText: (caseTitle) => 
      `As Chief Investigation Officer, I have evaluated all empirical evidence and testimonies for "${caseTitle}". The conclusion of ARGUS and Co. is definitive and proven beyond reasonable doubt: the primary culprit is Rowan Pike, with maintenance technician Tomas Reed as inside facilitator! Pike acted to silence Adrian Vale before the gala announcement exposed his financial liabilities. Executive apprehension warrants are hereby dispatched. Case officially solved!`
  }
];

export default function CasePresentationModal({
  caseRef,
  caseData,
  clues = [],
  deliberations = [],
  onClose
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);

  const advanceTimerRef = useRef(null);
  const autoAdvanceRef = useRef(autoAdvance);

  // Keep autoAdvance ref in sync without re-triggering speech
  useEffect(() => {
    autoAdvanceRef.current = autoAdvance;
  }, [autoAdvance]);

  // Clamp step safely
  const safeStep = Math.max(0, Math.min(currentStep, OFFICERS_ORDER.length - 1));
  const activeOfficer = OFFICERS_ORDER[safeStep] || OFFICERS_ORDER[0];
  const caseTitle = caseData?.title || caseRef || 'The Investigation';

  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };

  // Find if officer has a specific message in deliberations
  const getSpeechText = (officer) => {
    if (!officer) return '';
    if (deliberations && Array.isArray(deliberations) && deliberations.length > 0) {
      const match = deliberations.find(d => {
        if (!d || typeof d.message !== 'string') return false;
        const officerStr = typeof d.officer === 'string' ? d.officer.toUpperCase() : '';
        const nameStr = typeof d.officer_name === 'string' ? d.officer_name.toUpperCase() : '';
        const matchesOfficer = officerStr === officer.id || nameStr.includes(officer.id);
        const isNotCorrupted = officer.id === 'ARGUS' || !d.message.includes('[DETECTIVE ARGUS');
        return matchesOfficer && isNotCorrupted;
      });
      if (match && typeof match.message === 'string' && match.message.trim().length > 30) {
        return match.message.trim();
      }
    }
    return typeof officer.defaultText === 'function' ? officer.defaultText(caseTitle, clues?.length || 0) : '';
  };

  const currentRawText = getSpeechText(activeOfficer);
  const spokenText = cleanSpokenText(currentRawText);
  const displayText = cleanPresentationText(currentRawText);

  // Trigger speech when step changes
  useEffect(() => {
    clearAdvanceTimer();
    bureauAudio.typewriterClick();

    kokoroVoiceEngine.speak(activeOfficer.id, spokenText, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        if (autoAdvanceRef.current && safeStep < OFFICERS_ORDER.length - 1) {
          clearAdvanceTimer();
          advanceTimerRef.current = setTimeout(() => {
            setCurrentStep(prev => (prev < OFFICERS_ORDER.length - 1 ? prev + 1 : prev));
          }, 2000);
        }
      },
      onError: () => setIsSpeaking(false)
    });

    return () => {
      clearAdvanceTimer();
      kokoroVoiceEngine.stop();
    };
  }, [safeStep]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      clearAdvanceTimer();
      kokoroVoiceEngine.stop();
    };
  }, []);

  const handleNext = () => {
    clearAdvanceTimer();
    kokoroVoiceEngine.stop();
    bureauAudio.telegraphBeep();

    if (safeStep < OFFICERS_ORDER.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    clearAdvanceTimer();
    kokoroVoiceEngine.stop();
    bureauAudio.telegraphBeep();

    if (safeStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSelectStep = (idx) => {
    if (idx === safeStep) return;
    clearAdvanceTimer();
    kokoroVoiceEngine.stop();
    bureauAudio.telegraphBeep();
    setCurrentStep(idx);
  };

  const handleReplay = () => {
    clearAdvanceTimer();
    kokoroVoiceEngine.stop();
    bureauAudio.cameraShutter();

    kokoroVoiceEngine.speak(activeOfficer.id, spokenText, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        if (autoAdvanceRef.current && safeStep < OFFICERS_ORDER.length - 1) {
          clearAdvanceTimer();
          advanceTimerRef.current = setTimeout(() => {
            setCurrentStep(prev => (prev < OFFICERS_ORDER.length - 1 ? prev + 1 : prev));
          }, 2000);
        }
      },
      onError: () => setIsSpeaking(false)
    });
  };

  const handleClose = () => {
    clearAdvanceTimer();
    kokoroVoiceEngine.stop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      
      {/* Western Noir Bureau Chamber Container */}
      <div className="w-full max-w-4xl bg-[#1b120c] text-[#f4ecd8] rounded-lg border-2 border-[#8b653e] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh] relative">
        
        {/* Western Header Ribbon */}
        <div className="px-4 py-3 bg-gradient-to-r from-[#2a170d] via-[#1c1008] to-[#2a170d] border-b-2 border-[#805a34] flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#e5be7a] via-[#c69a50] to-[#784e1b] flex items-center justify-center border border-[#ffe3a6] shadow">
              <Shield size={14} className="text-[#2b170c]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-rye text-xs sm:text-sm text-[#f5deb3] tracking-wide">
                  ARGUS & CO. · DETECTIVE BUREAU CHAMBER
                </span>
                <span className="text-[10px] font-elite px-2 py-0.5 rounded bg-[#3b2314] text-[#ffd899] border border-[#7a4e28]">
                  OFFICER {safeStep + 1} OF 5
                </span>
              </div>
              <p className="text-[10px] font-elite text-[#bd9f6f]">
                Sequential Multi-Agent Forensic Testimony & Executive Culprit Resolution
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-[#2a1b12] text-[#d4af37] border border-[#7e5832] hover:bg-red-950 hover:text-white transition-colors flex items-center justify-center shadow"
            title="Exit Presentation"
          >
            <X size={15} />
          </button>
        </div>

        {/* Presentation Stage Body */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4 bg-gradient-to-b from-[#180f0a] via-[#150d08] to-[#120a06]">
          
          {/* Main Officer Spotlight & Docket Parchment */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            
            {/* Officer Portrait & Dossier Profile (Left Column) */}
            <div className="md:col-span-4 flex flex-col items-center bg-[#21150d] p-4 rounded-md border border-[#6b4728] shadow-lg justify-between">
              <div className="w-full flex flex-col items-center">
                
                {/* Portrait with Gold Vintage Border */}
                <div className="relative group">
                  <div className="w-40 h-48 sm:w-44 sm:h-52 rounded border-2 border-[#b88c4d] bg-[#120b06] shadow-[0_8px_20px_rgba(0,0,0,0.8)] overflow-hidden relative">
                    <img
                      src={activeOfficer.avatar}
                      alt={activeOfficer.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Officer Division Badge */}
                    <div 
                      className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-rye font-bold text-white rounded border border-black/40 shadow-md"
                      style={{ backgroundColor: activeOfficer.accent }}
                    >
                      {activeOfficer.badge}
                    </div>

                    {/* Acoustic Waveform Overlay */}
                    {isSpeaking && (
                      <div className="absolute bottom-2 right-2 flex items-end gap-1 px-2 py-1 bg-black/85 rounded border border-[#c69a50]/60 shadow">
                        <span className="w-1 h-2.5 bg-amber-400 animate-pulse rounded-full" />
                        <span className="w-1 h-4 bg-amber-400 animate-pulse delay-75 rounded-full" />
                        <span className="w-1 h-2 bg-amber-400 animate-pulse delay-150 rounded-full" />
                        <span className="w-1 h-3.5 bg-amber-400 animate-pulse rounded-full" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Officer Name & Designation */}
                <div className="mt-3 text-center w-full">
                  <h3 className="font-rye text-base text-[#f5deb3] font-bold leading-tight">
                    {activeOfficer.name}
                  </h3>
                  <p className="font-elite text-xs text-[#c4a475] font-semibold mt-0.5">
                    {activeOfficer.role}
                  </p>
                </div>
              </div>

              {/* Acoustic Status & Specialty Footer */}
              <div className="w-full mt-3 pt-3 border-t border-[#54361e] text-[11px] font-elite">
                <div className="flex items-center justify-between text-[#c69a50] mb-1.5">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Volume2 size={13} className={isSpeaking ? 'animate-bounce text-amber-400' : 'text-[#8c6b43]'} />
                    <span>{isSpeaking ? 'Voicing Testimony...' : 'Audio Ready'}</span>
                  </span>
                  <span className="font-mono-code text-[10px] text-[#9c7b4e]">
                    CADENCE ACTIVE
                  </span>
                </div>
                <p className="text-[10px] text-[#a68962] leading-relaxed line-clamp-2">
                  {activeOfficer.specialty}
                </p>
              </div>
            </div>

            {/* Bureau Docket Parchment Scroll (Right Column) */}
            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="relative bg-[#f5ecdb] text-[#1e1209] p-5 sm:p-6 rounded-md border-2 border-[#8b653e] shadow-[0_10px_25px_rgba(0,0,0,0.7)] flex flex-col justify-between h-full">
                
                {/* Parchment Top Docket Header */}
                <div>
                  <div className="flex items-center justify-between border-b-2 border-[#9e764a]/30 pb-2.5 mb-3">
                    <div className="flex items-center gap-2">
                      <FileText size={15} className="text-[#7c532b]" />
                      <span className="text-[11px] font-rye font-bold tracking-wider text-[#4a2e16] uppercase">
                        {activeOfficer.cadenceTag}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-mono-code text-[10px] text-[#694828] bg-[#ebd8b7] px-2 py-0.5 rounded border border-[#caa679]">
                      <span>DOSSIER:</span>
                      <strong className="text-[#3b2312]">{caseRef}</strong>
                    </div>
                  </div>

                  {/* Officer Stage Header Badge */}
                  {safeStep === 4 && (
                    <div className="mb-2 px-3 py-1.5 rounded bg-[#ebd2a0] border border-[#b88c4d] text-[#24170f] flex items-center justify-between shadow-sm">
                      <span className="font-rye text-xs font-bold text-[#422511]">★ BUREAU VERDICT: PRIMARY CULPRIT UNMASKED</span>
                      <span className="text-[10px] font-elite font-bold px-2 py-0.5 rounded bg-[#f59e0b] text-[#1a0f07] shadow-sm">
                        ROWAN PIKE
                      </span>
                    </div>
                  )}

                  {/* Testimony Body Text in Typewriter Style */}
                  <div className="text-sm sm:text-base font-elite font-normal leading-relaxed text-[#23150c] whitespace-pre-wrap max-h-[220px] overflow-y-auto pr-2 scrollbar-thin">
                    "{displayText}"
                  </div>
                </div>

                {/* Docket Bottom Protocol Stamp */}
                <div className="mt-4 pt-3 border-t border-[#9e764a]/30 flex items-center justify-between text-[10px] font-elite text-[#6e4e30]">
                  <div className="flex items-center gap-1.5">
                    <Activity size={12} className="text-[#9e6735]" />
                    <span>ARGUS BUREAU MULTI-AGENT INFERENCE ENGINE</span>
                  </div>
                  <span className="font-mono-code text-[#4a321d]">VERIFIED RECORD · STAGE {safeStep + 1}/5</span>
                </div>
              </div>
            </div>

          </div>

          {/* 5 Officers Progression Tab Bar */}
          <div className="grid grid-cols-5 gap-2 pt-1">
            {OFFICERS_ORDER.map((off, idx) => {
              const isCurrent = idx === safeStep;
              const isPast = idx < safeStep;

              return (
                <button
                  key={off.id}
                  onClick={() => handleSelectStep(idx)}
                  className={`p-2 rounded border transition-all flex items-center gap-2 text-left ${
                    isCurrent 
                      ? 'bg-[#2b1910] text-[#ffe6b8] border-[#c69a50] ring-2 ring-[#c69a50]/40 shadow-lg scale-102' 
                      : 'bg-[#1a110a] text-[#b89a74] border-[#52351e] hover:bg-[#24170e] hover:text-[#faebd7]'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={off.avatar}
                      alt={off.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded object-cover border border-[#8a653d]"
                    />
                    {isPast && (
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                        <CheckCircle2 size={9} />
                      </span>
                    )}
                  </div>

                  <div className="hidden sm:block truncate">
                    <span 
                      className="block text-[8px] font-bold uppercase truncate"
                      style={{ color: isCurrent ? off.accent : '#997652' }}
                    >
                      {off.badge}
                    </span>
                    <strong className="block text-[11px] font-rye truncate leading-none mt-0.5">
                      {off.name.split(' ')[1]}
                    </strong>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Western Action Control Bar (Footer) */}
        <div className="px-4 py-3 bg-[#1e130b] border-t-2 border-[#6f4b2b] flex flex-wrap items-center justify-between gap-3 text-[#f2e2c4]">
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleReplay}
              className="western-btn text-xs py-1.5 px-3 flex items-center gap-1.5 shadow"
              title="Replay Voice Testimony"
            >
              <RotateCcw size={13} />
              <span>Replay Testimony</span>
            </button>

            <label className="flex items-center gap-1.5 text-xs font-elite text-[#cfb288] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(e) => setAutoAdvance(e.target.checked)}
                className="rounded border-[#8a5d35] text-amber-600 focus:ring-amber-500 bg-[#2b170c]"
              />
              <span>Auto-advance after testimony</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={safeStep === 0}
              className={`px-3 py-1.5 rounded text-xs font-elite font-bold flex items-center gap-1 border transition-all ${
                safeStep === 0 
                  ? 'opacity-35 cursor-not-allowed border-[#47301e] text-[#6b5038] bg-[#170e09]' 
                  : 'bg-[#2b1a11] hover:bg-[#3d2417] text-[#faedd4] border-[#7d5633]'
              }`}
            >
              <ChevronLeft size={14} />
              <span>Previous Officer</span>
            </button>

            <button
              onClick={handleNext}
              className="western-btn-gold text-xs py-1.5 px-4 font-bold flex items-center gap-1.5 shadow"
            >
              <span>{safeStep === OFFICERS_ORDER.length - 1 ? 'Conclude Presentation ✓' : 'Next Officer'}</span>
              <ChevronRight size={14} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
