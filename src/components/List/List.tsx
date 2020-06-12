import React, { Component } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import ListItemSkeleton from './ListItemSkeleton';

interface ListProps<T> {
  title: string;
  isLoading: boolean;
  listItems?: T[];
}

export class List<T> extends Component<ListProps<T>> {
  render() {
    return (
      <Container>
        <h1 className="mb-3">{this.props.title}</h1>
        <Row xs={1} sm={1}>
          {this.props.isLoading ? <ListItemSkeleton /> : this.props.children}
        </Row>
      </Container>
    );
  }
}
