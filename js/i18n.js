/* ==========================================================================
   Zakhrafa — tiny bilingual dictionary + translation helpers
   Arabic is the default. No build step, no dependencies.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.ZK.config;
  var PREFIX = CFG.storagePrefix;

  var dict = {
    ar: {
      'nav.skip': 'تجاوز إلى المحتوى',
      'nav.home': 'الرئيسية',
      'nav.categories': 'الأقسام',
      'nav.cards': 'بطاقات المعايدة',
      'nav.collection': 'مجموعتي',
      'nav.about': 'عن الموقع',
      'nav.contact': 'تواصل',
      'nav.privacy': 'الخصوصية',
      'nav.menu': 'القائمة',
      'nav.close': 'إغلاق',
      'nav.language': 'تغيير اللغة',
      'nav.theme': 'تغيير المظهر',
      'nav.signIn': 'تسجيل الدخول',
      'nav.account': 'حسابي',
      'nav.signOut': 'تسجيل الخروج',
      'nav.myCollection': 'مجموعتي',
      'nav.profileNote': 'بياناتك المحفوظة تبقى في هذا المتصفح.',
      'nav.menuAria': 'فتح قائمة التنقل',
      'nav.homeAria': 'زخرفة — الصفحة الرئيسية',
      'nav.langShort': 'EN',
      'nav.langAria': 'التبديل إلى الإنجليزية',
      'nav.themeToLight': 'تفعيل المظهر الفاتح',
      'nav.themeToDark': 'تفعيل المظهر الداكن',

      'common.copy': 'نسخ',
      'common.copied': 'تم النسخ',
      'common.save': 'حفظ',
      'common.saved': 'محفوظ',
      'common.remove': 'إزالة',
      'common.clear': 'مسح',
      'common.cancel': 'إلغاء',
      'common.download': 'تنزيل',
      'common.share': 'مشاركة',
      'common.copyLink': 'نسخ الرابط',
      'common.loading': 'جارٍ التحميل…',
      'common.optional': 'اختياري',
      'common.preview': 'معاينة',
      'common.sample': 'نموذج',
      'common.error': 'حدث خطأ، حاول مرة أخرى.',
      'common.viewAll': 'عرض الكل',
      'common.emailCopied': 'تم نسخ البريد الإلكتروني.',
      'common.retry': 'إعادة المحاولة',
      'common.clearHistory': 'مسح السجل',
      'common.confirm': 'تأكيد',

      'footer.explore': 'استكشف',
      'footer.legal': 'المعلومات',
      'footer.categories': 'أقسام الزخرفة',
      'footer.localNote': 'يُحفظ ما تختاره داخل متصفحك فقط. لا نخزّن شيئًا على خادم.',
      'footer.rights': 'جميع الحقوق محفوظة.',
      'footer.made': 'صُنع بعناية للعربية والإنجليزية.',

      'home.eyebrow': 'استوديو الأسماء',
      'home.title1': 'اسمك،',
      'home.title2': 'بلمسة ذهبية.',
      'home.subtitle': 'اكتب اسمك واحصل على أكثر من ٦٠ زخرفة عربية و٦٠ نمطًا لاتينيًا جاهزًا للنسخ — في لحظة، وبدون تسجيل.',
      'home.inputLabel': 'اكتب الاسم الذي تريد زخرفته',
      'home.placeholder': 'مثال: ليان، محمد، Sara…',
      'home.clearAria': 'مسح الاسم',
      'home.latinStyles': 'نمط لاتيني',
      'home.arabicStyles': 'زخرفة عربية',
      'home.templates': 'قالب بطاقة',
      'home.instant': 'نتائج فورية',
      'home.categoriesTitle': 'زخرفة لكل منصّة',
      'home.categoriesLead': 'قوالب وأشكال مختارة بعناية لكل مكان تكتب فيه اسمك.',
      'home.howTitle': 'ثلاث لحظات فقط',
      'home.howLead': 'من الاسم إلى لمسة شخصية جاهزة للمشاركة.',
      'home.step1': 'اكتب الاسم',
      'home.step1d': 'عربي أو إنجليزي، والنتائج تتغيّر مع كل حرف.',
      'home.step2': 'اختر ذوقك',
      'home.step2d': 'زخارف رقيقة، جريئة، رومانسية أو مليئة بالرموز.',
      'home.step3': 'انسخ وشارك',
      'home.step3d': 'لمسة واحدة تنسخ النص، أو أنشئ بطاقة معايدة كاملة.',
      'home.cardTitle': 'بطاقة تُشبهك',
      'home.cardLead': 'قوالب معايدة فاخرة بخطوط عربية أصيلة، جاهزة للتنزيل والمشاركة.',
      'home.cardCta': 'افتح استوديو البطاقات',
      'home.resultTitle': 'زخرفتك',
      'home.resultLead': 'اختر ما يعجبك، وستجد النتائج تتحدّث أثناء الكتابة.',
      'home.demoNote': 'هذه معاينة بالاسم النموذجي. اكتب اسمك أعلاه لتبدأ.',
      'home.seoTitle': 'زخرفة أسماء عربية وإنجليزية',
      'home.seoP1': 'زخرفة استوديو عربي أولًا يجمع بين جمال الحرف العربي والرموز الحديثة. صُمّمت الزخارف العربية للحفاظ على اتصال الحروف وشكلها الصحيح، بينما توفّر الأنماط اللاتينية خيارات أنيقة من الحروف المزخرفة والخطوط الرياضية والأطر الرمزية.',
      'home.seoP2': 'انسخ الاسم المزخرف بلمسة واحدة لاستخدامه في إنستغرام، تيك توك، واتساب، فري فاير، ببجي أو أي مكان آخر. وإن أردت هدية أرقى، جرّب مولّد بطاقات المعايدة وقوالب العيد والمناسبات.',
      'home.resultCount': '{n} خيارًا جاهزًا',

      'decorate.categoryPicks': 'اختيارات القسم',
      'decorate.categoryPicksLead': 'لمسات مصمّمة خصيصًا لهذا القسم.',
      'decorate.symbolsTitle': 'رموز وإيموجي جاهزة',
      'decorate.symbolsLead': 'اضغط على أي رمز لنسخه فورًا.',
      'decorate.allStyles': 'كل الأنماط',
      'decorate.allStylesLead': 'جرّب المجموعة الكاملة — تظهر الأنماط المناسبة للغة اسمك أولًا.',
      'decorate.copyAria': 'نسخ {style}',
      'decorate.favoriteAria': 'حفظ {style} في المفضلة',
      'decorate.copied': 'تم نسخ الزخرفة إلى الحافظة.',
      'decorate.favorited': 'أُضيفت الزخرفة إلى مجموعتك.',
      'decorate.historySaved': 'أُضيفت إلى سجلّك في هذا المتصفح.',
      'decorate.arabicDetected': 'زخارف عربية',
      'decorate.latinDetected': 'أنماط لاتينية',
      'decorate.showMore': 'عرض المزيد',
      'decorate.showAll': 'عرض كل الأنماط',
      'decorate.moreNote': 'المزيد من الأنماط الرمزية والخطوط المزخرفة.',

      'cat.eyebrow': 'قسم الزخرفة',
      'cat.studioTitle': 'اكتب الاسم واختر زخرفتك',
      'cat.studioLead': 'نتائج فورية، ونسخ بلمسة واحدة.',
      'cat.breadcrumb': 'الرئيسية',
      'cat.allCategories': 'كل الأقسام',
      'cat.seoTitle': 'زخرفة الأسماء',
      'cat.seoP1': 'اختر زخرفة تناسب شخصيتك ومكان استخدامك. جميع النصوص التي تظهر هنا نصية قابلة للنسخ، ويمكن لصقها مباشرة في المنصات التي تدعم Unicode.',
      'cat.seoP2': 'تذكّر أن بعض التطبيقات قد تعرض بعض الرموز بطريقة مختلفة حسب الخط أو نظام التشغيل. جرّب أكثر من خيار واختر الأنسب لك.',

      'cards.eyebrow': 'استوديو البطاقات',
      'cards.title': 'بطاقة معايدة بلمسة ذهبية',
      'cards.lead': 'اسمك، تهنئتك، وقالب فاخر — ثم مشاركة أو تنزيل بدقة عالية. كل شيء يُرسم داخل متصفحك.',
      'cards.preview': 'معاينة حيّة',
      'cards.settings': 'تفاصيل البطاقة',
      'cards.occasion': 'المناسبة',
      'cards.name': 'الاسم أو الأسماء',
      'cards.namePlaceholder': 'مثال: محمد وسارة',
      'cards.greeting': 'نص التهنئة',
      'cards.greetingPlaceholder': 'اكتب تهنئة من القلب…',
      'cards.font': 'الخط',
      'cards.textColor': 'لون النص',
      'cards.customColor': 'لون مخصص',
      'cards.template': 'القالب',
      'cards.size': 'المقاس',
      'cards.square': 'مربّع',
      'cards.squareHint': '١٠٨٠ × ١٠٨٠',
      'cards.story': 'ستوري',
      'cards.storyHint': '١٠٨٠ × ١٩٢٠',
      'cards.download': 'تنزيل PNG',
      'cards.share': 'مشاركة',
      'cards.copyLink': 'نسخ الرابط',
      'cards.save': 'حفظ البطاقة',
      'cards.saveNote': 'تُحفظ إعدادات البطاقة فقط، وليس الصورة. يمكنك العودة إليها وتعديلها لاحقًا.',
      'cards.watermarkNote': 'تظهر علامة الموقع الصغيرة أسفل كل بطاقة.',
      'cards.shareTitle': 'بطاقة من زخرفة',
      'cards.imageName': 'zakhrafa-card.png',
      'cards.copyLinkSuccess': 'تم نسخ رابط البطاقة. افتحه على أي جهاز لاستعادة التصميم.',
      'cards.downloadSuccess': 'تم تنزيل البطاقة.',
      'cards.saveSuccess': 'حُفظت البطاقة في مجموعتك.',
      'cards.shareCancelled': 'أُلغيت المشاركة.',
      'cards.shareError': 'تعذّرت المشاركة المباشرة.',
      'cards.shareSuccess': 'تمت مشاركة البطاقة.',
      'cards.fallbackNote': 'تم تنزيل الصورة. يمكنك أيضًا مشاركتها عبر واتساب:',
      'cards.whatsapp': 'فتح واتساب',
      'cards.nativeNote': 'تستخدم المشاركة واجهة جهازك عند دعمها، وإلا تُنزّل الصورة.',
      'cards.live': 'تُحدَّث المعاينة تلقائيًا.',
      'cards.howTitle': 'بطاقة تليق باللحظة',
      'cards.howLead': 'عشر مناسبات، أربعة قوالب فاخرة لكل مناسبة، وخطوط عربية مختارة.',
      'cards.how1': 'اختر المناسبة والقالب',
      'cards.how1d': 'من العيد والرمضان إلى التخرّج والمولود الجديد.',
      'cards.how2': 'اكتب من القلب',
      'cards.how2d': 'غيّر الاسم والتهنئة والخط واللون حتى تشعر أنها لك.',
      'cards.how3': 'شارك بالجودة الأصلية',
      'cards.how3d': 'تنزيل PNG بدقة ١٠٨٠ بكسل أو مشاركة مباشرة من جهازك.',
      'cards.privacyNote': 'لا تُرفع صورك أو نصوصك إلى أي خادم. كل شيء يُرسم ويُحفظ محليًا.',
      'cards.templateChanged': 'تم تغيير القالب.',
      'cards.shareUnavailable': 'المشاركة المباشرة غير مدعومة في هذا المتصفح. نزّل الصورة أو استخدم رابط واتساب.',

      'collection.eyebrow': 'مساحتك الخاصة',
      'collection.title': 'مجموعتي',
      'collection.lead': 'كل ما حفظته، في مكان واحد — مع نسخ احتياطي ينقل ذوقك بين الأجهزة.',
      'collection.localNote': 'تبقى بياناتك في متصفح هذا الجهاز. لا يوجد خادم ولا مزامنة سحابية. صدّر نسخة احتياطية إذا أردت نقلها.',
      'collection.scopeGuest': 'أنت تحفظ كزائر',
      'collection.scopeUser': 'تحفظ باسم {name}',
      'collection.favorites': 'المفضلة',
      'collection.history': 'السجل',
      'collection.decorations': 'الزخارف',
      'collection.cards': 'البطاقات',
      'collection.emptyFavorites': 'لا توجد عناصر محفوظة بعد. ابدأ من استوديو الزخرفة أو البطاقات.',
      'collection.emptyHistory': 'سجلّك فارغ. ستظهر هنا آخر الزخارف والبطاقات التي نسختها أو نزّلتها.',
      'collection.clearHistory': 'مسح السجل',
      'collection.confirmClear': 'هل تريد مسح سجل هذا القسم؟ لن تُحذف المفضلة.',
      'collection.export': 'تصدير نسخة احتياطية',
      'collection.import': 'استيراد نسخة احتياطية',
      'collection.importNote': 'ملفات JSON فقط. يتم التحقق من الملف ودمج العناصر دون حذف ما لديك.',
      'collection.backupTitle': 'انقل مجموعتك',
      'collection.backupDesc': 'صدّر ملفًا واحدًا يحتوي على المفضلة والسجل، ثم استورده على جهاز آخر. الاستيراد يدمج العناصر ولا يستبدل مجموعتك الحالية.',
      'collection.importSuccess': 'تم استيراد {n} عنصرًا جديدًا.',
      'collection.importInvalid': 'الملف غير صالح. تأكد أنه ملف نسخة احتياطية من زخرفة.',
      'collection.importError': 'تعذّر قراءة الملف. جرّب ملف JSON صالحًا.',
      'collection.savedAt': 'حُفظ {date}',
      'collection.openCard': 'فتح البطاقة',
      'collection.openDeco': 'تعديل الاسم',
      'collection.removeAria': 'إزالة {name}',
      'collection.copyAria': 'نسخ {name}',
      'collection.guestTitle': 'احفظ باسمك',
      'collection.guestDesc': 'سجّل الدخول بحساب Google لتفصل مجموعتك عن ضيوف هذا المتصفح. ما حفظته كزائر سيُدمج تلقائيًا في حسابك عند أول تسجيل دخول.',
      'collection.statsFavorites': 'محفوظات',
      'collection.statsDecor': 'زخارف',
      'collection.statsCards': 'بطاقات',
      'collection.statsHistory': 'في السجل',
      'collection.noItems': 'لا شيء هنا بعد.',
      'collection.savedInBrowser': 'محفوظ محليًا',
      'collection.openHint': 'اضغط لاستعادة الإعدادات في استوديو البطاقات.',
      'collection.restoreTitle': 'استعادة',
      'collection.removeSuccess': 'تمت الإزالة من مجموعتك.',
      'collection.historyCleared': 'تم مسح السجل.',
      'collection.exportSuccess': 'تم تجهيز النسخة الاحتياطية.',

      'auth.loading': 'جارٍ تحميل تسجيل Google…',
      'auth.unavailable': 'تعذّر تحميل تسجيل الدخول من Google. يمكنك المتابعة كزائر.',
      'auth.welcome': 'مرحبًا، {name}',
      'auth.signedOut': 'تم تسجيل الخروج. بياناتك المحفوظة ما زالت في هذا المتصفح.',
      'auth.merged': 'تم دمج {n} عنصرًا من مجموعتك كزائر.',
      'auth.note': 'الحساب للتنظيم فقط. لا تُرسل بياناتك إلى أي خادم.',
      'auth.googleAria': 'تسجيل الدخول باستخدام Google',
      'auth.profileAria': 'فتح قائمة الحساب',

      'about.eyebrow': 'حكايتنا',
      'about.title': 'جمال الحرف، بلا تعقيد.',
      'about.lead': 'زخرفة استوديو صغير لكنه يعتني بالتفاصيل: أسماء عربية تُكتب باحترام لقواعد الاتصال، وقوالب بطاقات تُصنع لتُشبهك.',
      'about.p1': 'بدأت الفكرة من سؤال بسيط: لماذا تبدو الزخارف العربية غالبًا جميلة في الشكل لكنها مكسورة في الاتصال؟ بنينا مجموعة زخارف تحافظ على شكل الحرف العربي، وتضيف الرموز والإطارات حول الاسم بدلًا من العبث بحروفه.',
      'about.p2': 'في استوديو البطاقات، نرسم كل قالب داخل المتصفح باستخدام التدرجات والأشكال والخطوط. لا صور خارجية، ولا مشاكل حقوق، وكل بطاقة تُولد من إعداداتك أنت.',
      'about.p3': 'نؤمن بالخصوصية الهادئة: لا حساب إجباري، لا خادم للبيانات، ولا رفع لصورك. تسجيل Google اختياري فقط لتنظيم مجموعتك داخل هذا المتصفح.',
      'about.p4': 'هذا الموقع ثابت بالكامل — HTML وCSS وJavaScript فقط — سريع، خفيف، ويعمل دون بناء أو تعقيد.',
      'about.valuesTitle': 'ما نعتني به',
      'about.value1': 'العربية أولًا',
      'about.value1d': 'اتجاه صحيح، خطوط عربية أصيلة، وواجهة تُقرأ من اليمين إلى اليسار كما ينبغي.',
      'about.value2': 'تفاصيل فاخرة',
      'about.value2d': 'ذهبي هادئ، مساحات مريحة، وحركة صغيرة لا تسرق الانتباه.',
      'about.value3': 'خصوصية محلية',
      'about.value3d': 'إعداداتك تبقى في متصفحك، مع تصدير واستيراد متى شئت.',
      'about.value4': 'بلا حواجز',
      'about.value4d': 'تنقّل بلوحة المفاتيح، تباين واضح، واحترام لتقليل الحركة.',
      'about.techTitle': 'تقنية بسيطة، بعناية',
      'about.techDesc': 'بدون إطارات أو مكتبات ثقيلة. Canvas للبطاقات، Unicode للزخارف، وlocalStorage لمجموعتك.',
      'about.ctaTitle': 'جرّب اسمك الآن',
      'about.ctaDesc': 'لحظة واحدة تفصلك عن زخرفة أو بطاقة جديدة.',
      'about.cta': 'ابدأ من الرئيسية',

      'privacy.eyebrow': 'الخصوصية',
      'privacy.title': 'بياناتك، كما ينبغي أن تكون.',
      'privacy.updated': 'آخر تحديث: ٨ نوفمبر ٢٠٢٦',
      'privacy.lead': 'هذا موقع ثابت. لا نخزّن بياناتك على خادم، ولا نطلب كلمة مرور، ولا نبيع معلوماتك. تشرح هذه الصفحة ما يبقى في متصفحك.',
      'privacy.localTitle': 'ما يُحفظ في متصفحك',
      'privacy.localBody': 'عند استخدام الموقع، قد يُحفظ في localStorage: اللغة المختارة، المظهر، مجموعتك من الزخارف والبطاقات (كإعدادات JSON)، وسجلّ الاستخدام. يبقى هذا كله على جهازك، ويمكنك حذفه من المتصفح أو من صفحة مجموعتي.',
      'privacy.googleTitle': 'تسجيل الدخول من Google',
      'privacy.googleBody': 'تسجيل الدخول اختياري. عند اختياره، يعرض زر Google معلوماتك الأساسية (الاسم، البريد، الصورة، والمعرّف sub) ويُحفظ ملف تعريف مختصر في متصفحك فقط. لا نحتفظ برمز Google ولا نرسل بياناتك إلى خادم. تسجيل الخروج لا يحذف مجموعتك.',
      'privacy.adsTitle': 'الإعلانات',
      'privacy.adsBody': 'يُحمّل هذا الموقع إعلانات من Monetag عبر سكربت واحد. قد تستخدم شبكة الإعلان ملفات تعريف ارتباط أو تخزينًا محليًا خاصًا بها وفق سياساتها. لا نتحكم في هذه التقنيات ولا نجمع نحن بيانات عنها؛ يمكنك إدارة الإعلانات من إعدادات متصفحك أو إضافة حجب الإعلانات.',
      'privacy.serverTitle': 'لا خادم ولا رفع ملفات',
      'privacy.serverBody': 'تُرسم بطاقات المعايدة داخل متصفحك باستخدام Canvas. لا تُرفع الصور أو الأسماء أو نصوص التهنئة إلى أي مكان. مشاركة الصورة تتم عبر جهازك فقط.',
      'privacy.choicesTitle': 'خياراتك',
      'privacy.choicesBody': 'يمكنك حذف عناصر مجموعتك، مسح السجل، تصدير نسخة احتياطية، أو حذف بيانات الموقع من إعدادات المتصفح. يمكنك أيضًا استخدام الموقع كزائر دون تسجيل الدخول.',
      'privacy.childrenTitle': 'الأطفال',
      'privacy.childrenBody': 'الموقع غير موجّه للأطفال دون سن ١٣ عامًا، ولا نجمع بيانات شخصية عنهم عن قصد.',
      'privacy.changesTitle': 'تغييرات السياسة',
      'privacy.changesBody': 'قد نحدّث هذه الصفحة عند تغيير الميزات. يظهر تاريخ التحديث أعلى الصفحة.',
      'privacy.contactTitle': 'لديك سؤال؟',
      'privacy.contactBody': 'راسلنا، وسنوضّح أي نقطة تحتاج توضيحًا.',
      'privacy.contactCta': 'راسلنا عبر البريد',

      'contact.eyebrow': 'تواصل',
      'contact.title': 'نسمعك.',
      'contact.lead': 'سؤال، ملاحظة، أو فكرة لقسم جديد؟ البريد هو أسرع طريق إلينا. لا نماذج ولا خوادم — فقط رسالة.',
      'contact.emailLabel': 'البريد الإلكتروني',
      'contact.copyEmail': 'نسخ البريد',
      'contact.response': 'نحاول الرد خلال ٢–٣ أيام عمل.',
      'contact.noteTitle': 'قبل أن تراسلنا',
      'contact.note': 'لأفضل نتيجة، اذكر المتصفح والجهاز وإذا كانت المشكلة تتعلق بزخرفة أو بطاقة. لا ترسل كلمات مرور أو معلومات حساب حساسة.',
      'contact.privacy': 'اقرأ سياسة الخصوصية',

      '404.eyebrow': 'خطأ ٤٠٤',
      '404.title': 'هذه الصفحة تاهت بين الزخارف.',
      '404.desc': 'الرابط غير موجود أو تغيّر. لا بأس — العودة إلى الجمال على بعد نقرة.',
      '404.home': 'العودة للرئيسية',
      '404.cards': 'استوديو البطاقات'
    },

    en: {
      'nav.skip': 'Skip to content',
      'nav.home': 'Home',
      'nav.categories': 'Categories',
      'nav.cards': 'Card Studio',
      'nav.collection': 'My Collection',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.privacy': 'Privacy',
      'nav.menu': 'Menu',
      'nav.close': 'Close',
      'nav.language': 'Change language',
      'nav.theme': 'Change theme',
      'nav.signIn': 'Sign in',
      'nav.account': 'My account',
      'nav.signOut': 'Sign out',
      'nav.myCollection': 'My Collection',
      'nav.profileNote': 'Your saved data stays in this browser.',
      'nav.menuAria': 'Open navigation menu',
      'nav.homeAria': 'Zakhrafa — Home',
      'nav.langShort': 'ع',
      'nav.langAria': 'Switch to Arabic',
      'nav.themeToLight': 'Switch to light theme',
      'nav.themeToDark': 'Switch to dark theme',

      'common.copy': 'Copy',
      'common.copied': 'Copied',
      'common.save': 'Save',
      'common.saved': 'Saved',
      'common.remove': 'Remove',
      'common.clear': 'Clear',
      'common.cancel': 'Cancel',
      'common.download': 'Download',
      'common.share': 'Share',
      'common.copyLink': 'Copy link',
      'common.loading': 'Loading…',
      'common.optional': 'Optional',
      'common.preview': 'Preview',
      'common.sample': 'Sample',
      'common.error': 'Something went wrong. Please try again.',
      'common.viewAll': 'View all',
      'common.emailCopied': 'Email copied.',
      'common.retry': 'Try again',
      'common.clearHistory': 'Clear history',
      'common.confirm': 'Confirm',

      'footer.explore': 'Explore',
      'footer.legal': 'Information',
      'footer.categories': 'Decor categories',
      'footer.localNote': 'Your choices are stored only in your browser. Nothing is kept on a server.',
      'footer.rights': 'All rights reserved.',
      'footer.made': 'Crafted for Arabic and English.',

      'home.eyebrow': 'The name studio',
      'home.title1': 'Your name,',
      'home.title2': 'gilded.',
      'home.subtitle': 'Type a name and discover 60+ Arabic decorations and 60+ Latin styles, ready to copy — instantly, no sign-up.',
      'home.inputLabel': 'Enter the name you want to decorate',
      'home.placeholder': 'Try: Layla, محمد, Sara…',
      'home.clearAria': 'Clear name',
      'home.latinStyles': 'Latin styles',
      'home.arabicStyles': 'Arabic decorations',
      'home.templates': 'Card templates',
      'home.instant': 'Instant results',
      'home.categoriesTitle': 'A style for every platform',
      'home.categoriesLead': 'Curated shapes and frames for wherever you write your name.',
      'home.howTitle': 'Three small moments',
      'home.howLead': 'From a name to a personal touch ready to share.',
      'home.step1': 'Type a name',
      'home.step1d': 'Arabic or English — results update with every letter.',
      'home.step2': 'Choose your mood',
      'home.step2d': 'Delicate, bold, romantic, or full of symbols.',
      'home.step3': 'Copy and share',
      'home.step3d': 'One tap copies the text, or create a complete greeting card.',
      'home.cardTitle': 'A card that feels like you',
      'home.cardLead': 'Luxury greeting templates with proper Arabic typography, ready to download and share.',
      'home.cardCta': 'Open the Card Studio',
      'home.resultTitle': 'Your decorations',
      'home.resultLead': 'Pick what you love. Results update as you type.',
      'home.demoNote': 'This is a preview with a sample name. Type yours above to begin.',
      'home.seoTitle': 'Arabic & English name decorator',
      'home.seoP1': 'Zakhrafa is an Arabic-first name studio that pairs the beauty of Arabic letters with modern symbols. Arabic decorations are designed to preserve correct joining and shaping, while Latin styles offer elegant script, mathematical alphabets, and ornamental frames.',
      'home.seoP2': 'Copy a decorated name in one tap for Instagram, TikTok, WhatsApp, Free Fire, PUBG, or anywhere else. For a more personal gift, try the greeting card generator with Eid, Ramadan, and everyday occasion templates.',
      'home.resultCount': '{n} ready options',

      'decorate.categoryPicks': 'Category picks',
      'decorate.categoryPicksLead': 'Little details designed for this corner of the internet.',
      'decorate.symbolsTitle': 'Ready-to-copy symbols',
      'decorate.symbolsLead': 'Tap any symbol to copy it instantly.',
      'decorate.allStyles': 'All styles',
      'decorate.allStylesLead': 'Explore the full set — styles matching your name’s script appear first.',
      'decorate.copyAria': 'Copy {style}',
      'decorate.favoriteAria': 'Save {style} to favorites',
      'decorate.copied': 'Decoration copied to clipboard.',
      'decorate.favorited': 'Added to your collection.',
      'decorate.historySaved': 'Added to your history on this device.',
      'decorate.arabicDetected': 'Arabic decorations',
      'decorate.latinDetected': 'Latin styles',
      'decorate.showMore': 'Show more',
      'decorate.showAll': 'Show all styles',
      'decorate.moreNote': 'More ornamental frames and decorative alphabets.',

      'cat.eyebrow': 'Decoration category',
      'cat.studioTitle': 'Type a name, choose your style',
      'cat.studioLead': 'Instant results. One-tap copy.',
      'cat.breadcrumb': 'Home',
      'cat.allCategories': 'All categories',
      'cat.seoTitle': 'Name decorator',
      'cat.seoP1': 'Choose a decoration that fits your personality and where you will use it. Every result is plain Unicode text, ready to paste into apps that support it.',
      'cat.seoP2': 'Some apps may render certain symbols differently depending on their font or operating system. Try a few options and pick the one that looks best for you.',

      'cards.eyebrow': 'The card studio',
      'cards.title': 'A greeting card, gilded',
      'cards.lead': 'Your name, your message, a premium template — then share or download in high resolution. Everything is drawn in your browser.',
      'cards.preview': 'Live preview',
      'cards.settings': 'Card details',
      'cards.occasion': 'Occasion',
      'cards.name': 'Name or names',
      'cards.namePlaceholder': 'e.g. Adam & Sara',
      'cards.greeting': 'Greeting text',
      'cards.greetingPlaceholder': 'Write something from the heart…',
      'cards.font': 'Font',
      'cards.textColor': 'Text colour',
      'cards.customColor': 'Custom colour',
      'cards.template': 'Template',
      'cards.size': 'Size',
      'cards.square': 'Square',
      'cards.squareHint': '1080 × 1080',
      'cards.story': 'Story',
      'cards.storyHint': '1080 × 1920',
      'cards.download': 'Download PNG',
      'cards.share': 'Share',
      'cards.copyLink': 'Copy link',
      'cards.save': 'Save card',
      'cards.saveNote': 'Only the card settings are saved, never the image. Return anytime to edit it.',
      'cards.watermarkNote': 'A small site watermark sits at the bottom of every card.',
      'cards.shareTitle': 'A card from Zakhrafa',
      'cards.imageName': 'zakhrafa-card.png',
      'cards.copyLinkSuccess': 'Card link copied. Open it on any device to restore this design.',
      'cards.downloadSuccess': 'Card downloaded.',
      'cards.saveSuccess': 'Card saved to your collection.',
      'cards.shareCancelled': 'Share cancelled.',
      'cards.shareError': 'Direct sharing was not available.',
      'cards.shareSuccess': 'Card shared.',
      'cards.fallbackNote': 'The image was downloaded. You can also share it on WhatsApp:',
      'cards.whatsapp': 'Open WhatsApp',
      'cards.nativeNote': 'Share uses your device’s native sheet when available; otherwise the image downloads.',
      'cards.live': 'Preview updates automatically.',
      'cards.howTitle': 'A card worthy of the moment',
      'cards.howLead': 'Ten occasions, four premium templates for each, and carefully chosen Arabic fonts.',
      'cards.how1': 'Pick an occasion and template',
      'cards.how1d': 'From Eid and Ramadan to graduation and a new baby.',
      'cards.how2': 'Write from the heart',
      'cards.how2d': 'Change the name, greeting, font, and colour until it feels like yours.',
      'cards.how3': 'Share at full quality',
      'cards.how3d': 'Download a 1080px PNG or use your device’s native share sheet.',
      'cards.privacyNote': 'Your images and words are never uploaded. Everything is drawn and saved locally.',
      'cards.templateChanged': 'Template changed.',
      'cards.shareUnavailable': 'Native sharing is not supported in this browser. Download the image or use the WhatsApp link.',

      'collection.eyebrow': 'Your private space',
      'collection.title': 'My Collection',
      'collection.lead': 'Everything you saved, in one place — with a backup that carries your taste across devices.',
      'collection.localNote': 'Your data stays in this browser on this device. There is no server and no cloud sync. Export a backup to move it.',
      'collection.scopeGuest': 'Saving as guest',
      'collection.scopeUser': 'Saving as {name}',
      'collection.favorites': 'Favorites',
      'collection.history': 'History',
      'collection.decorations': 'Decorations',
      'collection.cards': 'Cards',
      'collection.emptyFavorites': 'Nothing saved yet. Start with the name studio or card studio.',
      'collection.emptyHistory': 'Your history is empty. Decorations and cards you copy or download will appear here.',
      'collection.clearHistory': 'Clear history',
      'collection.confirmClear': 'Clear this history section? Your favorites will stay safe.',
      'collection.export': 'Export backup',
      'collection.import': 'Import backup',
      'collection.importNote': 'JSON files only. The file is validated and merged, never used to replace your collection.',
      'collection.backupTitle': 'Take your collection with you',
      'collection.backupDesc': 'Export one file containing favorites and history, then import it on another device. Importing merges items instead of replacing your current collection.',
      'collection.importSuccess': 'Imported {n} new items.',
      'collection.importInvalid': 'That file is not valid. Use a backup exported from Zakhrafa.',
      'collection.importError': 'We could not read that file. Try a valid JSON backup.',
      'collection.savedAt': 'Saved {date}',
      'collection.openCard': 'Open card',
      'collection.openDeco': 'Edit name',
      'collection.removeAria': 'Remove {name}',
      'collection.copyAria': 'Copy {name}',
      'collection.guestTitle': 'Save under your name',
      'collection.guestDesc': 'Sign in with Google to keep your collection separate from guests on this browser. Guest items merge into your account automatically on first sign-in.',
      'collection.statsFavorites': 'saved',
      'collection.statsDecor': 'decorations',
      'collection.statsCards': 'cards',
      'collection.statsHistory': 'in history',
      'collection.noItems': 'Nothing here yet.',
      'collection.savedInBrowser': 'Stored locally',
      'collection.openHint': 'Restore these settings in the Card Studio.',
      'collection.restoreTitle': 'Restore',
      'collection.removeSuccess': 'Removed from your collection.',
      'collection.historyCleared': 'History cleared.',
      'collection.exportSuccess': 'Backup prepared.',

      'auth.loading': 'Loading Google Sign-In…',
      'auth.unavailable': 'Google Sign-In could not load. You can continue as a guest.',
      'auth.welcome': 'Welcome, {name}',
      'auth.signedOut': 'Signed out. Your saved data is still in this browser.',
      'auth.merged': 'Merged {n} guest items into your account.',
      'auth.note': 'The account only organizes data. Nothing is sent to a server.',
      'auth.googleAria': 'Sign in with Google',
      'auth.profileAria': 'Open account menu',

      'about.eyebrow': 'Our story',
      'about.title': 'The beauty of the letter, without the fuss.',
      'about.lead': 'Zakhrafa is a small studio that cares about details: Arabic names that respect joining rules, and greeting cards built to feel like you.',
      'about.p1': 'It started with a simple question: why do Arabic decorations so often look beautiful while breaking letter joining? We built a collection that preserves Arabic shaping and adds symbols and frames around the name instead of interfering with its letters.',
      'about.p2': 'In the Card Studio, every template is drawn in the browser with gradients, shapes, and type. No external images, no copyright worries, and every card is generated from your own settings.',
      'about.p3': 'We believe in quiet privacy: no forced account, no data server, no image uploads. Google sign-in is optional and only organizes your collection within this browser.',
      'about.p4': 'The whole site is static — HTML, CSS, and JavaScript only — fast, light, and free of build complexity.',
      'about.valuesTitle': 'What we care about',
      'about.value1': 'Arabic first',
      'about.value1d': 'Correct direction, authentic Arabic type, and an interface that reads right-to-left the way it should.',
      'about.value2': 'Luxury in the details',
      'about.value2d': 'Quiet gold, generous space, and micro-motion that never steals attention.',
      'about.value3': 'Local privacy',
      'about.value3d': 'Your settings stay in your browser, with export and import whenever you want.',
      'about.value4': 'No barriers',
      'about.value4d': 'Keyboard navigation, clear contrast, and respect for reduced motion.',
      'about.techTitle': 'Simple technology, carefully used',
      'about.techDesc': 'No frameworks or heavy libraries. Canvas for cards, Unicode for decorations, and localStorage for your collection.',
      'about.ctaTitle': 'Try your name now',
      'about.ctaDesc': 'One moment away from a new decoration or card.',
      'about.cta': 'Start from home',

      'privacy.eyebrow': 'Privacy',
      'privacy.title': 'Your data, as it should be.',
      'privacy.updated': 'Last updated: 8 November 2026',
      'privacy.lead': 'This is a static website. We do not store your data on a server, ask for a password, or sell your information. This page explains what stays in your browser.',
      'privacy.localTitle': 'What is stored in your browser',
      'privacy.localBody': 'When you use the site, localStorage may hold your chosen language, theme, collection of decorations and cards (as JSON settings), and usage history. All of it stays on your device, and you can delete it from your browser or the My Collection page.',
      'privacy.googleTitle': 'Google Sign-In',
      'privacy.googleBody': 'Signing in is optional. If you choose it, Google’s button returns your basic profile (name, email, picture, and unique sub ID), and we store only that minimal profile in your browser. We do not keep a Google token and do not send your data to a server. Signing out never deletes your collection.',
      'privacy.adsTitle': 'Advertising',
      'privacy.adsBody': 'This site loads advertising from Monetag through a single script. The ad network may use its own cookies or local storage according to its policies. We do not control those technologies and do not collect data about them ourselves; you can manage ads through your browser settings or an ad blocker.',
      'privacy.serverTitle': 'No server, no file uploads',
      'privacy.serverBody': 'Greeting cards are drawn in your browser with Canvas. Images, names, and greeting text are never uploaded anywhere. Sharing an image happens through your device only.',
      'privacy.choicesTitle': 'Your choices',
      'privacy.choicesBody': 'You can remove collection items, clear history, export a backup, or delete the site’s data from your browser settings. You can also use the entire site as a guest without signing in.',
      'privacy.childrenTitle': 'Children',
      'privacy.childrenBody': 'The site is not directed at children under 13, and we do not knowingly collect personal data from them.',
      'privacy.changesTitle': 'Policy changes',
      'privacy.changesBody': 'We may update this page when features change. The update date appears at the top.',
      'privacy.contactTitle': 'Have a question?',
      'privacy.contactBody': 'Write to us and we will clarify anything that needs it.',
      'privacy.contactCta': 'Email us',

      'contact.eyebrow': 'Contact',
      'contact.title': 'We are listening.',
      'contact.lead': 'A question, a note, or an idea for a new category? Email is the fastest way to reach us. No forms, no servers — just a message.',
      'contact.emailLabel': 'Email',
      'contact.copyEmail': 'Copy email',
      'contact.response': 'We try to reply within 2–3 business days.',
      'contact.noteTitle': 'Before you write',
      'contact.note': 'For the quickest help, include your browser and device, and whether the issue is about a decoration or a card. Never send passwords or sensitive account information.',
      'contact.privacy': 'Read the privacy policy',

      '404.eyebrow': 'Error 404',
      '404.title': 'This page got lost among the ornaments.',
      '404.desc': 'The link does not exist or has moved. No worries — beauty is one click away.',
      '404.home': 'Back to home',
      '404.cards': 'Card Studio'
    }
  };

  function readLang() {
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      if (q === 'en' || q === 'ar') {
        localStorage.setItem(PREFIX + '_lang', q);
        return q;
      }
      var saved = localStorage.getItem(PREFIX + '_lang');
      if (saved === 'en' || saved === 'ar') return saved;
    } catch (e) { /* ignore */ }
    return CFG.defaultLang === 'en' ? 'en' : 'ar';
  }

  var lang = readLang();

  function t(key, vars) {
    var table = dict[lang] || dict.ar;
    var str = table[key];
    if (str === undefined) str = dict.en[key];
    if (str === undefined) str = dict.ar[key];
    if (str === undefined) return key;
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        str = str.replace(new RegExp('\\{' + name + '\\}', 'g'), String(vars[name]));
      });
    }
    return str;
  }

  function getPageValue(which) {
    var body = document.body;
    if (!body) return '';
    var suffix = lang === 'ar' ? 'ar' : 'en';
    return body.getAttribute('data-' + which + '-' + suffix)
      || body.getAttribute('data-' + which + (lang === 'ar' ? 'Ar' : 'En'))
      || '';
  }

  function updateMeta() {
    var brand = CFG.brand[lang];
    var pageTitle = getPageValue('title');
    if (pageTitle) document.title = pageTitle + ' | ' + brand;

    var desc = getPageValue('desc');
    if (desc) {
      var md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute('content', desc);
      var ogd = document.querySelector('meta[property="og:description"]');
      if (ogd) ogd.setAttribute('content', desc);
      var twd = document.querySelector('meta[name="twitter:description"]');
      if (twd) twd.setAttribute('content', desc);
    }
    var ogt = document.querySelector('meta[property="og:title"]');
    if (ogt) ogt.setAttribute('content', document.title);
    var twt = document.querySelector('meta[name="twitter:title"]');
    if (twt) twt.setAttribute('content', document.title);
    var ogl = document.querySelector('meta[property="og:locale"]');
    if (ogl) ogl.setAttribute('content', lang === 'ar' ? 'ar_AR' : 'en_US');
  }

  function apply(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    // Inline bilingual copy for content that lives in the HTML itself
    // (category cards, chips, small labels). Keeps the markup semantic.
    root.querySelectorAll('[data-ar][data-en]').forEach(function (el) {
      el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    root.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    root.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });
    root.querySelectorAll('[data-brand]').forEach(function (el) {
      el.textContent = CFG.brand[lang];
    });
    root.querySelectorAll('[data-tagline]').forEach(function (el) {
      el.textContent = CFG.brand.tagline[lang];
    });
    root.querySelectorAll('[data-lang-short]').forEach(function (el) {
      el.textContent = lang === 'ar' ? 'EN' : 'ع';
    });
    var langBtn = root.querySelector('[data-lang-toggle]');
    if (langBtn) {
      var langShort = lang === 'ar' ? 'EN' : 'ع';
      // The accessible name must contain the visible short label as well.
      langBtn.setAttribute('aria-label', t('nav.langAria') + ' — ' + langShort);
      langBtn.setAttribute('title', t('nav.langAria'));
    }
    var menuBtn = root.querySelector('[data-menu-toggle]');
    if (menuBtn) menuBtn.setAttribute('aria-label', t('nav.menuAria'));
    var light = document.documentElement.getAttribute('data-theme') === 'light';
    root.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', light ? t('nav.themeToDark') : t('nav.themeToLight'));
      btn.setAttribute('title', light ? t('nav.themeToDark') : t('nav.themeToLight'));
    });
    updateMeta();
  }

  function setLang(next, opts) {
    if (next !== 'en' && next !== 'ar') return;
    lang = next;
    try { localStorage.setItem(PREFIX + '_lang', lang); } catch (e) { /* ignore */ }
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    apply(document);
    var detail = { lang: lang };
    window.dispatchEvent(new CustomEvent('zk:lang', { detail: detail }));
    if (!opts || !opts.silent) {
      document.documentElement.classList.remove('lang-swapping');
      // Force a tiny reflow so repeated toggles still animate.
      void document.documentElement.offsetWidth;
      document.documentElement.classList.add('lang-swapping');
      window.setTimeout(function () {
        document.documentElement.classList.remove('lang-swapping');
      }, 420);
    }
  }

  function toggleLang() {
    setLang(lang === 'ar' ? 'en' : 'ar');
  }

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  window.ZK.i18n = {
    t: t,
    apply: apply,
    setLang: setLang,
    toggleLang: toggleLang,
    getLang: function () { return lang; },
    dir: function () { return lang === 'ar' ? 'rtl' : 'ltr'; },
    dictionaries: dict
  };
})();
