
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


export const addFilteredResultsToTheCollection = async (id, nameRow1, nameRow2, nameCol, nameVal, filterRow1, filterRow2, filterCol) => {
  return await addDoc(colRef, {
    idReport: id,
    fechaReport: Date.now(),
    nombreReport: nameRow2 === "" ? `Reporte de ${nameRow1}` : `Reporte de ${nameRow1} y ${nameRow2}`,
    filas: {
      fila1: {
        campo: nameRow1,
        filtro: filterRow1,
      },
      fila2: {
        campo: nameRow2,
        filtro: filterRow2
      },
      fila3: {
        campo: "",
        filtro: []
      },
      fila4: {
        campo: "",
        filtro: []
      },
      fila5: {
        campo: "",
        filtro: []
      }
    },
    columnas: {
      columna1: {
        campo: nameCol,
        filtro: filterCol,
      }
    },
    valores: {
      valor1: {
        filtro: nameVal
      }
    }
  });
}


export const getLastDocumentOfTheCollection = async (state) => {
  const q = query(
    colRef,
    limit(1),
    orderBy("fechaReport", "desc")
  );
  const lastDocument = await getDocs(q);
  lastDocument.forEach((doc) => {
    return state(doc.data());
  });
};



export const getCollectionTables = async (state) => {
  const tables = [];
  const q = query(colRef, orderBy("fechaReport", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const newDate = new Date(doc.data().fechaReport);
    const converteDate = newDate.toLocaleString();
    tables.push({
      ...doc.data(),
      id: doc.id,
      fechaReport: converteDate,
    });
    return state(tables);
  });
};

export const deleteReportFb = async (id) => {
  await deleteDoc(doc(colRef, id));
}

export const getReport = async (id) => {
  const result = await getDoc(doc(collectionRef, id));
  return result.data();
}

