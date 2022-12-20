import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getLastDocumentOfTheCollection } from "../Firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table.jsx";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ButtonApp from "../components/ButtonApp";
import "../assets/styles/ReportGenerated.css";
import { getCollectionDataForTheTable } from "../Functions/functions";

const ReportGenerated = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const reportGenerated = getCollectionDataForTheTable(data);
  console.log(reportGenerated);

  const saveReport = async () => {
    console.log("diste click a guardar");
  };

  useEffect(() => {
    getLastDocumentOfTheCollection(setData);
  }, []);

  return (
    <div className="container-ReportGenerated">
      <Table table={reportGenerated} id={"table-to-xls"} />
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
        <ReactHTMLTableToExcel
          id="table-xls-button"
          className="generateReport"
          table="table-to-xls"
          filename="table"
          sheet="report"
          buttonText="⇯ Exportar"
        />
      </div>
    </div>
  );
};

export default ReportGenerated;
