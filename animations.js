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

  // ─── SERVICES: stagger ulaz kartica kad sekcija uđe u view ──────────────
  var servicesSection = document.querySelector('#services');
  var serviceCards = document.querySelectorAll('.service-card');
  if (servicesSection && serviceCards.length) {
    var staggerObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        serviceCards.forEach(function (card, i) {
          setTimeout(function () {
            card.classList.add('is-visible');
          }, 80 * i);
        });
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0 });
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

  // ─── WHY US: type-in samo jedna rečenica (desktop ili blago na mobilu) ──
  var typeInEl = document.querySelector('.why-type-in[data-type-in]');
  if (typeInEl) {
    var textEl = typeInEl.querySelector('.type-in-text');
    var cursorEl = typeInEl.querySelector('.type-in-cursor');
    var fullText = typeInEl.getAttribute('data-type-in') || '';
    var isDesktop = window.matchMedia('(min-width: 769px)').matches;
    var delay = isDesktop ? 45 : 25;
    var runOnce = false;
    var typeInObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || runOnce || !textEl) return;
        runOnce = true;
        var i = 0;
        textEl.textContent = '';
        if (cursorEl) cursorEl.style.visibility = 'visible';
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
    typeInObs.observe(typeInEl);
  }
})();
