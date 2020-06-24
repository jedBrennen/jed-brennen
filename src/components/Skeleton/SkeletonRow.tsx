import React, { Component } from 'react';

import 'assets/scss/styles/skeleton/skeleton-row.scss';

interface SkeletonRowProps {
  className?: string;
}

export class SkeletonRow extends Component<SkeletonRowProps> {
  render() {
    return <div className={`skeleton-row ${this.props.className || ''}`} />;
  }
}
