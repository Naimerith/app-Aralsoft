import React, { useState } from "react";
import "../assets/styles/Container.css";
import { ReactSortable } from "react-sortablejs";
import ButtonApp from "./ButtonApp";
import { consultValuesInTheApi, getArrObject } from "../Functions/functions";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const Container = () => {
  let ArrayOfSelectedButtons = [];
  const arrayRow = [];
  const arrayColumn = [];
  const arrayValue = [];
  const navigate = useNavigate();
  const date = Date.now();
  const newDate = new Date(date);
  const converteDate = newDate.toLocaleString();
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
    consultApiSelectionRow.map((el) => {
      return el.map((h) => {
        const arrayFinal = h[1];
        return arrayRow.push(arrayFinal);
      });
    });

    const consultApiSelectionColumn = await consultValuesInTheApi(
      ArrayOfSelectedButtons[1]
    );
    consultApiSelectionColumn.map((el) => {
      return el.map((h) => {
        const arrayFinal = h[1];
        return arrayColumn.push(arrayFinal);
      });
    });
    const consultApiSelectionValues = await consultValuesInTheApi(
      ArrayOfSelectedButtons[2]
    );
    consultApiSelectionValues.map((el) => {
      return el.map((h) => {
        const arrayFinal = h[1];
        return arrayValue.push(arrayFinal);
      });
    });

    //console.log("aquiii", getArrObject(arrayRow, arrayColumn, arrayValue));
    return getArrObject(arrayRow, arrayColumn, arrayValue);
  };

  const addResultMatches = async () => {
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
    await addDoc(collection(db, "tables"), {
      fecha: converteDate,
      consultApi: resultObjArray,
      usuario: "",
    });

    console.log("prueba correcta", resultObjArray);
  };

  const generateReport = async () => {
    console.log("click a generar reporte");
    addResultMatches();
    navigate("/report-generated");
  };

  return (
    <div>
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
    </div>
  );
};

export default Container;
