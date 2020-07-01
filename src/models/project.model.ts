import FirebaseModel from 'models/firebase.model';
import Image from 'models/image.model';
import Skill from 'models/skill.model';

export default class Project extends FirebaseModel {
  public title: string;
  public skills: Skill[];
  public images: Image[];
  public beta: boolean;
  public coverImage?: string;
  public shortDescription?: string;
  public longDescription?: string;
  public github?: string;

  constructor(
    id: string = '',
    fromServer: boolean = false,
    title: string = '',
    skills: Skill[] = [],
    images: Image[] = [],
    beta: boolean = false,
    coverImage?: string,
    shortDescription?: string,
    longDescription?: string,
    github?: string
  ) {
    super(id, fromServer);
    this.title = title;
    this.skills = skills;
    this.images = images;
    this.beta = beta;
    this.coverImage = coverImage;
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
        return new Project(
          project.id,
          project.fromServer,
          project.title,
          [],
          [],
          project.beta,
          project.coverImage,
          project.shortDescription,
          project.longDescription,
          project.github
        );
      },
    };
  }

  public compareTo(other: Project, desc?: boolean): number {
    let result = 0;
    if (this.title < other.title) result = -1;
    if (this.title > other.title) result = 1;
    return (result *= desc ? -1 : 1);
  }
}
