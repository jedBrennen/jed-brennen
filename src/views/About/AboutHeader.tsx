import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Particles, {
  InteractivityDetect,
  ParticlesProps,
} from 'react-particles-js';
import { Button } from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';

import * as utils from 'utils/Utils';

import 'assets/scss/styles/about/about-header.scss';

interface AboutHeaderProps {
  summary: string;
  onScroll?: VoidFunction;
}

interface AboutHeaderState {
  animate: boolean;
}

export default class AboutHeader extends Component<
  AboutHeaderProps,
  AboutHeaderState
> {
  constructor(props: AboutHeaderProps) {
    super(props);

    this.state = {
      animate: !utils.isDev(),
    };
  }

  render() {
    return (
      <section className="header about-header">
        <Particles
          className="particles"
          height="100vh"
          {...this.particleParams}
        />
        <div className="header-center text-center about-header__text">
          <h1
            className="text-center mb-4"
            dangerouslySetInnerHTML={{ __html: this.props.summary }}
          ></h1>
          <Button
            variant="secondary"
            className="about-header__scroll h6 btn-link"
            onClick={this.props.onScroll}
          >
            Scroll down to learn more
            <FontAwesomeIcon
              icon="angle-double-down"
              className="about-header__down ml-2"
            />
          </Button>
        </div>
        <span className="about-header__animation-switch h6">
          Animation:
          <Switch
            wrapperClass="ml-2"
            defaultValue={this.state.animate}
            onChange={(cmp, enabled) =>
              this.setState({ animate: enabled ?? false })
            }
          ></Switch>
        </span>
      </section>
    );
  }

  private get particleParams(): ParticlesProps {
    return {
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
            'enable': this.state.animate,
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
  }
}
