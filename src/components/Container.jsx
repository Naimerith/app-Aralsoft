import React, { useState } from "react";
import "../assets/styles/Container.css";
import { ReactSortable } from "react-sortablejs";
import ButtonApp from "./ButtonApp";
import { getData } from "../services/api_aralsoft";

const Container = () => {
  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);

  let ArrayOfSelectedButtons = [];
  let apiConsultation = {};

  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      ArrayOfSelectedButtons.push(button.textContent);
    }
    return ArrayOfSelectedButtons;
  };
  const generateReport = async () => {
    const resApi = await getData();
    const consultApiSelectionRow = resApi.map((el) => {
      const convertObjectToArray = Object.entries(el);
      return convertObjectToArray.filter((key) =>
        key.includes(ArrayOfSelectedButtons[0])
      );
    });
    const consultApiSelectionColumn = resApi.map((el) => {
      const convertObjectToArray = Object.entries(el);
      return convertObjectToArray.filter((key) =>
        key.includes(ArrayOfSelectedButtons[1])
      );
    });
    const consultApiSelectionValues = resApi.map((el) => {
      const convertObjectToArray = Object.entries(el);
      return convertObjectToArray.filter((key) =>
        key.includes(ArrayOfSelectedButtons[2])
      );
    });
    return (apiConsultation = {
      filas: consultApiSelectionRow,
      columnas: consultApiSelectionColumn,
      valores: consultApiSelectionValues,
    });
  };

  /*Asi voy a impirmir en la tabla los valores-----Esto es un ejemplo, practicando */
  const prueba = async () => {
    const hola = await generateReport();
    hola.filas.map((el) => {
      el.map((h) => {
        console.log(h[1]);
      });
    });
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
          <ButtonApp name="Generar Reporte" onClick={prueba} />
        </section>
      </div>
    </div>
  );
};

export default Container;
