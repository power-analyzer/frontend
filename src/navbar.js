import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem

} from 'react-bootstrap';

export class MainNav extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="dashboard">Power Analyzer</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>
              <Link to="dashboard">Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link to="data">Data</Link>
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>
              <Link to="/">Logout</Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
