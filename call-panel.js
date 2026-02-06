(function () {
  var PHONE = '+38765265013';
  var PHONE_DISPLAY = '+387 65 265 013';
  var overlay = document.getElementById('call-panel-overlay');
  var panel = document.getElementById('call-panel');
  var closeBtn = document.getElementById('call-panel-close');
  var copyBtn = document.getElementById('call-panel-copy');

  function isDesktop() {
    return window.matchMedia('(min-width: 769px)').matches;
  }

  function openPanel() {
    if (!overlay || !panel) return;
    overlay.classList.add('is-open');
    panel.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    if (!overlay || !panel) return;
    overlay.classList.remove('is-open');
    panel.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function copyNumber() {
    navigator.clipboard.writeText(PHONE).then(function () {
      var t = copyBtn.textContent;
      copyBtn.textContent = 'Kopirano!';
      copyBtn.disabled = true;
      setTimeout(function () {
        copyBtn.textContent = t;
        copyBtn.disabled = false;
      }, 2000);
    });
  }

  // Na desktopu: klik na "Pozovi" otvara panel umjesto tel:
  document.querySelectorAll('.btn-call-single').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (isDesktop()) {
        e.preventDefault();
        openPanel();
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closePanel);
  if (overlay) overlay.addEventListener('click', function (e) { if (e.target === overlay) closePanel(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(); });
  if (copyBtn) copyBtn.addEventListener('click', copyNumber);
})();
