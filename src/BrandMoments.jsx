import { useEffect } from 'react';

const sectionSelectors = [
  '.v2-hero',
  '.v2-about',
  '.v2-treatments',
  '.v2-specialists',
  '#resultados',
  '.v2-experience',
  '.v2-testimonials',
  '.v2-visual-story',
  '.v2-info',
  '.v2-contact',
];

const magneticSelector = '.v2-button, .v2-header-cta, .v2-text-link';

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export default function BrandMoments() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    root.classList.add('brand-v4');

    const sections = sectionSelectors
      .map((selector) => document.querySelector(selector))
      .filter(Boolean);

    sections.forEach((section, index) => {
      section.classList.add('brand-v4-section');
      section.style.setProperty('--brand-section-index', String(index));
    });

    const people = Array.from(document.querySelectorAll('.v2-person'));
    people.forEach((person, index) => {
      person.style.setProperty('--brand-person-index', String(index));
    });

    let raf = 0;
    const update = () => {
      const viewport = window.innerHeight || 1;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const travel = rect.height + viewport;
        const progress = clamp((viewport - rect.top) / travel);
        const center = clamp((viewport * 0.5 - (rect.top + rect.height * 0.5)) / viewport, -1, 1);
        section.style.setProperty('--brand-progress', progress.toFixed(4));
        section.style.setProperty('--brand-center', center.toFixed(4));
      });

      people.forEach((person) => {
        const rect = person.getBoundingClientRect();
        const centerDistance = Math.abs((rect.top + rect.height * 0.5) - viewport * 0.52);
        const focus = 1 - clamp(centerDistance / (viewport * 0.72));
        person.style.setProperty('--brand-focus', focus.toFixed(4));
      });

      raf = 0;
    };

    const requestUpdate = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    const magneticElements = !reducedMotion && finePointer
      ? Array.from(document.querySelectorAll(magneticSelector))
      : [];

    const cleanups = magneticElements.map((element) => {
      const onMove = (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty('--brand-mx', `${(x * 5).toFixed(2)}px`);
        element.style.setProperty('--brand-my', `${(y * 4).toFixed(2)}px`);
      };

      const onLeave = () => {
        element.style.setProperty('--brand-mx', '0px');
        element.style.setProperty('--brand-my', '0px');
      };

      element.addEventListener('pointermove', onMove);
      element.addEventListener('pointerleave', onLeave);

      return () => {
        element.removeEventListener('pointermove', onMove);
        element.removeEventListener('pointerleave', onLeave);
        element.style.removeProperty('--brand-mx');
        element.style.removeProperty('--brand-my');
      };
    });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      cleanups.forEach((cleanup) => cleanup());
      sections.forEach((section) => {
        section.classList.remove('brand-v4-section');
        section.style.removeProperty('--brand-progress');
        section.style.removeProperty('--brand-center');
        section.style.removeProperty('--brand-section-index');
      });
      people.forEach((person) => {
        person.style.removeProperty('--brand-focus');
        person.style.removeProperty('--brand-person-index');
      });
      root.classList.remove('brand-v4');
    };
  }, []);

  return null;
}
