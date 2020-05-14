import React, { Component } from 'react';
import AppNavbar from 'components/AppNavbar';
import { Container } from 'react-bootstrap';

export default class About extends Component {
  render() {
    return (
      <>
        <AppNavbar />
        <Container>
          <h1>About Me</h1>
          <h5>Add a brief desciption here</h5>
        </Container>
      </>
    );
  }
}
