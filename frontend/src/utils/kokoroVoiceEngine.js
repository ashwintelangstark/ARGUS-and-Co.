// ==============================================================================
// KOKORO EMOTIONAL VOICE ENGINE · ARGUS & CO. DETECTIVE BUREAU
// Custom Speech Synthesis & Acoustic Cadence for 5 Specialist Officers
// ==============================================================================

class KokoroVoiceEngine {
  constructor() {
    this.voices = [];
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.speechSessionId = 0;
    this.fallbackTimer = null;
    this.sentenceTimer = null;
    this.initVoices();
  }

  initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const load = () => {
      try {
        this.voices = window.speechSynthesis.getVoices() || [];
      } catch (e) {
        this.voices = [];
      }
    };

    load();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = load;
    }
  }

  getVoiceProfiles() {
    return {
      CORTEX: {
        id: 'CORTEX',
        name: 'Officer Cortex',
        preferredVoiceNames: ['Daniel', 'Alex', 'George', 'David', 'Google UK English Male', 'en-US-Standard-B', 'Oliver', 'Male'],
        voiceGender: 'male',
        pitch: 0.95,
        rate: 1.02,
        volume: 1.0,
        soundEffect: 'ANOMALY DETECTED',
        bannerColor: '#10b981',
        tag: 'ANALYTICAL LINK MATRIX'
      },
      VANGUARD: {
        id: 'VANGUARD',
        name: 'Officer Vanguard',
        preferredVoiceNames: ['Fred', 'Oliver', 'Aaron', 'James', 'Google US English Male', 'en-US-Standard-D', 'Male'],
        voiceGender: 'male',
        pitch: 0.82,
        rate: 0.98,
        volume: 1.0,
        soundEffect: 'OSINT & WIRETAP INTERCEPT',
        bannerColor: '#f97316',
        tag: 'FIELD OPERATIONS & TRANSIT'
      },
      LUTKIN: {
        id: 'LUTKIN',
        name: 'Officer Lutkin',
        preferredVoiceNames: ['Samantha', 'Victoria', 'Karen', 'Serena', 'Google US English Female', 'en-US-Standard-C', 'Female'],
        voiceGender: 'female',
        pitch: 1.18,
        rate: 1.04,
        volume: 1.0,
        soundEffect: 'CRYPTOGRAPHIC FORENSICS',
        bannerColor: '#00d2ff',
        tag: 'DIGITAL & PHYSICAL FORENSICS'
      },
      APEX: {
        id: 'APEX',
        name: 'Detective Apex',
        preferredVoiceNames: ['Moira', 'Tessa', 'Fiona', 'Karen', 'Google UK English Female', 'en-GB-Standard-A', 'Female'],
        voiceGender: 'female',
        pitch: 1.08,
        rate: 0.98,
        volume: 1.0,
        soundEffect: 'ADVERSARIAL CROSS-EXAMINATION',
        bannerColor: '#a855f7',
        tag: 'DEPUTY RED-TEAM AUDIT'
      },
      ARGUS: {
        id: 'ARGUS',
        name: 'Detective Argus',
        preferredVoiceNames: ['Daniel', 'Bruce', 'Ralph', 'Arthur', 'Google UK English Male', 'en-GB-Standard-B', 'Male'],
        voiceGender: 'male',
        pitch: 0.76,
        rate: 0.88,
        volume: 1.0,
        soundEffect: 'CHIEF DIRECTIVE & CULPRIT UNMASKED',
        bannerColor: '#f59e0b',
        tag: 'CHIEF COMMAND VERDICT'
      }
    };
  }

  findBestVoice(preferredNames, gender) {
    if (!this.voices || this.voices.length === 0) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          this.voices = window.speechSynthesis.getVoices() || [];
        } catch (e) {
          this.voices = [];
        }
      }
    }

    if (!this.voices || this.voices.length === 0) return null;

    // 1. Exact or partial name match from preferred list
    for (const name of preferredNames) {
      const match = this.voices.find(v => 
        v.name && v.name.toLowerCase().includes(name.toLowerCase()) && 
        (v.lang ? v.lang.startsWith('en') : true)
      );
      if (match) return match;
    }

    // 2. Gender heuristic
    if (gender === 'female') {
      const femaleVoice = this.voices.find(v => 
        v.name && (v.name.toLowerCase().includes('female') || 
         v.name.toLowerCase().includes('woman') || 
         v.name.toLowerCase().includes('samantha') || 
         v.name.toLowerCase().includes('victoria') || 
         v.name.toLowerCase().includes('karen') || 
         v.name.toLowerCase().includes('zira')) &&
        (v.lang ? v.lang.startsWith('en') : true)
      );
      if (femaleVoice) return femaleVoice;
    } else {
      const maleVoice = this.voices.find(v => 
        v.name && (v.name.toLowerCase().includes('male') || 
         v.name.toLowerCase().includes('man') || 
         v.name.toLowerCase().includes('daniel') || 
         v.name.toLowerCase().includes('alex') || 
         v.name.toLowerCase().includes('david') || 
         v.name.toLowerCase().includes('george')) &&
        (v.lang ? v.lang.startsWith('en') : true)
      );
      if (maleVoice) return maleVoice;
    }

    // 3. Fallback to any English voice
    const englishVoice = this.voices.find(v => v.lang && v.lang.startsWith('en'));
    return englishVoice || this.voices[0] || null;
  }

  cleanSpeechText(rawText) {
    if (!rawText || typeof rawText !== 'string') return '';
    return rawText
      .replace(/[*_#`~[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  splitIntoSentences(text) {
    const cleaned = this.cleanSpeechText(text);
    if (!cleaned) return [];

    // Split on sentence terminators (. ! ?)
    const rawMatches = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
    if (!rawMatches || rawMatches.length === 0) {
      return [cleaned];
    }

    // Further partition any long clauses (> 180 chars) to prevent Chrome's 14s cut-off
    const sentences = [];
    for (const item of rawMatches) {
      const trimmed = item.trim();
      if (!trimmed) continue;

      if (trimmed.length > 180) {
        const clauses = trimmed.split(/,\s+/);
        let buffer = '';
        for (const c of clauses) {
          if ((buffer + ', ' + c).length > 160 && buffer.length > 0) {
            sentences.push(buffer.trim());
            buffer = c;
          } else {
            buffer = buffer ? buffer + ', ' + c : c;
          }
        }
        if (buffer.trim()) sentences.push(buffer.trim());
      } else {
        sentences.push(trimmed);
      }
    }

    return sentences.length > 0 ? sentences : [cleaned];
  }

  speak(officerId, text, callbacks = {}) {
    // Increment session ID to invalidate any prior session callbacks
    this.speechSessionId += 1;
    const sessionId = this.speechSessionId;

    this.stopInternal();

    const { onStart, onWord, onEnd, onError } = callbacks;
    const profiles = this.getVoiceProfiles();
    const profile = profiles[officerId] || profiles.ARGUS;

    const sentences = this.splitIntoSentences(text);
    if (sentences.length === 0) {
      if (onEnd) onEnd();
      return;
    }

    // Check if speechSynthesis is available in browser
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onStart) onStart();
      this.isSpeaking = true;
      const totalWords = text ? text.split(/\s+/).length : 20;
      const durationMs = Math.min(Math.max(totalWords * 320, 3500), 16000);
      this.fallbackTimer = setTimeout(() => {
        if (this.speechSessionId === sessionId) {
          this.isSpeaking = false;
          if (onEnd) onEnd();
        }
      }, durationMs);
      return;
    }

    // Use Web Speech Synthesis with sequential sentence streaming
    let sentenceIndex = 0;
    let hasStarted = false;

    const speakNextSentence = () => {
      if (this.speechSessionId !== sessionId) return;

      if (sentenceIndex >= sentences.length) {
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (typeof window !== 'undefined') window._activeKokoroUtterance = null;
        if (onEnd) onEnd();
        return;
      }

      const currentSentence = sentences[sentenceIndex];
      sentenceIndex += 1;

      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        const utterance = new SpeechSynthesisUtterance(currentSentence);
        const matchedVoice = this.findBestVoice(profile.preferredVoiceNames, profile.voiceGender);
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        utterance.pitch = profile.pitch;
        utterance.rate = profile.rate;
        utterance.volume = profile.volume;

        // Keep persistent reference to prevent Chrome's V8 garbage collection bug
        this.currentUtterance = utterance;
        if (typeof window !== 'undefined') {
          window._activeKokoroUtterance = utterance;
        }

        utterance.onstart = () => {
          if (this.speechSessionId !== sessionId) return;
          this.isSpeaking = true;
          if (!hasStarted) {
            hasStarted = true;
            if (onStart) onStart();
          }
        };

        utterance.onboundary = (e) => {
          if (this.speechSessionId !== sessionId) return;
          if (onWord && e.name === 'word') {
            onWord(e.charIndex);
          }
        };

        utterance.onend = () => {
          if (this.speechSessionId !== sessionId) return;
          // Natural cadence pause between sentences (140ms)
          this.sentenceTimer = setTimeout(() => {
            if (this.speechSessionId === sessionId) {
              speakNextSentence();
            }
          }, 140);
        };

        utterance.onerror = (err) => {
          if (this.speechSessionId !== sessionId) return;
          // Ignore explicit cancels/interruptions
          if (err.error === 'canceled' || err.error === 'interrupted') {
            return;
          }
          console.warn('SpeechSynthesis sentence warning:', err);
          // Advance to next sentence on minor audio glitch
          speakNextSentence();
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis exception:', err);
        if (this.speechSessionId === sessionId) {
          this.isSpeaking = false;
          if (onError) onError(err);
        }
      }
    };

    // Small timeout (50ms) to ensure previous cancellation fully settled in browser audio thread
    this.sentenceTimer = setTimeout(() => {
      if (this.speechSessionId === sessionId) {
        speakNextSentence();
      }
    }, 50);
  }

  stopInternal() {
    if (this.sentenceTimer) {
      clearTimeout(this.sentenceTimer);
      this.sentenceTimer = null;
    }
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
      window._activeKokoroUtterance = null;
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  stop() {
    this.speechSessionId += 1;
    this.stopInternal();
  }
}

export const kokoroVoiceEngine = new KokoroVoiceEngine();
