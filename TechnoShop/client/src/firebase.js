import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
