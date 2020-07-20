import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

export class ErrorPage extends Component {
  render() {
    return (
      <Container textAlign='center'>
        <Header as='h3'>404 Error</Header>
        <p>Sorry; the page you have requested can not be found</p>
      </Container>
    );
  }
}

export default ErrorPage;
