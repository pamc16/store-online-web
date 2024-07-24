// import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { StorageReference, getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBXvB8_e4QHQSZOF6dKYGvUA-sEuucRE1s',
	appId: '1:1053130895882:web:718350785e75b24f2f25f3',
	authDomain: 'store-online-web.firebaseapp.com',
	measurementId: 'G-T6E58RGYDQ',
	messagingSenderId: '1053130895882',
	projectId: 'store-online-web',
	storageBucket: 'store-online-web.appspot.com',
};

// initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const store = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);

export { analytics, app, auth, database, storage, store };
