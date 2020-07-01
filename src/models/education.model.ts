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
    endDate?: Date
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
        return new Education(
          education.id,
          education.fromServer,
          education.institution,
          education.startDate,
          education.projects,
          [],
          education.endDate
        );
      },
    };
  }

  public compareTo(other: Education, desc?: boolean): number {
    let result = 0;
    if ((this.endDate ?? new Date()) < (other.endDate ?? new Date()))
      result = -1;
    if ((this.endDate ?? new Date()) > (other.endDate ?? new Date()))
      result = 1;
    return (result *= desc ? -1 : 1);
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

  public static get converter(): firebase.firestore.FirestoreDataConverter<
    Course
  > {
    return {
      toFirestore: FirebaseModel.toFirestore,
      fromFirestore: (
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
      ): Course => {
        const course = FirebaseModel.fromFirestore<Course>(snapshot, options);
        return new Course(
          course.id,
          course.fromServer,
          course.name,
          course.grade
        );
      },
    };
  }

  public compareTo(other: Course, desc?: boolean): number {
    let result = 0;
    if (this.name < other.name) result = -1;
    if (this.name > other.name) result = 1;
    return (result *= desc ? -1 : 1);
  }
}
