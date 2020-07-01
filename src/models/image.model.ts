import FirebaseModel from 'models/firebase.model';

export enum ImageOrientation {
  Landscape,
  Portrait,
}

export default class Image extends FirebaseModel {
  src: string;
  alt: string;
  orientation?: ImageOrientation;

  constructor(id: string, fromServer: boolean, src: string, alt: string) {
    super(id, fromServer);
    this.src = src;
    this.alt = alt;
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
        image.orientation = ImageOrientation[orientation];
        return image;
      },
    };
  }
}
