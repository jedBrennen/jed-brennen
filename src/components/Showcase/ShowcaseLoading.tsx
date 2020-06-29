import React from 'react';
import { v4 } from 'uuid';

import AspectBox from 'components/Utility/AspectBox';
import Skeleton from 'components/Skeleton/Skeleton';

interface ShowcaseLoadingProps {
  count: number;
}

const ShowcaseLoading: React.FC<ShowcaseLoadingProps> = (props) => {
  const { count } = props;
  const arr = new Array(count).fill(0);

  return (
    <>
      {arr.map(() => {
        return (
          <AspectBox key={v4()} className="p-3">
            <Skeleton srAccessible className="w-100 h-100" />
          </AspectBox>
        );
      })}
    </>
  );
};

export default ShowcaseLoading;
