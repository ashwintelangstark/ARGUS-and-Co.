import React, { useEffect, useRef, useState } from 'react';
import { bureauAudio } from '../utils/audio.js';
import { kokoroVoiceEngine } from '../utils/kokoroVoiceEngine.js';
import { Volume2, VolumeX, Mic, ArrowLeft, ArrowRight, Shield, Award, Sparkles } from 'lucide-react';
import '../landing.css';

const DETECTIVES = [
  {
    id: 'ARGUS',
    indexStr: '01',
    name: 'Detective Argus',
    rank: 'Chief Investigation Officer & Bureau Director',
    badge: 'CHIEF OF BUREAU · COMMAND & SYNTHESIS',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    image: '/argus.png',
    quote: 'Cold hard evidence outlives human deceit. We follow facts wherever they lead, and bring order to frontier chaos.',
    speechText: 'Greetings. I am Detective Argus, Chief Investigation Officer of ARGUS and Company. Out here on the frontier, crime evolves faster than the law, but physical evidence never lies. My responsibility is to command this unit, weigh forensic facts against human motive, and coordinate our five specialists into an unshakeable executive verdict. When you commission a case with this bureau, no lead is ignored and no truth stays buried.',
    bio: 'Detective Argus stands as the central pillar, strategic commander, and chief synthesizer of ARGUS & Co. With over two decades of high-stakes frontier investigation experience, Argus bridges the divide between empirical forensic laboratory data and the darker psychological nuances of human criminal intent. Dressed in his iconic chestnut western duster, gold-banded Stetson, and polished brass six-point chief star, Argus directly oversees case intake, resolves operational dependencies among operatives, leads multi-officer conclaves, and authors the official executive reports delivered to magistrates and clients.',
    specialties: [
      'Multi-Agent Conclave Leadership',
      'Motive & Intent Deduction',
      'Forensic & Testimonial Synthesis',
      'Definitive Case Disposition & Executive Verdicts'
    ]
  },
  {
    id: 'APEX',
    indexStr: '02',
    name: 'Detective Apex',
    rank: 'Deputy Investigation Officer & Adversarial Reviewer',
    badge: 'DEPUTY COMMAND · RED-TEAM AUDIT',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    image: '/apex.png',
    quote: 'If an argument cannot survive my cross-examination, it has no business appearing in the final verdict.',
    speechText: 'I am Detective Apex, Deputy Investigation Officer. My role in this bureau is simple: I do not believe a theory until it is proven beyond a shadow of doubt. Before any hypothesis is accepted into the record, I tear it apart. I search for confirmation bias, chain-of-custody gaps, alibi flaws, and alternative suspects that a defense attorney would exploit in open court. If a conclusion survives my audit, only then is it fit for the record.',
    bio: 'Second-in-command and the bureau’s relentless devil’s advocate, Detective Apex is sharp, athletic, and fearlessly skeptical. Tailored in dark crimson vest, bronze lapels, and leather gambler hat, she cross-examines every claim made during the investigation. Apex ensures that the bureau never falls victim to tunnel vision, premature convictions, or circumstantial speculation. Her rigorous counter-analysis stress-tests hypotheses, identifies contradictory evidence, and guarantees that no innocent individual is wrongfully implicated.',
    specialties: [
      'Adversarial Defense Simulation',
      'Chain-of-Custody & Gap Auditing',
      'Alternate Suspect Formulation',
      'Confirmation Bias Mitigation & Cross-Examination'
    ]
  },
  {
    id: 'LUTKIN',
    indexStr: '03',
    name: 'Officer Lutkin',
    rank: 'Forensic Intelligence Officer & Chief Evidence Custodian',
    badge: 'DIGITAL & PHYSICAL FORENSICS',
    accentColor: '#00d2ff',
    glowColor: 'rgba(0, 210, 255, 0.35)',
    image: '/lutkin.png',
    quote: 'Suspects dissemble and memories fade with time. The physical artifact speaks with absolute, unvarnished truth.',
    speechText: 'Officer Lutkin reporting from the forensic laboratory. While witnesses falter, physical and digital artifacts speak with absolute precision. My laboratory examines cryptographic file hashes, audio spectrograms, mechanical clockwork bypasses, altered ink marks, and forensic trace evidence. If a document has been forged or a digital ledger tampered with, my bench will expose it.',
    bio: 'A master of forensic science and digital artifacts, Officer Lutkin presides over the evidence intake bench with unwavering scientific rigor. Behind round spectacles and her brass loupe, Lutkin extracts text from damaged ledgers, performs Fourier transform audio spectrogram analysis, calculates SHA-256 cryptographic hashes for integrity, and validates original files against counterfeit duplicates. Her meticulous laboratory logs and forensic custody records form the unassailable bedrock of every bureau investigation.',
    specialties: [
      'Cryptographic SHA-256 Hashing',
      'Audio Waveform Spectrograms',
      'Document Authenticity & Ink Analysis',
      'Mechanical Vault & Sensor Bypass Forensics'
    ]
  },
  {
    id: 'VANGUARD',
    indexStr: '04',
    name: 'Officer Vanguard',
    rank: 'Intelligence Operations Officer & Field Scout',
    badge: 'FIELD OPERATIONS & OSINT',
    accentColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    image: '/vanguard.png',
    quote: 'You cannot break a syndicate behind a polished desk. Truth leaves a trail across rails, wires, and port manifests.',
    speechText: 'Officer Vanguard, Field Intelligence. You can not break a frontier syndicate sitting behind a polished mahogany desk. I trace suspect movements across railway depots, intercept telegraph ciphers, pull freight manifests at maritime piers, and reconstruct transit timelines. If someone moves money, boards a midnight train, or sends an encrypted wire, I establish the coordinates.',
    bio: 'Rugged, athletic, and tactically pragmatic, Officer Vanguard is the bureau’s operative on the ground. Clad in a leather utility duster with field binoculars and compass, Vanguard monitors regional transit arteries, railway networks, and telegraph switching stations. Vanguard intercepts encrypted telegraph ribbons, verifies shipping logs, identifies syndicate safehouses, and provides real-time situational intelligence on suspect whereabouts and network affiliations.',
    specialties: [
      'Telegraph Wiretap & Cipher Intercept Analysis',
      'Railway, Port & Transit Manifest Reconstruction',
      'Geographical Choke-Point Mapping',
      'Open-Source Public Records & Corporate Registry Tracing'
    ]
  },
  {
    id: 'CORTEX',
    indexStr: '05',
    name: 'Officer Cortex',
    rank: 'Analytical Intelligence Officer & Deductive Prodigy',
    badge: 'ANALYTICS & PATTERN MATRIX',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    image: '/cortex.png',
    quote: 'Coincidence is merely an unanalyzed correlation. The graph reveals the hidden syndicate behind the noise.',
    speechText: 'Officer Cortex online. In a complex investigation, what appears to be random chaos is merely a high-dimensional pattern waiting to be decoded. I map the relationships between suspects, clues, bank drafts, and wire timestamps into dynamic link charts. When statistical anomalies emerge, or when separate cases share hidden harmonic signatures, I isolate the syndicate cluster.',
    bio: 'A computational deduction prodigy, Officer Cortex transforms scattered, disconnected clues into coherent mathematical relationship graphs. Behind thin-rimmed rectangular spectacles and punch-tape ledgers, Cortex analyzes transaction time-deltas, detects carrier wave anomalies, and identifies hidden confederates in financial rings. His deductive link webs allow the bureau to visualize suspect connections and anticipate syndicate operations before they occur.',
    specialties: [
      'Autonomous Deductive Link Graphs & Clue Webs',
      'Temporal Timeline & Transaction Matrices',
      'Statistical Anomaly & Carrier Packet Detection',
      'Syndicate Network Cluster Isolation'
    ]
  }
];

export default function LandingPage({ onEnterAgency, currentUser, onSwitchUser }) {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const sealRef = useRef(null);
  const sheenRef = useRef(null);
  const orbitRef = useRef(null);
  const cardsRef = useRef([]);

  // Detectives Vertical Slides State
  const [selectedDetectiveIndex, setSelectedDetectiveIndex] = useState(0);
  const [speakingOfficerId, setSpeakingOfficerId] = useState(null);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [viewMode, setViewMode] = useState('slide'); // 'slide' | 'all'

  // Coin 3D Physics & Mouse Rotation State
  const animFrameRef = useRef(null);
  const rotState = useRef({
    currentX: 0,
    currentY: 0,
    currentZ: 0,
    targetX: 3,
    targetY: -8,
    targetZ: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartRotX: 0,
    dragStartRotY: 0,
    lastInteractionTime: Date.now()
  });

  useEffect(() => {
    // Enable natural window scrolling while Landing Page is mounted
    document.documentElement.classList.add('landing-active');
    document.body.classList.add('landing-active');

    // -------------------------------------------------------------
    // 1. Dual-Layer Robust Scroll Animations (.reveal & .story-row)
    // -------------------------------------------------------------
    const updateScrollAnimations = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

      // Update scroll progress bar
      const bar = document.getElementById('scrollProgress');
      if (bar) {
        const totalHeight = document.documentElement.scrollHeight - vh;
        const pct = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
        bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
      }

      // Check standard reveals
      const reveals = document.querySelectorAll('.landing-wrapper .reveal');
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.90 && rect.bottom >= 0) {
          el.classList.add('show');
        }
      });

      // Check story progression rows (01 - 09)
      const storyRows = document.querySelectorAll('.landing-wrapper .story-row');
      storyRows.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.92 && rect.bottom >= 0) {
          el.style.transitionDelay = `${Math.min(i % 3, 2) * 85}ms`;
          el.classList.add('visible');
        }
      });
    };

    // IntersectionObserver for reactive triggers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('story-row')) {
              entry.target.classList.add('visible');
            } else {
              entry.target.classList.add('show');
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.landing-wrapper .reveal, .landing-wrapper .story-row').forEach((el) => {
      observer.observe(el);
    });

    // Run immediately and attach scroll listeners
    updateScrollAnimations();
    const timer1 = setTimeout(updateScrollAnimations, 60);
    const timer2 = setTimeout(updateScrollAnimations, 250);
    window.addEventListener('scroll', updateScrollAnimations, { passive: true });
    window.addEventListener('resize', updateScrollAnimations, { passive: true });

    // -------------------------------------------------------------
    // 2. 3D Coin Mouse Rotation & Drag Physics Loop
    // -------------------------------------------------------------
    const tickCoin = () => {
      const state = rotState.current;
      const now = Date.now();

      // Ambient breathing float if user is idle for > 800ms and not dragging
      if (!state.isDragging && now - state.lastInteractionTime > 800) {
        const t = now * 0.0014;
        const ambX = Math.sin(t * 1.4) * 8;
        const ambY = Math.cos(t * 1.1) * 12;
        state.targetX += (ambX - state.targetX) * 0.02;
        state.targetY += (ambY - state.targetY) * 0.02;
        state.targetZ += (-state.targetZ) * 0.02;
      }

      // Smooth damping interpolation (lerp)
      const lerpFactor = state.isDragging ? 0.22 : 0.085;
      state.currentX += (state.targetX - state.currentX) * lerpFactor;
      state.currentY += (state.targetY - state.currentY) * lerpFactor;
      state.currentZ += (state.targetZ - state.currentZ) * lerpFactor;

      // Update 3D Coin Transform
      if (sealRef.current) {
        sealRef.current.style.transform = `rotateX(${state.currentX.toFixed(2)}deg) rotateY(${state.currentY.toFixed(2)}deg) rotateZ(${state.currentZ.toFixed(2)}deg)`;

        // Dynamic 3D rim drop shadows shifting with light angle
        const shadowX = -state.currentY * 0.95;
        const shadowY = 38 + state.currentX * 0.85;
        sealRef.current.style.boxShadow = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 75px rgba(0,0,0,0.85), 0 0 55px rgba(213, 164, 91, 0.25)`;
      }

      // Dynamic Metallic Specular Light Reflection
      if (sheenRef.current) {
        const lightX = 50 + (state.currentY / 50) * 35;
        const lightY = 35 + (-state.currentX / 40) * 35;
        sheenRef.current.style.background = `radial-gradient(circle at ${lightX.toFixed(1)}% ${lightY.toFixed(1)}%, rgba(255, 238, 185, 0.5) 0%, rgba(213, 164, 91, 0.18) 35%, transparent 68%)`;
      }

      // Dynamic Orbit Parallax
      if (orbitRef.current) {
        orbitRef.current.style.transform = `rotateX(${(65 - state.currentX * 0.35).toFixed(2)}deg) rotateZ(${(-25 + state.currentY * 0.5).toFixed(2)}deg)`;
      }

      // Floating Cards Parallax
      if (cardsRef.current) {
        cardsRef.current.forEach((card, idx) => {
          if (!card) return;
          const factor = (idx + 1) * 0.35;
          card.style.transform = `translate3d(${(-state.currentY * factor).toFixed(1)}px, ${(-state.currentX * factor).toFixed(1)}px, 35px)`;
        });
      }

      animFrameRef.current = requestAnimationFrame(tickCoin);
    };

    animFrameRef.current = requestAnimationFrame(tickCoin);

    // Global Pointer Move & Up listeners for coin dragging
    const handleGlobalPointerMove = (e) => {
      const state = rotState.current;
      if (!state.isDragging) return;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const deltaX = clientX - state.dragStartX;
      const deltaY = clientY - state.dragStartY;

      state.targetY = state.dragStartRotY + deltaX * 0.75;
      state.targetX = state.dragStartRotX - deltaY * 0.75;
      state.lastInteractionTime = Date.now();
    };

    const handleGlobalPointerUp = () => {
      rotState.current.isDragging = false;
      rotState.current.lastInteractionTime = Date.now();
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('touchmove', handleGlobalPointerMove, { passive: true });
    window.addEventListener('touchend', handleGlobalPointerUp);

    return () => {
      document.documentElement.classList.remove('landing-active');
      document.body.classList.remove('landing-active');

      // Stop speech on unmount
      kokoroVoiceEngine.stop();

      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
      window.removeEventListener('scroll', updateScrollAnimations);
      window.removeEventListener('resize', updateScrollAnimations);

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('touchmove', handleGlobalPointerMove);
      window.removeEventListener('touchend', handleGlobalPointerUp);
    };
  }, []);

  // Mouse rotation over Hero section
  const handleHeroMouseMove = (e) => {
    const state = rotState.current;
    if (state.isDragging || !sealRef.current) return;

    const rect = sealRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = (e.clientX - centerX) / (window.innerWidth / 2);
    const dy = (e.clientY - centerY) / (window.innerHeight / 2);

    state.targetY = Math.max(-55, Math.min(55, dx * 45));
    state.targetX = Math.max(-42, Math.min(42, -dy * 35));
    state.targetZ = dx * -6;
    state.lastInteractionTime = Date.now();
  };

  // Pointer Down on Coin to start Drag Rotation
  const handleCoinPointerDown = (e) => {
    bureauAudio.typewriterClick();
    const state = rotState.current;
    state.isDragging = true;
    state.dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    state.dragStartY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    state.dragStartRotX = state.targetX;
    state.dragStartRotY = state.targetY;
    state.lastInteractionTime = Date.now();
  };

  // Switch Detective Vertical Slide
  const handleSelectDetective = (index) => {
    bureauAudio.typewriterClick();
    if (speakingOfficerId) {
      kokoroVoiceEngine.stop();
      setSpeakingOfficerId(null);
    }
    setSelectedDetectiveIndex(index);
    setShowSubtitles(false);
  };

  // Introduce Yourself Spoken Action
  const handleToggleSpeech = (detective) => {
    bureauAudio.typewriterClick();
    if (speakingOfficerId === detective.id) {
      kokoroVoiceEngine.stop();
      setSpeakingOfficerId(null);
    } else {
      kokoroVoiceEngine.stop();
      setSpeakingOfficerId(detective.id);
      setShowSubtitles(true);

      kokoroVoiceEngine.speak(detective.id, detective.speechText, {
        onStart: () => {
          setSpeakingOfficerId(detective.id);
        },
        onEnd: () => {
          setSpeakingOfficerId(null);
        },
        onError: () => {
          setSpeakingOfficerId(null);
        }
      });
    }
  };

  const handleAction = () => {
    bureauAudio.typewriterClick();
    kokoroVoiceEngine.stop();
    if (onEnterAgency) {
      onEnterAgency();
    }
  };

  const scrollToSection = (id) => {
    bureauAudio.typewriterClick();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentDetective = DETECTIVES[selectedDetectiveIndex];

  return (
    <div className="landing-wrapper" ref={containerRef}>
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" id="scrollProgress"></div>

      {/* Navigation Bar */}
      <nav>
        <a className="brand cursor-pointer" href="#top" onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}>
          <img src="/logo.png" alt="ARGUS & Co." />
          <span>
            <b>ARGUS & Co.</b>
            <small>DETECTIVE AGENCY</small>
          </span>
        </a>
        <div className="links">
          <a href="#agents" onClick={(e) => { e.preventDefault(); scrollToSection('agents'); }}>DETECTIVES</a>
          <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToSection('capabilities'); }}>CAPABILITIES</a>
          <a href="#bureau" onClick={(e) => { e.preventDefault(); scrollToSection('bureau'); }}>THE BUREAU</a>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                className="btn cursor-pointer" 
                onClick={handleAction}
                title={`Enter active agency session as Operative ${currentUser.username}`}
              >
                ENTER AS {currentUser.username.toUpperCase()} ↗
              </button>
              <button
                type="button"
                onClick={() => {
                  bureauAudio.typewriterClick();
                  if (onSwitchUser) onSwitchUser();
                }}
                style={{
                  background: 'rgba(38, 24, 15, 0.85)',
                  border: '1px solid #78502c',
                  color: '#d5a45b',
                  fontSize: '11px',
                  fontFamily: "'Special Elite', monospace",
                  padding: '7px 11px',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  transition: 'all 0.15s'
                }}
                title="Sign in with a different operative credential"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d5a45b';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#78502c';
                  e.currentTarget.style.color = '#d5a45b';
                }}
              >
                SWITCH OPERATIVE
              </button>
            </div>
          ) : (
            <button className="btn cursor-pointer" onClick={handleAction}>
              ENTER THE AGENCY ↗
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main id="top">
        <section className="hero" ref={heroRef} onMouseMove={handleHeroMouseMove}>
          <div className="copy">
            <div className="eyebrow">PRIVATE INVESTIGATION · EST. 1891</div>
            <h1>
              Every clue has a story.
              <em>We find it.</em>
            </h1>
            <p>
              Step into ARGUS & Co.—a frontier-inspired investigative bureau where five specialist intelligence agents
              work together to organise evidence, examine leads, and bring clarity to complex cases.
            </p>
            <div className="actions">
              <button className="btn cursor-pointer" onClick={handleAction}>
                {currentUser ? `RESUME INVESTIGATION (${currentUser.username.toUpperCase()}) ↗` : 'OPEN THE CASE ROOM ↗'}
              </button>
              <a className="textlink cursor-pointer" href="#agents" onClick={(e) => { e.preventDefault(); scrollToSection('agents'); }}>
                MEET THE DETECTIVES ↓
              </a>
            </div>
            <div className="motto">OBSERVE CLOSELY. QUESTION EVERYTHING. FOLLOW THE EVIDENCE.</div>
          </div>

          <div className="art">
            <div className="orbit" ref={orbitRef}></div>
            
            <div className="seal-container">
              {/* Interactive 3D Coin Medallion */}
              <div 
                className="seal" 
                ref={sealRef}
                onPointerDown={handleCoinPointerDown}
                title="Click & Drag to rotate the 3D Bureau Coin"
              >
                <div className="seal-sheen" ref={sheenRef}></div>
                <div className="seal-in">
                  <img src="/logo.png" alt="ARGUS emblem" />
                  <strong>ARGUS & Co.</strong>
                  <small>DETECTIVE AGENCY</small>
                </div>
              </div>

              {/* Interactive Badge Hint */}
              <div className="coin-hint">
                <span style={{ fontSize: '12px' }}>⟲</span> CLICK &amp; DRAG 3D COIN · MOUSE INTERACTIVE
              </div>
            </div>

            <div className="floatcard f1" ref={(el) => (cardsRef.current[0] = el)}>
              <b>CASE 001 · OPEN</b>
              <small>Evidence intake ready</small>
            </div>
            <div className="floatcard f2" ref={(el) => (cardsRef.current[1] = el)}>
              <b>5 SPECIALISTS</b>
              <small>One coordinated bureau</small>
            </div>
            <div className="floatcard f3" ref={(el) => (cardsRef.current[2] = el)}>
              <b>FRONTIER DISTRICT</b>
              <small>Est. 1891 · On the record</small>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Section: Meet the Detectives - Full-Scale Vertical Slides with Voice Intro */}
        {/* ========================================================================= */}
        <section className="content reveal" id="agents">
          <div className="detectives-showcase">
            <div className="heading">
              <div>
                <div className="eyebrow">THE INVESTIGATIVE UNIT · SPECIALIST DOSSIERS</div>
                <h2>Meet the detectives.</h2>
              </div>
              <p>Five officers, five disciplines—from evidence intake to independent review. Select a detective below to view their full landscape dossier and hear their voice self-introduction.</p>
            </div>

            {/* View Mode Switcher */}
            <div className="detective-view-switcher">
              <button 
                className={`view-switch-btn ${viewMode === 'slide' ? 'active' : ''}`}
                onClick={() => {
                  bureauAudio.typewriterClick();
                  setViewMode('slide');
                }}
              >
                <span>SLIDE VIEW (1 OF 5)</span>
              </button>
              <button 
                className={`view-switch-btn ${viewMode === 'all' ? 'active' : ''}`}
                onClick={() => {
                  bureauAudio.typewriterClick();
                  setViewMode('all');
                }}
              >
                <span>VERTICAL DECK (ALL 5 AGENTS)</span>
              </button>
            </div>

            {/* Detective Selector Tab Bar (Shown in Slide Mode) */}
            {viewMode === 'slide' && (
              <div className="detective-tabs" role="tablist">
                {DETECTIVES.map((det, idx) => {
                  const isActive = idx === selectedDetectiveIndex;
                  const isSpeakingThis = speakingOfficerId === det.id;
                  return (
                    <button
                      key={det.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectDetective(idx)}
                      className={`detective-tab-btn ${isActive ? 'active' : ''}`}
                      style={isActive ? { borderColor: det.accentColor } : {}}
                    >
                      <img 
                        src={det.image} 
                        alt={det.name} 
                        className="detective-tab-thumb"
                        style={isActive ? { borderColor: det.accentColor } : {}}
                      />
                      <span>{det.name}</span>
                      {isSpeakingThis && (
                        <span style={{ color: det.accentColor, fontSize: '11px', animation: 'speechPulse 0.6s infinite alternate' }}>
                          🔊
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Render Detective Cards (Single Slide or All 5 Vertical Deck) */}
            {(viewMode === 'slide' ? [currentDetective] : DETECTIVES).map((det, dIndex) => {
              const isSpeakingThis = speakingOfficerId === det.id;
              const isSingleSlide = viewMode === 'slide';

              return (
                <div className="detective-slide-card" key={det.id}>
                  {/* Full-Scale Landscape Cinematic Artwork Stage */}
                  <div className="detective-landscape-stage">
                    <img 
                      src={det.image} 
                      alt={det.name} 
                      className="detective-landscape-img"
                    />
                    <div className="detective-landscape-badge">
                      <span>{det.badge}</span>
                      <span style={{ color: det.accentColor }}>★ ACTIVE OPERATIVE</span>
                    </div>
                  </div>

                  {/* Comprehensive Dossier & Voice Introduction */}
                  <div className="detective-dossier-body">
                    <div className="detective-dossier-top">
                      {/* Left Column: Command Identity & Speech Synthesis */}
                      <div className="detective-profile-pane">
                        <div 
                          className="detective-badge-tag"
                          style={{ 
                            background: `rgba(35, 22, 13, 0.9)`, 
                            border: `1px solid ${det.accentColor}`,
                            color: det.accentColor
                          }}
                        >
                          <Award size={13} />
                          <span>{det.badge}</span>
                        </div>

                        <h3 className="detective-name">{det.name}</h3>
                        <div className="detective-title">{det.rank}</div>

                        <div className="detective-quote">
                          "{det.quote}"
                        </div>

                        {/* Introduce Yourself Voice Button */}
                        <div className="detective-speech-bar">
                          <button
                            onClick={() => handleToggleSpeech(det)}
                            className={`speech-trigger-btn ${isSpeakingThis ? 'speaking' : ''}`}
                            title="Listen to this detective introduce themselves with custom voice synthesis"
                          >
                            {isSpeakingThis ? (
                              <>
                                <VolumeX size={16} />
                                <span>STOP INTRODUCTION</span>
                              </>
                            ) : (
                              <>
                                <Volume2 size={16} />
                                <span>INTRODUCE YOURSELF 🎙️</span>
                              </>
                            )}
                          </button>

                          {isSpeakingThis && (
                            <div className="speech-wave-indicator" aria-label="Audio active">
                              <div className="speech-bar" style={{ background: det.accentColor }}></div>
                              <div className="speech-bar" style={{ background: det.accentColor }}></div>
                              <div className="speech-bar" style={{ background: det.accentColor }}></div>
                              <div className="speech-bar" style={{ background: det.accentColor }}></div>
                              <div className="speech-bar" style={{ background: det.accentColor }}></div>
                            </div>
                          )}
                        </div>

                        {/* Live Spoken Subtitle Teleprompter */}
                        {(isSpeakingThis || (showSubtitles && (isSingleSlide || speakingOfficerId === det.id))) && (
                          <div 
                            className="speech-subtitles-box"
                            style={{ borderLeft: `3px solid ${det.accentColor}` }}
                          >
                            <div style={{ color: det.accentColor, fontSize: '10px', letterSpacing: '2px', marginBottom: '4px' }}>
                              LIVE SPOKEN INTRODUCTION · TELEGRAPH AUDIO CADENCE
                            </div>
                            "{det.speechText}"
                          </div>
                        )}
                      </div>

                      {/* Right Column: Operational Intel & Specialties */}
                      <div className="detective-intel-pane">
                        <div className="dossier-subhead">
                          OPERATIONAL DOSSIER &amp; BACKGROUND
                        </div>
                        <div className="detective-bio">
                          {det.bio}
                        </div>

                        <div className="dossier-subhead" style={{ marginTop: '20px' }}>
                          CORE CAPABILITIES &amp; SPECIALTIES
                        </div>
                        <div className="detective-specialties-grid">
                          {det.specialties.map((spec, sIdx) => (
                            <span 
                              key={sIdx} 
                              className="detective-specialty-pill"
                              style={{ borderLeft: `3px solid ${det.accentColor}` }}
                            >
                              • {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Slide Footer Navigation Controls (shown in Slide View) */}
                    {isSingleSlide && (
                      <div className="detective-slide-footer">
                        <div>
                          OPERATIVE DOSSIER SLIDE <strong>{det.indexStr}</strong> OF <strong>05</strong>
                        </div>

                        <div className="slide-nav-arrows">
                          <button
                            className="slide-arrow-btn"
                            onClick={() => handleSelectDetective((selectedDetectiveIndex - 1 + DETECTIVES.length) % DETECTIVES.length)}
                          >
                            ← PREVIOUS
                          </button>
                          <button
                            className="slide-arrow-btn"
                            onClick={() => handleSelectDetective((selectedDetectiveIndex + 1) % DETECTIVES.length)}
                          >
                            NEXT DETECTIVE →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Capabilities / Inside the Investigation */}
        <section className="content features" id="capabilities">
          <div className="scroll-story">
            <div className="reveal">
              <div className="story-kicker">THE ARGUS BUREAU · A COMPLETE CASE JOURNEY</div>
              <h2 className="story-title">Inside the investigation.</h2>
              <p className="story-lead">
                Every investigation at ARGUS & Co. follows a traceable path. From the first document entering the bureau to the final case archive, each station has a purpose, each agent has a defined responsibility, and every conclusion is expected to remain connected to its evidence. Scroll through the bureau workflow below.
              </p>
            </div>

            <article className="story-row">
              <div className="story-number">01</div>
              <div>
                <h3>3D Headquarters — the command floor</h3>
                <p>
                  Headquarters is the operational heart of the agency: an immersive, interactive 3D detective office that communicates the state of the investigation through the environment itself. The central evidence wall acts as the room’s focal point, while desks, terminals, lamps, folders, and agent stations become navigable interface elements.
                </p>
                <p>
                  Rather than presenting a conventional dashboard over the scene, the room places case information inside the world. Selecting the investigation board opens the current case overview; selecting an agent’s station reveals assignments and activity; and the command console gives access to priorities, pending reviews, and report progress. Users can orbit, zoom, pan, inspect hotspots, and return to the default room camera.
                </p>
                <ul>
                  <li>Active case and investigation status</li>
                  <li>Evidence intake and processing progress</li>
                  <li>Agent availability and task assignments</li>
                  <li>Recent case activity and review queue</li>
                  <li>Interactive board, desks, and command terminal</li>
                  <li>Ambient lighting, hover states, and subtle 3D motion</li>
                </ul>
                <span className="story-tag">COMMAND · COORDINATION · SITUATIONAL AWARENESS</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">02</div>
              <div>
                <h3>Case Files — intake and evidence registration</h3>
                <p>
                  Every investigation begins with a dossier. The Case Files station lets the user create a case record with a reference number, title, scope, description, date, and status. Documents and media are then added to that specific case—not to a generic upload drawer—so the evidence remains organised and traceable throughout the workflow.
                </p>
                <p>
                  Each upload becomes an evidence item with its own identifier, filename, source details, received date, notes, and processing status. The interface can preview supported material, flag duplicate files, and indicate when an item needs manual review. Original files should remain preserved while extracted text or derived observations are stored separately.
                </p>
                <ul>
                  <li>Case creation, metadata, and case ownership</li>
                  <li>DOC/DOCX, XLS/XLSX, CSV, JPG/JPEG, HEIC, PNG, and PDF intake</li>
                  <li>Evidence ID, source, date, notes, and file status</li>
                  <li>Document preview and evidence inventory</li>
                  <li>Duplicate, unreadable, or incomplete-file warnings</li>
                  <li>Evidence linked to clues, agent tasks, and report citations</li>
                </ul>
                <span className="story-tag">DOSSIER · EVIDENCE INTAKE · PROVENANCE</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">03</div>
              <div>
                <h3>Investigation Lab — how the team works</h3>
                <p>
                  The Lab converts a dossier into structured investigative tasks. Each agent receives a bounded assignment and returns a work product containing observations, source references, uncertainties, and questions for further review. Detective Argus coordinates the sequence and consolidates reviewed findings; he does not replace source verification or human judgement.
                </p>
                <p>
                  <strong>Officer Lutkin</strong> performs forensic document intelligence: extracting relevant passages, identifying dates and names, describing image or document content, and recording evidence observations with file/page references. <strong>Officer Vanguard</strong> supports intelligence operations by collecting authorised contextual information, documenting sources, and separating sourced material from leads that still require confirmation. <strong>Officer Cortex</strong> compares records, builds timelines, detects inconsistencies and recurring entities, and flags anomalies for examination. <strong>Detective Apex</strong> acts as the independent reviewer—testing assumptions, looking for contradictions, asking what evidence could disprove a theory, and presenting alternative explanations. <strong>Detective Argus</strong> assigns work, tracks progress, resolves task dependencies, and prepares a synthesis only after cross-checking.
                </p>
                <ul>
                  <li>Stage 1: intake and scope definition</li>
                  <li>Stage 2: evidence examination and extraction</li>
                  <li>Stage 3: specialist analysis and task outputs</li>
                  <li>Stage 4: cross-agent comparison and contradiction checks</li>
                  <li>Stage 5: human review and approval</li>
                  <li>Stage 6: report drafting and case closure</li>
                </ul>
                <span className="story-tag">ASSIGN · EXAMINE · ANALYSE · VERIFY · REVIEW</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">04</div>
              <div>
                <h3>Clues & Suspects Web — the connected evidence map</h3>
                <p>
                  The Clues & Suspects Web turns disconnected records into a visual relationship map. A graph canvas displays nodes for people, witnesses, clues, testimonies, places, events, and evidence files. Lines between nodes describe a recorded relationship—such as “mentioned in,” “observed at,” “supports,” “conflicts with,” or “requires verification”—and each connection remains linked to its source.
                </p>
                <p>
                  Users can select a node to inspect its notes, origin, timestamp, associated evidence, and agent observations. Filters help isolate a date range, evidence type, agent, or verification state. Contradictions and missing links can be highlighted for follow-up, while the interface must clearly distinguish a lead or association from proof of wrongdoing.
                </p>
                <ul>
                  <li>Interactive, zoomable graph with draggable nodes</li>
                  <li>Clues, people, testimonies, locations, events, and files</li>
                  <li>Evidence-backed edges with source references</li>
                  <li>Filters by case, date, agent, and review status</li>
                  <li>Contradiction, missing-link, and follow-up markers</li>
                  <li>Click-through from graph item to original evidence</li>
                </ul>
                <span className="story-tag">RELATIONSHIPS · TRACEABILITY · LEADS</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">05</div>
              <div>
                <h3>Team Presentation — hear the investigation</h3>
                <p>
                  The Team Presentation feature transforms reviewed case work into a structured audio briefing. Instead of a single generic narration, the presentation can be divided into agent chapters so the user hears how each specialist approached the case and what remains unresolved. The script should be generated from approved findings and source-linked material.
                </p>
                <p>
                  The briefing opens with Argus establishing the scope and known facts. Lutkin explains the evidence intake and document observations; Vanguard presents sourced context; Cortex walks through timelines, patterns, and anomalies; Apex discusses counterpoints and uncertainty; and Argus closes with the synthesis, limitations, and recommended next steps. A transcript accompanies the audio so users can read, search, and verify each statement.
                </p>
                <ul>
                  <li>Play, pause, seek, volume, and chapter navigation</li>
                  <li>Agent-specific voices or speaker labels</li>
                  <li>Transcript synchronised with playback</li>
                  <li>Evidence references displayed beside relevant statements</li>
                  <li>Separate “confirmed observations” and “open questions” chapters</li>
                  <li>Briefing regeneration after report review</li>
                </ul>
                <span className="story-tag">AUDIO BRIEFING · AGENT VOICES · TRANSCRIPT</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">06</div>
              <div>
                <h3>Report Desk — the final documented output</h3>
                <p>
                  The Report Desk consolidates the case into a professional, readable document. Its purpose is not simply to produce a persuasive narrative; it is to show what was examined, what the evidence supports, where sources disagree, and what remains uncertain. Every important factual statement should be traceable to an evidence item or clearly marked as analysis.
                </p>
                <p>
                  The final report can include an executive summary, case scope, chronology, evidence register, agent findings, cross-verification notes, clue-map summary, unresolved questions, limitations, and appendices. Users can inspect the report before exporting it, correct formatting, and retain version history when revisions are made.
                </p>
                <ul>
                  <li>Structured headings and consistent page alignment</li>
                  <li>Timeline and evidence tables</li>
                  <li>Source citations and evidence IDs</li>
                  <li>Agent contributions and reviewer notes</li>
                  <li>Uncertainty, alternative explanations, and limitations</li>
                  <li>PDF/DOCX export and report version history</li>
                </ul>
                <span className="story-tag">SYNTHESIS · DOCUMENTATION · EXPORT</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">07</div>
              <div>
                <h3>Archives — the agency’s case memory</h3>
                <p>
                  Once a case is completed, paused, or formally closed, its record moves into Archives. The archive is a searchable library of case summaries and preserved investigation artefacts—not merely a list of filenames. Opening an archived case should show its synopsis, chronology, evidence inventory, final report, status history, and the version of the findings that was approved at closure.
                </p>
                <p>
                  Users can search by case reference, title, date, status, or entity; review report versions; and, where permissions allow, reopen a case or duplicate it into a new working dossier. Archived material should retain its original provenance and access controls.
                </p>
                <ul>
                  <li>Searchable case index and summary cards</li>
                  <li>Closed, paused, and historical case filters</li>
                  <li>Final report, evidence inventory, and timeline</li>
                  <li>Activity log and report version history</li>
                  <li>Reopen or create a follow-up case</li>
                  <li>Retention and access controls for sensitive records</li>
                </ul>
                <span className="story-tag">CASE HISTORY · SEARCH · PRESERVATION</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">08</div>
              <div>
                <h3>Agent Investigation — speak to each specialist</h3>
                <p>
                  Agent Investigation gives the user a direct, case-scoped consultation with any member of the unit. Select Argus, Apex, Lutkin, Vanguard, or Cortex individually and ask a question about a finding, an evidence item, a timeline, or an interpretation. The selected agent responds according to its role and the material available to it.
                </p>
                <p>
                  Users can ask for an explanation in simpler terms, request the source behind a statement, challenge a conclusion, ask for counterarguments, or identify what information is missing. A conversation can be cleared to start a fresh question thread without deleting the case, uploaded evidence, or saved notes. Useful responses can be saved into the case only with user confirmation.
                </p>
                <ul>
                  <li>Individual agent selector and role-aware responses</li>
                  <li>Text chat and optional voice conversation</li>
                  <li>Ask about a selected evidence item or report passage</li>
                  <li>Request citations, confidence rationale, or counterarguments</li>
                  <li>Clear chat context while preserving case records</li>
                  <li>Save approved answers as case notes</li>
                </ul>
                <span className="story-tag">ASK · CHALLENGE · CLARIFY · FOLLOW UP</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">09</div>
              <div>
                <h3>Evidence Review — keep conclusions accountable</h3>
                <p>
                  Evidence Review is the quality gate shared across the bureau. It separates raw source material from extracted observations, analytical interpretations, and final conclusions. Agents should expose uncertainty, identify conflicting information, and state when a claim cannot be supported by the available record.
                </p>
                <p>
                  Before a finding is promoted into the final report, a human reviewer can inspect its supporting sources, compare competing explanations, and approve, revise, or reject it. The audit trail records who or what generated an observation, which evidence was referenced, and when a report section changed.
                </p>
                <ul>
                  <li>Source-backed statements and clickable citations</li>
                  <li>Observation / hypothesis / conclusion distinctions</li>
                  <li>Confidence labels with a stated rationale</li>
                  <li>Contradictory evidence and alternative hypotheses</li>
                  <li>Human approval before finalisation</li>
                  <li>Traceable task, edit, and report history</li>
                </ul>
                <span className="story-tag">ACCOUNTABILITY · REVIEW · HUMAN OVERSIGHT</span>
              </div>
            </article>
          </div>
        </section>

        {/* Callout Section */}
        <section className="callout reveal" id="bureau">
          <div>
            <div className="eyebrow">YOUR CASE. OUR BUREAU.</div>
            <h2>The investigation starts here.</h2>
            <p>Enter headquarters, open a dossier, and put the ARGUS & Co. investigative unit to work.</p>
          </div>
          <button className="btn cursor-pointer" onClick={handleAction}>
            {currentUser ? `ENTER HEADQUARTERS AS ${currentUser.username.toUpperCase()} ↗` : 'ENTER HEADQUARTERS ↗'}
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <span>© ARGUS & Co. · FRONTIER DISTRICT · EST. 1891</span>
        <span>OBSERVE CLOSELY · QUESTION EVERYTHING · FOLLOW THE EVIDENCE</span>
      </footer>
    </div>
  );
}
