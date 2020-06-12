import { FirebaseModel } from './firebase.model';

export interface Project extends FirebaseModel {
  title: string;
  technology: string[];
  shortDescription: string;
  longDescription: string;
  images: string[];
}
