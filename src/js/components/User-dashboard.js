import React from 'react';
import { connect } from 'react-redux';
import { Col, Grid, Row, Thumbnail } from 'react-bootstrap'
import roadImg from '../../assets/images/road-course.jpg';
import ovalImg from '../../assets/images/oval-course.jpg';

import '../../stylesheets/User-dashboard.css';


export class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.state.user;

    // If the user has not selected a path
    if (!user.path) {
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
                  </Thumbnail>
                </Col>
                <Col md={6}>
                  <Thumbnail src={roadImg} alt='Oval'>
                    <h3>Road</h3>
                  </Thumbnail>
                </Col>
              </Row>
            </Grid>           
          </div>
        </div> 
      );    
    } else {
      return(
        <h1>This is the User Dashboard</h1>
      );
    }
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(UserDashboard)
