import 'assets/scss/styles/showcase/showcase.scss';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

type ShowcaseProps = {
  header: string;
  subheader: string;
  major?: boolean;
};

export default class Showcase extends Component<ShowcaseProps> {
  render() {
    return (
      <>
        <div className="showcase-container p-3 p-md-5 bg-light">
          <div
            className={`${
              this.props.major ?? false ? 'h2' : 'h3'
            } font-weight-bold`}
          >
            {this.props.header}
          </div>
          <h5>{this.props.subheader}</h5>
          <Button variant="outline-primary" className="mt-3">
            Learn More
          </Button>
        </div>
      </>
    );
  }
}
