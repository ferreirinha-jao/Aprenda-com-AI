/* Galeria de Landing Pages — modelos prontos para copiar ou baixar.
   Para adicionar um modelo novo, acrescente um objeto na lista TEMPLATES (id, nome, nicho, tags, html). */
(function () {
  'use strict';
  var TEMPLATES = window.AA_TEMPLATES || [];

  var grid = document.getElementById('gl-grid');
  var dlg = document.getElementById('gl-dialog');
  var dframe = document.getElementById('gl-dframe');
  var dtitle = document.getElementById('gl-dtitle');

  function copyText(text, btn) {
    var label = btn.textContent;
    function done(ok) {
      btn.textContent = ok ? 'Código copiado' : 'Não foi possível copiar';
      setTimeout(function () { btn.textContent = label; }, 1800);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      ta.remove(); done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    } else { fallback(); }
  }

  function download(t) {
    var blob = new Blob([t.html], { type: 'text/html;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'landing-' + t.id + '.html';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 500);
  }

  TEMPLATES.forEach(function (t) {
    var card = document.createElement('article');
    card.className = 'gl-card';
    card.innerHTML =
      '<div class="gl-frame"><iframe title="Prévia do modelo ' + t.nome + '" tabindex="-1" loading="lazy" sandbox="allow-scripts"></iframe></div>' +
      '<div class="gl-body"><h2>' + t.nome + '</h2><p class="gl-niche">' + t.nicho + '</p>' +
      '<ul class="gl-tags">' + t.tags.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
      '<div class="gl-actions"><button type="button" data-a="view">Ver em tela cheia</button>' +
      '<button type="button" data-a="copy">Copiar código</button>' +
      '<button type="button" data-a="dl">Baixar .html</button></div></div>';
    card.querySelector('iframe').srcdoc = t.html;
    card.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-a]');
      if (!b) return;
      var a = b.getAttribute('data-a');
      if (a === 'copy') copyText(t.html, b);
      else if (a === 'dl') download(t);
      else if (a === 'view') {
        dtitle.textContent = t.nome;
        dframe.srcdoc = t.html;
        dframe.style.maxWidth = '100%';
        dlg.showModal();
      }
    });
    grid.appendChild(card);
  });

  document.getElementById('gl-dclose').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) {
    var w = e.target.closest('[data-w]');
    if (w) dframe.style.maxWidth = w.getAttribute('data-w');
  });

  function fit() {
    var frames = document.querySelectorAll('.gl-frame');
    for (var i = 0; i < frames.length; i++) {
      var s = frames[i].clientWidth / 1280;
      frames[i].firstChild.style.transform = 'scale(' + s + ')';
      frames[i].style.height = (800 * s) + 'px';
    }
  }
  window.addEventListener('resize', fit);
  fit();
})();
