import React from 'react';
import { Button } from 'react-bootstrap';

import Image from 'models/image.model';
import AspectBox from 'components/Utility/AspectBox';

import 'assets/scss/styles/showcase/showcase.scss';

interface ShowcaseProps {
  title: string;
  subtitle: string;
  image: Image;
}

const Showcase = (props: ShowcaseProps) => {
  const { image, title, subtitle } = props;
  return (
    <AspectBox className="p-3">
      <div className="showcase">
        <img className="showcase__image" src={image.src} alt={image.alt} />
        <div className="showcase__text">
          <h3>{title}</h3>
          <h6>{subtitle}</h6>
        </div>
        <div className="showcase__button">
          <Button variant="outline-info">Learn More</Button>
        </div>
      </div>
    </AspectBox>
  );
};

export default Showcase;
