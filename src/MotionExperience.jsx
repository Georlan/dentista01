import { useEffect } from 'react';

const revealSelectors = [
  '.v2-trust__grid > div',
  '.v2-eyebrow',
  '.v2-about__title',
  '.v2-about__body',
  '.v2-about__media',
  '.v2-section-head',
  '.v2-treatment-list button',
  '.v2-treatment-detail',
  '.v2-person',
  '.v2-experience__copy',
  '.v2-experience__media',
  '.v2-experience__items > div',
  '.v2-testimonials__grid > *',
  '.v2-visual-story figure',
  '.v2-info__grid > div',
  '.v2-contact__copy > *',
  '.v2-contact__map',
];

const parallaxSelectors = [
  '.v2-about__media',
  '.v2-experience__media',
  '.v2-visual-story figure',
];

export default function MotionExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.classList.add('motion-v3');

    const revealTargets = [];
    revealSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add('motion-v3-reveal');
        element.style.setProperty('--motion-delay', `${Math.min(index * 65, 260)}ms`);
        revealTargets.push(element);
      });
    });

    let observer;
    if (reducedMotion) {
      revealTargets.forEach((element) => element.classList.add('is-visible'));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
      );
      revealTargets.forEach((element) => observer.observe(element));
    }

    const parallaxTargets = reducedMotion
      ? []
      : parallaxSelectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)));

    parallaxTargets.forEach((element) => element.classList.add('motion-v3-parallax'));

    let raf = 0;
    const updateMotion = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollTop / scrollable));
      root.style.setProperty('--motion-progress', String(progress));
      root.style.setProperty('--motion-hero-shift', `${Math.min(scrollTop * 0.055, 48).toFixed(2)}px`);

      if (!reducedMotion) {
        const viewportCenter = window.innerHeight / 2;
        parallaxTargets.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;
          const elementCenter = rect.top + rect.height / 2;
          const offset = Math.max(-28, Math.min(28, (viewportCenter - elementCenter) * 0.045));
          element.style.setProperty('--motion-parallax', `${offset.toFixed(2)}px`);
        });
      }

      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(updateMotion);
    };

    updateMotion();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      observer?.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      revealTargets.forEach((element) => {
        element.classList.remove('motion-v3-reveal', 'is-visible');
        element.style.removeProperty('--motion-delay');
      });
      parallaxTargets.forEach((element) => {
        element.classList.remove('motion-v3-parallax');
        element.style.removeProperty('--motion-parallax');
      });
      root.classList.remove('motion-v3');
      root.style.removeProperty('--motion-progress');
      root.style.removeProperty('--motion-hero-shift');
    };
  }, []);

  return (
    <div className="motion-v3-progress" aria-hidden="true">
      <span />
    </div>
  );
}
