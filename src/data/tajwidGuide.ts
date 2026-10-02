export interface TajwidRule {
  id: string;
  name: string;
  arabicName: string;
  category: 'nun_mati' | 'mim_mati' | 'mad' | 'qalqalah' | 'ghunnah';
  colorCode: string; // Tailwind color class & hex
  badgeBg: string;
  hex: string;
  description: string;
  letters: string[];
  durationHarakat: string;
  howToPronounce: string;
  exampleArabic: string;
  exampleLatin: string;
}

export const TAJWID_RULES: TajwidRule[] = [
  {
    id: 'ghunnah',
    name: 'Ghunnah Musyaddadah (Merah)',
    arabicName: 'غُنَّة مُشَدَّدَة',
    category: 'ghunnah',
    colorCode: 'text-red-600 dark:text-red-400 font-bold',
    badgeBg: 'bg-red-500/20 text-red-600 dark:text-red-300 border-red-500/40',
    hex: '#dc2626',
    description: 'Dengung mendalam pada huruf Nun bertasydid (نّ) atau Mim bertasydid (مّ) - Diwarnai MERAH.',
    letters: ['نّ', 'مّ'],
    durationHarakat: '2 - 3 Harakat',
    howToPronounce: 'Tahan suara dengung di pangkal hidung (khaisyum) selama 2 sampai 3 ketukan dengan lembut.',
    exampleArabic: 'إِنَّ ٱلَّذِينَ كَفَرُوا۟',
    exampleLatin: "Innal-ladziina kafaruu"
  },
  {
    id: 'ikhfa',
    name: 'Ikhfa Haqiqi (Biru)',
    arabicName: 'إِخْفَاء حَقِيقِي',
    category: 'nun_mati',
    colorCode: 'text-blue-600 dark:text-blue-400 font-bold',
    badgeBg: 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/40',
    hex: '#2563eb',
    description: 'Menyamarkan bunyi Nun mati (نْ) atau Tanwin ke dalam 15 huruf berikutnya disertai dengung - Diwarnai BIRU.',
    letters: ['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك'],
    durationHarakat: '2 Harakat',
    howToPronounce: 'Ucapkan antara bunyi jelas (izh-har) dan lebur (idgham), suara diarahkan ke makhraj huruf berikutnya disertai dengung samar.',
    exampleArabic: 'مِن قَبْلِكَ',
    exampleLatin: "Ming-qoblik"
  },
  {
    id: 'idgham_bighunnah',
    name: 'Idgham Bighunnah (Merah)',
    arabicName: 'إِدْغَام بِغُنَّة',
    category: 'nun_mati',
    colorCode: 'text-red-600 dark:text-red-400 font-bold',
    badgeBg: 'bg-red-500/20 text-red-600 dark:text-red-300 border-red-500/40',
    hex: '#dc2626',
    description: 'Memasukkan bunyi Nun mati atau Tanwin ke 4 huruf (Ya, Nun, Mim, Wawu) dengan dengung - Diwarnai MERAH.',
    letters: ['ي', 'ن', 'م', 'و'],
    durationHarakat: '2 Harakat',
    howToPronounce: 'Leburkan suara nun mati/tanwin sepenuhnya ke huruf setelahnya sambil ditahan dengung 2 harakat.',
    exampleArabic: 'مَن يَقُولُ',
    exampleLatin: "May-yaquulu"
  },
  {
    id: 'iqlab',
    name: 'Iqlab (Biru)',
    arabicName: 'إِقْلَاب',
    category: 'nun_mati',
    colorCode: 'text-blue-600 dark:text-blue-400 font-bold',
    badgeBg: 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/40',
    hex: '#2563eb',
    description: 'Mengganti bunyi Nun mati atau Tanwin menjadi bunyi Mim (م) ketika bertemu huruf Ba (ب) - Diwarnai BIRU.',
    letters: ['ب'],
    durationHarakat: '2 Harakat',
    howToPronounce: 'Rapatkan kedua bibir secara ringan menyerupai bunyi mim, tahan dengung 2 harakat sebelum mengucap ba.',
    exampleArabic: 'مِنۢ بَعْدِ',
    exampleLatin: "Mim-ba'di"
  },
  {
    id: 'qalqalah',
    name: 'Qalqalah (Biru)',
    arabicName: 'قَلْقَلَة',
    category: 'qalqalah',
    colorCode: 'text-blue-600 dark:text-blue-400 font-bold',
    badgeBg: 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/40',
    hex: '#2563eb',
    description: 'Getaran suara yang memantul ketika huruf sukun/mati dibaca (Baju Di Thoko) - Diwarnai BIRU.',
    letters: ['ب', 'ج', 'د', 'ط', 'ق'],
    durationHarakat: '1 Ketukan Pantulan',
    howToPronounce: 'Pantulkan suara di makhraj huruf dengan getaran bersih tanpa menambahkan harakat baru.',
    exampleArabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ ٱللَّهُ ٱلصَّمَدُ',
    exampleLatin: "Qul huwallahu ahad(d), Allahus-samad(d)"
  },
  {
    id: 'mad',
    name: 'Mad Wajib & Jaiz (Merah)',
    arabicName: 'مَدّ وَاجِب / جَائِز',
    category: 'mad',
    colorCode: 'text-red-600 dark:text-red-400 font-bold',
    badgeBg: 'bg-red-500/20 text-red-600 dark:text-red-300 border-red-500/40',
    hex: '#dc2626',
    description: 'Bacaan panjang 4 sampai 6 harakat yang ditandai dengan tanda bendera (~) di atas huruf mad - Diwarnai MERAH.',
    letters: ['آ', 'ـَا', 'ـِي', 'ـُو'],
    durationHarakat: '4 - 6 Harakat',
    howToPronounce: 'Panjangkan suara secara mantap dan merata setara 4 sampai 5 atau 6 ketukan alunan nafas.',
    exampleArabic: 'جَآءَ نَصْرُ ٱللَّهِ',
    exampleLatin: "Jaaaa-a nashrullah"
  }
];
