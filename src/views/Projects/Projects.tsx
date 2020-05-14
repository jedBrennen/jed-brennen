import React, { Component } from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router';

import WorkList from './ProjectsList';
import Intersxion from './Intersxion';

class Projects extends Component<RouteComponentProps> {
  render() {
    const match = this.props.match;

    return (
      <Switch>
        <Route
          path={`${match.path}/intersxion`}
          render={(props) => <Intersxion {...props} />}
        />
        <Route path={match.path} render={(props) => <WorkList {...props} />} />
      </Switch>
    );
  }
}

export default withRouter(Projects);
