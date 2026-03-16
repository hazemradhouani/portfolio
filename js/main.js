/* ============================================================
   Hazem Radhouani · Portfolio 2026 · main.js v10
   Fixes: IntersectionObserver rootMargin CSS-var bug,
   portfolioLinks canonical list, reduced-motion swipe guard,
   cross-page hash transition, modal aria-hidden management.
   ============================================================ */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     CANONICAL PROJECT ORDER
     Single source of truth for grid order and prev/next nav.
     Paths are relative to the site root (index.html location).
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
     BFCACHE, browser back/forward button fix
     When the browser restores a page from bfcache the body
     can be frozen at opacity:0. pageshow fires on every
     restore; we reset all exit state so the page is visible.
  ───────────────────────────────────────────────────────── */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      document.body.classList.remove('is-leaving');
      document.body.style.opacity    = '1';
      document.body.style.transform  = 'none';
      document.body.style.transition = 'none';
      document.body.style.pointerEvents = '';
    }
  });

  /* ─────────────────────────────────────────────────────────
     NAV SCROLL SHADOW
  ───────────────────────────────────────────────────────── */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────────────────────────────────────────────────────
     PAGE-EXIT TRANSITION
     Exit: 420ms ease-silk upward fade.
     Navigate after 390ms (10ms buffer).
     Enter: bodyReveal 900ms ease-gentle rise from below.
  ───────────────────────────────────────────────────────── */
  function navigateTo(url, direction) {
    if (document.body.classList.contains('is-leaving')) return;
    if (prefersReducedMotion()) {
      window.location.href = url;
      return;
    }
    document.body.classList.add('is-leaving');
    if (direction === 'forward') document.body.classList.add('is-leaving--forward');
    if (direction === 'back')    document.body.classList.add('is-leaving--back');
    /* Store direction for the incoming page */
    try { sessionStorage.setItem('nav-dir', direction || 'none'); } catch(e){}
    setTimeout(function () {
      window.location.href = url;
    }, 390);
  }

  /* Apply enter direction on page load */
  (function () {
    if (prefersReducedMotion()) return;
    var dir = '';
    try { dir = sessionStorage.getItem('nav-dir') || ''; sessionStorage.removeItem('nav-dir'); } catch(e){}
    if (dir === 'forward') document.body.classList.add('entering--forward');
    if (dir === 'back')    document.body.classList.add('entering--back');
  }());

  /* Intercept internal <a> clicks for smooth exit.
     Skips: external, hash-only, mailto, tel, new-tab.
     FIX v10: cross-page hash links (e.g. about.html#contact)
     now correctly play the exit animation before navigating. */
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a[href]');
    if (!target) return;
    var href = target.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('mailto') ||
        href.startsWith('tel')) return;
    if (target.getAttribute('target') === '_blank') return;

    /* Pure same-page anchor, let the browser handle scroll */
    if (href.startsWith('#')) return;

    /* Cross-page link, animate exit then navigate.
       Detect direction from prev/next project nav links. */
    var dir = 'none';
    if (target.classList.contains('proj-nav__link--next')) dir = 'forward';
    if (target.classList.contains('proj-nav__link--prev')) dir = 'back';
    e.preventDefault();
    navigateTo(href, dir);
  });

  /* ─────────────────────────────────────────────────────────
     SMOOTH SCROLL for pure hash links on the same page
  ───────────────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a[href]');
    if (!target) return;
    var href = target.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    var id = href.slice(1);
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });


  /* ─────────────────────────────────────────────────────────
     HOMEPAGE: reveal top nav links after scrolling past hero.
     FIX v10: rootMargin was using a CSS variable string which
     IntersectionObserver cannot resolve. Use the literal px
     value matching --nav-h: 56px.
  ───────────────────────────────────────────────────────── */
  var siteNav     = document.getElementById('site-nav');
  var heroSection = document.querySelector('.hero');
  if (siteNav && heroSection && document.body.classList.contains('page-home')) {
    var heroObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        siteNav.classList.toggle('nav--scrolled-past', !en.isIntersecting);
      });
    }, { threshold: 0, rootMargin: '-56px 0px 0px 0px' }); /* --nav-h = 56px */
    heroObserver.observe(heroSection);
    /* Belt-and-braces scroll listener for finer threshold control */
    window.addEventListener('scroll', function () {
      var heroBottom = heroSection.getBoundingClientRect().bottom;
      siteNav.classList.toggle('nav--scrolled-past', heroBottom < 80);
    }, { passive: true });
  }


  /* HERO NAV, "Work" link: handled by global hash-scroll listener above. */


  /* ─────────────────────────────────────────────────────────
     SWIPE NAVIGATION, project pages (mobile)
     FIX v10: swipe "follow finger" transform is suppressed
     when prefers-reduced-motion is set.
  ───────────────────────────────────────────────────────── */
  (function () {
    var prevLink = document.querySelector('.proj-nav__link--prev');
    var nextLink = document.querySelector('.proj-nav__link--next');
    if (!prevLink && !nextLink) return;

    var touchStartX = 0;
    var touchStartY = 0;
    var touchMoveX  = 0;
    var SWIPE_MIN   = 72;
    var SWIPE_RATIO = 1.2;
    var swiping     = false;
    var swipeLocked = false;

    document.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoveX  = 0;
      swiping     = false;
      swipeLocked = false;
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
      if (e.touches.length !== 1 || swipeLocked) return;
      touchMoveX = e.touches[0].clientX - touchStartX;
      var moveY  = e.touches[0].clientY - touchStartY;

      if (Math.abs(touchMoveX) > 10 || Math.abs(moveY) > 10) {
        if (Math.abs(touchMoveX) > Math.abs(moveY) * SWIPE_RATIO) {
          swiping = true;
          swipeLocked = true;
        } else {
          swipeLocked = true;
        }
      }

      /* Subtle page follow, suppressed when reduced motion preferred */
      if (swiping && !prefersReducedMotion()) {
        var clamp = Math.max(-24, Math.min(24, touchMoveX * 0.18));
        document.body.style.transform = 'translateX(' + clamp + 'px)';
        document.body.style.transition = 'none';
      }
    }, { passive: true });

    document.addEventListener('touchend', function () {
      document.body.style.transform  = '';
      document.body.style.transition = '';

      if (!swiping) return;
      var dist = touchMoveX;
      swiping = false;

      if (dist < -SWIPE_MIN && nextLink) {
        var nextHref = nextLink.getAttribute('href');
        if (nextHref) navigateTo(nextHref, 'forward');
      } else if (dist > SWIPE_MIN && prevLink) {
        var prevHref = prevLink.getAttribute('href');
        if (prevHref) navigateTo(prevHref, 'back');
      }
    }, { passive: true });
  }());


  /* ─────────────────────────────────────────────────────────
     BOOKS MODAL
     FIX v10: added aria-hidden management on #main and nav
     so screen readers cannot browse background content while
     modal is open.
  ───────────────────────────────────────────────────────── */
  var modal       = document.getElementById('books-modal');
  var openBtns    = document.querySelectorAll('[data-open-books]');
  var closeBtns   = document.querySelectorAll('[data-close-books]');
  var lastFocused = null;

  /* Elements that should be hidden from AT when modal is open */
  var bgRegions = [
    document.getElementById('main') || document.querySelector('main'),
    document.querySelector('header'),
    document.querySelector('footer'),
    document.querySelector('.proj-nav')
  ].filter(Boolean);

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    /* Lock scroll without causing a jump: record current position,
       freeze body at that position so the page doesn't shift */
    var scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollY + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    document.body.dataset.scrollY = scrollY;
    bgRegions.forEach(function (el) { el.setAttribute('aria-hidden', 'true'); });
    /* Step 1: remove aria-hidden to clear visibility:hidden immediately.
       Step 2: add is-open one rAF later so the browser paints the element
       as visible BEFORE the opacity/transform transition starts.
       Without this split the transition fires from a visibility:hidden
       state on the first open, which is why it appeared frozen. */
    modal.removeAttribute('aria-hidden');
    requestAnimationFrame(function () {
      modal.classList.add('is-open');
      var first = modal.querySelector('a[href], button:not([disabled])');
      if (first) setTimeout(function () { first.focus(); }, 80);
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    /* Restore scroll position exactly — undo the position:fixed lock */
    var scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY);
    bgRegions.forEach(function (el) { el.removeAttribute('aria-hidden'); });
    if (lastFocused) setTimeout(function () { lastFocused.focus(); }, 50);
  }

  /* Set initial aria-hidden so the modal is inert on page load */
  if (modal) modal.setAttribute('aria-hidden', 'true');

  for (var o = 0; o < openBtns.length; o++) openBtns[o].addEventListener('click', openModal);
  for (var c = 0; c < closeBtns.length; c++) closeBtns[c].addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
  });

  /* Focus trap inside modal */
  if (modal) {
    modal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !modal.classList.contains('is-open')) return;
      var focusable = Array.prototype.slice.call(
        modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
      if (!focusable.length) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     CARD PRESS FEEDBACK
  ───────────────────────────────────────────────────────── */
  var cards = document.querySelectorAll('.card');
  cards.forEach(function (card) {
    card.addEventListener('mousedown', function () { card.classList.add('is-pressed'); });
    var clear = function () { card.classList.remove('is-pressed'); };
    card.addEventListener('mouseup',    clear);
    card.addEventListener('mouseleave', clear);
  });

  /* ─────────────────────────────────────────────────────────
     IMAGE SHIMMER, remove once image loads
  ───────────────────────────────────────────────────────── */
  var cardImages = document.querySelectorAll('.card__img');
  cardImages.forEach(function (img) {
    var wrap = img.closest('.card__img-wrap');
    if (!wrap) return;
    function markLoaded() { wrap.classList.add('img-loaded'); }
    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load',  markLoaded);
      img.addEventListener('error', markLoaded);
    }
  });

  /* HERO SCROLL ARROW, handled by global hash-scroll listener above. */

  /* ─────────────────────────────────────────────────────────
     SCROLL REVEAL, about & project pages
  ───────────────────────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.cv-section, .about-contact, .proj-gallery-group');
  if (revealEls.length) {
    revealEls.forEach(function (el) { el.classList.add('will-reveal'); });
    if ('IntersectionObserver' in window) {
      var revObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('visible');
            revObs.unobserve(en.target);
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' });
      revealEls.forEach(function (el) { revObs.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  /* ─────────────────────────────────────────────────────────
     CONTACT FORM, Formsubmit.co
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

      /* Honeypot */
      if (hp) { showFeedback('Message sent.', 'success'); return; }

      if (!name || !email || !subject || !message) {
        showFeedback('Please fill in all fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      var submitBtn = form.querySelector('.contact-form__submit');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      var data = new FormData();
      data.append('name',      name);
      data.append('email',     email);
      data.append('subject',   subject);
      data.append('message',   message);
      data.append('_subject',  'Portfolio enquiry from ' + name + ': ' + subject);
      data.append('_template', 'none');
      data.append('_captcha',  'false');
      data.append('_replyto',  email);

      fetch(form.action, {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    data
      })
      .then(function (r) {
        return r.json().then(function (j) { return { ok: r.ok, body: j }; });
      })
      .then(function (res) {
        if (res.ok && (res.body.success === 'true' || res.body.success === true)) {
          showFeedback('Message sent. I will be in touch shortly.', 'success');
          form.reset();
        } else {
          showFeedback('Something went wrong. Please email hazemradhouani@gmail.com directly.', 'error');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send <span class="arr" aria-hidden="true">&rarr;</span>';
        }
      })
      .catch(function () {
        showFeedback('Network error. Please email hazemradhouani@gmail.com directly.', 'error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send <span class="arr" aria-hidden="true">&rarr;</span>';
        }
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
     Injected once here, auto-appears on every page.
     Shows when the user has scrolled past the halfway point
     of the scrollable distance. Stays visible from that point
     onward; hides only when back within 60px of the top.
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

    /* Add is-visible after a short delay so CSS transition plays on load */
    setTimeout(function () {
      btn.classList.add('is-visible');
    }, 120);

    /* On the about page, hide the floating button — the inline
       about-back-to-top inside the Send row handles that page. */
    if (document.querySelector('.about-back-to-top')) {
      btn.style.display = 'none';
    }

    /* Smooth scroll to top, custom eased animation.
       Native behavior:'smooth' varies between browsers and can feel
       mechanical. This uses an ease-out-expo curve via rAF for a
       deceleration that feels natural, anticipated and relaxed:
       fast at first, then gliding gently to rest at the top. */
    btn.addEventListener('click', function () {
      if (prefersReducedMotion()) {
        window.scrollTo(0, 0);
        return;
      }
      var startY    = window.scrollY;
      var startTime = null;
      /* Duration scales with distance: short scrolls feel snappy,
         long scrolls glide. Cap at 820ms so nothing feels sluggish. */
      var duration  = Math.min(180 + startY * 0.2, 820);

      /* Temporarily override scroll-behavior:smooth on <html> so the
         browser doesn't try to additionally smooth our already-eased
         manual increments (double-smooth creates a jittery crawl). */
      var htmlEl = document.documentElement;
      var prevBehavior = htmlEl.style.scrollBehavior;
      htmlEl.style.scrollBehavior = 'auto';

      /* Ease-out-expo: rapid departure, long smooth glide to rest */
      function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed  = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased    = easeOutExpo(progress);
        window.scrollTo(0, startY * (1 - eased));
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          /* Restore scroll-behavior after animation completes */
          htmlEl.style.scrollBehavior = prevBehavior;
        }
      }

      requestAnimationFrame(step);
    });

  }());

})();
