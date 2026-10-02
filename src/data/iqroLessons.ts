import { IqroPage } from '../types';

export const IQRO_MODULES: IqroPage[] = [
  // IQRO 1: Pengenalan Huruf Tunggal Berharakat Fathah (A-Ba-Ta-Tsa)
  {
    level: 1,
    pageNumber: 1,
    title: "Iqro 1 • Pelajaran 1",
    subtitle: "Mengenal Huruf Alif (A) dan Ba (Ba)",
    description: "Harakat fathah (garis miring di atas) dibaca vokal 'A'. Baca dengan pendek dan tegas satu ketukan, jangan dipanjangkan.",
    items: [
      { id: 'i1_1', arabic: 'اَ', latin: 'A', transcription: 'Alif berharakat fathah dibaca: A', audioHint: 'A' },
      { id: 'i1_2', arabic: 'بَ', latin: 'Ba', transcription: 'Ba berharakat fathah dibaca: Ba', audioHint: 'Ba' },
      { id: 'i1_3', arabic: 'اَ بَ', latin: 'A - Ba', transcription: 'Kombinasi pendek: A - Ba', audioHint: 'A Ba' },
      { id: 'i1_4', arabic: 'بَ اَ', latin: 'Ba - A', transcription: 'Kombinasi pendek: Ba - A', audioHint: 'Ba A' },
      { id: 'i1_5', arabic: 'اَ اَ', latin: 'A - A', transcription: 'Kombinasi pendek: A - A', audioHint: 'A A' },
      { id: 'i1_6', arabic: 'بَ بَ', latin: 'Ba - Ba', transcription: 'Kombinasi pendek: Ba - Ba', audioHint: 'Ba Ba' },
      { id: 'i1_7', arabic: 'بَ اَ بَ', latin: 'Ba - A - Ba', transcription: 'Latihan 3 suku kata: Ba - A - Ba', audioHint: 'Ba A Ba' },
      { id: 'i1_8', arabic: 'اَ بَ اَ', latin: 'A - Ba - A', transcription: 'Latihan 3 suku kata: A - Ba - A', audioHint: 'A Ba A' },
    ]
  },
  {
    level: 1,
    pageNumber: 2,
    title: "Iqro 1 • Pelajaran 2",
    subtitle: "Mengenal Huruf Ta (Ta) dan Tsa (Tsa)",
    description: "Perhatikan titiknya: Ba (titik satu di bawah), Ta (titik dua di atas), Tsa (titik tiga di atas). Ujung lidah disentuhkan ke ujung gigi seri atas untuk huruf Tsa.",
    items: [
      { id: 'i1_9', arabic: 'تَ', latin: 'Ta', transcription: 'Ta titik dua di atas: Ta', audioHint: 'Ta' },
      { id: 'i1_10', arabic: 'ثَ', latin: 'Tsa', transcription: 'Tsa titik tiga di atas: Tsa', audioHint: 'Tsa' },
      { id: 'i1_11', arabic: 'بَ تَ ثَ', latin: 'Ba - Ta - Tsa', transcription: 'Latihan 3 huruf: Ba - Ta - Tsa', audioHint: 'Ba Ta Tsa' },
      { id: 'i1_12', arabic: 'ثَ تَ بَ', latin: 'Tsa - Ta - Ba', transcription: 'Latihan urutan balik: Tsa - Ta - Ba', audioHint: 'Tsa Ta Ba' },
      { id: 'i1_13', arabic: 'اَ تَ بَ', latin: 'A - Ta - Ba', transcription: 'A - Ta - Ba', audioHint: 'A Ta Ba' },
      { id: 'i1_14', arabic: 'ثَ اَ تَ', latin: 'Tsa - A - Ta', transcription: 'Tsa - A - Ta', audioHint: 'Tsa A Ta' },
      { id: 'i1_15', arabic: 'تَ ثَ اَ', latin: 'Ta - Tsa - A', transcription: 'Ta - Tsa - A', audioHint: 'Ta Tsa A' },
      { id: 'i1_16', arabic: 'بَ ثَ تَ', latin: 'Ba - Tsa - Ta', transcription: 'Ba - Tsa - Ta', audioHint: 'Ba Tsa Ta' }
    ]
  },
  {
    level: 1,
    pageNumber: 3,
    title: "Iqro 1 • Pelajaran 3",
    subtitle: "Mengenal Huruf Jim (Ja), Ha (Ha), dan Kho (Kho)",
    description: "Jim (ada titik di tengah perut), Ha (bersih tanpa titik, desah bersih di tenggorokan), Kho (titik di atas kepala, suara serak halus).",
    items: [
      { id: 'i1_17', arabic: 'جَ', latin: 'Ja', transcription: 'Jim fathah: Ja', audioHint: 'Ja' },
      { id: 'i1_18', arabic: 'حَ', latin: 'Ha', transcription: 'Ha fathah: Ha (pedas halus)', audioHint: 'Ha' },
      { id: 'i1_19', arabic: 'خَ', latin: 'Kho', transcription: 'Kho fathah: Kho (serak tenggorokan)', audioHint: 'Kho' },
      { id: 'i1_20', arabic: 'جَ حَ خَ', latin: 'Ja - Ha - Kho', transcription: 'Ja - Ha - Kho', audioHint: 'Ja Ha Kho' },
      { id: 'i1_21', arabic: 'حَ جَ خَ', latin: 'Ha - Ja - Kho', transcription: 'Ha - Ja - Kho', audioHint: 'Ha Ja Kho' },
      { id: 'i1_22', arabic: 'ثَ جَ حَ', latin: 'Tsa - Ja - Ha', transcription: 'Tsa - Ja - Ha', audioHint: 'Tsa Ja Ha' },
      { id: 'i1_23', arabic: 'خَ بَ تَ', latin: 'Kho - Ba - Ta', transcription: 'Kho - Ba - Ta', audioHint: 'Kho Ba Ta' },
      { id: 'i1_24', arabic: 'اَ حَ دَ', latin: 'A - Ha - Da', transcription: 'A - Ha - Da', audioHint: 'A Ha Da' }
    ]
  },

  // IQRO 2: Huruf Sambung & Bacaan Mad (Panjang 2 Harakat)
  {
    level: 2,
    pageNumber: 1,
    title: "Iqro 2 • Pelajaran 1",
    subtitle: "Mengenal Bentuk Huruf Sambung (Awal, Tengah, Akhir)",
    description: "Huruf hijaiyah berubah bentuk saat disambung. Huruf Ba, Ta, Tsa bertaut dengan garis penghubung.",
    items: [
      { id: 'i2_1', arabic: 'بَتَ', latin: 'Ba - Ta', transcription: 'Ba sambung Ta di awal dan akhir', audioHint: 'Ba Ta' },
      { id: 'i2_2', arabic: 'تَبَ', latin: 'Ta - Ba', transcription: 'Ta sambung Ba', audioHint: 'Ta Ba' },
      { id: 'i2_3', arabic: 'ثَبَتَ', latin: 'Tsa - Ba - Ta', transcription: 'Tsa sambung Ba sambung Ta', audioHint: 'Tsa Ba Ta' },
      { id: 'i2_4', arabic: 'نَتَجَ', latin: 'Na - Ta - Ja', transcription: 'Na sambung Ta sambung Ja', audioHint: 'Na Ta Ja' },
      { id: 'i2_5', arabic: 'حَسَنَ', latin: 'Ha - Sa - Na', transcription: 'Ha sambung Sin sambung Nun', audioHint: 'Ha Sa Na' },
      { id: 'i2_6', arabic: 'كَتَبَ', latin: 'Ka - Ta - Ba', transcription: 'Kaf sambung Ta sambung Ba', audioHint: 'Ka Ta Ba' },
      { id: 'i2_7', arabic: 'جَعَلَ', latin: 'Ja - ' + "'" + 'A - La', transcription: 'Ja sambung Ain sambung Lam', audioHint: 'Ja Ala' },
      { id: 'i2_8', arabic: 'خَلَقَ', latin: 'Kho - La - Qo', transcription: 'Kho sambung Lam sambung Qof', audioHint: 'Kho La Qo' }
    ]
  },
  {
    level: 2,
    pageNumber: 2,
    title: "Iqro 2 • Pelajaran 2",
    subtitle: "Mengenal Bacaan Panjang (Mad Thobi'i / 2 Harakat)",
    description: "Jika huruf fathah diikuti huruf Alif (ا), maka dibaca panjang 2 ketukan (Mad Thobi'i). Jangan terburu-buru!",
    items: [
      { id: 'i2_9', arabic: 'بَا', latin: 'Baa', transcription: 'Ba panjang 2 harakat: Baa', audioHint: 'Baa' },
      { id: 'i2_10', arabic: 'تَا', latin: 'Taa', transcription: 'Ta panjang 2 harakat: Taa', audioHint: 'Taa' },
      { id: 'i2_11', arabic: 'بَانَ', latin: 'Baa - Na', transcription: 'Baa (panjang) - Na (pendek)', audioHint: 'Baa Na' },
      { id: 'i2_12', arabic: 'قَالَ', latin: 'Qoo - La', transcription: 'Qoo (panjang) - La (pendek)', audioHint: 'Qoo La' },
      { id: 'i2_13', arabic: 'كَانَ', latin: 'Kaa - Na', transcription: 'Kaa (panjang) - Na (pendek)', audioHint: 'Kaa Na' },
      { id: 'i2_14', arabic: 'صَابِرًا', latin: 'Shoo - Bi - Ro', transcription: 'Shoo (panjang) - Bi - Ro', audioHint: 'Shoo Bi Ro' },
      { id: 'i2_15', arabic: 'عَابِدَ', latin: "'Aa - Bi - Da", transcription: "'Aa (panjang) - Bi - Da", audioHint: 'Aa Bi Da' },
      { id: 'i2_16', arabic: 'شَاكِرَ', latin: 'Syaa - Ki - Ro', transcription: 'Syaa (panjang) - Ki - Ro', audioHint: 'Syaa Ki Ro' }
    ]
  },

  // IQRO 3: Harakat Kasrah (I) dan Dhammah (U)
  {
    level: 3,
    pageNumber: 1,
    title: "Iqro 3 • Pelajaran 1",
    subtitle: "Mengenal Harakat Kasrah (I) dan Dhammah (U)",
    description: "Kasrah (garis bawah) berbunyi 'I'. Dhammah (tanda wau kecil di atas) berbunyi 'U'. Bedakan pengucapan A - I - U dengan jelas.",
    items: [
      { id: 'i3_1', arabic: 'اِ', latin: 'I', transcription: 'Alif kasrah dibaca: I', audioHint: 'I' },
      { id: 'i3_2', arabic: 'اُ', latin: 'U', transcription: 'Alif dhammah dibaca: U', audioHint: 'U' },
      { id: 'i3_3', arabic: 'اَ اِ اُ', latin: 'A - I - U', transcription: 'Alif berharakat lengkap: A - I - U', audioHint: 'A I U' },
      { id: 'i3_4', arabic: 'بَ بِ بُ', latin: 'Ba - Bi - Bu', transcription: 'Ba berharakat lengkap: Ba - Bi - Bu', audioHint: 'Ba Bi Bu' },
      { id: 'i3_5', arabic: 'تَ تِ تُ', latin: 'Ta - Ti - Tu', transcription: 'Ta berharakat lengkap: Ta - Ti - Tu', audioHint: 'Ta Ti Tu' },
      { id: 'i3_6', arabic: 'رُسُلُ', latin: 'Ru - Su - Lu', transcription: 'Tiga dhammah berurutan: Ru - Su - Lu', audioHint: 'Ru Su Lu' },
      { id: 'i3_7', arabic: 'عَلِمَ', latin: "'A - Li - Ma", transcription: "'A fathah - Li kasrah - Ma fathah", audioHint: 'Ali Ma' },
      { id: 'i3_8', arabic: 'سَمِعَ', latin: "Sa - Mi - 'A", transcription: "Sa fathah - Mi kasrah - 'A fathah", audioHint: 'Sami A' }
    ]
  },
  {
    level: 3,
    pageNumber: 2,
    title: "Iqro 3 • Pelajaran 2",
    subtitle: "Mad Kasrah (Ya Sukun) & Mad Dhammah (Wawu Sukun)",
    description: "Kasrah bertemu Ya sukun (يْ) dibaca panjang 'II'. Dhammah bertemu Wawu sukun (وْ) dibaca panjang 'UU'.",
    items: [
      { id: 'i3_9', arabic: 'فِي', latin: 'Fii', transcription: 'Fa kasrah + Ya sukun: Fii (2 harakat)', audioHint: 'Fii' },
      { id: 'i3_10', arabic: 'قِيْلَ', latin: 'Qii - La', transcription: 'Qii (panjang 2 harakat) - La (pendek)', audioHint: 'Qii La' },
      { id: 'i3_11', arabic: 'دِيْنُ', latin: 'Dii - Nu', transcription: 'Dii (panjang 2 harakat) - Nu (pendek)', audioHint: 'Dii Nu' },
      { id: 'i3_12', arabic: 'يَقُوْلُ', latin: 'Ya - Quu - Lu', transcription: 'Ya - Quu (panjang 2 harakat) - Lu', audioHint: 'Ya Quu Lu' },
      { id: 'i3_13', arabic: 'تَكُوْنُ', latin: 'Ta - Kuu - Nu', transcription: 'Ta - Kuu (panjang) - Nu', audioHint: 'Ta Kuu Nu' },
      { id: 'i3_14', arabic: 'غَفُوْرٌ', latin: 'Gho - Fuu - Run', transcription: 'Gho - Fuu (panjang) - Run', audioHint: 'Gho Fuu Run' },
      { id: 'i3_15', arabic: 'شَكُوْرٌ', latin: 'Sya - Kuu - Run', transcription: 'Sya - Kuu (panjang) - Run', audioHint: 'Sya Kuu Run' },
      { id: 'i3_16', arabic: 'عَلِيْمٌ', latin: "'A - Lii - Mun", transcription: "'A - Lii (panjang) - Mun", audioHint: 'A Lii Mun' }
    ]
  },

  // IQRO 4: Tanwin, Sukun, dan Huruf Qalqalah
  {
    level: 4,
    pageNumber: 1,
    title: "Iqro 4 • Pelajaran 1",
    subtitle: "Mengenal Harakat Tanwin (An - In - Un)",
    description: "Fathatain (garis ganda atas) = AN. Kasratain (garis ganda bawah) = IN. Dhammatain (tanda ganda atas) = UN.",
    items: [
      { id: 'i4_1', arabic: 'بًا بٍ بٌ', latin: 'Ban - Bin - Bun', transcription: 'Tanwin pada Ba: Ban - Bin - Bun', audioHint: 'Ban Bin Bun' },
      { id: 'i4_2', arabic: 'كِتَابًا', latin: 'Ki - Taa - Ban', transcription: 'Ki - Taa (panjang) - Ban (tanwin)', audioHint: 'Ki Taa Ban' },
      { id: 'i4_3', arabic: 'رَحِيمًا', latin: 'Ro - Hii - Man', transcription: 'Ro - Hii (panjang) - Man (tanwin)', audioHint: 'Ro Hii Man' },
      { id: 'i4_4', arabic: 'عَذَابٌ', latin: "'A - Dzaa - Bun", transcription: "'A - Dzaa (panjang) - Bun (tanwin)", audioHint: 'A Dzaa Bun' },
      { id: 'i4_5', arabic: 'أَحَدٌ', latin: 'A - Ha - Dun', transcription: 'A - Ha - Dun', audioHint: 'A Ha Dun' },
      { id: 'i4_6', arabic: 'صَمَدٌ', latin: 'Sho - Ma - Dun', transcription: 'Sho - Ma - Dun', audioHint: 'Sho Ma Dun' },
      { id: 'i4_7', arabic: 'خَيْرٍ', latin: 'Khoy - Rin', transcription: 'Khoy (sukun) - Rin (tanwin)', audioHint: 'Khoy Rin' },
      { id: 'i4_8', arabic: 'حَكِيمٍ', latin: 'Ha - Kii - Min', transcription: 'Ha - Kii (panjang) - Min', audioHint: 'Ha Kii Min' }
    ]
  },
  {
    level: 4,
    pageNumber: 2,
    title: "Iqro 4 • Pelajaran 2",
    subtitle: "Sukun (Mati) & Huruf Qalqalah (Memantul)",
    description: "Tanda bulatan sukun (ْ) mematikan huruf. Bila huruf sukun adalah Ba, Jim, Dal, Tho, Qof (Baju Di Thoko), suaranya harus memantul bersih!",
    items: [
      { id: 'i4_9', arabic: 'أَبْ', latin: 'Ab(b)', transcription: 'Qalqalah pada huruf Ba: Ab dengan pantulan', audioHint: 'Ab' },
      { id: 'i4_10', arabic: 'أَجْ', latin: 'Aj(j)', transcription: 'Qalqalah pada huruf Jim: Aj dengan pantulan', audioHint: 'Aj' },
      { id: 'i4_11', arabic: 'أَدْ', latin: 'Ad(d)', transcription: 'Qalqalah pada huruf Dal: Ad dengan pantulan', audioHint: 'Ad' },
      { id: 'i4_12', arabic: 'أَطْ', latin: 'Ath(th)', transcription: 'Qalqalah pada huruf Tho: Ath dengan pantulan tebal', audioHint: 'Ath' },
      { id: 'i4_13', arabic: 'أَقْ', latin: 'Aq(q)', transcription: 'Qalqalah pada huruf Qof: Aq dengan pantulan tebal', audioHint: 'Aq' },
      { id: 'i4_14', arabic: 'يَجْعَلْ', latin: 'Yaj(j) - ' + "'Al", transcription: 'Qalqalah di tengah kata: Yaj - al', audioHint: 'Yaj al' },
      { id: 'i4_15', arabic: 'يَقْطَعُ', latin: 'Yaq(q) - Tho - ' + "'U", transcription: 'Yaq - tho - u dengan pantulan qof', audioHint: 'Yaq tho u' },
      { id: 'i4_16', arabic: 'أَبْصَارُ', latin: 'Ab(b) - Shoo - Ru', transcription: 'Ab - shoo - ru dengan pantulan ba', audioHint: 'Ab shoo ru' }
    ]
  },

  // IQRO 5: Tasydid / Syaddah, Waqaf & Alif Lam
  {
    level: 5,
    pageNumber: 1,
    title: "Iqro 5 • Pelajaran 1",
    subtitle: "Mengenal Tasydid (Syaddah) & Huruf Rangkap",
    description: "Tanda tasydid ( ّ ) seperti huruf 'w' kecil berarti huruf tersebut ditekan ganda. Pada Nun dan Mim bertasydid ditahan dengung 2 harakat.",
    items: [
      { id: 'i5_1', arabic: 'رَبِّ', latin: 'Robbi', transcription: 'Ba ditekan ganda: Rob-bi', audioHint: 'Robbi' },
      { id: 'i5_2', arabic: 'ثُمَّ', latin: 'Tsum-ma (Ghunnah)', transcription: 'Mim tasydid ditahan dengung: Tsumma', audioHint: 'Tsumma' },
      { id: 'i5_3', arabic: 'إِنَّ', latin: 'In-na (Ghunnah)', transcription: 'Nun tasydid ditahan dengung: Inna', audioHint: 'Inna' },
      { id: 'i5_4', arabic: 'كَلَّا', latin: 'Kal-laa', transcription: 'Lam tasydid dipanjangkan: Kal-laa', audioHint: 'Kallaa' },
      { id: 'i5_5', arabic: 'حَقَّ', latin: 'Haq-qo', transcription: 'Qof bertasydid di akhir bacaan', audioHint: 'Haqqo' },
      { id: 'i5_6', arabic: 'تَبَّتْ', latin: 'Tab-bat', transcription: 'Ba ditekan + Ta sukun berdesis: Tab-bat', audioHint: 'Tabbat' },
      { id: 'i5_7', arabic: 'مُحَمَّدٌ', latin: 'Mu-ham-ma-dun', transcription: 'Mu-ham (dengung mim tasydid) - madun', audioHint: 'Muhammadun' },
      { id: 'i5_8', arabic: 'وَٱلصَّيْفِ', latin: 'Wash-shoyf', transcription: 'Alif lam Syamsiyah langsung masuk ke Shad', audioHint: 'Wash-shoyf' }
    ]
  },
  {
    level: 5,
    pageNumber: 2,
    title: "Iqro 5 • Pelajaran 2",
    subtitle: "Waqaf (Tanda Berhenti) & Pembacaan Akhir Kalimat",
    description: "Saat berhenti di akhir ayat, huruf terakhir disukunkan. Fathatain (-an) berubah menjadi bacaan panjang (-aa) atau Mad 'Iwadh.",
    items: [
      { id: 'i5_9', arabic: 'ٱلْعَالَمِينَ', latin: 'Al-’Aalamiin', transcription: 'Waqaf: huruf nun dibaca sukun menjadi Al-Aalamiin', audioHint: 'Al-Aalamiin' },
      { id: 'i5_10', arabic: 'ٱلرَّحِيمِ', latin: 'Ar-Rahiim', transcription: 'Waqaf: mim dibaca sukun menjadi Ar-Rahiim', audioHint: 'Ar-Rahiim' },
      { id: 'i5_11', arabic: 'أَفْوَاجًا', latin: 'Afwaajaa', transcription: 'Waqaf Mad Iwadh: Fathatain menjadi panjang Afwaajaa', audioHint: 'Afwaajaa' },
      { id: 'i5_12', arabic: 'تَوَّابًا', latin: 'Tawwaabaa', transcription: 'Waqaf: Tawwaabaa panjang 2 ketukan', audioHint: 'Tawwaabaa' },
      { id: 'i5_13', arabic: 'ٱلْفَلَقِ', latin: 'Al-Falaq(q)', transcription: 'Waqaf Qalqalah Kubra: Qof memantul kuat!', audioHint: 'Al-Falaq' },
      { id: 'i5_14', arabic: 'وَقَبَ', latin: 'Waqob(b)', transcription: 'Waqaf: Ba disukunkan menjadi qalqalah mantap', audioHint: 'Waqob' },
      { id: 'i5_15', arabic: 'حَسَدَ', latin: 'Hasad(d)', transcription: 'Waqaf: Dal disukunkan menjadi pantulan qalqalah', audioHint: 'Hasad' },
      { id: 'i5_16', arabic: 'ٱلصَّمَدُ', latin: 'Ash-Shomad(d)', transcription: 'Waqaf: Ash-Shomad memantul di huruf Dal', audioHint: 'Ash-Shomad' }
    ]
  },

  // IQRO 6: Hukum Nun Mati/Tanwin, Mim Mati, & Bacaan Lancar
  {
    level: 6,
    pageNumber: 1,
    title: "Iqro 6 • Pelajaran 1",
    subtitle: "Hukum Nun Mati & Tanwin: Ikhfa, Idgham, Iqlab, Izh-har",
    description: "Pelajaran tingkat lanjut untuk menyempurnakan bacaan Al-Qur'an dengan kaidah tajwid yang benar dan tartil.",
    items: [
      { id: 'i6_1', arabic: 'مِن خَوْفٍ', latin: 'Min Khowf (Izh-har)', transcription: 'Nun mati bertemu Kha: dibaca jelas tanpa dengung', audioHint: 'Min Khowf' },
      { id: 'i6_2', arabic: 'مِن قَبْلِ', latin: 'Ming Qobli (Ikhfa)', transcription: 'Nun mati bertemu Qof: samar disertai dengung 2 harakat', audioHint: 'Ming Qobli' },
      { id: 'i6_3', arabic: 'مَن يَعْمَلْ', latin: 'May-ya’mal (Idgham)', transcription: 'Nun mati masuk ke Ya disertai dengung', audioHint: 'May yamal' },
      { id: 'i6_4', arabic: 'مِنۢ بَعْدِ', latin: 'Mim-ba’di (Iqlab)', transcription: 'Nun mati berubah menjadi suara Mim lembut sebelum Ba', audioHint: 'Mim badi' },
      { id: 'i6_5', arabic: 'عَلِيمٌ حَكِيمٌ', latin: "'Aliimun Hakiim (Izh-har)", transcription: 'Tanwin bertemu Ha dibaca jelas', audioHint: 'Aliimun Hakiim' },
      { id: 'i6_6', arabic: 'غَفُورٌ رَّحِيمٌ', latin: 'Ghofuurur-rohiim (Bilaghunnah)', transcription: 'Tanwin masuk ke Ro tanpa dengung', audioHint: 'Ghofuurur rohiim' },
      { id: 'i6_7', arabic: 'كِتَابٌ كَرِيمٌ', latin: 'Kitaabung-kariim (Ikhfa)', transcription: 'Tanwin bertemu Kaf dibaca samar mendengung', audioHint: 'Kitaabung kariim' },
      { id: 'i6_8', arabic: 'جَزَآءً وِفَاقًا', latin: 'Jazaaa-aw-wifaaqoo', transcription: 'Mad Wajib + Idgham Bighunnah berturut-turut', audioHint: 'Jazaa aw wifaaqoo' }
    ]
  },
  {
    level: 6,
    pageNumber: 2,
    title: "Iqro 6 • Pelajaran 2",
    subtitle: "Kelulusan Iqro • Membaca Ayat Suci Tartil & Khusyuk",
    description: "Selamat! Anda telah siap membaca mushaf Al-Qur'an 30 Juz secara penuh. Latihlah bacaan ayat-ayat pilihan berikut dengan tenang dan tartil.",
    items: [
      { id: 'i6_9', arabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', latin: 'Bismillaahir-rohmaanir-rohiim', transcription: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang', audioHint: 'Bismillahir rohmaanir rohiim' },
      { id: 'i6_10', arabic: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَالَمِينَ', latin: 'Al-hamdu lillaahi robbil-’aalamiin', transcription: 'Segala puji bagi Allah, Tuhan semesta alam', audioHint: 'Alhamdulillahi robbil aalamiin' },
      { id: 'i6_11', arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', latin: 'Iyyaaka na’budu wa iyyaaka nasta’iin', transcription: 'Hanya kepada-Mu lah kami menyembah dan hanya kepada-Mu kami mohon pertolongan', audioHint: 'Iyyaaka nabudu wa iyyaaka nastaiin' },
      { id: 'i6_12', arabic: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ', latin: 'Ihdinash-shiroothol-mustaqiim', transcription: 'Tunjukilah kami jalan yang lurus', audioHint: 'Ihdinash shiroothol mustaqiim' },
      { id: 'i6_13', arabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ', latin: 'Qul huwal-laahu ahad(d)', transcription: 'Katakanlah: Dialah Allah, Yang Maha Esa', audioHint: 'Qul huwallahu ahad' },
      { id: 'i6_14', arabic: 'ٱللَّهُ ٱلصَّمَدُ', latin: 'Allaahush-shomad(d)', transcription: 'Allah tempat meminta segala sesuatu', audioHint: 'Allahush shomad' },
      { id: 'i6_15', arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', latin: 'Lam yalid wa lam yuulad(d)', transcription: 'Dia tidak beranak dan tidak pula diperanakkan', audioHint: 'Lam yalid wa lam yuulad' },
      { id: 'i6_16', arabic: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ', latin: 'Wa lam yakul-lahuu kufuwan ahad(d)', transcription: 'Dan tidak ada seorang pun yang setara dengan Dia', audioHint: 'Wa lam yakullahu kufuwan ahad' }
    ]
  }
];
