import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Skill from 'models/skill.model';
import SkillWheel from 'components/Showcase/SkillWheel';
import SkillGrid from 'components/Showcase/SkillGrid';

import 'assets/scss/styles/templates/details.scss';

interface DetailsProps {
  isLoading: boolean;
  pageTitle: string;
  listTitle: string;
  listLocation: string;
  links?: React.ReactNode;
  description?: string;
  descriptionTitle?: string;
  skills?: Skill[];
  skillsTitle?: string;
  error?: string;
}

const Details: React.FC<DetailsProps> = (props) => {
  const {
    isLoading,
    pageTitle,
    listTitle,
    listLocation,
    links,
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
        <Row className="mt-0 h1">
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
        <Row className="mt-0 h1 justify-content-between align-items-end">
          <span>{pageTitle}</span>
          <span>{links}</span>
        </Row>
      </header>
      {children && <section>{children}</section>}
      {description && (
        <section className="mb-4">
          <h2>{descriptionTitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </section>
      )}
      {skills && !!skills.length && (
        <section className="mb-4">
          <h2>{skillsTitle}</h2>
          <SkillGrid>
            {skills.map((skill) => {
              return <SkillWheel key={skill.id} skill={skill} />;
            })}
          </SkillGrid>
        </section>
      )}
    </Container>
  );
};

export default Details;
