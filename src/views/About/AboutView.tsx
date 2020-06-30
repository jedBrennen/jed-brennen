import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import smoothscroll from 'smoothscroll-polyfill';

import FirebaseService, { FirebaseContext } from 'services/firebase.service';
import AboutService from 'services/about.service';
import ProjectService from 'services/project.service';
import CompanyService from 'services/company.service';
import Company from 'models/company.model';
import About from 'models/about.model';
import Skill from 'models/skill.model';
import Education from 'models/education.model';
import Hobby from 'models/hobby.model';
import Project from 'models/project.model';
import AboutHeader from 'views/About/AboutHeader';
import SkillsHeader from 'views/About/SkillsHeader';
import EducationHeader from 'views/About/EducationHeader';
import HobbyHeader from 'views/About/HobbyHeader';
import ContactHeader from 'views/About/ContactHeader';
import { NavbarContext } from 'components/Navigation/AppNavbar';

import 'assets/scss/styles/about/about.scss';

interface AboutViewData {
  about: About;
  skills: Skill[];
  education: Education[];
  hobbies: Hobby[];
  projects: Project[];
  companies: Company[];
}

const fetchData = async (
  firebaseService: FirebaseService,
  onData: (data: AboutViewData) => void,
  onError: (error: string) => void,
  onCompletion?: () => void
) => {
  const aboutService = new AboutService(firebaseService);
  const projectService = new ProjectService(firebaseService);
  const companyService = new CompanyService(firebaseService);
  try {
    const values = await Promise.all([
      aboutService.getAbout(),
      aboutService.getSkills(),
      aboutService.getEducation(),
      aboutService.getHobbies(),
      projectService.getCompleteProjects(),
      companyService.getCompleteCompanies(),
    ]);
    onData({
      about: values[0],
      skills: values[1],
      education: values[2],
      hobbies: values[3],
      projects: values[4],
      companies: values[5],
    });
  } catch {
    onError(
      'Whoops, something went wrong there. Please refresh and try again.'
    );
  } finally {
    onCompletion && onCompletion();
  }
};

const scrollToFirstSection = () => {
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
};

const AboutView: React.FC<RouteComponentProps> = () => {
  const firebaseService = useContext(FirebaseContext);
  const navbarTheme = useContext(NavbarContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<AboutViewData>({
    about: new About(),
    skills: [],
    education: [],
    hobbies: [],
    projects: [],
    companies: [],
  });

  useEffect(smoothscroll.polyfill, []);
  useEffect(() => {
    navbarTheme.setTheme('adaptive');
  }, [navbarTheme]);
  useEffect(() => {
    setIsLoading(true);
    fetchData(firebaseService, setData, setError, () => setIsLoading(false));
  }, [firebaseService]);

  const { about, skills, education, hobbies, projects, companies } = data;
  return (
    <>
      <AboutHeader
        isLoading={isLoading}
        summary={about.summary}
        error={error}
        onScroll={scrollToFirstSection}
      />
      {!isLoading && !error && (
        <>
          <SkillsHeader
            skills={skills}
            projects={projects}
            companies={companies}
          />
          <EducationHeader education={education} projects={projects} />
          <HobbyHeader hobbies={hobbies} />
          <ContactHeader />
        </>
      )}
    </>
  );
};

export default AboutView;
