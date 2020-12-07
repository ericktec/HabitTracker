import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBsfOthOqglJ2ZESPt8tiZ4CntkuyOu470",
  authDomain: "habittracker-24367.firebaseapp.com",
  projectId: "habittracker-24367",
  storageBucket: "habittracker-24367.appspot.com",
  messagingSenderId: "537529296068",
  appId: "1:537529296068:web:4261740ef6bbd3d59d1591"
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();



export const auth = fb.auth();

