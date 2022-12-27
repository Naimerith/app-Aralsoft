import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ReactSortable } from "react-sortablejs";
import { addFilteredResultsToTheCollection } from "../Firebase/firebase.config";
import {
  consultValuesInTheApi,
  getValuesForCheckbox,
  filterData,
} from "../Functions/functions";
import { alertError, alertSuccess } from "../Functions/sweetAlert";
import ButtonApp from "./ButtonApp";
import "../assets/styles/Container.css";
import Checkbox from "./Checkbox";
import { useNavigate } from "react-router-dom";

const Container = () => {
  let arrayRow = [];
  let btncolumn = "";
  let arrayValues = [];
  const navigate = useNavigate();

  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [btnClick, setBtnClick] = useState("");
  const [counterId, setCounterId] = useState(1);
  const [search, setSearch] = useState("");

  const [dataRow, setDataRow] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);

  const [filterRow1, setFilterRow1] = useState([]);
  const [filterRow2, setFilterRow2] = useState([]);
  const [filterRow3, setFilterRow3] = useState([]);
  const [filterRow4, setFilterRow4] = useState([]);
  const [filterRow5, setFilterRow5] = useState([]);
  const [filterCol, setFilterCol] = useState([]);

  const limitRow = row.length > 0 && row.length <= 5 && typeof string;
  const limitColumn = column.length <= 1 && typeof string;
  const limitValues = values.length > 0 && values.length <= 5 && typeof Number;

  const reportID = () => {
    setCounterId(counterId + 1);
    return counterId;
  };

  const addToMatrixTheButtonsAddedInRows = (button) => {
    if (button != null) {
      arrayRow.push(button.textContent);
    }
  };
  const addToMatrixTheButtonsAddedInColumn = (button) => {
    if (button != null) {
      btncolumn = button.textContent;
    }
  };
  const addToMatrixTheButtonsAddedInValues = (button) => {
    if (button != null) {
      arrayValues.push(button.textContent);
    }
  };

  /***************Filtro que consulta la api y trae todos los checkbox *********************/
  const getValuesFromRowButtons = async (index) => {
    setIsOpen(true);
    if (limitRow && index === 0) {
      const resultApiRow1 = await consultValuesInTheApi(arrayRow[0]);
      getValuesForCheckbox(resultApiRow1, setDataRow);
      setBtnClick("fila1");
    } else if (limitRow && index === 1) {
      const resultApiRow2 = await consultValuesInTheApi(arrayRow[1]);
      getValuesForCheckbox(resultApiRow2, setDataRow);
      setBtnClick("fila2");
    } else if (limitRow && index === 2) {
      const resultApiRow3 = await consultValuesInTheApi(arrayRow[2]);
      getValuesForCheckbox(resultApiRow3, setDataRow);
      setBtnClick("fila3");
    } else if (limitRow && index === 3) {
      const resultApiRow4 = await consultValuesInTheApi(arrayRow[3]);
      getValuesForCheckbox(resultApiRow4, setDataRow);
      setBtnClick("fila4");
    } else if (limitRow && index === 4) {
      const resultApiRow5 = await consultValuesInTheApi(arrayRow[4]);
      getValuesForCheckbox(resultApiRow5, setDataRow);
      setBtnClick("fila5");
    } else {
      alertError(
        "Solo puedes insertar un máximo 5 botones en el contenedor de filas"
      );
      setIsOpen(false);
    }
  };
  const getValuesFromColumnsButtons = async (index) => {
    setIsOpen(true);
    setBtnClick("column");
    if (limitColumn && index === 0) {
      const resultApiColumn = await consultValuesInTheApi(btncolumn);
      getValuesForCheckbox(resultApiColumn, setDataColumn);
    } else {
      alertError(
        "Solo puedes insertar máximo 1 botón en el contenedor de columnas"
      );
      setIsOpen(false);
    }
  };

  const obtainFilteredElements = (e) => {
    if (btnClick === "fila1") {
      const value1 = e.target.value;
      const filterRowBtn1 = value1;
      filterRow1 === []
        ? setDataRow(dataRow)
        : setFilterRow1((filterRow1) => [...filterRow1, filterRowBtn1]);
      if (e.target.checked === false) {
        const removeItem1 = filterRow1.filter((item) => item !== value1);
        setFilterRow1(removeItem1);
      }
    } else if (btnClick === "fila2") {
      const value2 = e.target.value;
      const filterRowBtn2 = value2;
      filterRow2 === []
        ? setDataRow(dataRow)
        : setFilterRow2((filterRow2) => [...filterRow2, filterRowBtn2]);
      if (e.target.checked === false) {
        const removeItem2 = filterRow2.filter((item) => item !== value2);
        setFilterRow2(removeItem2);
      }
    } else if (btnClick === "fila3") {
      const value3 = e.target.value;
      const filterRowBtn3 = value3;
      filterRow3 === []
        ? setDataRow(dataRow)
        : setFilterRow3((filterRow3) => [...filterRow3, filterRowBtn3]);
      if (e.target.checked === false) {
        const removeItem3 = filterRow3.filter((item) => item !== value3);
        setFilterRow3(removeItem3);
      }
    } else if (btnClick === "fila4") {
      const value4 = e.target.value;
      const filterRowBtn4 = value4;
      filterRow4 === []
        ? setDataRow(dataRow)
        : setFilterRow4((filterRow4) => [...filterRow4, filterRowBtn4]);
      if (e.target.checked === false) {
        const removeItem3 = filterRow4.filter((item) => item !== value4);
        setFilterRow4(removeItem3);
      }
    } else if (btnClick === "fila5") {
      const value5 = e.target.value;
      const filterRowBtn5 = value5;
      filterRow5 === []
        ? setDataRow(dataRow)
        : setFilterRow5((filterRow5) => [...filterRow5, filterRowBtn5]);
      if (e.target.checked === false) {
        const removeItem3 = filterRow5.filter((item) => item !== value5);
        setFilterRow5(removeItem3);
      }
    }
    if (btnClick === "column") {
      const value3 = e.target.value;
      const filterColBtn = value3;
      filterCol === []
        ? setDataColumn(dataColumn)
        : setFilterCol((filterCol) => [...filterCol, filterColBtn]);
      if (e.target.checked === false) {
        const removeItem3 = filterCol.filter((item) => item !== value3);
        setFilterCol(removeItem3);
      }
    }
  };

  /************************Buscador*****************************************************/
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    filterData(dataRow, e.target.value, setDataRow);
    filterData(dataColumn, e.target.value, setDataColumn);
  };
  /***************************************************************************************/

  const closeModal = () => {
    setIsOpen(false);
    setBtnClick("");
  };

  /***************************************************************************************/
  const generateReport = async () => {
    const resId = reportID();
    if (limitRow && limitColumn && limitValues) {
      await addFilteredResultsToTheCollection(
        resId,
        arrayRow[0],
        arrayRow[1],
        arrayRow[2],
        arrayRow[3],
        arrayRow[4],
        btncolumn,
        arrayValues[0],
        arrayValues[1],
        arrayValues[2],
        arrayValues[3],
        arrayValues[4],
        filterRow1,
        filterRow2,
        filterRow3,
        filterRow4,
        filterRow5,
        filterCol
      );
      alertSuccess("Reporte generado con éxito");
      navigate("/report");
    } else {
      alertError("No se pudo generar el reporte");
    }
  };

  return (
    <div className="bottomContainer">
      <section className="itemsSelected">
        <div className="containerVertical">
          <Tippy content="Sólo puedes insertar botones con datos tipo texto">
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
                        ref={(button) =>
                          addToMatrixTheButtonsAddedInRows(button)
                        }
                        onClick={() => getValuesFromRowButtons(index)}
                      >
                        {item}
                      </button>
                    ))}
              </ReactSortable>
            </div>
          </Tippy>
        </div>
        <article className="container_col_val">
          <div className="containerHorizontal">
            <Tippy content="Sólo puedes insertar botones con datos tipo texto">
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
                          ref={(button) =>
                            addToMatrixTheButtonsAddedInColumn(button)
                          }
                          onClick={() => getValuesFromColumnsButtons(index)}
                        >
                          {item}
                        </button>
                      ))}
                </ReactSortable>
              </div>
            </Tippy>
          </div>
          <div className="containerHorizontal">
            <Tippy content="Sólo puedes insertar botones con datos tipo numérico: precioUnitario, cantidad, soles, totalSoles, artUnidPres, valorVenta,PorcentajeDcto,valorDscto">
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
                          ref={(button) =>
                            addToMatrixTheButtonsAddedInValues(button)
                          }
                        >
                          {item}
                        </button>
                      ))}
                </ReactSortable>
              </div>
            </Tippy>
          </div>
        </article>
        <div className={isOpen ? "block" : "none"}>
          <Checkbox
            search={search}
            closeModal={closeModal}
            handleChangeSearch={handleChangeSearch}
            obtainFilteredElements={obtainFilteredElements}
            dataRow={dataRow}
            dataColumn={dataColumn}
            btnClick={btnClick}
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
