import React, { useState, useEffect, useRef } from 'react';
import { kokoroVoiceEngine } from '../utils/kokoroVoiceEngine.js';
import { bureauAudio } from '../utils/audio.js';
import { 
  Play, Pause, RotateCcw, ChevronLeft, ChevronRight, 
  X, Volume2, Sparkles, CheckCircle2 
} from 'lucide-react';

const OFFICERS_ORDER = [
  {
    id: 'CORTEX',
    name: 'Officer Cortex',
    role: 'Analytical Intelligence Officer',
    badge: 'ANALYTICS',
    avatar: '/avatars/cortex.png',
    accent: '#10b981',
    soundEffect: '💥 *ANOMALY DETECTED*',
    comicTag: 'CORRELATION MATRIX COMPUTED',
    defaultText: (caseTitle, clueCount) => 
      `Attention Bureau officers. I have cross-calculated the probability vectors across all ${clueCount || 5} nodes for case "${caseTitle}". Anomaly indices indicate non-random coordination across the transaction timelines with a 94.2% correlation. The relational link graph confirms our primary suspects intersected at the telegraph terminal prior to the reported incident.`
  },
  {
    id: 'VANGUARD',
    name: 'Officer Vanguard',
    role: 'Intelligence Operations Officer',
    badge: 'INTEL & OSINT',
    avatar: '/avatars/vanguard.png',
    accent: '#f97316',
    soundEffect: '⚡ *OSINT INTERCEPT*',
    comicTag: 'TELEGRAPH WIRETAP & TRANSIT CORRIDORS',
    defaultText: (caseTitle) => 
      `Vanguard here from field ops. Public registries, shipping manifests, and wire intercepts confirm suspect movements matching Cortex's anomaly vectors. We tracked transit coordinates across the district boundary where an unscheduled cargo crate was cleared. The ciphered telegraph ribbons directly corroborate the presence of unauthorized operatives on site.`
  },
  {
    id: 'LUTKIN',
    name: 'Officer Lutkin',
    role: 'Forensic Intelligence Officer',
    badge: 'FORENSICS',
    avatar: '/avatars/lutkin.png',
    accent: '#00d2ff',
    soundEffect: '🔬 *CRYPTOGRAPHIC FORENSICS*',
    comicTag: 'SHA-256 & CHEMICAL FORGERY FORENSICS',
    defaultText: (caseTitle) => 
      `Forensics division reporting. Cryptographic SHA-256 hashes on all intake artifacts have been verified with zero byte tampering. Microscopic tool mark analysis on the security latch proves the locking tumblers were operated from within using an authentic supervisor master key with zero forced entry, and document ink chromatography proves the register signatures were chemically forged.`
  },
  {
    id: 'APEX',
    name: 'Detective Apex',
    role: 'Deputy Investigation Officer',
    badge: 'DEPUTY',
    avatar: '/avatars/apex.png',
    accent: '#a855f7',
    soundEffect: '⚔️ *CONTRARIAN SCRUTINY*',
    comicTag: 'ADVERSARIAL STRESS-TEST & CROSS-EXAM',
    defaultText: (caseTitle) => 
      `Hold your horses, squad. As deputy reviewer, I cross-examined every working theory. I challenged whether the courier was being framed as a decoy, and stress-tested the timeline against defense counsel objections. The defense claims an outsider breached the perimeter, but the master key markings and altered night patrol logs prove the inside job hypothesis holds water!`
  },
  {
    id: 'ARGUS',
    name: 'Detective Argus',
    role: 'Chief Investigation Officer',
    badge: 'CHIEF',
    avatar: '/avatars/argus.png',
    accent: '#f59e0b',
    soundEffect: '🏆 *FINAL VERDICT & CULPRIT UNMASKED*',
    comicTag: 'BUREAU VERDICT RENDERED · CASE RESOLVED',
    defaultText: (caseTitle) => 
      `As Chief Investigation Officer, I have evaluated all evidence presented by my four specialists. First, auditing for any overlooked information: every clock skew, wire intercept frequency, lock tumbler mark, and financial cluster has been accounted for. No detail was left behind. By joining all four intelligence vectors, the conclusion of ARGUS and Co. is definitive: the primary culprit behind "${caseTitle}" is the trusted inside supervisor acting in premeditated conspiracy with the external courier! Their motive was financial liquidation prior to audit. Executive apprehension warrants are hereby dispatched. Case officially resolved!`
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
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const activeOfficer = OFFICERS_ORDER[currentStep];
  const caseTitle = caseData?.title || caseRef || 'The Investigation';

  // Find if officer has a specific message in deliberations
  const getSpeechText = (officer) => {
    if (deliberations && deliberations.length > 0) {
      const match = deliberations.find(d => {
        const matchesOfficer = (d.officer && d.officer.toUpperCase() === officer.id) ||
                               (d.officer_name && d.officer_name.toUpperCase().includes(officer.id));
        const isNotCorrupted = officer.id === 'ARGUS' || !d.message.includes('[DETECTIVE ARGUS');
        return matchesOfficer && isNotCorrupted;
      });
      if (match && match.message && match.message.length > 30) {
        return match.message;
      }
    }
    return officer.defaultText(caseTitle, clues.length);
  };

  const currentText = getSpeechText(activeOfficer);

  // Trigger speech when step changes
  useEffect(() => {
    bureauAudio.typewriterClick();
    kokoroVoiceEngine.speak(activeOfficer.id, currentText, {
      onStart: () => setIsSpeaking(true),
      onWord: (charIdx) => setActiveWordIndex(charIdx),
      onEnd: () => {
        setIsSpeaking(false);
        if (autoAdvance && currentStep < OFFICERS_ORDER.length - 1) {
          setTimeout(() => {
            setCurrentStep(prev => prev + 1);
          }, 1200);
        }
      },
      onError: () => setIsSpeaking(false)
    });

    return () => {
      kokoroVoiceEngine.stop();
    };
  }, [currentStep, autoAdvance]);

  const handleNext = () => {
    bureauAudio.telegraphBeep();
    if (currentStep < OFFICERS_ORDER.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      kokoroVoiceEngine.stop();
      onClose();
    }
  };

  const handlePrev = () => {
    bureauAudio.telegraphBeep();
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReplay = () => {
    bureauAudio.cameraShutter();
    kokoroVoiceEngine.speak(activeOfficer.id, currentText, {
      onStart: () => setIsSpeaking(true),
      onWord: (charIdx) => setActiveWordIndex(charIdx),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const handleClose = () => {
    kokoroVoiceEngine.stop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      
      {/* Comic Book Frame Container */}
      <div 
        className="w-full max-w-4xl bg-[#f5ead2] text-[#1c1209] rounded-lg border-4 border-black shadow-[14px_14px_0px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh] relative"
        style={{
          backgroundImage: `
            radial-gradient(#d1b78c 1px, transparent 1px),
            radial-gradient(#d1b78c 1px, #f5ead2 1px)
          `,
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 8px 8px'
        }}
      >
        
        {/* Top Comic Action Header Banner */}
        <div 
          className="p-3 sm:p-4 border-b-4 border-black flex items-center justify-between shadow-md"
          style={{ backgroundColor: activeOfficer.accent }}
        >
          <div className="flex items-center gap-3">
            <span className="bg-black text-white font-rye px-2.5 py-1 text-xs tracking-wider rounded-sm shadow uppercase transform -rotate-1">
              PANEL {currentStep + 1} OF 5
            </span>
            <div className="text-black font-extrabold font-rye text-base sm:text-lg tracking-wider drop-shadow-sm flex items-center gap-2">
              <span>{activeOfficer.soundEffect}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-black text-white font-bold flex items-center justify-center border-2 border-white hover:bg-red-800 transition-colors shadow"
              title="Close Presentation"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Comic Panel Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
          
          {/* Main Character Spotlight & Dialogue Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            {/* Officer Portrait in Comic Border */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative group">
                {/* Comic Ink Drop Shadow Box */}
                <div 
                  className="w-44 h-56 sm:w-52 sm:h-64 rounded-md border-4 border-black bg-[#1b120a] shadow-[8px_8px_0px_#000] overflow-hidden relative"
                >
                  <img
                    src={activeOfficer.avatar}
                    alt={activeOfficer.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Comic sound effect / badge overlay */}
                  <div 
                    className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-rye font-bold text-white rounded border-2 border-black shadow"
                    style={{ backgroundColor: activeOfficer.accent }}
                  >
                    {activeOfficer.badge}
                  </div>

                  {/* Speaking indicator overlay */}
                  {isSpeaking && (
                    <div className="absolute bottom-2 right-2 flex items-end gap-1 px-2 py-1 bg-black/80 rounded border border-white/50">
                      <span className="w-1.5 h-3 bg-amber-400 animate-pulse rounded-full" />
                      <span className="w-1.5 h-5 bg-amber-400 animate-pulse delay-75 rounded-full" />
                      <span className="w-1.5 h-2 bg-amber-400 animate-pulse delay-150 rounded-full" />
                      <span className="w-1.5 h-4 bg-amber-400 animate-pulse rounded-full" />
                    </div>
                  )}
                </div>
              </div>

              {/* Officer Title Banner */}
              <div className="mt-2.5 text-center">
                <h3 className="font-rye text-base text-[#24170f] font-bold leading-tight">
                  {activeOfficer.name}
                </h3>
                <p className="font-elite text-xs text-[#523720] font-semibold mt-0.5">
                  {activeOfficer.role}
                </p>
              </div>
            </div>

            {/* Comic Speech Bubble */}
            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="relative bg-white text-[#1c1209] p-5 sm:p-6 rounded-2xl border-4 border-black shadow-[8px_8px_0px_#000]">
                
                {/* Speech Bubble Pointer Triangle */}
                <div 
                  className="hidden md:block absolute -left-5 top-12 w-0 h-0 border-y-[14px] border-y-transparent border-r-[22px] border-r-black"
                />
                <div 
                  className="hidden md:block absolute -left-3.5 top-12 w-0 h-0 border-y-[12px] border-y-transparent border-r-[20px] border-r-white"
                />

                {/* Comic Tag Topline */}
                <div className="flex items-center justify-between border-b-2 border-dashed border-gray-400 pb-2 mb-3">
                  <span className="text-[10px] font-rye font-bold tracking-wider text-gray-700 uppercase">
                    {activeOfficer.comicTag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-900 font-bold">
                    <Volume2 size={15} className={isSpeaking ? 'text-amber-600 animate-bounce' : 'text-gray-400'} />
                    <span className="font-elite text-[11px]">{isSpeaking ? 'Voicing Testimony...' : 'Audio Ready'}</span>
                  </div>
                </div>

                {/* Dialogue Text in Comic Font */}
                <div className="text-sm sm:text-base font-elite font-bold leading-relaxed text-[#140c06] whitespace-pre-wrap max-h-[220px] overflow-y-auto pr-2">
                  "{currentText}"
                </div>

                {/* Case Reference Footer */}
                <div className="mt-3 pt-2 border-t border-gray-300 flex items-center justify-between text-[10px] font-mono-code text-gray-600">
                  <span>ARGUS & CO. PRESENTATION ENGINE</span>
                  <span>CASE: {caseRef}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Officer Navigation Thumbnails Row */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            {OFFICERS_ORDER.map((off, idx) => {
              const isCurrent = idx === currentStep;
              return (
                <button
                  key={off.id}
                  onClick={() => {
                    bureauAudio.telegraphBeep();
                    setCurrentStep(idx);
                  }}
                  className={`p-1.5 rounded border-2 transition-all flex items-center gap-2 ${
                    isCurrent 
                      ? 'bg-black text-white border-black shadow-md scale-105' 
                      : 'bg-[#ebdcc0] text-[#301c10] border-[#8a5d35] hover:bg-[#e2cead]'
                  }`}
                >
                  <img
                    src={off.avatar}
                    alt={off.name}
                    className="w-8 h-8 rounded object-cover border border-white flex-shrink-0"
                  />
                  <div className="text-left hidden sm:block truncate">
                    <span className="block text-[8px] font-bold uppercase truncate" style={{ color: isCurrent ? off.accent : '#5e3e26' }}>
                      {off.badge}
                    </span>
                    <strong className="block text-[10px] font-rye truncate leading-none">
                      {off.name.split(' ')[1]}
                    </strong>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Comic Presentation Control Footer */}
        <div className="p-3 sm:p-4 bg-[#21140c] border-t-4 border-black flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReplay}
              className="western-btn text-xs py-1.5 px-3 flex items-center gap-1.5"
              title="Replay Voice Testimony"
            >
              <RotateCcw size={13} />
              <span>Replay Voice</span>
            </button>

            <label className="flex items-center gap-1.5 text-xs font-elite text-[#ebdcc0] cursor-pointer pl-2">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(e) => setAutoAdvance(e.target.checked)}
                className="rounded border-[#8a5d35] text-amber-600 focus:ring-amber-500"
              />
              <span>Auto-advance to next officer</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`px-3 py-1.5 rounded text-xs font-elite font-bold flex items-center gap-1 border transition-all ${
                currentStep === 0 
                  ? 'opacity-40 cursor-not-allowed border-gray-600 text-gray-400' 
                  : 'bg-[#3b2516] hover:bg-[#52331e] text-[#f7e6ca] border-[#8a5d35]'
              }`}
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="western-btn-gold text-xs py-1.5 px-4 font-bold flex items-center gap-1.5 shadow"
            >
              <span>{currentStep === OFFICERS_ORDER.length - 1 ? 'Conclude Presentation ✓' : 'Next Officer'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

