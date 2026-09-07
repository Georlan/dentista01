const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function initV4Motion() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const header = document.querySelector('.v4-header');
  const hero = document.querySelector('.v4-hero');

  body.classList.add('v4-motion-ready');

  const progress = document.createElement('div');
  progress.className = 'v4-scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';
  body.appendChild(progress);

  const revealSelectors = [
    '.v4-about__copy',
    '.v4-about__media',
    '.v4-section-head',
    '.v4-care__panels',
    '.v4-secondary-care',
    '.v4-results__head',
    '.v4-results__stage',
    '.v4-results__nav',
    '.v4-specialists__track',
    '.v4-experience__copy',
    '.v4-experience__media',
    '.v4-experience__items',
    '.v4-testimonials__grid > div',
    '.v4-testimonials blockquote',
    '.v4-info__grid > div',
    '.v4-contact__copy',
    '.v4-map',
  ];

  const revealTargets = [...document.querySelectorAll(revealSelectors.join(','))];
  revealTargets.forEach((target) => target.classList.add('v4-motion-reveal'));

  const mediaTargets = [
    ...document.querySelectorAll('.v4-about__media, .v4-results__stage figure, .v4-experience__media, .v4-person__media, .v4-map'),
  ];
  mediaTargets.forEach((target) => target.classList.add('v4-motion-media'));

  const staggerGroups = [
    ['.v4-trust', '.v4-trust span'],
    ['.v4-secondary-care', '.v4-secondary-care article'],
    ['.v4-specialists__track', '.v4-person'],
    ['.v4-experience__items', '.v4-experience__items > div'],
    ['.v4-agreements', '.v4-agreements > div'],
    ['.v4-contact__facts', '.v4-contact__facts > div'],
  ];

  staggerGroups.forEach(([groupSelector, itemSelector]) => {
    const group = document.querySelector(groupSelector);
    if (!group) return;
    group.classList.add('v4-motion-stagger');
    [...document.querySelectorAll(itemSelector)].forEach((item, index) => {
      item.style.setProperty('--motion-index', String(index));
    });
  });

  const sections = [...document.querySelectorAll('main section, body > #root section')];
  sections.forEach((section) => section.classList.add('v4-motion-section'));

  if (reduced) {
    [...new Set([...revealTargets, ...mediaTargets])].forEach((target) => target.classList.add('is-motion-visible'));
    document.querySelectorAll('.v4-motion-stagger').forEach((target) => target.classList.add('is-motion-visible'));
    sections.forEach((section) => section.classList.add('is-motion-visible'));
    progress.remove();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-motion-visible');
        if (!entry.target.classList.contains('v4-motion-section')) observer.unobserve(entry.target);
      });
    },
    { threshold: 0.13, rootMargin: '0px 0px -9% 0px' },
  );

  [...new Set([...revealTargets, ...mediaTargets])].forEach((target) => observer.observe(target));
  document.querySelectorAll('.v4-motion-stagger').forEach((target) => observer.observe(target));
  sections.forEach((section) => observer.observe(section));

  let ticking = false;
  const updateScroll = () => {
    ticking = false;
    const y = window.scrollY || window.pageYOffset;
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const ratio = clamp(y / max);
    progress.style.setProperty('--scroll-progress', String(ratio));

    if (header) header.classList.toggle('is-scrolled', y > 24);

    if (hero) {
      const heroHeight = Math.max(hero.offsetHeight, 1);
      const heroProgress = clamp(y / (heroHeight * 0.9));
      hero.style.setProperty('--hero-scroll', String(heroProgress));
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScroll);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateScroll();

  if (window.matchMedia('(pointer: fine)').matches) {
    const ambientSections = document.querySelectorAll('.v4-care, .v4-specialists, .v4-experience, .v4-contact');
    ambientSections.forEach((section) => {
      section.classList.add('v4-motion-ambient');
      section.addEventListener('pointermove', (event) => {
        const rect = section.getBoundingClientRect();
        section.style.setProperty('--motion-x', `${event.clientX - rect.left}px`);
        section.style.setProperty('--motion-y', `${event.clientY - rect.top}px`);
      }, { passive: true });
    });
  }
}
