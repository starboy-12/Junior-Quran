import React, { useState } from 'react';
import { Volume2, CheckCircle2, Award, ChevronLeft, ChevronRight, HelpCircle, Star, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { IQRO_MODULES } from '../data/iqroLessons';
import { audioPlayer } from '../services/audioPlayer';
import { soundEffects } from '../services/soundEffects';
import { storageService } from '../services/storage';
import { IqroItem } from '../types';

export const IqroLearning: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1.0);
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [targetQuizItem, setTargetQuizItem] = useState<IqroItem | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  // Pages for selected level
  const pagesForLevel = IQRO_MODULES.filter((p) => p.level === selectedLevel);
  const currentPage = pagesForLevel[pageIndex] || pagesForLevel[0];

  const progress = storageService.getIqroProgress();
  const isPageCompleted = progress[selectedLevel]?.includes(currentPage?.pageNumber || 1);

  const handlePlayItem = (item: IqroItem) => {
    audioPlayer.playPhonetic(item.arabic, item.latin);
    soundEffects.playBookmarkSnap();
  };

  const handleToggleSpeed = () => {
    const nextSpeed = speed === 1.0 ? 0.75 : speed === 0.75 ? 1.25 : 1.0;
    setSpeed(nextSpeed);
    audioPlayer.setPlaybackRate(nextSpeed);
  };

  const handleMarkDone = () => {
    storageService.markIqroPageDone(selectedLevel, currentPage.pageNumber);
    soundEffects.playCompletionChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const startQuiz = () => {
    if (!currentPage || !currentPage.items.length) return;
    const randomItem = currentPage.items[Math.floor(Math.random() * currentPage.items.length)];
    setTargetQuizItem(randomItem);
    setQuizActive(true);
    setQuizFeedback(null);
    audioPlayer.playPhonetic(randomItem.arabic);
  };

  const handleQuizAnswer = (item: IqroItem) => {
    if (!targetQuizItem) return;
    if (item.id === targetQuizItem.id) {
      setQuizScore((prev) => prev + 1);
      setQuizFeedback('Masya Allah, Hebat! Jawabanmu Benar 🎉');
      soundEffects.playCompletionChime();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
      setTimeout(() => {
        startQuiz();
      }, 1500);
    } else {
      setQuizFeedback('Ayo coba dengarkan lagi dengan teliti yaa 😊');
      soundEffects.playPageFlip();
      audioPlayer.playPhonetic(targetQuizItem.arabic);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-2xl font-bold tracking-tight text-amber-200 sm:text-3xl">
              Iqro 1–6 Interaktif Anak
            </h1>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Volume2 className="h-3 w-3" />
              <span>Suara Qari Mushaf Tartil</span>
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Pelafalan makhraj huruf presisi dan benar sesuai kaidah tajwid Mushaf Al-Qur'an
          </p>
        </div>

        {/* Speed & Quiz controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSpeed}
            title="Ubah Kecepatan Suara Tajwid"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-stone-900 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-stone-800 transition-colors"
          >
            <span>Tempo: {speed}x</span>
            {speed === 0.75 && <span className="text-[10px] text-emerald-400">(Tajwid Perlahan)</span>}
          </button>

          <button
            onClick={() => {
              if (quizActive) {
                setQuizActive(false);
              } else {
                startQuiz();
              }
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              quizActive
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-amber-500 text-stone-950 hover:bg-amber-400'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>{quizActive ? 'Keluar Kuis' : 'Kuis Tebak Huruf'}</span>
          </button>
        </div>
      </div>

      {/* Iqro Level Selection (1 to 6) */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {[1, 2, 3, 4, 5, 6].map((lvl) => {
          const isSelected = selectedLevel === lvl;
          return (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                setPageIndex(0);
                setQuizActive(false);
                soundEffects.playPageFlip();
              }}
              className={`flex flex-col items-center justify-center rounded-xl border p-2.5 transition-all ${
                isSelected
                  ? 'border-amber-400 bg-amber-500/20 text-amber-200 ring-2 ring-amber-400/40'
                  : 'border-white/10 bg-stone-900/60 text-stone-400 hover:border-white/20 hover:text-stone-200'
              }`}
            >
              <span className="text-xs font-bold">IQRO {lvl}</span>
              <span className="text-[10px] text-stone-400">
                {lvl === 1 && 'Huruf Tunggal'}
                {lvl === 2 && 'Sambung & Mad'}
                {lvl === 3 && 'Kasrah & Dhammah'}
                {lvl === 4 && 'Tanwin & Sukun'}
                {lvl === 5 && 'Tasydid & Waqaf'}
                {lvl === 6 && 'Hukum Tajwid'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quiz Banner if Active */}
      {quizActive && targetQuizItem && (
        <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => audioPlayer.playPhonetic(targetQuizItem.arabic)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500 text-stone-950 shadow-lg hover:scale-105 transition-transform"
                title="Dengarkan Ulang Bunyi"
              >
                <Volume2 className="h-6 w-6" />
              </button>
              <div>
                <span className="text-xs font-semibold text-amber-300">
                  Kuis Tebak Huruf • Skor: {quizScore}
                </span>
                <p className="text-sm font-medium text-stone-100">
                  Dengarkan suaranya, lalu ketuk kartu huruf yang sesuai di bawah ini!
                </p>
              </div>
            </div>

            {quizFeedback && (
              <span className="text-xs font-semibold text-amber-300 bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30">
                {quizFeedback}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Learning Canvas */}
      {currentPage && (
        <div className="relative rounded-2xl border border-amber-500/30 bg-[#fdf9f0] p-6 text-stone-900 shadow-xl dark:bg-stone-900 dark:text-stone-100">
          {/* Card Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 dark:border-white/10 pb-4 mb-6 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {currentPage.title}
                </span>
                <span aria-hidden="true" className="text-stone-400">·</span>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  Halaman {pageIndex + 1} dari {pagesForLevel.length}
                </span>
              </div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                {currentPage.subtitle}
              </h2>
            </div>

            {/* Page navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                disabled={pageIndex === 0}
                onClick={() => {
                  setPageIndex((prev) => Math.max(0, prev - 1));
                  soundEffects.playPageFlip();
                }}
                className="flex items-center gap-1 rounded-lg border border-stone-300 dark:border-white/10 px-2.5 py-1.5 text-xs font-medium disabled:opacity-30 hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Halaman Sebelumnya</span>
              </button>
              <button
                disabled={pageIndex >= pagesForLevel.length - 1}
                onClick={() => {
                  setPageIndex((prev) => Math.min(pagesForLevel.length - 1, prev + 1));
                  soundEffects.playPageFlip();
                }}
                className="flex items-center gap-1 rounded-lg border border-stone-300 dark:border-white/10 px-2.5 py-1.5 text-xs font-medium disabled:opacity-30 hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
              >
                <span className="hidden sm:inline">Halaman Selanjutnya</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Description banner */}
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3.5 text-xs text-amber-900 dark:text-amber-200 leading-relaxed mb-6">
            <span className="font-semibold text-amber-800 dark:text-amber-300">📖 Panduan Ustadz / Guru: </span>
            {currentPage.description}
          </div>

          {/* Hijaiyah Interactive Grid */}
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            {currentPage.items.map((item, idx) => {
              // Tri-color rendering for Iqro:
              const parts = item.arabic.split(' ');
              const renderArabicTriColor = () => {
                if (parts.length > 1) {
                  return parts.map((part, pIdx) => {
                    const color =
                      pIdx % 3 === 0
                        ? 'text-blue-600 font-bold'
                        : pIdx % 3 === 1
                        ? 'text-red-600 font-bold'
                        : 'text-black dark:text-stone-900 font-bold';
                    return (
                      <span key={pIdx} className={color}>
                        {part}{' '}
                      </span>
                    );
                  });
                }
                // Single letter: cycle through Blue, Red, Black
                const singleColor =
                  idx % 3 === 0
                    ? 'text-blue-600 font-bold'
                    : idx % 3 === 1
                    ? 'text-red-600 font-bold'
                    : 'text-black dark:text-stone-900 font-bold';
                return <span className={singleColor}>{item.arabic}</span>;
              };

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (quizActive) {
                      handleQuizAnswer(item);
                    } else {
                      handlePlayItem(item);
                    }
                  }}
                  className="group relative flex flex-col items-center justify-center rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md dark:border-white/10 dark:bg-stone-800/80 dark:hover:border-amber-400"
                >
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Volume2 className="h-4 w-4 text-amber-500" />
                  </div>

                  {/* Parchment background card for vibrant Blue, Red, and Black Arabic ink */}
                  <div className="rounded-xl bg-amber-50/90 dark:bg-amber-100/95 border border-amber-900/10 px-3 py-2 w-full text-center shadow-inner my-1">
                    <div className="font-arabic text-3xl sm:text-4xl py-1" dir="rtl">
                      {renderArabicTriColor()}
                    </div>
                  </div>

                  <div className="text-xs font-bold text-stone-700 dark:text-stone-300 mt-2">
                    {item.latin}
                  </div>

                  <div className="text-[10px] text-stone-500 dark:text-stone-400 text-center mt-0.5">
                    {item.transcription}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Completion celebration footer */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-stone-200 dark:border-white/10 pt-4 gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>Dengarkan dan tirukan hingga lidah lancar & makhraj tepat</span>
            </div>

            <button
              onClick={handleMarkDone}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                isPageCompleted
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-amber-500 text-stone-950 hover:bg-amber-400'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isPageCompleted ? 'Halaman Selesai Lulus ★' : 'Tandai Halaman Selesai'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
