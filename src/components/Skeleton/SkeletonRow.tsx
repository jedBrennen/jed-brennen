import React from 'react';

import 'assets/scss/styles/skeleton/skeleton-row.scss';

// Workaround whilst defaultProps doesn't work for functional components.
const SkeletonRow = ({ srAccessible = false, className = '' }) => {
  return (
    <div className={`skeleton-row ${className || ''}`} role="status">
      {srAccessible && <span className="sr-only">Loading</span>}
    </div>
  );
};

export default SkeletonRow;
