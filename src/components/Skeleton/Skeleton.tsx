import React, { Component } from 'react';

import 'assets/scss/styles/skeleton/skeleton.scss';

interface SkeletonProps {
  srAccessible: boolean;
  className?: string;
}

const SkeletonH1 = ({ srAccessible = false, className = '' }): JSX.Element => {
  return (
    <Skeleton
      srAccessible={srAccessible}
      className={`skeleton-h1 ${className || ''}`}
    />
  );
};

const SkeletonH2 = ({ srAccessible = false, className = '' }): JSX.Element => {
  return (
    <Skeleton
      srAccessible={srAccessible}
      className={`skeleton-h2 ${className || ''}`}
    />
  );
};

const SkeletonH3 = ({ srAccessible = false, className = '' }): JSX.Element => {
  return (
    <Skeleton
      srAccessible={srAccessible}
      className={`skeleton-h3 ${className || ''}`}
    />
  );
};

const SkeletonH4 = ({ srAccessible = false, className = '' }): JSX.Element => {
  return (
    <Skeleton
      srAccessible={srAccessible}
      className={`skeleton-h4 ${className || ''}`}
    />
  );
};

const SkeletonH5 = ({ srAccessible = false, className = '' }): JSX.Element => {
  return (
    <Skeleton
      srAccessible={srAccessible}
      className={`skeleton-h5 ${className || ''}`}
    />
  );
};

const SkeletonH6 = ({ srAccessible = false, className = '' }): JSX.Element => {
  return (
    <Skeleton
      srAccessible={srAccessible}
      className={`skeleton-h6 ${className || ''}`}
    />
  );
};

const SkeletonP = ({ srAccessible = false, className = '' }): JSX.Element => {
  return (
    <Skeleton
      srAccessible={srAccessible}
      className={`skeleton-p ${className || ''}`}
    />
  );
};

export {
  SkeletonH1,
  SkeletonH2,
  SkeletonH3,
  SkeletonH4,
  SkeletonH5,
  SkeletonH6,
  SkeletonP,
};

export default class Skeleton extends Component<SkeletonProps> {
  static defaultProps = {
    srAccessible: false,
  };
  static H1 = SkeletonH1;
  static H2 = SkeletonH2;
  static H3 = SkeletonH3;
  static H4 = SkeletonH4;
  static H5 = SkeletonH5;
  static H6 = SkeletonH6;
  static P = SkeletonP;

  render() {
    return (
      <div className={`skeleton ${this.props.className || ''}`} role="status">
        {this.props.srAccessible && <span className="sr-only">Loading</span>}
      </div>
    );
  }
}
