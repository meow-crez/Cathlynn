/* ================================================================
   CATHLYNN.exe — script.js
   ================================================================ */
(function () {
  'use strict';

  /* ---------- Mobile nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---------- Typed class effect ---------- */
  const roles = [
    'COMPUTER SCIENCE STUDENT',
    'BACKEND DEVELOPER',
    'CUTIE',
    'FUTURE GAME DEV'
  ];
  const typedEl = document.getElementById('typed');
  let r = 0, c = 0, deleting = false;
  (function type() {
    const word = roles[r];
    typedEl.textContent = word.slice(0, c);
    if (!deleting && c < word.length) { c++; setTimeout(type, 65); }
    else if (!deleting) { deleting = true; setTimeout(type, 1600); }
    else if (c > 0) { c--; setTimeout(type, 32); }
    else { deleting = false; r = (r + 1) % roles.length; setTimeout(type, 350); }
  })();

  /* ---------- Scroll reveal + animated bars + counters ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.fill').forEach(f => f.style.width = f.dataset.width);
      entry.target.querySelectorAll('.counter-num').forEach(countUp);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.18 });
  revealEls.forEach(el => io.observe(el));

  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = +el.dataset.target, dur = 1400, t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navMap = {};
  document.querySelectorAll('.nav-link').forEach(l => navMap[l.getAttribute('href').slice(1)] = l);
  window.addEventListener('scroll', () => {
    let current = 'home';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 160) current = s.id; });
    Object.values(navMap).forEach(l => l.classList.remove('active'));
    if (navMap[current]) navMap[current].classList.add('active');
  }, { passive: true });

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name, email = form.email, message = form.message;
    [name, email, message].forEach(f => f.classList.remove('error'));
    status.className = 'form-status';

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if (!name.value.trim() || !emailOk || !message.value.trim()) {
      if (!name.value.trim()) name.classList.add('error');
      if (!emailOk) email.classList.add('error');
      if (!message.value.trim()) message.classList.add('error');
      status.textContent = '> ERROR: Player has Died. Check your inputs, player.';
      status.classList.add('err');
      return;
    }
    status.textContent = '> SENDING...';
    setTimeout(() => {
      status.textContent = '> MESSAGE SENT! Thank you, ' + name.value.trim().split(' ')[0] +
        ' — Cathlynn will respawn in your inbox soon.';
      status.classList.add('ok');
      form.reset();
    }, 900);
  });

  /* ---------- Demo link alert ---------- */
  window.demoAlert = function (e) {
    e.preventDefault();
    alert('QUEST NOTICE\n\nDemo & source links unlock once the project is deployed. Stay tuned!');
    return false;
  };
})();