export type AppTheme = 'emerald' | 'onyx' | 'parchment' | 'navy' | 'minimal';

export interface SurahMeta {
  number: number;
  name: string; // Arabic name
  latinName: string;
  translationId: string;
  totalVerses: number;
  revelationType: 'Makkiyah' | 'Madaniyah';
  juzStart: number;
  pageStart: number;
}

export interface Ayah {
  numberInSurah: number;
  globalNumber: number;
  surahNumber: number;
  arabicText: string;
  transliteration: string;
  translationId: string;
  juz: number;
  page: number;
  tajwidSegments?: {
    text: string;
    rule?: 'ghunnah' | 'ikhfa' | 'idgham' | 'idgham_bighunnah' | 'iqlab' | 'qalqalah' | 'mad';
  }[];
}

export interface JuzMeta {
  juzNumber: number;
  startSurahNumber: number;
  startSurahName: string;
  startAyahNumber: number;
  pageNumber: number;
}

export interface Annotation {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  note: string;
  color: 'yellow' | 'green' | 'blue' | 'rose';
  createdAt: string;
}

export interface Bookmark {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  arabicPreview: string;
  translationPreview: string;
  bookmarkedAt: string;
}

export interface LastReadPosition {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  juzNumber: number;
  pageNumber: number;
  updatedAt: string;
}

export interface KhatamTarget {
  targetDays: number;
  startDate: string;
  pagesReadToday: number;
  dailyPageGoal: number;
  completedJuz: number[];
  reminderEnabled: boolean;
  reminderTime: string;
  streakDays: number;
  lastReadingDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarSeed: string;
  syncCode: string;
  lastSyncedAt: string;
}

export interface IqroItem {
  id: string;
  arabic: string;
  latin: string;
  transcription: string;
  audioHint?: string;
  ruleExplanation?: string;
}

export interface IqroPage {
  level: number; // 1 to 6
  pageNumber: number;
  title: string;
  subtitle: string;
  description: string;
  items: IqroItem[];
}
