import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Hobby from 'models/hobby.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'assets/scss/styles/about/other-header.scss';

interface OtherHeaderProps {
  hobbies: Hobby[];
}

export default class OtherHeader extends Component<OtherHeaderProps> {
  render() {
    return (
      <section className="header other-header text-center">
        <Container>
          <h1>In My Spare Time</h1>
          <Row xs={2} lg={4} className="justify-content-center">
            {this.props.hobbies.map((hobby) => {
              return (
                <div key={hobby.id} className="other-header__hobby">
                  <div className="other-header__icon-container">
                    <FontAwesomeIcon
                      className="other-header__icon"
                      icon={hobby.iconName}
                    />
                  </div>
                  <h3 className="other-header__title">{hobby.title}</h3>
                  <h4 className="other-header__description">
                    {hobby.description}
                  </h4>
                </div>
              );
            })}
          </Row>
        </Container>
      </section>
    );
  }
}
