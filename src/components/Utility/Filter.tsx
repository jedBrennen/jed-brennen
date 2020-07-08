import React from 'react';
import { Row, Button } from 'react-bootstrap';

import 'assets/scss/styles/utility/filter.scss';

export type FilterOption = {
  label: string;
  value: string;
};

interface FilterProps {
  options: FilterOption[];
  selectedOption?: FilterOption;
  onChange?: (option?: FilterOption) => void;
}

const Filter: React.FC<FilterProps> = (props) => {
  const { options, selectedOption, onChange } = props;
  const sortedOptions = options.sort((a, b) => {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  });

  return (
    <Row className="justify-content-center">
      {!!sortedOptions.length && (
        <Button
          className="filter-button m-1"
          size="sm"
          onClick={() => onChange && onChange(undefined)}
          variant={!!selectedOption ? 'outline-info' : 'info'}
        >
          All
        </Button>
      )}
      {sortedOptions.map((option) => (
        <Button
          key={option.value}
          className="filter-button m-1"
          size="sm"
          onClick={() => onChange && onChange(option)}
          variant={
            option.value === selectedOption?.value ? 'info' : 'outline-info'
          }
        >
          {option.label}
        </Button>
      ))}
    </Row>
  );
};

export default Filter;
