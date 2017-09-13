import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Grid, Image, Panel, Row, Thumbnail, Well } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import * as actions from '../actions/actions.js';

import roadImg from '../../assets/images/road-course.jpg';
import ovalImg from '../../assets/images/oval-course.jpg';
import solsticeImg from '../../assets/images/pontiac-solstice.jpg';

import '../../stylesheets/User-dashboard.css';

// Import background image
import BackgroundImage from '../../assets/images/finish-line.jpg';
const backgroundStyle = {
  backgroundImage: `url(${BackgroundImage})`
}

export class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.diciplineSelection = this.diciplineSelection.bind(this);
  }

  diciplineSelection(dicipline) {
    this.props.dispatch(
      actions.diciplineSelection(this.props.state.user.userName, dicipline));
  }

  render() {
    const user = this.props.state.user;
    let carImage;

    if (user.currentCarId === 3) {
      carImage = solsticeImg;
    }

    // If the user has not selected a path
    if (!user || !user.path) {
      return (
        <div className='center path-window'>
          <h1>Welcome to the begining of your racing career, rookie!</h1>
          <p>First you must choose which type of racing you want to compete in. Oval racing, where you can take on the challenge of being the next NASCAR or Indycar champion. On the road racing side, slug it out in tin top sports cars or make an attempt at becoming a Formula 1 world champion.</p>
          <div className='path-selections'>
            <Grid>
              <Row>
                <Col md={6}>
                  <Thumbnail src={ovalImg} alt='Oval'>
                    <h3>Oval</h3>
                    <Button bsStyle='primary' onClick={() => {this.diciplineSelection('oval')}}>Select</Button>
                  </Thumbnail>
                </Col>
                <Col md={6}>
                  <Thumbnail src={roadImg} alt='Oval'>
                    <h3>Road</h3>
                    <Button bsStyle='primary' onClick={() => {this.diciplineSelection('road')}}>Select</Button>
                  </Thumbnail>
                </Col>
              </Row>
            </Grid>           
          </div>
        </div> 
      );    
    } 
    if (!user.currentCar) {
      return (
        <div className='center'>
          <h1>First Contract</h1>
          <p>It looks like you need to select a contract to drive. Head over to the contracts page and see who is offering you a ride.</p>
        </div>
      );
    } else {
      const panelTitle = (
        <h1>{user.name}</h1>)
      const lastRaceIndex = user.seasonResults.length -1;

      // Find user points standing
      function equalsUser(driver) {
        return driver.name === user.name;
      }
      let pointsPos = user.seasonStandings.findIndex(equalsUser);

      return (
        <div className='background' style={backgroundStyle}>
          <div className='container dashboard center'>
            <Panel header={panelTitle} bsStyle='primary'>
              <Grid className='dashboard-grid'>
                <Row>
                  <Col xs={12} md={8}>
                    <Well bsSize='large'>
                      <Image src={carImage} thumbnail />
                    </Well>
                  </Col>
                  <Col xs={6} md={4}>
                    <Well className='center overview' bsSize='large'>
                    <h3 className='center'>Overview</h3>
                      Season Number: <strong>{user.seasonNumber}</strong><br/>
                      Tier: <strong>{user.tier}</strong><br/>
                      Current Series: <strong>{user.currentSeries}</strong><br/>
                      Current Car: <strong>{user.currentCar}</strong><br/>
                      Last Race Result: <strong>{user.seasonResults[lastRaceIndex][0].finishPos}</strong><br/>
                      Current Point Standing: <strong>{pointsPos + 1}</strong><br/>
                      Races Remaining in Season: <strong>{10 - user.seasonResults.length}</strong>
                    </Well>
                  </Col>
                </Row>
              </Grid>
            </Panel>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(UserDashboard)
