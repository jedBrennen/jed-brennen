import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

import { COMPANIES, PROJECTS } from 'constants/routes';
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

interface SkillWheelFrontProps {
  logo: string;
  name: string;
}

const SkillWheelMotion: React.FC = (props) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  return (
    <motion.div
      className="skill-wheel__motion"
      animate={{ rotateY: flipped ? 180 : 0 }}
      onTap={() => setFlipped(!flipped)}
      layoutTransition={true}
    >
      {props.children}
    </motion.div>
  );
};

const SkillWheelFront: React.FC<SkillWheelFrontProps> = (props) => {
  const { logo, name } = props;

  return (
    <div className="skill-wheel__front">
      <div className="skill-wheel__container">
        <img className="skill-wheel__logo" src={logo} alt={`${name}__logo`} />
        {props.children}
      </div>
    </div>
  );
};

const SkillWheelBack: React.FC = (props) => {
  return (
    <div className="skill-wheel__back">
      <div className="skill-wheel__container">{props.children}</div>
    </div>
  );
};

const SkillWheel: React.FC<SkillWheelProps> = (props) => {
  const { skill, projects, companies } = props;
  const noData = !projects?.length && !companies?.length;

  return noData ? (
    <AspectBox className="p-4">
      <SkillWheelFront logo={skill.logo} name={skill.name}>
        <h5 className="skill-wheel__text">{skill.name}</h5>
      </SkillWheelFront>
    </AspectBox>
  ) : (
    <AspectBox className="p-4">
      <SkillWheelMotion>
        <SkillWheelFront logo={skill.logo} name={skill.name}>
          <span className="sr-only">{skill.name}</span>
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
        </SkillWheelFront>
        <SkillWheelBack>
          <h5 className="skill-wheel__text">{skill.name}</h5>
          {projects && !!projects.length && (
            <Link to={`${PROJECTS}#${skill.id}`}>
              <Button
                variant="outline-info"
                size="sm"
                className={companies ? 'mb-2' : ''}
              >
                Projects
              </Button>
            </Link>
          )}
          {companies && !!companies.length && (
            <Link to={`${COMPANIES}#${skill.id}`}>
              <Button
                variant="outline-info"
                size="sm"
                className={projects ? 'mb-2' : ''}
              >
                Companies
              </Button>
            </Link>
          )}
        </SkillWheelBack>
      </SkillWheelMotion>
    </AspectBox>
  );
};

export default SkillWheel;
