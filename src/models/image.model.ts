import FirebaseModel from 'models/firebase.model';

export default class Image extends FirebaseModel {
  src: string;
  alt: string;

  constructor(id: string, fromServer: boolean, src: string, alt: string) {
    super(id, fromServer);
    this.src = src;
    this.alt = alt;
  }
}
