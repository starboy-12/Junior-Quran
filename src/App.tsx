import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { Mushaf3D } from './components/Mushaf3D';
import { SurahJuzDirectory } from './components/SurahJuzDirectory';
import { IqroLearning } from './components/IqroLearning';
import { BookmarksNotesView } from './components/BookmarksNotesView';
import { KhatamTracker } from './components/KhatamTracker';
import { ThemeSelector } from './components/ThemeSelector';
import { TajwidModal } from './components/TajwidModal';
import { AccountSyncModal } from './components/AccountSyncModal';
import { AnnotationModal } from './components/AnnotationModal';
import { AppTheme, UserProfile } from './types';
import { storageService } from './services/storage';
import { soundEffects } from './services/soundEffects';
import { JUZ_LIST } from './data/juzList';
import { THEMES } from './styles/themes';

export default function App() {
  const [currentView, setCurrentView] = useState<'mushaf' | 'directory' | 'iqro' | 'notes' | 'khatam'>('mushaf');
  const [activeTheme, setActiveTheme] = useState<AppTheme>(storageService.getTheme());
  const [userProfile, setUserProfile] = useState<UserProfile>(storageService.getUserProfile());

  const lastRead = storageService.getLastRead();
  const [currentSurahNumber, setCurrentSurahNumber] = useState<number>(lastRead.surahNumber || 1);
  const [currentAyahNumber, setCurrentAyahNumber] = useState<number>(lastRead.ayahNumber || 1);
  const [isCoverOpen, setIsCoverOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  // Keyboard shortcut listener for Focus Mode (Escape or F key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFocusMode) {
          setIsFocusMode(false);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        if (
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA' &&
          currentView === 'mushaf' &&
          isCoverOpen
        ) {
          setIsFocusMode((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode, currentView, isCoverOpen]);

  // Modals state
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isTajwidModalOpen, setIsTajwidModalOpen] = useState(false);
  const [selectedTajwidRuleId, setSelectedTajwidRuleId] = useState<string | null>(null);

  const [annotationData, setAnnotationData] = useState<{
    surahNumber: number;
    ayahNumber: number;
    surahName: string;
    arabicText: string;
    translationText: string;
  } | null>(null);

  // Sync theme changes
  const handleSelectTheme = (theme: AppTheme) => {
    setActiveTheme(theme);
    storageService.setTheme(theme);
  };

  // Keyboard navigation for page flips
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentView !== 'mushaf' || !isCoverOpen) return;
      if (e.key === 'ArrowRight') {
        if (currentSurahNumber > 1) {
          setCurrentSurahNumber((prev) => prev - 1);
          soundEffects.playPageFlip();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSurahNumber < 114) {
          setCurrentSurahNumber((prev) => prev + 1);
          soundEffects.playPageFlip();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, isCoverOpen, currentSurahNumber]);

  // Navigate to specific surah
  const handleSelectSurah = (surahNumber: number) => {
    setCurrentSurahNumber(surahNumber);
    setCurrentAyahNumber(1);
    setIsCoverOpen(true);
    setCurrentView('mushaf');
  };

  // Navigate to specific juz
  const handleSelectJuz = (juzNumber: number) => {
    const found = JUZ_LIST.find((j) => j.juzNumber === juzNumber);
    if (found) {
      setCurrentSurahNumber(found.startSurahNumber);
      setCurrentAyahNumber(found.startAyahNumber);
      setIsCoverOpen(true);
      setCurrentView('mushaf');
    }
  };

  // Navigate to specific ayah (from bookmarks or notes)
  const handleNavigateToAyah = (surahNumber: number, ayahNumber: number) => {
    setCurrentSurahNumber(surahNumber);
    setCurrentAyahNumber(ayahNumber);
    setIsCoverOpen(true);
    setCurrentView('mushaf');
  };

  // Open Tajwid Rule modal
  const handleOpenTajwidRule = (ruleId: string) => {
    setSelectedTajwidRuleId(ruleId);
    setIsTajwidModalOpen(true);
  };

  const currentThemeConfig = THEMES[activeTheme];

  return (
    <div className={`min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans transition-colors duration-500 ${isFocusMode ? 'overflow-hidden' : ''}`}>
      {/* Top Header Navigation (Hidden in Focus Mode) */}
      {!isFocusMode && (
        <HeaderNav
          currentView={currentView}
          onSelectView={(view) => setCurrentView(view)}
          activeTheme={activeTheme}
          onOpenThemeModal={() => setIsThemeModalOpen(true)}
          onOpenSyncModal={() => setIsSyncModalOpen(true)}
          onOpenTajwidModal={() => {
            setSelectedTajwidRuleId(null);
            setIsTajwidModalOpen(true);
          }}
          isCoverOpen={isCoverOpen}
          onToggleCover={() => setIsCoverOpen(!isCoverOpen)}
          soundEnabled={soundEnabled}
          onToggleSound={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            soundEffects.setSoundEnabled(next);
          }}
          userProfile={userProfile}
          isFocusMode={isFocusMode}
          onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
        />
      )}

      {/* Main View Router */}
      <main className={`flex-1 relative ${isFocusMode ? 'p-0 pb-0' : 'pb-10'}`}>
        {currentView === 'mushaf' && (
          <Mushaf3D
            activeTheme={activeTheme}
            currentSurahNumber={currentSurahNumber}
            currentAyahNumber={currentAyahNumber}
            onSelectSurah={(num) => setCurrentSurahNumber(num)}
            onOpenAnnotation={(surahNum, ayahNum, surahName, arabic, translation) => {
              setAnnotationData({
                surahNumber: surahNum,
                ayahNumber: ayahNum,
                surahName,
                arabicText: arabic,
                translationText: translation,
              });
            }}
            onOpenTajwidRule={handleOpenTajwidRule}
            isCoverOpen={isCoverOpen}
            onToggleCover={() => setIsCoverOpen(!isCoverOpen)}
            isFocusMode={isFocusMode}
            onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
          />
        )}

        {currentView === 'directory' && (
          <SurahJuzDirectory
            onSelectSurah={handleSelectSurah}
            onSelectJuz={handleSelectJuz}
          />
        )}

        {currentView === 'iqro' && <IqroLearning />}

        {currentView === 'notes' && (
          <BookmarksNotesView onNavigateToAyah={handleNavigateToAyah} />
        )}

        {currentView === 'khatam' && (
          <KhatamTracker onNavigateToJuz={handleSelectJuz} />
        )}
      </main>

      {/* Footer info (Hidden in Focus Mode) */}
      {!isFocusMode && (
        <footer className="border-t border-white/10 bg-black/60 py-4 px-6 text-center text-xs text-stone-500">
          <p>
            Junior Quran 3D Digital • Rasm Utsmani • Tajwid Berwarna (Merah, Biru, Hitam) • Iqro 1–6 Anak • 114 Surah Lengkap
          </p>
        </footer>
      )}

      {/* Modals */}
      <ThemeSelector
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        activeTheme={activeTheme}
        onSelectTheme={handleSelectTheme}
      />

      <TajwidModal
        isOpen={isTajwidModalOpen}
        onClose={() => {
          setIsTajwidModalOpen(false);
          setSelectedTajwidRuleId(null);
        }}
        selectedRuleId={selectedTajwidRuleId}
      />

      <AccountSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={(updated) => setUserProfile(updated)}
      />

      {annotationData && (
        <AnnotationModal
          isOpen={!!annotationData}
          onClose={() => setAnnotationData(null)}
          surahNumber={annotationData.surahNumber}
          ayahNumber={annotationData.ayahNumber}
          surahName={annotationData.surahName}
          arabicText={annotationData.arabicText}
          translationText={annotationData.translationText}
          onAnnotationSaved={() => {
            // refresh
          }}
        />
      )}
    </div>
  );
}
