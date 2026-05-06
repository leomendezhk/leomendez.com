// ── Language Toggle ──
const toggle = document.getElementById('lang-toggle');
const label  = document.getElementById('lang-label');
let lang = 'en';

function applyLang(newLang) {
  lang = newLang;
  label.textContent = lang === 'en' ? 'ES' : 'EN';
  document.documentElement.lang = lang === 'en' ? 'en' : 'es';

  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (!text) return;
    // handle innerHTML for elements containing HTML entities/tags
    if (text.includes('<') || text.includes('&')) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });
}

toggle.addEventListener('click', () => {
  applyLang(lang === 'en' ? 'es' : 'en');
});

// ── Nav scroll state ──
const nav = document.getElementById('nav');

function onScroll() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Fade-in on scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.pillar, .service-card, .gallery-item, .cert-row, .about-images, .about-text, .contact-text').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
