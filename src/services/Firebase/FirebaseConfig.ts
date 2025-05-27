// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2kzaIlruQPl-SXfZFviETE35ULaKhMj8",
  authDomain: "moodj-1c7f4.firebaseapp.com",
  projectId: "moodj-1c7f4",
  storageBucket: "moodj-1c7f4.firebasestorage.app",
  messagingSenderId: "703129625739",
  appId: "1:703129625739:web:34561d85d819e937cd608e",
  measurementId: "G-1QCYVZGRW1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {db, auth};