import React from 'react';
import { X, Volume2, Sparkles, HelpCircle } from 'lucide-react';
import { TAJWID_RULES, TajwidRule } from '../data/tajwidGuide';
import { audioPlayer } from '../services/audioPlayer';
import { ArabicTriColorText } from '../utils/arabicColorizer';

interface TajwidModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRuleId?: string | null;
}

export const TajwidModal: React.FC<TajwidModalProps> = ({
  isOpen,
  onClose,
  selectedRuleId,
}) => {
  if (!isOpen) return null;

  const handlePlaySample = (rule: TajwidRule) => {
    audioPlayer.playPhonetic(rule.exampleArabic, rule.exampleLatin);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border border-amber-500/30 bg-stone-900 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-100">
                Panduan Tajwid Warna Digital
              </h2>
              <p className="text-xs text-stone-400">
                Pahami hukum bacaan tartil melalui kode warna interaktif
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-amber-200 leading-relaxed">
            <span className="font-semibold text-amber-300">💡 Cara Menggunakan: </span>
            Setiap ayat Al-Qur'an pada Mushaf 3D diwarnai secara otomatis sesuai hukum tajwid di bawah. Klik tombol audio pada contoh untuk mendengarkan pelafalan yang tepat.
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {TAJWID_RULES.map((rule) => {
              const isHighlighted = selectedRuleId === rule.id;
              return (
                <div
                  key={rule.id}
                  className={`flex flex-col justify-between rounded-lg border p-4 transition-all ${
                    isHighlighted
                      ? 'border-amber-400 bg-white/10 ring-1 ring-amber-400'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold border ${rule.badgeBg}`}>
                        {rule.name}
                      </span>
                      <span className="font-arabic text-sm text-stone-300">
                        {rule.arabicName}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 mb-3 leading-relaxed">
                      {rule.description}
                    </p>

                    <div className="rounded-xl border border-amber-900/10 bg-amber-50/90 dark:bg-amber-100/95 p-2.5 mb-3 shadow-inner">
                      <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                        <span className="font-semibold">Contoh Ayat:</span>
                        <span className="text-[11px] font-bold text-amber-800">{rule.durationHarakat}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-right text-base" dir="rtl">
                          <ArabicTriColorText text={rule.exampleArabic} />
                        </div>
                        <button
                          onClick={() => handlePlaySample(rule)}
                          title="Dengarkan Contoh"
                          className="ml-2 flex items-center justify-center rounded-lg bg-amber-500/30 p-1.5 text-amber-900 hover:bg-amber-500/40"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-[11px] text-stone-600 italic">
                        {rule.exampleLatin}
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-400 border-t border-white/5 pt-2">
                    <span className="text-stone-300 font-medium">Cara baca: </span>
                    {rule.howToPronounce}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end border-t border-white/10 px-6 py-3 bg-stone-950/50">
          <button
            onClick={onClose}
            className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-400"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
