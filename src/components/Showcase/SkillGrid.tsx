import React from 'react';
import { Row } from 'react-bootstrap';

interface SkillGridProps {
  children: React.ReactNode;
}

const SkillGrid: React.FC<SkillGridProps> = (props) => {
  return (
    <Row
      xs={2}
      md={3}
      lg={4}
      className="justify-content-center align-items-center"
    >
      {props.children}
    </Row>
  );
};

export default SkillGrid;
