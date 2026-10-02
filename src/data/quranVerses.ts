import { Ayah } from '../types';

export const CORE_QURAN_DATA: Record<number, Ayah[]> = {
  // Surah 1: Al-Fatihah
  1: [
    {
      numberInSurah: 1,
      globalNumber: 1,
      surahNumber: 1,
      arabicText: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      transliteration: "Bismillaahir-rohmaanir-rohiim",
      translationId: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
      juz: 1,
      page: 1,
      tajwidSegments: [
        { text: "بِسْمِ ٱللَّهِ " },
        { text: "ٱلرَّحْمَٰنِ " },
        { text: "ٱلرَّحِيمِ", rule: "mad" }
      ]
    },
    {
      numberInSurah: 2,
      globalNumber: 2,
      surahNumber: 1,
      arabicText: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
      transliteration: "Al-hamdu lillaahi robbil-'aalamiin",
      translationId: "Segala puji bagi Allah, Tuhan semesta alam.",
      juz: 1,
      page: 1,
      tajwidSegments: [
        { text: "ٱلْحَمْدُ لِلَّهِ رَبِّ " },
        { text: "ٱلْعَٰلَمِينَ", rule: "mad" }
      ]
    },
    {
      numberInSurah: 3,
      globalNumber: 3,
      surahNumber: 1,
      arabicText: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      transliteration: "Ar-rohmaanir-rohiim",
      translationId: "Maha Pengasih, Maha Penyayang.",
      juz: 1,
      page: 1,
      tajwidSegments: [
        { text: "ٱلرَّحْمَٰنِ " },
        { text: "ٱلرَّحِيمِ", rule: "mad" }
      ]
    },
    {
      numberInSurah: 4,
      globalNumber: 4,
      surahNumber: 1,
      arabicText: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
      transliteration: "Maaliki yawmid-diin",
      translationId: "Pemilik hari pembalasan.",
      juz: 1,
      page: 1,
      tajwidSegments: [
        { text: "مَٰلِكِ يَوْمِ " },
        { text: "ٱلدِّينِ", rule: "mad" }
      ]
    },
    {
      numberInSurah: 5,
      globalNumber: 5,
      surahNumber: 1,
      arabicText: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      transliteration: "Iyyaaka na'budu wa iyyaaka nasta'iin",
      translationId: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.",
      juz: 1,
      page: 1,
      tajwidSegments: [
        { text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ " },
        { text: "نَسْتَعِينُ", rule: "mad" }
      ]
    },
    {
      numberInSurah: 6,
      globalNumber: 6,
      surahNumber: 1,
      arabicText: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
      transliteration: "Ihdinash-shiroothol-mustaqiim",
      translationId: "Tunjukilah kami jalan yang lurus,",
      juz: 1,
      page: 1,
      tajwidSegments: [
        { text: "ٱهْدِنَا ٱلصِّرَٰطَ " },
        { text: "ٱلْمُسْتَقِيمَ", rule: "mad" }
      ]
    },
    {
      numberInSurah: 7,
      globalNumber: 7,
      surahNumber: 1,
      arabicText: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
      transliteration: "Shiroothol-ladziina an'amta 'alayhim ghoyril-maghdhuubi 'alayhim wa ladh-dhoolliin",
      translationId: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",
      juz: 1,
      page: 1,
      tajwidSegments: [
        { text: "صِرَٰطَ ٱلَّذِينَ " },
        { text: "أَنْعَمْتَ ", rule: "ghunnah" },
        { text: "عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا " },
        { text: "ٱلضَّآلِّينَ", rule: "mad" }
      ]
    }
  ],

  // Surah 2: Al-Baqarah (Opening & Ayat Kursi)
  2: [
    {
      numberInSurah: 1,
      globalNumber: 8,
      surahNumber: 2,
      arabicText: "الم",
      transliteration: "Alif-Laaam-Miiim",
      translationId: "Alif Lam Mim.",
      juz: 1,
      page: 2,
      tajwidSegments: [{ text: "الم", rule: "mad" }]
    },
    {
      numberInSurah: 2,
      globalNumber: 9,
      surahNumber: 2,
      arabicText: "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
      transliteration: "Dzaalikal-kitaabu laa royba fiih, hudal-lil-muttaqiin",
      translationId: "Kitab (Al-Qur'an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa,",
      juz: 1,
      page: 2,
      tajwidSegments: [
        { text: "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ " },
        { text: "هُدًى لِّلْمُتَّقِينَ", rule: "idgham_bighunnah" }
      ]
    },
    {
      numberInSurah: 3,
      globalNumber: 10,
      surahNumber: 2,
      arabicText: "ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ",
      transliteration: "Alladziina yu'minuuna bil-ghoybi wa yuqiimuunash-sholaata wa mimmaa rozaqnaahum yunfiquun",
      translationId: "(yaitu) mereka yang beriman kepada yang gaib, melaksanakan salat, dan menginfakkan sebagian rezeki yang Kami berikan kepada mereka,",
      juz: 1,
      page: 2,
      tajwidSegments: [
        { text: "ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ " },
        { text: "وَمِمَّا ", rule: "ghunnah" },
        { text: "رَزَقْنَٰهُمْ " },
        { text: "يُنفِقُونَ", rule: "ikhfa" }
      ]
    },
    {
      numberInSurah: 4,
      globalNumber: 11,
      surahNumber: 2,
      arabicText: "وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْـَٔاخِرَةِ هُمْ يُوقِنُونَ",
      transliteration: "Walladziina yu'minuuna bimaaa unzila ilayka wa maaa unzila min qoblika wa bil-aakhirati hum yuuqinuun",
      translationId: "dan mereka yang beriman kepada (Al-Qur'an) yang diturunkan kepadamu (Muhammad) dan (kitab-kitab) yang telah diturunkan sebelum engkau, serta mereka yakin akan adanya akhirat.",
      juz: 1,
      page: 2,
      tajwidSegments: [
        { text: "وَٱلَّذِينَ يُؤْمِنُونَ " },
        { text: "بِمَآ أُنزِلَ ", rule: "mad" },
        { text: "إِلَيْكَ " },
        { text: "وَمَآ أُنزِلَ ", rule: "mad" },
        { text: "مِن قَبْلِكَ ", rule: "ikhfa" },
        { text: "وَبِٱلْـَٔاخِرَةِ هُمْ يُوقِنُونَ" }
      ]
    },
    {
      numberInSurah: 5,
      globalNumber: 12,
      surahNumber: 2,
      arabicText: "أُو۟لَٰٓئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُو۟لَٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ",
      transliteration: "Ulaaa'ika 'alaa hudam-mir-robbihim wa ulaaa'ika humul-muflihuun",
      translationId: "Merekalah yang mendapat petunjuk dari Tuhannya, dan mereka itulah orang-orang yang beruntung.",
      juz: 1,
      page: 2,
      tajwidSegments: [
        { text: "أُو۟لَٰٓئِكَ ", rule: "mad" },
        { text: "عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ ", rule: "idgham_bighunnah" },
        { text: "وَأُو۟لَٰٓئِكَ ", rule: "mad" },
        { text: "هُمُ ٱلْمُفْلِحُونَ" }
      ]
    },
    {
      numberInSurah: 255,
      globalNumber: 262,
      surahNumber: 2,
      arabicText: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
      transliteration: "Allaahu laaa ilaaha illaa huwal-hayyul-qoyyuum, laa ta'khudzuhuu sinatuw-wa laa nawm, lahuu maa fis-samaawaati wa maa fil-ardh, man dzal-ladzii yasyfa'u 'indahuuu illaa bi'idznih, ya'lamu maa bayna aydiihim wa maa kholfahum, wa laa yuhiithuuna bisyay'im-min 'ilmihiii illaa bimaa syaaa', wasi'a kursiyyuhus-samaawaati wal-ardh, wa laa ya'uuduhuu hifzhuhumaa, wa huwal-'aliyyul-'azhiim",
      translationId: "Allah, tidak ada tuhan selain Dia. Yang Mahahidup, Yang terus-menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Siapakah yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya? Dia mengetahui apa yang ada di hadapan mereka dan apa yang ada di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Mahatinggi, Mahabesar. (Ayat Kursi)",
      juz: 3,
      page: 42,
      tajwidSegments: [
        { text: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ " },
        { text: "سِنَةٌ وَلَا ", rule: "idgham_bighunnah" },
        { text: "مَن ذَا ", rule: "ikhfa" },
        { text: "عِندَهُۥٓ ", rule: "ikhfa" },
        { text: "شَآءَ ۚ ", rule: "mad" },
        { text: "وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ" }
      ]
    }
  ],

  // Surah 36: Yasin (Pilihan pembuka)
  36: [
    {
      numberInSurah: 1,
      globalNumber: 3706,
      surahNumber: 36,
      arabicText: "يسٓ",
      transliteration: "Yaa-Siiin",
      translationId: "Ya Sin.",
      juz: 22,
      page: 440,
      tajwidSegments: [{ text: "يسٓ", rule: "mad" }]
    },
    {
      numberInSurah: 2,
      globalNumber: 3707,
      surahNumber: 36,
      arabicText: "وَٱلْقُرْءَانِ ٱلْحَكِيمِ",
      transliteration: "Wal-qur'aanil-hakiim",
      translationId: "Demi Al-Qur'an yang penuh hikmah,",
      juz: 22,
      page: 440,
      tajwidSegments: [
        { text: "وَٱلْقُرْءَانِ " },
        { text: "ٱلْحَكِيمِ", rule: "mad" }
      ]
    },
    {
      numberInSurah: 3,
      globalNumber: 3708,
      surahNumber: 36,
      arabicText: "إِنَّكَ لَمِنَ ٱلْمُرْسَلِينَ",
      transliteration: "Innaka laminal-mursaliin",
      translationId: "sungguh, engkau (Muhammad) benar-benar seorang rasul,",
      juz: 22,
      page: 440,
      tajwidSegments: [
        { text: "إِنَّكَ ", rule: "ghunnah" },
        { text: "لَمِنَ ٱلْمُرْسَلِينَ", rule: "mad" }
      ]
    },
    {
      numberInSurah: 4,
      globalNumber: 3709,
      surahNumber: 36,
      arabicText: "عَلَىٰ صِرَٰطٍ مُّسْتَقِيمٍ",
      transliteration: "'Alaa shiroothim-mustaqiim",
      translationId: "(yang berada) di atas jalan yang lurus,",
      juz: 22,
      page: 440,
      tajwidSegments: [
        { text: "عَلَىٰ " },
        { text: "صِرَٰطٍ مُّسْتَقِيمٍ", rule: "idgham_bighunnah" }
      ]
    },
    {
      numberInSurah: 5,
      globalNumber: 3710,
      surahNumber: 36,
      arabicText: "تَنزِيلَ ٱلْعَزِيزِ ٱلرَّحِيمِ",
      transliteration: "Tanziilal-'aziizir-rohiim",
      translationId: "(sebagai wahyu) yang diturunkan oleh Yang Mahaperkasa, Maha Penyayang,",
      juz: 22,
      page: 440,
      tajwidSegments: [
        { text: "تَنزِيلَ ", rule: "ikhfa" },
        { text: "ٱلْعَزِيزِ ٱلرَّحِيمِ", rule: "mad" }
      ]
    }
  ],

  // Surah 67: Al-Mulk
  67: [
    {
      numberInSurah: 1,
      globalNumber: 5242,
      surahNumber: 67,
      arabicText: "تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ",
      transliteration: "Tabaarokal-ladzii biyadihil-mulku wa huwa 'alaa kulli syay'in qodiir",
      translationId: "Mahasuci Allah yang menguasai (segala) kerajaan, dan Dia Mahakuasa atas segala sesuatu.",
      juz: 29,
      page: 562,
      tajwidSegments: [
        { text: "تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ " },
        { text: "شَىْءٍ قَدِيرٌ", rule: "ikhfa" }
      ]
    },
    {
      numberInSurah: 2,
      globalNumber: 5243,
      surahNumber: 67,
      arabicText: "ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ ٱلْعَزِيزُ ٱلْغَفُورُ",
      transliteration: "Alladzii kholaqol-mawta wal-hayaata liyabluwakum ayyukum ahsanu 'amalaa, wa huwal-'aziizul-ghofuur",
      translationId: "Yang menciptakan mati dan hidup, untuk menguji kamu, siapa di antara kamu yang lebih baik amalnya. Dan Dia Mahaperkasa, Maha Pengampun.",
      juz: 29,
      page: 562,
      tajwidSegments: [
        { text: "ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ " },
        { text: "لِيَبْلُوَكُمْ ", rule: "qalqalah" },
        { text: "أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ ٱلْعَزِيزُ ٱلْغَفُورُ" }
      ]
    },
    {
      numberInSurah: 3,
      globalNumber: 5244,
      surahNumber: 67,
      arabicText: "ٱلَّذِى خَلَقَ سَبْعَ سَمَٰوَٰتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِى خَلْقِ ٱلرَّحْمَٰنِ مِن تَفَٰوُتٍ ۖ فَٱرْجِعِ ٱلْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ",
      transliteration: "Alladzii kholaqo sab'a samaawaatin thibaaqom-maa taro fii kholqir-rohmaani min tafaawutin farji'il-bashoro hal taro min futhuur",
      translationId: "Yang menciptakan tujuh langit berlapis-lapis. Tidak akan kamu lihat sesuatu yang tidak seimbang pada ciptaan Tuhan Yang Maha Pengasih. Maka lihatlah sekali lagi, adakah kamu lihat sesuatu yang cacat?",
      juz: 29,
      page: 562,
      tajwidSegments: [
        { text: "ٱلَّذِى خَلَقَ " },
        { text: "سَبْعَ ", rule: "qalqalah" },
        { text: "سَمَٰوَٰتٍ طِبَاقًا ۖ ", rule: "ikhfa" },
        { text: "مِن تَفَٰوُتٍ ۖ ", rule: "ikhfa" },
        { text: "مِن فُطُورٍ", rule: "ikhfa" }
      ]
    }
  ],

  // Surah 112: Al-Ikhlas
  112: [
    {
      numberInSurah: 1,
      globalNumber: 6222,
      surahNumber: 112,
      arabicText: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
      transliteration: "Qul huwal-laahu ahad",
      translationId: "Katakanlah (Muhammad), 'Dialah Allah, Yang Maha Esa.'",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "قُلْ هُوَ ٱللَّهُ " },
        { text: "أَحَدٌ", rule: "qalqalah" }
      ]
    },
    {
      numberInSurah: 2,
      globalNumber: 6223,
      surahNumber: 112,
      arabicText: "ٱللَّهُ ٱلصَّمَدُ",
      transliteration: "Allaahush-shomad",
      translationId: "Allah tempat meminta segala sesuatu.",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "ٱللَّهُ " },
        { text: "ٱلصَّمَدُ", rule: "qalqalah" }
      ]
    },
    {
      numberInSurah: 3,
      globalNumber: 6224,
      surahNumber: 112,
      arabicText: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      transliteration: "Lam yalid wa lam yuulad",
      translationId: "(Allah) tidak beranak dan tidak pula diperanakkan,",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "لَمْ " },
        { text: "يَلِدْ ", rule: "qalqalah" },
        { text: "وَلَمْ " },
        { text: "يُولَدْ", rule: "qalqalah" }
      ]
    },
    {
      numberInSurah: 4,
      globalNumber: 6225,
      surahNumber: 112,
      arabicText: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
      transliteration: "Wa lam yakul-lahuu kufuwan ahad",
      translationId: "dan tidak ada sesuatu yang setara dengan Dia.",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "وَلَمْ " },
        { text: "يَكُن لَّهُۥ ", rule: "idgham_bighunnah" },
        { text: "كُفُوًا أَحَدٌۢ", rule: "qalqalah" }
      ]
    }
  ],

  // Surah 113: Al-Falaq
  113: [
    {
      numberInSurah: 1,
      globalNumber: 6226,
      surahNumber: 113,
      arabicText: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ",
      transliteration: "Qul a'uudzu birobbil-falaq",
      translationId: "Katakanlah, 'Aku berlindung kepada Tuhan yang menguasai subuh (fajar),'",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "قُلْ أَعُوذُ بِرَبِّ " },
        { text: "ٱلْفَلَقِ", rule: "qalqalah" }
      ]
    },
    {
      numberInSurah: 2,
      globalNumber: 6227,
      surahNumber: 113,
      arabicText: "مِن شَرِّ مَا خَلَقَ",
      transliteration: "Min syarri maa kholaq",
      translationId: "dari kejahatan (makhluk yang) Dia ciptakan,",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "مِن شَرِّ ", rule: "ikhfa" },
        { text: "مَا " },
        { text: "خَلَقَ", rule: "qalqalah" }
      ]
    },
    {
      numberInSurah: 3,
      globalNumber: 6228,
      surahNumber: 113,
      arabicText: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
      transliteration: "Wa min syarri ghaasiqin idzaa waqob",
      translationId: "dan dari kejahatan malam apabila telah gelap gulita,",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "وَمِن شَرِّ ", rule: "ikhfa" },
        { text: "غَاسِقٍ إِذَا " },
        { text: "وَقَبَ", rule: "qalqalah" }
      ]
    },
    {
      numberInSurah: 4,
      globalNumber: 6229,
      surahNumber: 113,
      arabicText: "وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ",
      transliteration: "Wa min syarrin-naffaatsaati fil-'uqod",
      translationId: "dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya),",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "وَمِن شَرِّ " },
        { text: "ٱلنَّفَّٰثَٰتِ ", rule: "ghunnah" },
        { text: "فِى " },
        { text: "ٱلْعُقَدِ", rule: "qalqalah" }
      ]
    },
    {
      numberInSurah: 5,
      globalNumber: 6230,
      surahNumber: 113,
      arabicText: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
      transliteration: "Wa min syarri haasidin idzaa hasad",
      translationId: "dan dari kejahatan orang yang dengki apabila dia dengki.",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "وَمِن شَرِّ ", rule: "ikhfa" },
        { text: "حَاسِدٍ إِذَا " },
        { text: "حَسَدَ", rule: "qalqalah" }
      ]
    }
  ],

  // Surah 114: An-Nas
  114: [
    {
      numberInSurah: 1,
      globalNumber: 6231,
      surahNumber: 114,
      arabicText: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ",
      transliteration: "Qul a'uudzu birobbin-naas",
      translationId: "Katakanlah, 'Aku berlindung kepada Tuhannya manusia,'",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "قُلْ أَعُوذُ بِرَبِّ " },
        { text: "ٱلنَّاسِ", rule: "ghunnah" }
      ]
    },
    {
      numberInSurah: 2,
      globalNumber: 6232,
      surahNumber: 114,
      arabicText: "مَلِكِ ٱلنَّاسِ",
      transliteration: "Malikin-naas",
      translationId: "Raja manusia,",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "مَلِكِ " },
        { text: "ٱلنَّاسِ", rule: "ghunnah" }
      ]
    },
    {
      numberInSurah: 3,
      globalNumber: 6233,
      surahNumber: 114,
      arabicText: "إِلَٰهِ ٱلنَّاسِ",
      transliteration: "Ilaahin-naas",
      translationId: "sembahan manusia,",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "إِلَٰهِ " },
        { text: "ٱلنَّاسِ", rule: "ghunnah" }
      ]
    },
    {
      numberInSurah: 4,
      globalNumber: 6234,
      surahNumber: 114,
      arabicText: "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ",
      transliteration: "Min syarril-waswaasil-khonnaas",
      translationId: "dari kejahatan (bisikan) setan yang bersembunyi,",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "مِن شَرِّ ", rule: "ikhfa" },
        { text: "ٱلْوَسْوَاسِ " },
        { text: "ٱلْخَنَّاسِ", rule: "ghunnah" }
      ]
    },
    {
      numberInSurah: 5,
      globalNumber: 6235,
      surahNumber: 114,
      arabicText: "ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ",
      transliteration: "Alladzii yuwaswisu fii shuduurin-naas",
      translationId: "yang membisikkan (kejahatan) ke dalam dada manusia,",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ " },
        { text: "ٱلنَّاسِ", rule: "ghunnah" }
      ]
    },
    {
      numberInSurah: 6,
      globalNumber: 6236,
      surahNumber: 114,
      arabicText: "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
      transliteration: "Minal-jinnati wan-naas",
      translationId: "dari (golongan) jin dan manusia.",
      juz: 30,
      page: 604,
      tajwidSegments: [
        { text: "مِنَ " },
        { text: "ٱلْجِنَّةِ ", rule: "ghunnah" },
        { text: "وَٱلنَّاسِ", rule: "ghunnah" }
      ]
    }
  ]
};

// Cache for fetched surahs and full juz
const surahCache = new Map<number, Ayah[]>();
const juzCache = new Map<number, Ayah[]>();

export async function getJuzVerses(juzNumber: number): Promise<Ayah[]> {
  if (juzCache.has(juzNumber)) {
    return juzCache.get(juzNumber)!;
  }

  try {
    // Fetch complete Uthmani text of this entire Juz from verified Quran API
    const [resArabic, resTrans] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`),
      fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/id.indonesian`)
    ]);

    if (resArabic.ok) {
      const dataArabic = await resArabic.json();
      const dataTrans = resTrans.ok ? await resTrans.json() : null;

      if (dataArabic.data && Array.isArray(dataArabic.data.ayahs)) {
        const ayahsArabic = dataArabic.data.ayahs;
        const ayahsTrans = dataTrans?.data?.ayahs || [];

        const mapped: Ayah[] = ayahsArabic.map((a: any, idx: number) => {
          const trans = ayahsTrans[idx]?.text || '';
          return {
            numberInSurah: a.numberInSurah,
            globalNumber: a.number,
            surahNumber: a.surah.number,
            arabicText: a.text,
            transliteration: `QS. ${a.surah.englishName} : ${a.numberInSurah}`,
            translationId: trans,
            juz: juzNumber,
            page: a.page || 1
          };
        });

        juzCache.set(juzNumber, mapped);
        return mapped;
      }
    }
  } catch (err) {
    console.warn(`Online fetch for full Juz ${juzNumber} fallback.`, err);
  }

  // Fallback to core offline verses if network is unavailable
  if (juzNumber === 1 && CORE_QURAN_DATA[1] && CORE_QURAN_DATA[2]) {
    const combined = [...CORE_QURAN_DATA[1], ...CORE_QURAN_DATA[2]];
    juzCache.set(1, combined);
    return combined;
  }

  if (juzNumber === 30) {
    const juz30Verses: Ayah[] = [];
    [112, 113, 114].forEach((sNum) => {
      if (CORE_QURAN_DATA[sNum]) {
        juz30Verses.push(...CORE_QURAN_DATA[sNum]);
      }
    });
    if (juz30Verses.length > 0) {
      juzCache.set(30, juz30Verses);
      return juz30Verses;
    }
  }

  if (CORE_QURAN_DATA[1]) {
    return CORE_QURAN_DATA[1];
  }
  return [];
}

export async function getSurahVerses(surahNumber: number): Promise<Ayah[]> {
  // Only fully complete surahs in CORE_QURAN_DATA can be used directly offline
  const FULLY_COMPLETE_CORE_SURAHS = [1, 112, 113, 114];
  if (FULLY_COMPLETE_CORE_SURAHS.includes(surahNumber) && CORE_QURAN_DATA[surahNumber]) {
    return CORE_QURAN_DATA[surahNumber];
  }

  // 1. Check in-memory cache
  if (surahCache.has(surahNumber)) {
    return surahCache.get(surahNumber)!;
  }

  // 2. Check localStorage cache for instant zero-latency offline loading
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(`junior_quran_surah_${surahNumber}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (surahNumber !== 1 && parsed[0]?.numberInSurah === 1 && typeof parsed[0].arabicText === 'string') {
            parsed[0].arabicText = parsed[0].arabicText
              .replace(/^بِسْمِ\s+[\u0600-\u06FF\s]*?ٱلرَّحِيمِ\s*/u, '')
              .replace(/^بِسْمِ\s+[\u0600-\u06FF\s]*?ٱلرَّحِيمِ\s*/u, '')
              .trim();
          }
          surahCache.set(surahNumber, parsed);
          // Trigger prefetch for next surah in background
          prefetchAdjacentSurahs(surahNumber);
          return parsed;
        }
      }
    } catch {
      // Ignore cache parse error
    }
  }

  // 3. Primary Verified Quran API: Complete Uthmani script + Indonesian translation
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,id.indonesian`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length >= 2) {
        const arAyahs = json.data[0].ayahs;
        const idAyahs = json.data[1].ayahs;
        const sMeta = json.data[0];

        const mapped: Ayah[] = arAyahs.map((a: any, idx: number) => {
          let cleanArabic = a.text;
          // In Surahs other than Al-Fatihah (Surah 1), Bismillah belongs to the Surah Header Banner, NOT Ayah 1
          if (surahNumber !== 1 && a.numberInSurah === 1) {
            cleanArabic = cleanArabic
              .replace(/^بِسْمِ\s+[\u0600-\u06FF\s]*?ٱلرَّحِيمِ\s*/u, '')
              .replace(/^بِسْمِ\s+[\u0600-\u06FF\s]*?ٱلرَّحِيمِ\s*/u, '')
              .trim();
          }

          return {
            numberInSurah: a.numberInSurah,
            globalNumber: a.number,
            surahNumber: surahNumber,
            arabicText: cleanArabic,
            transliteration: `Ayat ${a.numberInSurah}`,
            translationId: idAyahs[idx]?.text || '',
            juz: a.juz || 1,
            page: a.page || 1
          };
        });

        surahCache.set(surahNumber, mapped);
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(`junior_quran_surah_${surahNumber}`, JSON.stringify(mapped));
          } catch {
            // Storage quota safe
          }
        }

        // Prefetch adjacent surahs in background
        prefetchAdjacentSurahs(surahNumber);
        return mapped;
      }
    }
  } catch (err) {
    console.warn(`Primary API fetch for Surah ${surahNumber} unavailable, trying secondary...`, err);
  }

  // 4. Secondary fallback: equran.id
  try {
    const response = await fetch(`https://equran.id/api/v2/surah/${surahNumber}`);
    if (response.ok) {
      const json = await response.json();
      if (json.data && Array.isArray(json.data.ayat)) {
        const mapped: Ayah[] = json.data.ayat.map((a: any) => ({
          numberInSurah: a.nomorAyat,
          globalNumber: a.nomorAyat,
          surahNumber: surahNumber,
          arabicText: a.teksArab,
          transliteration: a.teksLatin || `Ayat ${a.nomorAyat}`,
          translationId: a.teksIndonesia || '',
          juz: json.data.juzStart || 1,
          page: json.data.pageStart || 1
        }));
        surahCache.set(surahNumber, mapped);
        return mapped;
      }
    }
  } catch (err) {
    console.warn(`Secondary fetch for Surah ${surahNumber} unavailable.`, err);
  }

  // Fallback if offline and in CORE_QURAN_DATA snippet
  if (CORE_QURAN_DATA[surahNumber]) {
    return CORE_QURAN_DATA[surahNumber];
  }

  // Extreme offline fallback
  return [
    {
      numberInSurah: 1,
      globalNumber: 1,
      surahNumber: surahNumber,
      arabicText: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      transliteration: "Bismillaahir-rohmaanir-rohiim",
      translationId: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang.",
      juz: 1,
      page: 1
    }
  ];
}

// Background prefetch for next and previous surahs for seamless, instant page turning
function prefetchAdjacentSurahs(currentSurah: number) {
  setTimeout(() => {
    if (currentSurah < 114 && !surahCache.has(currentSurah + 1)) {
      getSurahVerses(currentSurah + 1).catch(() => {});
    }
    if (currentSurah > 1 && !surahCache.has(currentSurah - 1)) {
      getSurahVerses(currentSurah - 1).catch(() => {});
    }
  }, 1000);
}
