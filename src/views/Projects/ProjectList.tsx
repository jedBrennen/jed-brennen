import React, { useContext, useEffect, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';

import FirebaseService, { FirebaseContext } from 'services/firebase.service';
import ProjectService from 'services/project.service';
import Project from 'models/project.model';
import Image from 'models/image.model';
import ShowcaseGrid from 'components/Showcase/ShowcaseGrid';
import Showcase from 'components/Showcase/Showcase';
import ShowcaseLoading from 'components/Showcase/ShowcaseLoading';
import BetaBadge from 'components/Badges/BetaBadge';

const fetchProjects = async (
  firebaseService: FirebaseService,
  onData: (data: Project[]) => void,
  onError: (error: string) => void,
  onCompletion?: () => void
) => {
  const companyService = new ProjectService(firebaseService);
  try {
    const projects = await companyService.getCompleteProjects();
    projects.sort((a, b) => a.compareTo(b));
    onData(projects);
  } catch {
    onError(
      'Whoops, something went when fetching those projects. Please refresh and try again.'
    );
  } finally {
    onCompletion && onCompletion();
  }
};

const getCoverImage = (images: Image[], coverImage?: string) => {
  if (coverImage) {
    return images.find((image) => image.id === coverImage);
  } else {
    return images[0];
  }
};

const ProjectList: React.FC<RouteComponentProps> = (props) => {
  const firebaseService = useContext(FirebaseContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const navigateToProject = useCallback(
    (projectId: string) => {
      const { match, history } = props;
      history.push(`${match.path}/${projectId}`);
    },
    [props]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchProjects(firebaseService, setProjects, setError, () =>
      setIsLoading(false)
    );
  }, [firebaseService]);

  return (
    <Container>
      <h1 className="mb-3 text-center">Projects</h1>
      <Alert show={!!error} variant="danger" className="mt-3">
        {error}
      </Alert>
      <ShowcaseGrid>
        {isLoading && <ShowcaseLoading count={3} />}
        {!isLoading &&
          projects.map((project) => (
            <Showcase
              key={project.id}
              title={project.title}
              titleBadge={
                project.beta ? <BetaBadge>Beta</BetaBadge> : undefined
              }
              subtitle={project.shortDescription}
              image={getCoverImage(project.images, project.coverImage)}
              onOpen={() => navigateToProject(project.id)}
            />
          ))}
      </ShowcaseGrid>
    </Container>
  );
};

export default ProjectList;
