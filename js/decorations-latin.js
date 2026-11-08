/* ==========================================================================
   Zakhrafa — 69 Latin Unicode decoration styles (no network, no library)
   ========================================================================== */
(function () {
  'use strict';

  function fromPairs(upper, lower, digits) {
    var map = {};
    var U = Array.from(upper);
    var L = Array.from(lower);
    var D = digits ? Array.from(digits) : null;
    for (var i = 0; i < 26; i += 1) {
      map[String.fromCharCode(65 + i)] = U[i] || String.fromCharCode(65 + i);
      map[String.fromCharCode(97 + i)] = L[i] || String.fromCharCode(97 + i);
    }
    if (D) {
      for (var j = 0; j < 10; j += 1) map[String(j)] = D[j] || String(j);
    }
    return map;
  }

  function contiguous(upperStart, lowerStart, digitStart) {
    var map = {};
    var i;
    for (i = 0; i < 26; i += 1) {
      map[String.fromCharCode(65 + i)] = String.fromCodePoint(upperStart + i);
      map[String.fromCharCode(97 + i)] = String.fromCodePoint(lowerStart + i);
    }
    if (digitStart) {
      for (i = 0; i < 10; i += 1) map[String(i)] = String.fromCodePoint(digitStart + i);
    }
    return map;
  }

  function mapText(text, map) {
    return Array.from(String(text)).map(function (ch) { return map[ch] || ch; }).join('');
  }

  var bold = contiguous(0x1D400, 0x1D41A, 0x1D7CE);
  var italic = fromPairs(
    '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍',
    '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧'
  );
  // Italic lowercase uses the letterlike ℎ and dotless variations in fonts,
  // but the mathematical italic block is complete above for modern renderers.
  var boldItalic = contiguous(0x1D468, 0x1D482);
  var script = fromPairs(
    '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
    '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'
  );
  var boldScript = contiguous(0x1D4D0, 0x1D4EA);
  var fraktur = fromPairs(
    '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
    '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'
  );
  var boldFraktur = contiguous(0x1D56C, 0x1D586);
  var doubleStruck = fromPairs(
    '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ',
    '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫',
    '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡'
  );
  var sansBold = contiguous(0x1D5D4, 0x1D5EE, 0x1D7EC);
  var sansItalic = contiguous(0x1D608, 0x1D622);
  var sansBoldItalic = contiguous(0x1D63C, 0x1D656);
  var mono = contiguous(0x1D670, 0x1D68A, 0x1D7F6);

  var circled = {};
  var negativeCircled = {};
  var squared = {};
  var negativeSquared = {};
  var regional = {};
  var parenthesized = {};
  var i;
  for (i = 0; i < 26; i += 1) {
    var upper = String.fromCharCode(65 + i);
    var lower = String.fromCharCode(97 + i);
    circled[upper] = String.fromCodePoint(0x24B6 + i);
    circled[lower] = String.fromCodePoint(0x24D0 + i);
    negativeCircled[upper] = String.fromCodePoint(0x1F150 + i);
    negativeCircled[lower] = String.fromCodePoint(0x1F150 + i);
    squared[upper] = String.fromCodePoint(0x1F130 + i);
    squared[lower] = String.fromCodePoint(0x1F130 + i);
    negativeSquared[upper] = String.fromCodePoint(0x1F170 + i);
    negativeSquared[lower] = String.fromCodePoint(0x1F170 + i);
    regional[upper] = String.fromCodePoint(0x1F1E6 + i);
    regional[lower] = String.fromCodePoint(0x1F1E6 + i);
    parenthesized[lower] = String.fromCodePoint(0x249C + i);
    parenthesized[upper] = String.fromCodePoint(0x249C + i);
  }
  circled['0'] = '⓪';
  for (i = 1; i <= 9; i += 1) circled[String(i)] = String.fromCodePoint(0x2460 + i - 1);
  negativeCircled['0'] = '⓿';
  for (i = 1; i <= 9; i += 1) negativeCircled[String(i)] = String.fromCodePoint(0x2776 + i - 1);

  var fullwidth = {};
  for (i = 33; i <= 126; i += 1) {
    fullwidth[String.fromCharCode(i)] = String.fromCharCode(i + 0xFEE0);
  }
  fullwidth[' '] = ' ';

  var smallCaps = {};
  var scLower = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘQʀꜱᴛᴜᴠᴡxʏᴢ';
  var sc = Array.from(scLower);
  for (i = 0; i < 26; i += 1) {
    smallCaps[String.fromCharCode(65 + i)] = sc[i];
    smallCaps[String.fromCharCode(97 + i)] = sc[i];
  }

  var superscript = fromPairs(
    'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘQʀꜱᴛᴜᴠᴡxʏᴢ',
    'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ'
  );
  superscript['0'] = '⁰'; superscript['1'] = '¹'; superscript['2'] = '²';
  superscript['3'] = '³'; superscript['4'] = '⁴'; superscript['5'] = '⁵';
  superscript['6'] = '⁶'; superscript['7'] = '⁷'; superscript['8'] = '⁸';
  superscript['9'] = '⁹';

  var upsideMap = {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ',
    i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd',
    q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x',
    y: 'ʎ', z: 'z', '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ',
    '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '.': '˙', ',': "'",
    '!': '¡', '?': '¿', "'": ',', '"': '„', '&': '⅋', '(': ')', ')': '(',
    '[': ']', ']': '[', '{': '}', '}': '{'
  };
  function upsideDown(text) {
    return Array.from(String(text).toLowerCase()).reverse().map(function (ch) {
      return upsideMap[ch] || ch;
    }).join('');
  }

  function withCombining(text, mark) {
    return Array.from(String(text)).map(function (ch) {
      return ch === ' ' ? ch : ch + mark;
    }).join('');
  }

  function between(text, joiner) {
    return Array.from(String(text)).join(joiner);
  }

  function wrapper(template) {
    return function (name) { return template.replace(/\{name\}/g, name); };
  }

  var latinStyles = [
    { id: 'latin-bold', group: 'alphabet', nameAr: 'عريض', nameEn: 'Bold', apply: function (s) { return mapText(s, bold); } },
    { id: 'latin-italic', group: 'alphabet', nameAr: 'مائل', nameEn: 'Italic', apply: function (s) { return mapText(s, italic); } },
    { id: 'latin-bold-italic', group: 'alphabet', nameAr: 'عريض مائل', nameEn: 'Bold italic', apply: function (s) { return mapText(s, boldItalic); } },
    { id: 'latin-script', group: 'alphabet', nameAr: 'خط اليد', nameEn: 'Script', apply: function (s) { return mapText(s, script); } },
    { id: 'latin-bold-script', group: 'alphabet', nameAr: 'خط يد عريض', nameEn: 'Bold script', apply: function (s) { return mapText(s, boldScript); } },
    { id: 'latin-fraktur', group: 'alphabet', nameAr: 'قوطي', nameEn: 'Fraktur', apply: function (s) { return mapText(s, fraktur); } },
    { id: 'latin-bold-fraktur', group: 'alphabet', nameAr: 'قوطي عريض', nameEn: 'Bold fraktur', apply: function (s) { return mapText(s, boldFraktur); } },
    { id: 'latin-double', group: 'alphabet', nameAr: 'مزدوج', nameEn: 'Double-struck', apply: function (s) { return mapText(s, doubleStruck); } },
    { id: 'latin-sans-bold', group: 'alphabet', nameAr: 'عريض حديث', nameEn: 'Sans bold', apply: function (s) { return mapText(s, sansBold); } },
    { id: 'latin-sans-italic', group: 'alphabet', nameAr: 'مائل حديث', nameEn: 'Sans italic', apply: function (s) { return mapText(s, sansItalic); } },
    { id: 'latin-sans-bold-italic', group: 'alphabet', nameAr: 'حديث عريض مائل', nameEn: 'Sans bold italic', apply: function (s) { return mapText(s, sansBoldItalic); } },
    { id: 'latin-mono', group: 'alphabet', nameAr: 'أحادي المسافة', nameEn: 'Monospace', apply: function (s) { return mapText(s, mono); } },
    { id: 'latin-circled', group: 'alphabet', nameAr: 'دائري', nameEn: 'Circled', apply: function (s) { return mapText(s, circled); } },
    { id: 'latin-circled-negative', group: 'alphabet', nameAr: 'دائري معكوس', nameEn: 'Negative circled', apply: function (s) { return mapText(s, negativeCircled); } },
    { id: 'latin-squared', group: 'alphabet', nameAr: 'مربّع', nameEn: 'Squared', apply: function (s) { return mapText(s, squared); } },
    { id: 'latin-squared-negative', group: 'alphabet', nameAr: 'مربّع معكوس', nameEn: 'Negative squared', apply: function (s) { return mapText(s, negativeSquared); } },
    { id: 'latin-regional', group: 'alphabet', nameAr: 'رموز أعلام', nameEn: 'Flag letters', apply: function (s) { return mapText(s, regional); } },
    { id: 'latin-fullwidth', group: 'alphabet', nameAr: 'عرض كامل', nameEn: 'Fullwidth', apply: function (s) { return mapText(s, fullwidth); } },
    { id: 'latin-smallcaps', group: 'alphabet', nameAr: 'أحرف صغيرة', nameEn: 'Small caps', apply: function (s) { return mapText(s, smallCaps); } },
    { id: 'latin-parenthesized', group: 'alphabet', nameAr: 'بين أقواس', nameEn: 'Parenthesized', apply: function (s) { return mapText(s, parenthesized); } },
    { id: 'latin-superscript', group: 'alphabet', nameAr: 'مرتفع', nameEn: 'Superscript', apply: function (s) { return mapText(s, superscript); } },
    { id: 'latin-upside', group: 'alphabet', nameAr: 'مقلوب', nameEn: 'Upside down', apply: upsideDown },

    { id: 'latin-underline', group: 'effect', nameAr: 'تحته خط', nameEn: 'Underlined', apply: function (s) { return withCombining(s, '\u0332'); } },
    { id: 'latin-strike', group: 'effect', nameAr: 'مشطوب', nameEn: 'Struck through', apply: function (s) { return withCombining(s, '\u0336'); } },
    { id: 'latin-slash', group: 'effect', nameAr: 'مائل مشطوب', nameEn: 'Slashed', apply: function (s) { return withCombining(s, '\u0338'); } },
    { id: 'latin-dotted', group: 'effect', nameAr: 'نقاط بين الحروف', nameEn: 'Dotted between', apply: function (s) { return between(s, '·'); } },
    { id: 'latin-spaced', group: 'effect', nameAr: 'متفرّق', nameEn: 'Spaced out', apply: function (s) { return between(s, '\u2009'); } },
    { id: 'latin-sparkle-between', group: 'effect', nameAr: 'لمعات بين الحروف', nameEn: 'Sparkles between', apply: function (s) { return between(s, '✦'); } },
    { id: 'latin-star-between', group: 'effect', nameAr: 'نجوم بين الحروف', nameEn: 'Stars between', apply: function (s) { return between(s, '★'); } },

    { id: 'latin-wrap-sparkle', group: 'frame', nameAr: 'إطار لمعان', nameEn: 'Sparkle frame', apply: wrapper('✦ {name} ✦') },
    { id: 'latin-wrap-royal', group: 'frame', nameAr: 'إطار ملكي', nameEn: 'Royal frame', apply: wrapper('♛ {name} ♛') },
    { id: 'latin-wrap-ornate', group: 'frame', nameAr: 'إطار مزخرف', nameEn: 'Ornate frame', apply: wrapper('꧁༺ {name} ༻꧂') },
    { id: 'latin-wrap-bracket', group: 'frame', nameAr: 'أقواس مزخرفة', nameEn: 'Ornate brackets', apply: wrapper('【{name}】') },
    { id: 'latin-wrap-corner', group: 'frame', nameAr: 'زوايا شرقية', nameEn: 'East Asian corners', apply: wrapper('『{name}』') },
    { id: 'latin-wrap-moon', group: 'frame', nameAr: 'هلال', nameEn: 'Moon frame', apply: wrapper('☾ {name} ☽') },
    { id: 'latin-wrap-star', group: 'frame', nameAr: 'نجمة', nameEn: 'Star frame', apply: wrapper('★彡 {name} 彡★') },
    { id: 'latin-wrap-sword', group: 'frame', nameAr: 'سيوف', nameEn: 'Sword frame', apply: wrapper('⚔ {name} ⚔') },
    { id: 'latin-wrap-flower', group: 'frame', nameAr: 'وردة', nameEn: 'Flower frame', apply: wrapper('❀ {name} ❀') },
    { id: 'latin-wrap-heart', group: 'frame', nameAr: 'قلب', nameEn: 'Heart frame', apply: wrapper('♡ {name} ♡') },
    { id: 'latin-wrap-diamond', group: 'frame', nameAr: 'ماسة', nameEn: 'Diamond frame', apply: wrapper('❖ {name} ❖') },
    { id: 'latin-wrap-sun', group: 'frame', nameAr: 'شمس', nameEn: 'Sun frame', apply: wrapper('☀ {name} ☀') },
    { id: 'latin-wrap-music', group: 'frame', nameAr: 'موسيقى', nameEn: 'Music frame', apply: wrapper('♫ {name} ♫') },
    { id: 'latin-wrap-soft', group: 'frame', nameAr: 'لمعة ناعمة', nameEn: 'Soft sparkle', apply: wrapper('✧･ﾟ {name} ﾟ･✧') },
    { id: 'latin-wrap-butterfly', group: 'frame', nameAr: 'فراشة', nameEn: 'Butterfly frame', apply: wrapper('꒰ঌ {name} ໒꒱') },
    { id: 'latin-wrap-sacred', group: 'frame', nameAr: 'نقوش قديمة', nameEn: 'Ancient marks', apply: wrapper('𓆩 {name} 𓆪') },
    { id: 'latin-wrap-aesthetic', group: 'frame', nameAr: 'رمزي ناعم', nameEn: 'Aesthetic frame', apply: wrapper('୨୧ {name} ୨୧') },
    { id: 'latin-wrap-fire', group: 'frame', nameAr: 'نار', nameEn: 'Fire frame', apply: wrapper('🔥 {name} 🔥') },
    { id: 'latin-wrap-crown', group: 'frame', nameAr: 'تاج', nameEn: 'Crown frame', apply: wrapper('👑 {name} 👑') },
    { id: 'latin-wrap-hearts', group: 'frame', nameAr: 'قلوب', nameEn: 'Hearts frame', apply: wrapper('💗 {name} 💗') },
    { id: 'latin-wrap-rose', group: 'frame', nameAr: 'ورود', nameEn: 'Rose frame', apply: wrapper('🌹 {name} 🌹') },
    { id: 'latin-wrap-bolt', group: 'frame', nameAr: 'برق', nameEn: 'Lightning frame', apply: wrapper('⚡ {name} ⚡') },
    { id: 'latin-wrap-dots', group: 'frame', nameAr: 'نقاط كلاسيكية', nameEn: 'Classic dots', apply: wrapper('•´¯`•. {name} .•`¯´•') },
    { id: 'latin-wrap-wave', group: 'frame', nameAr: 'موجة', nameEn: 'Wave frame', apply: wrapper('▰ {name} ▰') },
    { id: 'latin-wrap-arrow', group: 'frame', nameAr: 'سهم', nameEn: 'Arrow frame', apply: wrapper('➤ {name} ➤') },
    { id: 'latin-wrap-starfield', group: 'frame', nameAr: 'حقل نجوم', nameEn: 'Starfield', apply: wrapper('⊹₊ ⋆ {name} ⋆ ₊⊹') },
    { id: 'latin-wrap-gothic', group: 'frame', nameAr: 'قوطي', nameEn: 'Gothic cross', apply: wrapper('✞ {name} ✞') },
    { id: 'latin-wrap-laurel', group: 'frame', nameAr: 'غار', nameEn: 'Laurel', apply: wrapper('❦ {name} ❦') },
    { id: 'latin-wrap-doubleheart', group: 'frame', nameAr: 'قلب مزدوج', nameEn: 'Double heart', apply: wrapper('ღ {name} ღ') },
    { id: 'latin-wrap-stars', group: 'frame', nameAr: 'نجوم', nameEn: 'Stars frame', apply: wrapper('✰ {name} ✰') },
    { id: 'latin-wrap-jp', group: 'frame', nameAr: 'أقواس يابانية', nameEn: 'Japanese corners', apply: wrapper('「{name}」') },
    { id: 'latin-wrap-angle', group: 'frame', nameAr: 'أقواس هندسية', nameEn: 'Geometry brackets', apply: wrapper('⟬{name}⟭') },
    { id: 'latin-wrap-rook', group: 'frame', nameAr: 'قلعة', nameEn: 'Rook frame', apply: wrapper('♜ {name} ♜') },
    { id: 'latin-wrap-clover', group: 'frame', nameAr: 'برسيم', nameEn: 'Clover frame', apply: wrapper('☘ {name} ☘') },
    { id: 'latin-wrap-burst', group: 'frame', nameAr: 'انفجار', nameEn: 'Burst frame', apply: wrapper('✺ {name} ✺') },
    { id: 'latin-wrap-arabic', group: 'frame', nameAr: 'زخرفة عربية', nameEn: 'Arabic ornament', apply: wrapper('☬ {name} ☬') },
    { id: 'latin-wrap-symbol', group: 'frame', nameAr: 'رمز ياباني', nameEn: 'Symbol frame', apply: wrapper('亗 {name} 亗') },
    { id: 'latin-wrap-softdot', group: 'frame', nameAr: 'نقطة ناعمة', nameEn: 'Soft dot', apply: wrapper('᯽ {name} ᯽') },
    { id: 'latin-wrap-papyrus', group: 'frame', nameAr: 'بردية', nameEn: 'Papyrus', apply: wrapper('𓂃 {name} 𓂃') },
    { id: 'latin-wrap-luxe', group: 'frame', nameAr: 'فخم', nameEn: 'Grand luxe', apply: wrapper('✦•┈๑⋅⋯ {name} ⋯⋅๑┈•✦') }
  ];

  function styleLabel(style, lang) {
    return lang === 'ar' ? style.nameAr : style.nameEn;
  }

  window.ZK.latinStyles = latinStyles;
  window.ZK.latinStyleLabel = styleLabel;
})();
