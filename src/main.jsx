import React from 'react';
import ReactDOM from 'react-dom/client';
import AppV4 from './AppV4';
import { initV4Motion } from './v4-motion';
import { transformacao02Image } from './generated/transformacao02Image';
import './app-v4.css';
import './v4-fixes.css';
import './v4-motion.css';

// Generated presentation asset for Transformation 02. Keeping it isolated here
// lets the clinical gallery data remain untouched while the V4 showcase uses
// the cleaned composition requested for the public site.
document.documentElement.style.setProperty(
  '--transformacao-02-image',
  `url("${transformacao02Image}")`,
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppV4 />
  </React.StrictMode>,
);

window.requestAnimationFrame(() => initV4Motion());
