import React from 'react';
import { Glyphicon, MenuItem, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../stylesheets/Navbar.css';

export default function Navigation() {
  return (
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
        <NavItem eventKey={1}><Glyphicon glyph='user' /> Login</NavItem>
        <NavItem eventKey={2}><Glyphicon glyph='pencil' /> Register</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    );
}