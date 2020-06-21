import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

interface ListItemProps {
  title: string;
  subtitle?: string;
  body?: string;
  onOpen?: VoidFunction;
}

export default class ListItem extends Component<ListItemProps> {
  render() {
    return (
      <Card
        onClick={this.props.onOpen}
        style={{ cursor: this.props.onOpen ? 'pointer' : 'default' }}
      >
        <Card.Body>
          <Card.Title className="mb-2">{this.props.title}</Card.Title>
          {this.props.subtitle && (
            <Card.Subtitle>{this.props.subtitle}</Card.Subtitle>
          )}
          {this.props.body && <Card.Body>{this.props.body}</Card.Body>}
        </Card.Body>
      </Card>
    );
  }
}
