import 'assets/scss/custom.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Index from 'views/Index';
import About from 'views/About';
import Projects from 'views/Projects/Projects';
import AppNavbar from 'components/AppNavbar';
import Companies from 'views/Work/Companies';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route path="/companies" render={(props) => <Companies {...props} />} />
        <Route path="/projects" render={(props) => <Projects {...props} />} />
        <Route path="/about" render={(props) => <About {...props} />} />
        <Route path="/" render={(props) => <Index {...props} />} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
