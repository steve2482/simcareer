import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

// Imported Components
import { Link } from 'react-router-dom';
import { Button, FormControl, FormGroup, Glyphicon, MenuItem, Modal, Navbar, Nav, NavItem, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaArchive } from 'react-icons/lib/fa';
import ErrorMessage from './Error-message.js';

// Stylesheet
import '../../stylesheets/Navbar.css';

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.toggleForgotPasswordModal = this.toggleForgotPasswordModal.bind(this);
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    this.toggleContactModal = this.toggleContactModal.bind(this);
    this.toggleContactSuccessModal = this.toggleContactSuccessModal.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateResetPassword = this.validateResetPassword.bind(this);
    this.validateNewMemberId = this.validateNewMemberId.bind(this);
    this.resetPassword = this.resetPassword.bind(this);    
    this.userLogIn = this.userLogIn.bind(this);
    this.submitContactForm = this.submitContactForm.bind(this);
    this.userLogout = this.userLogout.bind(this);
  }

  toggleLoginModal() {
    this.props.dispatch(
      actions.toggleLoginModal());
  }

  toggleForgotPasswordModal() {
    this.toggleLoginModal();
    this.props.dispatch(
      actions.toggleForgotPasswordModal());
  }

  toggleRegisterModal() {
    this.props.dispatch(
      actions.toggleRegisterModal());
  }

  toggleContactModal() {
    this.props.dispatch(
      actions.toggleContactModal());
  }

  toggleContactSuccessModal() {
    this.props.dispatch(
      actions.toggleContactSuccessModal());
  }

  registerUser(e) {
    e.preventDefault();
    const newUser = {
      name: this.firstName.value + ' ' + this.lastName.value,
      email: this.email.value,
      memberId: this.memberId.value,
      userName: this.userName.value,
      password: this.password.value,
      password2: this.password2.value,
      secretAnswer: this.answer.value
    };
    this.props.dispatch(
      actions.registerNewUser(newUser, this.props.history));
    this.props.dispatch(
      actions.toggleRegisterModal());
  }

  validateNewMemberId() {
    let memberId = {
      memberId: this.memberId.value
    };
    this.props.dispatch(
      actions.validateNewMemberId(memberId));
  }

  validatePassword() {
    let password = this.password.value;
    let password2 = this.password2.value;
    let boolean = (password === password2)
    this.props.dispatch(
      actions.setValidPassword(boolean));
  }

  validateResetPassword() {
    let password = this.newPassword.value;
    let password2 = this.password2.value;
    let boolean = (password === password2)
    this.props.dispatch(
      actions.setValidPassword(boolean));
  }

  resetPassword(e) {
    e.preventDefault();
    const userInfo = {
      userName: this.userName.value,
      answer: this.answer.value,
      newPassword: this.newPassword.value
    };
    this.props.dispatch(
      actions.resetPassword(userInfo));
  }

  userLogIn(e) {
    e.preventDefault();
    const user = {
      username: this.userName.value,
      password: this.password.value
    };
    this.props.dispatch(
      actions.userLogIn(user, this.props.history));
  }

  userLogout(e) {
    e.preventDefault();
    this.props.dispatch(
      actions.userLogout(this.props.history));
  }

  submitContactForm(e) {
    e.preventDefault();
    const info = {
      name: this.name.value,
      email: this.email.value,
      message: this.message.value
    };
    this.props.dispatch(
      actions.sendSupportTicket(info));
    this.toggleContactModal();
  }

  render() {
    console.log(this.props.state);
    // Tooltip for memberId field
    const memberIdTooltip = (
      <Tooltip id='tooltip'>Your Iracing member id is used to gather your race results only. In no way can we access your Iracing account info.</Tooltip>);
    
    // If registration passwords do not match show error message
    let passwordErrorMsg;
    if (!this.props.state.isValidPassword) {
      passwordErrorMsg = (
        <ErrorMessage message='Passwords must match' />
      );
    }

    let memberIdErrorMsg;
    if (!this.props.state.idIsValid) {
      memberIdErrorMsg = (
        <ErrorMessage message={this.props.state.errors} />
      );
    }

    let errors;
    if (this.props.state.errors) {
      errors = (
        <ErrorMessage message={this.props.state.errors} />
      );
    }

    // IF USER IS SIGNED IN
    if (this.props.state.user) {
      const user = this.props.state.user;
      return (
        <div>
          {/*Navbar*/}
          <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              SimCareer
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem><Link to='/about'><Glyphicon glyph='question-sign' /> About </Link></NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem><Link to={`/${user.userName}/dashboard`}><Glyphicon glyph='dashboard' /> Dashboard</Link></NavItem>
              <NavItem><Link to={`/${user.userName}/current-season`}><Glyphicon glyph='flag' /> Current Season</Link></NavItem>
              <NavItem><Link to={`/${user.userName}/contracts`}><Glyphicon glyph='briefcase' /> Contracts</Link></NavItem>
              <NavItem><Link to={`/${user.userName}/career-stats`}><Glyphicon glyph='stats' /> Career Stats</Link></NavItem>
              <NavItem><Link to={`/${user.userName}/all-time-stats`}><FaArchive /> All time Stats</Link></NavItem>
              <NavItem onClick={this.userLogout}><Glyphicon glyph='log-out' /> Logout</NavItem>
              <NavItem onClick={this.toggleContactModal}><Glyphicon glyph='envelope' /> Contact </NavItem>
            </Nav>
          </Navbar.Collapse>
          </Navbar>

          {/*Contact Modal*/}
          <Modal show={this.props.state.showContact} onHide={this.toggleContactModal}>
            <Modal.Header closeButton>
              <Modal.Title>Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.submitContactForm} >
                <FormGroup controlId="formBasicText">
                  <FormControl type='text' inputRef={input => this.name = input} placeholder='Name' required />
                </FormGroup>
                <FormGroup controlId="formBasicText">
                  <FormControl type="email" inputRef={input => this.email = input} placeholder="Email" required />
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <FormControl componentClass='textarea' inputRef={input => this.message = input} placeholder="What can we do to help?" required />
                </FormGroup>
                {errors}
                <Button type='submit'>Submit</Button>
              </form>
            </Modal.Body> 
          </Modal>

          {/*Contact Success Modal*/}
          <Modal show={this.props.state.showContactSuccess} onHide={this.toggleContactSuccessModal}>
            <Modal.Header closeButton>
              <Modal.Title>Thank You!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className='alert alert-success'>Your message was received. Please allow support 24 hours to respond to your inquire.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.toggleContactSuccessModal}>Ok</Button>
            </Modal.Footer> 
          </Modal>
        </div>
      )
    } else {
    // IF USER IS NOT SIGNED IN======================================
    // ==============================================================
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
              <NavItem eventKey={1}><Link to='/about'><Glyphicon glyph='question-sign' /> About </Link></NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} onClick={this.toggleLoginModal}><Glyphicon glyph='user' /> Login </NavItem>
              <NavItem eventKey={2} onClick={this.toggleRegisterModal}><Glyphicon glyph='pencil' /> Register </NavItem>
              <NavItem onClick={this.toggleContactModal}><Glyphicon glyph='envelope' /> Contact </NavItem>
            </Nav>
          </Navbar.Collapse>
          </Navbar>

          {/*Login Modal*/}
          <Modal show={this.props.state.showLogin} onHide={this.toggleLoginModal}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.userLogIn}>
                <FormGroup controlId="formBasicText">
                  <FormControl type="text" inputRef={input => this.userName = input} placeholder="Username" required />
                </FormGroup>
                <FormGroup controlId="formBasicText">
                  <FormControl type="password" inputRef={input => this.password = input} placeholder="Password" required />
                </FormGroup>
                <a href='#' onClick={this.toggleForgotPasswordModal}>Forgot Password</a><br/>
                {errors}
                <Button type='submit'>Login</Button>
              </form>
            </Modal.Body> 
          </Modal>

          {/*Forgot Password Modal*/}
          <Modal show={this.props.state.showForgotPassword} onHide={this.toggleForgotPasswordModal}>
            <Modal.Header closeButton>
              <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.resetPassword}>
                <FormGroup controlId="formBasicText">
                  <FormControl type="text" inputRef={input => this.userName = input} placeholder="Username" required />
                </FormGroup>
                <FormGroup controlId="formBasicText">
                  <FormControl type="text" inputRef={input => this.answer = input} placeholder="Secret Question: What is your favorite race car?" required />
                </FormGroup>
                <FormGroup controlId="formBasicText">
                  <FormControl type="password" inputRef={input => this.newPassword = input} placeholder="New Password" required />
                </FormGroup>
                <FormGroup controlId="formBasicText">
                  <FormControl type="password" inputRef={input => this.password2 = input} placeholder="Confirm New Password" required onChange={this.validateResetPassword} />
                </FormGroup>
                {passwordErrorMsg}
                <Button type='submit'>Reset Password</Button>
              </form>
            </Modal.Body> 
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
                  <FormControl type="number" inputRef={input => this.memberId = input} placeholder="Iracing Member ID" required onChange={this.validateNewMemberId} />
                </FormGroup>
                <FormGroup controlId="formBasicText">
                  <FormControl type="text" inputRef={input => this.userName = input} placeholder="Username" required />
                </FormGroup>
                <FormGroup controlId="formBasicText">
                  <FormControl type="password" inputRef={input => this.password = input} placeholder="Password" required />
                </FormGroup>
                <FormGroup controlId="formBasicText">
                  <FormControl type="password" inputRef={input => this.password2 = input} placeholder="Confirm Password" required onChange={this.validatePassword}/>
                </FormGroup>
                <FormGroup controlId="formBasicText">
                  <FormControl type="text" inputRef={input => this.answer = input} placeholder="Secret Question: What is your favorite race car?" required />
                </FormGroup>
                {passwordErrorMsg}
                {memberIdErrorMsg}
                <Button type='submit' disabled={!this.props.state.isValidPassword || !this.props.state.idIsValid}>Register</Button>
              </form>
            </Modal.Body>          
          </Modal>

          {/*Contact Modal*/}
          <Modal show={this.props.state.showContact} onHide={this.toggleContactModal}>
            <Modal.Header closeButton>
              <Modal.Title>Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.submitContactForm}>
                <FormGroup controlId="formBasicText">
                  <FormControl type='text' inputRef={input => this.name = input} placeholder='Name' required />
                </FormGroup>
                <FormGroup controlId="formBasicText">
                  <FormControl type="email" inputRef={input => this.email = input} placeholder="Email" required />
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <FormControl componentClass='textarea' inputRef={input => this.message = input} placeholder="What can we do to help?" required />
                </FormGroup>
                {errors}
                <Button type='submit'>Submit</Button>
              </form>
            </Modal.Body> 
          </Modal>

        {/*Contact Success Modal*/}
          <Modal show={this.props.state.showContactSuccess} onHide={this.toggleContactSuccessModal}>
            <Modal.Header closeButton>
              <Modal.Title>Thank You!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className='alert alert-success'>Your message was received. Please allow support 24 hours to respond to your inquire.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.toggleContactSuccessModal}>Ok</Button>
            </Modal.Footer> 
          </Modal>
        </div>
      );
    }    
  }  
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Navigation)
