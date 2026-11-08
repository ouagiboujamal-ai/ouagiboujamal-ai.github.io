/* ==========================================================================
   Zakhrafa — greeting card studio
   Canvas-only artwork, editable text, native share, setting-only favorites.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.ZK.config;
  var i18n = window.ZK.i18n;
  var data = window.ZK.data;
  var storage = window.ZK.storage;
  var templates = window.ZK.cardTemplates;

  var el = {};
  var state = {
    occasion: 'eid-fitr',
    name: '',
    greeting: '',
    greetingDirty: false,
    font: 'Cairo',
    color: '#f5e6b8',
    template: 0,
    size: 'square'
  };
  var renderFrame = 0;
  var hashTimer = 0;
  var thumbFrame = 0;
  var renderToken = 0;
  var fontsPromise = null;
  var drawReady = false;

  function t(key, vars) { return i18n.t(key, vars); }
  function occasion() { return data.getOccasion(state.occasion); }
  function sampleName() { return data.sampleName(i18n.getLang()); }
  function defaultGreeting(slug) {
    var occ = data.getOccasion(slug || state.occasion);
    return i18n.getLang() === 'ar' ? occ.greetingAr : occ.greetingEn;
  }
  function brandName() { return CFG.brand[i18n.getLang()]; }
  function canvasDims() {
    return state.size === 'story' ? { w: 1080, h: 1920 } : { w: 1080, h: 1080 };
  }

  function findOccasion(slug) {
    var occs = data.occasions;
    for (var i = 0; i < occs.length; i += 1) if (occs[i].slug === slug) return occs[i];
    return null;
  }

  function loadFonts() {
    if (fontsPromise) return fontsPromise;
    if (!document.fonts || !document.fonts.load) {
      fontsPromise = Promise.resolve();
      return fontsPromise;
    }
    var family = '"' + state.font + '", sans-serif';
    var sample = 'زخرفة Zakhrafa 0123';
    var jobs = [
      document.fonts.load('700 80px ' + family, sample),
      document.fonts.load('400 40px ' + family, sample),
      document.fonts.load('600 20px "Inter"', 'Zakhrafa'),
      document.fonts.load('600 20px "Cairo"', sample)
    ].map(function (p) { return p.catch(function () { return null; }); });
    fontsPromise = Promise.all(jobs).then(function () { return null; });
    return fontsPromise;
  }

  function drawOptions() {
    return {
      occasion: occasion(),
      name: state.name || sampleName(),
      greeting: state.greeting,
      font: state.font,
      color: state.color,
      template: state.template,
      lang: i18n.getLang(),
      brand: brandName()
    };
  }

  function prepareCanvas(canvas, w, h) {
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    var ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return ctx;
  }

  function drawMain() {
    if (!el.canvas) return;
    var dims = canvasDims();
    var ctx = prepareCanvas(el.canvas, dims.w, dims.h);
    templates.draw(ctx, dims.w, dims.h, drawOptions());
  }

  function renderPreview(force) {
    var token = ++renderToken;
    return loadFonts().then(function () {
      if (token !== renderToken && !force) return null;
      drawMain();
      drawReady = true;
      if (el.canvasStage) {
        el.canvasStage.classList.toggle('is-story', state.size === 'story');
        el.canvasStage.classList.toggle('is-square', state.size === 'square');
        el.canvasStage.classList.add('is-ready');
      }
      if (el.loading) el.loading.setAttribute('hidden', '');
      var canvas = el.canvas;
      canvas.setAttribute('aria-label', (i18n.getLang() === 'ar' ? 'معاينة بطاقة ' : 'Card preview for ') +
        (state.name || sampleName()) + ' — ' + (i18n.getLang() === 'ar' ? occasion().nameAr : occasion().nameEn));
      scheduleHash();
      return null;
    });
  }

  function schedulePreview(immediate) {
    if (immediate) {
      if (renderFrame) cancelAnimationFrame(renderFrame);
      renderFrame = 0;
      renderPreview(false);
      return;
    }
    if (renderFrame) cancelAnimationFrame(renderFrame);
    renderFrame = requestAnimationFrame(function () {
      renderFrame = 0;
      renderPreview(false);
    });
  }

  function thumbDraw(canvas, templateIndex) {
    var base = 300;
    var h = state.size === 'story' ? Math.round(base * 1920 / 1080) : base;
    var ctx = prepareCanvas(canvas, base, h);
    var opts = drawOptions();
    opts.template = templateIndex;
    templates.draw(ctx, base, h, opts);
  }

  function renderTemplates() {
    if (!el.templateGrid) return;
    var list = templates.getTemplates(state.occasion, i18n.getLang());
    el.templateGrid.innerHTML = '';
    list.forEach(function (template) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'template-option' + (template.index === state.template ? ' is-selected' : '');
      button.setAttribute('aria-pressed', String(template.index === state.template));
      button.setAttribute('aria-label', template.name);
      button.dataset.template = String(template.index);
      var frame = document.createElement('span');
      frame.className = 'template-canvas-frame';
      var canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = state.size === 'story' ? 533 : 300;
      canvas.setAttribute('aria-hidden', 'true');
      frame.appendChild(canvas);
      var label = document.createElement('span');
      label.className = 'template-label';
      label.textContent = template.name;
      button.appendChild(frame);
      button.appendChild(label);
      button.addEventListener('click', function () {
        if (state.template === template.index) return;
        state.template = template.index;
        renderTemplates();
        schedulePreview(true);
        scheduleHash();
      });
      el.templateGrid.appendChild(button);
      thumbDraw(canvas, template.index);
    });
    el.templateGrid.classList.toggle('is-story', state.size === 'story');
  }

  function scheduleTemplates() {
    if (thumbFrame) cancelAnimationFrame(thumbFrame);
    thumbFrame = requestAnimationFrame(function () {
      thumbFrame = 0;
      loadFonts().then(renderTemplates);
    });
  }

  function renderOccasions() {
    if (!el.occasionGrid) return;
    el.occasionGrid.innerHTML = '';
    data.occasions.forEach(function (occ) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'occasion-option' + (occ.slug === state.occasion ? ' is-selected' : '');
      button.setAttribute('aria-pressed', String(occ.slug === state.occasion));
      button.dataset.occasion = occ.slug;
      button.innerHTML = '<span class="occasion-icon" aria-hidden="true">' + occ.icon + '</span>' +
        '<span>' + (i18n.getLang() === 'ar' ? occ.nameAr : occ.nameEn) + '</span>';
      button.addEventListener('click', function () {
        state.occasion = occ.slug;
        state.template = Math.min(state.template, 3);
        state.greeting = defaultGreeting(occ.slug);
        state.greetingDirty = false;
        if (el.greeting) el.greeting.value = state.greeting;
        renderOccasions();
        renderTemplates();
        schedulePreview(true);
        scheduleHash();
      });
      el.occasionGrid.appendChild(button);
    });
  }

  function renderFontOptions() {
    if (!el.font) return;
    el.font.innerHTML = '';
    data.fonts.forEach(function (font) {
      var option = document.createElement('option');
      option.value = font.value;
      option.textContent = i18n.getLang() === 'ar' ? font.labelAr : font.labelEn;
      if (font.value === state.font) option.selected = true;
      el.font.appendChild(option);
    });
  }

  function renderColors() {
    if (!el.colorPresets) return;
    el.colorPresets.innerHTML = '';
    data.textColors.forEach(function (color) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'color-swatch' + (color.toLowerCase() === state.color.toLowerCase() ? ' is-selected' : '');
      button.style.setProperty('--swatch', color);
      button.setAttribute('aria-label', color);
      button.setAttribute('aria-pressed', String(color.toLowerCase() === state.color.toLowerCase()));
      button.addEventListener('click', function () {
        state.color = color;
        if (el.color) el.color.value = color;
        renderColors();
        schedulePreview(true);
        scheduleHash();
      });
      el.colorPresets.appendChild(button);
    });
    if (el.color) el.color.value = state.color;
  }

  function syncSizeButtons() {
    [['square', el.sizeSquare], ['story', el.sizeStory]].forEach(function (pair) {
      var button = pair[1];
      if (!button) return;
      var selected = state.size === pair[0];
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  function setSize(size) {
    if (size !== 'square' && size !== 'story') return;
    state.size = size;
    syncSizeButtons();
    schedulePreview(true);
    scheduleTemplates();
    scheduleHash();
  }

  function scheduleHash() {
    if (hashTimer) clearTimeout(hashTimer);
    hashTimer = setTimeout(updateHash, 220);
  }

  function shareParams() {
    var params = new URLSearchParams();
    params.set('occasion', state.occasion);
    if (state.name) params.set('name', state.name);
    params.set('t', String(state.template));
    params.set('font', state.font);
    params.set('color', state.color);
    params.set('size', state.size);
    if (state.greeting) params.set('greeting', state.greeting);
    return params;
  }

  function shareUrl() {
    var url = new URL(window.location.href);
    url.hash = shareParams().toString();
    return url.toString();
  }

  function updateHash() {
    try {
      var url = new URL(window.location.href);
      url.hash = shareParams().toString();
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
      }
    } catch (e) { /* ignore */ }
  }

  function hydrateFromHash() {
    var params;
    try { params = new URLSearchParams(window.location.hash.replace(/^#/, '')); } catch (e) { return; }
    if (!params || !params.toString()) return;
    var occ = findOccasion(params.get('occasion') || '');
    if (occ) state.occasion = occ.slug;
    if (params.has('name')) state.name = params.get('name').slice(0, 120);
    if (params.has('greeting')) {
      state.greeting = params.get('greeting').slice(0, 500);
      state.greetingDirty = true;
    } else {
      state.greeting = defaultGreeting(state.occasion);
    }
    if (params.has('t')) {
      var t = parseInt(params.get('t'), 10);
      if (Number.isFinite(t) && t >= 0 && t <= 3) state.template = t;
    }
    var font = params.get('font');
    if (font && data.fonts.some(function (f) { return f.value === font; })) state.font = font;
    var color = params.get('color');
    if (color && /^#[0-9a-fA-F]{6}$/.test(color)) state.color = color;
    var size = params.get('size');
    if (size === 'story' || size === 'square') state.size = size;
  }

  function setupFormFromState() {
    if (el.name) el.name.value = state.name;
    if (el.greeting) el.greeting.value = state.greeting;
    if (el.font) el.font.value = state.font;
    if (el.color) el.color.value = state.color;
    syncSizeButtons();
    renderColors();
    renderFontOptions();
    renderOccasions();
    renderTemplates();
  }

  function addCardHistory() {
    storage.addHistory('card', {
      settings: {
        occasion: state.occasion,
        name: state.name,
        greeting: state.greeting,
        font: state.font,
        color: state.color,
        template: state.template,
        size: state.size
      }
    });
  }

  function canvasBlob() {
    return new Promise(function (resolve, reject) {
      if (!el.canvas) { reject(new Error('no-canvas')); return; }
      el.canvas.toBlob(function (blob) {
        if (blob) resolve(blob);
        else reject(new Error('blob-failed'));
      }, 'image/png');
    });
  }

  function fileName() {
    return 'zakhrafa-' + state.occasion + (state.size === 'story' ? '-story' : '') + '.png';
  }

  function downloadBlob(blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName();
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1200);
  }

  function downloadCard() {
    renderPreview(true).then(canvasBlob).then(function (blob) {
      downloadBlob(blob);
      addCardHistory();
      window.ZK.toast(t('cards.downloadSuccess'), 'success');
    }).catch(function () {
      window.ZK.toast(t('common.error'), 'error');
    });
  }

  function showWhatsAppFallback() {
    if (!el.shareFallback || !el.whatsapp) return;
    var message = t('cards.shareTitle') + '\n' + shareUrl();
    el.whatsapp.href = 'https://wa.me/?text=' + encodeURIComponent(message);
    el.shareFallback.removeAttribute('hidden');
  }

  function shareCard() {
    if (!navigator.share || !window.File || !navigator.canShare) {
      renderPreview(true).then(canvasBlob).then(function (blob) {
        downloadBlob(blob);
        showWhatsAppFallback();
        addCardHistory();
        window.ZK.toast(t('cards.shareUnavailable') + ' ' + t('cards.fallbackNote'), 'success');
      }).catch(function () { window.ZK.toast(t('common.error'), 'error'); });
      return;
    }
    renderPreview(true).then(canvasBlob).then(function (blob) {
      var file = new File([blob], fileName(), { type: 'image/png' });
      if (!navigator.canShare({ files: [file] })) {
        downloadBlob(blob);
        showWhatsAppFallback();
        addCardHistory();
        window.ZK.toast(t('cards.shareUnavailable') + ' ' + t('cards.fallbackNote'), 'success');
        return;
      }
      navigator.share({
        files: [file],
        title: t('cards.shareTitle'),
        text: t('cards.shareTitle')
      }).then(function () {
        addCardHistory();
        window.ZK.toast(t('cards.shareSuccess'), 'success');
      }).catch(function (error) {
        if (error && error.name === 'AbortError') {
          window.ZK.toast(t('cards.shareCancelled'), 'success');
          return;
        }
        downloadBlob(blob);
        showWhatsAppFallback();
        addCardHistory();
        window.ZK.toast(t('cards.shareError') + ' ' + t('cards.fallbackNote'), 'error');
      });
    }).catch(function () {
      window.ZK.toast(t('common.error'), 'error');
    });
  }

  function saveCard() {
    updateHash();
    storage.addFavorite('card', {
      settings: {
        occasion: state.occasion,
        name: state.name,
        greeting: state.greeting,
        font: state.font,
        color: state.color,
        template: state.template,
        size: state.size
      }
    });
    addCardHistory();
    window.ZK.toast(t('cards.saveSuccess'), 'success');
    if (el.saveBtn) {
      el.saveBtn.classList.add('is-saved');
      setTimeout(function () { if (el.saveBtn) el.saveBtn.classList.remove('is-saved'); }, 1800);
    }
  }

  function copyLink() {
    updateHash();
    var url = shareUrl();
    Promise.resolve(storage.copyText(url)).then(function (result) {
      if (result === false) window.ZK.toast(t('common.error'), 'error');
      else window.ZK.toast(t('cards.copyLinkSuccess'), 'success');
    });
  }

  function bind() {
    if (el.name) {
      el.name.addEventListener('input', function () {
        state.name = el.name.value.slice(0, 120);
        state.greetingDirty = state.greetingDirty;
        schedulePreview();
        scheduleHash();
      });
    }
    if (el.greeting) {
      el.greeting.addEventListener('input', function () {
        state.greeting = el.greeting.value.slice(0, 500);
        state.greetingDirty = true;
        schedulePreview();
        scheduleHash();
      });
    }
    if (el.font) {
      el.font.addEventListener('change', function () {
        state.font = el.font.value;
        fontsPromise = null;
        schedulePreview(true);
        loadFonts().then(function () { scheduleTemplates(); });
        scheduleHash();
      });
    }
    if (el.color) {
      el.color.addEventListener('input', function () {
        state.color = /^#[0-9a-fA-F]{6}$/.test(el.color.value) ? el.color.value : '#f5e6b8';
        renderColors();
        schedulePreview(true);
        scheduleHash();
      });
    }
    if (el.sizeSquare) el.sizeSquare.addEventListener('click', function () { setSize('square'); });
    if (el.sizeStory) el.sizeStory.addEventListener('click', function () { setSize('story'); });
    if (el.download) el.download.addEventListener('click', downloadCard);
    if (el.share) el.share.addEventListener('click', shareCard);
    if (el.copyLink) el.copyLink.addEventListener('click', copyLink);
    if (el.saveBtn) el.saveBtn.addEventListener('click', saveCard);
    if (el.greeting) {
      el.greeting.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') el.greeting.blur();
      });
    }
    window.addEventListener('zk:lang', function () {
      if (!state.greetingDirty) {
        state.greeting = defaultGreeting(state.occasion);
        if (el.greeting) el.greeting.value = state.greeting;
      }
      renderFontOptions();
      renderOccasions();
      renderTemplates();
      schedulePreview(true);
      scheduleHash();
      loadFonts().then(scheduleTemplates);
    });
  }

  function init() {
    el.canvas = document.getElementById('card-canvas');
    if (!el.canvas) return;
    el.canvasStage = document.getElementById('canvas-stage');
    el.loading = document.getElementById('card-loading');
    el.occasionGrid = document.getElementById('occasion-grid');
    el.name = document.getElementById('card-name');
    el.greeting = document.getElementById('card-greeting');
    el.font = document.getElementById('card-font');
    el.color = document.getElementById('card-color');
    el.colorPresets = document.getElementById('color-presets');
    el.templateGrid = document.getElementById('template-grid');
    el.sizeSquare = document.getElementById('size-square');
    el.sizeStory = document.getElementById('size-story');
    el.download = document.getElementById('download-card');
    el.share = document.getElementById('share-card');
    el.copyLink = document.getElementById('copy-card-link');
    el.saveBtn = document.getElementById('save-card');
    el.shareFallback = document.getElementById('share-fallback');
    el.whatsapp = document.getElementById('whatsapp-share');

    state.greeting = defaultGreeting(state.occasion);
    hydrateFromHash();
    if (!state.greeting) state.greeting = defaultGreeting(state.occasion);
    setupFormFromState();
    bind();
    if (el.loading) el.loading.removeAttribute('hidden');
    renderPreview(true).then(function () {
      loadFonts().then(scheduleTemplates);
    });
    if (el.shareFallback) el.shareFallback.setAttribute('hidden', '');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();

  window.ZK.cards = {
    getState: function () { return Object.assign({}, state); },
    render: renderPreview
  };
})();
