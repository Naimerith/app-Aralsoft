import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import {
  consultValuesInTheApi,
  getArrObject,
  getTheValueOfSelectedButton,
} from "../Functions/functions";
import { useNavigate } from "react-router-dom";
import { addCollectionResult } from "../Firebase/firebase.config";
import ButtonApp from "./ButtonApp";
import "../assets/styles/Container.css";
import { alertSuccess } from "../Functions/sweetAlert";

const Container = () => {
  let ArrayOfSelectedButtons = [];
  const arrayRow = [];
  const arrayColumn = [];
  const arrayValue = [];
  const navigate = useNavigate();
  const [disabledBtn, setDisableBtn] = useState(false);
  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);

  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      ArrayOfSelectedButtons.push(button.textContent);
    }
    return ArrayOfSelectedButtons;
  };

  const consultValues = async () => {
    const consultApiSelectionRow = await consultValuesInTheApi(
      ArrayOfSelectedButtons[0]
    );
    getTheValueOfSelectedButton(consultApiSelectionRow, arrayRow);
    const consultApiSelectionColumn = await consultValuesInTheApi(
      ArrayOfSelectedButtons[1]
    );
    getTheValueOfSelectedButton(consultApiSelectionColumn, arrayColumn);
    const consultApiSelectionValues = await consultValuesInTheApi(
      ArrayOfSelectedButtons[2]
    );
    getTheValueOfSelectedButton(consultApiSelectionValues, arrayValue);
    return getArrObject(arrayRow, arrayColumn, arrayValue);
  };

  const generateReport = async () => {
    if (disabledBtn) {
      return;
    }
    setDisableBtn(true);
    const objArray = await consultValues();
    const resultObjArray = [];
    objArray.forEach((el) => {
      const objectIndex = resultObjArray.findIndex(
        (obj) => obj.filas === el.filas && obj.columnas === el.columnas
      );
      if (objectIndex === -1) {
        resultObjArray.push(el);
      } else {
        resultObjArray[objectIndex].valores += el.valores;
      }
    });
    addCollectionResult(ArrayOfSelectedButtons, resultObjArray);
    alertSuccess("Reporte Generado satisfactoriamente");
    navigate("/report-generated");
  };

  const btnToSelectOptions = () => {
    console.log("aqui muestra el select de opciones");
  };

  return (
    <div className="bottomContainer">
      <section className="itemsSelected">
        <div className="containerVertical">
          <div className="containerR">
            Filas
            <ReactSortable
              list={row}
              setList={setRow}
              group={{ name: "selectedButton", pull: true }}
            >
              {!row
                ? "Cargando..."
                : row.map((item, index) => (
                    <button
                      className="btnSelect"
                      key={index}
                      ref={(button) => addToArrayOfSelectedButtons(button)}
                      onClick={btnToSelectOptions}
                    >
                      {item}
                    </button>
                  ))}
            </ReactSortable>
          </div>
        </div>
        <article className="container_col_val">
          <div className="containerHorizontal">
            <div className="containerR">
              Columnas
              <ReactSortable
                list={column}
                setList={setColumn}
                group={{ name: "selectedButton", pull: true }}
              >
                {!column
                  ? "Cargando..."
                  : column.map((item, index) => (
                      <button
                        className="btnSelect"
                        key={index}
                        ref={(button) => addToArrayOfSelectedButtons(button)}
                        onClick={btnToSelectOptions}
                      >
                        {item}
                      </button>
                    ))}
              </ReactSortable>
            </div>
          </div>
          <div className="containerHorizontal">
            <div className="containerR">
              Valores
              <ReactSortable
                list={values}
                setList={setValues}
                group={{ name: "selectedButton", pull: true }}
              >
                {!values
                  ? "Cargando..."
                  : values.map((item, index) => (
                      <button
                        className="btnSelect"
                        key={index}
                        ref={(button) => addToArrayOfSelectedButtons(button)}
                      >
                        {item}
                      </button>
                    ))}
              </ReactSortable>
            </div>
          </div>
        </article>
      </section>
      <section>
        <ButtonApp name="Generar Reporte" onClick={generateReport} />
      </section>
    </div>
  );
};
export default Container;
