import ismaelImage from './data/ismaelImage';

const fallbackIsmaelImage = '/assets/team/ismael-lima.jpg';
let ismaelBlobUrl = fallbackIsmaelImage;

try {
  const [, payload = ''] = ismaelImage.split(',');
  if (payload) {
    const binary = window.atob(payload);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    ismaelBlobUrl = URL.createObjectURL(new Blob([bytes], { type: 'image/jpeg' }));
  }
} catch {
  ismaelBlobUrl = fallbackIsmaelImage;
}

function applyIsmaelImage() {
  document.querySelectorAll('img').forEach((image) => {
    const alt = (image.getAttribute('alt') || '').toLowerCase();
    if (!alt.includes('ismael lima')) return;
    if (image.dataset.ismaelImagePatched === 'true') return;

    image.dataset.ismaelImagePatched = 'true';
    image.addEventListener('error', () => {
      if (!image.src.endsWith(fallbackIsmaelImage)) image.src = fallbackIsmaelImage;
    }, { once: true });
    image.src = ismaelBlobUrl;
  });
}

const style = document.createElement('style');
style.textContent = `
  .v4-hero__selector {
    display: none !important;
  }

  .v4-hero__person {
    bottom: 34px !important;
  }

  @media (max-width: 720px) {
    .v4-hero__person {
      bottom: 22px !important;
    }
  }
`;
document.head.appendChild(style);

applyIsmaelImage();

const observer = new MutationObserver(() => applyIsmaelImage());
observer.observe(document.documentElement, { childList: true, subtree: true });

window.addEventListener('load', applyIsmaelImage, { once: true });
