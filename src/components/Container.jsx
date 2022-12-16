import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import {
  addFilteredResultsToTheCollection,
  addUnfilteredResultsToTheCollection,
} from "../Firebase/firebase.config";
import {
  consultValuesInTheApi,
  getValuesForCheckbox,
  filterData,
  example,
} from "../Functions/functions";
import { alertError } from "../Functions/sweetAlert";
import ButtonApp from "./ButtonApp";
import "../assets/styles/Container.css";
import Checkbox from "./Checkbox";

const Container = () => {
  let ArrayOfSelectedButtons = [];

  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [btnClick, setBtnClick] = useState("");

  const [dataRow, setDataRow] = useState([]);

  const [dataColumn, setDataColumn] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  const [search, setSearch] = useState("");

  const [filterRow1, setFilterRow1] = useState([]);
  const [filterRow2, setFilterRow2] = useState([]);
  const [filterCol, setFilterCol] = useState([]);

  const [counterId, setCounterId] = useState(1);

  const limitRow = row.length <= 2;
  const limitColumn = column.length === 1;
  const limitValues = values.length === 1;

  const reportID = () => {
    setCounterId(counterId + 1);
    return counterId;
  };

  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      ArrayOfSelectedButtons.push(button.textContent);
    }
  };

  let nameRow1 = ArrayOfSelectedButtons[0];
  let nameRow2 = ArrayOfSelectedButtons[1];
  let nameCol = ArrayOfSelectedButtons[2];
  let nameVal = ArrayOfSelectedButtons[3];
  // let resId = reportID();

  /***************Filtro que consulta la api y trae todos los checkbox *********************/
  const getValuesFromRowButtons = async (index) => {
    const btn1 = ArrayOfSelectedButtons[0];
    const btn2 = ArrayOfSelectedButtons[1];
    setIsOpen(true);
    if (limitRow && index === 0) {
      const resultApiRow1 = await consultValuesInTheApi(btn1);
      getValuesForCheckbox(resultApiRow1, setDataRow);
      setBtnClick("fila1");
    } else if (limitRow && index === 1) {
      const resultApiRow2 = await consultValuesInTheApi(btn2);
      getValuesForCheckbox(resultApiRow2, setDataRow);
      setBtnClick("fila2");
    } else {
      alertError("Solo puedes seleccionar 2 opciones");
      setIsOpen(false);
    }
  };

  const getValuesFromColumnsButtons = async (index) => {
    setIsOpen(true);
    setBtnClick("column");
    let btnCol = "";
    if (limitColumn && row.length === 1 && index === 0) {
      btnCol = ArrayOfSelectedButtons[1];
      const resultApiColumn = await consultValuesInTheApi(btnCol);
      getValuesForCheckbox(resultApiColumn, setDataColumn);
    } else if (limitColumn && row.length === 2 && index === 0) {
      btnCol = ArrayOfSelectedButtons[2];
      const resultApiColumn = await consultValuesInTheApi(btnCol);
      getValuesForCheckbox(resultApiColumn, setDataColumn);
    } else {
      alertError("Solo puedes seleccionar 1 opción");
      setIsOpen(false);
    }
  };

  const getValuesFromValuesButtons = async (index) => {
    let btnVal = "";
    if (limitValues && row.length === 1 && index === 0) {
      btnVal = ArrayOfSelectedButtons[2];
      const resultApiValues = await consultValuesInTheApi(btnVal);
      return setDataValues(resultApiValues);
    } else if (limitValues && row.length === 2 && index === 0) {
      btnVal = ArrayOfSelectedButtons[3];
      const resultApiValues = await consultValuesInTheApi(btnVal);
      return setDataValues(resultApiValues);
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
  };

  /***************************************************************************************/

  const reportUnfiltered = async () => {
    if (row.length === 1) {
      const resId = reportID();
      /* const btnRow1 = ArrayOfSelectedButtons[0];
      const btnCol = ArrayOfSelectedButtons[1];
      const btnVal = ArrayOfSelectedButtons[2];*/
      const btnRow2 = "";
      const consultApiRow2 = [];
      const consultApiRow1 = await example(nameRow1);
      const consultApiCol = await example(nameCol);
      const consultApiVal = await example(nameVal);
      await addUnfilteredResultsToTheCollection(
        resId,
        nameRow1,
        btnRow2,
        nameCol,
        nameVal,
        consultApiRow1,
        consultApiRow2,
        consultApiCol,
        consultApiVal
      );
    } else if (row.length === 2) {
      const resId = reportID();
      /*const btnRow1 = ArrayOfSelectedButtons[0];
      const btnRow2 = ArrayOfSelectedButtons[1];
      const btnCol = ArrayOfSelectedButtons[2];
      const btnVal = ArrayOfSelectedButtons[3];*/
      const consultApiRow1 = await example(nameRow1);
      const consultApiRow2 = await example(nameRow2);
      const consultApiCol = await example(nameCol);
      const consultApiVal = await example(nameVal);
      await addUnfilteredResultsToTheCollection(
        resId,
        nameRow1,
        nameRow2,
        nameCol,
        nameVal,
        consultApiRow1,
        consultApiRow2,
        consultApiCol,
        consultApiVal
      );
    } else {
      alertError("No se ha generado el reporte");
    }
  };

  const generateReport = async () => {
    const resId = reportID();

    if (
      filterRow1.length === 0 &&
      filterRow2.length === 0 &&
      filterCol.length === 0
    ) {
      reportUnfiltered();
    } else {
      await addFilteredResultsToTheCollection(
        resId,
        nameRow1,
        nameRow2,
        nameCol,
        nameVal,
        filterRow1,
        filterRow2,
        filterCol
      );
    }
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
                      onClick={() => getValuesFromRowButtons(index)}
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
                        onClick={() => getValuesFromColumnsButtons(index)}
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
                        onChange={() => getValuesFromValuesButtons(index)}
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
