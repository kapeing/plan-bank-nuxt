import firebase from "firebase/app"
import "firebase/database"

if (!firebase.apps.length) {
 firebase.initializeApp({
    apiKey: "AIzaSyD0rKhjQp95uV2OG9oq0ZZXKIk-ILZig7g",
    authDomain: "kape-plan-bank.firebaseapp.com",
    databaseURL: "https://kape-plan-bank-default-rtdb.firebaseio.com",
    projectId: "kape-plan-bank",
    storageBucket: "kape-plan-bank.appspot.com",
    messagingSenderId: "294438003560",
    appId: "1:294438003560:web:6a36f07b7b01c2cdebacdd",
    measurementId: "G-X4MH5QZS34"
 })
}

export default firebase