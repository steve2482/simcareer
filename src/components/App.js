import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import About from './About.js';
import LandingPage from './Landing-page.js';
import Navigation from './Navbar';

const history = createBrowserHistory();

export default function App() {
  return(
    <Router history={history}>
      <div className='layout'>
        <Navigation />
        <main>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/about' component={About} />
        </main>        
      </div>
    </Router>
  );
}
