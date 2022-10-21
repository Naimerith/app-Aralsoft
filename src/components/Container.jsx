import React, { useEffect, useState } from "react";
import "../assets/styles/Container.css";
import { ReactSortable } from "react-sortablejs";
import ButtonApp from "./ButtonApp";

const Container = () => {
  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);

  let ArrayOfSelectedButtons = [];
  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      ArrayOfSelectedButtons.push(button.textContent);
      //console.log(" array ", ArrayOfSelectedButtons);
    }
  };

  useEffect(() => {}, []);

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
          <ButtonApp name="Generar Reporte" />
        </section>
      </div>
    </div>
  );
};

export default Container;
