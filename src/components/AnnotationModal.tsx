import React, { useState } from 'react';
import { X, Trash2, Bookmark as BookmarkIcon, Edit3 } from 'lucide-react';
import { Annotation } from '../types';
import { storageService } from '../services/storage';
import { ArabicTriColorText } from '../utils/arabicColorizer';

interface AnnotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  arabicText: string;
  translationText: string;
  onAnnotationSaved: () => void;
}

export const AnnotationModal: React.FC<AnnotationModalProps> = ({
  isOpen,
  onClose,
  surahNumber,
  ayahNumber,
  surahName,
  arabicText,
  translationText,
  onAnnotationSaved,
}) => {
  if (!isOpen) return null;

  const existing = storageService.getAnnotationForAyah(surahNumber, ayahNumber);
  const [note, setNote] = useState(existing?.note || '');
  const [color, setColor] = useState<'yellow' | 'green' | 'blue' | 'rose'>(
    existing?.color || 'yellow'
  );

  const handleSave = () => {
    if (!note.trim()) {
      if (existing) {
        storageService.deleteAnnotation(existing.id);
      }
      onAnnotationSaved();
      onClose();
      return;
    }

    const item: Annotation = {
      id: existing?.id || `ann_${surahNumber}_${ayahNumber}_${Date.now()}`,
      surahNumber,
      ayahNumber,
      surahName,
      note,
      color,
      createdAt: new Date().toISOString(),
    };
    storageService.saveAnnotation(item);
    onAnnotationSaved();
    onClose();
  };

  const handleDelete = () => {
    if (existing) {
      storageService.deleteAnnotation(existing.id);
      onAnnotationSaved();
      onClose();
    }
  };

  const colorOptions: { id: 'yellow' | 'green' | 'blue' | 'rose'; name: string; bg: string; border: string }[] = [
    { id: 'yellow', name: 'Kuning (Tadabbur/Hikmah)', bg: 'bg-amber-400', border: 'border-amber-400' },
    { id: 'green', name: 'Zamrud (Kebaikan/Syukur)', bg: 'bg-emerald-400', border: 'border-emerald-400' },
    { id: 'blue', name: 'Biru (Doa & Harapan)', bg: 'bg-sky-400', border: 'border-sky-400' },
    { id: 'rose', name: 'Merah (Peringatan & Larangan)', bg: 'bg-rose-400', border: 'border-rose-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl border border-amber-500/30 bg-stone-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
              <Edit3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-100">
                Anotasi & Catatan Tadabbur
              </h2>
              <p className="text-xs text-stone-400">
                QS. {surahName}: Ayat {ayahNumber}
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Ayat excerpt */}
          <div className="rounded-lg border border-white/10 bg-black/40 p-3.5 space-y-2">
            <div className="rounded-lg bg-amber-50/90 dark:bg-amber-100/95 border border-amber-900/10 p-2.5 shadow-inner">
              <div className="text-right text-base" dir="rtl">
                <ArabicTriColorText text={arabicText} />
              </div>
            </div>
            <p className="text-xs text-stone-400 italic line-clamp-3">
              "{translationText}"
            </p>
          </div>

          {/* Color Highlight Picker */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-2">
              Pilih Warna Sorotan Ayat
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setColor(opt.id)}
                  className={`flex items-center gap-2 rounded-lg border p-2 text-left text-xs transition-all ${
                    color === opt.id
                      ? 'border-amber-400 bg-white/10 ring-1 ring-amber-400 font-medium text-stone-100'
                      : 'border-white/10 bg-white/5 text-stone-400 hover:bg-white/10'
                  }`}
                >
                  <span className={`h-3 w-3 rounded-full ${opt.bg}`} />
                  <span className="truncate">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Note Input */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Catatan Pribadi & Tadabbur
            </label>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tuliskan renungan, makna ayat, doa yang dipanjatkan, atau pengingat diri..."
              className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-6 py-3.5 bg-stone-950/50">
          {existing ? (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Hapus Catatan</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-stone-300 hover:bg-white/10"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-stone-950 hover:bg-amber-400"
            >
              Simpan Anotasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
