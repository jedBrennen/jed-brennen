import React, { useEffect, useContext, useState } from 'react';
import { Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router';
import AwesomeSlider from 'react-awesome-slider';

import FirebaseService, { FirebaseContext } from 'services/firebase.service';
import ProjectService from 'services/project.service';
import { DOCUMENT_TITLE } from 'constants/constants';
import { PROJECTS } from 'constants/routes';
import Project from 'models/project.model';
import { ImageOrientation } from 'models/image.model';
import Details from 'views/Templates/Details';
import SocialLink from 'components/Social/SocialLink';
import Skeleton from 'components/Skeleton/Skeleton';

import 'assets/scss/styles/projects/project-details.scss';

interface ProjectDetailsParams {
  projectId?: string;
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

const ProjectDetails: React.FC<RouteComponentProps<ProjectDetailsParams>> = (
  props
) => {
  const firebaseService = useContext(FirebaseContext);
  const [project, setProject] = useState<Project>(new Project());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { projectId } = props.match.params;

  useEffect(() => {
    if (isLoading || !project.title) {
      document.title = `${DOCUMENT_TITLE} | Loading...`;
    } else {
      document.title = `${DOCUMENT_TITLE} | ${project.title}`;
    }
  }, [isLoading, project]);

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
      pageSubtitle={project.shortDescription}
      pageBadge={project.beta ? 'Beta' : ''}
      listTitle="Projects"
      listLocation={PROJECTS}
      links={
        !!project.github && (
          <SocialLink
            link={project.github}
            icon={['fab', 'github']}
            size="3x"
          />
        )
      }
      linksLoading={<Skeleton className="project-details__github--loading" />}
      description={project.longDescription}
      descriptionTitle={`The Story Behind ${project.title}`}
      skills={project.skills}
      skillsTitle={`The Tech Behind ${project.title}`}
      error={error}
    >
      {isLoading && (
        <Row>
          <Skeleton className="project-details__gallery--loading" />
        </Row>
      )}
      {!isLoading && !!project.images.length && (
        <Row className="project-details__gallery justify-content-center mb-n4">
          <AwesomeSlider>
            {project.images.map((image) => {
              return (
                <div
                  key={image.id}
                  className="project-details__image-container"
                >
                  <img
                    className={`project-details__image${
                      image.orientation === ImageOrientation.Portrait
                        ? '--portrait'
                        : ''
                    }`}
                    src={image.src}
                    alt={image.alt}
                  />
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
