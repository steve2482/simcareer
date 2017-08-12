import React from 'react';
import { connect } from 'react-redux';

export class Contracts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <h1>This is the User's Contracts'</h1>
    );
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Contracts)