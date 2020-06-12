import * as firebase from 'firebase';
import { FirebaseModel } from 'models/firebase.model';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const mapFirebaseData = <T extends FirebaseModel>(
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): T => ({ id: doc.id, ...doc.data() } as T);

export default firebase;
