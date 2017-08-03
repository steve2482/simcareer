import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

import '../stylesheets/Landing-page.css'
import BackgroundImage from '../assets/images/finish-line.jpg';

export default function LandingPage() {
  const backgroundStyle = {
    backgroundImage: `url(${BackgroundImage})`
  }

  return (
    <div className='landing-background' style={backgroundStyle}>
      <div className='landing-desc'>
        <h1 id='landing-header'><strong>Welcome to SimCareer</strong></h1>
        <h3 id='landing-tag-line'>The track is yours</h3>
      </div>
    </div>
  );
}
 