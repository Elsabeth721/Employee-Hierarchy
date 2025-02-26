import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDv7cv2KfBF9zPZNmV6_nktiyBLb_AR_mk",
  authDomain: "perago-employee-hierarchy.firebaseapp.com",
  projectId: "perago-employee-hierarchy",
  storageBucket: "perago-employee-hierarchy.firebasestorage.app",
  messagingSenderId: "391006563234",
  appId: "1:391006563234:web:1316e76ee6c593fc1e20fb",
  measurementId: "G-36KJ0C7E3F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// let analytics;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

export { app, auth, db};
