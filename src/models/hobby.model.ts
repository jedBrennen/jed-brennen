import FirebaseModel from 'models/firebase.model';

export default class Hobby extends FirebaseModel {
  public title: string;
  public description: string;
  public iconName: string;

  constructor(
    id: string = '',
    fromServer: boolean = false,
    title: string = '',
    description: string = '',
    iconName: string = ''
  ) {
    super(id, fromServer);
    this.title = title;
    this.description = description;
    this.iconName = iconName;
  }
}
