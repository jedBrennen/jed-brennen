import React from 'react';
import { Row } from 'react-bootstrap';

interface ShowcaseGridProps {
  children: React.ReactNode;
}

const ShowcaseGrid: React.FC<ShowcaseGridProps> = (props) => {
  return (
    <Row xs={1} sm={2} lg={3} className="justify-content-center">
      {props.children}
    </Row>
  );
};

export default ShowcaseGrid;
