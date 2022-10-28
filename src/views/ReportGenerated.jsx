import React, { useEffect, useState } from "react";
import "../assets/styles/ReportGenerated.css";
import ButtonApp from "../components/ButtonApp";
import { Icon } from "@iconify/react";
import { db } from "../Firebase/firebase.config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

const ReportGenerated = () => {
  const [table, setTable] = useState([]);

  const data = [
    ["", "Tesla", "Nissan", "Toyota", "Honda", "Mazda", "Ford"],
    ["2017", 10, 11, 12, 13, 15, 16],
    ["2018", 10, 11, 12, 13, 15, 16],
    ["2019", 10, 11, 12, 13, 15, 16],
    ["2020", 10, 11, 12, 13, 15, 16],
    ["2021", 10, 11, 12, 13, 15, 16],
  ];

  const getLastDocumentOfTheCollection = async () => {
    const q = query(
      collection(db, "tables"),
      limit(1),
      orderBy("fecha", "desc")
    );
    const lastDocument = await getDocs(q);
    lastDocument.forEach((doc) => {
      console.log("data", doc.data());
    });
  };

  useEffect(() => {
    getLastDocumentOfTheCollection();
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
