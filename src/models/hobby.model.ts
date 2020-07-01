import FirebaseModel from 'models/firebase.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default class Hobby extends FirebaseModel {
  public title: string;
  public description: string;
  public iconName: IconProp;

  constructor(
    id: string = '',
    fromServer: boolean = false,
    title: string = '',
    description: string = '',
    iconName: IconProp = 'info'
  ) {
    super(id, fromServer);
    this.title = title;
    this.description = description;
    this.iconName = iconName;
  }

  public static get converter(): firebase.firestore.FirestoreDataConverter<
    Hobby
  > {
    return {
      toFirestore: FirebaseModel.toFirestore,
      fromFirestore: (
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
      ): Hobby => {
        const hobby = FirebaseModel.fromFirestore<Hobby>(snapshot, options);
        return new Hobby(
          hobby.id,
          hobby.fromServer,
          hobby.title,
          hobby.description,
          hobby.iconName
        );
      },
    };
  }

  public compareTo(other: Hobby, desc?: boolean): number {
    let result = 0;
    if (this.title < other.title) result = -1;
    if (this.title > other.title) result = 1;
    return (result *= desc ? -1 : 1);
  }
}
