import FirebaseModel from 'models/firebase.model';

export default class About extends FirebaseModel {
  summary: string;

  constructor(
    id: string = '',
    fromServer: boolean = false,
    summary: string = ''
  ) {
    super(id, fromServer);
    this.summary = summary;
  }

  public static get converter(): firebase.firestore.FirestoreDataConverter<
    About
  > {
    return {
      toFirestore: FirebaseModel.toFirestore,
      fromFirestore: (
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
      ): About => {
        const about = FirebaseModel.fromFirestore<About>(snapshot, options);
        return new About(about.id, about.fromServer, about.summary);
      },
    };
  }

  public compareTo(other: About, desc?: boolean): number {
    let result = 0;
    if (this.summary < other.summary) result = -1;
    if (this.summary > other.summary) result = 1;
    return (result *= desc ? -1 : 1);
  }
}
