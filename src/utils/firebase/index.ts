import * as firebase from 'firebase';
import 'firebase/firestore';

let isInitialized = false;
const initializeFirebase = (): void => {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
  });
  isInitialized = true;
}

export const getDB = (): firebase.firestore.Firestore => {
  if (!isInitialized) {
    initializeFirebase()
  }

  const firestore = firebase.firestore();
  firestore.settings({
    timestampsInSnapshots: true
  });

  return firestore;
}