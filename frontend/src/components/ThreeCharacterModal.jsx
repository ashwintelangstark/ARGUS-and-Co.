import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createRealisticCharacter } from '../three/realisticCharacterBuilder.js';
import { bureauAudio } from '../utils/audio.js';
import { 
  X, RotateCcw, Eye, Shield, Cpu, MessageSquare, 
  Send, Sparkles, Activity, Layers, Flame, Volume2, VolumeX 
} from 'lucide-react';

export default function ThreeCharacterModal({ agentId, onClose, activeCaseRef = null }) {
  const canvasRef = useRef(null);
  const sceneInstance = useRef(null);

  const [renderMode, setRenderMode] = useState('realistic'); // realistic, hologram, wireframe, thermal
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Agent meta
  const agentDetails = {
    ARGUS: {
      name: 'Detective Argus',
      title: 'Chief Investigation Officer',
      badge: 'BUREAU COMMAND',
      accent: '#f59e0b',
      borderClass: 'border-amber-500',
      model: 'openrouter/free (Gemma-4-31B)',
      specialty: 'Strategy, Motive Synthesis, Final Directives',
      greeting: 'I am Detective Argus. What matter requires chief command review?'
    },
    APEX: {
      name: 'Detective Apex',
      title: 'Deputy Investigation Officer',
      badge: 'RED-TEAM AUDITOR',
      accent: '#a855f7',
      borderClass: 'border-purple-500',
      model: 'openrouter/free (Nemotron-3.5)',
      specialty: 'Skeptical Cross-Examination, Confirmation Bias Defense',
      greeting: 'Detective Apex here. Before you accept that theory, let us tear it apart.'
    },
    LUTKIN: {
      name: 'Officer Lutkin',
      title: 'Forensic Intelligence Officer',
      badge: 'DIGITAL FORENSICS',
      accent: '#00d2ff',
      borderClass: 'border-cyan-400',
      model: 'openrouter/free (LFM-2.5)',
      specialty: 'Cryptographic Hashes, Audio Spectrograms, Forgeries',
      greeting: 'Officer Lutkin at the bench. Files and physical evidence tell the unvarnished truth.'
    },
    VANGUARD: {
      name: 'Officer Vanguard',
      title: 'Intelligence Operations Officer',
      badge: 'FIELD INTEL & OSINT',
      accent: '#f97316',
      borderClass: 'border-orange-500',
      model: 'openrouter/free (Nemotron-Omni)',
      specialty: 'Surveillance Wires, Transit Logs, Public Registries',
      greeting: 'Officer Vanguard reporting. Coordinates, routes, and movement patterns locked.'
    },
    CORTEX: {
      name: 'Officer Cortex',
      title: 'Analytical Intelligence Officer',
      badge: 'ANALYTICS & LINK GRAPH',
      accent: '#10b981',
      borderClass: 'border-emerald-400',
      model: 'openrouter/free (Gemma-4-26B)',
      specialty: 'Anomaly Detection, Harmonic Packets, Entity Clusters',
      greeting: 'Officer Cortex online. The mathematical probability of coincidence is near zero.'
    }
  };

  const currentAgent = agentDetails[agentId] || agentDetails.ARGUS;

  // Initialize initial greeting
  useEffect(() => {
    bureauAudio.biometricScanHum();
    setChatMessages([
      { role: 'assistant', content: currentAgent.greeting, model: currentAgent.model }
    ]);
  }, [agentId]);

  // Setup 3D Scene for Character Inspector
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0907);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 50);
    camera.position.set(0, 2.15, 3.2);
    camera.lookAt(0, 2.05, 0);

    // Studio 3-Point Lighting
    const keyLight = new THREE.DirectionalLight(0xffedd4, 3.2);
    keyLight.position.set(2.5, 4.5, 3.0);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x406085, 1.4);
    fillLight.position.set(-3.0, 2.5, 2.0);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(parseInt(currentAgent.accent.replace('#', '0x')), 3.5, 6);
    rimLight.position.set(0, 3.2, -2.2);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x221810, 1.2);
    scene.add(ambientLight);

    // Add 3D Character
    const character = createRealisticCharacter(agentId, { isStudio: true, scale: 1.0 });
    scene.add(character);

    // Holographic ground disk
    const diskGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.04, 32);
    const diskMat = new THREE.MeshStandardMaterial({
      color: 0x140e0a,
      roughness: 0.8,
      metalness: 0.3
    });
    const disk = new THREE.Mesh(diskGeo, diskMat);
    disk.position.y = -0.02;
    scene.add(disk);

    // Mouse drag rotation controls
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotationY = 0;
    const mouseNorm = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        targetRotationY += deltaX * 0.008;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => { isDragging = false; };

    const handleWheel = (e) => {
      e.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + e.deltaY * 0.002, 1.8, 4.5);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Resize
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let isRunning = true;
    const clock = new THREE.Clock();

    function animate() {
      if (!isRunning) return;
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Smooth rotation dampening
      character.rotation.y = THREE.MathUtils.lerp(character.rotation.y, targetRotationY, 0.08);

      // Update breathing, head turn, and speaking
      character.update(elapsed, mouseNorm, isSpeaking);

      renderer.render(scene, camera);
    }
    animate();

    sceneInstance.current = {
      character,
      setRenderMode: (mode) => character.setRenderMode(mode),
      resetRotation: () => { targetRotationY = 0; camera.position.set(0, 2.15, 3.2); }
    };

    return () => {
      isRunning = false;
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [agentId, isSpeaking]);

  // Handle Shader Mode change
  const changeRenderMode = (mode) => {
    setRenderMode(mode);
    if (sceneInstance.current) {
      sceneInstance.current.setRenderMode(mode);
    }
    bureauAudio.telegraphBeep();
  };

  // Interrogation Chat send
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isThinking) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    bureauAudio.typewriterClick();

    const newHistory = [
      ...chatMessages,
      { role: 'user', content: userText }
    ];
    setChatMessages(newHistory);
    setIsThinking(true);
    setIsSpeaking(true);

    try {
      const response = await fetch('/api/interrogate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          officerId: agentId,
          message: userText,
          caseRef: activeCaseRef,
          history: chatMessages.slice(-6)
        })
      });

      const data = await response.json();
      if (data.success && data.reply) {
        bureauAudio.typewriterClick();
        setChatMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.reply, model: data.modelUsed }
        ]);
      } else {
        setChatMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'Connection temporarily disrupted. Repeating statement.', model: 'offline' }
        ]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: `[${currentAgent.name}]: I hear you, but the telegraph wire dropped packet. Let me state my operational position again.`, model: 'local' }
      ]);
    } finally {
      setIsThinking(false);
      // Keep speaking animation for 1.5 seconds longer as voice winds down
      setTimeout(() => setIsSpeaking(false), 1600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[850px] flex flex-col md:flex-row bg-gradient-to-b from-[#1b120c] to-[#0c0805] border-2 border-[#875d33] rounded shadow-2xl overflow-hidden">
        
        {/* Top Header Bar for Modal */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-r from-[#21140c] via-[#160e09] to-[#21140c] border-b border-[#734e2c] px-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="ARGUS & Co." className="w-8 h-8 rounded-full border border-[#c69a50] object-contain bg-[#120a06] shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: currentAgent.accent }} />
            <div>
              <h2 className="font-rye text-base md:text-lg tracking-wide text-[#f2e0be]">
                {currentAgent.name}
              </h2>
              <p className="text-[10px] font-elite text-[#bd9f6f]">
                {currentAgent.title} · {currentAgent.badge}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-mono-code bg-[#2b1b11] border border-[#9b7545] text-[#d6b785]">
              AI: {currentAgent.model.split('/')[1] || currentAgent.model}
            </span>
            <button 
              onClick={onClose}
              className="p-1.5 text-[#bfa175] hover:text-[#fff2d6] hover:bg-[#462817] rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Left Side: 3D Studio & Biometric Inspector */}
        <div className="relative flex-1 h-[48%] md:h-full pt-14 flex flex-col bg-[#0a0705]">
          <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

          {/* CRT scanlines effect if hologram mode */}
          {renderMode === 'hologram' && <div className="absolute inset-0 pt-14 crt-overlay pointer-events-none" />}

          {/* 3D Mode Toolbar Overlay */}
          <div className="absolute top-16 left-3 flex flex-wrap gap-1.5 z-10">
            <button
              onClick={() => changeRenderMode('realistic')}
              className={`px-2.5 py-1 text-[10px] font-elite rounded border flex items-center gap-1.5 transition-all ${
                renderMode === 'realistic'
                  ? 'bg-[#5c3a22] text-[#fff0cf] border-[#c49a52] shadow-md'
                  : 'bg-[#1a120c]/80 text-[#ba9f73] border-[#6b4c2d] hover:bg-[#382315]'
              }`}
            >
              <Eye size={12} /> Ultra-Realistic
            </button>
            <button
              onClick={() => changeRenderMode('hologram')}
              className={`px-2.5 py-1 text-[10px] font-elite rounded border flex items-center gap-1.5 transition-all ${
                renderMode === 'hologram'
                  ? 'bg-[#14323d] text-[#00d2ff] border-[#00d2ff] shadow-md'
                  : 'bg-[#1a120c]/80 text-[#ba9f73] border-[#6b4c2d] hover:bg-[#382315]'
              }`}
            >
              <Layers size={12} /> Holographic Scan
            </button>
            <button
              onClick={() => changeRenderMode('wireframe')}
              className={`px-2.5 py-1 text-[10px] font-elite rounded border flex items-center gap-1.5 transition-all ${
                renderMode === 'wireframe'
                  ? 'bg-[#291e3d] text-[#c084fc] border-[#a855f7] shadow-md'
                  : 'bg-[#1a120c]/80 text-[#ba9f73] border-[#6b4c2d] hover:bg-[#382315]'
              }`}
            >
              <Cpu size={12} /> 3D Wireframe
            </button>
            <button
              onClick={() => changeRenderMode('thermal')}
              className={`px-2.5 py-1 text-[10px] font-elite rounded border flex items-center gap-1.5 transition-all ${
                renderMode === 'thermal'
                  ? 'bg-[#3b1d12] text-[#ff7744] border-[#ff7744] shadow-md'
                  : 'bg-[#1a120c]/80 text-[#ba9f73] border-[#6b4c2d] hover:bg-[#382315]'
              }`}
            >
              <Flame size={12} /> Thermal Spec
            </button>
          </div>

          {/* Reset Camera button */}
          <button
            onClick={() => sceneInstance.current?.resetRotation()}
            className="absolute bottom-3 left-3 px-2 py-1 text-[10px] font-elite bg-[#1f150e]/90 text-[#bba177] hover:text-[#ffedd1] border border-[#6f4c2c] rounded flex items-center gap-1 backdrop-blur-sm z-10"
          >
            <RotateCcw size={11} /> Reset 3D Angle
          </button>

          {/* Voice Indicator */}
          {isSpeaking && (
            <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 border border-[#b88c4d] rounded flex items-center gap-2 z-10 animate-pulse">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentAgent.accent }} />
              <span className="text-[10px] font-elite text-[#ffdfa6]">TRANSMITTING VOICE SPECTRUM...</span>
            </div>
          )}
        </div>

        {/* Right Side: Interrogation Chat & Officer Dossier */}
        <div className="w-full md:w-[440px] h-[52%] md:h-full pt-14 flex flex-col bg-[#140e0a] border-t md:border-t-0 md:border-l border-[#6f4b2a]">
          
          {/* Officer Dossier Banner */}
          <div className="p-3 bg-[#1e130c] border-b border-[#5e3e22] text-[#d6be96]">
            <div className="text-[11px] font-elite flex justify-between">
              <span>SPECIALIZATION:</span>
              <span className="text-[#f5deb3] font-semibold">{currentAgent.specialty}</span>
            </div>
            {activeCaseRef && (
              <div className="text-[10px] font-mono-code text-[#9f835b] mt-1 flex items-center gap-1">
                <Shield size={11} /> ACTIVE CASE: <strong className="text-[#e2ceab]">{activeCaseRef}</strong>
              </div>
            )}
          </div>

          {/* Chat / Interrogation Dialogue Scroll */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 font-elite text-xs">
            {chatMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`p-2.5 rounded border ${
                  msg.role === 'user' 
                    ? 'bg-[#2a1b12] border-[#7d5631] text-[#faedd4] ml-6' 
                    : 'bg-[#19100a] border-[#5e3d22] text-[#d9c49e] mr-4'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] text-[#9a7e58] mb-1">
                  <span>{msg.role === 'user' ? 'YOU (LEAD INVESTIGATOR)' : currentAgent.name}</span>
                  {msg.model && <span className="font-mono-code text-[8px] opacity-75">{msg.model.split(':')[0]}</span>}
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="p-2.5 bg-[#19100a] border border-[#5e3d22] text-[#bd9f71] rounded mr-4 animate-pulse flex items-center gap-2">
                <Sparkles size={14} className="animate-spin text-[#c69a50]" />
                <span>{currentAgent.name} is deducing findings...</span>
              </div>
            )}
          </div>

          {/* Interrogation Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#18110b] border-t border-[#5e3e22] flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Interrogate ${currentAgent.name}...`}
              className="flex-1 bg-[#24170f] text-[#f7e6ca] placeholder-[#8f7453] px-3 py-2 text-xs font-elite border border-[#7a5430] rounded focus:outline-none focus:border-[#d1a65e]"
            />
            <button
              type="submit"
              disabled={isThinking || !inputMessage.trim()}
              className="western-btn px-4"
              style={{ borderColor: currentAgent.accent }}
            >
              <Send size={13} />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}

