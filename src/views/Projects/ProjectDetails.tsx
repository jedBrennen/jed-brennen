import React, { useEffect, useContext, useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import AwesomeSlider from 'react-awesome-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FirebaseService, { FirebaseContext } from 'services/firebase.service';
import ProjectService from 'services/project.service';
import { PROJECTS } from 'constants/routes';
import Project from 'models/project.model';
import Details from 'views/Templates/Details';
import Skeleton from 'components/Skeleton/Skeleton';

import 'assets/scss/styles/projects/project-details.scss';

interface ProjectDetailsParams {
  projectId?: string;
}

interface GithubLinkProps {
  github: string;
}

const fetchProject = async (
  projectId: string,
  firebaseService: FirebaseService,
  onData: (data: Project) => void,
  onError: (error: string) => void,
  onCompletion?: () => void
) => {
  try {
    const projectService = new ProjectService(firebaseService);
    const project = await projectService.getProject(projectId);
    project?.skills?.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return -1;
      return 0;
    });
    project?.images?.sort((a, b) => {
      if (a.id === project.coverImage) return -1;
      if (b.id === project.coverImage) return 1;
      return 0;
    });
    onData(project!);
  } catch {
    onError(
      'Whoops, something went when fetching that project. Please refresh and try again.'
    );
  } finally {
    onCompletion && onCompletion();
  }
};

const GithubLink: React.FC<GithubLinkProps> = (props) => {
  return (
    <Button
      as="a"
      href={props.github}
      target="_blank"
      className="project-details__github btn-link"
      variant="secondary"
    >
      <FontAwesomeIcon icon={['fab', 'github']} size="3x" />
    </Button>
  );
};

const ProjectDetails: React.FC<RouteComponentProps<ProjectDetailsParams>> = (
  props
) => {
  const firebaseService = useContext(FirebaseContext);
  const [project, setProject] = useState<Project>(new Project());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { projectId } = props.match.params;

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      fetchProject(projectId, firebaseService, setProject, setError, () =>
        setIsLoading(false)
      );
    }
  }, [firebaseService, projectId]);

  return (
    <Details
      isLoading={isLoading}
      pageTitle={project.title}
      listTitle="Projects"
      listLocation={PROJECTS}
      links={!!project.github && <GithubLink github={project.github} />}
      linksLoading={<Skeleton className="project-details__github--loading" />}
      description={project.longDescription}
      descriptionTitle={`The Story Behind ${project.title}`}
      skills={project.skills}
      skillsTitle={`The Tech Behind ${project.title}`}
      error={error}
    >
      {isLoading && <Skeleton className="project-details__gallery--loading" />}
      {!isLoading && !!project.images.length && (
        <Row className="project-details__gallery justify-content-center mb-n4">
          <AwesomeSlider>
            {project.images.map((image) => {
              return (
                <div
                  key={image.id}
                  className="project-details__image-container"
                >
                  <img src={image.src} alt={image.alt} />
                </div>
              );
            })}
          </AwesomeSlider>
        </Row>
      )}
    </Details>
  );
};

export default ProjectDetails;
