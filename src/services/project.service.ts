import FirebaseService from 'services/firebase.service';
import Project from 'models/project.model';
import Image from 'models/image.model';

export default class ProjectService {
  static readonly collectionName = 'projects';
  constructor(private firebase: FirebaseService) {}

  public async getProjects() {
    const projectCollection = await this.collection
      .withConverter<Project>(Project.converter)
      .get();
    return projectCollection.docs.map((doc) => doc.data());
  }

  public async getProject(projectId: string) {
    const projectDoc = this.collection.doc(projectId);
    const project = (
      await projectDoc.withConverter<Project>(Project.converter).get()
    ).data();
    const imageDocs = (
      await projectDoc
        .collection('images')
        .withConverter<Image>(Image.converter)
        .get()
    ).docs;
    if (project) {
      project.images = imageDocs.map((imageDoc) => imageDoc.data());
      return project;
    }

    return undefined;
  }

  private get collection() {
    return this.firebase.db.collection(ProjectService.collectionName);
  }
}
