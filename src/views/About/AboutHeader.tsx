import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Particles, {
  InteractivityDetect,
  ParticlesProps,
} from 'react-particles-js';
import { Button, Container, Alert } from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';

import * as utils from 'utils/Utils';
import Skeleton from 'components/Skeleton/Skeleton';

import 'assets/scss/styles/about/about-header.scss';

interface AboutHeaderProps {
  isLoading: boolean;
  summary: string;
  error?: string;
  onScroll?: VoidFunction;
}

interface HeaderProps {
  summary: string;
  onScroll?: VoidFunction;
}

const LoadingHeader: React.FC = () => {
  return (
    <>
      <Skeleton className="about-header__skeleton-title" srAccessible />
      <Skeleton className="about-header__skeleton-title mb-5" />
      <Skeleton className="about-header__skeleton-scroll" />
    </>
  );
};

const LoadedHeader: React.FC<HeaderProps> = (props) => {
  const { summary, onScroll } = props;
  return (
    <>
      <h1
        className="text-center mb-4"
        dangerouslySetInnerHTML={{ __html: summary }}
      ></h1>
      <Button
        variant="secondary"
        className="about-header__scroll h6 btn-link"
        onClick={onScroll}
      >
        Scroll down to learn more
        <FontAwesomeIcon
          icon="angle-double-down"
          className="about-header__down ml-2"
        />
      </Button>
    </>
  );
};

const AboutHeader: React.FC<AboutHeaderProps> = (props) => {
  const initialRender = useRef(true);
  const [isAnimating, setIsAnimating] = useState(!utils.isDev());
  const [particlesAnimating, setParticlesAnimating] = useState(isAnimating);
  const [fadeParticles, setFadeParticles] = useState(false);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setFadeParticles(true);
      setTimeout(() => setParticlesAnimating(isAnimating), 1000);
      setTimeout(() => setFadeParticles(false), 2000);
    }
  }, [isAnimating]);

  const particleParams: ParticlesProps = {
    params: {
      'particles': {
        'number': {
          'value': 160,
          'density': { 'enable': true, 'value_area': 800 },
        },
        'color': { 'value': '#FFFFFF' },
        'shape': {
          'type': 'circle',
        },
        'opacity': {
          'value': 1,
          'random': true,
          'anim': {
            'enable': true,
            'speed': 2,
            'opacity_min': 0,
            'sync': false,
          },
        },
        'size': {
          'value': 3,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 4,
            'size_min': 0.3,
            'sync': false,
          },
        },
        'line_linked': {
          'enable': false,
        },
        'move': {
          'enable': particlesAnimating,
          'speed': 0,
        },
      },
      'interactivity': {
        'detect_on': InteractivityDetect.canvas,
        'events': {
          'onhover': { 'enable': true, 'mode': 'bubble' },
        },
        'modes': {
          'bubble': {
            'distance': 150,
            'size': 3,
            'duration': 2,
            'opacity': 0.1,
          },
        },
      },
      'retina_detect': true,
    },
  };

  const { isLoading, summary, error, onScroll } = props;
  return (
    <section className="header about-header">
      <div
        className={`particles-container${
          fadeParticles ? ' particles--toggling' : ''
        }`}
      >
        <Particles className="particles" height="100vh" {...particleParams} />
      </div>
      <Container className="header-center text-center about-header__text">
        {error ? (
          <Alert variant="danger">{error}</Alert>
        ) : isLoading ? (
          <LoadingHeader />
        ) : (
          <LoadedHeader summary={summary} onScroll={onScroll} />
        )}
      </Container>
      <span className="about-header__animation-switch h6">
        Animation:
        <Switch
          wrapperClass="ml-2"
          defaultValue={isAnimating}
          onChange={(cmp, enabled) => setIsAnimating(enabled ?? false)}
        ></Switch>
      </span>
    </section>
  );
};

export default AboutHeader;
