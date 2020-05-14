import React, { Component } from 'react';
import AppNavbar from 'components/AppNavbar';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

class WorkList extends Component<RouteComponentProps> {
  render() {
    const match = this.props.match;

    return (
      <>
        <AppNavbar />
        <Container>
          <h1 className="mb-3">Work</h1>
          <Row xs={1} sm={1}>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-2">
                    Graduate Software Developer
                  </Card.Title>
                  <Card.Subtitle>Sage People</Card.Subtitle>
                  <Card.Body>
                    Short description about work at Sage People.
                  </Card.Body>
                  <Link to={`${match.path}/sagepeople`}>
                    <Button className="float-right">See More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-2">Intern/Data Analyst</Card.Title>
                  <Card.Subtitle>Urban Science</Card.Subtitle>
                  <Card.Body>
                    Short description about work at Urban Science.
                  </Card.Body>
                  <Link to={`${match.path}/urbanscience`}>
                    <Button className="float-right">See More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(WorkList);
