import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import AppNavbar from 'components/AppNavbar';

export default class SagePeople extends Component {
  render() {
    return (
      <>
        <AppNavbar />
        <Container>
          <h1>Sage People</h1>
        </Container>
      </>
    );
  }
}
