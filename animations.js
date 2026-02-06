(function () {
  'use strict';

  // ─── C) Scroll reveal (fade + blur) ─────────────────────────────────────
  var reveal = document.querySelectorAll('.reveal');
  var revealOpts = { rootMargin: '0px 0px -8% 0px', threshold: 0.1 };
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, revealOpts);
  reveal.forEach(function (el) { revealObs.observe(el); });

  // ─── SERVICES (Šta radimo): kartice ulaze jedna po jedna (stagger) u view ─
  var servicesSection = document.querySelector('#services');
  var serviceCards = document.querySelectorAll('.service-card');
  var staggerDone = false;
  if (servicesSection && serviceCards.length) {
    var staggerObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || staggerDone) return;
        staggerDone = true;
        serviceCards.forEach(function (card, i) {
          setTimeout(function () {
            card.classList.add('is-visible');
          }, 120 * i);
        });
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    staggerObs.observe(servicesSection);
  }

  // ─── PROCESS: progress linija se popuni dok skroluješ ───────────────────
  var processSection = document.getElementById('process');
  var progressFill = document.getElementById('process-progress-fill');
  if (processSection && progressFill) {
    var steps = processSection.querySelectorAll('.process-step');
    function updateProcessProgress() {
      var rect = processSection.getBoundingClientRect();
      var vh = window.innerHeight;
      var top = rect.top;
      var height = rect.height;
      if (top > vh) {
        progressFill.style.height = '0%';
        return;
      }
      var visibleStart = Math.max(0, -top);
      var visibleEnd = Math.min(height, vh - top);
      var visible = Math.max(0, visibleEnd - visibleStart);
      var pct = steps.length ? (visible / height) * 100 : 0;
      progressFill.style.height = Math.min(100, Math.round(pct)) + '%';
    }
    window.addEventListener('scroll', updateProcessProgress, { passive: true });
    window.addEventListener('resize', updateProcessProgress);
    updateProcessProgress();
  }

  // ─── Type-in: ispis rečenice kad element uđe u view, ukupno 2 sec ───────
  var typeInEls = document.querySelectorAll('.type-in[data-type-in]');
  var typeInDuration = 2000;
  var typeInObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var el = entry.target;
      if (!entry.isIntersecting || el.dataset.typed === '1') return;
      el.dataset.typed = '1';
      var textEl = el.querySelector('.type-in-text');
      var cursorEl = el.querySelector('.type-in-cursor');
      var fullText = el.getAttribute('data-type-in') || '';
      if (!textEl || !fullText.length) return;
      var delay = typeInDuration / fullText.length;
      textEl.textContent = '';
      if (cursorEl) cursorEl.style.visibility = 'visible';
      var i = 0;
      function type() {
        if (i < fullText.length) {
          textEl.textContent += fullText[i];
          i++;
          setTimeout(type, delay);
        } else if (cursorEl) {
          setTimeout(function () { cursorEl.style.visibility = 'hidden'; }, 400);
        }
      }
      setTimeout(type, 300);
    });
  }, { threshold: 0.3 });
  typeInEls.forEach(function (el) { typeInObs.observe(el); });
})();
