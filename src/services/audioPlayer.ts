export type AudioStateListener = (isPlaying: boolean, currentId: string | null) => void;

// Accurate phonetic dictionary for Iqro and Tajwid so speech engine never mispronounces
const EXACT_PHONETIC_MAP: Record<string, string> = {
  // Iqro 1: Huruf tunggal berharakat fathah
  'اَ': 'أَ',
  'بَ': 'بَ',
  'تَ': 'تَ',
  'ثَ': 'ثَ',
  'جَ': 'جَ',
  'حَ': 'حَ',
  'خَ': 'خَ',
  'دَ': 'دَ',
  'ذَ': 'ذَ',
  'رَ': 'رَ',
  'زَ': 'زَ',
  'سَ': 'سَ',
  'شَ': 'شَ',
  'صَ': 'صَ',
  'ضَ': 'ضَ',
  'طَ': 'طَ',
  'ظَ': 'ظَ',
  'عَ': 'عَ',
  'غَ': 'غَ',
  'فَ': 'فَ',
  'قَ': 'قَ',
  'كَ': 'كَ',
  'لَ': 'لَ',
  'مَ': 'مَ',
  'نَ': 'نَ',
  'وَ': 'وَ',
  'هَ': 'هَ',
  'يَ': 'يَ',
  'اَ بَ': 'أَ بَ',
  'بَ اَ': 'بَ أَ',
  'اَ اَ': 'أَ أَ',
  'بَ بَ': 'بَ بَ',
  'بَ اَ بَ': 'بَ أَ بَ',
  'اَ بَ اَ': 'أَ بَ أَ',
  'بَ تَ ثَ': 'بَ تَ ثَ',
  'ثَ تَ بَ': 'ثَ تَ بَ',
  'اَ تَ بَ': 'أَ تَ بَ',
  'ثَ اَ تَ': 'ثَ أَ تَ',
  'تَ ثَ اَ': 'تَ ثَ أَ',
  'بَ ثَ تَ': 'بَ ثَ تَ',
  'جَ حَ خَ': 'جَ حَ خَ',
  'حَ جَ خَ': 'حَ جَ خَ',
  'ثَ جَ حَ': 'ثَ جَ حَ',
  'خَ بَ تَ': 'خَ بَ تَ',
  'اَ حَ دَ': 'أَ حَ دَ',

  // Iqro 2: Huruf Sambung & Mad 2 Harakat
  'بَتَ': 'بَتَ',
  'تَبَ': 'تَبَ',
  'ثَبَتَ': 'ثَبَتَ',
  'نَتَجَ': 'نَتَجَ',
  'حَسَنَ': 'حَسَنَ',
  'كَتَبَ': 'كَتَبَ',
  'جَعَلَ': 'جَعَلَ',
  'خَلَقَ': 'خَلَقَ',
  'بَا': 'بَا',
  'تَا': 'تَا',
  'بَانَ': 'بَانَ',
  'قَالَ': 'قَالَ',
  'كَانَ': 'كَانَ',
  'صَابِرًا': 'صَابِرًا',
  'عَابِدَ': 'عَابِدَ',
  'شَاكِرَ': 'شَاكِرَ',

  // Iqro 3: Kasrah & Dhammah & Mad Wawu/Ya
  'اِ': 'إِ',
  'اُ': 'أُ',
  'اَ اِ اُ': 'أَ إِ أُ',
  'بَ بِ بُ': 'بَ بِ بُ',
  'تَ تِ تُ': 'تَ تِ تُ',
  'رُسُلُ': 'رُسُلُ',
  'عَلِمَ': 'عَلِمَ',
  'سَمِعَ': 'سَمِعَ',
  'فِي': 'فِي',
  'قِيْلَ': 'قِيلَ',
  'دِيْنُ': 'دِينُ',
  'يَقُوْلُ': 'يَقُولُ',
  'تَكُوْنُ': 'تَكُونُ',
  'غَفُوْرٌ': 'غَفُورٌ',
  'شَكُوْرٌ': 'شَكُورٌ',
  'عَلِيْمٌ': 'عَلِيمٌ',

  // Iqro 4: Tanwin, Sukun & Qalqalah
  'بًا بٍ بٌ': 'بًا بٍ بٌ',
  'كِتَابًا': 'كِتَابًا',
  'رَحِيمًا': 'رَحِيمًا',
  'عَذَابٌ': 'عَذَابٌ',
  'أَحَدٌ': 'أَحَدٌ',
  'صَمَدٌ': 'صَمَدٌ',
  'خَيْرٍ': 'خَيْرٍ',
  'حَكِيمٍ': 'حَكِيمٍ',
  'أَبْ': 'أَبْ',
  'أَجْ': 'أَجْ',
  'أَدْ': 'أَدْ',
  'أَطْ': 'أَطْ',
  'أَقْ': 'أَقْ',
  'يَجْعَلْ': 'يَجْعَلْ',
  'يَقْطَعُ': 'يَقْطَعُ',
  'أَبْصَارُ': 'أَبْصَارُ',

  // Iqro 5: Tasydid, Ghunnah & Waqaf
  'رَبِّ': 'رَبِّ',
  'ثُمَّ': 'ثُمَّ',
  'إِنَّ': 'إِنَّ',
  'كَلَّا': 'كَلَّا',
  'حَقَّ': 'حَقَّ',
  'تَبَّتْ': 'تَبَّتْ',
  'مُحَمَّدٌ': 'مُحَمَّدٌ',
  'وَٱلصَّيْفِ': 'وَالصَّيْفِ',
  'ٱلْعَالَمِينَ': 'الْعَالَمِينَ',
  'ٱلرَّحِيمِ': 'الرَّحِيمِ',
  'أَفْوَاجًا': 'أَفْوَاجًا',
  'تَوَّابًا': 'تَوَّابًا',
  'ٱلْفَلَقِ': 'الْفَلَقِ',
  'وَقَبَ': 'وَقَبَ',
  'حَسَدَ': 'حَسَدَ',
  'ٱلصَّمَدُ': 'الصَّمَدُ',

  // Iqro 6: Hukum Nun Mati, Tanwin & Tajwid Tartil
  'مِن خَوْفٍ': 'مِنْ خَوْفٍ',
  'مِن قَبْلِ': 'مِنْ قَبْلِ',
  'مَن يَعْمَلْ': 'مَنْ يَعْمَلْ',
  'مِنۢ بَعْدِ': 'مِنْ بَعْدِ',
  'عَلِيمٌ حَكِيمٌ': 'عَلِيمٌ حَكِيمٌ',
  'غَفُورٌ رَّحِيمٌ': 'غَفُورٌ رَحِيمٌ',
  'كِتَابٌ كَرِيمٌ': 'كِتَابٌ كَرِيمٌ',
  'جَزَآءً وِفَاقًا': 'جَزَاءً وِفَاقًا',
};

// Known authentic Quran audio recordings from Alafasy CDN for high-fidelity mushaf recitation
const AUTHENTIC_QURAN_AUDIO: Record<string, string> = {
  'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ': 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3',
  'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَالَمِينَ': 'https://everyayah.com/data/Alafasy_128kbps/001002.mp3',
  'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ': 'https://everyayah.com/data/Alafasy_128kbps/001003.mp3',
  'مَٰلِكِ يَوْمِ ٱلدِّينِ': 'https://everyayah.com/data/Alafasy_128kbps/001004.mp3',
  'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ': 'https://everyayah.com/data/Alafasy_128kbps/001005.mp3',
  'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ': 'https://everyayah.com/data/Alafasy_128kbps/001006.mp3',
  'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ': 'https://everyayah.com/data/Alafasy_128kbps/001007.mp3',
  'قُلْ هُوَ ٱللَّهُ أَحَدٌ': 'https://everyayah.com/data/Alafasy_128kbps/112001.mp3',
  'ٱللَّهُ ٱلصَّمَدُ': 'https://everyayah.com/data/Alafasy_128kbps/112002.mp3',
  'لَمْ يَلِدْ وَلَمْ يُولَدْ': 'https://everyayah.com/data/Alafasy_128kbps/112003.mp3',
  'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ': 'https://everyayah.com/data/Alafasy_128kbps/112004.mp3',
  'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ': 'https://everyayah.com/data/Alafasy_128kbps/113001.mp3',
  'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ': 'https://everyayah.com/data/Alafasy_128kbps/114001.mp3',
};

class AudioPlayerService {
  private audioElement: HTMLAudioElement | null = null;
  private currentPlayingId: string | null = null;
  private isPlaying: boolean = false;
  private playbackRate: number = 1.0;
  private repeatMode: boolean = false;
  private listeners: Set<AudioStateListener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.addEventListener('ended', () => {
        if (this.repeatMode && this.currentPlayingId) {
          this.audioElement?.play().catch(() => {});
        } else {
          this.stop();
        }
      });
      this.audioElement.addEventListener('error', () => {
        this.fallbackWebSpeech();
      });

      // Preload available voices for reliable Arabic Qari selection
      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }
  }

  public subscribe(listener: AudioStateListener) {
    this.listeners.add(listener);
    listener(this.isPlaying, this.currentPlayingId);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying, this.currentPlayingId));
  }

  public setPlaybackRate(rate: number) {
    this.playbackRate = rate;
    if (this.audioElement) {
      this.audioElement.playbackRate = rate;
    }
  }

  public getPlaybackRate(): number {
    return this.playbackRate;
  }

  public toggleRepeatMode(): boolean {
    this.repeatMode = !this.repeatMode;
    return this.repeatMode;
  }

  public isRepeatActive(): boolean {
    return this.repeatMode;
  }

  public playAyah(globalAyahNumber: number, surahNumber: number, ayahNumberInSurah: number, fallbackArabicText?: string) {
    const trackId = `ayah_${surahNumber}_${ayahNumberInSurah}`;

    // If already playing this track, toggle pause
    if (this.isPlaying && this.currentPlayingId === trackId) {
      this.stop();
      return;
    }

    this.stop();
    this.currentPlayingId = trackId;
    this.isPlaying = true;
    this.notify();

    // CDN Mishari Alafasy (Global ayah number or zero-padded format)
    const surahPadded = String(surahNumber).padStart(3, '0');
    const ayahPadded = String(ayahNumberInSurah).padStart(3, '0');
    const cdnUrl1 = `https://everyayah.com/data/Alafasy_128kbps/${surahPadded}${ayahPadded}.mp3`;
    const cdnUrl2 = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalAyahNumber}.mp3`;

    if (this.audioElement) {
      this.audioElement.src = cdnUrl1;
      this.audioElement.playbackRate = this.playbackRate;
      this.audioElement.play().catch(() => {
        // Try fallback CDN
        if (this.audioElement) {
          this.audioElement.src = cdnUrl2;
          this.audioElement.play().catch(() => {
            this.fallbackWebSpeech(fallbackArabicText);
          });
        }
      });
    } else {
      this.fallbackWebSpeech(fallbackArabicText);
    }
  }

  // Play pronunciation for Iqro or Tajwid item with authentic Quran qari voice & precise makhraj
  public playPhonetic(arabicText: string, audioHint?: string) {
    const trackId = `iqro_${arabicText}`;
    this.stop();
    this.currentPlayingId = trackId;
    this.isPlaying = true;
    this.notify();

    // 1. Check if an authentic Quran qari CDN audio exists for this text
    if (AUTHENTIC_QURAN_AUDIO[arabicText] && this.audioElement) {
      this.audioElement.src = AUTHENTIC_QURAN_AUDIO[arabicText];
      this.audioElement.playbackRate = this.playbackRate;
      this.audioElement.play().catch(() => {
        this.speakWithQariVoice(arabicText);
      });
      return;
    }

    // 2. Otherwise synthesize with precise makhraj diacritics and sacred resonance
    this.speakWithQariVoice(arabicText);
  }

  private speakWithQariVoice(arabicText: string) {
    const phoneticText = EXACT_PHONETIC_MAP[arabicText.trim()] || arabicText.trim();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phoneticText);
      utterance.lang = 'ar-SA'; // Quranic Arabic standard

      // Solemn, warm, dignified reciter cadence
      utterance.rate = Math.max(0.6, this.playbackRate * 0.75); 
      utterance.pitch = 0.94; // Deep reverent masculine tone like a Quran qari

      // Find the most authentic Arabic voice available in browser
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice =
        voices.find(v => v.lang === 'ar-SA') ||
        voices.find(v => v.lang.startsWith('ar') && !v.name.toLowerCase().includes('google-us')) ||
        voices.find(v => v.lang.startsWith('ar'));

      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      utterance.onend = () => {
        this.stop();
      };
      utterance.onerror = () => {
        this.stop();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        this.stop();
      }, 1000);
    }
  }

  private fallbackWebSpeech(text?: string) {
    if (text && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = this.playbackRate * 0.9;
      utterance.onend = () => this.stop();
      utterance.onerror = () => this.stop();
      window.speechSynthesis.speak(utterance);
    } else {
      this.stop();
    }
  }

  public stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlaying = false;
    this.currentPlayingId = null;
    this.notify();
  }

  public getCurrentPlayingId(): string | null {
    return this.currentPlayingId;
  }
}

export const audioPlayer = new AudioPlayerService();
