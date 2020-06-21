import 'assets/scss/custom.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { INDEX, ABOUT, PROJECTS, COMPANIES } from 'constants/routes';
import Index from 'views/Index';
import About from 'views/About/AboutView';
import Projects from 'views/Projects/Projects';
import Companies from 'views/Companies/Companies';
import AppNavbar from 'components/Navigation/AppNavbar';

library.add(fas);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route exact path={INDEX} render={(props) => <Index {...props} />} />
        <Route path={ABOUT} render={(props) => <About {...props} />} />
        <Route path={PROJECTS} render={(props) => <Projects {...props} />} />
        <Route path={COMPANIES} render={(props) => <Companies {...props} />} />
        <Redirect to={INDEX} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
