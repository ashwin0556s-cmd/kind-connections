import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXoSiH6J4Ab1nM1--6GPFWopJm-7YSeiA",
  authDomain: "know-your-hub-cf258.firebaseapp.com",
  databaseURL: "https://know-your-hub-cf258-default-rtdb.firebaseio.com",
  projectId: "know-your-hub-cf258",
  storageBucket: "know-your-hub-cf258.firebasestorage.app",
  messagingSenderId: "770803817246",
  appId: "1:770803817246:web:f1818eab77cfc6a787070f",
  measurementId: "G-NN8J8F72KG",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
