// ==============================================================================
// KOKORO EMOTIONAL VOICE ENGINE · ARGUS & CO. DETECTIVE BUREAU
// Custom Speech Synthesis & Acoustic Cadence for 5 Specialist Officers
// ==============================================================================

class KokoroVoiceEngine {
  constructor() {
    this.voices = [];
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.initVoices();
  }

  initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const load = () => {
      this.voices = window.speechSynthesis.getVoices() || [];
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
        rate: 1.05,
        volume: 1.0,
        soundEffect: '💥 *ANOMALY IDENTIFIED*',
        bannerColor: '#10b981',
        comicAccent: 'border-emerald-600',
        comicBg: 'bg-emerald-950/20',
        emotion: 'analytical and calculated with metric precision'
      },
      VANGUARD: {
        id: 'VANGUARD',
        name: 'Officer Vanguard',
        preferredVoiceNames: ['Fred', 'Oliver', 'Aaron', 'James', 'Google US English Male', 'en-US-Standard-D', 'Male'],
        voiceGender: 'male',
        pitch: 0.82,
        rate: 0.95,
        volume: 1.0,
        soundEffect: '⚡ *OSINT INTERCEPT*',
        bannerColor: '#f97316',
        comicAccent: 'border-orange-600',
        comicBg: 'bg-orange-950/20',
        emotion: 'urgent field operative reporting wiretap coordinates'
      },
      LUTKIN: {
        id: 'LUTKIN',
        name: 'Officer Lutkin',
        preferredVoiceNames: ['Samantha', 'Victoria', 'Karen', 'Serena', 'Google US English Female', 'en-US-Standard-C', 'Female'],
        voiceGender: 'female',
        pitch: 1.25,
        rate: 1.10,
        volume: 1.0,
        soundEffect: '🔬 *CRYPTOGRAPHIC FORENSICS*',
        bannerColor: '#00d2ff',
        comicAccent: 'border-cyan-500',
        comicBg: 'bg-cyan-950/20',
        emotion: 'crystalline scientific clarity and hash verification certainty'
      },
      APEX: {
        id: 'APEX',
        name: 'Detective Apex',
        preferredVoiceNames: ['Moira', 'Tessa', 'Fiona', 'Karen', 'Google UK English Female', 'en-GB-Standard-A', 'Female'],
        voiceGender: 'female',
        pitch: 1.12,
        rate: 1.02,
        volume: 1.0,
        soundEffect: '⚔️ *CONTRARIAN SCRUTINY*',
        bannerColor: '#a855f7',
        comicAccent: 'border-purple-600',
        comicBg: 'bg-purple-950/20',
        emotion: 'sharp prosecutorial scrutiny challenging confirmation bias'
      },
      ARGUS: {
        id: 'ARGUS',
        name: 'Detective Argus',
        preferredVoiceNames: ['Daniel', 'Bruce', 'Ralph', 'Arthur', 'Google UK English Male', 'en-GB-Standard-B', 'Male'],
        voiceGender: 'male',
        pitch: 0.72,
        rate: 0.88,
        volume: 1.0,
        soundEffect: '🏆 *CHIEF EXECUTIVE VERDICT*',
        bannerColor: '#f59e0b',
        comicAccent: 'border-amber-600',
        comicBg: 'bg-amber-950/20',
        emotion: 'deep authoritative gravitas delivering decisive justice'
      }
    };
  }

  findBestVoice(preferredNames, gender) {
    if (!this.voices || this.voices.length === 0) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        this.voices = window.speechSynthesis.getVoices() || [];
      }
    }

    if (!this.voices || this.voices.length === 0) return null;

    // 1. Try exact or partial name match from preferred list
    for (const name of preferredNames) {
      const match = this.voices.find(v => 
        v.name.toLowerCase().includes(name.toLowerCase()) && 
        (v.lang.startsWith('en') || !v.lang)
      );
      if (match) return match;
    }

    // 2. Try gender heuristic in voice name or ID
    if (gender === 'female') {
      const femaleVoice = this.voices.find(v => 
        (v.name.toLowerCase().includes('female') || 
         v.name.toLowerCase().includes('woman') || 
         v.name.toLowerCase().includes('samantha') || 
         v.name.toLowerCase().includes('victoria') || 
         v.name.toLowerCase().includes('karen') || 
         v.name.toLowerCase().includes('zira')) &&
        (v.lang.startsWith('en') || !v.lang)
      );
      if (femaleVoice) return femaleVoice;
    } else {
      const maleVoice = this.voices.find(v => 
        (v.name.toLowerCase().includes('male') || 
         v.name.toLowerCase().includes('man') || 
         v.name.toLowerCase().includes('daniel') || 
         v.name.toLowerCase().includes('alex') || 
         v.name.toLowerCase().includes('david') || 
         v.name.toLowerCase().includes('george')) &&
        (v.lang.startsWith('en') || !v.lang)
      );
      if (maleVoice) return maleVoice;
    }

    // 3. Fallback to any English voice
    const englishVoice = this.voices.find(v => v.lang && v.lang.startsWith('en'));
    return englishVoice || this.voices[0] || null;
  }

  cleanSpeechText(rawText) {
    if (!rawText) return '';
    return rawText
      .replace(/[*_#`~[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  speak(officerId, text, callbacks = {}) {
    this.stop();

    const { onStart, onWord, onEnd, onError } = callbacks;
    const profiles = this.getVoiceProfiles();
    const profile = profiles[officerId] || profiles.ARGUS;

    const cleanedText = this.cleanSpeechText(text);

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onStart) onStart();
      const simulatedDuration = Math.min(Math.max(cleanedText.length * 60, 2500), 12000);
      this.fallbackTimer = setTimeout(() => {
        if (onEnd) onEnd();
      }, simulatedDuration);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      const matchedVoice = this.findBestVoice(profile.preferredVoiceNames, profile.voiceGender);
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.pitch = profile.pitch;
      utterance.rate = profile.rate;
      utterance.volume = profile.volume;

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onboundary = (e) => {
        if (onWord && e.name === 'word') {
          onWord(e.charIndex);
        }
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (err) => {
        console.warn('SpeechSynthesis error:', err);
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (onError) onError(err);
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech engine exception:', e);
      if (onStart) onStart();
      setTimeout(() => { if (onEnd) onEnd(); }, 3000);
    }
  }

  stop() {
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
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }
}

export const kokoroVoiceEngine = new KokoroVoiceEngine();

