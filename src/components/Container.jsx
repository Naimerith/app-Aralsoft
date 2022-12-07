import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Icon } from "@iconify/react";
import { addCollectionResult } from "../Firebase/firebase.config";
import {
  consultValuesInTheApi,
  getValuesForCheckbox,
  filterData,
} from "../Functions/functions";
import ButtonApp from "./ButtonApp";
import "../assets/styles/Container.css";

const Container = () => {
  let ArrayOfSelectedButtons = [];
  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [btnClick, setBtnClick] = useState("");
  const [dataRow, setDataRow] = useState([]);
  const [dataColumn, setDataColumn] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRow1, setFilterRow1] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [counterId, setCounterId] = useState(1);

  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      return ArrayOfSelectedButtons.push(button.textContent);
    }
  };

  /***************Filtro que consulta la api y trae todos los checkbox *********************/
  const openFilter = async (state) => {
    setIsOpen(true);
    if (state === row) {
      console.log("row", row);
      const fila = state.toString();
      const resultApiRow = await consultValuesInTheApi(fila);
      getValuesForCheckbox(resultApiRow, setDataRow);
      setBtnClick("fila1");
    } else {
      const columna = state.toString();
      const consultApiSelectionBtn = datosFiltrados.map((el) => {
        const convertObjectToArray = Object.entries(el);
        return convertObjectToArray.filter((key) => key.includes(columna));
      });
      getValuesForCheckbox(consultApiSelectionBtn, setDataColumn);
      setBtnClick("columna");
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  /************************Buscador*****************************************************/
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    filterData(dataRow, e.target.value, setDataRow);
    filterData(dataColumn, e.target.value, setDataColumn);
  };
  /***************************************************************************************/

  const reportID = () => {
    setCounterId(counterId + 1);
    return counterId;
  };

  let elementFiltered = [];
  const applyingAFilterToAFilter = (e) => {
    return elementFiltered.push(e.target.value);
    //console.log(elementFiltered, "elementFiltered");
  };

  const generateReport = async () => {
    const nameRow = row.toString();
    const nameColumn = column.toString();
    const nameValues = values.toString();
    const resId = reportID();
    //await addCollectionResult(resId, nameRow, nameColumn, nameValues);
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
          <form action="">
            <div className="headerFilter">
              <input
                className="inputSearch"
                type="search"
                value={search === null ? "" : search}
                placeholder="Buscar..."
                onChange={handleChangeSearch}
              />
              <Icon
                icon="mdi:close-circle-outline"
                className="closeFilter"
                onClick={closeModal}
              />
            </div>
            <label htmlFor="">Seleccionar Todo</label>
            <input name="selectAll" type="checkbox" />
            <div className="options">
              {btnClick === "fila1"
                ? dataRow.map((el, i) => {
                    return (
                      <div key={i}>
                        <input
                          name={el}
                          type="checkbox"
                          value={el}
                          onChange={applyingAFilterToAFilter}
                        />
                        <label htmlFor="">{el}</label>
                      </div>
                    );
                  })
                : dataColumn.map((el, i) => {
                    return (
                      <div key={i}>
                        <input name={el} type="checkbox" value={el} />
                        <label htmlFor="">{el}</label>
                      </div>
                    );
                  })}
            </div>
          </form>
        </div>
      </section>
      <section>
        <ButtonApp name="Generar Reporte" onClick={generateReport} />
      </section>
    </div>
  );
};
export default Container;
