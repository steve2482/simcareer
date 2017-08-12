import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

// Components
import About from './About.js';
import LandingPage from './Landing-page.js';
import Navigation from './Navbar';
import UserDashboard from './User-dashboard';

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
      </div>
    </BrowserRouter>
  );
}
