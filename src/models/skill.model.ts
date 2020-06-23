import FirebaseModel from 'models/firebase.model';

export enum SkillArea {
  Frontend,
  Backend,
}

export default class Skill extends FirebaseModel {
  public name: string;
  public area: SkillArea;

  constructor(
    id: string = '',
    fromServer: boolean = false,
    name: string = '',
    area: SkillArea = SkillArea.Frontend
  ) {
    super(id, fromServer);
    this.name = name;
    this.area = area;
  }
}
