import React, { useContext, useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { FirebaseContext } from 'services/firebase.service';
import ProjectService from 'services/project.service';
import Project from 'models/project.model';
import ShowcaseGrid from 'components/Showcase/ShowcaseGrid';
import Showcase from 'components/Showcase/Showcase';
import ShowcaseLoading from 'components/Showcase/ShowcaseLoading';

const ProjectList: React.FC<RouteComponentProps> = (props) => {
  const firebaseService = useContext(FirebaseContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigateToProject = useCallback(
    (projectId: string) => {
      const { match, history } = props;
      history.push(`${match.path}/${projectId}`);
    },
    [props]
  );

  useEffect(() => {
    const projectService = new ProjectService(firebaseService);
    setIsLoading(true);
    const fetchProjects = async () => {
      const p = await projectService.getCompleteProjects();
      setProjects(p);
      setIsLoading(false);
    };
    fetchProjects();
  }, [firebaseService]);

  return (
    <Container>
      <h1 className="mb-3 text-center">Projects</h1>
      <ShowcaseGrid>
        {isLoading && <ShowcaseLoading count={3} />}
        {!isLoading &&
          projects.map((project) => (
            <Showcase
              key={project.id}
              title={project.title}
              subtitle={project.shortDescription}
              image={project.images.length ? project.images[0] : undefined}
              onOpen={() => navigateToProject(project.id)}
            />
          ))}
      </ShowcaseGrid>
    </Container>
  );
};

export default ProjectList;
