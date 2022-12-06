import React, { useState, useId } from "react";
import { ReactSortable } from "react-sortablejs";
import { Icon } from "@iconify/react";
import { addCollectionResult } from "../Firebase/firebase.config";
import {
  consultValuesInTheApi,
  getValuesForCheckbox,
  filterData,
  nameOfSelectedButtons,
} from "../Functions/functions";
import { getData } from "../services/api_aralsoft";
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
  const [checked, setChecked] = useState(false);
  const [datosFiltrados, setDatosFiltrados] = useState([]);

  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      return ArrayOfSelectedButtons.push(button.textContent);
    }
  };

  /***************Filtro que consulta la api y trae todos los checkbox *********************/
  const openFilter = async (state) => {
    setIsOpen(true);
    if (state === row) {
      const fila = state.toString();
      const resultApiRow = await consultValuesInTheApi(fila);
      getValuesForCheckbox(resultApiRow, setDataRow);
      setBtnClick("fila");
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
    setDataRow([]);
    setDataColumn([]);
  };

  /***************Filtro columnas dependiendo de la seleccion de la fila *********************/

  const applyingAFilterToAFilter = async (e) => {
    const valueCheckbox = e.target.value;
    console.log("valueCheckbox", valueCheckbox);
    setChecked({
      ...checked,
      [e.target.value]: e.target.checked,
    });

    if (e.target.checked) {
      const resApi = await getData();
      const resFilterData = resApi.filter(
        (item) => item.ventasKey === e.target.value
      );
      setDatosFiltrados([...datosFiltrados, ...resFilterData]);
      console.log("resultadoif", resFilterData);
    } else {
      const resFilterData = datosFiltrados.filter(
        (item) => item.ventasKey !== e.target.value
      );
      setDatosFiltrados([...resFilterData]);
      console.log("resultadoelse", resFilterData);
    }
  };
  /************************Buscador*****************************************************/
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    filterData(dataRow, e.target.value, setDataRow);
    filterData(dataColumn, e.target.value, setDataColumn);
  };

  const generateReport = async () => {
    const nameRow = row.toString();
    const nameColumn = column.toString();
    const nameValues = values.toString();
    await addCollectionResult(nameRow, nameColumn, nameValues);
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
              {btnClick === "fila"
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
