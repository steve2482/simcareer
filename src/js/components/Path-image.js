import React from 'react';
import { Thumbnail } from 'react-bootstrap'

export default function PathImage(props) {
  let pathName = props.pathName;
  let image = props.image;
  return (
    <div className='path-selector'>
      <a href='#'>
        <Thumbnail src={image} alt={pathName}>
          <h3>{pathName}</h3>
        </Thumbnail>
      </a>
    </div>  
  );
}