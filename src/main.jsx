import React from 'react';
import ReactDOM from 'react-dom/client';
import AppV2 from './AppV2';
import HeroTeamAutoRotation from './HeroTeamAutoRotation';
import MotionExperience from './MotionExperience';
import BrandMoments from './BrandMoments';
import './app-v2.css';
import './hero-team.css';
import './motion-v3.css';
import './brand-v4.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppV2 />
    <HeroTeamAutoRotation />
    <MotionExperience />
    <BrandMoments />
  </React.StrictMode>,
);
