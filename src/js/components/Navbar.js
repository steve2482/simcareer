import React from 'react';
import { Button, FormControl, FormGroup, Glyphicon, MenuItem, Modal, Navbar, Nav, NavItem, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

import { Link } from 'react-router-dom';

import '../../stylesheets/Navbar.css';

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  toggleLoginModal() {
    this.props.dispatch(
      actions.toggleLoginModal());
  }

  toggleRegisterModal() {
    this.props.dispatch(
      actions.toggleRegisterModal());
  }

  registerUser(e) {
    e.preventDefault();
    const newUser = {
      name: this.firstName.value + ' ' + this.lastName.value,
      email: this.email.value,
      memberId: this.memberId.value,
      password: this.password.value,
      password2: this.password2.value
    };
    this.props.dispatch(
      actions.registerNewUser(newUser, this.props.history))
    this.props.dispatch(
      actions.toggleRegisterModal());
  }

  validatePassword() {
    let password = this.password.value;
    let password2 = this.password2.value;
    let boolean = (password === password2)
    this.props.dispatch(
      actions.setValidPassword(boolean));
  }

  render() {
    // Tooltip for memberId field
    const memberIdTooltip = (
      <Tooltip id='tooltip'>Your Iracing member id is used to gather your race results only. In no way can we access your Iracing account info.</Tooltip>);
    
    // If registration passwords do not match show error message
    let passwordErrorMsg;
    if (!this.props.state.isValidPassword) {
      passwordErrorMsg = (
        <p className='alert alert-danger'>Passwords must match</p>
      );
    }

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
                <FormControl type="email" placeholder="Email Address" required />
              </FormGroup>
              <FormGroup controlId="formBasicText">
                <FormControl type="password" placeholder="Password" required />
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
            <form onSubmit={this.registerUser}>
              <FormGroup controlId="formBasicText">
                <FormControl type="text" inputRef={input => this.firstName = input} placeholder="First Name" required />
              </FormGroup>
              <FormGroup controlId="formBasicText">
                <FormControl type="text" inputRef={input => this.lastName = input} placeholder="Last Name" required />
              </FormGroup>
              <FormGroup controlId="formBasicText">
                <FormControl type="email" inputRef={input => this.email = input} placeholder="Email Address" required />
              </FormGroup>
              <OverlayTrigger placement='right' overlay={memberIdTooltip}><Glyphicon glyph='question-sign' />
              </OverlayTrigger>
              <FormGroup controlId="formBasicText">
                <FormControl type="number" inputRef={input => this.memberId = input} placeholder="Iracing Member ID" required />
              </FormGroup>
              <FormGroup controlId="formBasicText">
                <FormControl type="password" inputRef={input => this.password = input} placeholder="Password" required />
              </FormGroup>
              <FormGroup controlId="formBasicText">
                <FormControl type="password" inputRef={input => this.password2 = input} placeholder="Confirm Password" required onChange={this.validatePassword}/>
              </FormGroup>
              {passwordErrorMsg}
              <Button type='submit' disabled={!this.props.state.isValidPassword}>Submit</Button>
            </form>
          </Modal.Body>          
        </Modal>
      </div>
    );
  }  
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Navigation)
