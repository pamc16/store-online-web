// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXvB8_e4QHQSZOF6dKYGvUA-sEuucRE1s",
  authDomain: "store-online-web.firebaseapp.com",
  projectId: "store-online-web",
  storageBucket: "store-online-web.appspot.com",
  messagingSenderId: "1053130895882",
  appId: "1:1053130895882:web:718350785e75b24f2f25f3",
  measurementId: "G-T6E58RGYDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage: any = getStorage(app);
export {app, db, storage, analytics };