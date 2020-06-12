import React, { Component } from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router';
import CompanyList from './CompanyList';

class Companies extends Component<RouteComponentProps> {
  render() {
    const match = this.props.match;

    return (
      <Switch>
        {/* <Route
          path={`${match.path}/sagepeople`}
          render={(props) => <SagePeople {...props} />}
        />
        <Route
          path={`${match.path}/urbanscience`}
          render={(props) => <UrbanScience {...props} />}
        /> */}
        <Route
          path={match.path}
          render={(props) => <CompanyList {...props} />}
        />
      </Switch>
    );
  }
}

export default withRouter(Companies);
