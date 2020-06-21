import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Project from 'models/project.model';

interface ProjectModalProps {
  project?: Project;
  isOpen: boolean;
  handleClose: VoidFunction;
}

export default class ProjectModal extends Component<ProjectModalProps> {
  render() {
    return (
      <Modal size="lg" show={this.props.isOpen} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
