// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA7Z7CgmKVLHQQ2Hi5566VKDTICreTZ3w",
  authDomain: "trentdb-c5666.firebaseapp.com",
  databaseURL: "https://trentdb-c5666-default-rtdb.firebaseio.com",
  projectId: "trentdb-c5666",
  storageBucket: "trentdb-c5666.firebasestorage.app",
  messagingSenderId: "458510671023",
  appId: "1:458510671023:web:4da690c45919d9ad9d085a"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { db };
