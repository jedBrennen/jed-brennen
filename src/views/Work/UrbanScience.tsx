import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import AppNavbar from 'components/AppNavbar';

export default class UrbanScience extends Component {
  render() {
    return (
      <>
        <AppNavbar />
        <Container>
          <h1>Urban Science</h1>
        </Container>
      </>
    );
  }
}
