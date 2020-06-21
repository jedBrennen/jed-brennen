import FirebaseModel from 'models/firebase.model';

export default class Company extends FirebaseModel {
  public name: string;
  public roles: Role[];
  public shortDescription?: string;
  public longDescription?: string;

  constructor(
    id: string,
    fromServer: boolean,
    name: string,
    roles: Role[],
    shortDescription?: string,
    longDescription?: string
  ) {
    super(id, fromServer);
    this.name = name;
    this.roles = roles;
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
        company.roles = [];
        return company;
      },
    };
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
        return role;
      },
    };
  }
}
