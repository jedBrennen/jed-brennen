import React, { Component } from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router';

import ProjectList from 'views/Projects/ProjectList';

class Projects extends Component<RouteComponentProps> {
  render() {
    const match = this.props.match;

    return (
      <Switch>
        <Route
          path={match.path}
          render={(props) => <ProjectList {...props} />}
        />
      </Switch>
    );
  }
}

export default withRouter(Projects);
