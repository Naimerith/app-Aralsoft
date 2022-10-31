import React from "react";
import "../assets/styles/Table.css";

const Table = ({ table, id }) => {
  return (
    <div className="table-wrapper">
      <table className="containerTable" id={id}>
        <thead>
          {/*Creamos la fila de las columnas con sus valores*/}
          <tr>
            {table.columnas.map((columns, i) => (
              <td key={i}>{columns}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {/*Creamos la tabla con cada una de sus filas y sus valores */}
          {table.data.map((rows, i) => (
            <tr key={i}>
              {[...rows].map((values, i) => (
                <td key={i}>{values}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
