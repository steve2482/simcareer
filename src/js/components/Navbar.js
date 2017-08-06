import React from 'react';
import { Button, FormControl, FormGroup, Glyphicon, MenuItem, Modal, Navbar, Nav, NavItem, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

import { Link } from 'react-router-dom';

import '../../stylesheets/Navbar.css';

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
  }

  toggleLoginModal() {
    this.props.dispatch(
      actions.toggleLoginModal());
  }

  toggleRegisterModal() {
    this.props.dispatch(
      actions.toggleRegisterModal());
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {/*Navbar*/}
        <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>SimCareer</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}><Link to='/about'><Glyphicon glyph='question-sign' /> About</Link></NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={this.toggleLoginModal}><Glyphicon glyph='user' /> Login</NavItem>
            <NavItem eventKey={2} onClick={this.toggleRegisterModal}><Glyphicon glyph='pencil' /> Register</NavItem>
          </Nav>
        </Navbar.Collapse>
        </Navbar>

        {/*Login Modal*/}
        <Modal show={this.props.state.showLogin} onHide={this.toggleLoginModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText">
                <FormControl type="text" placeholder="Email Address" />
              </FormGroup>
              <FormGroup controlId="formBasicText">
                <FormControl type="text" placeholder="Password" />
              </FormGroup>
              <a href='#'>Forgot Password</a>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button>Login</Button>
          </Modal.Footer>
        </Modal>

      {/*Register Modal*/}
        <Modal show={this.props.state.showRegister} onHide={this.toggleRegisterModal}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="formBasicText">
                <FormControl type="text" placeholder="First Name" />
            </FormGroup>
            <FormGroup controlId="formBasicText">
                <FormControl type="text" placeholder="Last Name" />
            </FormGroup>
            <FormGroup controlId="formBasicText">
                <FormControl type="text" placeholder="Email Address" />
            </FormGroup>
            <FormGroup controlId="formBasicText">
                <FormControl type="text" placeholder="Iracing Member ID" />
            </FormGroup>
            <FormGroup controlId="formBasicText">
                <FormControl type="text" placeholder="Password" />
            </FormGroup>
            <FormGroup controlId="formBasicText">
                <FormControl type="text" placeholder="Confirm Password" />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button>Register</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }  
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Navigation)
