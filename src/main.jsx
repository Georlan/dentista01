import React from 'react';
import ReactDOM from 'react-dom/client';
import AppV2 from './AppV2';
import HeroTeamAutoRotation from './HeroTeamAutoRotation';
import './app-v2.css';
import './hero-team.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppV2 />
    <HeroTeamAutoRotation />
  </React.StrictMode>,
);
