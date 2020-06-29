import React from 'react';
import { v4 } from 'uuid';

import AspectBox from 'components/Utility/AspectBox';
import SkeletonRow from 'components/Skeleton/Skeleton';

interface SkillWheelLoadingProps {
  count: number;
}

const SkillWheelLoading: React.FC<SkillWheelLoadingProps> = (props) => {
  const { count } = props;
  const arr = new Array(count).fill(0);

  return (
    <>
      {arr.map(() => {
        return (
          <AspectBox key={v4()} className="p-4">
            <SkeletonRow srAccessible className="w-100 h-100 rounded-circle" />
          </AspectBox>
        );
      })}
    </>
  );
};

export default SkillWheelLoading;
