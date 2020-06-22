import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Row } from 'react-bootstrap';

import 'assets/scss/styles/navigation/overlay-nav.scss';
import { LinkContainer } from 'react-router-bootstrap';
import { PROJECTS, ABOUT, COMPANIES } from 'constants/routes';

interface OverlayNavProps {
  show: boolean;
  onClose: VoidFunction;
}

export default class OverlayNav extends Component<OverlayNavProps> {
  static defaultProps = {
    show: false,
  };

  render() {
    return (
      <div
        className={`overlay-nav overlay-nav${
          this.props.show ? '--open' : '--closed'
        }`}
      >
        <Container>
          <Row className="align-items-end">
            <Button
              className="btn-link overlay-nav__close"
              onClick={this.props.onClose}
            >
              <FontAwesomeIcon icon="times" size="3x" />
            </Button>
          </Row>
          <Row xs={1} className="overlay-nav__items">
            <div className="text-center">
              <LinkContainer to={ABOUT}>
                <Button className="btn-link" onClick={this.props.onClose}>
                  About
                </Button>
              </LinkContainer>
            </div>
            <div className="text-center">
              <LinkContainer to={PROJECTS}>
                <Button className="btn-link" onClick={this.props.onClose}>
                  Projects
                </Button>
              </LinkContainer>
            </div>
            <div className="text-center">
              <LinkContainer to={COMPANIES}>
                <Button className="btn-link" onClick={this.props.onClose}>
                  Companies
                </Button>
              </LinkContainer>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}
