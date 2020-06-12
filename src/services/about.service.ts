import { db } from 'services/firebase.service';
import { Project } from 'models/project.model';

const collectionName = 'about';

export default class AboutService {
  public async getAbout() {
    let projects = await db.collection(collectionName).get();
    return projects.docs.map((doc) => doc.data() as Project);
  }
}
