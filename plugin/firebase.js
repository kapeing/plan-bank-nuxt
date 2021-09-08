// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0rKhjQp95uV2OG9oq0ZZXKIk-ILZig7g",
  authDomain: "kape-plan-bank.firebaseapp.com",
  databaseURL: "https://kape-plan-bank-default-rtdb.firebaseio.com",
  projectId: "kape-plan-bank",
  storageBucket: "kape-plan-bank.appspot.com",
  messagingSenderId: "294438003560",
  appId: "1:294438003560:web:6a36f07b7b01c2cdebacdd",
  measurementId: "G-X4MH5QZS34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);