import React, { Component } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import FirebaseService, { FirebaseContext } from 'services/firebase.service';
import AboutService from 'services/about.service';
import About from 'models/about.model';
import Skill from 'models/skill.model';
import Education from 'models/education.model';
import Hobby from 'models/hobby.model';
import Project from 'models/project.model';
import AboutHeader from 'views/About/AboutHeader';
import SkillsHeader from 'views/About/SkillsHeader';
import EducationHeader from 'views/About/EducationHeader';
import OtherHeader from 'views/About/OtherHeader';
import { Alert } from 'react-bootstrap';

import 'assets/scss/styles/about/about.scss';
import ProjectService from 'services/project.service';

interface AboutViewState {
  isLoading: boolean;
  about: About;
  skills: Skill[];
  education: Education[];
  hobbies: Hobby[];
  projects: Project[];
  error?: string;
}

export default class AboutView extends Component<{}, AboutViewState> {
  static contextType = FirebaseContext;
  public context!: React.ContextType<typeof FirebaseContext>;
  private aboutService: AboutService;
  private projectService: ProjectService;

  constructor(props: any, context: FirebaseService) {
    super(props);

    this.aboutService = new AboutService(context);
    this.projectService = new ProjectService(context);
    this.state = {
      isLoading: false,
      about: new About(),
      skills: [],
      education: [],
      hobbies: [],
      projects: [],
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
          summary={this.state.about.summary || 'Loading...'}
        />
        {/* <SkillsHeader /> */}
        <EducationHeader
          education={this.state.education}
          projects={this.state.projects}
        />
        {/* <OtherHeader /> */}
      </>
    );
  }

  private async fetchAboutData() {
    this.setState({ isLoading: true });
    try {
      const values = await Promise.all([
        this.aboutService.getAbout(),
        this.aboutService.getSkills(),
        this.aboutService.getEducation(),
        this.aboutService.getHobbies(),
        this.projectService.getCompleteProjects(),
      ]);
      this.setState({
        about: values[0],
        skills: values[1],
        education: values[2],
        hobbies: values[3],
        projects: values[4],
        isLoading: false,
      });
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
