import FirebaseService from 'services/firebase.service';
import About from 'models/about.model';
import Skill from 'models/skill.model';
import Hobby from 'models/hobby.model';
import Education, { Course } from 'models/education.model';

const aboutCollection = 'about';
const skillsCollection = 'skills';
const educationCollection = 'education';
const hobbiesCollection = 'hobbies';

export default class AboutService {
  constructor(private firebase: FirebaseService) {}

  public async getAbout() {
    const about = await this.firebase.db
      .collection(aboutCollection)
      .withConverter<About>(About.converter)
      .get();

    return about.docs[0].data();
  }

  public async getSkills() {
    const skills = await this.firebase.db
      .collection(skillsCollection)
      .withConverter<Skill>(Skill.converter)
      .get();
    if (skills.docs.length) {
      return skills.docs.map((doc) => doc.data());
    }

    return [];
  }

  public async getEducation() {
    const educationSnapshot = await this.firebase.db
      .collection(educationCollection)
      .withConverter<Education>(Education.converter)
      .get();

    const education = await Promise.all(
      educationSnapshot.docs.map(async (doc) => {
        const edu = doc.data();
        edu.courses = await this.getCourses(doc.id);
        return edu;
      })
    );

    return education;
  }

  public async getHobbies() {
    const hobbies = await this.firebase.db
      .collection(hobbiesCollection)
      .withConverter<Hobby>(Hobby.converter)
      .get();
    if (hobbies.docs.length) {
      return hobbies.docs.map((doc) => doc.data());
    }

    return [];
  }

  public async getCourses(educationId: string) {
    const educationDoc = this.firebase.db
      .collection(educationCollection)
      .doc(educationId);
    const courseDocs = (
      await educationDoc
        .collection('courses')
        .withConverter<Course>(Course.converter)
        .get()
    ).docs;

    return courseDocs.map((doc) => doc.data());
  }
}
