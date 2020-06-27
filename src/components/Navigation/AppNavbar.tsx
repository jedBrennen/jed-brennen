import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OverlayNav from 'components/Navigation/OverlayNav';

import 'assets/scss/styles/navigation/app-navbar.scss';

// Fixes issue with @types not being found
// tslint:disable-next-line: no-var-requires
const Headroom = require('headroom.js');

type NavbarThemeType = 'adaptive' | 'static';
interface NavbarTheme {
  theme: NavbarThemeType;
  setTheme: (theme: NavbarThemeType) => void;
}
const NavbarContext = React.createContext<NavbarTheme>({
  theme: 'adaptive',
  // tslint:disable-next-line: no-empty
  setTheme: () => {},
});

const AppNavbar = () => {
  const navbarRef = React.createRef<any>();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const headroom = new Headroom(navbarRef.current, {
      offset: 71,
      tolerance: {
        up: 7,
        down: 0,
      },
    });
    headroom.init();
  }, [navbarRef]);

  return (
    <>
      <NavbarContext.Consumer>
        {({ theme }) => (
          <Navbar
            className={`app-navbar app-navbar--${theme}`}
            ref={navbarRef}
            bg="primary"
            expand="lg"
            fixed="top"
          >
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Jed Brennen</Navbar.Brand>
              </LinkContainer>
              <Nav className="flex-row">
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
                  onClick={() => setShowOverlay(!showOverlay)}
                >
                  <Nav.Link>
                    <FontAwesomeIcon icon="bars" size="2x" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Container>
          </Navbar>
        )}
      </NavbarContext.Consumer>
      <OverlayNav
        show={showOverlay}
        onClose={() => setShowOverlay(!showOverlay)}
      />
    </>
  );
};

export type { NavbarTheme, NavbarThemeType };
export { NavbarContext };
export default AppNavbar;
