import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Project } from 'models/project.model';
import ProjectsService from 'services/project.service';
import { List } from 'components/List/List';
import ListItem from 'components/List/ListItem';
import ProjectModal from './ProjectModal';

interface ProjectListState {
  isLoading: boolean;
  projects: Project[];
  isModalOpen: boolean;
  modalProject?: Project;
}

export default class ProjectList extends Component<
  RouteComponentProps,
  ProjectListState
> {
  private projectService: ProjectsService;

  constructor(props: RouteComponentProps) {
    super(props);

    this.projectService = new ProjectsService();
    this.state = {
      isLoading: false,
      projects: [],
      isModalOpen: false,
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  render() {
    return (
      <>
        <List title="Projects" isLoading={this.state.isLoading}>
          {this.state.projects.map((project) => (
            <ListItem
              key={project.id}
              title={project.title}
              subtitle={project.technology.join(', ')}
              body={project.shortDescription}
              onOpen={() => this.setState({ isModalOpen: true })}
            />
          ))}
        </List>
        <ProjectModal
          project={this.state.modalProject}
          isOpen={this.state.isModalOpen}
          handleClose={() => this.setState({ isModalOpen: false })}
        />
      </>
    );
  }

  private fetchProjects(): void {
    this.setState({ isLoading: true });
    this.projectService
      .getProjects()
      .then((projects) =>
        this.setState({ projects: projects, isLoading: false })
      );
  }
}
