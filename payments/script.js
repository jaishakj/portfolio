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
})();
