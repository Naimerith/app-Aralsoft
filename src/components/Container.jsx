import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { addCollectionResult } from "../Firebase/firebase.config";
import {
  consultValuesInTheApi,
  getValuesForCheckbox,
  getArrObject,
  filterData,
  nameOfSelectedButtons,
} from "../Functions/functions";
import { getData } from "../services/api_aralsoft";
import { useNavigate } from "react-router-dom";
//import { alertSuccess } from "../Functions/sweetAlert";
import ButtonApp from "./ButtonApp";
import "../assets/styles/Container.css";
import Checkbox from "./Checkbox";

const Container = () => {
  let ArrayOfSelectedButtons = [];
  // const navigate = useNavigate();
  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [btnClick, setBtnClick] = useState("");
  const [dataRow, setDataRow] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [search, setSearch] = useState("");
  const [selectColumn, setSelectColumn] = useState([]);
  const [selectRow, setSelectRow] = useState([]);

  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      ArrayOfSelectedButtons.push(button.textContent);
    }
    return ArrayOfSelectedButtons;
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
      console.log(columna);
      const resultApiColumn = await consultValuesInTheApi(columna);
      getValuesForCheckbox(resultApiColumn, setDataColumn);
      setBtnClick("columna");
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    setDataRow([]);
    setDataColumn([]);
  };

  /*****************************************************************************/
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    filterData(dataRow, e.target.value, setDataRow);
    filterData(dataColumn, e.target.value, setDataColumn);
  };

  /*****************************************************************************/
  const handleSelectColumn = (e) => {
    const valueCheckbox = e.target.value;
    if (selectColumn.includes(valueCheckbox)) {
      setSelectColumn(selectColumn.filter((sel) => sel !== valueCheckbox));
    } else {
      setSelectColumn([...selectColumn, valueCheckbox]);
    }
  };
  const handleSelectRow = (e) => {
    const valueCheckbox = e.target.value;
    if (selectRow.includes(valueCheckbox)) {
      setSelectRow(selectRow.filter((sel) => sel !== valueCheckbox));
    } else {
      setSelectRow([...selectRow, valueCheckbox]);
    }
  };

  /*****************************************************************************/
  /*const selectReport = [];
  const nameOfSelectedButtons = () => {
    const fila = row.toString();
    const columna = column.toString();
    const valores = values.toString();
    selectReport.push(fila, columna, valores);
    return selectReport;
  };*/

  const generateReport = async () => {
    //alertSuccess("Reporte Generado satisfactoriamente");
    //navigate("/report-generated");
    const resBtnOfReport = nameOfSelectedButtons(row, column, values);
    console.log("resBtnOfReport", resBtnOfReport);
    await addCollectionResult(resBtnOfReport);
    //const result = getArrObject(selectRow, selectColumn);
    //console.log("probando aqui a ver que trae", result);
  };
  console.log(row);
  console.log(column);
  console.log(values);

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
            handleSelectColumn={handleSelectColumn}
            handleSelectRow={handleSelectRow}
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
