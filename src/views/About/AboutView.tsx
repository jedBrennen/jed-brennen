import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import FirebaseService, { FirebaseContext } from 'services/firebase.service';
import AboutService from 'services/about.service';
import About from 'models/about.model';
import AboutHeader from 'views/About/AboutHeader';
import { Alert } from 'react-bootstrap';

import 'assets/scss/styles/about/about.scss';

interface AboutViewState {
  isLoading: boolean;
  about: About;
  error?: string;
}

export default class AboutView extends Component<{}, AboutViewState> {
  static contextType = FirebaseContext;
  public context!: React.ContextType<typeof FirebaseContext>;
  private aboutService: AboutService;

  constructor(props: any, context: FirebaseService) {
    super(props);

    this.aboutService = new AboutService(context);
    this.state = {
      isLoading: false,
      about: new About(),
    };
  }

  componentDidMount() {
    smoothscroll.polyfill();
    this.fetchAboutData();
  }

  render() {
    return (
      <>
        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        <AboutHeader
          onScroll={this.scrollToFirstSection}
          summary={this.state.about.summary}
        />
      </>
    );
  }

  private async fetchAboutData() {
    this.setState({ isLoading: true });
    try {
      const about = (await this.aboutService.getAbout()) || new About();
      this.setState({ about, isLoading: false });
    } catch {
      this.setState({
        error:
          'Whoops, something went wrong there. Please refresh and try again.',
        isLoading: false,
      });
    }
  }

  private scrollToFirstSection() {
    let navBarHeight = 0;
    if (window.innerWidth < 576) {
      navBarHeight = 41;
    } else if (window.innerWidth < 768) {
      navBarHeight = 71;
    }
    const sections = document.querySelectorAll('section');
    const sectionPos =
      sections.length > 1 ? sections[1].getBoundingClientRect() : undefined;
    if (sectionPos) {
      window.scrollTo({
        top: sectionPos.top - navBarHeight + window.scrollY,
        behavior: 'smooth',
      });
    }
  }
}
