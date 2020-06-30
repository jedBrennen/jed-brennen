import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import 'assets/scss/styles/social/social-link.scss';

type IconSize =
  | '3x'
  | 'xs'
  | 'lg'
  | 'sm'
  | '1x'
  | '2x'
  | '4x'
  | '5x'
  | '6x'
  | '7x'
  | '8x'
  | '9x'
  | '10x';

type BootstrapVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | 'link'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-dark'
  | 'outline-light';

interface SocialLinkProps {
  link: string;
  icon: IconProp;
  size?: IconSize;
  variant?: BootstrapVariant;
  className?: string;
}

const SocialLink: React.FC<SocialLinkProps> = (props) => {
  const { link, icon, size, variant, className } = props;
  return (
    <Button
      as="a"
      href={link}
      target="_blank"
      className={`social-link btn-link${className ? ` ${className}` : ''}`}
      variant={variant ?? 'secondary'}
    >
      <FontAwesomeIcon icon={icon} size={size} />
    </Button>
  );
};

export default SocialLink;
