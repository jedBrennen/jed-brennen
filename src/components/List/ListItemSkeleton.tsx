import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

import 'assets/scss/styles/list/list-item-skeleton.scss';
import { SkeletonRow } from 'components/Skeleton/SkeletonRow';

export default class ListItemSkeleton extends Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <SkeletonRow className="skeleton-title mb-2" srAccessible />
          <SkeletonRow className="skeleton-subtitle mb-4" />
          <SkeletonRow className="skeleton-row--full" />
          <SkeletonRow className="skeleton-row--full" />
          <SkeletonRow className="skeleton-row--half" />
        </Card.Body>
      </Card>
    );
  }
}
