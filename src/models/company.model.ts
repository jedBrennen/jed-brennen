import { FirebaseModel } from './firebase.model';

export interface Company extends FirebaseModel {
  name: string;
  shortDescription: string;
  longDescription: string;
  roles: Role[];
}

export interface Role extends FirebaseModel {
  title: string;
  startDate: Date;
  endDate?: Date;
}
