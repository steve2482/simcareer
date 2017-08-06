import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

import '../../stylesheets/Landing-page.css'

// Import background image
import BackgroundImage from '../../assets/images/finish-line.jpg';
const backgroundStyle = {
  backgroundImage: `url(${BackgroundImage})`
}

export default function LandingPage() {
  return (
    <div className='landing-background' style={backgroundStyle}>
      <div className='landing-desc'>
        <h1 id='landing-header'><strong>SimCareer</strong></h1>
        <h3 id='landing-tag-line'>The track is yours</h3>
      </div>
    </div>
  );
}
 