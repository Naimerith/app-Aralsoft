
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';



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



export const addCollectionResult = async (key, value) => {
  return await addDoc(collection(db, "tables"), {
    report: key,
    fecha: Date.now(),
    consultApi: value,
    usuario: "",
    estatus: 'Reporte generado'
  });
}

/*export const getLastDocumentOfTheCollection = async (state) => {
  const querySnapshot = await getDocs(collection(db, "tables"));
  querySnapshot.forEach((doc) => {
    state(doc.data());
  });
};*/

