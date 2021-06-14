// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtA80oiB88EioWzjT7oG-RtU2A_kk-dQc",
  authDomain: "tangram-online.firebaseapp.com",
  projectId: "tangram-online",
  storageBucket: "tangram-online.appspot.com",
  messagingSenderId: "1008956182366",
  appId: "1:1008956182366:web:c3047aabf02d1b72c3c9cf",
};

var firebaseApp = null;
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app(); // if already initialized, use that one
}

const db = firebaseApp.firestore();

export const getAnnotations = (tangramName) => {
  console.log("getAnnotations");
  return db.collection("annotations").doc(tangramName).get();
};

export const getAllFiles = () => {
  console.log("getAllFiles");
  return db.collection("files").get();
};
