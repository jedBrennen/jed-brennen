import React from 'react';
import { Row } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface ShowcaseGridProps {
  showcases: JSX.Element[];
}

const spring = {
  type: 'spring',
  damping: 30,
  stiffness: 400,
};

const ShowcaseGrid: React.FC<ShowcaseGridProps> = (props) => {
  const { showcases } = props;

  return (
    <Row xs={1} sm={2} xl={3} className="justify-content-center">
      {showcases.map((showcase) => (
        <motion.span
          key={showcase.key ?? undefined}
          layoutTransition={spring}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {showcase}
        </motion.span>
      ))}
    </Row>
  );
};

export default ShowcaseGrid;
