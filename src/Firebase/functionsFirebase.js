import { collection, getDocs, query, doc, getDoc, addDoc, deleteDoc, updateDoc, setDoc, where } from "firebase/firestore";
import { db } from './firebase.config';

/*Creando coleccion de tablas*/
export const createColectionTable = async (obj) => {
  addDoc(collection(db, 'tables', { obj }))
}
