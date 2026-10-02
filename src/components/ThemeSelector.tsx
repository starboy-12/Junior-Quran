import React from 'react';
import { X, Check } from 'lucide-react';
import { AppTheme } from '../types';
import { THEMES } from '../styles/themes';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  isOpen,
  onClose,
  activeTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  const themeList = Object.values(THEMES);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-xl flex-col rounded-xl border border-amber-500/30 bg-stone-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-stone-100">
              Pilihan Warna & Tema Mushaf
            </h2>
            <p className="text-xs text-stone-400">
              Sesuaikan estetika sampul, tekstur kertas, dan pencahayaan membaca
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {themeList.map((t) => {
            const isSelected = activeTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  onSelectTheme(t.id);
                  onClose();
                }}
                className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/40'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Swatch preview */}
                  <div className="relative flex h-14 w-12 shrink-0 items-center justify-center rounded-md border border-amber-400/40 shadow-inner overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${t.coverTexture}`} />
                    <div className="relative z-10 text-[9px] font-bold text-amber-200">
                      مُصْحَف
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-100 text-sm">{t.name}</span>
                      {t.id === 'onyx' && (
                        <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] text-indigo-300 border border-indigo-500/30">
                          Mode Malam
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">{t.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isSelected && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-stone-950">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
