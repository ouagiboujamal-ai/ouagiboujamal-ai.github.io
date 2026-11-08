/* ==========================================================================
   Zakhrafa — single source of brand + app configuration
   Change the brand here, then update the static <title>/meta tags if desired.
   ========================================================================== */
(function () {
  'use strict';

  // Apply the remembered language and theme before first paint to avoid a flash.
  // Remove this block if you prefer the site to always start in Arabic + dark.
  try {
    var savedTheme = localStorage.getItem('zk_theme');
    var savedLang = localStorage.getItem('zk_lang');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    var lang = savedLang === 'en' ? 'en' : 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  } catch (e) { /* localStorage may be unavailable */ }

  window.ZK = window.ZK || {};

  window.ZK_CONFIG = Object.freeze({
    brand: {
      en: 'Zakhrafa',
      ar: 'زخرفة',
      tagline: {
        en: 'Names, beautifully written',
        ar: 'أسماء تكتبها بأناقة'
      },
      monogram: 'Z'
    },

    // Update this after publishing. Used by share links, sitemap and canonical URLs.
    siteUrl: 'https://ouagiboujamal-ai.github.io/zakhrafa',

    // Public Google OAuth client ID. This is safe to expose in client-side code.
    googleClientId: '295699802302-q6mn9sldoki97gn2bai3sv54jjmiuf95.apps.googleusercontent.com',

    // Replace with your own inbox. Contact is mailto-only — there is no backend.
    contactEmail: 'hello@zakhrafa.app',

    storagePrefix: 'zk',
    defaultLang: 'ar',
    defaultTheme: 'dark',

    // Monetag is included as the one and only ad snippet in every <head>.
    // To swap it, replace the <meta name="monetag"> + tag.min.js lines in the
    // shared page head. Keep it in the head, never in the service worker.
    ads: {
      provider: 'Monetag',
      zone: '10669434'
    }
  });

  window.ZK.config = window.ZK_CONFIG;

  /*
   * IMPORTANT — Google Sign-In:
   * Add the final GitHub Pages URL to "Authorized JavaScript origins" in
   * Google Cloud Console (APIs & Services → Credentials → OAuth 2.0 Client IDs).
   * Example: https://YOUR-USERNAME.github.io
   * Add http://localhost:8000 as well while testing locally.
   */
})();
