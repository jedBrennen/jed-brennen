import React from 'react';
import { Button } from 'react-bootstrap';

import Image from 'models/image.model';
import AspectBox from 'components/Utility/AspectBox';

import 'assets/scss/styles/showcase/showcase.scss';

interface ShowcaseProps {
  title: string;
  subtitle?: string | React.ReactNode;
  image?: Image;
  onOpen?: VoidFunction;
}

const Showcase: React.FC<ShowcaseProps> = (props) => {
  const { title, subtitle, image, onOpen } = props;
  const imageState = image ? '' : '--no-image';
  return (
    <AspectBox className="p-3">
      <div className={`showcase showcase${imageState}`}>
        {image && (
          <img className="showcase__image" src={image.src} alt={image.alt} />
        )}
        <div className={`showcase__text showcase__text${imageState}`}>
          <h3>{title}</h3>
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
