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

// ── Contact Form ──
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');

const MSG = {
  en: { sending: 'Sending…', ok: 'Message sent — Leo will be in touch.', err: 'Something went wrong. Please try again.' },
  es: { sending: 'Enviando…', ok: 'Mensaje enviado — Leo se pondrá en contacto.', err: 'Algo salió mal. Por favor intentá de nuevo.' }
};

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const m = MSG[lang] || MSG.en;
    status.textContent = m.sending;
    status.className = 'form-status';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        status.textContent = m.ok;
        status.className = 'form-status success';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.textContent = m.err;
      status.className = 'form-status error';
    }
  });
}
