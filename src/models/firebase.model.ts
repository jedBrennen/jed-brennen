export default abstract class FirebaseModel {
  public id: string;
  public fromServer: boolean;

  constructor(id: string, fromServer: boolean) {
    this.id = id;
    this.fromServer = fromServer;
  }

  public static get converter(): firebase.firestore.FirestoreDataConverter<
    any
  > {
    return {
      toFirestore: this.toFirestore,
      fromFirestore: this.fromFirestore,
    };
  }

  protected static toFirestore<T extends FirebaseModel>(
    model: T
  ): firebase.firestore.DocumentData {
    const data = { ...model };
    delete data.id;
    delete data.fromServer;
    return { ...data };
  }

  protected static fromFirestore<T extends FirebaseModel>(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): T {
    const data = snapshot.data(options)!;
    return { id: snapshot.id, fromServer: true, ...data } as T;
  }
}
