/* ==========================================================================
   Zakhrafa — 60+ Arabic decoration styles.
   Every style wraps the name or stretches it with tatweel; no style
   replaces Arabic letters, so Arabic shaping and joining stay intact.
   ========================================================================== */
(function () {
  'use strict';

  var ARABIC_LETTER = /[\u0621-\u064A\u0671-\u06D3]/;
  var DUAL_JOINING = /[بتثجحخسشصضطظعغفقكلمنهيئ]/;
  var HARAKAT = /[\u064B-\u065F\u0670]/;
  var TATWEEL = '\u0640';

  function hasArabic(text) {
    return /[\u0600-\u06FF]/.test(String(text || ''));
  }

  function wrapper(template) {
    return function (name) { return template.replace(/\{name\}/g, name); };
  }

  function stretch(text, count) {
    var chars = Array.from(String(text));
    var out = '';
    for (var i = 0; i < chars.length; i += 1) {
      out += chars[i];
      if (DUAL_JOINING.test(chars[i])) {
        var next = chars[i + 1];
        // Do not insert a kashida before a space, punctuation, or another
        // diacritic: it would create visual noise and break the expected order.
        if (next && ARABIC_LETTER.test(next) && !HARAKAT.test(next)) {
          out += TATWEEL.repeat(count);
        }
      }
    }
    return out;
  }

  function addMark(text, mark) {
    return Array.from(String(text)).map(function (ch) {
      return ARABIC_LETTER.test(ch) ? ch + mark : ch;
    }).join('');
  }

  function addMarks(text, marks, every) {
    var index = 0;
    return Array.from(String(text)).map(function (ch) {
      if (!ARABIC_LETTER.test(ch)) return ch;
      index += 1;
      if (index % (every || 1) !== 0) return ch;
      return ch + marks[(index - 1) % marks.length];
    }).join('');
  }

  function lastLetterMark(text, mark) {
    var chars = Array.from(String(text));
    for (var i = chars.length - 1; i >= 0; i -= 1) {
      if (ARABIC_LETTER.test(chars[i])) {
        chars[i] = chars[i] + mark;
        break;
      }
    }
    return chars.join('');
  }

  var plainWrappers = [
    ['ar-wrap-ornate', 'إطار شرقي', 'Ornate frame', '꧁༺ {name} ༻꧂'],
    ['ar-wrap-royal', 'إطار ملكي', 'Royal frame', '꧁༒☬ {name} ☬༒꧂'],
    ['ar-wrap-luxe', 'لمسة فاخرة', 'Grand luxe', '✦•┈๑⋅⋯ {name} ⋯⋅๑┈•✦'],
    ['ar-wrap-heart', 'قلب', 'Heart frame', '♡ {name} ♡'],
    ['ar-wrap-crown', 'تاج', 'Crown frame', '♛ {name} ♛'],
    ['ar-wrap-moon', 'هلال', 'Crescent frame', '☾ {name} ☽'],
    ['ar-wrap-flower', 'زهرة', 'Flower frame', '❈ {name} ❈'],
    ['ar-wrap-mountain', 'قوس', 'Arch frame', '༺ {name} ༻'],
    ['ar-wrap-east', 'أقواس شرقية', 'Eastern corners', '『{name}』'],
    ['ar-wrap-square', 'إطار مربع', 'Square brackets', '【{name}】'],
    ['ar-wrap-angle', 'أقواس هندسية', 'Geometry brackets', '⟬ {name} ⟭'],
    ['ar-wrap-heavy', 'أقواس ثقيلة', 'Heavy brackets', '❰ {name} ❱'],
    ['ar-wrap-moroccan', 'نقش مغربي', 'Moroccan mark', '☬ {name} ☬'],
    ['ar-wrap-sparkle', 'لمعة', 'Sparkle frame', '✧ {name} ✧'],
    ['ar-wrap-starfield', 'حقل نجوم', 'Starfield', '⊹₊ ⋆ {name} ⋆ ₊⊹'],
    ['ar-wrap-aesthetic', 'رمزي ناعم', 'Aesthetic frame', '୨୧ {name} ୨୧'],
    ['ar-wrap-sacred', 'نقوش قديمة', 'Ancient marks', '𓆩 {name} 𓆪'],
    ['ar-wrap-blossom', 'زهرة خمسية', 'Blossom frame', 'ꕥ {name} ꕥ'],
    ['ar-wrap-petals', 'بتلات', 'Petals frame', '❀ {name} ❀'],
    ['ar-wrap-quranic', 'أقواس قرآنية', 'Ornate Quranic', '﴾ {name} ﴿'],
    ['ar-wrap-islamic', 'زخرفة إسلامية', 'Islamic ornament', '۞ {name} ۞'],
    ['ar-wrap-wave', 'موجة', 'Wave frame', '彡 {name} 彡'],
    ['ar-wrap-symbol', 'رمز ياباني', 'Symbol frame', '亗 {name} 亗'],
    ['ar-wrap-burst', 'انفجار', 'Burst frame', '✹ {name} ✹'],
    ['ar-wrap-diamond', 'ماسة', 'Diamond frame', '❖ {name} ❖'],
    ['ar-wrap-petalsoft', 'ورقة ناعمة', 'Soft petal', '𖹭 {name} 𖹭'],
    ['ar-wrap-softdot', 'نقطة ناعمة', 'Soft dot', '᯽ {name} ᯽'],
    ['ar-wrap-star', 'نجمة', 'Star frame', '⋆ {name} ⋆'],
    ['ar-wrap-shine', 'لمعان', 'Shine frame', '✦ {name} ✦'],
    ['ar-wrap-star2', 'نجمة مضيئة', 'Glowing star', '⭑ {name} ⭑'],
    ['ar-wrap-flower2', 'زهرة برية', 'Wildflower', '✿ {name} ✿'],
    ['ar-wrap-clover', 'برسيم', 'Clover frame', '☘ {name} ☘'],
    ['ar-wrap-fleur', 'زنبقة', 'Fleur-de-lis', '⚜ {name} ⚜'],
    ['ar-wrap-queen', 'ملكة', 'Queen frame', '♕ {name} ♕'],
    ['ar-wrap-sun', 'شمس', 'Sun frame', '☀ {name} ☀'],
    ['ar-wrap-lightning', 'برق', 'Lightning frame', '⚡ {name} ⚡'],
    ['ar-wrap-fire', 'نار', 'Fire frame', '🔥 {name} 🔥'],
    ['ar-wrap-goldcrown', 'تاج ذهبي', 'Golden crown', '👑 {name} 👑'],
    ['ar-wrap-pinkheart', 'قلب وردي', 'Pink heart', '💗 {name} 💗'],
    ['ar-wrap-butterfly', 'فراشة', 'Butterfly frame', '🦋 {name} 🦋']
  ];

  var arabicStyles = plainWrappers.map(function (row) {
    return {
      id: row[0], group: 'frame', nameAr: row[1], nameEn: row[2], apply: wrapper(row[3])
    };
  });

  // Tatweel / kashida — every insertion happens between letters that can join.
  arabicStyles.push(
    { id: 'ar-stretch-1', group: 'stretch', nameAr: 'كشيدة هادئة', nameEn: 'Soft kashida', apply: function (s) { return stretch(s, 1); } },
    { id: 'ar-stretch-2', group: 'stretch', nameAr: 'كشيدة واضحة', nameEn: 'Wide kashida', apply: function (s) { return stretch(s, 2); } },
    { id: 'ar-stretch-3', group: 'stretch', nameAr: 'كشيدة ممتدة', nameEn: 'Extended kashida', apply: function (s) { return stretch(s, 3); } },
    { id: 'ar-stretch-frame', group: 'stretch', nameAr: 'كشيدة مزخرفة', nameEn: 'Framed kashida', apply: function (s) { return '꧁༺ ' + stretch(s, 2) + ' ༻꧂'; } },
    { id: 'ar-stretch-royal', group: 'stretch', nameAr: 'كشيدة ملكية', nameEn: 'Royal kashida', apply: function (s) { return '♛ ' + stretch(s, 2) + ' ♛'; } },
    { id: 'ar-stretch-moon', group: 'stretch', nameAr: 'كشيدة وهلال', nameEn: 'Kashida & crescent', apply: function (s) { return '☾ ' + stretch(s, 1) + ' ☽'; } },
    { id: 'ar-stretch-heart', group: 'stretch', nameAr: 'كشيدة وقلب', nameEn: 'Kashida & heart', apply: function (s) { return '♡ ' + stretch(s, 1) + ' ♡'; } },
    { id: 'ar-stretch-sparkle', group: 'stretch', nameAr: 'كشيدة ولمعة', nameEn: 'Kashida & sparkle', apply: function (s) { return '✦ ' + stretch(s, 1) + ' ✦'; } },
    { id: 'ar-stretch-emerald', group: 'stretch', nameAr: 'كشيدة وحبر', nameEn: 'Kashida & ink', apply: function (s) { return '۞ ' + stretch(s, 2) + ' ۞'; } }
  );

  // Tashkeel / diacritics. These are optional ornament, not a grammatical
  // correction; the original letters remain fully joined.
  arabicStyles.push(
    { id: 'ar-fatha', group: 'diacritic', nameAr: 'فتحات', nameEn: 'Fatha', apply: function (s) { return addMark(s, '\u064E'); } },
    { id: 'ar-damma', group: 'diacritic', nameAr: 'ضمات', nameEn: 'Damma', apply: function (s) { return addMark(s, '\u064F'); } },
    { id: 'ar-kasra', group: 'diacritic', nameAr: 'كسرة', nameEn: 'Kasra', apply: function (s) { return addMark(s, '\u0650'); } },
    { id: 'ar-sukun', group: 'diacritic', nameAr: 'سكون', nameEn: 'Sukun', apply: function (s) { return addMark(s, '\u0652'); } },
    { id: 'ar-shadda', group: 'diacritic', nameAr: 'شدّة', nameEn: 'Shadda', apply: function (s) { return addMark(s, '\u0651'); } },
    { id: 'ar-tanwin-fath', group: 'diacritic', nameAr: 'تنوين فتح', nameEn: 'Fathatan', apply: function (s) { return addMark(s, '\u064B'); } },
    { id: 'ar-tanwin-damm', group: 'diacritic', nameAr: 'تنوين ضم', nameEn: 'Dammatan', apply: function (s) { return addMark(s, '\u064C'); } },
    { id: 'ar-tanwin-kasr', group: 'diacritic', nameAr: 'تنوين كسر', nameEn: 'Kasratan', apply: function (s) { return addMark(s, '\u064D'); } },
    { id: 'ar-final-fatha', group: 'diacritic', nameAr: 'همسة أخيرة', nameEn: 'Final whisper', apply: function (s) { return lastLetterMark(s, '\u064E'); } },
    { id: 'ar-shadda-fatha', group: 'diacritic', nameAr: 'شدّة وفتحة', nameEn: 'Shadda & fatha', apply: function (s) { return addMark(s, '\u0651\u064E'); } }
  );

  // Mixed = joining-safe stretch + light diacritics / frames.
  arabicStyles.push(
    { id: 'ar-stretch-fatha', group: 'mixed', nameAr: 'كشيدة وفتحة', nameEn: 'Kashida & fatha', apply: function (s) { return stretch(addMark(s, '\u064E'), 1); } },
    { id: 'ar-stretch-mix', group: 'mixed', nameAr: 'كشيدة وتشكيل', nameEn: 'Kashida & tashkeel', apply: function (s) { return stretch(addMarks(s, ['\u064E', '\u0650', '\u064F', '\u0652'], 2), 1); } },
    { id: 'ar-mix-frame', group: 'mixed', nameAr: 'تشكيل داخل إطار', nameEn: 'Tashkeel in frame', apply: function (s) { return '꧁༒☬ ' + addMarks(s, ['\u064E', '\u0650', '\u064F'], 2) + ' ☬༒꧂'; } },
    { id: 'ar-stretch-crown', group: 'mixed', nameAr: 'كشيدة وتاج', nameEn: 'Kashida & crown', apply: function (s) { return '👑 ' + stretch(addMarks(s, ['\u064E', '\u0652'], 3), 1) + ' 👑'; } },
    { id: 'ar-mix-quranic', group: 'mixed', nameAr: 'تشكيل وأقواس', nameEn: 'Tashkeel & Quranic frame', apply: function (s) { return '﴾ ' + addMark(stretch(s, 1), '\u064E') + ' ﴿'; } },
    { id: 'ar-mix-luxe', group: 'mixed', nameAr: 'فخامة مشكّلة', nameEn: 'Gilded tashkeel', apply: function (s) { return '✦•┈๑⋅⋯ ' + stretch(addMarks(s, ['\u064E', '\u0650'], 2), 1) + ' ⋯⋅๑┈•✦'; } }
  );

  function styleLabel(style, lang) {
    return lang === 'ar' ? style.nameAr : style.nameEn;
  }

  window.ZK.arabicStyles = arabicStyles;
  window.ZK.arabicStyleLabel = styleLabel;
  window.ZK.arabicUtils = {
    hasArabic: hasArabic,
    stretch: stretch
  };
  window.ZK.isArabicText = hasArabic;
})();
