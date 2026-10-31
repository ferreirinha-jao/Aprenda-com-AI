/*!
 * Aprenda com AI — Aviso de cookies (LGPD)
 *
 * O QUE FAZ
 *  - Mostra um aviso com "Rejeitar", "Aceitar" e "Gerenciar" (Aceitar e Rejeitar têm o mesmo destaque).
 *  - Cookies de publicidade (Google AdSense) ficam DESLIGADOS por padrão.
 *  - O script do AdSense só é carregado depois que a pessoa aceita a categoria "Publicidade".
 *  - A escolha fica salva por 12 meses e pode ser alterada pelo link "Preferências de cookies" no rodapé.
 *
 * COMO ATIVAR O ADSENSE
 *  1) Quando o Google te passar o ID do editor (formato ca-pub-0000000000000000),
 *     cole abaixo em adsenseClient, entre as aspas.
 *  2) Só isso. Não cole o código do AdSense direto nas páginas, senão ele carrega
 *     antes do consentimento.
 */
(function () {
  'use strict';

  var CFG = {
    adsenseClient: '',                  // ex.: 'ca-pub-1234567890123456'
    storageKey: 'aa_cookie_consent_v1', // onde a escolha é guardada no navegador
    validDays: 365                      // depois disso, pergunta de novo
  };

  var scriptEl = document.currentScript;
  var privacyUrl = 'politica-de-privacidade.html';
  try {
    if (scriptEl && scriptEl.src) privacyUrl = new URL('politica-de-privacidade.html', scriptEl.src).href;
  } catch (e) { /* mantém o relativo */ }

  var memory = null; // usado só se o navegador bloquear o localStorage

  /* ---------- armazenamento ---------- */
  function readConsent() {
    try {
      var raw = window.localStorage.getItem(CFG.storageKey);
      if (!raw) return memory;
      var o = JSON.parse(raw);
      if (!o || o.v !== 1 || typeof o.ads !== 'boolean') return null;
      if (Date.now() - o.ts > CFG.validDays * 864e5) return null;
      return o;
    } catch (e) { return memory; }
  }

  function writeConsent(ads) {
    var o = { v: 1, ads: !!ads, ts: Date.now() };
    memory = o;
    try { window.localStorage.setItem(CFG.storageKey, JSON.stringify(o)); } catch (e) { /* ignora */ }
    return o;
  }

  /* ---------- publicidade ---------- */
  function adsConfigured() { return /^ca-pub-\d{10,20}$/.test(CFG.adsenseClient); }

  function loadAds() {
    if (!adsConfigured() || window.__aaAdsLoaded) return;
    window.__aaAdsLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(CFG.adsenseClient);
    s.onload = function () {
      var slots = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status])');
      for (var i = 0; i < slots.length; i++) {
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* ignora */ }
      }
    };
    document.head.appendChild(s);
  }

  function clearAdCookies() {
    var names = ['__gads', '__gpi', '__eoi'];
    var host = location.hostname, parts = host.split('.'), domains = ['', host];
    for (var i = 1; i < parts.length - 1; i++) domains.push('.' + parts.slice(i).join('.'));
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function applyConsent(state, previous) {
    if (state.ads) {
      loadAds();
    } else if (previous && previous.ads) {
      clearAdCookies();
      if (window.__aaAdsLoaded) { location.reload(); return; } // descarrega o script de anúncios
    }
    try {
      document.dispatchEvent(new CustomEvent('aa:consent', { detail: { ads: state.ads } }));
    } catch (e) { /* ignora */ }
  }

  /* ---------- visual ---------- */
  var CSS = '' +
    '#aa-cc{position:fixed;left:16px;bottom:16px;right:16px;max-width:540px;z-index:2147483000;' +
      'box-sizing:border-box;padding:18px;border-radius:14px;background:#101216;color:#e8eaed;' +
      'border:1px solid rgba(255,255,255,.16);box-shadow:0 14px 44px rgba(0,0,0,.6);' +
      'font-family:inherit;font-size:14px;line-height:1.55;text-align:left}' +
    '#aa-cc *{box-sizing:border-box}' +
    '#aa-cc[hidden]{display:none}' +
    '#aa-cc .aa-cc-title{margin:0 0 6px;font-size:16px;font-weight:700;color:#fff;line-height:1.3}' +
    '#aa-cc p{margin:0 0 14px;color:#cfd3d8}' +
    '#aa-cc a{color:#d7ff3f;text-decoration:underline}' +
    '#aa-cc .aa-cc-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}' +
    '#aa-cc .aa-cc-btn{flex:1 1 130px;min-height:44px;padding:10px 16px;border-radius:10px;cursor:pointer;' +
      'background:transparent;color:#d7ff3f;border:1.5px solid #d7ff3f;font-family:inherit;font-size:14px;font-weight:700;line-height:1.2}' +
    '#aa-cc .aa-cc-btn:hover{background:#d7ff3f;color:#0b0c0e}' +
    '#aa-cc .aa-cc-link{flex:1 1 100%;min-height:44px;background:none;border:0;padding:6px 4px;cursor:pointer;' +
      'color:#cfd3d8;font-family:inherit;font-size:13.5px;text-decoration:underline;text-align:center}' +
    '#aa-cc .aa-cc-link:hover{color:#fff}' +
    '#aa-cc button:focus-visible,#aa-cc a:focus-visible,#aa-cc input:focus-visible+.aa-cc-track{outline:3px solid #fff;outline-offset:2px}' +
    '#aa-cc .aa-cc-cat{display:flex;gap:14px;align-items:flex-start;justify-content:space-between;padding:12px 0;border-top:1px solid rgba(255,255,255,.12)}' +
    '#aa-cc .aa-cc-cat h3{margin:0 0 3px;font-size:14px;font-weight:700;color:#fff}' +
    '#aa-cc .aa-cc-cat p{margin:0;font-size:13px;color:#b8bdc4}' +
    '#aa-cc .aa-cc-always{flex:none;font-size:12px;font-weight:700;color:#d7ff3f;white-space:nowrap;padding-top:2px}' +
    '#aa-cc .aa-cc-switch{position:relative;flex:none;width:48px;height:28px;margin-top:2px}' +
    '#aa-cc .aa-cc-switch input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer;z-index:1}' +
    '#aa-cc .aa-cc-track{position:absolute;inset:0;border-radius:999px;background:#3a3f47;transition:background .2s}' +
    '#aa-cc .aa-cc-track::after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#fff;transition:transform .2s}' +
    '#aa-cc input:checked+.aa-cc-track{background:#d7ff3f}' +
    '#aa-cc input:checked+.aa-cc-track::after{transform:translateX(20px);background:#0b0c0e}' +
    '#aa-cc .aa-cc-manage .aa-cc-row{margin-top:14px}' +
    '#aa-cc-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}' +
    '@media (max-width:560px){#aa-cc{left:10px;right:10px;bottom:calc(10px + env(safe-area-inset-bottom,0px));padding:16px;max-height:88vh;overflow:auto}}' +
    '@media (prefers-reduced-motion:no-preference){#aa-cc{animation:aa-cc-in .25s ease-out}@keyframes aa-cc-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}}' +
    '@media print{#aa-cc{display:none}}';

  var root, bannerView, manageView, adsToggle, live;

  function build() {
    var st = document.createElement('style');
    st.id = 'aa-cc-style';
    st.appendChild(document.createTextNode(CSS));
    document.head.appendChild(st);

    root = document.createElement('div');
    root.id = 'aa-cc';
    root.hidden = true;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'false');
    root.setAttribute('aria-labelledby', 'aa-cc-t1');
    root.innerHTML =
      '<div class="aa-cc-banner">' +
        '<h2 class="aa-cc-title" id="aa-cc-t1">Sua privacidade importa</h2>' +
        '<p>Usamos cookies essenciais para o site funcionar. Com a sua permissão, também usamos cookies de publicidade ' +
        '(Google AdSense) para exibir e medir anúncios. Você pode aceitar, rejeitar ou escolher o que permitir. ' +
        'Saiba mais na <a href="' + privacyUrl + '">Política de Privacidade</a>.</p>' +
        '<div class="aa-cc-row">' +
          '<button type="button" class="aa-cc-btn" data-aa="reject">Rejeitar</button>' +
          '<button type="button" class="aa-cc-btn" data-aa="accept">Aceitar</button>' +
          '<button type="button" class="aa-cc-link" data-aa="manage">Gerenciar preferências</button>' +
        '</div>' +
      '</div>' +
      '<div class="aa-cc-manage" hidden>' +
        '<h2 class="aa-cc-title" id="aa-cc-t2" tabindex="-1">Preferências de cookies</h2>' +
        '<p>Escolha quais categorias você permite. Você pode mudar isso quando quiser pelo link "Preferências de cookies" no rodapé do site.</p>' +
        '<div class="aa-cc-cat">' +
          '<div><h3>Essenciais</h3><p>Necessários para o site funcionar e para guardar suas escolhas, como esta preferência e os prompts que você salva na Biblioteca.</p></div>' +
          '<span class="aa-cc-always">Sempre ativos</span>' +
        '</div>' +
        '<div class="aa-cc-cat">' +
          '<div><h3 id="aa-cc-ads-l">Publicidade (Google AdSense)</h3><p>Permitem exibir anúncios e medir o desempenho deles. O Google pode usar cookies e identificadores do navegador, inclusive para personalizar anúncios. Se você recusar, o site funciona normalmente, sem anúncios.</p></div>' +
          '<label class="aa-cc-switch"><input type="checkbox" role="switch" id="aa-cc-ads" aria-labelledby="aa-cc-ads-l"><span class="aa-cc-track"></span></label>' +
        '</div>' +
        '<div class="aa-cc-row">' +
          '<button type="button" class="aa-cc-btn" data-aa="reject">Rejeitar tudo</button>' +
          '<button type="button" class="aa-cc-btn" data-aa="save">Salvar escolhas</button>' +
          '<button type="button" class="aa-cc-btn" data-aa="accept">Aceitar tudo</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(root);

    live = document.createElement('div');
    live.id = 'aa-cc-live';
    live.setAttribute('aria-live', 'polite');
    document.body.appendChild(live);

    bannerView = root.querySelector('.aa-cc-banner');
    manageView = root.querySelector('.aa-cc-manage');
    adsToggle = root.querySelector('#aa-cc-ads');

    root.addEventListener('click', function (ev) {
      var b = ev.target.closest ? ev.target.closest('[data-aa]') : null;
      if (!b) return;
      var act = b.getAttribute('data-aa');
      if (act === 'manage') showManage();
      else if (act === 'accept') choose(true);
      else if (act === 'reject') choose(false);
      else if (act === 'save') choose(adsToggle.checked);
    });
  }

  function showBanner() {
    manageView.hidden = true;
    bannerView.hidden = false;
    root.setAttribute('aria-labelledby', 'aa-cc-t1');
    root.hidden = false;
  }

  function showManage() {
    var cur = readConsent();
    adsToggle.checked = !!(cur && cur.ads);
    bannerView.hidden = true;
    manageView.hidden = false;
    root.setAttribute('aria-labelledby', 'aa-cc-t2');
    root.hidden = false;
    var h = root.querySelector('#aa-cc-t2');
    if (h && h.focus) h.focus();
  }

  function choose(ads) {
    var previous = readConsent();
    var state = writeConsent(ads);
    root.hidden = true;
    live.textContent = 'Preferências de cookies salvas.';
    applyConsent(state, previous);
  }

  /* ---------- link "Preferências de cookies" ---------- */
  function addFooterLink() {
    var links = document.querySelectorAll('footer a[href$="politica-de-privacidade.html"]');
    if (!links.length) links = document.querySelectorAll('a[href$="politica-de-privacidade.html"]');
    var anchor = null;
    for (var i = links.length - 1; i >= 0; i--) {
      if (links[i].closest && links[i].closest('footer')) { anchor = links[i]; break; }
    }
    if (!anchor || anchor.parentNode.querySelector('[data-cookie-settings]')) return;
    var a = document.createElement('a');
    a.href = '#cookies';
    a.className = anchor.className;
    a.textContent = 'Preferências de cookies';
    a.setAttribute('data-cookie-settings', '');
    if ((anchor.parentNode.textContent || '').indexOf('\u00b7') > -1) {
      anchor.parentNode.insertBefore(document.createTextNode(' \u00b7 '), anchor.nextSibling);
      anchor.parentNode.insertBefore(a, anchor.nextSibling.nextSibling);
    } else {
      anchor.parentNode.insertBefore(a, anchor.nextSibling);
    }
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target.closest ? ev.target.closest('[data-cookie-settings]') : null;
    if (!t) return;
    ev.preventDefault();
    if (root) showManage();
  });

  /* ---------- início ---------- */
  function init() {
    build();
    addFooterLink();
    var cur = readConsent();
    if (cur) { applyConsent(cur, null); } else { showBanner(); }
    window.aaCookies = {
      open: function () { showManage(); },
      get: function () { var c = readConsent(); return c ? { ads: c.ads } : null; }
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
