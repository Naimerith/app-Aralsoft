import React from "react";
import "../assets/styles/Table.css";

const Table = ({ table, id }) => {
  return (
    <div className="table-wrapper">
      <table className="containerTable" id={id}>
        <thead>
          <tr>
            {table.columnas.map((columns, i) => (
              <td key={i}>{columns}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.data.map((rows, i) => (
            <tr key={i}>
              {[...rows].map(
                (values, i) =>
                  values === undefined ? (
                    <td key={i}>0</td>
                  ) : (
                    <td key={i}>{values}</td>
                  )

                /*<td key={i}>{values}</td>*/
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
