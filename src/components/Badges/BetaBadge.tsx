import React from 'react';
import { Badge } from 'react-bootstrap';

const BetaBadge: React.FC = (props) => {
  return <Badge variant="warning">{props.children}</Badge>;
};

export default BetaBadge;
