import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

import 'assets/scss/styles/list/list-item-skeleton.scss';

export default class ListItemSkeleton extends Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <span className="sr-only">Loading</span>
          <div className="skeleton-title mb-2" role="status"></div>
          <div className="skeleton-subtitle mb-4" role="status"></div>
          <div className="skeleton-row--full" role="status"></div>
          <div className="skeleton-row--full" role="status"></div>
          <div className="skeleton-row--half" role="status"></div>
        </Card.Body>
      </Card>
    );
  }
}
