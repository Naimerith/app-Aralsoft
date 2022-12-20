import React, { useState, useEffect } from "react";
import { getLastDocumentOfTheCollection } from "../Firebase/firebase.config";

const GeneratedReport = () => {
  const [data, setData] = useState([]);

  console.log(data, "data");

  useEffect(() => {
    getLastDocumentOfTheCollection(setData);
  }, []);
  return (
    <div className="container-ReportGenerated">
      <div className="table-wrapper">
        <table className="containerTable">
          <thead>
            <tr>
              {/* {data.columnas.columna1.data.map((columns, i) =>
                columns === "" ? <td key={i}></td> : <td key={i}>{columns}</td>
              )} */}
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneratedReport;
