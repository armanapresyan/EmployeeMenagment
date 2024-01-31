// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2FY6tyIvHn5RZXrdUFLKhZbaN85zQ3lI",
  authDomain: "crudapp-484bf.firebaseapp.com",
  projectId: "crudapp-484bf",
  storageBucket: "crudapp-484bf.appspot.com",
  messagingSenderId: "386459793259",
  appId: "1:386459793259:web:e726834a8d446fd30ebe2e",
  measurementId: "G-C8VBWF27GY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app, db}; 