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

  public static get converter(): firebase.firestore.FirestoreDataConverter<
    Skill
  > {
    return {
      toFirestore: FirebaseModel.toFirestore,
      fromFirestore: (
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
      ): Skill => {
        const skill = FirebaseModel.fromFirestore<Skill>(snapshot, options);
        const skillArea = (skill.area as any) as keyof typeof SkillArea;
        return new Skill(
          skill.id,
          skill.fromServer,
          skill.name,
          SkillArea[skillArea],
          skill.logo
        );
      },
    };
  }

  public compareTo(other: Skill, desc?: boolean): number {
    let result = 0;
    if (this.name < other.name) result = -1;
    if (this.name > other.name) result = 1;
    return (result *= desc ? -1 : 1);
  }
}
