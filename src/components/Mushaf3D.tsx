import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, ChevronLeft, ChevronRight, Volume2, Pause, Heart,
  Edit3, Bookmark as BookmarkIcon, Sparkles, BookMarked, Eye, EyeOff, Book, Maximize2, Minimize2
} from 'lucide-react';
import { Ayah, AppTheme } from '../types';
import { THEMES } from '../styles/themes';
import { SURAH_LIST } from '../data/surahList';
import { getSurahVerses } from '../data/quranVerses';
import { audioPlayer } from '../services/audioPlayer';
import { soundEffects } from '../services/soundEffects';
import { storageService } from '../services/storage';
import { ArabicTriColorText } from '../utils/arabicColorizer';

interface Mushaf3DProps {
  activeTheme: AppTheme;
  currentSurahNumber: number;
  currentJuzNumber?: number;
  currentAyahNumber?: number;
  onSelectSurah: (surahNumber: number) => void;
  onSelectJuz?: (juzNumber: number) => void;
  onOpenAnnotation: (surahNumber: number, ayahNumber: number, surahName: string, arabic: string, translation: string) => void;
  onOpenTajwidRule: (ruleId: string) => void;
  isCoverOpen: boolean;
  onToggleCover: () => void;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
}

// Helper to determine exact Juz span across 30 Juz for each Surah
export function getSurahJuzSpan(surahNumber: number): string {
  if (surahNumber === 1) return 'Juz 1';
  if (surahNumber === 2) return 'Juz 1 — 3';
  if (surahNumber === 3) return 'Juz 3 — 4';
  if (surahNumber === 4) return 'Juz 4 — 6';
  if (surahNumber === 5) return 'Juz 6 — 7';
  if (surahNumber === 6) return 'Juz 7 — 8';
  if (surahNumber === 7) return 'Juz 8 — 9';
  if (surahNumber === 8) return 'Juz 9 — 10';
  if (surahNumber === 9) return 'Juz 10 — 11';
  if (surahNumber === 10) return 'Juz 11';
  if (surahNumber === 11) return 'Juz 11 — 12';
  if (surahNumber === 12) return 'Juz 12 — 13';
  if (surahNumber >= 13 && surahNumber <= 14) return 'Juz 13 — 14';
  if (surahNumber >= 15 && surahNumber <= 16) return 'Juz 14';
  if (surahNumber >= 17 && surahNumber <= 18) return 'Juz 15 — 16';
  if (surahNumber >= 19 && surahNumber <= 20) return 'Juz 16';
  if (surahNumber >= 21 && surahNumber <= 22) return 'Juz 17';
  if (surahNumber >= 23 && surahNumber <= 24) return 'Juz 18';
  if (surahNumber >= 25 && surahNumber <= 27) return 'Juz 19 — 20';
  if (surahNumber >= 28 && surahNumber <= 29) return 'Juz 20 — 21';
  if (surahNumber >= 30 && surahNumber <= 32) return 'Juz 21';
  if (surahNumber >= 33 && surahNumber <= 34) return 'Juz 21 — 22';
  if (surahNumber >= 35 && surahNumber <= 36) return 'Juz 22 — 23';
  if (surahNumber >= 37 && surahNumber <= 39) return 'Juz 23 — 24';
  if (surahNumber >= 40 && surahNumber <= 41) return 'Juz 24 — 25';
  if (surahNumber >= 42 && surahNumber <= 45) return 'Juz 25';
  if (surahNumber >= 46 && surahNumber <= 50) return 'Juz 26';
  if (surahNumber >= 51 && surahNumber <= 57) return 'Juz 27';
  if (surahNumber >= 58 && surahNumber <= 66) return 'Juz 28';
  if (surahNumber >= 67 && surahNumber <= 77) return 'Juz 29';
  return 'Juz 30';
}

export const Mushaf3D: React.FC<Mushaf3DProps> = ({
  activeTheme,
  currentSurahNumber,
  currentAyahNumber = 1,
  onSelectSurah,
  onOpenAnnotation,
  onOpenTajwidRule,
  isCoverOpen,
  onToggleCover,
  isFocusMode = false,
  onToggleFocusMode,
}) => {
  const theme = THEMES[activeTheme];
  const currentSurah = SURAH_LIST.find((s) => s.number === currentSurahNumber) || SURAH_LIST[0];
  const juzSpanLabel = getSurahJuzSpan(currentSurahNumber);

  const [verses, setVerses] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState<'next' | 'prev' | null>(null);
  const [highlightedAyah, setHighlightedAyah] = useState<number | null>(currentAyahNumber);

  // Slow smooth opening state for front leather cover
  const [isOpeningTransition, setIsOpeningTransition] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);

  // Subscribe to audio state
  useEffect(() => {
    const unsub = audioPlayer.subscribe((isPlaying: boolean, id: string | null) => {
      setPlayingTrackId(isPlaying ? id : null);
    });
    return unsub;
  }, []);

  // Fetch complete verses for this Surah (Full without cutoff)
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getSurahVerses(currentSurahNumber).then((data) => {
      if (isMounted) {
        setVerses(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [currentSurahNumber]);

  // Sync last read position
  useEffect(() => {
    if (isCoverOpen && verses.length > 0) {
      const activeAyah = verses.find((v) => v.numberInSurah === highlightedAyah) || verses[0];

      storageService.setLastRead({
        surahNumber: currentSurah.number,
        ayahNumber: activeAyah.numberInSurah,
        surahName: currentSurah.latinName,
        juzNumber: activeAyah.juz || currentSurah.juzStart || 1,
        pageNumber: activeAyah.page || 1,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [highlightedAyah, isCoverOpen, verses, currentSurah]);

  const lastRead = storageService.getLastRead();

  // Slow, smooth cinematic book cover opening action (2.2s)
  const handleOpenCoverSmoothly = () => {
    if (isOpeningTransition) return;
    setIsOpeningTransition(true);
    soundEffects.playSlowBookOpen();

    setTimeout(() => {
      onToggleCover();
      setIsOpeningTransition(false);
    }, 2200);
  };

  // Turn page action with Web Audio paper flip swoosh & rustle + smooth 3D physical turning
  const handleTurnPage = (direction: 'next' | 'prev') => {
    if (isFlipping) return;

    // 1. Play immediate physical air swoosh and textured paper rustle
    soundEffects.playPaperFlipSwooshAndRustle();
    setIsFlipping(direction);

    // 2. Mid-turn at 600ms: swap the Surah content and play landing rustle
    setTimeout(() => {
      soundEffects.playPageFlip();
      if (direction === 'next' && currentSurahNumber < 114) {
        onSelectSurah(currentSurahNumber + 1);
      } else if (direction === 'prev' && currentSurahNumber > 1) {
        onSelectSurah(currentSurahNumber - 1);
      }

      // Smooth scroll back to top of the new sheet
      if (pageContentRef.current) {
        pageContentRef.current.scrollTop = 0;
      }
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }, 600);

    // 3. Complete rotation and settle back into place at 1300ms
    setTimeout(() => {
      setIsFlipping(null);
    }, 1300);
  };

  const handlePlayAyah = (ayah: Ayah) => {
    audioPlayer.playAyah(ayah.globalNumber, ayah.surahNumber, ayah.numberInSurah, ayah.arabicText);
    setHighlightedAyah(ayah.numberInSurah);
  };

  const handleToggleBookmark = (ayah: Ayah) => {
    storageService.toggleBookmark({
      surahNumber: ayah.surahNumber,
      ayahNumber: ayah.numberInSurah,
      surahName: currentSurah.latinName,
      arabicPreview: ayah.arabicText.slice(0, 50) + '...',
      translationPreview: ayah.translationId.slice(0, 80) + '...',
      bookmarkedAt: new Date().toISOString(),
    });
    soundEffects.playBookmarkSnap();
  };

  // Surah Header Banner (Kubah & Kaligrafi Pembuka Lembaran)
  const renderSurahHeaderBanner = () => {
    return (
      <div className="relative mb-6 rounded-2xl border-2 border-amber-600/50 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 p-5 sm:p-6 text-center shadow-lg overflow-hidden">
        {/* Decorative corner flourishes */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500/50 rounded-tl pointer-events-none" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-500/50 rounded-tr pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-500/50 rounded-bl pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500/50 rounded-br pointer-events-none" />

        {/* Top meta tags */}
        <div className="flex items-center justify-between border-b border-amber-800/20 pb-2 text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-sans">
          <span className="font-bold text-amber-800 dark:text-amber-300">
            {juzSpanLabel}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-200">
            Surah Ke-{currentSurah.number} dari 114
          </span>
          <span className="font-semibold text-stone-600 dark:text-stone-300">
            {currentSurah.revelationType} • {currentSurah.totalVerses} Ayat
          </span>
        </div>

        {/* Arabic Calligraphic Surah Name */}
        <div className="font-arabic text-3xl sm:text-5xl font-bold text-amber-950 dark:text-amber-100 my-2 sm:my-3 tracking-normal drop-shadow-sm">
          سُورَةُ {currentSurah.name}
        </div>

        {/* Latin & Meaning */}
        <div className="text-sm sm:text-base font-sans font-bold text-stone-800 dark:text-stone-200">
          {currentSurah.latinName}{' '}
          <span className="font-normal text-stone-600 dark:text-stone-400">
            ({currentSurah.translationId})
          </span>
        </div>

        {/* Sacred Bismillah Plaque (for all surahs except At-Taubah #9) */}
        {currentSurah.number !== 9 && (
          <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-amber-50/95 dark:bg-amber-100/95 border border-amber-900/15 shadow-inner inline-block mx-auto max-w-lg w-full" dir="rtl">
            <ArabicTriColorText
              text="بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
              className="text-2xl sm:text-3xl text-stone-950 font-bold leading-relaxed text-center"
              onRuleClick={onOpenTajwidRule}
            />
          </div>
        )}
      </div>
    );
  };

  // Render individual Ayah card (Sequential, fully ordered)
  const renderAyahCard = (ayah: Ayah, idx: number) => {
    const isPlaying = playingTrackId === `ayah_${ayah.surahNumber}_${ayah.numberInSurah}`;
    const isBookmarked = storageService.isAyahBookmarked(ayah.surahNumber, ayah.numberInSurah);
    const annotation = storageService.getAnnotationForAyah(ayah.surahNumber, ayah.numberInSurah);

    return (
      <div
        key={`ayah_${ayah.surahNumber}_${ayah.numberInSurah}_${idx}`}
        className={`group relative rounded-xl p-3.5 sm:p-5 transition-all mb-4 ${
          isPlaying
            ? 'bg-amber-500/15 border border-amber-400/60 shadow-md ring-1 ring-amber-400/30'
            : annotation
            ? 'bg-yellow-500/10 border border-yellow-400/30'
            : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
        }`}
      >
        {/* Header indicator per Ayah */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-stone-500 mb-2 font-serif">
          <span className="font-semibold text-amber-800 dark:text-amber-400">
            {currentSurah.latinName} : Ayat {ayah.numberInSurah} dari {currentSurah.totalVerses}
          </span>
          <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px]">
            Juz {ayah.juz || currentSurah.juzStart || 1}
          </span>
        </div>

        {/* Arabic Text with Tri-Color Tajwid (Red, Blue, Black) */}
        {(() => {
          let cleanArabic = ayah.arabicText;
          // In Surahs other than Al-Fatihah, Bismillah is already featured in the royal Surah header banner
          if (ayah.surahNumber !== 1 && ayah.numberInSurah === 1) {
            cleanArabic = cleanArabic
              .replace(/^بِسْمِ\s+[\u0600-\u06FF\s]*?ٱلرَّحِيمِ\s*/u, '')
              .replace(/^بِسْمِ\s+[\u0600-\u06FF\s]*?ٱلرَّحِيمِ\s*/u, '')
              .trim();
          }

          return (
            <div className="rounded-xl bg-amber-50/90 dark:bg-amber-100/95 border border-amber-900/10 p-4 sm:p-5 shadow-inner">
              <div className="flex flex-col items-end gap-2" dir="rtl">
                <p className="font-arabic text-2xl sm:text-3xl lg:text-4xl leading-[2.6] sm:leading-[2.8] text-right tracking-wide">
                  <ArabicTriColorText
                    text={cleanArabic}
                    segments={ayah.tajwidSegments}
                    onRuleClick={onOpenTajwidRule}
                  />
                  <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 border-amber-700/60 bg-amber-500/20 text-xs sm:text-sm font-bold text-amber-950 mr-2 align-middle font-sans shadow-sm">
                    {ayah.numberInSurah}
                  </span>
                </p>
              </div>
            </div>
          );
        })()}

        {/* Transliteration Latin */}
        {showTransliteration && ayah.transliteration && (
          <p className="mt-3 text-xs sm:text-sm font-medium text-amber-900/90 dark:text-amber-300/90 italic leading-relaxed">
            {ayah.transliteration}
          </p>
        )}

        {/* Indonesian Translation */}
        {showTranslation && ayah.translationId && (
          <p className="mt-1.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
            {ayah.translationId}
          </p>
        )}

        {/* Action tools per ayah */}
        <div className="mt-3 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePlayAyah(ayah)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-colors ${
                isPlaying
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              <span>{isPlaying ? 'Jeda' : 'Audio Qari'}</span>
            </button>

            <button
              onClick={() => handleToggleBookmark(ayah)}
              title="Simpan ke Favorit"
              className="rounded-lg p-1.5 text-stone-600 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              <Heart
                className={`h-4 w-4 ${
                  isBookmarked ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
            </button>

            <button
              onClick={() =>
                onOpenAnnotation(
                  ayah.surahNumber,
                  ayah.numberInSurah,
                  currentSurah.latinName,
                  ayah.arabicText,
                  ayah.translationId
                )
              }
              title="Catat Tadabbur & Refleksi"
              className="rounded-lg p-1.5 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
            </button>
          </div>

          {annotation && (
            <span className="text-[10px] sm:text-xs text-amber-600 dark:text-amber-400 font-medium">
              Catatan Tersimpan
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* 3D Stage Container */}
      <div className="perspective-2400 relative w-full flex items-center justify-center py-2 sm:py-4">
        {!isCoverOpen ? (
          /* =========================================================================
             3D CLOSED LEATHER COVER (JUNIOR QURAN • JUZ 1–30)
             ========================================================================= */
          <div className="relative flex items-center justify-center">
            {/* Illuminated First Page under cover */}
            <div
              className={`absolute top-0 flex h-[580px] w-[340px] sm:h-[650px] sm:w-[420px] rounded-r-2xl rounded-l-md border-r-4 border-b-8 border-black/40 ${theme.pageBg} p-6 sm:p-8 shadow-2xl transition-all flex-col justify-between overflow-hidden`}
            >
              <div className="flex items-center justify-between border-b border-amber-800/20 pb-2 text-[11px] text-stone-600 font-serif">
                <span className="font-semibold text-amber-800 dark:text-amber-400">JUZ 1 • HALAMAN 1</span>
                <span className="font-arabic font-bold">الفاتحة</span>
                <span>7 Ayat Lengkap</span>
              </div>

              <div className="my-auto text-center space-y-4">
                <div className="rounded-xl border border-amber-600/40 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 p-4 shadow-inner">
                  <div className="font-arabic text-3xl font-bold text-amber-950 dark:text-amber-200">
                    سُورَةُ الفَاتِحَةِ
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-sans">
                    Al-Fatihah • Pembukaan 30 Juz Junior Quran
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/90 dark:bg-amber-100/95 border border-amber-900/15 shadow-inner">
                  <p className="font-arabic text-2xl text-stone-950 font-bold leading-loose">
                    <span className="text-stone-950">بِسْمِ ٱللَّهِ </span>
                    <span className="text-red-600">ٱلرَّحْمَٰنِ </span>
                    <span className="text-blue-600">ٱلرَّحِيمِ</span>
                  </p>
                  <p className="text-xs text-stone-600 italic mt-2">
                    "Tersusun Rapi dari Juz 1 s/d Juz 30 Tanpa Potongan"
                  </p>
                </div>
              </div>

              <div className="text-center text-[10px] text-stone-500 border-t border-amber-800/20 pt-2 font-display uppercase tracking-widest">
                Junior Quran 3D Digital • 114 Surah Penuh
              </div>
            </div>

            {/* 3D Front Leather Cover */}
            <div
              onClick={handleOpenCoverSmoothly}
              className={`group relative cursor-pointer transform-style-3d transition-all duration-[2200ms] ${
                isOpeningTransition
                  ? '-rotate-y-[170deg] -translate-x-12 opacity-95 scale-[1.02] shadow-[0_30px_70px_rgba(0,0,0,0.85)]'
                  : 'rotate-y-0 hover:scale-[1.015]'
              }`}
              style={{
                transformOrigin: 'left center',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.9, 0.25, 1)',
              }}
            >
              <div className="relative flex h-[580px] w-[340px] sm:h-[650px] sm:w-[420px] rounded-r-2xl rounded-l-md border-r-4 border-b-8 border-black/40 bg-gradient-to-r from-black/25 via-transparent to-black/10 p-2 shadow-2xl transition-all">
                <div
                  className={`relative flex h-full w-full flex-col items-center justify-between rounded-r-xl rounded-l-sm border-2 border-amber-500/50 p-6 sm:p-8 bg-gradient-to-br ${theme.coverTexture} ${theme.glowEffect} shadow-inner overflow-hidden`}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />

                  {/* Ribbon Bookmark */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEffects.playBookmarkSnap();
                      onSelectSurah(lastRead.surahNumber || 1);
                      handleOpenCoverSmoothly();
                    }}
                    title={`Lanjutkan membaca: QS. ${lastRead.surahName}:${lastRead.ayahNumber}`}
                    className="absolute left-16 -top-3 z-30 flex flex-col items-center cursor-pointer transition-transform hover:translate-y-1"
                  >
                    <div className={`h-24 w-4 ${theme.ribbonColor} shadow-md border-x border-amber-300/40`} />
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-amber-400" />
                  </div>

                  {/* Corners */}
                  <div className="absolute top-3 left-3 w-16 h-16 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg pointer-events-none opacity-80" />
                  <div className="absolute top-3 right-3 w-16 h-16 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg pointer-events-none opacity-80" />
                  <div className="absolute bottom-3 left-3 w-16 h-16 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg pointer-events-none opacity-80" />
                  <div className="absolute bottom-3 right-3 w-16 h-16 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg pointer-events-none opacity-80" />

                  {/* Inscription */}
                  <div className="text-center pt-6">
                    <span className="font-display text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-300/90 font-bold">
                      JUZ 1 — 30 • 114 SURAH
                    </span>
                    <div className="mx-auto mt-2 h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
                  </div>

                  {/* Medallion */}
                  <div className="relative flex flex-col items-center justify-center my-auto">
                    <div className="relative flex h-56 w-56 sm:h-64 sm:w-64 items-center justify-center rounded-full border-4 border-dashed border-amber-400/60 p-2 shadow-[0_0_35px_rgba(245,158,11,0.25)]">
                      <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-amber-300/80 bg-black/30 backdrop-blur-sm p-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-arabic text-3xl sm:text-4xl font-bold tracking-normal text-amber-200 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
                            القرآن الكريم
                          </span>
                          <span className="font-display text-sm sm:text-base font-extrabold tracking-widest text-amber-300 mt-2">
                            JUNIOR QURAN
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Open Trigger */}
                  <div className="w-full flex flex-col items-center pb-4 space-y-3 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCoverSmoothly();
                      }}
                      className="group/btn flex items-center gap-2 rounded-full border border-amber-400/60 bg-amber-500/20 px-6 py-2.5 text-xs font-bold text-amber-200 shadow-lg backdrop-blur transition-all hover:scale-105 hover:bg-amber-500 hover:text-stone-950"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>{isOpeningTransition ? 'MEMBUKA PERLAHAN...' : 'BUKA JUNIOR QURAN'}</span>
                    </button>

                    <div className="flex items-center gap-1 text-[11px] text-amber-300/80">
                      <BookMarked className="h-3 w-3 text-amber-400" />
                      <span>Terakhir: QS. {lastRead.surahName} (Ayat {lastRead.ayahNumber})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================================
             3D OPEN PHYSICAL BOOK SPREAD: 1 LEMBAR PENUH TERATUR DARI JUZ 1 S/D 30
             ========================================================================= */
          <div className="relative flex w-full flex-col items-center animate-in fade-in duration-700">
            {/* Top Toolbar (Hidden in Focus Mode) */}
            {!isFocusMode && (
              <div className="mb-3 flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/75 px-3 sm:px-4 py-2.5 backdrop-blur-md">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      soundEffects.playCoverMove(false);
                      onToggleCover();
                    }}
                    className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Tutup Sampul</span>
                  </button>

                  <div className="h-4 w-px bg-white/10 hidden sm:block" />

                  {/* Clean Surah Quick Selector covering Juz 1 to Juz 30 */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-stone-300 hidden sm:inline">
                      Pilih Surah:
                    </span>
                    <select
                      value={currentSurahNumber}
                      onChange={(e) => {
                        const nextNum = Number(e.target.value);
                        if (nextNum !== currentSurahNumber) {
                          handleTurnPage(nextNum > currentSurahNumber ? 'next' : 'prev');
                        }
                      }}
                      className="rounded-lg border border-amber-500/40 bg-stone-900 px-2.5 py-1 text-xs font-bold text-amber-300 focus:border-amber-400 focus:outline-none"
                    >
                      {SURAH_LIST.map((s) => (
                        <option key={s.number} value={s.number}>
                          {s.number}. {s.latinName} ({getSurahJuzSpan(s.number)} • {s.totalVerses} Ayat)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Active Juz Span Badge */}
                  <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                    {juzSpanLabel}
                  </span>
                </div>

                {/* Options: Latin, Terjemahan, Focus Mode */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setShowTransliteration(!showTransliteration)}
                    title="Tampilkan / Sembunyikan Latin"
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs transition-colors ${
                      showTransliteration
                        ? 'bg-white/15 text-amber-300 font-semibold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {showTransliteration ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    <span>Latin</span>
                  </button>

                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    title="Tampilkan / Sembunyikan Terjemahan"
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs transition-colors ${
                      showTranslation
                        ? 'bg-white/15 text-amber-300 font-semibold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span>Terjemahan</span>
                  </button>

                  {/* Focus Mode 1-Tap Toggle */}
                  {onToggleFocusMode && (
                    <button
                      onClick={onToggleFocusMode}
                      title="Mode Fokus (Sembunyikan UI Sekeliling)"
                      className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-all border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Mode Fokus</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Floating Focus Mode Bar (Center top with single tap exit) */}
            {isFocusMode && onToggleFocusMode && (
              <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                <button
                  onClick={onToggleFocusMode}
                  title="Keluar dari Mode Fokus (Esc / F)"
                  className="group flex items-center gap-2.5 rounded-full border border-amber-400/70 bg-stone-900/95 px-5 py-2.5 text-xs font-semibold text-amber-200 shadow-2xl backdrop-blur-md hover:bg-amber-500 hover:text-stone-950 transition-all hover:scale-105"
                >
                  <Minimize2 className="h-4 w-4 text-amber-400 group-hover:text-stone-950" />
                  <span>Mode Fokus Aktif • Ketuk untuk Menampilkan Menu</span>
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono opacity-80">(Esc / F)</span>
                </button>
              </div>
            )}

            {/* Turning Leaf Notification Banner */}
            {isFlipping && (
              <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 rounded-full border border-amber-400/60 bg-black/90 px-5 py-2 text-xs font-semibold text-amber-300 shadow-2xl backdrop-blur-md">
                  <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
                  <span>
                    {isFlipping === 'next'
                      ? `Membalik Lembaran Perlahan: Menuju QS. ${SURAH_LIST[currentSurahNumber]?.latinName || ''} (${getSurahJuzSpan(currentSurahNumber + 1)})...`
                      : `Membalik Lembaran Perlahan: Menuju QS. ${SURAH_LIST[currentSurahNumber - 2]?.latinName || ''} (${getSurahJuzSpan(currentSurahNumber - 1)})...`}
                  </span>
                </div>
              </div>
            )}

            {/* =========================================================================
                THE PHYSICAL 3D BOOK FOLIO SPREAD (1 LEMBAR FULL TANPA POTONGAN)
                ========================================================================= */}
            <div
              ref={containerRef}
              className={`relative flex min-h-[580px] sm:min-h-[660px] w-full max-w-5xl rounded-2xl ${theme.pageBg} text-stone-900 shadow-2xl book-shadow overflow-hidden transition-all duration-[1200ms] ${
                isFlipping === 'next'
                  ? 'rotate-y-[-18deg] scale-[0.98] opacity-80 shadow-[0_30px_70px_rgba(0,0,0,0.7)]'
                  : isFlipping === 'prev'
                  ? 'rotate-y-[18deg] scale-[0.98] opacity-80 shadow-[0_30px_70px_rgba(0,0,0,0.7)]'
                  : 'scale-100 rotate-y-0'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {/* Stack of pages paper edge styling */}
              <div className="absolute -left-1 top-2 bottom-2 w-2 bg-stone-300 rounded-l paper-stack-edge-left pointer-events-none hidden sm:block" />
              <div className="absolute -right-1 top-2 bottom-2 w-2 bg-stone-300 rounded-r paper-stack-edge pointer-events-none hidden sm:block" />

              {/* Hanging Bookmark ribbon into page */}
              <div
                onClick={() => {
                  soundEffects.playBookmarkSnap();
                  if (verses.length > 0) {
                    handleToggleBookmark(verses[0]);
                  }
                }}
                title="Tandai Lembaran Ini dengan Pita Pembatas"
                className="absolute right-8 -top-2 z-30 cursor-pointer flex flex-col items-center hover:translate-y-1 transition-transform"
              >
                <div className={`h-24 sm:h-28 w-4 ${theme.ribbonColor} shadow-md border-x border-amber-300/40`} />
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-amber-400" />
              </div>

              {/* 3D Physical Turning Paper Leaf (Animasi Balik Kertas 3D Fisik) */}
              {isFlipping && (
                <div
                  className={`absolute inset-0 z-40 pointer-events-none transform-style-3d ${
                    isFlipping === 'next' ? 'animate-page-flip-next' : 'animate-page-flip-prev'
                  }`}
                  style={{
                    transformOrigin: isFlipping === 'next' ? 'left center' : 'right center',
                  }}
                >
                  <div className={`absolute inset-0 ${theme.pageBg} border-l-2 border-r-2 border-black/15 shadow-2xl flex flex-col justify-between p-6 sm:p-10 backface-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/15 pointer-events-none" />
                    <div className="flex items-center justify-between border-b border-amber-800/20 pb-2 text-[11px] text-stone-600 font-serif">
                      <span className="font-bold text-amber-900">
                        {currentSurah.latinName} • {juzSpanLabel}
                      </span>
                      <span className="text-amber-800 font-medium">Membalik Kertas Fisik...</span>
                    </div>
                    <div className="my-auto text-center space-y-3">
                      <span className="font-arabic text-3xl sm:text-4xl font-bold text-amber-950">
                        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                      </span>
                    </div>
                    <div className="text-center text-[10px] text-stone-400 border-t border-amber-800/20 pt-2">
                      Junior Quran 3D • Transisi Lembar Mushaf
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  THE FULL SHEET (1 LEMBAR UTUH TANPA POTONGAN SAMA SEKALI)
                  ========================================================================= */}
              <div
                ref={pageContentRef}
                className="flex flex-col w-full p-4 sm:p-8 lg:p-10 overflow-y-auto max-h-[78vh] no-scrollbar scroll-smooth"
              >
                {/* Top Sheet Running Header */}
                <div className="flex items-center justify-between border-b border-amber-800/20 pb-2 mb-4 text-xs text-stone-600 font-serif">
                  <span className="font-bold text-amber-900 dark:text-amber-400">
                    QS. {currentSurah.number} • {currentSurah.latinName}
                  </span>
                  <span className="font-arabic font-bold text-base sm:text-lg">
                    سُورَةُ {currentSurah.name}
                  </span>
                  <span className="font-semibold text-amber-800 dark:text-amber-300">
                    {juzSpanLabel}
                  </span>
                </div>

                {/* Royal Surah Header Banner with Calligraphy & Bismillah */}
                {renderSurahHeaderBanner()}

                {/* Complete Verses List (Tanpa Potongan) */}
                <div className="space-y-3 my-2">
                  {loading ? (
                    <div className="py-24 text-center space-y-3">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
                      <div className="text-xs sm:text-sm text-stone-600 font-medium">
                        Memuat naskah Utsmani lengkap QS. {currentSurah.latinName} (tanpa potongan)...
                      </div>
                    </div>
                  ) : (
                    verses.map((ayah, idx) => renderAyahCard(ayah, idx))
                  )}
                </div>

                {/* Sheet Bottom Footer */}
                <div className="mt-8 border-t border-amber-800/20 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-sans gap-2">
                  <span>Junior Quran 3D • {currentSurah.latinName} (Lengkap {verses.length} Ayat)</span>
                  <span className="font-semibold text-amber-800 dark:text-amber-400">
                    Tersusun Rapi dari Juz 1 s/d Juz 30
                  </span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                BOTTOM NAVIGATION CONTROLS (Next / Prev with 3D Swoosh & Rustle)
                ========================================================================= */}
            <div className="mt-3 sm:mt-4 flex w-full max-w-5xl items-center justify-between gap-2 px-1 sm:px-2">
              <button
                disabled={currentSurahNumber <= 1 || !!isFlipping}
                onClick={() => handleTurnPage('prev')}
                className="group flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/70 px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-stone-100 backdrop-blur transition-all hover:border-amber-400 hover:bg-stone-900 hover:text-amber-300 disabled:opacity-30 disabled:pointer-events-none shadow-lg active:scale-95"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-stone-400">Sebelumnya</span>
                  <span className="truncate max-w-[130px] sm:max-w-none">
                    {currentSurahNumber > 1
                      ? `${currentSurahNumber - 1}. ${SURAH_LIST[currentSurahNumber - 2]?.latinName}`
                      : 'Awal Mushaf'}
                  </span>
                </div>
              </button>

              <div className="hidden sm:flex flex-col items-center text-center px-2">
                <span className="text-xs font-bold text-amber-300">
                  Surah {currentSurah.number} dari 114 Surah • {juzSpanLabel}
                </span>
                <span className="text-[10px] text-stone-400">
                  Total {verses.length} Ayat Lengkap • Tanpa Potongan
                </span>
              </div>

              <button
                disabled={currentSurahNumber >= 114 || !!isFlipping}
                onClick={() => handleTurnPage('next')}
                className="group flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/70 px-3 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-stone-100 backdrop-blur transition-all hover:border-amber-400 hover:bg-stone-900 hover:text-amber-300 disabled:opacity-30 disabled:pointer-events-none shadow-lg active:scale-95"
              >
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-stone-400">Selanjutnya</span>
                  <span className="truncate max-w-[130px] sm:max-w-none">
                    {currentSurahNumber < 114
                      ? `${currentSurahNumber + 1}. ${SURAH_LIST[currentSurahNumber]?.latinName}`
                      : 'Akhir Mushaf'}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
