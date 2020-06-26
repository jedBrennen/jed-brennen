import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Hobby from 'models/hobby.model';
import AspectBox from 'components/Utility/AspectBox';

import 'assets/scss/styles/about/hobby-header.scss';

interface HobbyHeaderProps {
  hobbies: Hobby[];
}

export default class HobbyHeader extends Component<HobbyHeaderProps> {
  render() {
    return (
      <section className="header hobby-header text-center">
        <Container>
          <h1>In My Spare Time</h1>
          <Row xs={1} sm={2} lg={3} className="justify-content-center">
            {this.props.hobbies.map((hobby) => {
              return (
                <Col>
                  <AspectBox className="hobby-header__icon-aspect">
                    <div className="hobby-header__icon-container">
                      <FontAwesomeIcon
                        icon={hobby.iconName}
                        className="hobby-header__icon"
                      />
                    </div>
                  </AspectBox>
                  <h3 className="hobby-header__title">{hobby.title}</h3>
                  <h5 className="hobby-header__description">
                    {/* {hobby.description} */}I enjoy trying out new
                    technologies and frameworks and working on my own coding
                    projects.
                  </h5>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    );
  }
}
