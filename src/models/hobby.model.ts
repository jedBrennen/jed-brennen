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
}
