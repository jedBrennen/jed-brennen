import React from 'react';
import { Container, Row } from 'react-bootstrap';

import Skill from 'models/skill.model';
import Company from 'models/company.model';
import Project from 'models/project.model';
import SkillWheel from 'components/SkillWheel';

interface SkillsHeaderProps {
  skills: Skill[];
  projects: Project[];
  companies: Company[];
}

const getProjects = (skillId: string, projects: Project[]): Project[] => {
  return projects.filter((project) =>
    project.skills.some((skill) => skill.id === skillId)
  );
};

const getCompanies = (skillId: string, companies: Company[]): Company[] => {
  return companies.filter((company) =>
    company.skills.some((skill) => skill.id === skillId)
  );
};

const getOrderedSkills = (
  skills: Skill[],
  projects: Project[],
  companies: Company[]
) => {
  const skillMap = new Map(
    skills.map((skill) => {
      const projs = getProjects(skill.id, projects);
      const comps = getCompanies(skill.id, companies);
      return [skill.id, projs.length + comps.length];
    })
  );

  return skills.sort((a, b) => {
    if (skillMap.get(a.id)! > skillMap.get(b.id)!) return -1;
    if (skillMap.get(a.id)! < skillMap.get(b.id)!) return 1;
    return 0;
  });
};

const SkillsHeader = (props: SkillsHeaderProps) => {
  const { skills, projects, companies } = props;
  const orderedSkills = getOrderedSkills(skills, projects, companies);

  return (
    <section className="header skills-header text-center">
      <Container>
        <h1>Skills</h1>
        <Row
          xs={2}
          md={3}
          lg={4}
          className="justify-content-center align-items-center"
        >
          {orderedSkills.map((skill) => {
            return (
              <SkillWheel
                key={skill.id}
                skill={skill}
                projects={getProjects(skill.id, projects)}
                companies={getCompanies(skill.id, companies)}
              />
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default SkillsHeader;
