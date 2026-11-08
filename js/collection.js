/* ==========================================================================
   Zakhrafa — My Collection
   Favorites + history, local to the browser, mergeable via JSON backup.
   ========================================================================== */
(function () {
  'use strict';

  var i18n = window.ZK.i18n;
  var storage = window.ZK.storage;
  var data = window.ZK.data;
  var auth = window.ZK.auth;
  var templates = window.ZK.cardTemplates;
  var CFG = window.ZK.config;

  var el = {};
  var observer = null;
  var fontCache = {};
  var renderTimer = 0;
  var activeTab = 'favorites';

  var COPY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  var TRASH_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5"></path></svg>';
  var OPEN_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';

  function t(key, vars) { return i18n.t(key, vars); }
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function lang() { return i18n.getLang(); }

  function occasionOf(settings) {
    return data.getOccasion(settings.occasion);
  }
  function templateName(index) {
    var names = templates.names[index] || templates.names[0];
    return lang() === 'ar' ? names.ar : names.en;
  }
  function formatDate(timestamp) {
    try {
      return new Intl.DateTimeFormat(lang() === 'ar' ? 'ar' : 'en', { dateStyle: 'medium' }).format(new Date(timestamp));
    } catch (e) {
      return new Date(timestamp).toLocaleDateString();
    }
  }

  function cardHash(settings) {
    var p = new URLSearchParams();
    p.set('occasion', settings.occasion);
    if (settings.name) p.set('name', settings.name);
    p.set('t', String(settings.template || 0));
    p.set('font', settings.font || 'Cairo');
    p.set('color', settings.color || '#f5e6b8');
    p.set('size', settings.size || 'square');
    if (settings.greeting) p.set('greeting', settings.greeting);
    return p.toString();
  }

  function updateScope() {
    if (!el.scope) return;
    var user = auth.getUser();
    el.scope.textContent = user ? t('collection.scopeUser', { name: user.name }) : t('collection.scopeGuest');
    el.scope.classList.toggle('is-account', !!user);
    if (el.promo) el.promo.hidden = !!user;
    if (el.google) {
      if (user) {
        el.google.innerHTML = '';
      } else {
        el.google.innerHTML = '<span class="auth-loading">' + esc(t('auth.loading')) + '</span>';
        auth.renderButtonInto(el.google);
      }
    }
  }

  function updateStats(store) {
    var favCount = store.favorites.decor.length + store.favorites.cards.length;
    var historyCount = store.history.decor.length + store.history.cards.length;
    var cardCount = store.favorites.cards.length;
    if (el.statFavorites) el.statFavorites.textContent = String(favCount);
    if (el.statHistory) el.statHistory.textContent = String(historyCount);
    if (el.statCards) el.statCards.textContent = String(cardCount);
    [['tab-favorites-count', favCount], ['tab-history-count', historyCount]].forEach(function (pair) {
      var node = document.getElementById(pair[0]);
      if (node) node.textContent = String(pair[1]);
    });
  }

  function observeCanvas(canvas, settings) {
    function draw() {
      if (!canvas.isConnected) return;
      var isStory = settings.size === 'story';
      var base = 260;
      var h = isStory ? Math.round(base * 1920 / 1080) : base;
      if (canvas.width !== base || canvas.height !== h) {
        canvas.width = base;
        canvas.height = h;
      }
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, base, h);
      templates.draw(ctx, base, h, {
        occasion: occasionOf(settings),
        name: settings.name || data.sampleName(lang()),
        greeting: settings.greeting,
        font: settings.font,
        color: settings.color,
        template: settings.template,
        lang: lang(),
        brand: CFG.brand[lang()]
      });
    }
    function loadAndDraw() {
      var family = '"' + (settings.font || 'Cairo') + '", sans-serif';
      if (fontCache[family]) { draw(); return; }
      if (!document.fonts || !document.fonts.load) { draw(); return; }
      Promise.all([
        document.fonts.load('700 60px ' + family, 'زخرفة Zakhrafa').catch(function () { return null; }),
        document.fonts.load('400 30px ' + family, 'زخرفة Zakhrafa').catch(function () { return null; })
      ]).then(function () {
        fontCache[family] = true;
        draw();
      });
    }
    if (observer) observer.observe(canvas);
    else loadAndDraw();
    canvas._zkDraw = loadAndDraw;
  }

  function renderDecorItem(item, bucket) {
    var article = document.createElement('article');
    article.className = 'collection-item collection-decor-item';

    var visual = document.createElement('div');
    visual.className = 'collection-decor';
    visual.setAttribute('dir', 'auto');
    var output = document.createElement('span');
    output.textContent = item.text;
    output.setAttribute('lang', item.lang === 'en' ? 'en' : 'ar');
    visual.appendChild(output);

    var meta = document.createElement('div');
    meta.className = 'collection-meta';
    var style = document.createElement('span');
    style.className = 'collection-style';
    style.textContent = item.styleName;
    var date = document.createElement('span');
    date.textContent = t('collection.savedAt', { date: formatDate(item.savedAt) });
    meta.appendChild(style);
    meta.appendChild(date);

    var actions = document.createElement('div');
    actions.className = 'collection-actions';

    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'mini-action';
    copyBtn.innerHTML = COPY_ICON + '<span>' + esc(t('common.copy')) + '</span>';
    copyBtn.setAttribute('aria-label', t('collection.copyAria', { name: item.styleName }));
    copyBtn.addEventListener('click', function () {
      Promise.resolve(storage.copyText(item.text)).then(function (result) {
        if (result === false) window.ZK.toast(t('common.error'), 'error');
        else window.ZK.toast(t('decorate.copied'), 'success');
      });
    });

    var edit = document.createElement('a');
    edit.className = 'mini-action';
    edit.href = 'index.html?text=' + encodeURIComponent(item.source || item.text);
    edit.innerHTML = OPEN_ICON + '<span>' + esc(t('collection.openDeco')) + '</span>';

    var remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'mini-action danger';
    remove.innerHTML = TRASH_ICON + '<span>' + esc(t('common.remove')) + '</span>';
    remove.setAttribute('aria-label', t('collection.removeAria', { name: item.styleName }));
    remove.addEventListener('click', function () {
      storage.removeFavorite('decor', item.id);
      window.ZK.toast(t('collection.removeSuccess'), 'success');
    });

    actions.appendChild(copyBtn);
    actions.appendChild(edit);
    if (bucket === 'favorites') actions.appendChild(remove);

    article.appendChild(visual);
    article.appendChild(meta);
    article.appendChild(actions);
    return article;
  }

  function renderCardItem(item, bucket) {
    var settings = item.settings;
    var occ = occasionOf(settings);
    var article = document.createElement('article');
    article.className = 'collection-item collection-card-item';

    var thumbLink = document.createElement('a');
    thumbLink.className = 'collection-thumb' + (settings.size === 'story' ? ' is-story' : '');
    thumbLink.href = 'cards.html#' + cardHash(settings);
    thumbLink.setAttribute('aria-label', t('collection.openCard'));
    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    thumbLink.appendChild(canvas);

    var body = document.createElement('div');
    body.className = 'collection-body';
    var title = document.createElement('h3');
    title.textContent = settings.name || (lang() === 'ar' ? 'بطاقة بلا اسم' : 'Untitled card');
    var line = document.createElement('p');
    line.textContent = (lang() === 'ar' ? occ.nameAr : occ.nameEn) + ' · ' + templateName(settings.template);
    var date = document.createElement('span');
    date.className = 'collection-date';
    date.textContent = t('collection.savedAt', { date: formatDate(item.savedAt) });
    body.appendChild(title);
    body.appendChild(line);
    body.appendChild(date);

    var actions = document.createElement('div');
    actions.className = 'collection-actions';
    var open = document.createElement('a');
    open.className = 'mini-action';
    open.href = thumbLink.href;
    open.innerHTML = OPEN_ICON + '<span>' + esc(t('collection.openCard')) + '</span>';
    actions.appendChild(open);

    if (bucket === 'favorites') {
      var remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'mini-action danger';
      remove.innerHTML = TRASH_ICON + '<span>' + esc(t('common.remove')) + '</span>';
      remove.setAttribute('aria-label', t('collection.removeAria', { name: title.textContent }));
      remove.addEventListener('click', function () {
        storage.removeFavorite('card', item.id);
        window.ZK.toast(t('collection.removeSuccess'), 'success');
      });
      actions.appendChild(remove);
    }

    body.appendChild(actions);
    article.appendChild(thumbLink);
    article.appendChild(body);
    observeCanvas(canvas, settings);
    return article;
  }

  function sorted(items) {
    return items.slice().sort(function (a, b) { return (b.savedAt || 0) - (a.savedAt || 0); });
  }

  function renderBucket(host, items, type, bucket, emptyText) {
    if (!host) return;
    host.innerHTML = '';
    if (!items.length) {
      var empty = document.createElement('p');
      empty.className = 'collection-empty';
      empty.textContent = emptyText;
      host.appendChild(empty);
      return;
    }
    sorted(items).forEach(function (item) {
      host.appendChild(type === 'decor' ? renderDecorItem(item, bucket) : renderCardItem(item, bucket));
    });
  }

  function render() {
    if (!el.favDecor) return;
    var store = storage.getStore();
    updateStats(store);
    updateScope();

    renderBucket(el.favDecor, store.favorites.decor, 'decor', 'favorites', t('collection.emptyFavorites'));
    renderBucket(el.favCards, store.favorites.cards, 'card', 'favorites', t('collection.emptyFavorites'));
    renderBucket(el.histDecor, store.history.decor, 'decor', 'history', t('collection.emptyHistory'));
    renderBucket(el.histCards, store.history.cards, 'card', 'history', t('collection.emptyHistory'));

    if (el.clearHistory) el.clearHistory.hidden = !(store.history.decor.length || store.history.cards.length);
    // Draw any canvases that were inserted after IntersectionObserver callbacks.
    if (!observer) {
      document.querySelectorAll('.collection-thumb canvas').forEach(function (canvas) {
        if (canvas._zkDraw) canvas._zkDraw();
      });
    }
  }

  function scheduleRender() {
    if (renderTimer) clearTimeout(renderTimer);
    renderTimer = setTimeout(function () {
      renderTimer = 0;
      render();
    }, 80);
  }

  function setTab(tab, focus) {
    if (tab !== 'favorites' && tab !== 'history') return;
    activeTab = tab;
    [['favorites', el.tabFavorites, el.panelFavorites], ['history', el.tabHistory, el.panelHistory]].forEach(function (row) {
      var selected = row[0] === tab;
      if (row[1]) {
        row[1].setAttribute('aria-selected', String(selected));
        row[1].setAttribute('tabindex', selected ? '0' : '-1');
        row[1].classList.toggle('is-active', selected);
        if (selected && focus) row[1].focus();
      }
      if (row[2]) row[2].hidden = !selected;
    });
  }

  function bindTabs() {
    if (!el.tabFavorites || !el.tabHistory) return;
    el.tabFavorites.addEventListener('click', function () { setTab('favorites'); });
    el.tabHistory.addEventListener('click', function () { setTab('history'); });
    [el.tabFavorites, el.tabHistory].forEach(function (tab) {
      tab.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          var next = activeTab === 'favorites' ? 'history' : 'favorites';
          setTab(next, true);
        }
      });
    });
  }

  function exportBackup() {
    storage.downloadBackup();
    window.ZK.toast(t('collection.exportSuccess'), 'success');
  }

  function readFile(file) {
    if (file.text) return file.text();
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(String(reader.result || '')); };
      reader.onerror = function () { reject(reader.error); };
      reader.readAsText(file);
    });
  }

  function importBackup(file) {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      window.ZK.toast(t('collection.importInvalid'), 'error');
      return;
    }
    readFile(file).then(function (text) {
      var cleaned = storage.parseBackup(text);
      var count = storage.importStore(cleaned);
      window.ZK.toast(t('collection.importSuccess', { n: count }), 'success');
      scheduleRender();
    }).catch(function (error) {
      var message = error && error.message === 'invalid-backup' ? t('collection.importInvalid') : t('collection.importError');
      window.ZK.toast(message, 'error');
    });
    if (el.importFile) el.importFile.value = '';
  }

  function bind() {
    if (el.export) el.export.addEventListener('click', exportBackup);
    if (el.importFile) {
      el.importFile.addEventListener('change', function () {
        importBackup(el.importFile.files && el.importFile.files[0]);
      });
    }
    if (el.clearHistory) {
      el.clearHistory.addEventListener('click', function () {
        if (window.confirm(t('collection.confirmClear'))) {
          storage.clearHistory();
          window.ZK.toast(t('collection.historyCleared'), 'success');
          scheduleRender();
        }
      });
    }
    bindTabs();
    window.addEventListener('zk:storage', scheduleRender);
    window.addEventListener('zk:auth', function () {
      scheduleRender();
    });
    window.addEventListener('zk:lang', function () {
      render();
    });
  }

  function init() {
    el.scope = document.getElementById('collection-scope');
    el.promo = document.getElementById('guest-promo');
    el.google = document.getElementById('collection-google');
    el.statFavorites = document.getElementById('stat-favorites');
    el.statCards = document.getElementById('stat-cards');
    el.statHistory = document.getElementById('stat-history');
    el.tabFavorites = document.getElementById('tab-favorites');
    el.tabHistory = document.getElementById('tab-history');
    el.panelFavorites = document.getElementById('panel-favorites');
    el.panelHistory = document.getElementById('panel-history');
    el.favDecor = document.getElementById('favorites-decor');
    el.favCards = document.getElementById('favorites-cards');
    el.histDecor = document.getElementById('history-decor');
    el.histCards = document.getElementById('history-cards');
    el.export = document.getElementById('export-backup');
    el.importFile = document.getElementById('import-file');
    el.clearHistory = document.getElementById('clear-history');

    if (window.IntersectionObserver) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var canvas = entry.target;
            if (canvas._zkDraw) canvas._zkDraw();
            observer.unobserve(canvas);
          }
        });
      }, { rootMargin: '180px 0px' });
    }

    if (window.location.hash === '#history') setTab('history');
    else setTab('favorites');
    bind();
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();

  window.ZK.collection = { render: render };
})();
