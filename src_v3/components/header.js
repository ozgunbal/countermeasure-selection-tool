import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <NavItem componentClass={Link} href="/ "to='/'>Home</NavItem>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav bsStyle="pills">
      <NavItem componentClass={Link} href="/system" to='/system'>System, Attacks and Countermeasures</NavItem>
      <NavItem componentClass={Link} href="/volume"to='/volume'>3D Volume Model</NavItem>
      <NavItem componentClass={Link} href="/polygon" to='/polygon'>n-Polygon Model</NavItem>
    </Nav>
  </Navbar>
)

export default Header;