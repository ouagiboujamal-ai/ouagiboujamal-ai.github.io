/* ==========================================================================
   Zakhrafa — progressive enhancements: reveal animations + PWA registration
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (item) { observer.observe(item); });
  }

  function bindCopyEmail() {
    var buttons = document.querySelectorAll('[data-copy-email]');
    Array.prototype.forEach.call(buttons, function (button) {
      if (button.getAttribute('data-bound') === '1') return;
      button.setAttribute('data-bound', '1');
      button.addEventListener('click', function () {
        var email = button.getAttribute('data-copy-email') || '';
        if (!email || !window.ZK.storage) return;
        Promise.resolve(window.ZK.storage.copyText(email)).then(function (result) {
          var ok = result !== false;
          window.ZK.toast(window.ZK.i18n.t(ok ? 'common.emailCopied' : 'common.error'), ok ? 'success' : 'error');
        });
      });
    });
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { scope: './' }).catch(function () {
        // A service worker is optional; the site works without it.
      });
    }, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      bindCopyEmail();
      reveal();
      registerServiceWorker();
    }, { once: true });
  } else {
    bindCopyEmail();
    reveal();
    registerServiceWorker();
  }

  // Re-run reveal when pages inject new content (collection, card studio).
  window.addEventListener('zk:layout-ready', reveal);
  window.addEventListener('zk:storage', function () { setTimeout(reveal, 120); });
})();
