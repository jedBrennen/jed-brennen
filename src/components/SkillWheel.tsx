import React, { useState } from 'react';
import { Tooltip, Overlay } from 'react-bootstrap';

import { getPlurality } from 'utils/StringUtils';
import Skill from 'models/skill.model';
import Project from 'models/project.model';
import Company from 'models/company.model';
import AspectBox from 'components/Utility/AspectBox';

import 'assets/scss/styles/showcase/skill-wheel.scss';

interface SkillWheelProps {
  skill: Skill;
  projects: Project[];
  companies: Company[];
}

const SkillWheel = (props: SkillWheelProps) => {
  const containerRef = React.createRef<HTMLDivElement>();
  const targetRef = React.createRef<HTMLImageElement>();
  const { skill, projects, companies } = props;
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <AspectBox className="p-4">
      <Overlay
        container={containerRef}
        target={targetRef}
        placement="top"
        show={showOverlay}
      >
        {(overlayProps) => (
          <Tooltip id={`tooltip-${skill.name}`} {...overlayProps}>
            {skill.name}
          </Tooltip>
        )}
      </Overlay>
      <div
        className="skill-wheel__container"
        ref={containerRef}
        onMouseOver={() => setShowOverlay(true)}
        onMouseOut={() => setShowOverlay(false)}
      >
        <img
          ref={targetRef}
          className="skill-wheel__logo"
          src={skill.logo}
          alt={`${skill.name}__logo`}
        />
        <h5 className="skill-wheel__project-count">
          {getPlurality('Project', projects.length)}
        </h5>
        <h5 className="skill-wheel__company-count">
          {getPlurality('Company', companies.length)}
        </h5>
      </div>
    </AspectBox>
  );
};

export default SkillWheel;
