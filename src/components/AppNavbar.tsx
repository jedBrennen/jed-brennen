import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class AppNavbar extends Component {
  render() {
    return (
      <Navbar bg="primary" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Jed Brennen</Navbar.Brand>
          </LinkContainer>
          <Nav className="flex-row">
            <Nav.Item>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/projects">
                <Nav.Link>Projects</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/Companies">
                <Nav.Link>Companies</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}
