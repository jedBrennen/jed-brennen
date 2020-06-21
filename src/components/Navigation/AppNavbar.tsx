import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OverlayNav from 'components/Navigation/OverlayNav';

import 'assets/scss/styles/navigation/app-navbar.scss';

// Fixes issue with @types not being found
// tslint:disable-next-line: no-var-requires
const Headroom = require('headroom.js');

interface AppNavbarState {
  showOverlay: boolean;
}

export default class AppNavbar extends Component<{}, AppNavbarState> {
  private navbarRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);

    this.navbarRef = React.createRef();
    this.state = {
      showOverlay: false,
    };
  }

  componentDidMount() {
    const headroom = new Headroom(this.navbarRef.current, {
      offset: 71,
      tolerance: {
        up: 7,
        down: 0,
      },
    });
    headroom.init();
  }

  render() {
    return (
      <>
        <Navbar ref={this.navbarRef} bg="primary" expand="lg" fixed="top">
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
              <Nav.Item
                className="navbar-burger"
                onClick={() => this.toggleOverlay()}
              >
                <Nav.Link>
                  <FontAwesomeIcon icon="bars" size="2x" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
        <OverlayNav
          show={this.state.showOverlay}
          onClose={() => this.toggleOverlay()}
        />
      </>
    );
  }

  private toggleOverlay() {
    this.setState((prevState) => {
      return {
        showOverlay: !prevState.showOverlay,
      };
    });
  }
}
