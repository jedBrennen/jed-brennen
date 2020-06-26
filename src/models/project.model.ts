import FirebaseModel from 'models/firebase.model';
import Image from 'models/image.model';
import Skill from 'models/skill.model';

export default class Project extends FirebaseModel {
  public title: string;
  public skills: Skill[];
  public images: Image[];
  public shortDescription?: string;
  public longDescription?: string;
  public github?: string;

  constructor(
    id: string,
    fromServer: boolean,
    title: string,
    skills: Skill[],
    images: Image[],
    shortDescription?: string,
    longDescription?: string,
    github?: string
  ) {
    super(id, fromServer);
    this.title = title;
    this.skills = skills;
    this.images = images;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
    this.github = github;
  }

  public static get converter(): firebase.firestore.FirestoreDataConverter<
    Project
  > {
    return {
      toFirestore: FirebaseModel.toFirestore,
      fromFirestore: (
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
      ): Project => {
        const project = FirebaseModel.fromFirestore<Project>(snapshot, options);
        project.skills = [];
        project.images = [];
        return project;
      },
    };
  }
}
