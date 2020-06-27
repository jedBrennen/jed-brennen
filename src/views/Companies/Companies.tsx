import React, { useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  RouteComponentProps,
  useRouteMatch,
} from 'react-router';

import CompanyList from 'views/Companies/CompanyList';
import { NavbarContext } from 'components/Navigation/AppNavbar';

const Companies: React.FC<RouteComponentProps> = () => {
  const navbarTheme = useContext(NavbarContext);
  const match = useRouteMatch();

  useEffect(() => navbarTheme.setTheme('static'), [navbarTheme]);

  return (
    <Switch>
      <Route path={match.path} render={(props) => <CompanyList {...props} />} />
    </Switch>
  );
};

export default Companies;
