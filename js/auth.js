/* ==========================================================================
   Zakhrafa — client-only Google Sign-In
   Loads Google Identity Services on demand, decodes the credential safely,
   stores only a minimal profile, and never deletes collection data.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.ZK.config;
  var storage = window.ZK.storage;
  var gsiPromise = null;
  var initPromise = null;
  var initialized = false;
  var lastError = null;

  function decodeBase64Url(input) {
    var base64 = String(input).replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    var binary = atob(base64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  function decodeJwtPayload(token) {
    try {
      var parts = String(token).split('.');
      if (parts.length < 2) return null;
      var bytes = decodeBase64Url(parts[1]);
      var json;
      if (window.TextDecoder) {
        json = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
      } else {
        json = decodeURIComponent(Array.prototype.map.call(bytes, function (b) {
          return '%' + ('00' + b.toString(16)).slice(-2);
        }).join(''));
      }
      var payload = JSON.parse(json);
      if (!payload || typeof payload.sub !== 'string' || !payload.sub) return null;
      return payload;
    } catch (e) {
      return null;
    }
  }

  function loadGoogle() {
    if (gsiPromise) return gsiPromise;
    gsiPromise = new Promise(function (resolve, reject) {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        resolve(window.google);
        return;
      }
      var existing = document.querySelector('script[data-zk-gsi]');
      if (existing) {
        existing.addEventListener('load', function () { resolve(window.google); });
        existing.addEventListener('error', function () { reject(new Error('gsi-load-error')); });
        return;
      }
      var script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.setAttribute('data-zk-gsi', '1');
      script.onload = function () {
        if (window.google && window.google.accounts && window.google.accounts.id) resolve(window.google);
        else reject(new Error('gsi-missing'));
      };
      script.onerror = function () { reject(new Error('gsi-load-error')); };
      document.head.appendChild(script);
    }).catch(function (error) {
      lastError = error;
      throw error;
    });
    return gsiPromise;
  }

  function emitAuth(user, extra) {
    try {
      window.dispatchEvent(new CustomEvent('zk:auth', {
        detail: Object.assign({ user: user || null }, extra || {})
      }));
    } catch (e) { /* ignore */ }
  }

  function handleCredential(response) {
    if (!response || !response.credential) return;
    var payload = decodeJwtPayload(response.credential);
    if (!payload) {
      lastError = new Error('invalid-jwt');
      emitAuth(storage.getSession(), { error: 'invalid-jwt' });
      return;
    }
    var user = storage.setSession({
      sub: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture
    });
    if (!user) return;
    var merged = storage.mergeGuestIntoUser(user.sub);
    emitAuth(user, { merged: merged, fresh: true });
  }

  function initialize() {
    if (initialized) return Promise.resolve(window.google);
    if (initPromise) return initPromise;
    initPromise = loadGoogle().then(function (google) {
      if (!google || !google.accounts || !google.accounts.id) throw new Error('gsi-missing');
      google.accounts.id.initialize({
        client_id: CFG.googleClientId,
        callback: handleCredential,
        auto_select: false,
        cancel_on_tap_outside: true,
        ux_mode: 'popup',
        use_fedcm_for_prompt: true
      });
      initialized = true;
      lastError = null;
      return google;
    }).catch(function (error) {
      // Let a later attempt retry if Google was temporarily unreachable.
      initPromise = null;
      throw error;
    });
    return initPromise;
  }

  function renderButtonInto(target, options) {
    if (!target) return Promise.resolve();
    options = options || {};
    return initialize().then(function (google) {
      target.innerHTML = '';
      var width = options.width || (window.innerWidth < 1150 ? 152 : 184);
      google.accounts.id.renderButton(target, {
        type: 'standard',
        theme: 'filled_black',
        size: 'large',
        text: 'signin_with',
        shape: 'pill',
        logo_alignment: 'left',
        locale: window.ZK.i18n.getLang() === 'ar' ? 'ar' : 'en',
        width: width
      });
      target.setAttribute('data-gsi-ready', 'true');
    }).catch(function (error) {
      lastError = error;
      target.innerHTML = '';
      var note = document.createElement('span');
      note.className = 'auth-unavailable';
      note.textContent = window.ZK.i18n.t('auth.unavailable');
      target.appendChild(note);
      target.setAttribute('data-gsi-error', 'true');
      emitAuth(storage.getSession(), { error: 'unavailable' });
    });
  }

  function login() {
    return initialize().then(function (google) {
      // A user gesture-friendly fallback: renderButton is the primary route.
      // prompt() is intentionally not called automatically.
      if (google && google.accounts && google.accounts.id && google.accounts.id.prompt) {
        google.accounts.id.prompt();
      }
    }).catch(function () { /* renderButton already explains */ });
  }

  function logout() {
    try {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.disableAutoSelect();
        if (window.google.accounts.id.cancel) window.google.accounts.id.cancel();
      }
    } catch (e) { /* ignore */ }
    storage.clearSession(); // Session only. Collections are never deleted.
    emitAuth(null, { signedOut: true });
  }

  function getUser() {
    return storage.getSession();
  }

  function isAvailable() {
    return !!(window.google && window.google.accounts && window.google.accounts.id && initialized);
  }

  window.ZK.auth = {
    getUser: getUser,
    initialize: initialize,
    renderButtonInto: renderButtonInto,
    logout: logout,
    login: login,
    loadGoogle: loadGoogle,
    isAvailable: isAvailable,
    lastError: function () { return lastError; },
    decodeJwtPayload: decodeJwtPayload
  };
})();
