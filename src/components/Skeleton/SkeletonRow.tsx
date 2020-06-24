import React, { Component } from 'react';

import 'assets/scss/styles/skeleton/skeleton-row.scss';

interface SkeletonRowProps {
  srAccessible: boolean;
  className?: string;
}

export class SkeletonRow extends Component<SkeletonRowProps> {
  static defaultProps = {
    srAccessible: false,
  };
  render() {
    return (
      <div
        className={`skeleton-row ${this.props.className || ''}`}
        role="status"
      >
        {this.props.srAccessible && <span className="sr-only">Loading</span>}
      </div>
    );
  }
}
