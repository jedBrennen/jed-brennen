import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import ListItemSkeleton from 'components/List/ListItemSkeleton';

interface ListProps<T> {
  isLoading: boolean;
  listItems?: T[];
}

export default class List<T> extends Component<ListProps<T>> {
  render() {
    return (
      <Row xs={1} sm={1}>
        {this.props.isLoading ? <ListItemSkeleton /> : this.props.children}
      </Row>
    );
  }
}
