import React, { useEffect, useState } from "react";
import "../assets/styles/ReportGenerated.css";
import ButtonApp from "../components/ButtonApp";
import { Icon } from "@iconify/react";
import { db } from "../Firebase/firebase.config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Table from "../components/Table.jsx";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ReportGenerated = () => {
  const [data, setData] = useState([]);

  const getLastDocumentOfTheCollection = async () => {
    const q = query(
      collection(db, "tables"),
      limit(1),
      orderBy("fecha", "desc")
    );
    const lastDocument = await getDocs(q);
    lastDocument.forEach((doc) => {
      const dat = doc.data().consultApi;
      setData(dat);
    });
  };

  const addValuesToTheTable = data.reduce(
    (acc, data) => {
      if (!acc.filas.includes(data.filas)) {
        acc.filas.push(data.filas);
      }
      if (!acc.columnas.includes(data.columnas)) {
        acc.columnas.push(data.columnas);
      }

      const idxFila = acc.filas.indexOf(data.filas);
      const idxColumna = acc.columnas.indexOf(data.columnas);

      acc.data[idxFila] = acc.data[idxFila] || [data.filas];
      acc.data[idxFila][idxColumna] = data.valores;
      return acc;
    },
    {
      filas: [null],
      columnas: [null],
      data: [],
    }
  );

  useEffect(() => {
    getLastDocumentOfTheCollection();
  }, []);

  return (
    <div className="container-ReportGenerated">
      <p className="successMsg">Su reporte fue generado satisfactoriamente!</p>
      <Table table={addValuesToTheTable} id={"table-to-xls"} />
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
        <ReactHTMLTableToExcel
          id="table-xls-button"
          className="generateReport"
          table="table-to-xls"
          filename="table"
          sheet="report"
          buttonText="Exportar"
        />
      </div>
    </div>
  );
};

export default ReportGenerated;
