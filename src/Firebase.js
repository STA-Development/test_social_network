// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDaXXPoU-0f0zA_-Ijz4nP0sYePKw83dVk",
    authDomain: "testproject-258d3.firebaseapp.com",
    projectId: "testproject-258d3",
    storageBucket: "testproject-258d3.appspot.com",
    messagingSenderId: "148173250799",
    appId: "1:148173250799:web:a2ee43af87d04d6e3d7b1a",
    measurementId: "G-BY04CQXY0E"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app)
export default auth