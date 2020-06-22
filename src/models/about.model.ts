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
}
