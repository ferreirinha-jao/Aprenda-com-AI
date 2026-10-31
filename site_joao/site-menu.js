/* Menu sanduíche: monta a gaveta a partir dos links que já existem no menu de cada página. */
(function () {
  'use strict';
  var nav = document.querySelector('.navbar');
  var anchors = nav ? nav.querySelectorAll('.nav-links a') : [];
  if (!anchors.length) return;

  var items = [].map.call(anchors, function (a) { return { t: a.textContent.trim(), h: a.getAttribute('href') }; });
  var base = items[0].h.replace(/index\.html.*$/, '');
  var at = 0;
  items.forEach(function (it, i) { if (/calculadora/.test(it.h)) at = i + 1; });
  items.splice(at || items.length, 0, { t: 'Galeria de Landing Pages', h: base + 'galeria-de-landing-pages.html' });

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'aa-burger';
  btn.setAttribute('aria-label', 'Abrir menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'aa-drawer');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);

  var scrim = document.createElement('div');
  scrim.className = 'aa-scrim';
  var drawer = document.createElement('nav');
  drawer.id = 'aa-drawer';
  drawer.className = 'aa-drawer';
  drawer.setAttribute('aria-label', 'Menu principal');
  var html = '<div class="aa-drawer-top"><span>Menu</span><button type="button" class="aa-close" aria-label="Fechar menu">\u00d7</button></div>';
  items.forEach(function (it) {
    var probe = document.createElement('a');
    probe.href = it.h;
    var cur = probe.pathname === location.pathname ? ' aria-current="page"' : '';
    html += '<a class="aa-link" href="' + it.h + '"' + cur + '>' + it.t + '</a>';
  });
  drawer.innerHTML = html;
  document.body.appendChild(scrim);
  document.body.appendChild(drawer);

  var closeBtn = drawer.querySelector('.aa-close');
  function open() {
    document.body.classList.add('aa-menu-open');
    btn.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
  }
  function close() {
    document.body.classList.remove('aa-menu-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }
  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  scrim.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (!document.body.classList.contains('aa-menu-open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = drawer.querySelectorAll('a,button'), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
