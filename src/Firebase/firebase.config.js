
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';
import {
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, setDoc, getDoc
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);