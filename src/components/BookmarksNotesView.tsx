import React, { useState } from 'react';
import { Bookmark, Edit3, Trash2, ChevronRight, Search, Heart, Sparkles } from 'lucide-react';
import { Annotation, Bookmark as BookmarkItem } from '../types';
import { storageService } from '../services/storage';
import { ArabicTriColorText } from '../utils/arabicColorizer';

interface BookmarksNotesViewProps {
  onNavigateToAyah: (surahNumber: number, ayahNumber: number) => void;
}

export const BookmarksNotesView: React.FC<BookmarksNotesViewProps> = ({
  onNavigateToAyah,
}) => {
  const [activeTab, setActiveTab] = useState<'annotations' | 'bookmarks'>('annotations');
  const [annotations, setAnnotations] = useState<Annotation[]>(storageService.getAnnotations());
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(storageService.getBookmarks());
  const [search, setSearch] = useState('');

  const handleDeleteAnnotation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    storageService.deleteAnnotation(id);
    setAnnotations(storageService.getAnnotations());
  };

  const handleRemoveBookmark = (surahNumber: number, ayahNumber: number, e: React.MouseEvent) => {
    e.stopPropagation();
    storageService.toggleBookmark({
      surahNumber,
      ayahNumber,
      surahName: '',
      arabicPreview: '',
      translationPreview: '',
      bookmarkedAt: '',
    });
    setBookmarks(storageService.getBookmarks());
  };

  const filteredAnnotations = annotations.filter(
    (a) =>
      a.note.toLowerCase().includes(search.toLowerCase()) ||
      a.surahName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBookmarks = bookmarks.filter((b) =>
    b.surahName.toLowerCase().includes(search.toLowerCase()) ||
    b.translationPreview.toLowerCase().includes(search.toLowerCase())
  );

  const colorBadge = (color: string) => {
    switch (color) {
      case 'yellow':
        return 'border-amber-400/40 bg-amber-500/10 text-amber-300';
      case 'green':
        return 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300';
      case 'blue':
        return 'border-sky-400/40 bg-sky-500/10 text-sky-300';
      case 'rose':
        return 'border-rose-400/40 bg-rose-500/10 text-rose-300';
      default:
        return 'border-stone-400/40 bg-stone-500/10 text-stone-300';
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-amber-200 sm:text-3xl">
            Tadabbur & Ayat Favorit
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Kumpulan renungan pribadi, sorotan ayat, dan daftar penanda bacaan Anda
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-lg bg-stone-900 border border-white/10 p-1">
          <button
            onClick={() => setActiveTab('annotations')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'annotations'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Catatan Tadabbur ({annotations.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>Ayat Favorit ({bookmarks.length})</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            activeTab === 'annotations'
              ? 'Cari isi catatan renungan, nama surah...'
              : 'Cari dalam ayat favorit...'
          }
          className="w-full rounded-xl border border-white/10 bg-stone-900/80 py-2.5 pl-10 pr-4 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none"
        />
      </div>

      {/* Content */}
      {activeTab === 'annotations' ? (
        <div className="space-y-3">
          {filteredAnnotations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-stone-400">
              <Edit3 className="mx-auto h-8 w-8 text-stone-600 mb-2" />
              <p className="text-sm font-medium text-stone-300">Belum Ada Catatan Tadabbur</p>
              <p className="text-xs text-stone-500 mt-1">
                Buka Mushaf 3D, klik ikon pena pada ayat untuk menambahkan refleksi dan catatan pribadi.
              </p>
            </div>
          ) : (
            filteredAnnotations.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigateToAyah(item.surahNumber, item.ayahNumber)}
                className="group flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-stone-900/60 p-4 transition-all hover:border-amber-500/40 hover:bg-white/[0.06] cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${colorBadge(item.color)}`}>
                      QS. {item.surahName} : Ayat {item.ayahNumber}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {new Date(item.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDeleteAnnotation(item.id, e)}
                      title="Hapus Catatan"
                      className="rounded p-1 text-stone-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <ChevronRight className="h-4 w-4 text-stone-500 group-hover:text-amber-400" />
                  </div>
                </div>

                <p className="text-xs text-stone-200 leading-relaxed pl-1 border-l-2 border-amber-400/40">
                  {item.note}
                </p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBookmarks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-stone-400">
              <Bookmark className="mx-auto h-8 w-8 text-stone-600 mb-2" />
              <p className="text-sm font-medium text-stone-300">Belum Ada Ayat Favorit</p>
              <p className="text-xs text-stone-500 mt-1">
                Buka Mushaf 3D, klik ikon bintang atau hati pada ayat untuk menandainya sebagai favorit.
              </p>
            </div>
          ) : (
            filteredBookmarks.map((b) => (
              <div
                key={`${b.surahNumber}_${b.ayahNumber}`}
                onClick={() => onNavigateToAyah(b.surahNumber, b.ayahNumber)}
                className="group flex flex-col gap-2 rounded-xl border border-white/10 bg-stone-900/60 p-4 transition-all hover:border-amber-500/40 hover:bg-white/[0.06] cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-300">
                    QS. {b.surahName} : Ayat {b.ayahNumber}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleRemoveBookmark(b.surahNumber, b.ayahNumber, e)}
                      className="text-stone-500 hover:text-rose-400 p-1"
                      title="Hapus dari Favorit"
                    >
                      <Heart className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </button>
                    <ChevronRight className="h-4 w-4 text-stone-500 group-hover:text-amber-400" />
                  </div>
                </div>

                <div className="rounded-lg bg-amber-50/90 dark:bg-amber-100/95 border border-amber-900/10 p-2 shadow-inner my-1">
                  <div className="text-right text-base" dir="rtl">
                    <ArabicTriColorText text={b.arabicPreview} />
                  </div>
                </div>
                <p className="text-xs text-stone-400 italic">
                  "{b.translationPreview}"
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
