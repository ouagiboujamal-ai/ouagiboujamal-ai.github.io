/* ==========================================================================
   Zakhrafa — shared shell: header, footer, theme, language, auth, toasts
   No global click handlers and no redirects. Navigation happens only when
   the visitor intentionally activates a real link.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.ZK.config;
  var i18n = window.ZK.i18n;
  var storage = window.ZK.storage;
  var auth = window.ZK.auth;
  var PREFIX = CFG.storagePrefix;

  function t(key, vars) { return i18n.t(key, vars); }
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function currentPage() {
    return document.body.getAttribute('data-page') || 'home';
  }

  function icon(name) {
    var icons = {
      sun: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path></svg>',
      moon: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
      menu: '<span class="menu-lines" aria-hidden="true"><span></span><span></span><span></span></span>',
      arrow: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>',
      user: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg>',
      logout: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path></svg>',
      collection: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
      check: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 6 9 17l-5-5"></path></svg>'
    };
    return icons[name] || '';
  }

  function navLink(href, key, active, extra) {
    return '<a class="nav-link' + (active ? ' is-active' : '') + '" href="' + href + '"' +
      (active ? ' aria-current="page"' : '') + '>' + esc(t(key)) + (extra || '') + '</a>';
  }

  function renderHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;
    var page = currentPage();
    var catActive = page === 'category';
    var html = '' +
      '<div class="nav-shell">' +
        '<a class="brand" href="index.html" aria-label="' + esc(t('nav.homeAria')) + '">' +
          '<span class="brand-mark" aria-hidden="true"><span class="brand-letter">' + esc(CFG.brand.monogram) + '</span></span>' +
          '<span class="brand-text"><strong data-brand>' + esc(CFG.brand[i18n.getLang()]) + '</strong>' +
          '<small data-tagline>' + esc(CFG.brand.tagline[i18n.getLang()]) + '</small></span>' +
        '</a>' +
        '<nav class="primary-nav" id="primary-nav" aria-label="' + esc(t('nav.menu')) + '">' +
          navLink('index.html', 'nav.home', page === 'home') +
          '<a class="nav-link nav-categories' + (catActive ? ' is-active' : '') + '" href="index.html#categories"' +
            (catActive ? ' aria-current="page"' : '') + '>' + esc(t('nav.categories')) +
            '<span class="nav-dot" aria-hidden="true"></span></a>' +
          navLink('cards.html', 'nav.cards', page === 'cards') +
          navLink('collection.html', 'nav.collection', page === 'collection') +
          navLink('about.html', 'nav.about', page === 'about') +
          '<div class="nav-mobile-auth" data-auth-slot></div>' +
        '</nav>' +
        '<div class="nav-tools">' +
          // Keep the visible short label inside the accessible name so screen
          // readers announce the same text sighted visitors see.
          '<button class="icon-btn lang-btn" type="button" data-lang-toggle aria-label="' +
            esc(t('nav.langAria') + ' — ' + (i18n.getLang() === 'ar' ? 'EN' : 'ع')) +
            '" title="' + esc(t('nav.langAria')) + '">' +
            '<span data-lang-short>' + (i18n.getLang() === 'ar' ? 'EN' : 'ع') + '</span>' +
          '</button>' +
          '<button class="icon-btn theme-btn" type="button" data-theme-toggle aria-label="' + esc(t('nav.themeToLight')) + '">' +
            '<span class="theme-icon" aria-hidden="true"></span>' +
          '</button>' +
          '<div class="auth-slot" data-auth-slot></div>' +
          '<button class="icon-btn menu-btn" type="button" data-menu-toggle aria-controls="primary-nav" aria-expanded="false" aria-label="' + esc(t('nav.menuAria')) + '">' +
            icon('menu') +
          '</button>' +
        '</div>' +
      '</div>';
    host.innerHTML = html;
    host.classList.add('site-header-ready');
    bindHeader(host);
    updateThemeUI();
    renderAuthSlot();
  }

  function renderFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;
    var cats = window.ZK.data ? window.ZK.data.categories : [];
    var catLinks = cats.map(function (cat) {
      return '<a href="' + esc(cat.file) + '">' + esc(i18n.getLang() === 'ar' ? cat.nameAr : cat.nameEn) + '</a>';
    }).join('');
    host.innerHTML = '' +
      '<div class="footer-shell">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="brand brand-footer" href="index.html" aria-label="' + esc(t('nav.homeAria')) + '">' +
              '<span class="brand-mark" aria-hidden="true"><span class="brand-letter">' + esc(CFG.brand.monogram) + '</span></span>' +
              '<span class="brand-text"><strong data-brand>' + esc(CFG.brand[i18n.getLang()]) + '</strong>' +
              '<small data-tagline>' + esc(CFG.brand.tagline[i18n.getLang()]) + '</small></span>' +
            '</a>' +
            '<p>' + esc(t('footer.localNote')) + '</p>' +
            '<span class="local-badge"><span class="local-dot" aria-hidden="true"></span>' + esc(t('collection.savedInBrowser')) + '</span>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h2>' + esc(t('footer.explore')) + '</h2>' +
            '<a href="index.html">' + esc(t('nav.home')) + '</a>' +
            '<a href="index.html#categories">' + esc(t('nav.categories')) + '</a>' +
            '<a href="cards.html">' + esc(t('nav.cards')) + '</a>' +
            '<a href="collection.html">' + esc(t('nav.collection')) + '</a>' +
          '</div>' +
          '<div class="footer-col footer-cats">' +
            '<h2>' + esc(t('footer.categories')) + '</h2>' + catLinks +
          '</div>' +
          '<div class="footer-col">' +
            '<h2>' + esc(t('footer.legal')) + '</h2>' +
            '<a href="about.html">' + esc(t('nav.about')) + '</a>' +
            '<a href="privacy.html">' + esc(t('nav.privacy')) + '</a>' +
            '<a href="contact.html">' + esc(t('nav.contact')) + '</a>' +
            '<a href="mailto:' + esc(CFG.contactEmail) + '">' + esc(CFG.contactEmail) + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© ' + new Date().getFullYear() + ' ' + esc(CFG.brand[i18n.getLang()]) + ' — ' + esc(t('footer.rights')) + '</span>' +
          '<span>' + esc(t('footer.made')) + '</span>' +
        '</div>' +
      '</div>';
    host.classList.add('site-footer-ready');
  }

  function initials(name) {
    var parts = String(name || '').trim().split(/\s+/).slice(0, 2);
    return parts.map(function (part) { return Array.from(part)[0] || ''; }).join('').toUpperCase();
  }

  function avatarHtml(user, sizeClass) {
    if (user && user.picture) {
      return '<img class="' + sizeClass + '" src="' + esc(user.picture) + '" alt="" referrerpolicy="no-referrer" loading="lazy" decoding="async">';
    }
    return '<span class="' + sizeClass + ' avatar-fallback" aria-hidden="true">' + esc(initials(user && user.name)) + '</span>';
  }

  function renderAuthSlot() {
    var slots = document.querySelectorAll('[data-auth-slot]');
    if (!slots.length) return;
    var user = auth.getUser();

    Array.prototype.forEach.call(slots, function (slot) {
      if (user) {
        slot.innerHTML = '' +
          '<div class="auth-user">' +
            '<button class="auth-trigger" type="button" aria-expanded="false" aria-haspopup="true" aria-label="' + esc(t('auth.profileAria')) + '">' +
              avatarHtml(user, 'avatar-img') +
              '<span class="auth-name">' + esc(String(user.name || '').split(/\s+/)[0]) + '</span>' +
              '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"></path></svg>' +
            '</button>' +
            '<div class="auth-menu" hidden>' +
              '<div class="auth-menu-head">' +
                avatarHtml(user, 'avatar-lg') +
                '<div><strong>' + esc(user.name) + '</strong><small>' + esc(user.email) + '</small></div>' +
              '</div>' +
              '<a class="auth-menu-link" href="collection.html">' + icon('collection') + '<span data-i18n="nav.myCollection">' + esc(t('nav.myCollection')) + '</span></a>' +
              '<p class="auth-note">' + esc(t('auth.note')) + '</p>' +
              '<button class="auth-signout" type="button" data-signout>' + icon('logout') + '<span data-i18n="nav.signOut">' + esc(t('nav.signOut')) + '</span></button>' +
            '</div>' +
          '</div>';

        var trigger = slot.querySelector('.auth-trigger');
        var menu = slot.querySelector('.auth-menu');
        var img = slot.querySelector('img');
        if (img) {
          img.addEventListener('error', function () {
            if (!img.parentNode) return;
            var fallback = document.createElement('span');
            fallback.className = img.className + ' avatar-fallback';
            fallback.setAttribute('aria-hidden', 'true');
            fallback.textContent = initials(user.name);
            img.replaceWith(fallback);
          });
        }
        trigger.addEventListener('click', function () {
          var open = menu.hasAttribute('hidden');
          // Close the sibling account menu before opening this one.
          document.querySelectorAll('.auth-menu').forEach(function (other) {
            if (other !== menu) other.setAttribute('hidden', '');
          });
          if (open) menu.removeAttribute('hidden');
          else menu.setAttribute('hidden', '');
          trigger.setAttribute('aria-expanded', String(open));
        });
        var signout = slot.querySelector('[data-signout]');
        if (signout) {
          signout.addEventListener('click', function () {
            auth.logout();
            toast(t('auth.signedOut'), 'success');
          });
        }
      } else {
        slot.innerHTML = '<div class="google-slot" data-google-signin><span class="auth-loading">' + esc(t('auth.loading')) + '</span></div>';
        var target = slot.querySelector('[data-google-signin]');
        auth.renderButtonInto(target);
      }
    });
  }

  function setTheme(theme, persist) {
    theme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f1e6' : '#07070d');
    if (persist !== false) {
      try { localStorage.setItem(PREFIX + '_theme', theme); } catch (e) { /* ignore */ }
    }
    updateThemeUI();
    try { window.dispatchEvent(new CustomEvent('zk:theme', { detail: { theme: theme } })); } catch (e) { /* ignore */ }
  }

  function updateThemeUI() {
    var light = document.documentElement.getAttribute('data-theme') === 'light';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.innerHTML = '<span class="theme-icon" aria-hidden="true">' + (light ? icon('sun') : icon('moon')) + '</span>';
      btn.setAttribute('aria-label', light ? t('nav.themeToDark') : t('nav.themeToLight'));
      btn.setAttribute('title', light ? t('nav.themeToDark') : t('nav.themeToLight'));
      btn.setAttribute('aria-pressed', String(light));
    });
  }

  function closeMobileNav() {
    document.body.classList.remove('nav-open');
    var header = document.getElementById('site-header');
    if (header) header.classList.remove('nav-open');
    var btn = document.querySelector('[data-menu-toggle]');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function bindHeader(host) {
    var langBtn = host.querySelector('[data-lang-toggle]');
    if (langBtn) langBtn.addEventListener('click', function () {
      i18n.toggleLang();
      // The header is rebuilt for the new language; restore focus on the toggle.
      var fresh = document.querySelector('[data-lang-toggle]');
      if (fresh) fresh.focus();
    });

    var themeBtn = host.querySelector('[data-theme-toggle]');
    if (themeBtn) themeBtn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(next, true);
    });

    var menuBtn = host.querySelector('[data-menu-toggle]');
    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        var open = !document.body.classList.contains('nav-open');
        document.body.classList.toggle('nav-open', open);
        host.classList.toggle('nav-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        var nav = host.querySelector('#primary-nav');
        if (nav) nav.setAttribute('aria-hidden', String(!open));
      });
    }
    host.querySelectorAll('.nav-link, .brand').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  function toast(message, type) {
    var region = document.getElementById('toast-region');
    if (!region) {
      region = document.createElement('div');
      region.id = 'toast-region';
      region.className = 'toast-region';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      document.body.appendChild(region);
    }
    var el = document.createElement('div');
    el.className = 'toast' + (type === 'error' ? ' toast-error' : ' toast-success');
    el.innerHTML = '<span class="toast-icon" aria-hidden="true">' + icon(type === 'error' ? 'user' : 'check') + '</span><span class="toast-text">' + esc(message) + '</span>';
    region.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('is-visible'); });
    setTimeout(function () {
      el.classList.remove('is-visible');
      setTimeout(function () { el.remove(); }, 320);
    }, 3400);
  }

  function updateStaticBrand() {
    document.querySelectorAll('[data-brand]').forEach(function (el) { el.textContent = CFG.brand[i18n.getLang()]; });
    document.querySelectorAll('[data-tagline]').forEach(function (el) { el.textContent = CFG.brand.tagline[i18n.getLang()]; });
  }

  function applyTranslations() {
    // Rebuild the JS-rendered shell so nav and footer copy switch language,
    // then translate the static page content.
    renderHeader();
    renderFooter();
    i18n.apply(document);
    updateStaticBrand();
    updateThemeUI();
    var menuBtn = document.querySelector('[data-menu-toggle]');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(document.body.classList.contains('nav-open')));
  }

  function init() {
    setTheme(document.documentElement.getAttribute('data-theme') || CFG.defaultTheme, false);
    renderHeader();
    renderFooter();
    i18n.apply(document);
    updateStaticBrand();
    if (!document.getElementById('toast-region')) {
      var region = document.createElement('div');
      region.id = 'toast-region';
      region.className = 'toast-region';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      document.body.appendChild(region);
    }
    window.addEventListener('zk:lang', function () {
      applyTranslations();
    });
    window.addEventListener('zk:auth', function (event) {
      renderAuthSlot();
      var detail = event.detail || {};
      if (detail.merged > 0) toast(t('auth.merged', { n: detail.merged }), 'success');
      else if (detail.signedOut) { /* signout toast is shown by the button */ }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMobileNav();
        var authMenu = document.querySelector('.auth-menu');
        var trigger = document.querySelector('.auth-trigger');
        if (authMenu && !authMenu.hasAttribute('hidden')) {
          authMenu.setAttribute('hidden', '');
          if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
            trigger.focus();
          }
        }
      }
    });
    if (window.innerWidth > 860) {
      var nav = document.getElementById('primary-nav');
      if (nav) nav.removeAttribute('aria-hidden');
    }
    try { window.dispatchEvent(new CustomEvent('zk:layout-ready')); } catch (e) { /* ignore */ }
  }

  window.ZK.layout = {
    init: init,
    toast: toast,
    setTheme: setTheme,
    refreshAuth: renderAuthSlot,
    refresh: applyTranslations,
    closeMenu: closeMobileNav
  };
  window.ZK.toast = toast;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
