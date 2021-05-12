import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyAOKMwWlkl4D76MqrxQMS6oX3iBLYXqgx0",
  authDomain: "iti-community.firebaseapp.com",
  projectId: "iti-community",
  storageBucket: "iti-community.appspot.com",
  messagingSenderId: "1064017044667",
  appId: "1:1064017044667:web:a74502a8a862a636f7b59e",
  measurementId: "G-W19PQM0CXR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const upload = firebase.storage();
export const db = firebase.firestore();
export const auth = firebase.auth();
