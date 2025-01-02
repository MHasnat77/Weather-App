// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY9lOYui4XSFLIVB1aViSZ4XfjNuFH4Mo",
  authDomain: "event-react-app-d3da6.firebaseapp.com",
  projectId: "event-react-app-d3da6",
  storageBucket: "event-react-app-d3da6.firebasestorage.app",
  messagingSenderId: "615953011724",
  appId: "1:615953011724:web:f25a822c1a4985945c4a29",
  measurementId: "G-DS64W0BM5V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };
