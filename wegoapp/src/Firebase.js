import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBjcLABixXc6-hGUgGhhAEI4v0GxX3fh_g",
    authDomain: "we-go-8c3cf.firebaseapp.com",
    databaseURL: "https://we-go-8c3cf.firebaseio.com",
    projectId: "we-go-8c3cf",
    storageBucket: "we-go-8c3cf.appspot.com",
    messagingSenderId: "623016033917",
    appId: "1:623016033917:web:8113b6518f8bac9a"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;