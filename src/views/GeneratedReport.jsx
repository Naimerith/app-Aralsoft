import React, { useState, useEffect } from "react";
import { getLastDocumentOfTheCollection } from "../Firebase/firebase.config";

const GeneratedReport = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getLastDocumentOfTheCollection(setData);
  }, []);
  return (
    <div className="container-ReportGenerated">
      <div className="table-wrapper">
        <h5>Reporte: " "</h5>
        <table className="containerTable">
          <thead>
            <tr>
              {/* <th>{data?.filas?.fila1?.campo}</th> */}
              {/* <th>{data?.filas?.fila2?.campo}</th>
              {data?.columnas?.columna1?.data.map((columns, i) =>
                columns === "" ? <th key={i}></th> : <th key={i}>{columns}</th>
              )} */}
            </tr>
          </thead>
          <tbody>
            {/* {data?.filas?.fila1?.data.map((rows, i) => (
              <tr key={i}>
                <td>{rows}</td>
                <td>{data?.filas?.fila2?.data[i]}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneratedReport;
