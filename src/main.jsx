import React from 'react';
import ReactDOM from 'react-dom/client';
import AppV4 from './AppV4';
import { initV4Motion } from './v4-motion';
import { transformacao02Image } from './generated/transformacao02Image';
import './app-v4.css';
import './v4-fixes.css';
import './v4-motion.css';

document.documentElement.style.setProperty(
  '--transformacao-02-image',
  `url("${transformacao02Image}")`,
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppV4 />
  </React.StrictMode>,
);

// AppV4 still references the old Cloudinary asset in a couple of places.
// Replace only that compromised source with the cleaned presentation artwork,
// including after React swaps the active transformation.
const replaceCompromisedAsset = () => {
  document.querySelectorAll('img[src*="bennez79zg81hvsnbnp2"]').forEach((image) => {
    image.src = transformacao02Image;
    image.dataset.cleanedTransformation = 'true';
  });
};

window.requestAnimationFrame(() => {
  replaceCompromisedAsset();
  initV4Motion();

  const observer = new MutationObserver(replaceCompromisedAsset);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src'],
  });
});
