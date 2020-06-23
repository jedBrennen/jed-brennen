import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import { ABOUT, PROJECTS, COMPANIES } from 'constants/routes';
import AboutView from 'views/About/AboutView';
import Projects from 'views/Projects/Projects';
import Companies from 'views/Companies/Companies';
import AppNavbar from 'components/Navigation/AppNavbar';

import 'assets/scss/styles/index.scss';

export default class Index extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="page-wrapper">
          <AppNavbar />
          <div className="page-content">
            <Switch>
              <Route
                exact
                path={ABOUT}
                render={(props) => <AboutView {...props} />}
              />
              <Route
                path={PROJECTS}
                render={(props) => <Projects {...props} />}
              />
              <Route
                path={COMPANIES}
                render={(props) => <Companies {...props} />}
              />
              <Redirect to={ABOUT} />
            </Switch>
          </div>
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
  }
}
