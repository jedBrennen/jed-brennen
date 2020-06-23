import FirebaseModel from 'models/firebase.model';

export default class Education extends FirebaseModel {
  public institution: string;
  public startDate: Date;
  public projects: string[];
  public courses: Course[];
  public endDate?: Date;

  constructor(
    id: string = '',
    fromServer: boolean = false,
    institution: string = '',
    startDate: Date = new Date(),
    projects: string[] = [],
    courses: Course[] = [],
    endDate: Date
  ) {
    super(id, fromServer);
    this.institution = institution;
    this.startDate = startDate;
    this.projects = projects;
    this.courses = courses;
    this.endDate = endDate;
  }

  public static get converter(): firebase.firestore.FirestoreDataConverter<
    Education
  > {
    return {
      toFirestore: FirebaseModel.toFirestore,
      fromFirestore: (
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
      ): Education => {
        const education = FirebaseModel.fromFirestore<Education>(
          snapshot,
          options
        );
        education.projects = [];
        education.courses = [];
        return education;
      },
    };
  }
}

// tslint:disable-next-line: max-classes-per-file
export class Course extends FirebaseModel {
  public name: string;
  public grade: string;

  constructor(
    id: string = '',
    fromServer: boolean = false,
    name: string = '',
    grade: string = ''
  ) {
    super(id, fromServer);
    this.name = name;
    this.grade = grade;
  }
}
