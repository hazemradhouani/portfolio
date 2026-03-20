/* ============================================================
   Hazem Radhouani · Portfolio 2026 · main.js v11
   Fixes: back-to-top scroll threshold, card image fade-in,
   scroll progress bar, arrow key project navigation,
   page-entry focus, mobile menu backdrop close,
   image lazy load opacity, bfcache, reduced-motion guard.
   ============================================================ */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     CANONICAL PROJECT ORDER
  ───────────────────────────────────────────────────────── */
  window.portfolioLinks = [
    { slug: 'la-villette',   href: 'projects/project-la-villette.html',  title: 'La Villette' },
    { slug: 'foubert',       href: 'projects/project-foubert.html',       title: 'Foubert' },
    { slug: 'bolivar',       href: 'projects/project-bolivar.html',       title: 'Bolivar' },
    { slug: 'belhomme',      href: 'projects/project-belhomme.html',      title: 'Belhomme' },
    { slug: 'zenata',        href: 'projects/project-zenata.html',        title: 'Zenata Station' },
    { slug: 'sentry',        href: 'projects/project-sentry.html',        title: 'Sentry' },
    { slug: 'papillon',      href: 'projects/project-papillon.html',      title: 'Villa Papillon' },
    { slug: 'tamansourt',    href: 'projects/project-tamansourt.html',    title: 'Tamansourt Campus' },
    { slug: 'hay-mohammadi', href: 'projects/project-hay-mohammadi.html', title: 'Hay Mohammadi Station' },
    { slug: 'al-arg',        href: 'projects/project-al-arg.html',        title: 'Al-Arg' },
    { slug: 'corallum',      href: 'projects/project-corallum.html',      title: 'Corallum' },
    { slug: 'cinephile',     href: 'projects/project-cinephile.html',     title: 'Cinephile' }
  ];

  /* ─────────────────────────────────────────────────────────
     REDUCED MOTION helper
  ───────────────────────────────────────────────────────── */
  function prefersReducedMotion() {
    return window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  }

  /* ─────────────────────────────────────────────────────────
     BFCACHE — browser back/forward restore fix
  ───────────────────────────────────────────────────────── */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      document.body.classList.remove('is-leaving', 'is-leaving--forward', 'is-leaving--back');
      document.body.style.opacity       = '1';
      document.body.style.transform     = 'none';
      document.body.style.transition    = 'none';
      document.body.style.pointerEvents = '';
    }
  });

  /* ─────────────────────────────────────────────────────────
     NAV SCROLL SHADOW
  ───────────────────────────────────────────────────────── */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onNavScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onNavScroll();
  }

  /* ─────────────────────────────────────────────────────────
     PAGE-EXIT TRANSITION
  ───────────────────────────────────────────────────────── */
  function navigateTo(url, direction) {
    if (document.body.classList.contains('is-leaving')) return;
    if (prefersReducedMotion()) { window.location.href = url; return; }
    document.body.classList.add('is-leaving');
    if (direction === 'forward') document.body.classList.add('is-leaving--forward');
    if (direction === 'back')    document.body.classList.add('is-leaving--back');
    try { sessionStorage.setItem('nav-dir', direction || 'none'); } catch(e) {}
    setTimeout(function () { window.location.href = url; }, 370);
  }

  /* Apply enter direction on page load */
  (function () {
    if (prefersReducedMotion()) return;
    var dir = '';
    try { dir = sessionStorage.getItem('nav-dir') || ''; sessionStorage.removeItem('nav-dir'); } catch(e) {}
    if (dir === 'forward') document.body.classList.add('entering--forward');
    if (dir === 'back')    document.body.classList.add('entering--back');
    /* Move focus to main on directional entry — keyboard UX */
    if (dir === 'forward' || dir === 'back') {
      var main = document.getElementById('main');
      if (main) setTimeout(function () { try { main.focus(); } catch(e) {} }, 200);
    }
  }());

  /* Intercept internal <a> clicks for smooth exit */
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a[href]');
    if (!target) return;
    var href = target.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http') || href.startsWith('//') ||
        href.startsWith('mailto') || href.startsWith('tel')) return;
    if (target.getAttribute('target') === '_blank') return;
    if (href.startsWith('#')) return;
    var dir = 'none';
    if (target.classList.contains('proj-nav__link--next')) dir = 'forward';
    if (target.classList.contains('proj-nav__link--prev')) dir = 'back';
    e.preventDefault();
    navigateTo(href, dir);
  });

  /* ─────────────────────────────────────────────────────────
     SMOOTH SCROLL for pure same-page hash links
  ───────────────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a[href]');
    if (!target) return;
    var href = target.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    var el = document.getElementById(href.slice(1));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ─────────────────────────────────────────────────────────
     HOMEPAGE: reveal top-bar nav after hero scrolls out
  ───────────────────────────────────────────────────────── */
  var siteNav     = document.getElementById('site-nav');
  var heroSection = document.querySelector('.hero');
  if (siteNav && heroSection && document.body.classList.contains('page-home')) {
    var updateHeroNav = function () {
      var heroBottom = heroSection.getBoundingClientRect().bottom;
      siteNav.classList.toggle('nav--scrolled-past', heroBottom < 80);
    };
    window.addEventListener('scroll', updateHeroNav, { passive: true });
    updateHeroNav();
  }

  /* ─────────────────────────────────────────────────────────
     ARROW KEY PROJECT NAVIGATION
     ← / → arrows navigate between projects.
     Suppressed when focus is inside a form field.
  ───────────────────────────────────────────────────────── */
  (function () {
    var prevLink = document.querySelector('.proj-nav__link--prev');
    var nextLink = document.querySelector('.proj-nav__link--next');
    if (!prevLink && !nextLink) return;

    document.addEventListener('keydown', function (e) {
      var tag = document.activeElement ? document.activeElement.tagName : '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (document.activeElement && document.activeElement.isContentEditable) return;

      if (e.key === 'ArrowRight' && nextLink) {
        var nh = nextLink.getAttribute('href');
        if (nh) { e.preventDefault(); navigateTo(nh, 'forward'); }
      }
      if (e.key === 'ArrowLeft' && prevLink) {
        var ph = prevLink.getAttribute('href');
        if (ph) { e.preventDefault(); navigateTo(ph, 'back'); }
      }
    });
  }());

  /* ─────────────────────────────────────────────────────────
     SWIPE NAVIGATION — project pages (mobile)
  ───────────────────────────────────────────────────────── */
  (function () {
    var prevLink = document.querySelector('.proj-nav__link--prev');
    var nextLink = document.querySelector('.proj-nav__link--next');
    if (!prevLink && !nextLink) return;

    var touchStartX = 0, touchStartY = 0, touchMoveX = 0;
    var SWIPE_MIN = 72, SWIPE_RATIO = 1.2;
    var swiping = false, swipeLocked = false;

    document.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoveX = 0; swiping = false; swipeLocked = false;
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
      if (e.touches.length !== 1 || swipeLocked) return;
      touchMoveX = e.touches[0].clientX - touchStartX;
      var moveY  = e.touches[0].clientY - touchStartY;
      if (Math.abs(touchMoveX) > 10 || Math.abs(moveY) > 10) {
        if (Math.abs(touchMoveX) > Math.abs(moveY) * SWIPE_RATIO) {
          swiping = true; swipeLocked = true;
        } else { swipeLocked = true; }
      }
      if (swiping && !prefersReducedMotion()) {
        var clamped = Math.max(-28, Math.min(28, touchMoveX * 0.18));
        document.body.style.transform  = 'translateX(' + clamped + 'px)';
        document.body.style.transition = 'none';
      }
    }, { passive: true });

    document.addEventListener('touchend', function () {
      document.body.style.transform  = '';
      document.body.style.transition = '';
      if (!swiping) return;
      var dist = touchMoveX; swiping = false;
      if (dist < -SWIPE_MIN && nextLink) {
        var nh = nextLink.getAttribute('href');
        if (nh) navigateTo(nh, 'forward');
      } else if (dist > SWIPE_MIN && prevLink) {
        var ph = prevLink.getAttribute('href');
        if (ph) navigateTo(ph, 'back');
      }
    }, { passive: true });
  }());

  /* ─────────────────────────────────────────────────────────
     CARD PRESS FEEDBACK (mouse + touch)
  ───────────────────────────────────────────────────────── */
  var cards = document.querySelectorAll('.card');
  cards.forEach(function (card) {
    var add   = function () { card.classList.add('is-pressed'); };
    var clear = function () { card.classList.remove('is-pressed'); };
    card.addEventListener('mousedown',   add);
    card.addEventListener('mouseup',     clear);
    card.addEventListener('mouseleave',  clear);
    card.addEventListener('touchstart',  add,   { passive: true });
    card.addEventListener('touchend',    clear, { passive: true });
    card.addEventListener('touchcancel', clear, { passive: true });
  });

  /* ─────────────────────────────────────────────────────────
     IMAGE FADE-IN ON LOAD
     Cards: removes shimmer (.img-loaded) and fades in (.is-loaded).
     Gallery/project images: fades from 0 → 1 as they load.
  ───────────────────────────────────────────────────────── */
  /* Card thumbnails */
  document.querySelectorAll('.card__img').forEach(function (img) {
    var wrap = img.closest('.card__img-wrap');
    function markLoaded() {
      if (wrap) wrap.classList.add('img-loaded');
      img.classList.add('is-loaded');
    }
    if (img.complete && img.naturalWidth > 0) { markLoaded(); return; }
    img.addEventListener('load',  markLoaded);
    img.addEventListener('error', markLoaded);
  });

  /* Gallery / project images */
  document.querySelectorAll(
    '.proj-img, .proj-img-block img, .proj-render-full img, .proj-grid-item img, .vid-card__thumb'
  ).forEach(function (img) {
    if (img.complete && img.naturalWidth > 0) return;
    img.classList.add('is-loading');
    function onLoad() { img.classList.remove('is-loading'); }
    img.addEventListener('load',  onLoad);
    img.addEventListener('error', onLoad);
  });

  /* ─────────────────────────────────────────────────────────
     SCROLL REVEAL — about & project pages
  ───────────────────────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.cv-section, .about-contact, .proj-gallery-group');
  if (revealEls.length) {
    revealEls.forEach(function (el) { el.classList.add('will-reveal'); });
    if ('IntersectionObserver' in window) {
      var revObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('visible'); revObs.unobserve(en.target); }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' });
      revealEls.forEach(function (el) { revObs.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  /* ─────────────────────────────────────────────────────────
     SCROLL PROGRESS BAR
     Thin terracotta line under the nav on long-content pages.
     Only appears after the user starts scrolling.
  ───────────────────────────────────────────────────────── */
  (function () {
    if (!document.querySelector('.proj-content, .vid-section, .bk-section, .about')) return;

    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    var rafPending = false;
    function updateBar() {
      var scrollTop = window.scrollY;
      var docH      = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) { rafPending = false; return; }
      var pct = Math.min(100, (scrollTop / docH) * 100);
      bar.style.width = pct + '%';
      bar.classList.toggle('is-active', pct > 1);
      rafPending = false;
    }
    window.addEventListener('scroll', function () {
      if (!rafPending) { rafPending = true; requestAnimationFrame(updateBar); }
    }, { passive: true });
    updateBar();
  }());

  /* ─────────────────────────────────────────────────────────
     CONTACT FORM — Formsubmit.co
  ───────────────────────────────────────────────────────── */
  var form     = document.getElementById('contact-form');
  var feedback = document.getElementById('contact-feedback');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameEl    = form.querySelector('#cf-name');
      var emailEl   = form.querySelector('#cf-email');
      var subjectEl = form.querySelector('#cf-subject');
      var messageEl = form.querySelector('#cf-message');
      var hpEl      = form.querySelector('#cf-hp');
      var name    = nameEl    ? nameEl.value.trim()    : '';
      var email   = emailEl   ? emailEl.value.trim()   : '';
      var subject = subjectEl ? subjectEl.value.trim() : '';
      var message = messageEl ? messageEl.value.trim() : '';
      var hp      = hpEl      ? hpEl.value             : '';

      if (hp) { showFeedback('Message sent.', 'success'); return; }
      if (!name || !email || !subject || !message) {
        showFeedback('Please fill in all fields.', 'error'); return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback('Please enter a valid email address.', 'error'); return;
      }

      var submitBtn = form.querySelector('.contact-form__submit');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending\u2026'; }

      var data = new FormData();
      data.append('name',      name);
      data.append('email',     email);
      data.append('subject',   subject);
      data.append('message',   message);
      data.append('_subject',  'Portfolio enquiry from ' + name + ': ' + subject);
      data.append('_template', 'none');
      data.append('_captcha',  'false');
      data.append('_replyto',  email);

      fetch(form.action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: data })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          if (res.ok && (res.body.success === 'true' || res.body.success === true)) {
            showFeedback('Message sent. I will be in touch shortly.', 'success');
            form.reset();
          } else {
            showFeedback('Something went wrong. Please email hazemradhouani@gmail.com directly.', 'error');
          }
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = 'Send <span class="arr" aria-hidden="true">&rarr;</span>'; }
        })
        .catch(function () {
          showFeedback('Network error. Please email hazemradhouani@gmail.com directly.', 'error');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = 'Send <span class="arr" aria-hidden="true">&rarr;</span>'; }
        });
    });
  }

  function showFeedback(msg, type) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = 'contact-form__feedback is-' + type;
    setTimeout(function () { feedback.className = 'contact-form__feedback'; }, 7000);
  }

  /* ─────────────────────────────────────────────────────────
     BACK TO TOP
     Shows only after scrolling past 25% of the scrollable
     height (min 300px). Hides when back within 80px of top.
     Never visible on first page load.
  ───────────────────────────────────────────────────────── */
  (function () {
    var btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.setAttribute('type', 'button');
    btn.innerHTML =
      '<svg class="back-to-top__arrow" viewBox="0 0 11 11" fill="none" ' +
      'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<polyline points="1.5,7.5 5.5,2.5 9.5,7.5" ' +
      'stroke="currentColor" stroke-width="1.4" ' +
      'stroke-linecap="square" stroke-linejoin="miter"/>' +
      '</svg>';
    document.body.appendChild(btn);

    /* About page uses an inline back-to-top in the Send row */
    if (document.querySelector('.about-back-to-top')) {
      btn.style.display = 'none';
      return;
    }

    var threshold = 300; /* updated after layout */

    function calcThreshold() {
      threshold = Math.max(300,
        (document.documentElement.scrollHeight - window.innerHeight) * 0.25
      );
    }

    function updateBtt() {
      var y = window.scrollY;
      if (y > threshold)   btn.classList.add('is-visible');
      else if (y < 80)     btn.classList.remove('is-visible');
    }

    window.addEventListener('scroll', updateBtt, { passive: true });
    window.addEventListener('load',   function () { calcThreshold(); updateBtt(); });
    calcThreshold();
    updateBtt();

    /* Smooth ease-out-expo scroll to top */
    btn.addEventListener('click', function () {
      if (prefersReducedMotion()) { window.scrollTo(0, 0); return; }
      var startY    = window.scrollY;
      var startTime = null;
      var duration  = Math.min(180 + startY * 0.2, 820);
      var htmlEl    = document.documentElement;
      var prevBeh   = htmlEl.style.scrollBehavior;
      htmlEl.style.scrollBehavior = 'auto';

      function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
      function step(ts) {
        if (!startTime) startTime = ts;
        var p = Math.min((ts - startTime) / duration, 1);
        window.scrollTo(0, startY * (1 - easeOutExpo(p)));
        if (p < 1) { requestAnimationFrame(step); }
        else { htmlEl.style.scrollBehavior = prevBeh; }
      }
      requestAnimationFrame(step);
    });
  }());

  /* ─────────────────────────────────────────────────────────
     BOOKS READER — full-screen iframe overlay for Heyzine
  ───────────────────────────────────────────────────────── */
  (function () {
    var reader      = document.getElementById('books-reader');
    var readerFrame = document.getElementById('books-reader-iframe');
    var readerTitle = document.getElementById('books-reader-title');
    var readerClose = document.getElementById('books-reader-close');
    var readerFs    = document.getElementById('books-reader-fs');
    if (!reader || !readerFrame) return;

    var readerOpen = false, readerLast = null;

    function openReader(src, title) {
      if (readerOpen) return;
      readerOpen = true;
      readerLast = document.activeElement;
      if (readerTitle) readerTitle.textContent = title || '';
      readerFrame.src = src;
      reader.removeAttribute('aria-hidden');
      document.documentElement.style.overflow = 'hidden';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          reader.classList.add('is-open');
          try {
            var req = reader.requestFullscreen || reader.webkitRequestFullscreen ||
                      reader.mozRequestFullScreen || reader.msRequestFullscreen;
            if (req) req.call(reader);
          } catch(e) {}
          setTimeout(function () { try { readerClose.focus(); } catch(e) {} }, 80);
        });
      });
    }

    function closeReader() {
      if (!readerOpen) return;
      readerOpen = false;
      try {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
          (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        }
      } catch(e) {}
      reader.classList.remove('is-open');
      reader.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      setTimeout(function () {
        readerFrame.src = '';
        if (readerLast) { try { readerLast.focus(); } catch(e) {} }
      }, prefersReducedMotion() ? 0 : 420);
    }

    if (readerFs) {
      readerFs.addEventListener('click', function () {
        try {
          if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            (reader.requestFullscreen || reader.webkitRequestFullscreen).call(reader);
          } else {
            (document.exitFullscreen || document.webkitExitFullscreen).call(document);
          }
        } catch(e) {}
      });
    }

    document.addEventListener('fullscreenchange', function () {
      if (!document.fullscreenElement && readerOpen) closeReader();
    });
    document.addEventListener('webkitfullscreenchange', function () {
      if (!document.webkitFullscreenElement && readerOpen) closeReader();
    });

    if (readerClose) readerClose.addEventListener('click', closeReader);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && readerOpen) closeReader();
    });

    reader.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !readerOpen) return;
      var focusable = Array.prototype.slice.call(reader.querySelectorAll('button:not([disabled])'));
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
    });

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-book-src]');
      if (!btn) return;
      var src = btn.getAttribute('data-book-src');
      if (src) openReader(src, btn.getAttribute('data-book-title') || '');
    });

    reader.setAttribute('aria-hidden', 'true');
  }());

  /* ─────────────────────────────────────────────────────────
     MOBILE NAVIGATION v11
     Hamburger + full-screen overlay. CSS controls at ≤640px.
  ───────────────────────────────────────────────────────── */
  (function () {
    if (!nav) return;

    var path   = window.location.pathname;
    var inProj = path.indexOf('/projects/') !== -1;
    var pfx    = inProj ? '../' : '';

    function isCurrent(href) {
      var clean = href.replace(pfx, '').split('#')[0];
      if (clean === 'index.html') return path.endsWith('/') || path.endsWith('index.html');
      return path.indexOf(clean) !== -1;
    }

    var navLinks = [
      { href: pfx + 'index.html',         label: 'Work'    },
      { href: pfx + 'videos.html',        label: 'Videos'  },
      { href: pfx + 'about.html',         label: 'About'   },
      { href: pfx + 'about.html#contact', label: 'Contact' },
      { href: pfx + 'books.html',         label: 'Books'   }
    ];

    /* Menu overlay */
    var menu = document.createElement('div');
    menu.className     = 'mobile-menu';
    menu.id            = 'mobile-menu';
    menu.setAttribute('role',        'dialog');
    menu.setAttribute('aria-modal',  'true');
    menu.setAttribute('aria-label',  'Navigation');
    menu.setAttribute('aria-hidden', 'true');

    /* Backdrop — tap to close */
    var backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu__backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    menu.appendChild(backdrop);

    var ul = document.createElement('ul');
    ul.className = 'mobile-menu__list';
    ul.setAttribute('role', 'list');
    navLinks.forEach(function (lnk) {
      var li = document.createElement('li');
      var a  = document.createElement('a');
      a.href = lnk.href; a.textContent = lnk.label; a.className = 'mobile-menu__link';
      if (isCurrent(lnk.href)) a.setAttribute('aria-current', 'page');
      li.appendChild(a); ul.appendChild(li);
    });
    menu.appendChild(ul);

    var divider = document.createElement('div');
    divider.className = 'mobile-menu__divider';
    divider.setAttribute('aria-hidden', 'true');
    menu.appendChild(divider);

    var mFooter = document.createElement('div');
    mFooter.className = 'mobile-menu__footer';
    var liLink = document.createElement('a');
    liLink.href        = 'https://www.linkedin.com/in/hazem-radhouani-b36616319/';
    liLink.textContent = 'LinkedIn \u2197';
    liLink.className   = 'mobile-menu__footer-link';
    liLink.target      = '_blank';
    liLink.rel         = 'noopener noreferrer';
    mFooter.appendChild(liLink);
    menu.appendChild(mFooter);
    document.body.appendChild(menu);

    /* Hamburger */
    var burger = document.createElement('button');
    burger.className = 'nav__burger';
    burger.setAttribute('type',          'button');
    burger.setAttribute('aria-label',    'Open navigation');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'mobile-menu');
    burger.innerHTML =
      '<span class="nav__burger__line" aria-hidden="true"></span>' +
      '<span class="nav__burger__line" aria-hidden="true"></span>' +
      '<span class="nav__burger__line" aria-hidden="true"></span>';
    nav.appendChild(burger);

    var menuOpen = false, lastFocused = null;

    function openMenu() {
      if (menuOpen) return;
      menuOpen = true; lastFocused = document.activeElement;
      nav.classList.add('nav--open');
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-label',    'Close navigation');
      burger.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('menu-open');
      setTimeout(function () {
        var first = menu.querySelector('.mobile-menu__link');
        if (first) try { first.focus(); } catch(e) {}
      }, 380);
    }

    function closeMenu(restoreFocus) {
      if (!menuOpen) return;
      menuOpen = false;
      nav.classList.remove('nav--open');
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-label',    'Open navigation');
      burger.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('menu-open');
      if (restoreFocus !== false && lastFocused) try { lastFocused.focus(); } catch(e) {}
    }

    burger.addEventListener('click', function () { menuOpen ? closeMenu() : openMenu(); });
    backdrop.addEventListener('click', function () { closeMenu(); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(false); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOpen) { closeMenu(); try { burger.focus(); } catch(err) {} }
    });

    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !menuOpen) return;
      var focusable = Array.prototype.slice.call(menu.querySelectorAll('a'));
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); try { burger.focus(); } catch(err) {} }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); try { burger.focus(); } catch(err) {} }
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 640 && menuOpen) closeMenu();
    }, { passive: true });

  }());

})();
