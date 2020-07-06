import React from 'react';
import { Button } from 'react-bootstrap';

import Image from 'models/image.model';
import AspectBox from 'components/Utility/AspectBox';

import 'assets/scss/styles/showcase/showcase.scss';

interface ShowcaseProps {
  title: string;
  titleBadge?: React.ReactNode;
  subtitle?: string | React.ReactNode;
  image?: Image;
  onOpen?: VoidFunction;
}

const Showcase: React.FC<ShowcaseProps> = (props) => {
  const { title, titleBadge, subtitle, image, onOpen } = props;
  const imageState = image ? '' : '--no-image';
  return (
    <AspectBox className="p-3">
      <div className={`showcase showcase${imageState}`}>
        {image && (
          <img className="showcase__image" src={image.src} alt={image.alt} />
        )}
        <div className={`showcase__text showcase__text${imageState}`}>
          <div className="showcase__title mb-2">
            <h3 className="mt-0 mr-2">{title}</h3>
            {!!titleBadge && titleBadge}
          </div>
          <h6>{subtitle}</h6>
        </div>
        {onOpen && (
          <div className={`showcase__button showcase__button${imageState}`}>
            <Button variant="outline-info" onClick={onOpen}>
              Learn More
            </Button>
          </div>
        )}
      </div>
    </AspectBox>
  );
};

export default Showcase;
