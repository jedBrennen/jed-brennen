import FirebaseService from 'services/firebase.service';
import About from 'models/about.model';

const aboutCollection = 'about';

export default class AboutService {
  constructor(private firebase: FirebaseService) {}

  public async getAbout() {
    const about = await this.firebase.db
      .collection(aboutCollection)
      .withConverter<About>(About.converter)
      .get();
    if (about.docs.length) {
      return about.docs[0].data();
    }

    return undefined;
  }
}
