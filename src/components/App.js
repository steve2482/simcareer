import React from 'react';
import { BrpwserRpiter as Router, Route, browserHistory } from 'react-router-dom';

import LandingPage from './Landing-page.js';
import Navigation from './Navbar';

export default function App() {
  return(
    <div className='layout'>
      <Navigation />
      <LandingPage />
    </div>
  );
}
