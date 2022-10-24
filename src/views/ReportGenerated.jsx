import React, { useEffect, useState } from "react";
import "../assets/styles/ReportGenerated.css";
import ButtonApp from "../components/ButtonApp";
import { Icon } from "@iconify/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase.config";

const ReportGenerated = () => {
  const [midatos, setMisDatos] = useState([]);
  console.log(midatos);

  const nai = async () => {
    const querySnapshot = await getDocs(collection(db, "tables"));
    querySnapshot.forEach((doc) => {
      setMisDatos(doc.data());
    });
  };

  useEffect(() => {
    nai();
  }, []);

  return (
    <div className="container-ReportGenerated">
      <p className="successMsg">Su reporte fue generado satisfactoriamente!</p>
      <div className="table">
        <table>
          <tr>
            <td>
              <strong>Filas</strong>
            </td>
          </tr>
          {!midatos.filas
            ? "Cargando..."
            : midatos.filas.map((el, index) => (
                <tr>
                  <td key={index}>{el}</td>
                </tr>
              ))}
        </table>
        <table>
          <tr>
            <td>
              <strong>Columnas</strong>
            </td>
          </tr>
          {!midatos.columnas
            ? "Cargando..."
            : midatos.columnas.map((el, index) => (
                <tr>
                  <td key={index}>{el}</td>
                </tr>
              ))}
        </table>
        <table>
          <tr>
            <td>
              <strong>Valores</strong>
            </td>
          </tr>
          {!midatos.valores
            ? "Cargando..."
            : midatos.valores.map((el, index) => (
                <tr>
                  <td key={index}>{el}</td>
                </tr>
              ))}
        </table>
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
