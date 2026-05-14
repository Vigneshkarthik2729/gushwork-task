/* ============================================================
   STICKY ANNOUNCEMENT HEADER + CAROUSEL ZOOM
   Add this JS to the bottom of your script.js (or include as
   a separate <script> before </body>)
   ============================================================ */

/* ----------------------------------------------------------
   1. STICKY ANNOUNCEMENT HEADER
   ----------------------------------------------------------
   Behaviour:
   • Appears (slides down) once user scrolls past the hero fold
   • Disappears (slides up) when user scrolls back near the top
   • "×" button permanently dismisses for the session
   ---------------------------------------------------------- */
(function initStickyAnnouncement() {
  'use strict';

  /* ── Inject the HTML banner ────────────────────────────── */
  var banner = document.createElement('div');
  banner.className = 'sticky-announcement';
  banner.setAttribute('role', 'banner');
  banner.setAttribute('aria-label', 'Site announcement');
  banner.innerHTML =
    '<div class="sticky-announcement__text">' +
      '<span class="sticky-announcement__badge">New</span>' +
      'Premium HDPE Pipes now available in SDR 11 — ' +
      '<button class="sticky-announcement__link" ' +
             'aria-label="View new pipe range">View Range</button>' +
    '</div>' +
    '<button class="sticky-announcement__close" ' +
            'aria-label="Dismiss announcement" ' +
            'title="Dismiss">×</button>';

  /* Insert as the very first child of <body> */
  document.body.insertBefore(banner, document.body.firstChild);

  /* ── State ─────────────────────────────────────────────── */
  var dismissed    = false;
  var isVisible    = false;
  var lastScrollY  = window.scrollY || window.pageYOffset;
  var navbar       = document.querySelector('.navbar');

  /* Height of the announcement bar (set after first paint) */
  var BANNER_H = 0;
  function measureBanner() {
    BANNER_H = banner.getBoundingClientRect().height || 40;
  }
  requestAnimationFrame(measureBanner);

  /* ── Show / hide helpers ───────────────────────────────── */
  function showBanner() {
    if (dismissed || isVisible) return;
    isVisible = true;
    banner.classList.add('is-visible');
    document.body.classList.add('announcement-visible');
    /* Push sticky navbar down so it isn't covered */
    if (navbar) navbar.style.top = BANNER_H + 'px';
  }

  function hideBanner() {
    if (!isVisible) return;
    isVisible = false;
    banner.classList.remove('is-visible');
    document.body.classList.remove('announcement-visible');
    /* Restore navbar to its natural sticky position */
    if (navbar) navbar.style.top = '0';
  }

  /* ── Scroll logic ──────────────────────────────────────── */
  var TRIGGER_PX = 0; /* px from top – set after layout */

  function setTrigger() {
    /* Trigger after scrolling past the first "fold" –
       use the hero section height if present, else window height */
    var hero = document.querySelector('.hero');
    TRIGGER_PX = hero
      ? hero.getBoundingClientRect().height * 0.4
      : window.innerHeight * 0.5;
  }

  setTrigger();
  window.addEventListener('resize', setTrigger, { passive: true });

  var ticking = false;

  function onScroll() {
    if (dismissed) return;
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(function () {
      var currentY = window.scrollY || window.pageYOffset;
      var scrollingDown = currentY > lastScrollY;

      if (currentY > TRIGGER_PX && scrollingDown) {
        showBanner();
      } else if (currentY < TRIGGER_PX || !scrollingDown) {
        hideBanner();
      }

      lastScrollY = currentY;
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Dismiss button ────────────────────────────────────── */
  var closeBtn = banner.querySelector('.sticky-announcement__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      dismissed = true;
      hideBanner();
      /* Slide fully off-screen and remove from flow */
      banner.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      banner.style.transform  = 'translateY(-100%)';
      banner.style.opacity    = '0';
      setTimeout(function () { banner.style.display = 'none'; }, 320);
    });
  }

  /* ── CTA link inside banner ────────────────────────────── */
  var ctaLink = banner.querySelector('.sticky-announcement__link');
  if (ctaLink) {
    ctaLink.addEventListener('click', function () {
      /* Scroll to hero or products section */
      var target = document.querySelector('.hero');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

})();


/* ----------------------------------------------------------
   2. CAROUSEL IMAGE ZOOM ON HOVER
   ----------------------------------------------------------
   Behaviour:
   • Hovering over the main carousel image shows a zoom overlay
   • The overlay displays a magnified (2.5×) version of the image
   • A lens indicator follows the mouse within the main image
   • Works with the auto-playing carousel (updates on image change)
   ---------------------------------------------------------- */
(function initCarouselZoom() {
  'use strict';

  var mainImgWrap = document.getElementById('mainImgWrap');
  var mainImg     = document.getElementById('mainImg');

  if (!mainImgWrap || !mainImg) return;

  var ZOOM_FACTOR = 2.5; /* magnification level */

  /* ── Create zoom overlay ──────────────────────────────── */
  var zoomOverlay = document.createElement('div');
  zoomOverlay.className = 'hero__zoom-overlay';
  zoomOverlay.setAttribute('aria-hidden', 'true');

  var zoomImg = document.createElement('img');
  zoomImg.alt = '';
  zoomImg.setAttribute('aria-hidden', 'true');
  zoomOverlay.appendChild(zoomImg);

  /* ── Create lens ──────────────────────────────────────── */
  var lens = document.createElement('div');
  lens.className = 'hero__zoom-lens';
  lens.setAttribute('aria-hidden', 'true');

  /* ── Create badge ─────────────────────────────────────── */
  var badge = document.createElement('div');
  badge.className   = 'hero__zoom-badge';
  badge.textContent = '🔍 Hover to zoom';
  badge.setAttribute('aria-hidden', 'true');

  /* ── Append to wrapper ────────────────────────────────── */
  mainImgWrap.appendChild(zoomOverlay);
  mainImgWrap.appendChild(lens);
  mainImgWrap.appendChild(badge);

  /* ── Sync zoom image src with carousel ────────────────── */
  function syncZoomSrc() {
    if (mainImg.src && zoomImg.src !== mainImg.src) {
      zoomImg.src = mainImg.src;
    }
  }

  /* Watch for src changes on the main image (carousel navigation) */
  var srcObserver = new MutationObserver(syncZoomSrc);
  srcObserver.observe(mainImg, { attributes: true, attributeFilter: ['src'] });

  /* Initial sync */
  syncZoomSrc();

  /* ── Mouse enter / leave ──────────────────────────────── */
  mainImgWrap.addEventListener('mouseenter', function () {
    syncZoomSrc();
    zoomOverlay.classList.add('is-active');
    lens.classList.add('is-active');
  });

  mainImgWrap.addEventListener('mouseleave', function () {
    zoomOverlay.classList.remove('is-active');
    lens.classList.remove('is-active');
  });

  /* ── Mouse move – update lens position + zoom pan ──────── */
  mainImgWrap.addEventListener('mousemove', function (e) {
    var rect   = mainImgWrap.getBoundingClientRect();

    /* Mouse position relative to the image wrapper (0–1) */
    var relX = (e.clientX - rect.left)  / rect.width;
    var relY = (e.clientY - rect.top)   / rect.height;

    /* Clamp to [0, 1] */
    relX = Math.max(0, Math.min(1, relX));
    relY = Math.max(0, Math.min(1, relY));

    /* ── Move the lens ──────────────────────────────────── */
    var lensW  = lens.offsetWidth  || 80;
    var lensH  = lens.offsetHeight || 80;

    var lensX = relX * rect.width;
    var lensY = relY * rect.height;

    /* Keep lens inside the image bounds */
    lensX = Math.max(lensW / 2, Math.min(rect.width  - lensW / 2, lensX));
    lensY = Math.max(lensH / 2, Math.min(rect.height - lensH / 2, lensY));

    lens.style.left = lensX + 'px';
    lens.style.top  = lensY + 'px';

    /* ── Pan the zoomed image ───────────────────────────── */
    /* At zoom 2.5×, the image is 2.5× larger than the overlay.
       We shift the image so the portion under the lens is centred. */
    var zoomW = zoomOverlay.offsetWidth  || 280;
    var zoomH = zoomOverlay.offsetHeight || 280;

    /* How far (in zoomed-image px) to shift from top-left */
    var shiftX = relX * rect.width  * ZOOM_FACTOR - zoomW / 2;
    var shiftY = relY * rect.height * ZOOM_FACTOR - zoomH / 2;

    /* Max allowed shift (so we don't reveal empty space) */
    var maxShiftX = rect.width  * ZOOM_FACTOR - zoomW;
    var maxShiftY = rect.height * ZOOM_FACTOR - zoomH;

    shiftX = Math.max(0, Math.min(maxShiftX, shiftX));
    shiftY = Math.max(0, Math.min(maxShiftY, shiftY));

    zoomImg.style.transform       = 'scale(' + ZOOM_FACTOR + ')';
    zoomImg.style.transformOrigin = 'top left';
    zoomImg.style.marginLeft      = '-' + shiftX + 'px';
    zoomImg.style.marginTop       = '-' + shiftY + 'px';

    /* Hide badge once user starts moving mouse */
    badge.style.opacity = '0';
  });

  /* Show badge hint again briefly on mouseenter */
  mainImgWrap.addEventListener('mouseenter', function () {
    badge.style.opacity = '1';
    badge.style.transition = 'opacity 0.22s ease';
    /* Fade badge out after a short delay */
    setTimeout(function () {
      badge.style.opacity = '0';
    }, 1400);
  });

  /* ── Touch: disable zoom on touch devices ─────────────── */
  mainImgWrap.addEventListener('touchstart', function () {
    zoomOverlay.classList.remove('is-active');
    lens.classList.remove('is-active');
  }, { passive: true });

})();