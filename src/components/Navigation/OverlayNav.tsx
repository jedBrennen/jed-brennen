import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Row } from 'react-bootstrap';

import 'assets/scss/styles/navigation/overlay-nav.scss';
import { LinkContainer } from 'react-router-bootstrap';
import { PROJECTS, ABOUT, COMPANIES } from 'constants/routes';
import SocialLink from 'components/Social/SocialLink';

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
              <FontAwesomeIcon icon="times" size="lg" />
            </Button>
          </Row>
          <Row xs={1} className="overlay-nav__items justify-content-center">
            <div className="text-center">
              <LinkContainer to={ABOUT} exact={true}>
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
            <Row className="text-center justify-content-center">
              <SocialLink
                link="https://github.com/jedBrennen"
                icon={['fab', 'github']}
                size="2x"
                variant="primary"
                className="p-3"
              />
              <SocialLink
                link="https://www.linkedin.com/in/jedbrennen/"
                icon={['fab', 'linkedin']}
                size="2x"
                variant="primary"
                className="p-3"
              />
            </Row>
          </Row>
        </Container>
      </div>
    );
  }
}
