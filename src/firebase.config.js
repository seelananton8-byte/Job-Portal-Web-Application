// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyArph7uxHCk6RR9LrCIuafvFAk9tQTWK6g",
  authDomain: "online-job-portal-55417.firebaseapp.com",
  projectId: "online-job-portal-55417",
  storageBucket: "online-job-portal-55417.firebasestorage.app",
  messagingSenderId: "811807237970",
  appId: "1:811807237970:web:fb1ebb096cf0006f85bc8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};