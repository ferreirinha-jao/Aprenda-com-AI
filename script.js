function initializeCarousel() {
  const slides = [...document.querySelectorAll('.carousel-slide')];
  const dots = document.querySelector('.dots-indicator');
  const counter = document.querySelector('.slide-counter');
  const prev = document.querySelector('.btn-prev');
  const next = document.querySelector('.btn-next');

  if (slides.length) {
    ['neon-card.css', 'performance.css'].forEach((href) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = href;
      document.head.append(stylesheet);
    });
  }

  if (slides.length && dots && counter && prev && next) {
    // A lógica do carrossel só deve ser adicionada aqui quando a estrutura existir.
  }
}

initializeCarousel();

if (document.querySelector('#inicio') && !document.querySelector('.skip-link')) {
  const skipLink = document.createElement('a');
  skipLink.href = '#inicio';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Ir para o conteúdo';
  skipLink.style.cssText = 'position:absolute;left:-9999px;z-index:9999;';
  skipLink.addEventListener('focus', () => { skipLink.style.left = '1rem'; });
  skipLink.addEventListener('blur', () => { skipLink.style.left = '-9999px'; });
  document.body.prepend(skipLink);
}

document.querySelectorAll('.navbar').forEach((navbar, index) => {
  const navigationMenu = navbar.querySelector('.nav-menu, .nav-links');
  if (!navigationMenu) return;

  if (!navigationMenu.id) navigationMenu.id = `nav-menu-${index + 1}`;

  let menuToggle = navbar.querySelector('.menu-toggle');
  if (!menuToggle) {
    menuToggle = document.createElement('button');
    menuToggle.type = 'button';
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Abrir menu');

    const icon = document.createElement('span');
    icon.className = 'menu-toggle-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.append(document.createElement('span'), document.createElement('span'), document.createElement('span'));
    menuToggle.append(icon);
    navigationMenu.before(menuToggle);
  }

  menuToggle.setAttribute('aria-controls', navigationMenu.id);

  const closeMenu = (restoreFocus = false) => {
    navigationMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    if (restoreFocus) menuToggle.focus();
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = navigationMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigationMenu.classList.contains('active')) {
      closeMenu(true);
    }
  });

  document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target) && navigationMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  navigationMenu.addEventListener('click', (event) => {
    if (event.target === navigationMenu || event.target.closest('a')) closeMenu();
  });
});

// Torna o card inteiro clicável procurando qualquer link interno (título ou botão)
document.querySelectorAll('.article-card').forEach(card => {
    const link = card.querySelector('a');
    if (link) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            window.location.href = link.href;
        });
    }
});
