import React from 'react';
import { connect } from 'react-redux';

export class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p className='alert alert-danger'>{this.props.message}</p>
    )
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(ErrorMessage)
