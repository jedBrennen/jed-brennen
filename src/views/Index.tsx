import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from 'components/AppNavbar';
import Showcase from 'components/Showcase';

export default class Index extends Component {
  render() {
    return (
      <>
        <AppNavbar />
        <Container fluid>
          <Row>
            <Col className="text-center p-0 mb-3">
              <Showcase
                header="Intersxion"
                subheader="An app for finding a home for professionals"
                major={true}
              />
            </Col>
          </Row>
          <Row xs={1} sm={1} md={2} className="d-flex">
            <Col className="text-center px-sm-0 px-md-2 pl-md-3 mb-3">
              <Showcase
                header="Graduate Software Developer"
                subheader="Sage People"
              />
            </Col>
            <Col className="text-center px-sm-0 px-md-2 pr-md-3 mb-3">
              <Showcase header="Intern/Analyst" subheader="Urban Science" />
            </Col>
            <Col className="text-center px-sm-0 px-md-2 pl-md-3 mb-3">
              <Showcase
                header="About Me"
                subheader="Learn more about who I am"
              />
            </Col>
            <Col className="text-center px-sm-0 px-md-2 pr-md-3 mb-3">
              <Showcase header="Skills" subheader="My skillset" />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
