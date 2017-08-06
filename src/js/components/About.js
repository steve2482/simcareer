import React from 'react';
import { Col, Table } from 'react-bootstrap';

import '../../stylesheets/About.css';

export default function About() {
  return (
    <div className='container about'>
      <h1 className='center'>About SimCareer</h1>
      <h4>Description</h4>
      <p className='indent'>SimCareer is a web based application where <a href='iracing.com'>iRacing</a> members can progress through a racing career following a path chosen by them along with the typical real life path. SimCareer will update your career race results automatically and notify you of your progress and when your career needs attention.</p>
      <h4>How it Works</h4>
      <p className='indent'>SimCareer is a 'single player' career mode, however iRacing is exclusively multiplayer. So how does SimCareer act as a single player career? The application will take your race results and will rank your competitors via Irating, and change thier names to something a bit more fun. Then points will be assigned based on finishing order.</p>
      <div className='results-example'>
        <Col md={6}>
          <p className='indent'>Example Result:</p>
          <Table responsive>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Name</th>
                <th>Irating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Jack Smith</td>
                <td>4000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>John Hunter</td>
                <td>5000</td>
              </tr> 
              <tr>
                <td>3</td>
                <td>User</td>
                <td>2000</td>
              </tr> 
              <tr>
                <td>4</td>
                <td>Steve Grey</td>
                <td>3000</td>
              </tr> 
              <tr>
                <td>5</td>
                <td>Mike Johnson</td>
                <td>1000</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <p className='indent'>Results in Standings of:</p>
          <Table responsive>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Name</th>
                <th>Driver Ranking</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Christian Fittipaldi</td>
                <td>2</td>
                <td>5</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Steven Simpson</td>
                <td>1</td>
                <td>4</td>
              </tr> 
              <tr>
                <td>3</td>
                <td>User</td>
                <td>N/A</td>
                <td>3</td>
              </tr> 
              <tr>
                <td>4</td>
                <td>Jordan Taylor</td>
                <td>3</td>
                <td>2</td>
              </tr> 
              <tr>
                <td>5</td>
                <td>Eric Curran</td>
                <td>4</td>
                <td>1</td>
              </tr>
            </tbody>
          </Table>
        </Col>   
      </div>
      <h4>Career Paths</h4>
      <p className='indent'>You choose what discipline you want to race in and how you want to get to the top. Assuming you are fast enough that is.</p>
      <h4>Your Job</h4>
      <p className='indent'>Just register with your iRacing Name and member ID. After that, you will be notified via email of your progress and asked to select your next contract at the end of each season.</p>
    </div>
  )
}