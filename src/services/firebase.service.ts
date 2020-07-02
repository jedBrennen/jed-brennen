import firebase from 'firebase/app';
import 'firebase/firestore';
import React from 'react';

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

export default class FirebaseService {
  public db: firebase.firestore.Firestore;
  private static instance: FirebaseService;

  private constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }

    return FirebaseService.instance;
  }
}

export const FirebaseContext = React.createContext<FirebaseService>(
  FirebaseService.getInstance()
);
