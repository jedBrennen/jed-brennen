import React from 'react';
import { Container, Row } from 'react-bootstrap';

import SocialLink from 'components/Social/SocialLink';

import 'assets/scss/styles/about/contact-header.scss';

const ContactHeader: React.FC = () => {
  return (
    <section className="header contact-header text-center pb-3">
      <Container>
        <h1 className="mb-4">Other Spaces</h1>
        <Row className="justify-content-center align-items-center">
          <SocialLink
            link="https://github.com/jedBrennen"
            icon={['fab', 'github']}
            size="5x"
            className="px-4"
          />
          <SocialLink
            link="https://www.linkedin.com/in/jedbrennen/"
            icon={['fab', 'linkedin']}
            size="5x"
            className="px-4"
          />
        </Row>
      </Container>
    </section>
  );
};

export default ContactHeader;
