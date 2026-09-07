import React from 'react';
import ReactDOM from 'react-dom/client';
import AppV4 from './AppV4';
import { initV4Motion } from './v4-motion';
import './app-v4.css';
import './v4-fixes.css';
import './v4-motion.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppV4 />
  </React.StrictMode>,
);

window.requestAnimationFrame(() => initV4Motion());
