import React, { useEffect, useState } from "react";
import "../assets/styles/ReportGenerated.css";
import ButtonApp from "../components/ButtonApp";
import { Icon } from "@iconify/react";
//import { collection, getDocs } from "firebase/firestore";
//import { db } from "../Firebase/firebase.config";

const ReportGenerated = () => {
  //const [table, setTable] = useState([]);

  /*const getCollection = async () => {
    const querySnapshot = await getDocs(collection(db, "tables"));
    querySnapshot.forEach((doc) => {
      setTable(doc.data());
    });
  };*/

  useEffect(() => {
    // getCollection();
  }, []);

  return (
    <div className="container-ReportGenerated">
      <p className="successMsg">Su reporte fue generado satisfactoriamente!</p>
      <div className="table">
        {/* <table>
          <th>vacio</th>
          {!table.columnas
            ? "Cargando..."
            : table.columnas.map((el, index) => (
                <td>
                  <th key={index}>{el}</th>
                </td>
              ))}
          {!table.filas
            ? "Cargando..."
            : table.filas.map((el, index) => (
                <tr>
                  <td key={index}>{el}</td>
                </tr>
              ))}
        </table> */}
      </div>
      <div className="containerBtns">
        <ButtonApp
          icon={
            <Icon
              icon="fluent:document-save-24-filled"
              width="20"
              height="20"
            />
          }
          name="Guardar"
        />
        <ButtonApp
          icon={<Icon icon="fa6-solid:download" width="20" height="20" />}
          name="Exportar"
        />
      </div>
    </div>
  );
};

export default ReportGenerated;
