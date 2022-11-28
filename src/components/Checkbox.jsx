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
  const [select, setSelect] = useState([]);

  const selectAll = (e) => {
    console.log("diste click en seleccionar todo");
  };

  const handleSelect = (e) => {
    console.log("hola");
    /*const valueCheckbox = e.target.value;
    if (select.includes(valueCheckbox)) {
      setSelect(select.filter((sel) => sel !== valueCheckbox));
    } else {
      setSelect([...select, valueCheckbox]);
    }*/
  };
  console.log("aqui", select);

  return (
    <div className="containerFilter">
      <form action="">
        <div className="headerFilter">
          <input
            className="inputSearch"
            type="search"
            value={search === undefined ? "" : search}
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
                      onChange={handleSelect}
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
                      onChange={handleSelect}
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
