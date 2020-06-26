import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import FirebaseService, { FirebaseContext } from 'services/firebase.service';
import ProjectService from 'services/project.service';
import Project from 'models/project.model';
import List from 'components/List/List';
import ListItem from 'components/List/ListItem';

interface ProjectListState {
  isLoading: boolean;
  projects: Project[];
}

export default class ProjectList extends Component<
  RouteComponentProps,
  ProjectListState
> {
  static contextType = FirebaseContext;
  public context!: React.ContextType<typeof FirebaseContext>;
  private projectService: ProjectService;

  constructor(props: RouteComponentProps, context: FirebaseService) {
    super(props);

    this.projectService = new ProjectService(context);
    this.state = {
      isLoading: false,
      projects: [],
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  render() {
    return (
      <Container>
        <h1 className="mb-3">Projects</h1>
        <List<Project> isLoading={this.state.isLoading}>
          {this.state.projects.map((project) => (
            <ListItem
              key={project.id}
              title={project.title}
              body={project.shortDescription}
              onOpen={() => this.navigateToProject(project.id)}
            />
          ))}
        </List>
      </Container>
    );
  }

  private fetchProjects(): void {
    this.setState({ isLoading: true });
    this.projectService
      .getProjects()
      .then((projects) => this.setState({ projects, isLoading: false }));
  }

  private navigateToProject(projectId: string): void {
    const { match, history } = this.props;
    history.push(`${match.path}/${projectId}`);
  }
}
