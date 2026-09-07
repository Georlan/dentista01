import React from 'react';
import ReactDOM from 'react-dom/client';
import AppV2 from './AppV2';
import HeroTeamAutoRotation from './HeroTeamAutoRotation';
import MotionExperience from './MotionExperience';
import './app-v2.css';
import './hero-team.css';
import './motion-v3.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppV2 />
    <HeroTeamAutoRotation />
    <MotionExperience />
  </React.StrictMode>,
);
