import { Annotation, AppTheme, Bookmark, KhatamTarget, LastReadPosition, UserProfile } from '../types';

const STORAGE_KEYS = {
  THEME: 'mushaf_theme',
  BOOKMARKS: 'mushaf_bookmarks',
  ANNOTATIONS: 'mushaf_annotations',
  LAST_READ: 'mushaf_last_read',
  KHATAM_TARGET: 'mushaf_khatam_target',
  USER_PROFILE: 'mushaf_user_profile',
  IQRO_PROGRESS: 'mushaf_iqro_progress',
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_default',
  name: 'Hamba Allah',
  email: 'qari@mushaf3d.id',
  avatarSeed: 'emerald_crescent',
  syncCode: 'MSHF-786-SYNC',
  lastSyncedAt: new Date().toISOString(),
};

const DEFAULT_KHATAM: KhatamTarget = {
  targetDays: 30, // 30 days Ramadan plan = 1 juz per day
  startDate: new Date().toISOString(),
  pagesReadToday: 4,
  dailyPageGoal: 20, // 20 pages = 1 juz
  completedJuz: [1],
  reminderEnabled: true,
  reminderTime: '18:30', // Ba'da Maghrib
  streakDays: 5,
  lastReadingDate: new Date().toISOString(),
};

const DEFAULT_LAST_READ: LastReadPosition = {
  surahNumber: 1,
  ayahNumber: 1,
  surahName: 'Al-Fatihah',
  juzNumber: 1,
  pageNumber: 1,
  updatedAt: new Date().toISOString(),
};

export const storageService = {
  // Theme
  getTheme(): AppTheme {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.THEME);
      if (val && ['emerald', 'onyx', 'parchment', 'navy', 'minimal'].includes(val)) {
        return val as AppTheme;
      }
    } catch {}
    return 'emerald';
  },

  setTheme(theme: AppTheme) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch {}
  },

  // User Profile & Multi-Device Sync
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (data) return JSON.parse(data);
    } catch {}
    return DEFAULT_PROFILE;
  },

  saveUserProfile(profile: UserProfile) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch {}
  },

  // Bookmarks (Ayat Favorit)
  getBookmarks(): Bookmark[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (data) return JSON.parse(data);
    } catch {}
    return [
      {
        surahNumber: 1,
        ayahNumber: 1,
        surahName: "Al-Fatihah",
        arabicPreview: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        translationPreview: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang.",
        bookmarkedAt: new Date().toISOString(),
      },
      {
        surahNumber: 2,
        ayahNumber: 255,
        surahName: "Al-Baqarah (Ayat Kursi)",
        arabicPreview: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ...",
        translationPreview: "Allah, tidak ada tuhan selain Dia. Yang Mahahidup, Yang terus-menerus mengurus (makhluk-Nya)...",
        bookmarkedAt: new Date().toISOString(),
      }
    ];
  },

  toggleBookmark(bookmark: Bookmark): boolean {
    const list = this.getBookmarks();
    const index = list.findIndex(
      (b) => b.surahNumber === bookmark.surahNumber && b.ayahNumber === bookmark.ayahNumber
    );
    let isNowBookmarked = false;
    if (index >= 0) {
      list.splice(index, 1);
      isNowBookmarked = false;
    } else {
      list.unshift(bookmark);
      isNowBookmarked = true;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    } catch {}
    return isNowBookmarked;
  },

  isAyahBookmarked(surahNumber: number, ayahNumber: number): boolean {
    const list = this.getBookmarks();
    return list.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
  },

  // Annotations (Catatan & Highlight)
  getAnnotations(): Annotation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANNOTATIONS);
      if (data) return JSON.parse(data);
    } catch {}
    return [
      {
        id: 'ann_1',
        surahNumber: 1,
        ayahNumber: 5,
        surahName: 'Al-Fatihah',
        note: 'Tadabbur penting: Mengikhlaskan tauhid ibadah dan istianah hanya kepada Allah SWT semata.',
        color: 'yellow',
        createdAt: new Date().toISOString()
      }
    ];
  },

  saveAnnotation(annotation: Annotation) {
    const list = this.getAnnotations();
    const index = list.findIndex(
      (a) => a.surahNumber === annotation.surahNumber && a.ayahNumber === annotation.ayahNumber
    );
    if (index >= 0) {
      list[index] = annotation;
    } else {
      list.unshift(annotation);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOTATIONS, JSON.stringify(list));
    } catch {}
  },

  deleteAnnotation(id: string) {
    const list = this.getAnnotations().filter((a) => a.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOTATIONS, JSON.stringify(list));
    } catch {}
  },

  getAnnotationForAyah(surahNumber: number, ayahNumber: number): Annotation | undefined {
    return this.getAnnotations().find(
      (a) => a.surahNumber === surahNumber && a.ayahNumber === ayahNumber
    );
  },

  // Last Read
  getLastRead(): LastReadPosition {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LAST_READ);
      if (data) return JSON.parse(data);
    } catch {}
    return DEFAULT_LAST_READ;
  },

  setLastRead(pos: LastReadPosition) {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_READ, JSON.stringify(pos));
    } catch {}
  },

  // Khatam Target & Streak
  getKhatamTarget(): KhatamTarget {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.KHATAM_TARGET);
      if (data) return JSON.parse(data);
    } catch {}
    return DEFAULT_KHATAM;
  },

  saveKhatamTarget(target: KhatamTarget) {
    try {
      localStorage.setItem(STORAGE_KEYS.KHATAM_TARGET, JSON.stringify(target));
    } catch {}
  },

  // Iqro Progress (Level & Completed Pages)
  getIqroProgress(): Record<number, number[]> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.IQRO_PROGRESS);
      if (data) return JSON.parse(data);
    } catch {}
    return { 1: [1], 2: [], 3: [], 4: [], 5: [], 6: [] };
  },

  markIqroPageDone(level: number, page: number) {
    const progress = this.getIqroProgress();
    if (!progress[level]) progress[level] = [];
    if (!progress[level].includes(page)) {
      progress[level].push(page);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.IQRO_PROGRESS, JSON.stringify(progress));
    } catch {}
  },

  // Complete Data Export & Cross-Device Sync Backup
  generateBackupJSON(): string {
    const payload = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile: this.getUserProfile(),
      theme: this.getTheme(),
      bookmarks: this.getBookmarks(),
      annotations: this.getAnnotations(),
      lastRead: this.getLastRead(),
      khatamTarget: this.getKhatamTarget(),
      iqroProgress: this.getIqroProgress()
    };
    return JSON.stringify(payload, null, 2);
  },

  importBackupJSON(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) this.saveUserProfile(parsed.profile);
      if (parsed.theme) this.setTheme(parsed.theme);
      if (Array.isArray(parsed.bookmarks)) {
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(parsed.bookmarks));
      }
      if (Array.isArray(parsed.annotations)) {
        localStorage.setItem(STORAGE_KEYS.ANNOTATIONS, JSON.stringify(parsed.annotations));
      }
      if (parsed.lastRead) this.setLastRead(parsed.lastRead);
      if (parsed.khatamTarget) this.saveKhatamTarget(parsed.khatamTarget);
      if (parsed.iqroProgress) {
        localStorage.setItem(STORAGE_KEYS.IQRO_PROGRESS, JSON.stringify(parsed.iqroProgress));
      }
      return true;
    } catch (e) {
      console.error('Failed to import backup', e);
      return false;
    }
  }
};
