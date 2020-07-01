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
  projects?: Project[];
  companies?: Company[];
}

const SkillWheel: React.FC<SkillWheelProps> = (props) => {
  const containerRef = React.createRef<HTMLDivElement>();
  const targetRef = React.createRef<HTMLImageElement>();
  const [showOverlay, setShowOverlay] = useState(false);
  const { skill, projects, companies } = props;
  const noData = !projects?.length && !companies?.length;

  return (
    <AspectBox className="p-4">
      {!noData && (
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
      )}
      <div
        className={`skill-wheel__container${
          noData ? ' skill-wheel__container--no-data' : ''
        }`}
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
        {noData && <h5 className="skill-wheel__text">{skill.name}</h5>}
        {!noData && <span className="sr-only">{skill.name}</span>}
        {projects && !!projects.length && (
          <h5 className="skill-wheel__text">
            <span className="sr-only">
              {getPlurality('Project', projects.length)}
            </span>
            {getPlurality('Project', projects.length)}
          </h5>
        )}
        {companies && !!companies.length && (
          <h5 className="skill-wheel__text">
            <span className="sr-only">
              {getPlurality('Company', companies.length)}
            </span>
            {getPlurality('Company', companies.length)}
          </h5>
        )}
      </div>
    </AspectBox>
  );
};

export default SkillWheel;
