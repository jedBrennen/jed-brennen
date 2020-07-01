import FirebaseModel from 'models/firebase.model';

export enum ImageOrientation {
  Landscape,
  Portrait,
}

export default class Image extends FirebaseModel {
  src: string;
  alt: string;
  orientation?: ImageOrientation;

  constructor(
    id: string,
    fromServer: boolean,
    src: string,
    alt: string,
    orientation?: ImageOrientation
  ) {
    super(id, fromServer);
    this.src = src;
    this.alt = alt;
    this.orientation = orientation;
  }

  public static get converter(): firebase.firestore.FirestoreDataConverter<
    Image
  > {
    return {
      toFirestore: FirebaseModel.toFirestore,
      fromFirestore: (
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
      ): Image => {
        const image = FirebaseModel.fromFirestore<Image>(snapshot, options);
        const orientation = (image.orientation as any) as keyof typeof ImageOrientation;
        return new Image(
          image.id,
          image.fromServer,
          image.src,
          image.alt,
          ImageOrientation[orientation]
        );
      },
    };
  }

  public compareTo(other: Image, desc?: boolean): number {
    let result = 0;
    if (this.alt < other.alt) result = -1;
    if (this.alt > other.alt) result = 1;
    return (result *= desc ? -1 : 1);
  }
}
