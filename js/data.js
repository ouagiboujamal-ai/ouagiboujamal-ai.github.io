/* ==========================================================================
   Zakhrafa — static data: categories, symbols, occasions, fonts
   ========================================================================== */
(function () {
  'use strict';

  var categories = [
    {
      slug: 'freefire',
      file: 'free-fire.html',
      icon: '🔥',
      accent: '#ff8a4c',
      nameAr: 'فري فاير',
      nameEn: 'Free Fire',
      titleAr: 'مزخرف أسماء فري فاير',
      titleEn: 'Free Fire Name Decorator',
      descAr: 'زخرفة أسماء فري فاير بالعربي والإنجليزي: رموز نارية، إطارات قوية، وأسماء جاهزة للنسخ واللصق في اللعبة.',
      descEn: 'Free Fire name decorations in Arabic and English: fiery symbols, bold frames, and copy-ready names for the lobby.',
      introAr: 'اسم داخل اللعبة يستحق أن يلمع. اختر زخرفة عربية أو إطارًا رمزيًا، وانسخه مباشرة إلى فري فاير.',
      introEn: 'Your in-game name deserves to shine. Pick an Arabic decoration or a symbol frame and copy it straight into Free Fire.',
      picks: [
        '🔥 {name} 🔥', '꧁🔥 {name} 🔥꧂', '꧁༒☬ {name} ☬༒꧂', '⚡ {name} ⚡',
        '▰ {name} ▰', '【{name}】', '『{name}』', '✧ {name} ✧',
        '꧁༺ {name} ༻꧂', '★彡 {name} 彡★', '▸ {name} ◂', '☠ {name} ☠',
        '✰ {name} ✰', '❖ {name} ❖', '『🔥{name}🔥』', 'ꕥ {name} ꕥ'
      ],
      symbolPacks: ['games', 'fire', 'stars', 'frames']
    },
    {
      slug: 'pubg',
      file: 'pubg.html',
      icon: '🎯',
      accent: '#f3b04d',
      nameAr: 'ببجي',
      nameEn: 'PUBG',
      titleAr: 'مزخرف أسماء ببجي',
      titleEn: 'PUBG Name Decorator',
      descAr: 'زخرفة أسماء ببجي موبايل: رموز تكتيكية، إطارات فاخرة، وأسماء عربية وإنجليزية جاهزة للنسخ.',
      descEn: 'PUBG Mobile name decorations: tactical symbols, premium frames, and copy-ready Arabic and English names.',
      introAr: 'استعد للمعركة باسم مميز. زخارف تحافظ على شكل الحروف، مع رموز تكتيكية تليق بأسلوبك.',
      introEn: 'Enter the lobby with a name that stands out. Decorations preserve letter shaping while adding tactical symbols.',
      picks: [
        '🎯 {name} 🎯', '꧁༒☠ {name} ☠༒꧂', '▰ {name} ▰', '【{name}】',
        '⚔ {name} ⚔', '✹ {name} ✹', '「{name}」', '꧁༺{name}༻꧂',
        '▸ {name} ◂', '❖ {name} ❖', '✧ {name} ✧', '「🎯{name}」',
        '☬ {name} ☬', '亗 {name} 亗', '『{name}』', '✰ {name} ✰'
      ],
      symbolPacks: ['games', 'frames', 'stars', 'fire']
    },
    {
      slug: 'instagram',
      file: 'instagram.html',
      icon: '✨',
      accent: '#e6a8cf',
      nameAr: 'إنستغرام',
      nameEn: 'Instagram',
      titleAr: 'زخرفة أسماء إنستغرام',
      titleEn: 'Instagram Name Decorator',
      descAr: 'زخرفة أسماء إنستغرام وبايو أنيق: قلوب، نجوم، إطارات ناعمة، وخطوط جاهزة للنسخ.',
      descEn: 'Instagram name and bio decorations: hearts, stars, soft frames, and copy-ready fonts for a beautiful profile.',
      introAr: 'اجعل اسمك في إنستغرام امتدادًا لذوقك: ناعم، أنيق، ومليء بالتفاصيل الصغيرة.',
      introEn: 'Make your Instagram name an extension of your taste: soft, elegant, and full of small details.',
      picks: [
        '✨ {name} ✨', '꒰ {name} ꒱', '⋆｡°✩ {name} ✩°｡⋆', '♡ {name} ♡',
        '୨୧ {name} ୨୧', '✧･ﾟ {name} ﾟ･✧', '❀ {name} ❀', '꒰ঌ {name} ໒꒱',
        '𓆩 {name} 𓆪', '⊹₊ ⋆ {name} ⋆ ₊⊹', '｡ﾟ•┈୨ {name} ୧┈•ﾟ｡', '✩ {name} ✩',
        '♡̷ {name} ♡̷', '๋࣭ ⭑ {name} ⭑ ๋࣭', '✿ {name} ✿', '☾ {name} ☽'
      ],
      symbolPacks: ['hearts', 'sparkles', 'flowers', 'stars']
    },
    {
      slug: 'tiktok',
      file: 'tiktok.html',
      icon: '🎵',
      accent: '#6ee7e0',
      nameAr: 'تيك توك',
      nameEn: 'TikTok',
      titleAr: 'زخرفة أسماء تيك توك',
      titleEn: 'TikTok Name Decorator',
      descAr: 'زخرفة أسماء تيك توك: موسيقى، برق، نجوم نيون، وأسماء جاهزة للنسخ بالعربي والإنجليزي.',
      descEn: 'TikTok name decorations: music, lightning, neon stars, and copy-ready names in Arabic and English.',
      introAr: 'اسمك على تيك توك هو أول إيقاع. اختر زخرفة خفيفة أو جريئة، واجعل الحروف ترقص.',
      introEn: 'Your TikTok name is the first beat. Choose a light or bold decoration and let the letters dance.',
      picks: [
        '🎵 {name} 🎵', '⚡ {name} ⚡', '♬ {name} ♬', '✧ {name} ✧',
        '♪ {name} ♪', '꧁ {name} ꧂', '✩ {name} ✩', '☾ {name} ☽',
        '⊹ {name} ⊹', '彡 {name} 彡', '♫ {name} ♫', '✹ {name} ✹',
        '「{name}」', 'ꕤ {name} ꕤ', '✦ {name} ✦', '⋆ {name} ⋆'
      ],
      symbolPacks: ['sparkles', 'music', 'stars', 'fire']
    },
    {
      slug: 'whatsapp',
      file: 'whatsapp.html',
      icon: '💬',
      accent: '#65d49a',
      nameAr: 'واتساب',
      nameEn: 'WhatsApp',
      titleAr: 'زخرفة أسماء واتساب',
      titleEn: 'WhatsApp Name Decorator',
      descAr: 'زخرفة اسم واتساب وحالات أنيقة: قلوب، ورود، إطارات محادثة، ونصوص جاهزة للنسخ.',
      descEn: 'WhatsApp name and status decorations: hearts, flowers, chat frames, and copy-ready text.',
      introAr: 'اسمك في واتساب قد يكون أول ما يقرأه من تحب. أضف لمسة دافئة أو إطارًا أنيقًا.',
      introEn: 'Your WhatsApp name may be the first thing someone you love reads. Add a warm touch or an elegant frame.',
      picks: [
        '💬 {name} 💬', '💚 {name} 💚', '♡ {name} ♡', '✿ {name} ✿',
        '❀ {name} ❀', '꧁ {name} ꧂', '✦ {name} ✦', '☘ {name} ☘',
        '☾ {name} ☽', '⊹ {name} ⊹', '❤ {name} ❤', '✧ {name} ✧',
        'ꕥ {name} ꕥ', '「{name}」', '๑ {name} ๑', '♬ {name} ♬'
      ],
      symbolPacks: ['hearts', 'flowers', 'nature', 'frames']
    },
    {
      slug: 'girls',
      file: 'girls.html',
      icon: '🦋',
      accent: '#f0b6cf',
      nameAr: 'بنات',
      nameEn: 'Girls',
      titleAr: 'زخرفة أسماء بنات',
      titleEn: 'Girls Name Decorator',
      descAr: 'زخرفة أسماء بنات رقيقة: فراشات، قلوب، ورود، شرائط، وخطوط ناعمة جاهزة للنسخ.',
      descEn: 'Delicate girls name decorations: butterflies, hearts, flowers, bows, and soft copy-ready fonts.',
      introAr: 'رقيقة، ملكية، أو مليئة بالفراشات. مجموعة زخارف بناتية بلمسة هادئة وأنيقة.',
      introEn: 'Delicate, royal, or full of butterflies. A girls’ collection with a soft and elegant touch.',
      picks: [
        '🦋 {name} 🦋', '🧸 {name} 🧸', '🌸 {name} 🌸', '🎀 {name} 🎀',
        '💗 {name} 💗', '🩷 {name} 🩷', '꒰ঌ {name} ໒꒱', '୨୧ {name} ୨୧',
        '✿ {name} ✿', '♡ {name} ♡', '❀ {name} ❀', '₊˚⊹ {name} ⊹˚₊',
        '🧚‍♀️ {name} 🧚‍♀️', '🌷 {name} 🌷', '｡ﾟ•┈୨ {name} ୧┈•ﾟ｡', '𓆩♡𓆪 {name}'
      ],
      symbolPacks: ['hearts', 'flowers', 'butterflies', 'bows']
    },
    {
      slug: 'boys',
      file: 'boys.html',
      icon: '👑',
      accent: '#e8c66a',
      nameAr: 'أولاد',
      nameEn: 'Boys',
      titleAr: 'زخرفة أسماء أولاد',
      titleEn: 'Boys Name Decorator',
      descAr: 'زخرفة أسماء أولاد: تيجان، برق، نار، كرات قدم، وإطارات قوية جاهزة للنسخ.',
      descEn: 'Boys name decorations: crowns, lightning, fire, football, and bold copy-ready frames.',
      introAr: 'حضور قوي بلا مبالغة. تيجان، برق، وإطارات هندسية لاسم يترك أثرًا.',
      introEn: 'Strong presence without the noise. Crowns, lightning, and geometric frames for a name that lands.',
      picks: [
        '👑 {name} 👑', '⚡ {name} ⚡', '🔥 {name} 🔥', '⚽ {name} ⚽',
        '꧁༒ {name} ༒꧂', '⚔ {name} ⚔', '★ {name} ★', '✹ {name} ✹',
        '▰ {name} ▰', '『{name}』', '☆ {name} ☆', '亗 {name} 亗',
        '🦅 {name} 🦅', '☬ {name} ☬', '✰ {name} ✰', '꧁ {name} ꧂'
      ],
      symbolPacks: ['crowns', 'fire', 'games', 'stars']
    },
    {
      slug: 'symbols',
      file: 'symbols.html',
      icon: '✦',
      accent: '#d4af37',
      nameAr: 'رموز وإيموجي',
      nameEn: 'Symbols & Emoji',
      titleAr: 'رموز وإيموجي جاهزة للنسخ',
      titleEn: 'Copy-Ready Symbols & Emoji',
      descAr: 'مجموعة رموز وإيموجي جاهزة للنسخ: قلوب، نجوم، تيجان، أسهم، ورود، إطارات، وعلامات أنيقة.',
      descEn: 'A curated library of copy-ready symbols and emoji: hearts, stars, crowns, arrows, flowers, frames, and elegant marks.',
      introAr: 'مكتبة صغيرة بعناية كبيرة. اضغط على الرمز لتنسخه، أو ضعه حول اسمك بإطار جاهز.',
      introEn: 'A small library with great care. Tap a symbol to copy it, or wrap your name in a ready-made frame.',
      picks: [
        '✦ {name} ✦', '♛ {name} ♛', '꧁༺ {name} ༻꧂', '『{name}』',
        '【{name}】', '✧ {name} ✧', '⋆ {name} ⋆', '♡ {name} ♡',
        '❖ {name} ❖', '✹ {name} ✹', '☬ {name} ☬', '亗 {name} 亗',
        'ꕥ {name} ꕥ', '⭑ {name} ⭑', '☾ {name} ☽', '𓆩 {name} 𓆪'
      ],
      symbolPacks: ['hearts', 'stars', 'crowns', 'arrows', 'flowers', 'sparkles', 'frames', 'aesthetic', 'islamic', 'music', 'games', 'nature', 'bows', 'butterflies', 'fire', 'celebration']
    }
  ];

  var symbols = {
    hearts: {
      ar: 'قلوب', en: 'Hearts',
      items: ['❤️', '🩷', '🧡', '💛', '💚', '🩵', '💙', '💜', '🤍', '🖤', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '♡', '♥', '❤︎', '❥', '❦', 'ღ', 'ღ(¯`◕‿◕´¯)ღ', '♡̷', 'ᥫ᭡']
    },
    stars: {
      ar: 'نجوم', en: 'Stars',
      items: ['★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '⋆', '⭑', '⭒', '🌟', '⭐', '💫', '🌠', '彡', '⋆｡°✩', '⊹₊ ⋆', '⭒', '☾', '☽', '✵', '✶', '✷', '✸', '✹']
    },
    crowns: {
      ar: 'تيجان', en: 'Crowns',
      items: ['👑', '♛', '♕', '♔', '♚', '♜', '⚜️', '🏆', '🥇', '👸', '🤴', '꧁', '꧂', '♔♛♔', '✦♛✦', '꧁♛꧂', '♕༒♕', '⚜', '🎖️', '🏅']
    },
    arrows: {
      ar: 'أسهم', en: 'Arrows',
      items: ['→', '←', '↑', '↓', '↔', '↕', '⇒', '⇐', '⇑', '⇓', '➤', '➜', '➝', '➞', '➟', '➠', '➢', '➣', '➤', '▶', '◀', '▲', '▼', '▸', '◂', '➔', '➩', '➪', '⇝', '↝']
    },
    flowers: {
      ar: 'ورود', en: 'Flowers',
      items: ['🌹', '🌷', '🌺', '🌸', '💐', '🌼', '🌻', '🪷', '🏵️', '❀', '✿', '❃', '✾', '❁', '✽', 'ꕥ', '꽃', '❋', '⚘', '🪻', '🌿', '🍃', '☘️', '🍀']
    },
    sparkles: {
      ar: 'لمعان', en: 'Sparkles',
      items: ['✨', '💫', '🌟', '⭐', '✧', '✦', '⋆', '˚', '₊', '⊹', '✩', '❇️', '🔆', '💥', '⚡', '☄️', '🪩', '✺', '✹', '❈', '❉', '✼', '⊹₊ ⋆', '⋆｡°✩']
    },
    frames: {
      ar: 'إطارات', en: 'Frames',
      items: ['꧁꧂', '꧁༺ ༻꧂', '༺༻', '『』', '【】', '「」', '⟬⟭', '⟮⟯', '❰❱', '❮❯', '⌜⌟', '⌞⌝', '⎛⎞', '⎝⎠', '〔〕', '〖〗', '⦅⦆', '⟨⟩', '≪≫', '⧼⧽', '╰╯', '╭╮', '┈┈', '▰▰', '▸◂', '✧✦']
    },
    aesthetic: {
      ar: 'رمزي', en: 'Aesthetic',
      items: ['꒰꒱', '୨୧', '𓆩𓆪', '꒰ঌ໒꒱', '⋆｡°✩', '⊹₊ ⋆', '｡ﾟ•┈୨୧┈•ﾟ｡', '┊', '❀', '♡̷', '๋࣭ ⭑', 'ᥫ᭡', '☾', '☽', '𓂃', '𓏲', '᯽', 'ᨒ', '𖹭', 'ᝰ', '៹', '٭', 'ৎ', 'ꕤ', 'ꕥ', 'ᰔ', '໒꒱', 'ঌ']
    },
    islamic: {
      ar: 'إسلامي', en: 'Islamic',
      items: ['☪️', '🕌', '🕋', '🌙', '⭐', '📿', '🤲', '﷽', 'ﷺ', '۞', '۩', '☬', '❁', '✦', '✧', '༺', '༻', '꧁', '꧂', '﴾', '﴿', '٭', '؎', '؁', '؎']
    },
    music: {
      ar: 'موسيقى', en: 'Music',
      items: ['🎵', '🎶', '♫', '♬', '♪', '♩', '🎧', '🎤', '🎹', '🎸', '🥁', '🎷', '🎺', '📻', '🎼', '♭', '♯', '𝄞', '𝄢', '♮']
    },
    games: {
      ar: 'ألعاب', en: 'Games',
      items: ['🎮', '🕹️', '🎯', '🏆', '🥇', '⚔️', '🛡️', '🎲', '♟️', '🎰', '🎳', '🏹', '💥', '⚡', '🔥', '☠️', '☬', '亗', '▰', '◈', '❖', '✹']
    },
    nature: {
      ar: 'طبيعة', en: 'Nature',
      items: ['🌿', '🍃', '☘️', '🍀', '🌱', '🌾', '🌵', '🌴', '🌳', '🍂', '🍁', '🪴', '🪷', '🌊', '🌙', '☀️', '🌤️', '🌈', '❄️', '🪶']
    },
    bows: {
      ar: 'شرائط', en: 'Bows',
      items: ['🎀', '🩰', '👛', '🪞', '💄', '👠', '🧸', '🪄', '💌', '🌷', '🦢', '🫧', '🪞', '🎀', '♡', '୨୧']
    },
    butterflies: {
      ar: 'فراشات', en: 'Butterflies',
      items: ['🦋', '🦋', '🪻', '🧚‍♀️', '🧚', '🌷', '🌸', '🫧', '✨', '💫', '🪞', '🦢', '🎀', '♡', '𓆩', '𓆪']
    },
    fire: {
      ar: 'نار', en: 'Fire',
      items: ['🔥', '⚡', '💥', '☄️', '🌋', '🧨', '✨', '⚔️', '☠️', '✹', '亗', '☬', '🖤', '★', '✧', '▰']
    },
    celebration: {
      ar: 'احتفال', en: 'Celebration',
      items: ['🎉', '🎊', '🥳', '🎂', '🎁', '🎈', '🍾', '🥂', '✨', '🌟', '💫', '🎓', '💍', '👶', '🌙', '🕌']
    }
  };

  var occasions = [
    {
      slug: 'eid-fitr', icon: '🌙', motif: '🌙', accent: '#d4af37', deep: '#07110d',
      nameAr: 'عيد الفطر', nameEn: 'Eid al-Fitr',
      greetingAr: 'عيد فطر مبارك، أعاده الله عليكم باليُمن والبركات.',
      greetingEn: 'Eid Mubarak — may your days be filled with joy and blessings.'
    },
    {
      slug: 'eid-adha', icon: '🕌', motif: '🕌', accent: '#d6b56c', deep: '#100a07',
      nameAr: 'عيد الأضحى', nameEn: 'Eid al-Adha',
      greetingAr: 'عيد أضحى مبارك، تقبّل الله منا ومنكم صالح الأعمال.',
      greetingEn: 'Blessed Eid al-Adha — may your good deeds be accepted.'
    },
    {
      slug: 'ramadan', icon: '🌙', motif: '🌙', accent: '#f0d38a', deep: '#070b16',
      nameAr: 'رمضان', nameEn: 'Ramadan',
      greetingAr: 'رمضان كريم، جعله الله شهر خير وبركة وسكينة.',
      greetingEn: 'Ramadan Kareem — may it bring peace, light, and blessings.'
    },
    {
      slug: 'birthday', icon: '🎂', motif: '🎂', accent: '#f2c56b', deep: '#110a14',
      nameAr: 'عيد ميلاد', nameEn: 'Birthday',
      greetingAr: 'كل عام وأنت بخير، عساك من عوّاده.',
      greetingEn: 'Happy birthday — may this year bring you all the good things.'
    },
    {
      slug: 'wedding', icon: '💍', motif: '💍', accent: '#e8c58a', deep: '#120b10',
      nameAr: 'زفاف', nameEn: 'Wedding',
      greetingAr: 'بارك الله لهما وبارك عليهما وجمع بينهما في خير.',
      greetingEn: 'May your life together be full of love, laughter, and light.'
    },
    {
      slug: 'graduation', icon: '🎓', motif: '🎓', accent: '#e9ca75', deep: '#0a1014',
      nameAr: 'تخرّج ونجاح', nameEn: 'Graduation & Success',
      greetingAr: 'ألف مبروك التخرّج، وبالتوفيق في كل خطواتك القادمة.',
      greetingEn: 'Congratulations, graduate — here’s to every bright thing ahead.'
    },
    {
      slug: 'newborn', icon: '🍼', motif: '🍼', accent: '#e6c78f', deep: '#0c1013',
      nameAr: 'مولود جديد', nameEn: 'New Baby',
      greetingAr: 'مبارك المولود الجديد، جعله الله من الصالحين.',
      greetingEn: 'Welcome, little one — may your life be wrapped in love.'
    },
    {
      slug: 'getwell', icon: '🌷', motif: '🌷', accent: '#e5c46f', deep: '#0b1110',
      nameAr: 'شفاء', nameEn: 'Get Well',
      greetingAr: 'شفاك الله وعافاك، وعادت إليك الصحة والعافية.',
      greetingEn: 'Wishing you comfort and a gentle, speedy recovery.'
    },
    {
      slug: 'mothersday', icon: '🌸', motif: '🌸', accent: '#e8be83', deep: '#120b0c',
      nameAr: 'عيد الأم', nameEn: 'Mother’s Day',
      greetingAr: 'إلى أمي الغالية، كل عام وأنتِ نبض القلب وجنة الحياة.',
      greetingEn: 'To my mother — the heartbeat of home and the softest kind of love.'
    },
    {
      slug: 'hijri', icon: '🌙', motif: '🌙', accent: '#efd694', deep: '#080d14',
      nameAr: 'السنة الهجرية', nameEn: 'Hijri New Year',
      greetingAr: 'كل عام وأنتم بخير بمناسبة العام الهجري الجديد.',
      greetingEn: 'Wishing you a peaceful and blessed Hijri New Year.'
    }
  ];

  var fonts = [
    { value: 'Cairo', labelAr: 'القاهرة', labelEn: 'Cairo', stack: '"Cairo", sans-serif', sample: 'زخرفة' },
    { value: 'Amiri', labelAr: 'أميري', labelEn: 'Amiri', stack: '"Amiri", serif', sample: 'زخرفة' },
    { value: 'Reem Kufi', labelAr: 'ريم كوفي', labelEn: 'Reem Kufi', stack: '"Reem Kufi", sans-serif', sample: 'زخرفة' },
    { value: 'Tajawal', labelAr: 'تجوال', labelEn: 'Tajawal', stack: '"Tajawal", sans-serif', sample: 'زخرفة' }
  ];

  var textColors = ['#f5e6b8', '#ffffff', '#f3c6d4', '#c9e8d8', '#bfd8ff', '#e6c37a', '#1b1b20'];

  function getCategory(slug) {
    for (var i = 0; i < categories.length; i += 1) {
      if (categories[i].slug === slug) return categories[i];
    }
    return null;
  }

  function getOccasion(slug) {
    for (var i = 0; i < occasions.length; i += 1) {
      if (occasions[i].slug === slug) return occasions[i];
    }
    return occasions[3];
  }

  function sampleName(lang) {
    return lang === 'ar' ? 'اسمك' : 'Your Name';
  }

  window.ZK.data = {
    categories: categories,
    symbols: symbols,
    occasions: occasions,
    fonts: fonts,
    textColors: textColors,
    getCategory: getCategory,
    getOccasion: getOccasion,
    sampleName: sampleName
  };
})();
