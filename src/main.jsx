import React from 'react';
import ReactDOM from 'react-dom/client';
import AppV4 from './AppV4';
import './app-v4.css';
import './v4-fixes.css';
import './v5-experience.css';
import './heroAutoplayHotfix';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppV4 />
  </React.StrictMode>,
);

