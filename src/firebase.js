// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtk2QVaZ30wDOH4fOCe-YoX94IhnWcOak",
  authDomain: "webchat-f7aa6.firebaseapp.com",
  projectId: "webchat-f7aa6",
  storageBucket: "webchat-f7aa6.appspot.com",
  messagingSenderId: "722537386006",
  appId: "1:722537386006:web:779244c17520aa36cfe537",
  measurementId: "G-6X7TLN5WH8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
