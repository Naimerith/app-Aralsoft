import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "../assets/styles/Checkbox.css";

const Checkbox = ({
  state,
  stateRow,
  stateColumn,
  handleChangeSearch,
  search,
  closeModal,
}) => {
  const [selectColumn, setSelectColumn] = useState([]);
  const [selectRow, setSelectRow] = useState([]);

  const selectAll = (e) => {
    console.log("diste click en seleccionar todo");
  };

  const handleSelectColumn = (e) => {
    //console.log("Column");
    const valueCheckbox = e.target.value;
    if (selectColumn.includes(valueCheckbox)) {
      setSelectColumn(selectColumn.filter((sel) => sel !== valueCheckbox));
    } else {
      setSelectColumn([...selectColumn, valueCheckbox]);
    }
  };
  //console.log("columna", selectColumn);
  const handleSelectRow = (e) => {
    //console.log("Fila");
    const valueCheckbox = e.target.value;
    if (selectRow.includes(valueCheckbox)) {
      setSelectRow(selectRow.filter((sel) => sel !== valueCheckbox));
    } else {
      setSelectRow([...selectRow, valueCheckbox]);
    }
  };
  //console.log("fila", selectRow);

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
