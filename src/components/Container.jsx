import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import {
  consultValuesInTheApi,
  getValuesForCheckbox,
} from "../Functions/functions";
import { useNavigate } from "react-router-dom";
import { alertSuccess } from "../Functions/sweetAlert";
import ButtonApp from "./ButtonApp";
import "../assets/styles/Container.css";
import Checkbox from "./Checkbox";

const Container = () => {
  let ArrayOfSelectedButtons = [];
  const navigate = useNavigate();
  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [btnClick, setBtnClick] = useState("");
  const [dataRow, setDataRow] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);

  const [search, setSearch] = useState("");

  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      ArrayOfSelectedButtons.push(button.textContent);
    }
    return ArrayOfSelectedButtons;
  };

  const closeModal = () => {
    setIsOpen(false);
    setDataRow([]);
    setDataColumn([]);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const openFilter = async (state) => {
    openModal();
    if (state === row) {
      const fila = state.toString();
      const resultApiRow = await consultValuesInTheApi(fila);
      getValuesForCheckbox(resultApiRow, setDataRow);
      setBtnClick("fila");
    } else {
      const columna = state.toString();
      const resultApiColumn = await consultValuesInTheApi(columna);
      getValuesForCheckbox(resultApiColumn, setDataColumn);
      setBtnClick("columna");
    }
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    //filterData(e.target.value);
  };

  /*const filterData = (data) => {
    if (!search) {
      return dataCheck;
    } else {
      const resSearch = dataCheck.filter((el) => {
        const convertDataToString = el?.toString() || "";
        if (convertDataToString.includes(data)) {
          return el;
        }
      });
      setDataCheck(resSearch);
    }
  };*/

  const generateReport = async () => {
    alertSuccess("Reporte Generado satisfactoriamente");
    navigate("/report-generated");
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
                      onClick={() => openFilter(row)}
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
                        onClick={() => openFilter(column)}
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
        <div className={isOpen ? "block" : "none"}>
          <Checkbox
            state={btnClick}
            stateRow={dataRow}
            stateColumn={dataColumn}
            handleChangeSearch={handleChangeSearch}
            search={search}
            closeModal={closeModal}
          ></Checkbox>
        </div>
      </section>
      <section>
        <ButtonApp name="Generar Reporte" onClick={generateReport} />
      </section>
    </div>
  );
};
export default Container;
