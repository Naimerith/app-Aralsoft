import React from "react";
import Report from "../components/Report";
import ButtonApp from "../components/ButtonApp";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "../assets/styles/ReportGenerated.css";

const GeneratedReport = () => {
  const navigate = useNavigate();
  const saveReport = async () => {
    console.log("diste click a guardar");
  };

  return (
    <div className="container-ReportGenerated">
      <Report />
      <div className="containerBtns">
        <ButtonApp
          icon={
            <Icon icon="fluent:form-new-20-regular" width="23" height="23" />
          }
          name="Nuevo Reporte"
          onClick={() => navigate("/new-report")}
        />
        <ButtonApp
          icon={
            <Icon
              icon="fluent:document-save-24-filled"
              width="20"
              height="20"
            />
          }
          name="Guardar"
          onClick={() => saveReport()}
        />
        {/* <ReactHTMLTableToExcel
          id="table-xls-button"
          className="generateReport"
          table="table-to-xls"
          filename="table"
          sheet="report"
          buttonText="⇯ Exportar"
        /> */}
      </div>
    </div>
  );
};

export default GeneratedReport;
