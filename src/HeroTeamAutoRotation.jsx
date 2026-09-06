import { useEffect } from 'react';

const ROTATION_INTERVAL_MS = 3000;

export default function HeroTeamAutoRotation() {
  useEffect(() => {
    const rotate = () => {
      const buttons = Array.from(document.querySelectorAll('.v2-hero__portrait-selector button'));
      if (buttons.length < 2) return;

      const currentIndex = buttons.findIndex((button) => button.classList.contains('is-active'));
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % buttons.length : 0;
      buttons[nextIndex]?.click();
    };

    const timer = window.setInterval(rotate, ROTATION_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return null;
}
