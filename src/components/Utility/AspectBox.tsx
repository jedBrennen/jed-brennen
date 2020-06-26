import React from 'react';

import 'assets/scss/styles/utility/aspect-box.scss';

interface AspectBoxProps {
  className?: string;
}

const AspectBox: React.FC<AspectBoxProps> = (props) => {
  return (
    <div className={`aspect-box__outer ${props.className}`}>
      <div className="aspect-box__inner">
        <div className="aspect-box__content">{props.children}</div>
      </div>
    </div>
  );
};

export default AspectBox;
