// Cursor
const cur = document.getElementById('cursor'),
  fol = document.getElementById('cursorFollower');
let mx = 0,
  my = 0,
  fx = 0,
  fy = 0;
document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});
(function loop() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  fol.style.left = fx + 'px';
  fol.style.top = fy + 'px';
  requestAnimationFrame(loop);
})();
document
  .querySelectorAll('a,button,.skill-icon-tile,.project-card,.social-btn')
  .forEach((el) => {
    el.addEventListener('mouseenter', () => fol.classList.add('hovering'));
    el.addEventListener('mouseleave', () => fol.classList.remove('hovering'));
  });

// Scroll Progress
const prog = document.getElementById('scrollProgress');
window.addEventListener(
  'scroll',
  () => {
    prog.style.width =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100 +
      '%';
  },
  { passive: true },
);

// Navbar
const nav = document.getElementById('navbar');
window.addEventListener(
  'scroll',
  () => nav.classList.toggle('scrolled', window.scrollY > 40),
  { passive: true },
);

// Active Nav
document.querySelectorAll('section[id]').forEach((s) => {
  new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          document
            .querySelectorAll('.nav-links a')
            .forEach((a) => a.classList.remove('active'));
          const a = document.querySelector(
            '.nav-links a[href="#' + e.target.id + '"]',
          );
          if (a) a.classList.add('active');
        }
      }),
    { threshold: 0.5 },
  ).observe(s);
});

// Hamburger
const ham = document.getElementById('hamburger'),
  mob = document.getElementById('mobileMenu');
ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  if (mob.classList.contains('open')) {
    mob.classList.remove('open');
    setTimeout(() => (mob.style.display = 'none'), 400);
  } else {
    mob.style.display = 'flex';
    requestAnimationFrame(() => mob.classList.add('open'));
  }
});
document.querySelectorAll('.mobile-nav-link').forEach((l) =>
  l.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
    setTimeout(() => (mob.style.display = 'none'), 400);
  }),
);

// Reveal
const ro = new IntersectionObserver(
  (e) =>
    e.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        ro.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll('.reveal').forEach((el) => ro.observe(el));

// Counters
const co = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target,
          target = parseInt(el.dataset.count),
          suffix = el.querySelector('span')
            ? el.querySelector('span').outerHTML
            : '';
        const t0 = performance.now();
        (function tick(now) {
          const p = Math.min((now - t0) / 1600, 1),
            ease = 1 - Math.pow(1 - p, 3);
          el.innerHTML = Math.round(ease * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.innerHTML = target + suffix;
        })(t0);
        co.unobserve(el);
      }
    }),
  { threshold: 0.5 },
);
document
  .querySelectorAll('.stat-num[data-count]')
  .forEach((c) => co.observe(c));

// Skill Bars
const so = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        so.unobserve(e.target);
      }
    }),
  { threshold: 0.5 },
);
document.querySelectorAll('.skill-bar-fill').forEach((b) => so.observe(b));

// Back To Top
const bt = document.getElementById('backTop');
window.addEventListener(
  'scroll',
  () => bt.classList.toggle('visible', window.scrollY > 400),
  { passive: true },
);
bt.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' }),
);

// Form
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-primary');
  btn.style.opacity = '0.5';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    btn.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'flex';
    this.reset();
  }, 800);
});

// Footer Year
document.getElementById('footerYear').textContent =
  '© ' + new Date().getFullYear();
