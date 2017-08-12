import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

// Components
import About from './About.js';
import AllTimeStats from './All-time-stats.js';
import CareerStats from './Career-stats.js';
import Contracts from './Contracts.js';
import CurrentSeason from './Current-season.js';
import LandingPage from './Landing-page.js';
import Navigation from './Navbar.js';
import UserDashboard from './User-dashboard.js';

// Get history
const history = createBrowserHistory();

export default function App() {
  return(
    <BrowserRouter history={history}>
      <div className='layout'>
        <Route component={Navigation} />        
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/about' component={About} />
        <Route exact path='/:username/dashboard' component={UserDashboard} />
        <Route exact path='/:username/current-season' component={CurrentSeason} />       
        <Route exact path='/:username/contracts' component={Contracts} />       
        <Route exact path='/:username/career-stats' component={CareerStats} />       
        <Route exact path='/:username/all-time-stats' component={AllTimeStats} />       

      </div>
    </BrowserRouter>
  );
}
