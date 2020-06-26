import React, { Component } from 'react';
import { Row, Container } from 'react-bootstrap';

import Education from 'models/education.model';
import Project from 'models/project.model';
import Showcase from 'components/Showcase';

import 'assets/scss/styles/about/education-header.scss';

interface EducationHeaderProps {
  education: Education[];
  projects: Project[];
}

export default class EducationHeader extends Component<EducationHeaderProps> {
  render() {
    return (
      <section className="header education-header">
        <Container className="text-center">
          <h1>Education</h1>
          {this.props.education.map((education) => {
            return (
              <div key={education.id}>
                <div className="education__details">
                  <h3 className="education__institution">
                    {education.institution}
                  </h3>
                  {education.courses.map((course) => {
                    return (
                      <div key={course.id} className="education__course">
                        <h4 className="mt-2">{course.name}</h4>
                        <h4 className="mt-2">{course.grade}</h4>
                      </div>
                    );
                  })}
                </div>
                <Row
                  xs={1}
                  sm={2}
                  lg={3}
                  xl={4}
                  className="justify-content-center"
                >
                  {this.getProjects(education.projects).map((project) => {
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
  }

  private getProjects(projectIds: string[]) {
    return projectIds.length
      ? this.props.projects.filter((project) => projectIds.includes(project.id))
      : [];
  }
}
