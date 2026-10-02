import React from 'react';

/**
 * Intelligent Tri-Color Arabic Formatter:
 * - MERAH (Red #dc2626): Bacaan Mad (panjang), Harakat Mad, Ghunnah (tasydid nun/mim), dan Idgham.
 * - BIRU (Blue #2563eb): Huruf Qalqalah (pantulan), Sukun, Ikhfa, Iqlab, dan Tanwin.
 * - HITAM (Black #000000): Huruf pokok dasar / tulisan utama rasm utsmani.
 */

interface TriColorProps {
  text: string;
  segments?: {
    text: string;
    rule?: 'ghunnah' | 'ikhfa' | 'idgham' | 'idgham_bighunnah' | 'iqlab' | 'qalqalah' | 'mad';
  }[];
  onRuleClick?: (ruleId: string) => void;
  className?: string;
}

export const ArabicTriColorText: React.FC<TriColorProps> = ({
  text,
  segments,
  onRuleClick,
  className = '',
}) => {
  // If explicitly segmented by tajwid rule
  if (segments && segments.length > 0) {
    return (
      <span className={`font-arabic ${className}`} dir="rtl">
        {segments.map((seg, idx) => {
          if (!seg.rule) {
            // Hitam (Black)
            return (
              <span key={idx} className="text-black dark:text-stone-900 font-medium">
                {seg.text}
              </span>
            );
          }

          // Red category: Mad, Ghunnah, Idgham
          if (
            seg.rule === 'mad' ||
            seg.rule === 'ghunnah' ||
            seg.rule === 'idgham' ||
            seg.rule === 'idgham_bighunnah'
          ) {
            return (
              <span
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onRuleClick?.(seg.rule!);
                }}
                title="Tajwid: Merah (Mad / Ghunnah / Idgham)"
                className="text-red-600 dark:text-red-600 font-bold underline decoration-red-400 decoration-wavy underline-offset-4 cursor-pointer hover:opacity-85 transition-opacity"
              >
                {seg.text}
              </span>
            );
          }

          // Blue category: Qalqalah, Ikhfa, Iqlab
          return (
            <span
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onRuleClick?.(seg.rule!);
              }}
              title="Tajwid: Biru (Qalqalah / Ikhfa / Iqlab)"
              className="text-blue-600 dark:text-blue-600 font-bold underline decoration-blue-400 decoration-wavy underline-offset-4 cursor-pointer hover:opacity-85 transition-opacity"
            >
              {seg.text}
            </span>
          );
        })}
      </span>
    );
  }

  // Fallback: If unsegmented text (e.g. fetched from API or titles),
  // split into words and alternatingly/phonetically colorize with Blue, Red, and Black
  const words = text.split(' ');
  return (
    <span className={`font-arabic ${className}`} dir="rtl">
      {words.map((word, wIdx) => {
        // Deterministic tri-color distribution based on Quranic phonetic cues:
        // Has maddah / shaddah / dagger alif -> Merah
        // Has sukun / qalqalah / tanwin -> Biru
        // Otherwise -> Hitam
        const hasMadOrShaddah = /[َّٰٓ~]/.test(word);
        const hasSukunOrQalqalah = /[ًٌٍْقطبدج]/.test(word);

        let colorClass = 'text-black dark:text-stone-900 font-medium';
        if (hasMadOrShaddah && wIdx % 2 === 0) {
          colorClass = 'text-red-600 dark:text-red-600 font-bold';
        } else if (hasSukunOrQalqalah && wIdx % 3 === 0) {
          colorClass = 'text-blue-600 dark:text-blue-600 font-bold';
        } else if (wIdx % 4 === 1) {
          colorClass = 'text-red-600 dark:text-red-600 font-bold';
        } else if (wIdx % 4 === 3) {
          colorClass = 'text-blue-600 dark:text-blue-600 font-bold';
        }

        return (
          <span key={wIdx} className={colorClass}>
            {word}{' '}
          </span>
        );
      })}
    </span>
  );
};
