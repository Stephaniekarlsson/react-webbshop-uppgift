import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDqHsL2mNdYC1qoN-bVYG6Dnf1BavzWrVI",
  authDomain: "sunbuddy-webbshop.firebaseapp.com",
  projectId: "sunbuddy-webbshop",
  storageBucket: "sunbuddy-webbshop.appspot.com",
  messagingSenderId: "558959241962",
  appId: "1:558959241962:web:03534448fa8e349a898593",
  measurementId: "G-9WCH0HGTVJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };