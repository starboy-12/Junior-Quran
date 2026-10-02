import React from 'react';
import { BookOpen, Palette, RefreshCw, Volume2, VolumeX, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { AppTheme, UserProfile } from '../types';
import { THEMES } from '../styles/themes';

interface HeaderNavProps {
  currentView: 'mushaf' | 'directory' | 'iqro' | 'notes' | 'khatam';
  onSelectView: (view: 'mushaf' | 'directory' | 'iqro' | 'notes' | 'khatam') => void;
  activeTheme: AppTheme;
  onOpenThemeModal: () => void;
  onOpenSyncModal: () => void;
  onOpenTajwidModal: () => void;
  isCoverOpen: boolean;
  onToggleCover: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  userProfile: UserProfile;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  onSelectView,
  activeTheme,
  onOpenThemeModal,
  onOpenSyncModal,
  onOpenTajwidModal,
  isCoverOpen,
  onToggleCover,
  soundEnabled,
  onToggleSound,
  userProfile,
  isFocusMode = false,
  onToggleFocusMode,
}) => {
  const theme = THEMES[activeTheme];

  if (isFocusMode) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectView('mushaf')}
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <span className="font-display text-lg font-bold tracking-wider text-amber-200 transition-colors group-hover:text-amber-100 sm:text-xl">
              JUNIOR QURAN
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 single-line navigation text links */}
        <nav className="hidden items-center gap-1 md:flex lg:gap-2">
          <button
            onClick={() => onSelectView('mushaf')}
            className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium transition-colors ${
              currentView === 'mushaf'
                ? 'border-b-2 border-amber-400 text-amber-300'
                : 'text-stone-300 hover:text-stone-100'
            }`}
          >
            Mushaf 3D
          </button>
          <button
            onClick={() => onSelectView('directory')}
            className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium transition-colors ${
              currentView === 'directory'
                ? 'border-b-2 border-amber-400 text-amber-300'
                : 'text-stone-300 hover:text-stone-100'
            }`}
          >
            Daftar 114 Surah
          </button>
          <button
            onClick={() => onSelectView('iqro')}
            className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium transition-colors ${
              currentView === 'iqro'
                ? 'border-b-2 border-amber-400 text-amber-300'
                : 'text-stone-300 hover:text-stone-100'
            }`}
          >
            Iqro 1–6 Anak
          </button>
          <button
            onClick={() => onSelectView('notes')}
            className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium transition-colors ${
              currentView === 'notes'
                ? 'border-b-2 border-amber-400 text-amber-300'
                : 'text-stone-300 hover:text-stone-100'
            }`}
          >
            Tadabbur & Favorit
          </button>
          <button
            onClick={() => onSelectView('khatam')}
            className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium transition-colors ${
              currentView === 'khatam'
                ? 'border-b-2 border-amber-400 text-amber-300'
                : 'text-stone-300 hover:text-stone-100'
            }`}
          >
            Target Khatam
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* Focus Mode button */}
          {onToggleFocusMode && (
            <button
              onClick={onToggleFocusMode}
              title="Aktifkan Mode Fokus (Sembunyikan UI)"
              className="flex items-center gap-1.5 rounded-md border border-amber-500/40 bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:bg-amber-500/20"
            >
              <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden lg:inline">Mode Fokus</span>
            </button>
          )}

          {/* Tajwid Guide trigger */}
          <button
            onClick={onOpenTajwidModal}
            title="Panduan Hukum Tajwid Warna"
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-amber-200 transition-colors hover:bg-white/10 hover:text-amber-100"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Panduan Tajwid</span>
          </button>

          {/* Sound physical feedback toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Efek Suara Fisik Aktif" : "Efek Suara Fisik Senyap"}
            className="rounded-md border border-white/10 bg-white/5 p-1.5 text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <VolumeX className="h-4 w-4 text-stone-500" />
            )}
          </button>

          {/* Theme Palette switch */}
          <button
            onClick={onOpenThemeModal}
            title={`Tema: ${theme.name}`}
            className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-stone-200 transition-colors hover:bg-white/10"
          >
            <Palette className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">{theme.name}</span>
          </button>

          {/* Multi-Device Account Sync trigger */}
          <button
            onClick={onOpenSyncModal}
            className="flex items-center gap-1.5 rounded-md bg-amber-500/20 border border-amber-500/40 px-2.5 py-1.5 text-xs font-semibold text-amber-300 transition-all hover:bg-amber-500/30"
            title="Sinkronisasi Akun & Progres Antar Perangkat"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{userProfile.name.split(' ')[0]}</span>
            <span className="inline sm:hidden">Akun</span>
          </button>
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="flex overflow-x-auto border-t border-white/5 bg-black/40 px-2 py-1.5 md:hidden">
        <button
          onClick={() => onSelectView('mushaf')}
          className={`shrink-0 px-3 py-1 text-xs font-medium ${
            currentView === 'mushaf' ? 'text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          Mushaf 3D
        </button>
        <button
          onClick={() => onSelectView('directory')}
          className={`shrink-0 px-3 py-1 text-xs font-medium ${
            currentView === 'directory' ? 'text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          Indeks Surah
        </button>
        <button
          onClick={() => onSelectView('iqro')}
          className={`shrink-0 px-3 py-1 text-xs font-medium ${
            currentView === 'iqro' ? 'text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          Iqro 1–6
        </button>
        <button
          onClick={() => onSelectView('notes')}
          className={`shrink-0 px-3 py-1 text-xs font-medium ${
            currentView === 'notes' ? 'text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          Tadabbur
        </button>
        <button
          onClick={() => onSelectView('khatam')}
          className={`shrink-0 px-3 py-1 text-xs font-medium ${
            currentView === 'khatam' ? 'text-amber-300 font-semibold' : 'text-stone-400'
          }`}
        >
          Target Khatam
        </button>
      </div>
    </header>
  );
};
