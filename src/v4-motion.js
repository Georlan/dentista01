// React owns initialization and cleanup; one passive listener drives the progress bar.
export function initV4Motion() {
  const progress = document.createElement('div');
  progress.className = 'v4-scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  let frame = 0;
  const update = () => {
    frame = 0;
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`;
  };
  const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    window.cancelAnimationFrame(frame);
    progress.remove();
  };
}
