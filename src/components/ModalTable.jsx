import React from "react";

const ModalTable = ({ table }) => {
  return (
    <div className="table-wrapper">
      <table className="containerTable">
        <thead>
          <tr>
            {table.columnas.map((columns, i) =>
              columns === "" ? <td key={i}></td> : <td key={i}>{columns}</td>
            )}
          </tr>
        </thead>
        <tbody>
          {table.data.map((rows, i) => (
            <tr key={i}>
              {[...rows].map((values, i) =>
                values === "" ? <td key={i}></td> : <td key={i}>{values}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModalTable;
