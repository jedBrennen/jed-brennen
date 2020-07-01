import React from 'react';
import { Container, Row, Button, Alert, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Skill from 'models/skill.model';
import SkillGrid from 'components/Showcase/SkillGrid';
import SkillWheel from 'components/Showcase/SkillWheel';
import SkillWheelLoading from 'components/Showcase/SkillWheelLoading';
import Skeleton from 'components/Skeleton/Skeleton';

import 'assets/scss/styles/templates/details.scss';

interface DetailsProps {
  isLoading: boolean;
  listTitle: string;
  listLocation: string;
  pageTitle?: string;
  pageBadge?: string;
  links?: React.ReactNode;
  linksLoading?: React.ReactNode;
  descriptionTitle?: string;
  description?: string;
  skillsTitle?: string;
  skills?: Skill[];
  error?: string;
}

interface TitleProps {
  pageTitle?: string;
  pageBadge?: string;
  links?: React.ReactNode;
}

interface TitleLoadingProps {
  linksLoading?: React.ReactNode;
}

interface DescriptionProps {
  description: string;
  descriptionTitle?: string;
}

interface SkillDetailsProps {
  skills: Skill[];
  skillsTitle?: string;
}

const Title: React.FC<TitleProps> = (props) => {
  const { pageTitle, pageBadge, links } = props;

  return (
    <Row className="mx-0 justify-content-between align-items-end">
      <div className="details__title">
        <span className="mt-0 mr-2 h1">{pageTitle}</span>
        {!!pageBadge && (
          <Badge className="mb-0" variant="warning">
            {pageBadge}
          </Badge>
        )}
      </div>
      <span>{links}</span>
    </Row>
  );
};

const TitleLoading: React.FC<TitleLoadingProps> = (props) => {
  const { linksLoading } = props;

  return (
    <Row className="mt-2 mx-0 justify-content-between align-items-end">
      <Skeleton.H1 srAccessible className="mt-0" />
      <span>{linksLoading}</span>
    </Row>
  );
};

const Description: React.FC<DescriptionProps> = (props) => {
  const { description, descriptionTitle } = props;

  return (
    <>
      <h2 className="mb-2">{descriptionTitle}</h2>
      <p dangerouslySetInnerHTML={{ __html: description }} />
    </>
  );
};

const DescriptionLoading: React.FC = () => {
  return (
    <>
      <Skeleton.H2 className="mb-2" />
      <Skeleton.P />
      <Skeleton.P className="w-75" />
    </>
  );
};

const SkillDetails: React.FC<SkillDetailsProps> = (props) => {
  const { skills, skillsTitle } = props;

  return (
    <>
      <h2>{skillsTitle}</h2>
      <SkillGrid>
        {skills.map((skill) => {
          return <SkillWheel key={skill.id} skill={skill} />;
        })}
      </SkillGrid>
    </>
  );
};

const SkillDetailsLoading: React.FC = () => {
  return (
    <>
      <Skeleton.H2 />
      <SkillGrid>
        <SkillWheelLoading count={4} />
      </SkillGrid>
    </>
  );
};

const Details: React.FC<DetailsProps> = (props) => {
  const {
    isLoading,
    listTitle,
    listLocation,
    pageTitle,
    pageBadge,
    links,
    linksLoading,
    skills,
    skillsTitle,
    description,
    descriptionTitle,
    error,
    children,
  } = props;

  return (
    <Container>
      <header className="my-4">
        <Row className="mx-0">
          <LinkContainer
            to={listLocation}
            exact={true}
            className="details__back-button"
          >
            <Button className="btn-link" variant="secondary">
              <FontAwesomeIcon
                className="details__back-icon"
                icon={['far', 'arrow-alt-circle-left']}
                size="3x"
              />
              <span className="details__back-text">{`Back to ${listTitle}`}</span>
            </Button>
          </LinkContainer>
        </Row>
        <Alert show={!!error} variant="danger" className="mt-3">
          {error}
        </Alert>
        {!isLoading && (
          <Title pageTitle={pageTitle} pageBadge={pageBadge} links={links} />
        )}
        {isLoading && <TitleLoading linksLoading={linksLoading} />}
      </header>
      {children && <section>{children}</section>}
      <section>
        {!isLoading && description && (
          <Description
            description={description}
            descriptionTitle={descriptionTitle}
          />
        )}
        {isLoading && <DescriptionLoading />}
      </section>
      <section className="mb-4">
        {!isLoading && skills && !!skills.length && (
          <SkillDetails skills={skills} skillsTitle={skillsTitle} />
        )}
        {isLoading && <SkillDetailsLoading />}
      </section>
    </Container>
  );
};

export default Details;
