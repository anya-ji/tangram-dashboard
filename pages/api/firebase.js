// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

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
const storage = firebase.storage();

export const getAnnotations = (tangramName) => {
  console.log("getAnnotations");
  return db.collection("annotations").doc(tangramName).get();
};

export const getUser = (workerId) => {
  console.log("getUser");
  return db.collection("users").doc(workerId).get();
};

export const getCounts = () => {
  console.log("getCounts");
  return db.collection("counts").doc("counts").get();
};

// export const downloadImage = (path) => {
//   var storageRef = storage.ref(path);
//   storageRef
//     .child("images/stars.jpg")
//     .getDownloadURL()
//     .then((url) => {
//       // `url` is the download URL for 'images/stars.jpg'

//       // This can be downloaded directly:
//       var xhr = new XMLHttpRequest();
//       xhr.responseType = "blob";
//       xhr.onload = (event) => {
//         var blob = xhr.response;
//       };
//       xhr.open("GET", url);
//       xhr.send();

//       // Or inserted into an <img> element
//       var img = document.getElementById("myimg");
//       img.setAttribute("src", url);
//     })
//     .catch((error) => {
//       // Handle any errors
//     });
// };
