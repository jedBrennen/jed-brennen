import FirebaseModel from 'models/firebase.model';

export enum SkillArea {
  Frontend,
  Backend,
  Mixed,
}

export default class Skill extends FirebaseModel {
  public name: string;
  public area: SkillArea;
  public logo: string;

  constructor(
    id: string = '',
    fromServer: boolean = false,
    name: string = '',
    area: SkillArea = SkillArea.Frontend,
    logo: string = ''
  ) {
    super(id, fromServer);
    this.name = name;
    this.area = area;
    this.logo = logo;
  }
}
