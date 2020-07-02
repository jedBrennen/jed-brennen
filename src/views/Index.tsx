import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import { DOCUMENT_TITLE } from 'constants/constants';
import { ABOUT, PROJECTS, COMPANIES } from 'constants/routes';
import AboutView from 'views/About/AboutView';
import Projects from 'views/Projects/Projects';
import Companies from 'views/Companies/Companies';
import AppNavbar, {
  NavbarContext,
  NavbarThemeType,
} from 'components/Navigation/AppNavbar';

import 'assets/scss/styles/index.scss';

const Index: React.FC = () => {
  const [theme, setTheme] = useState<NavbarThemeType>('adaptive');

  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <NavbarContext.Provider value={{ theme, setTheme }}>
          <AppNavbar />
          <div className="page-content">
            <Switch>
              <Route
                exact
                path={ABOUT}
                render={(props) => {
                  document.title = `${DOCUMENT_TITLE} | About`;
                  return <AboutView {...props} />;
                }}
              />
              <Route
                path={PROJECTS}
                render={(props) => {
                  document.title = `${DOCUMENT_TITLE} | Projects`;
                  return <Projects {...props} />;
                }}
              />
              <Route
                path={COMPANIES}
                render={(props) => {
                  document.title = `${DOCUMENT_TITLE} | Companies`;
                  return <Companies {...props} />;
                }}
              />
              <Redirect to={ABOUT} />
            </Switch>
          </div>
        </NavbarContext.Provider>
        <footer className="page-footer">
          <Container className="h-100">
            <Row className="h-100 justify-content-center align-items-center">
              <span className="text-primary mr-2">Jed Brennen</span>
              <span className="text-success">© 2020</span>
            </Row>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default Index;
