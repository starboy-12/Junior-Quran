import React, { useState, useMemo } from 'react';
import { Search, Compass, BookOpen, ChevronRight, Filter } from 'lucide-react';
import { SURAH_LIST } from '../data/surahList';
import { JUZ_LIST } from '../data/juzList';
import { SurahMeta } from '../types';

interface SurahJuzDirectoryProps {
  onSelectSurah: (surahNumber: number) => void;
  onSelectJuz: (juzNumber: number) => void;
}

export const SurahJuzDirectory: React.FC<SurahJuzDirectoryProps> = ({
  onSelectSurah,
  onSelectJuz,
}) => {
  const [activeTab, setActiveTab] = useState<'surah' | 'juz'>('surah');
  const [searchQuery, setSearchQuery] = useState('');
  const [revelationFilter, setRevelationFilter] = useState<'all' | 'Makkiyah' | 'Madaniyah'>('all');

  const filteredSurahs = useMemo(() => {
    return SURAH_LIST.filter((s) => {
      const matchSearch =
        searchQuery === '' ||
        s.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.translationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.name.includes(searchQuery) ||
        String(s.number) === searchQuery.trim();

      const matchRev =
        revelationFilter === 'all' || s.revelationType === revelationFilter;

      return matchSearch && matchRev;
    });
  }, [searchQuery, revelationFilter]);

  const filteredJuz = useMemo(() => {
    return JUZ_LIST.filter((j) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        `juz ${j.juzNumber}`.includes(q) ||
        String(j.juzNumber) === q.trim() ||
        j.startSurahName.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Banner & Fast Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-amber-200 sm:text-3xl">
            Daftar Surah Junior Quran
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Navigasi 114 Surah lengkap dari Al-Fatihah, Al-Baqarah, hingga Juz 30
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-lg bg-stone-900 border border-white/10 p-1">
          <button
            onClick={() => setActiveTab('surah')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'surah'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>114 Surah</span>
          </button>
          <button
            onClick={() => setActiveTab('juz')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'juz'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>30 Juz</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === 'surah'
                ? "Cari nama surah (e.g. Al-Kahfi, Yasin, 18), arti terjemahan..."
                : "Cari Juz (e.g. Juz 30, Juz 1, Al-Baqarah)..."
            }
            className="w-full rounded-xl border border-white/10 bg-stone-900/80 py-2.5 pl-10 pr-4 text-xs text-stone-100 placeholder-stone-500 backdrop-blur focus:border-amber-400 focus:outline-none"
          />
        </div>

        {activeTab === 'surah' && (
          <div className="flex items-center gap-1 overflow-x-auto rounded-lg bg-stone-900/80 border border-white/10 p-1">
            <button
              onClick={() => setRevelationFilter('all')}
              className={`rounded px-2.5 py-1 text-xs transition-colors ${
                revelationFilter === 'all'
                  ? 'bg-white/15 text-amber-300 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setRevelationFilter('Makkiyah')}
              className={`rounded px-2.5 py-1 text-xs transition-colors ${
                revelationFilter === 'Makkiyah'
                  ? 'bg-white/15 text-amber-300 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Makkiyah
            </button>
            <button
              onClick={() => setRevelationFilter('Madaniyah')}
              className={`rounded px-2.5 py-1 text-xs transition-colors ${
                revelationFilter === 'Madaniyah'
                  ? 'bg-white/15 text-amber-300 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Madaniyah
            </button>
          </div>
        )}
      </div>

      {/* Grid Content */}
      {activeTab === 'surah' ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSurahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => onSelectSurah(surah.number)}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-stone-900/60 p-3.5 text-left backdrop-blur transition-all hover:border-amber-500/40 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div className="flex items-center gap-3">
                {/* Number Badge */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs font-bold text-amber-300 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                  {surah.number}
                </div>

                <div>
                  <h3 className="font-semibold text-stone-200 text-xs sm:text-sm group-hover:text-amber-200 transition-colors">
                    {surah.latinName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-0.5">
                    <span>{surah.translationId}</span>
                    <span aria-hidden="true">·</span>
                    <span>{surah.totalVerses} Ayat</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span
                  className={`font-arabic text-lg font-bold transition-colors ${
                    surah.number % 3 === 0
                      ? 'text-blue-500 group-hover:text-blue-400'
                      : surah.number % 3 === 1
                      ? 'text-red-500 group-hover:text-red-400'
                      : 'text-stone-100 group-hover:text-stone-300'
                  }`}
                  dir="rtl"
                >
                  {surah.name}
                </span>
                <span className="text-[10px] text-stone-500 mt-0.5">
                  Juz {surah.juzStart}
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJuz.map((juz) => (
            <button
              key={juz.juzNumber}
              onClick={() => onSelectJuz(juz.juzNumber)}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-stone-900/60 p-4 text-left backdrop-blur transition-all hover:border-amber-500/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 font-bold text-sm text-amber-300 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                  {juz.juzNumber}
                </div>
                <div>
                  <h3 className="font-semibold text-stone-200 text-sm group-hover:text-amber-200">
                    Juz {juz.juzNumber}
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Mulai: QS. {juz.startSurahName} : {juz.startAyahNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-amber-400 opacity-80 group-hover:opacity-100">
                <span>Buka</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
