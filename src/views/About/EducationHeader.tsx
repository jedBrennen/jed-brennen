import React from 'react';
import { Row, Container } from 'react-bootstrap';

import Education from 'models/education.model';
import Project from 'models/project.model';
import Showcase from 'components/Showcase';

import 'assets/scss/styles/about/education-header.scss';

interface EducationHeaderProps {
  education: Education[];
  projects: Project[];
}

const getProjects = (projectIds: string[], projects: Project[]) => {
  return projectIds.length
    ? projects.filter((project) => projectIds.includes(project.id))
    : [];
};

const EducationHeader = (props: EducationHeaderProps) => {
  const { education, projects } = props;
  return (
    <section className="header education-header">
      <Container className="text-center">
        <h1>Education</h1>
        {education.map((edu) => {
          return (
            <div key={edu.id}>
              <div className="education__details">
                <h3 className="education__institution">{edu.institution}</h3>
                {edu.courses.map((course) => {
                  return (
                    <div key={course.id} className="education__course">
                      <h4 className="mt-2">{course.name}</h4>
                      <h4 className="mt-2">{course.grade}</h4>
                    </div>
                  );
                })}
              </div>
              <Row xs={1} sm={2} lg={3} className="justify-content-center">
                {getProjects(edu.projects, projects).map((project) => {
                  return (
                    <Showcase
                      key={project.id}
                      title={project.title}
                      subtitle={project.shortDescription ?? ''}
                      image={project.images[0]}
                    />
                  );
                })}
              </Row>
            </div>
          );
        })}
      </Container>
    </section>
  );
};

export default EducationHeader;
