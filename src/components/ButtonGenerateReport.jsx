import React from "react";
import axios from "axios";

const ButtonGenerateReport = ({ click }) => {
  return (
    <div className="container">
      <button className="generateReport" onClick={click}>
        {/* <a href={"/report-generated"}> */}
        Generar <br /> Reporte
        {/* </a> */}
      </button>
    </div>
  );
};

export default ButtonGenerateReport;
