import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import AppNavbar from 'components/AppNavbar';

export default class Intersxion extends Component {
  render() {
    return (
      <>
        <AppNavbar />
        <Container>
          <h1>Intersxion</h1>
        </Container>
      </>
    );
  }
}
