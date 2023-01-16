import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCJWEkHWzPpSNmY5dvM0NjO9fy0vFNZeOQ",
    authDomain: "netflix-12e64.firebaseapp.com",
    projectId: "netflix-12e64",
    storageBucket: "netflix-12e64.appspot.com",
    messagingSenderId: "558003325633",
    appId: "1:558003325633:web:a9f217e950874820716240",
    measurementId: "G-CCQKP6C3YG"
};

firebase.initializeApp(firebaseConfig)
const storage = getStorage();
export default storage