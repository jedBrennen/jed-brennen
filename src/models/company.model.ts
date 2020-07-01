import FirebaseModel from 'models/firebase.model';
import Skill from 'models/skill.model';

export default class Company extends FirebaseModel {
  public name: string;
  public roles: Role[];
  public skills: Skill[];
  public shortDescription?: string;
  public longDescription?: string;

  constructor(
    id: string = '',
    fromServer: boolean = false,
    name: string = '',
    roles: Role[] = [],
    skills: Skill[] = [],
    shortDescription?: string,
    longDescription?: string
  ) {
    super(id, fromServer);
    this.name = name;
    this.roles = roles;
    this.skills = skills;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
  }

  public static get converter(): firebase.firestore.FirestoreDataConverter<
    Company
  > {
    return {
      toFirestore: FirebaseModel.toFirestore,
      fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
      ): Company {
        const company = FirebaseModel.fromFirestore<Company>(snapshot, options);
        return new Company(
          company.id,
          company.fromServer,
          company.name,
          [],
          [],
          company.shortDescription,
          company.longDescription
        );
      },
    };
  }

  public compareTo(other: Company, desc?: boolean): number {
    let result = 0;
    if (this.name < other.name) result = -1;
    if (this.name > other.name) result = 1;
    return (result *= desc ? -1 : 1);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class Role extends FirebaseModel {
  public title: string;
  public startDate: Date;
  public endDate?: Date;

  constructor(
    id: string,
    fromServer: boolean,
    title: string,
    startDate: Date,
    endDate?: Date
  ) {
    super(id, fromServer);
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  public static get converter(): firebase.firestore.FirestoreDataConverter<
    Role
  > {
    return {
      toFirestore: FirebaseModel.toFirestore,
      fromFirestore: (
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
      ): Role => {
        const role = FirebaseModel.fromFirestore<Role>(snapshot, options);
        role.startDate = new Date((role.startDate as any).seconds * 1000);
        if (role.endDate) {
          role.endDate = new Date((role.endDate as any).seconds * 1000);
        }
        return new Role(
          role.id,
          role.fromServer,
          role.title,
          role.startDate,
          role.endDate
        );
      },
    };
  }

  public compareTo(other: Role, desc?: boolean): number {
    let result = 0;
    if ((this.endDate ?? new Date()) < (other.endDate ?? new Date()))
      result = -1;
    if ((this.endDate ?? new Date()) > (other.endDate ?? new Date()))
      result = 1;
    return (result *= desc ? -1 : 1);
  }
}
