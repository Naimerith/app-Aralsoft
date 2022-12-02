import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { getArrObject } from "../Functions/functions";
import "../assets/styles/Checkbox.css";

const Checkbox = ({
  state,
  stateRow,
  stateColumn,
  handleChangeSearch,
  search,
  closeModal,
  handleSelectRow,
  handleSelectColumn,
}) => {
  // const [selectColumn, setSelectColumn] = useState([]);
  //const [selectRow, setSelectRow] = useState([]);

  const selectAll = (e) => {
    console.log("diste click en seleccionar todo");
  };

  /*const handleSelectColumn = (e) => {
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
  //console.log("fila", selectRow);

  const addToCollectionFB = () => {
    const result = getArrObject(selectRow, selectColumn);
    console.log("probando aqui a ver que trae", result);
  };*/

  return (
    <div className="containerFilter">
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
        <input name="selectAll" type="checkbox" onChange={selectAll} />
        <div className="options">
          {state === "fila"
            ? stateRow.map((el, i) => {
                return (
                  <div key={i}>
                    <input
                      name={el}
                      type="checkbox"
                      value={el}
                      onChange={handleSelectRow}
                    />
                    <label htmlFor="">{el}</label>
                  </div>
                );
              })
            : stateColumn.map((el, i) => {
                return (
                  <div key={i}>
                    <input
                      name={el}
                      type="checkbox"
                      value={el}
                      onChange={handleSelectColumn}
                    />
                    <label htmlFor="">{el}</label>
                  </div>
                );
              })}
        </div>
      </form>
    </div>
  );
};

export default Checkbox;
