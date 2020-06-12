import { db, mapFirebaseData } from 'services/firebase.service';
import { Project } from 'models/project.model';

const collectionName = 'projects';

export default class ProjectService {
  public async getProjects() {
    let projectCollection = await db.collection(collectionName).get();
    return projectCollection.docs.map((doc) => mapFirebaseData<Project>(doc));
  }
}
