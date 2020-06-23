import React, { Component } from 'react';

import Image from 'models/image.model';
import { Button } from 'react-bootstrap';

import 'assets/scss/styles/showcase/showcase.scss';

interface ShowcaseProps {
  title: string;
  subtitle: string;
  image: Image;
}

export default class Showcase extends Component<ShowcaseProps> {
  render() {
    return (
      <div className="showcase">
        <div>
          <img
            className="showcase__image"
            src={this.props.image.src}
            alt={this.props.image.alt}
          />
          <div className="showcase__text">
            <h5>{this.props.title}</h5>
            <h6>{this.props.subtitle}</h6>
          </div>
          <div className="showcase__button">
            <Button variant="outline-info">Learn More</Button>
          </div>
        </div>
      </div>
    );
  }
}
