import React, { useState } from 'react';
import { Target, Calendar, Check, Bell, Flame, Sparkles, Plus, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { KhatamTarget } from '../types';
import { storageService } from '../services/storage';
import { soundEffects } from '../services/soundEffects';

interface KhatamTrackerProps {
  onNavigateToJuz: (juzNumber: number) => void;
}

export const KhatamTracker: React.FC<KhatamTrackerProps> = ({ onNavigateToJuz }) => {
  const [target, setTarget] = useState<KhatamTarget>(storageService.getKhatamTarget());
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  const handleUpdateTargetDays = (days: number) => {
    // 604 total mushaf pages / days
    const daily = Math.max(1, Math.round(604 / days));
    const updated: KhatamTarget = {
      ...target,
      targetDays: days,
      dailyPageGoal: daily,
    };
    setTarget(updated);
    storageService.saveKhatamTarget(updated);
    soundEffects.playBookmarkSnap();
  };

  const handleAddPagesRead = (count: number) => {
    const newPages = target.pagesReadToday + count;
    const updated: KhatamTarget = {
      ...target,
      pagesReadToday: newPages,
      lastReadingDate: new Date().toISOString(),
    };
    setTarget(updated);
    storageService.saveKhatamTarget(updated);
    soundEffects.playBookmarkSnap();

    if (newPages >= target.dailyPageGoal) {
      soundEffects.playCompletionChime();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
      setNotificationBanner('Alhamdulillah! Target tilawah harianmu telah tercapai hari ini! 🎉');
      setTimeout(() => setNotificationBanner(null), 4000);
    }
  };

  const handleToggleJuzComplete = (juzNumber: number) => {
    let completed = [...target.completedJuz];
    if (completed.includes(juzNumber)) {
      completed = completed.filter((j) => j !== juzNumber);
    } else {
      completed.push(juzNumber);
      soundEffects.playCompletionChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    const updated: KhatamTarget = {
      ...target,
      completedJuz: completed,
    };
    setTarget(updated);
    storageService.saveKhatamTarget(updated);
  };

  const handleToggleReminder = () => {
    const updated = {
      ...target,
      reminderEnabled: !target.reminderEnabled,
    };
    setTarget(updated);
    storageService.saveKhatamTarget(updated);
    soundEffects.playBookmarkSnap();
  };

  const percentDaily = Math.min(100, Math.round((target.pagesReadToday / target.dailyPageGoal) * 100));
  const percentTotal = Math.round((target.completedJuz.length / 30) * 100);

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-amber-200 sm:text-3xl">
          Pengingat & Target Khatam Al-Qur'an
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Rancang konsistensi tilawah harian dan pantau progres menuju khatam 30 Juz
        </p>
      </div>

      {notificationBanner && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/20 p-4 text-xs font-semibold text-emerald-200 animate-in fade-in">
          {notificationBanner}
        </div>
      )}

      {/* Target & Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Streak card */}
        <div className="rounded-2xl border border-white/10 bg-stone-900/70 p-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">Tilawah Streak</span>
            <Flame className="h-5 w-5 text-orange-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-stone-100">{target.streakDays}</span>
            <span className="text-xs text-stone-400">Hari Berturut-turut</span>
          </div>
          <p className="mt-1 text-[11px] text-stone-400">
            Pertahankan istiqomah membaca Al-Qur'an setiap hari.
          </p>
        </div>

        {/* Daily Target Progress */}
        <div className="rounded-2xl border border-amber-500/30 bg-stone-900/70 p-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-300">Target Hari Ini</span>
            <Target className="h-5 w-5 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-300">{target.pagesReadToday}</span>
            <span className="text-xs text-stone-400">/ {target.dailyPageGoal} Halaman</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-stone-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
              style={{ width: `${percentDaily}%` }}
            />
          </div>
        </div>

        {/* Total Khatam Juz */}
        <div className="rounded-2xl border border-emerald-500/30 bg-stone-900/70 p-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300">Total Selesai</span>
            <Award className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-300">{target.completedJuz.length}</span>
            <span className="text-xs text-stone-400">/ 30 Juz ({percentTotal}%)</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-stone-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full transition-all duration-500"
              style={{ width: `${percentTotal}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Add Pages Read Today */}
      <div className="rounded-2xl border border-white/10 bg-stone-900/50 p-5 backdrop-blur space-y-3">
        <span className="text-xs font-semibold text-stone-200">
          Catat Tilawah yang Selesai Hari Ini:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleAddPagesRead(1)}
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-stone-200 hover:bg-white/10 transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-amber-400" />
            <span>+1 Halaman</span>
          </button>
          <button
            onClick={() => handleAddPagesRead(2)}
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-stone-200 hover:bg-white/10 transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-amber-400" />
            <span>+1 Lembar (2 Halaman)</span>
          </button>
          <button
            onClick={() => handleAddPagesRead(4)}
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-stone-200 hover:bg-white/10 transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-amber-400" />
            <span>+4 Halaman (1 Waktu Sholat)</span>
          </button>
          <button
            onClick={() => handleAddPagesRead(20)}
            className="flex items-center gap-1 rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/25 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>+1 Juz Penuh (20 Halaman)</span>
          </button>
        </div>
      </div>

      {/* Target Plan Selector */}
      <div className="rounded-2xl border border-white/10 bg-stone-900/50 p-5 backdrop-blur space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-semibold text-stone-100 text-sm">
              Pilihan Rencana Target Khatam
            </h3>
            <p className="text-xs text-stone-400">
              Pilih ritme tilawah yang paling sesuai dengan rutinitas Anda
            </p>
          </div>

          {/* Reminder Toggle */}
          <button
            onClick={handleToggleReminder}
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              target.reminderEnabled
                ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                : 'border-white/10 bg-white/5 text-stone-400'
            }`}
          >
            <Bell className="h-3.5 w-3.5" />
            <span>{target.reminderEnabled ? 'Pengingat Aktif (Ba\'da Maghrib)' : 'Nyalakan Pengingat'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { days: 30, title: '30 Hari (Ramadan)', sub: '1 Juz (~20 hal) / hari' },
            { days: 60, title: '60 Hari (2 Bulan)', sub: '1/2 Juz (~10 hal) / hari' },
            { days: 90, title: '90 Hari (3 Bulan)', sub: '7 halaman / hari' },
            { days: 180, title: '180 Hari (6 Bulan)', sub: '1 lembar / sholat fardhu' },
          ].map((plan) => {
            const isSelected = target.targetDays === plan.days;
            return (
              <button
                key={plan.days}
                onClick={() => handleUpdateTargetDays(plan.days)}
                className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/15 ring-2 ring-amber-400/40 text-stone-100'
                    : 'border-white/10 bg-white/5 text-stone-300 hover:border-white/20'
                }`}
              >
                <span className="text-xs font-bold text-amber-300">{plan.title}</span>
                <span className="text-[11px] text-stone-400 mt-1">{plan.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 30 Juz Checklist Matrix */}
      <div className="rounded-2xl border border-white/10 bg-stone-900/50 p-5 backdrop-blur space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-stone-100 text-sm">
              Matriks Progres 30 Juz
            </h3>
            <p className="text-xs text-stone-400">
              Ketuk untuk menandai juz yang telah selesai dibaca, atau klik tombol untuk langsung membaca
            </p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-10">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => {
            const isDone = target.completedJuz.includes(juz);
            return (
              <button
                key={juz}
                onClick={() => handleToggleJuzComplete(juz)}
                className={`relative flex h-14 flex-col items-center justify-center rounded-xl border transition-all ${
                  isDone
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-sm'
                    : 'border-white/10 bg-white/5 text-stone-400 hover:border-white/25 hover:text-stone-200'
                }`}
              >
                {isDone && (
                  <Check className="absolute top-1 right-1 h-3 w-3 text-emerald-400" />
                )}
                <span className="text-[10px] uppercase tracking-wider">JUZ</span>
                <span className="text-sm font-bold text-stone-100">{juz}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
