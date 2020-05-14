import React, { Component } from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router';

import WorkList from './WorkList';
import SagePeople from './SagePeople';
import UrbanScience from './UrbanScience';

class Work extends Component<RouteComponentProps> {
  render() {
    const match = this.props.match;

    return (
      <Switch>
        <Route
          path={`${match.path}/sagepeople`}
          render={(props) => <SagePeople {...props} />}
        />
        <Route
          path={`${match.path}/urbanscience`}
          render={(props) => <UrbanScience {...props} />}
        />
        <Route path={match.path} render={(props) => <WorkList {...props} />} />
      </Switch>
    );
  }
}

export default withRouter(Work);
