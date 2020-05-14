import React, { Component } from 'react';
import AppNavbar from 'components/AppNavbar';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

class ProjectList extends Component<RouteComponentProps> {
  render() {
    const match = this.props.match;

    return (
      <>
        <AppNavbar />
        <Container>
          <h1 className="mb-3">Projects</h1>
          <Row xs={1} sm={1}>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-2">Intersxion</Card.Title>
                  <Card.Subtitle>React, GraphQL, Python</Card.Subtitle>
                  <Card.Body>Short description about Intersxion.</Card.Body>
                  <Link to={`${match.path}/intersxion`}>
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

export default withRouter(ProjectList);
