import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBbhFLGcAzcMUNRUY3DqGq4e79-x1MyQd8",
  authDomain: "admin-dashboard-43c2b.firebaseapp.com",
  projectId: "admin-dashboard-43c2b",
  storageBucket: "admin-dashboard-43c2b.appspot.com",
  messagingSenderId: "852196037005",
  appId: "1:852196037005:web:84f56c30aef24b9c7eadc4",
  measurementId: "G-G41SB35E14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };