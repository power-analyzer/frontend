import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  Collapse,
} from 'reactstrap';

export class MainNav extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
          <NavbarBrand><Link className="navbar-brand" to="dashboard">Power Analyzer</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="dashboard">Dashboard</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="data">Data</Link>
              </NavItem>
            </Nav>
            <Nav navbar>
              <NavItem>
                <Link className="nav-link" to="/">Logout</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}
