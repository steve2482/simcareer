import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Grid, Panel, Row, Thumbnail } from 'react-bootstrap';
import * as actions from '../actions/actions.js';

import mazdaMx5Img from '../../assets/images/2016mazda-mx5.jpg';
import specFordImg from '../../assets/images/spec-ford.jpg';
import solsticeImg from '../../assets/images/pontiac-solstice.jpg';

export class Contracts extends React.Component {
  constructor(props) {
    super(props);
    this.contractSelection = this.contractSelection.bind(this);
  }

  contractSelection(car, carId, series, seriesId) {
    this.props.dispatch(
      actions.contractSelection(this.props.state.user.userName, car, carId, series, seriesId));
  }

  render() {
    const user = this.props.state.user;
    const seriesHeader = (
      <h3>Series</h3>
    );
    const carheader = (
      <h3>Car</h3>
    );
    const pathHeader = (
      <h3>Where this can take you</h3>
    );

    // If user is road racing and needs to select thier first contract
    if (user.path === 'road' && !user.currentCar) {
      return (
        <div className='center'>
          <div>
            <h1>Select your first contract</h1>
            <p>Can you believe it? You haven't even hit the track, and teams from 3 different series are offering you contracts to drive. You better not make fools of them!</p>
          </div>
          <div>
            <Grid>
                <Row>
                  <Col md={3}>
                    <Thumbnail src={mazdaMx5Img} alt='Mazda MX-5'>
                      <Panel header={seriesHeader} bsStyle='primary'>
                        <p>Global Mazda MX-5 Cup Series</p>
                      </Panel>
                      <Panel header={carheader} bsStyle='primary'>
                        <p>Global Mazda MX-5 Cup Car</p>
                      </Panel>
                      <Panel header={pathHeader} bsStyle='primary'>
                        <p>From the Global Mazda MX-5 Cup Series you can progress on to open wheel formula style cars or to 'tin top' sports cars.</p>
                      </Panel>
                      <Button bsStyle='primary' onClick={() => {this.contractSelection('Global Mazda MX-5 Cup', 67, 'Global Mazda MX-5 Cup Series', 139)}}>Select</Button>
                    </Thumbnail>
                  </Col>
                  <Col md={3}>
                    <Thumbnail src={specFordImg} alt='Spec Racer Ford'>
                      <Panel header={seriesHeader} bsStyle='primary'>
                        <p>Spec Racer Ford Challenge</p>
                      </Panel>
                      <Panel header={carheader} bsStyle='primary'>
                        <p>SCCA Spec Racer Ford</p>
                      </Panel>
                      <Panel header={pathHeader} bsStyle='primary'>
                        <p>From the Spec Racer For Challenge you can progress on to 'tin top' sports cars.</p>
                      </Panel>
                      <Button bsStyle='primary' onClick={() => {this.contractSelection('Spec Racer Ford', 23, 'Spec Racer Ford Challenge', 63)}}>Select</Button>
                    </Thumbnail>
                  </Col>
                  <Col md={3}>
                    <Thumbnail src={solsticeImg} alt='Pontiac Solstice'>
                      <Panel header={seriesHeader} bsStyle='primary'>
                        <p>Production Car Challenge</p>
                      </Panel>
                      <Panel header={carheader} bsStyle='primary'>
                        <p>Pontiac Solstice</p>
                      </Panel>
                      <Panel header={pathHeader} bsStyle='primary'>
                        <p>From the Production Car Challenge you can progress on 'tin top' sports cars.</p>
                      </Panel>
                      <Button bsStyle='primary' onClick={() => {this.contractSelection('Pontiac Solstice', 3, 'Production Car Challenge', 112)}}>Select</Button>
                    </Thumbnail>
                  </Col>
                  <Col md={3}>
                    <Thumbnail src={mazdaMx5Img} alt='Mazda MX-5'>
                      <Panel header={seriesHeader} bsStyle='primary'>
                        <p>Production Car Challenge</p>
                      </Panel>
                      <Panel header={carheader} bsStyle='primary'>
                        <p>Global Mazda MX-5 Cup Car</p>
                      </Panel>
                      <Panel header={pathHeader} bsStyle='primary'>
                        <p>From the Production Car Challenge you can progress on 'tin top' sports cars.</p>
                      </Panel>
                      <Button bsStyle='primary' onClick={() => {this.contractSelection('Global Mazda MX-5 Cup', 67, 'Production Car Challenge', 112)}}>Select</Button>
                    </Thumbnail>
                  </Col>
                </Row>
              </Grid>
          </div>
        </div>
      )
    }
    return (
      <h1>This is the User's Contracts'</h1>
    );
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Contracts)