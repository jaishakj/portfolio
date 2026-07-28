/* ============================================
   RETRO UI PAYMENT PAGE — SCRIPT
   Handles: clipboard copy, toast notifications,
   and UPI deep-link launching with app-store
   fallback.
   ============================================ */

(function () {
  'use strict';

  // ---------- Element references ----------
  var upiInput = document.getElementById('upi-input');
  var copyBtn = document.getElementById('copy-btn');
  var toast = document.getElementById('toast');
  var payButtons = document.querySelectorAll('[data-upi-link]');
  var canvas = document.getElementById('dot-canvas');

  var FALLBACK_URL = 'https://play.google.com/store/search?q=upi%20payment&c=apps';
  var FALLBACK_DELAY_MS = 800;
  var toastTimer = null;

  // ---------- Toast helper ----------
  /**
   * Shows a toast message for a short duration.
   * @param {string} message - Text to display.
   */
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 1800);
  }

  // ---------- Copy UPI ID ----------
  /**
   * Copies the UPI ID to the clipboard and shows a confirmation toast.
   * Falls back to a manual selection method if the Clipboard API is unavailable.
   */
  function copyUpiId() {
    var value = upiInput.value;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value)
        .then(function () {
          showToast('Copied!');
        })
        .catch(function () {
          fallbackCopy();
        });
    } else {
      fallbackCopy();
    }
  }

  /**
   * Legacy fallback copy method using a temporary text selection.
   */
  function fallbackCopy() {
    upiInput.removeAttribute('readonly');
    upiInput.select();
    upiInput.setSelectionRange(0, upiInput.value.length);

    try {
      document.execCommand('copy');
      showToast('Copied!');
    } catch (err) {
      showToast('Copy failed');
    } finally {
      upiInput.setAttribute('readonly', 'true');
      upiInput.blur();
    }
  }

  // ---------- UPI deep-link launcher ----------
  /**
   * Attempts to open a UPI app via deep link. If the app is not installed
   * (page stays visible/focused), redirects to the Play Store search after
   * a short delay.
   * @param {string} link - The UPI deep link URI.
   */
  function launchUpiApp(link) {
    var didHide = false;

    function handleVisibilityChange() {
      if (document.hidden) {
        didHide = true;
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleVisibilityChange);

    // Try opening the deep link.
    window.location.href = link;

    setTimeout(function () {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleVisibilityChange);

      // If the page never lost focus/visibility, assume the app isn't installed.
      if (!didHide && !document.hidden) {
        window.location.href = FALLBACK_URL;
      }
    }, FALLBACK_DELAY_MS);
  }

  // ---------- Event listeners ----------
  copyBtn.addEventListener('click', copyUpiId);

  payButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var link = btn.getAttribute('data-upi-link');
      if (link) {
        launchUpiApp(link);
      }
    });

    // Keyboard accessibility: allow Enter/Space activation (native button
    // behavior already covers this, but kept explicit for clarity).
    btn.addEventListener('keyup', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        btn.click();
      }
    });
  });

  // ---------- Interactive dot-grid background ----------
  /**
   * Renders a grid of dots on a full-viewport canvas. Dots near the cursor
   * are pushed away and smoothly ease back to their origin, giving a
   * flexible, fluid feel as the pointer moves.
   */
  function initDotGrid() {
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var dots = [];
    var spacing = 26;          // distance between dots (CSS px)
    var influenceRadius = 130; // how far the cursor's push effect reaches
    var maxPush = 12;          // maximum displacement in px
    var ease = 0.12;           // how quickly dots move toward their target
    var dpr = window.devicePixelRatio || 1;

    var mouse = { x: -9999, y: -9999 };
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reads the current dot color from CSS custom properties.
    function getDotColor() {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--dot-color')
        .trim() || 'rgba(26, 26, 26, 0.35)';
    }

    // Sizes the canvas to the viewport and rebuilds the dot grid.
    function resize() {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    }

    // Builds the origin grid of dots based on current viewport size.
    function buildGrid() {
      dots = [];
      var cols = Math.ceil(window.innerWidth / spacing) + 1;
      var rows = Math.ceil(window.innerHeight / spacing) + 1;

      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          dots.push({
            ox: c * spacing, // origin x
            oy: r * spacing, // origin y
            x: c * spacing,  // current x
            y: r * spacing   // current y
          });
        }
      }
    }

    // Advances each dot toward its cursor-influenced target, then draws it.
    function draw() {
      var color = getDotColor();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = color;

      for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        var dx = dot.ox - mouse.x;
        var dy = dot.oy - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        var targetX = dot.ox;
        var targetY = dot.oy;

        if (dist < influenceRadius) {
          var strength = (1 - dist / influenceRadius) * maxPush;
          var angle = Math.atan2(dy, dx);
          targetX = dot.ox + Math.cos(angle) * strength;
          targetY = dot.oy + Math.sin(angle) * strength;
        }

        // Smoothly ease current position toward the target (lerp).
        dot.x += (targetX - dot.x) * ease;
        dot.y += (targetY - dot.y) * ease;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    // ---------- Pointer tracking ----------
    window.addEventListener('mousemove', function (event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener('mouseleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    // Support touch devices: treat a touch move like a cursor position.
    window.addEventListener('touchmove', function (event) {
      if (event.touches && event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('resize', resize);

    resize();

    // Respect reduced-motion preference: draw a static grid, no animation loop.
    if (reducedMotion) {
      draw = function () {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = getDotColor();
        for (var i = 0; i < dots.length; i++) {
          ctx.beginPath();
          ctx.arc(dots[i].ox, dots[i].oy, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      };
      draw();
    } else {
      draw();
    }
  }

  initDotGrid();
})();
