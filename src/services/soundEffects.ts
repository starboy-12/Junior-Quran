class SoundService {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  // Realistic paper page flip with physical swoosh (hembusan udara) and rustle (gesekan serat kertas)
  public playPageFlip() {
    this.playPaperFlipSwooshAndRustle();
  }

  // Authentic Physical Paper Flip Swoosh & Rustle (Web Audio API)
  public playPaperFlipSwooshAndRustle() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const duration = 0.65; // 650ms full physical turn
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // 1. Generate realistic textured paper noise with micro-friction variations
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink-ish noise filter for organic physical mass
        lastOut = (lastOut * 0.7) + (white * 0.3);

        const progress = i / bufferSize;
        // Asymmetric envelope: quick lift, sustained mid-air swoosh, soft settling flutter
        const env = Math.sin(progress * Math.PI) * (1 - 0.25 * Math.cos(progress * 6 * Math.PI));
        data[i] = lastOut * Math.max(0, env);
      }

      // Noise Source
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Filter 1: Mid-frequency Swoosh (hembusan udara saat kertas melengkung & terlempar)
      const swooshFilter = this.ctx.createBiquadFilter();
      swooshFilter.type = 'bandpass';
      swooshFilter.frequency.setValueAtTime(320, now);
      swooshFilter.frequency.exponentialRampToValueAtTime(1100, now + 0.22);
      swooshFilter.frequency.exponentialRampToValueAtTime(450, now + 0.6);
      swooshFilter.Q.setValueAtTime(1.5, now);

      const swooshGain = this.ctx.createGain();
      swooshGain.gain.setValueAtTime(0.001, now);
      swooshGain.gain.linearRampToValueAtTime(0.24, now + 0.18);
      swooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      // Filter 2: High-frequency Rustle (gesekan serat kertas perkamen fisik)
      const rustleFilter = this.ctx.createBiquadFilter();
      rustleFilter.type = 'highpass';
      rustleFilter.frequency.setValueAtTime(2400, now);
      rustleFilter.frequency.linearRampToValueAtTime(3600, now + 0.2);
      rustleFilter.frequency.linearRampToValueAtTime(1800, now + 0.6);

      const rustleGain = this.ctx.createGain();
      rustleGain.gain.setValueAtTime(0.001, now);
      rustleGain.gain.linearRampToValueAtTime(0.12, now + 0.15);
      rustleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      // Connect noise through both parallel filters
      noiseSource.connect(swooshFilter);
      swooshFilter.connect(swooshGain);
      swooshGain.connect(this.ctx.destination);

      noiseSource.connect(rustleFilter);
      rustleFilter.connect(rustleGain);
      rustleGain.connect(this.ctx.destination);

      noiseSource.start(now);

      // Layer 3: Soft Physical Landing Thud (saat lembaran kertas mendarat lembut di tumpukan seberang)
      const landingOsc = this.ctx.createOscillator();
      const landingGain = this.ctx.createGain();
      const landingTime = now + 0.42;

      landingOsc.type = 'sine';
      landingOsc.frequency.setValueAtTime(120, landingTime);
      landingOsc.frequency.exponentialRampToValueAtTime(45, landingTime + 0.12);

      landingGain.gain.setValueAtTime(0.001, landingTime);
      landingGain.gain.linearRampToValueAtTime(0.14, landingTime + 0.02);
      landingGain.gain.exponentialRampToValueAtTime(0.0001, landingTime + 0.12);

      landingOsc.connect(landingGain);
      landingGain.connect(this.ctx.destination);

      landingOsc.start(landingTime);
      landingOsc.stop(landingTime + 0.13);
    } catch {
      // AudioContext policy fallback
    }
  }

  // Book cover opening / closing (rich deeper physical thud)
  public playCoverMove(isOpen: boolean) {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      if (isOpen) {
        osc.frequency.setValueAtTime(120, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.3);
      } else {
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.25);
      }

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);

      // Add gentle leather rustle
      this.playPageFlip();
    } catch {
      // Ignore
    }
  }

  // Cinematic slow, smooth book opening sound (gentle leather flex, air displacement, paper rustle)
  public playSlowBookOpen() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Gentle low frequency leather spine flex & resonance
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.8);
      osc.frequency.exponentialRampToValueAtTime(55, now + 2.0);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 2.0);

      // 2. Slow, gentle paper rustle at staggered intervals as cover lifts and turns
      setTimeout(() => {
        this.playPageFlip();
      }, 500);
      setTimeout(() => {
        this.playPageFlip();
      }, 1200);
      setTimeout(() => {
        this.playPageFlip();
      }, 1800);
    } catch {
      // Ignore
    }
  }

  // Bookmark ribbon snap
  public playBookmarkSnap() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // Ignore
    }
  }

  // Harmonious spiritual chime for completion / achievement
  public playCompletionChime() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + index * 0.1;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.9);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundEffects = new SoundService();
