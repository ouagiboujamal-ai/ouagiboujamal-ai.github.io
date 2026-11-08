/* ==========================================================================
   Zakhrafa — local collections, account sessions, merge + backup
   Nothing here ever writes to a server. Logout clears the session only.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.ZK.config;
  var PREFIX = CFG.storagePrefix;
  var GUEST_KEY = PREFIX + '_guest';
  var SESSION_KEY = PREFIX + '_session';
  var MAX_ITEMS = 120;
  var MAX_HISTORY = 40;

  var VALID_FONTS = ['Cairo', 'Amiri', 'Reem Kufi', 'Tajawal'];
  var VALID_SIZES = ['square', 'story'];

  function now() { return Date.now(); }

  function safeParse(raw, fallback) {
    if (!raw) return fallback;
    try {
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function readRaw(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function writeRaw(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  function validText(value, max) {
    if (typeof value !== 'string') return '';
    return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
  }

  function validColor(value) {
    return /^#[0-9a-fA-F]{6}$/.test(String(value || '')) ? value : '#f5e6b8';
  }

  function validId(value) {
    if (typeof value !== 'string') return '';
    return value.replace(/[^a-zA-Z0-9:_-]/g, '').slice(0, 120);
  }

  function hash(value) {
    var str = String(value);
    var h = 5381;
    for (var i = 0; i < str.length; i += 1) {
      h = ((h << 5) + h) ^ str.charCodeAt(i);
    }
    return (h >>> 0).toString(36);
  }

  function sanitizeSettings(input) {
    var s = input && typeof input === 'object' ? input : {};
    return {
      occasion: validText(s.occasion, 40) || 'birthday',
      name: validText(s.name, 120),
      greeting: validText(s.greeting, 500),
      font: VALID_FONTS.indexOf(s.font) !== -1 ? s.font : 'Cairo',
      color: validColor(s.color),
      template: Math.max(0, Math.min(3, parseInt(s.template, 10) || 0)),
      size: VALID_SIZES.indexOf(s.size) !== -1 ? s.size : 'square'
    };
  }

  function cardId(settings) {
    var s = sanitizeSettings(settings);
    return 'card_' + hash([s.occasion, s.name, s.greeting, s.font, s.color, s.template, s.size].join('|'));
  }

  function decorId(text, styleId) {
    return 'decor_' + hash(String(styleId || 'custom') + '|' + String(text || ''));
  }

  function sanitizeItem(input, type) {
    if (!input || typeof input !== 'object') return null;
    var savedAt = parseInt(input.savedAt || input.createdAt || input.at, 10);
    if (!Number.isFinite(savedAt) || savedAt <= 0) savedAt = now();

    if (type === 'decor') {
      var text = validText(input.text, 220);
      if (!text) return null;
      var styleId = validId(input.styleId) || 'custom';
      var styleName = validText(input.styleName, 90) || 'Decoration';
      return {
        id: validId(input.id) || ('decor_' + hash(styleId + '|' + text)),
        type: 'decor',
        text: text,
        source: validText(input.source, 60),
        styleId: styleId,
        styleName: styleName,
        lang: input.lang === 'en' ? 'en' : 'ar',
        savedAt: savedAt
      };
    }

    var settings = sanitizeSettings(input.settings);
    if (!settings.name && !settings.greeting) return null;
    return {
      id: validId(input.id) || cardId(settings),
      type: 'card',
      settings: settings,
      savedAt: savedAt
    };
  }

  function emptyStore() {
    return {
      version: 1,
      favorites: { decor: [], cards: [] },
      history: { decor: [], cards: [] },
      updatedAt: now()
    };
  }

  function sanitizeStore(input) {
    var store = emptyStore();
    if (!input || typeof input !== 'object') return store;
    ['favorites', 'history'].forEach(function (bucket) {
      var source = input[bucket] && typeof input[bucket] === 'object' ? input[bucket] : {};
      var decor = Array.isArray(source.decor) ? source.decor : [];
      var cards = Array.isArray(source.cards) ? source.cards : [];
      var limit = bucket === 'favorites' ? MAX_ITEMS : MAX_HISTORY;
      store[bucket].decor = decor.map(function (item) { return sanitizeItem(item, 'decor'); })
        .filter(Boolean).slice(0, limit);
      store[bucket].cards = cards.map(function (item) { return sanitizeItem(item, 'card'); })
        .filter(Boolean).slice(0, limit);
    });
    store.updatedAt = parseInt(input.updatedAt, 10) || now();
    return store;
  }

  function getSession() {
    var profile = safeParse(readRaw(SESSION_KEY), null);
    if (!profile || typeof profile.sub !== 'string' || !profile.sub) return null;
    return {
      sub: profile.sub,
      name: validText(profile.name, 120) || 'Google user',
      email: validText(profile.email, 180),
      picture: typeof profile.picture === 'string' && /^https:\/\//.test(profile.picture) ? profile.picture : '',
      loggedInAt: parseInt(profile.loggedInAt, 10) || now()
    };
  }

  function setSession(profile) {
    if (!profile || !profile.sub) return null;
    var minimal = {
      sub: String(profile.sub).slice(0, 120),
      name: validText(profile.name, 120) || 'Google user',
      email: validText(profile.email, 180),
      picture: typeof profile.picture === 'string' && /^https:\/\//.test(profile.picture) ? profile.picture : '',
      loggedInAt: now()
    };
    writeRaw(SESSION_KEY, JSON.stringify(minimal));
    return minimal;
  }

  function clearSession() {
    // Never touch zk_guest or zk_user_* here.
    try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
  }

  function activeSub() {
    var session = getSession();
    return session ? session.sub : null;
  }

  function scopeKey(sub) {
    return sub ? PREFIX + '_user_' + sub : GUEST_KEY;
  }

  function readScope(sub) {
    var parsed = safeParse(readRaw(scopeKey(sub)), null);
    return sanitizeStore(parsed);
  }

  function writeScope(sub, store) {
    store.updatedAt = now();
    return writeRaw(scopeKey(sub), JSON.stringify(sanitizeStore(store)));
  }

  function getStore(sub) {
    var target = arguments.length ? sub : activeSub();
    return readScope(target);
  }

  function emit(type, detail) {
    try {
      window.dispatchEvent(new CustomEvent('zk:storage', { detail: Object.assign({ type: type }, detail || {}) }));
    } catch (e) { /* CustomEvent unavailable in very old browsers */ }
  }

  function mergeBucket(target, source, limit) {
    var seen = {};
    var merged = [];
    var count = 0;
    target.forEach(function (item) {
      if (!item || seen[item.id]) return;
      seen[item.id] = true;
      merged.push(item);
    });
    source.forEach(function (item) {
      if (!item || !item.id) return;
      if (seen[item.id]) {
        // Keep the more recent version without creating a duplicate.
        for (var i = 0; i < merged.length; i += 1) {
          if (merged[i].id === item.id && item.savedAt > merged[i].savedAt) merged[i] = item;
        }
        return;
      }
      seen[item.id] = true;
      merged.push(item);
      count += 1;
    });
    merged.sort(function (a, b) { return (b.savedAt || 0) - (a.savedAt || 0); });
    return { items: merged.slice(0, limit), count: count };
  }

  function mergeIntoStore(target, source) {
    var total = 0;
    ['favorites', 'history'].forEach(function (bucket) {
      ['decor', 'cards'].forEach(function (kind) {
        var limit = bucket === 'favorites' ? MAX_ITEMS : MAX_HISTORY;
        var merged = mergeBucket(target[bucket][kind], source[bucket][kind], limit);
        target[bucket][kind] = merged.items;
        total += merged.count;
      });
    });
    target.updatedAt = now();
    return total;
  }

  function addFavorite(type, data) {
    var sub = activeSub();
    var store = readScope(sub);
    var item = sanitizeItem(data, type);
    if (!item) return null;
    var array = type === 'decor' ? store.favorites.decor : store.favorites.cards;
    var existing = -1;
    array.forEach(function (entry, index) { if (entry.id === item.id) existing = index; });
    if (existing >= 0) array.splice(existing, 1);
    array.unshift(item);
    store.favorites[type === 'decor' ? 'decor' : 'cards'] = array.slice(0, MAX_ITEMS);
    writeScope(sub, store);
    emit('favorite-added', { item: item, type: type });
    return item;
  }

  function addHistory(type, data) {
    var sub = activeSub();
    var store = readScope(sub);
    var item = sanitizeItem(data, type);
    if (!item) return null;
    var key = type === 'decor' ? 'decor' : 'cards';
    var array = store.history[key].filter(function (entry) { return entry.id !== item.id; });
    array.unshift(item);
    store.history[key] = array.slice(0, MAX_HISTORY);
    writeScope(sub, store);
    emit('history-added', { item: item, type: type });
    return item;
  }

  function removeFavorite(type, id) {
    var sub = activeSub();
    var store = readScope(sub);
    var key = type === 'decor' ? 'decor' : 'cards';
    store.favorites[key] = store.favorites[key].filter(function (item) { return item.id !== id; });
    writeScope(sub, store);
    emit('favorite-removed', { id: id, type: type });
  }

  function clearHistory() {
    var sub = activeSub();
    var store = readScope(sub);
    store.history.decor = [];
    store.history.cards = [];
    writeScope(sub, store);
    emit('history-cleared', {});
  }

  function mergeGuestIntoUser(sub) {
    if (!sub) return 0;
    var guest = readScope(null);
    var user = readScope(sub);
    var count = mergeIntoStore(user, guest);
    if (count > 0) writeScope(sub, user);
    emit('guest-merged', { count: count, sub: sub });
    return count;
  }

  function exportPayload() {
    var sub = activeSub();
    var store = readScope(sub);
    return {
      app: 'zakhrafa',
      version: 1,
      exportedAt: new Date().toISOString(),
      scope: sub ? 'account' : 'guest',
      data: {
        favorites: store.favorites,
        history: store.history
      }
    };
  }

  function looksLikeBackup(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) return false;
    var source = input.data && typeof input.data === 'object' ? input.data : (input.favorites ? input : null);
    if (!source) return false;
    var fav = source.favorites;
    var hist = source.history;
    if (!fav || typeof fav !== 'object' || !hist || typeof hist !== 'object') return false;
    return Array.isArray(fav.decor) && Array.isArray(fav.cards)
      && Array.isArray(hist.decor) && Array.isArray(hist.cards);
  }

  function parseBackup(text) {
    var parsed;
    try { parsed = JSON.parse(text); } catch (e) { throw new Error('invalid-json'); }
    if (!looksLikeBackup(parsed)) throw new Error('invalid-backup');
    var source = parsed.data || parsed;
    var cleaned = sanitizeStore({
      favorites: source.favorites,
      history: source.history
    });
    var total = cleaned.favorites.decor.length + cleaned.favorites.cards.length
      + cleaned.history.decor.length + cleaned.history.cards.length;
    if (total === 0 && !(source.favorites.decor.length || source.favorites.cards.length || source.history.decor.length || source.history.cards.length)) {
      throw new Error('empty-backup');
    }
    return cleaned;
  }

  function importStore(incoming) {
    var sub = activeSub();
    var current = readScope(sub);
    var count = mergeIntoStore(current, incoming);
    writeScope(sub, current);
    emit('backup-imported', { count: count });
    return count;
  }

  function downloadBackup() {
    var payload = exportPayload();
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'zakhrafa-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    return payload;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      ta.style.pointerEvents = 'none';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (e) {
      return false;
    }
  }

  window.ZK.storage = {
    prefix: PREFIX,
    guestKey: GUEST_KEY,
    sessionKey: SESSION_KEY,
    activeSub: activeSub,
    getSession: getSession,
    setSession: setSession,
    clearSession: clearSession,
    getStore: getStore,
    readScope: readScope,
    cardId: cardId,
    decorId: decorId,
    sanitizeSettings: sanitizeSettings,
    addFavorite: addFavorite,
    addHistory: addHistory,
    removeFavorite: removeFavorite,
    clearHistory: clearHistory,
    mergeGuestIntoUser: mergeGuestIntoUser,
    exportPayload: exportPayload,
    looksLikeBackup: looksLikeBackup,
    parseBackup: parseBackup,
    importStore: importStore,
    downloadBackup: downloadBackup,
    copyText: copyText
  };
})();
