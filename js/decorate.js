/* ==========================================================================
   Zakhrafa — name decorator
   Instant, local, one-tap copy. Handles home + all category pages.
   ========================================================================== */
(function () {
  'use strict';

  var i18n = window.ZK.i18n;
  var storage = window.ZK.storage;
  var data = window.ZK.data;
  var latinStyles = window.ZK.latinStyles || [];
  var arabicStyles = window.ZK.arabicStyles || [];

  function t(key, vars) { return i18n.t(key, vars); }

  var COPY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  var CHECK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 6 9 17l-5-5"></path></svg>';
  var HEART_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path></svg>';

  var state = {
    input: null,
    clearBtn: null,
    grid: null,
    picksGrid: null,
    picksSection: null,
    symbolsSection: null,
    symbolsGrid: null,
    count: null,
    demoNote: null,
    category: null,
    frame: 0,
    favorites: {}
  };

  function getCategory() {
    var slug = document.body.getAttribute('data-category');
    return slug ? data.getCategory(slug) : null;
  }

  function sampleText() {
    return data.sampleName(i18n.getLang());
  }

  function currentText() {
    if (!state.input) return { text: sampleText(), demo: true };
    var value = state.input.value.trim();
    return value ? { text: value, demo: false } : { text: sampleText(), demo: true };
  }

  function relevantStyles(text) {
    var isArabic = window.ZK.isArabicText ? window.ZK.isArabicText(text) : /[\u0600-\u06FF]/.test(text);
    return {
      isArabic: isArabic,
      styles: isArabic ? arabicStyles : latinStyles
    };
  }

  function styleName(style, isArabic) {
    if (isArabic) return window.ZK.arabicStyleLabel(style, i18n.getLang());
    return window.ZK.latinStyleLabel(style, i18n.getLang());
  }

  function refreshFavorites() {
    state.favorites = {};
    var store = storage.getStore();
    store.favorites.decor.forEach(function (item) { state.favorites[item.id] = true; });
  }

  function favId(text, styleId) {
    return storage.decorId(text, styleId);
  }

  function copyText(text) {
    return Promise.resolve(storage.copyText(text)).then(function (result) {
      return result !== false;
    }).catch(function () { return false; });
  }

  function copyResult(text, styleId, name, isArabic, button) {
    var id = favId(text, styleId);
    copyText(text).then(function (ok) {
      if (!ok) {
        window.ZK.toast(t('common.error'), 'error');
        return;
      }
      window.ZK.toast(t('decorate.copied'), 'success');
      storage.addHistory('decor', {
        id: id,
        text: text,
        source: currentText().text,
        styleId: styleId,
        styleName: name,
        lang: isArabic ? 'ar' : 'en'
      });
      if (button) {
        var label = button.querySelector('.btn-label');
        var old = label ? label.textContent : '';
        button.classList.add('is-copied');
        if (label) label.textContent = t('common.copied');
        button.innerHTML = CHECK_ICON + '<span class="btn-label">' + t('common.copied') + '</span>';
        setTimeout(function () {
          if (!button.isConnected) return;
          button.classList.remove('is-copied');
          button.innerHTML = COPY_ICON + '<span class="btn-label">' + t('common.copy') + '</span>';
          if (old) button.querySelector('.btn-label').textContent = old;
        }, 1600);
      }
    });
  }

  function toggleFavorite(text, styleId, name, isArabic, button) {
    var id = favId(text, styleId);
    if (state.favorites[id]) {
      storage.removeFavorite('decor', id);
      delete state.favorites[id];
      if (button) {
        button.classList.remove('is-saved');
        button.setAttribute('aria-pressed', 'false');
      }
      window.ZK.toast(t('collection.removeSuccess'), 'success');
    } else {
      storage.addFavorite('decor', {
        id: id,
        text: text,
        source: currentText().text,
        styleId: styleId,
        styleName: name,
        lang: isArabic ? 'ar' : 'en'
      });
      state.favorites[id] = true;
      if (button) {
        button.classList.add('is-saved');
        button.setAttribute('aria-pressed', 'true');
      }
      window.ZK.toast(t('decorate.favorited'), 'success');
    }
  }

  function buildCard(text, styleId, name, isArabic, extraClass) {
    var id = favId(text, styleId);
    var saved = !!state.favorites[id];
    var article = document.createElement('article');
    article.className = 'decor-card' + (extraClass ? ' ' + extraClass : '');
    article.setAttribute('data-style', styleId);

    var preview = document.createElement('div');
    preview.className = 'decor-preview';
    preview.setAttribute('dir', 'auto');
    var output = document.createElement('span');
    output.className = 'decor-output';
    output.setAttribute('lang', isArabic ? 'ar' : 'en');
    output.textContent = text;
    preview.appendChild(output);

    var meta = document.createElement('div');
    meta.className = 'decor-meta';
    var style = document.createElement('span');
    style.className = 'decor-style-name';
    style.textContent = name;
    meta.appendChild(style);

    var actions = document.createElement('div');
    actions.className = 'decor-actions';

    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'decor-action copy-action';
    copyBtn.setAttribute('aria-label', t('decorate.copyAria', { style: name }));
    copyBtn.innerHTML = COPY_ICON + '<span class="btn-label">' + t('common.copy') + '</span>';
    copyBtn.addEventListener('click', function () {
      copyResult(text, styleId, name, isArabic, copyBtn);
    });

    var favBtn = document.createElement('button');
    favBtn.type = 'button';
    favBtn.className = 'decor-action favorite-action' + (saved ? ' is-saved' : '');
    favBtn.setAttribute('aria-pressed', String(saved));
    favBtn.setAttribute('aria-label', t('decorate.favoriteAria', { style: name }));
    favBtn.innerHTML = HEART_ICON;
    favBtn.addEventListener('click', function () {
      toggleFavorite(text, styleId, name, isArabic, favBtn);
    });

    actions.appendChild(copyBtn);
    actions.appendChild(favBtn);
    meta.appendChild(actions);
    article.appendChild(preview);
    article.appendChild(meta);
    return article;
  }

  function renderStyles() {
    if (!state.grid) return;
    refreshFavorites();
    var current = currentText();
    var detected = relevantStyles(current.text);
    var fragment = document.createDocumentFragment();
    detected.styles.forEach(function (style) {
      var output = style.apply(current.text);
      fragment.appendChild(buildCard(output, style.id, styleName(style, detected.isArabic), detected.isArabic));
    });
    state.grid.innerHTML = '';
    state.grid.appendChild(fragment);

    if (state.count) {
      state.count.textContent = t('home.resultCount', { n: detected.styles.length });
    }
    if (state.demoNote) state.demoNote.hidden = !current.demo;
    var scriptLabel = document.getElementById('script-label');
    if (scriptLabel) {
      scriptLabel.textContent = detected.isArabic ? t('decorate.arabicDetected') : t('decorate.latinDetected');
      scriptLabel.setAttribute('data-script', detected.isArabic ? 'ar' : 'en');
    }
  }

  function renderPicks() {
    if (!state.category || !state.picksGrid) return;
    var current = currentText();
    var cat = state.category;
    var catName = i18n.getLang() === 'ar' ? cat.nameAr : cat.nameEn;
    var fragment = document.createDocumentFragment();
    cat.picks.forEach(function (template, index) {
      var output = template.replace(/\{name\}/g, current.text);
      var label = catName + ' · ' + (index + 1);
      fragment.appendChild(buildCard(output, 'pick-' + cat.slug + '-' + index, label, window.ZK.isArabicText(current.text), 'decor-pick'));
    });
    state.picksGrid.innerHTML = '';
    state.picksGrid.appendChild(fragment);
  }

  function copySymbol(symbol, button) {
    copyText(symbol).then(function (ok) {
      if (!ok) {
        window.ZK.toast(t('common.error'), 'error');
        return;
      }
      window.ZK.toast(t('common.copied'), 'success');
      if (button) {
        button.classList.add('is-copied');
        setTimeout(function () { if (button.isConnected) button.classList.remove('is-copied'); }, 1000);
      }
    });
  }

  function renderSymbols() {
    if (!state.category || !state.symbolsGrid) return;
    var cat = state.category;
    var keys = cat.slug === 'symbols'
      ? Object.keys(data.symbols)
      : (cat.symbolPacks || []);
    var fragment = document.createDocumentFragment();
    keys.forEach(function (key) {
      var pack = data.symbols[key];
      if (!pack) return;
      var section = document.createElement('section');
      section.className = 'symbol-pack';
      var h3 = document.createElement('h3');
      h3.textContent = i18n.getLang() === 'ar' ? pack.ar : pack.en;
      var chips = document.createElement('div');
      chips.className = 'symbol-chips';
      pack.items.forEach(function (symbol) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'symbol-chip';
        btn.textContent = symbol;
        btn.setAttribute('aria-label', t('common.copy') + ' ' + symbol);
        btn.addEventListener('click', function () { copySymbol(symbol, btn); });
        chips.appendChild(btn);
      });
      section.appendChild(h3);
      section.appendChild(chips);
      fragment.appendChild(section);
    });
    state.symbolsGrid.innerHTML = '';
    state.symbolsGrid.appendChild(fragment);
  }

  function renderCategoryTabs() {
    var host = document.getElementById('category-tabs');
    if (!host) return;
    var active = state.category ? state.category.slug : '';
    var fragment = document.createDocumentFragment();
    data.categories.forEach(function (cat) {
      var a = document.createElement('a');
      a.className = 'category-tab' + (cat.slug === active ? ' is-active' : '');
      a.href = cat.file;
      if (cat.slug === active) a.setAttribute('aria-current', 'page');
      a.innerHTML = '<span class="cat-icon" aria-hidden="true">' + cat.icon + '</span><span>' +
        (i18n.getLang() === 'ar' ? cat.nameAr : cat.nameEn) + '</span>';
      fragment.appendChild(a);
    });
    host.innerHTML = '';
    host.appendChild(fragment);
  }

  function renderCategoryHero() {
    if (!state.category) return;
    var cat = state.category;
    var title = document.querySelector('[data-category-title]');
    var intro = document.querySelector('[data-category-intro]');
    if (title) title.textContent = i18n.getLang() === 'ar' ? cat.titleAr : cat.titleEn;
    if (intro) intro.textContent = i18n.getLang() === 'ar' ? cat.introAr : cat.introEn;
    var crumb = document.querySelector('[data-category-crumb]');
    if (crumb) crumb.textContent = i18n.getLang() === 'ar' ? cat.nameAr : cat.nameEn;
  }

  function renderAll() {
    refreshFavorites();
    renderStyles();
    renderPicks();
    renderSymbols();
    renderCategoryTabs();
    renderCategoryHero();
  }

  function scheduleRender() {
    if (state.frame) cancelAnimationFrame(state.frame);
    state.frame = requestAnimationFrame(function () {
      state.frame = 0;
      renderStyles();
      renderPicks();
    });
  }

  function bind() {
    if (state.input) {
      state.input.addEventListener('input', function () {
        if (state.clearBtn) state.clearBtn.disabled = !state.input.value;
        scheduleRender();
      });
      state.input.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && state.input.value) {
          state.input.value = '';
          state.clearBtn.disabled = true;
          scheduleRender();
        }
      });
    }
    if (state.clearBtn) {
      state.clearBtn.addEventListener('click', function () {
        if (!state.input) return;
        state.input.value = '';
        state.clearBtn.disabled = true;
        state.input.focus();
        scheduleRender();
      });
    }
    window.addEventListener('zk:lang', function () {
      renderAll();
    });
    window.addEventListener('zk:storage', function () {
      refreshFavorites();
      // Rebuild only favorite button states without stealing focus.
      document.querySelectorAll('.decor-card').forEach(function (card) {
        var id = card.getAttribute('data-style');
        if (!id) return;
        var outputEl = card.querySelector('.decor-output');
        if (!outputEl) return;
        var fav = card.querySelector('.favorite-action');
        if (!fav) return;
        var text = outputEl.textContent;
        var saved = !!state.favorites[storage.decorId(text, id)];
        fav.classList.toggle('is-saved', saved);
        fav.setAttribute('aria-pressed', String(saved));
      });
    });
  }

  function init() {
    state.input = document.getElementById('name-input');
    if (!state.input) return;
    state.clearBtn = document.getElementById('clear-name');
    state.grid = document.getElementById('decor-results');
    state.count = document.getElementById('results-count');
    state.demoNote = document.getElementById('demo-note');
    state.picksGrid = document.getElementById('category-picks');
    state.picksSection = document.getElementById('category-picks-section');
    state.symbolsGrid = document.getElementById('symbol-grid');
    state.symbolsSection = document.getElementById('symbols-section');
    state.category = getCategory();

    try {
      var prefilled = new URLSearchParams(window.location.search).get('text');
      if (prefilled) state.input.value = prefilled.slice(0, 60);
    } catch (e) { /* ignore */ }

    if (state.clearBtn) state.clearBtn.disabled = !state.input.value;
    if (state.picksSection) state.picksSection.hidden = !state.category;
    if (state.symbolsSection) state.symbolsSection.hidden = !state.category;

    bind();
    renderAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();

  window.ZK.decorator = { render: renderAll };
})();
