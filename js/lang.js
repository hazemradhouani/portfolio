/* ══════════════════════════════════════════════════════
   LANG.JS — Language switcher runtime
   Hazem Radhouani Portfolio
   Depends on: translations.js (must load first)
   ══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Constants ────────────────────────────────────────── */
  var STORAGE_KEY = 'hr-lang';
  var DEFAULT_LANG = 'en';
  var LANG_ORDER = ['en', 'fr', 'es', 'ar', 'ja', 'de'];
  var fontsLoaded = {};

  /* ── Persistence ──────────────────────────────────────── */
  function getLang() {
    try {
      var l = localStorage.getItem(STORAGE_KEY);
      return (l && TRANSLATIONS[l]) ? l : DEFAULT_LANG;
    } catch (e) { return DEFAULT_LANG; }
  }

  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  /* ── Font loader (on demand) ──────────────────────────── */
  function loadFont(lang) {
    var meta = LANG_META[lang];
    if (!meta || !meta.font || fontsLoaded[meta.font]) return;
    fontsLoaded[meta.font] = true;

    var urls = {
      'noto-arabic': 'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500&display=swap',
      'noto-jp':     'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400&display=swap'
    };

    var url = urls[meta.font];
    if (!url) return;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }

  /* ── Apply translations to DOM ────────────────────────── */
  function applyLang(lang) {
    var T    = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    var meta = LANG_META[lang]    || LANG_META[DEFAULT_LANG];

    /* 1. HTML element: lang + dir */
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir',  meta.dir);

    /* 2. Text content nodes */
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var el  = els[i];
      var key = el.getAttribute('data-i18n');
      if (T[key] !== undefined) {
        el.textContent = T[key];
      }
    }

    /* 3. Placeholder attributes */
    var phs = document.querySelectorAll('[data-i18n-ph]');
    for (var j = 0; j < phs.length; j++) {
      var ph  = phs[j];
      var phk = ph.getAttribute('data-i18n-ph');
      if (T[phk] !== undefined) {
        ph.setAttribute('placeholder', T[phk]);
      }
    }

    /* 4. Aria-label attributes */
    var aels = document.querySelectorAll('[data-i18n-aria]');
    for (var k = 0; k < aels.length; k++) {
      var ael  = aels[k];
      var akey = ael.getAttribute('data-i18n-aria');
      if (T[akey] !== undefined) {
        ael.setAttribute('aria-label', T[akey]);
      }
    }

    /* 5. Load special fonts (Arabic, Japanese) */
    loadFont(lang);

    /* 6. RTL body class for fine-grained CSS targeting */
    if (meta.dir === 'rtl') {
      document.body.classList.add('is-rtl');
    } else {
      document.body.classList.remove('is-rtl');
    }

    /* 7. Sync all picker UI on page */
    syncPickerUI(lang);
  }

  /* ── Language picker UI ───────────────────────────────── */
  function createPickerHTML(currentLang) {
    var opts = LANG_ORDER.map(function (code) {
      var m = LANG_META[code];
      return '<li class="nav__lang-opt' + (code === currentLang ? ' is-active' : '') +
             '" role="option" aria-selected="' + (code === currentLang ? 'true' : 'false') +
             '" data-lang="' + code + '">' +
             '<span class="nav__lang-opt-code">' + m.code + '</span>' +
             '<span class="nav__lang-opt-name">' + m.name + '</span>' +
             '</li>';
    }).join('');

    return '<li class="nav__lang-item">' +
      '<button class="nav__lang-btn" type="button" aria-haspopup="listbox" aria-expanded="false"' +
      ' aria-label="' + (TRANSLATIONS[currentLang]['nav.lang.label'] || 'Change language') + '">' +
      '<span class="nav__lang-code">' + LANG_META[currentLang].code + '</span>' +
      '<svg class="nav__lang-chevron" viewBox="0 0 10 7" width="9" height="6" aria-hidden="true">' +
      '<polyline points="1,1 5,6 9,1" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="square" stroke-linejoin="miter"/>' +
      '</svg>' +
      '</button>' +
      '<ul class="nav__lang-drop" role="listbox" aria-label="Language">' +
      opts +
      '</ul>' +
      '</li>';
  }

  function injectPicker() {
    var navLists = document.querySelectorAll('.nav__links');
    if (!navLists.length) return;

    var currentLang = getLang();

    for (var n = 0; n < navLists.length; n++) {
      var navList = navLists[n];
      /* Avoid double injection */
      if (navList.querySelector('.nav__lang-item')) continue;

      navList.insertAdjacentHTML('beforeend', createPickerHTML(currentLang));

      /* Wire up events */
      var item = navList.querySelector('.nav__lang-item');
      bindPickerEvents(item);
    }
  }

  function bindPickerEvents(item) {
    var btn      = item.querySelector('.nav__lang-btn');
    var dropdown = item.querySelector('.nav__lang-drop');
    var opts     = item.querySelectorAll('.nav__lang-opt');

    /* Toggle dropdown */
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = item.classList.contains('is-open');
      closeAll();
      if (!isOpen) openDropdown(item, btn);
    });

    /* Select language */
    for (var i = 0; i < opts.length; i++) {
      (function (opt) {
        opt.addEventListener('click', function (e) {
          e.stopPropagation();
          var lang = opt.getAttribute('data-lang');
          saveLang(lang);
          applyLang(lang);
          closeAll();
        });
      })(opts[i]);
    }

    /* Keyboard navigation */
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var isOpen = item.classList.contains('is-open');
        closeAll();
        if (!isOpen) openDropdown(item, btn);
      }
      if (e.key === 'Escape') closeAll();
    });

    dropdown.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeAll(); btn.focus(); }
    });
  }

  function openDropdown(item, btn) {
    item.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeAll() {
    var items = document.querySelectorAll('.nav__lang-item.is-open');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('is-open');
      var b = items[i].querySelector('.nav__lang-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    }
  }

  function syncPickerUI(lang) {
    /* Update code label on button */
    var codes = document.querySelectorAll('.nav__lang-code');
    for (var i = 0; i < codes.length; i++) {
      codes[i].textContent = LANG_META[lang].code;
    }
    /* Update active option */
    var opts = document.querySelectorAll('.nav__lang-opt');
    for (var j = 0; j < opts.length; j++) {
      var isActive = opts[j].getAttribute('data-lang') === lang;
      opts[j].classList.toggle('is-active', isActive);
      opts[j].setAttribute('aria-selected', isActive ? 'true' : 'false');
    }
    /* Update button aria-label */
    var T = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    var btns = document.querySelectorAll('.nav__lang-btn');
    for (var k = 0; k < btns.length; k++) {
      btns[k].setAttribute('aria-label', T['nav.lang.label'] || 'Change language');
    }
  }

  /* ── Close on outside click / Escape ─────────────────── */
  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });

  /* ── Init on DOM ready ────────────────────────────────── */
  function init() {
    injectPicker();
    applyLang(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
