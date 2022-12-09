
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, limit, getDoc } from 'firebase/firestore';

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
export const collectionRef = collection(db, "tables");
export const colRef = collection(db, "Report");


export const addCollectionResult = async (id, nameRow1, nameRow2, nameCol, nameVal, filterRow1, filterRow2) => {
  return await addDoc(colRef, {
    idReport: id,
    nombreReport: `Reporte de ${nameRow1} y ${nameRow2}`,
    filas: {
      fila1: {
        campo: nameRow1,
        filtro: filterRow1,
      },
      fila2: {
        campo: nameRow2,
        filtro: filterRow2
      }
    },
    columnas: {
      columna1: {
        campo: nameCol,
        filtro: [],
      }
    },
    valores: {
      valor1: {
        campo: nameVal
      }
    }
  });
}

export const getLastDocumentOfTheCollection = async (state) => {
  const q = query(
    collectionRef,
    limit(1),
    orderBy("fecha", "desc")
  );
  const lastDocument = await getDocs(q);
  lastDocument.forEach((doc) => {
    return state(doc.data().consultApi);
  });
};

export const getCollectionTables = async (state) => {
  const tables = [];
  const q = query(collectionRef, orderBy("fecha", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const newDate = new Date(doc.data().fecha);
    const converteDate = newDate.toLocaleString();
    tables.push({
      ...doc.data(),
      id: doc.id,
      fecha: converteDate,
    });
    return state(tables);
  });
};

export const deleteReportFb = async (id) => {
  await deleteDoc(doc(collectionRef, id));
}

export const getReport = async (id) => {
  const result = await getDoc(doc(collectionRef, id));
  return result.data();
}

