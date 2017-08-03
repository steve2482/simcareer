import React from 'react';
import { Glyphicon, MenuItem, Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

import '../stylesheets/Navbar.css';

export default function Navigation() {
  return (
    <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">SimCareer</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#"><Glyphicon glyph='question-sign' /> About</NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#"><Glyphicon glyph='user' /> Login</NavItem>
        <NavItem eventKey={2} href="#"><Glyphicon glyph='pencil' /> Register</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    );
}