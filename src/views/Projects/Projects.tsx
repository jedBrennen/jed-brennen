import React, { useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  RouteComponentProps,
  useRouteMatch,
} from 'react-router';

import ProjectList from 'views/Projects/ProjectList';
import ProjectDetails from 'views/Projects/ProjectDetails';
import { NavbarContext } from 'components/Navigation/AppNavbar';

const Projects: React.FC<RouteComponentProps> = () => {
  const navbarTheme = useContext(NavbarContext);
  const match = useRouteMatch();

  useEffect(() => navbarTheme.setTheme('static'), [navbarTheme]);

  return (
    <Switch>
      <Route
        path={`${match.path}/:projectId`}
        render={(props) => <ProjectDetails {...props} />}
      ></Route>
      <Route path={match.path} render={(props) => <ProjectList {...props} />} />
    </Switch>
  );
};

export default Projects;
