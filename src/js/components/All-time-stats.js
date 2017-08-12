import React from 'react';
import { connect } from 'react-redux';

export class AllTimeStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <h1>This is the All Time Stats</h1>
    );
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(AllTimeStats)