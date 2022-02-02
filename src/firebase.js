import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAIrNy3GYrY4Qsze5a9CAc9p3-ajGnvw7U",
    authDomain: "malof-9cf67.firebaseapp.com",
    projectId: "malof-9cf67",
    storageBucket: "malof-9cf67.appspot.com",
    messagingSenderId: "326175489785",
    appId: "1:326175489785:web:1a2b447ce671fdd474ac28",
    measurementId: "G-82DD8JS5F4"
};
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}