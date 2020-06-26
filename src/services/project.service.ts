import FirebaseService from 'services/firebase.service';
import AboutService from 'services/about.service';
import Project from 'models/project.model';
import Image from 'models/image.model';

export default class ProjectService {
  static readonly collectionName = 'projects';
  private aboutService: AboutService;

  constructor(private firebase: FirebaseService) {
    this.aboutService = new AboutService(firebase);
  }

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
    if (project) {
      project.images = await this.getImages(project.id);
      return project;
    }
  }

  public async getCompleteProjects() {
    const projectsSnapshot = await this.collection.get();

    const projects = await Promise.all(
      projectsSnapshot.docs.map(async (doc) => {
        const skillIds = doc.data().skills;
        const project = Project.converter.fromFirestore(doc, {});
        project.skills = await this.aboutService.getSkills(skillIds);
        project.images = await this.getImages(doc.id);
        return project;
      })
    );

    return projects;
  }

  private async getImages(projectId: string) {
    const projectDoc = this.collection.doc(projectId);
    const imageDocs = (
      await projectDoc
        .collection('images')
        .withConverter<Image>(Image.converter)
        .get()
    ).docs;

    return imageDocs.map((doc) => doc.data());
  }

  private get collection() {
    return this.firebase.db.collection(ProjectService.collectionName);
  }
}
