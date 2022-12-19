import React from "react";
import { Icon } from "@iconify/react";
import "../assets/styles/Checkbox.css";

const Checkbox = ({
  search,
  closeModal,
  handleChangeSearch,
  dataColumn,
  dataRow,
  btnClick,
  obtainFilteredElements,
}) => {
  let mssg = "Sin datos";

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
        <input name="selectAll" type="checkbox" className="check" />
        <div className="options">
          {btnClick === "fila1" || btnClick === "fila2"
            ? dataRow.map((el, i) => {
                return (
                  <div key={i}>
                    <input
                      name={el}
                      type="checkbox"
                      className="check"
                      value={el === null ? mssg : el}
                      onChange={obtainFilteredElements}
                    />
                    <label htmlFor="">{el === null ? mssg : el}</label>
                  </div>
                );
              })
            : dataColumn.map((el, i) => {
                return (
                  <div key={i}>
                    <input
                      name={el}
                      type="checkbox"
                      className="check"
                      value={el === null ? mssg : el}
                      onChange={obtainFilteredElements}
                    />
                    <label htmlFor="">{el === null ? mssg : el}</label>
                  </div>
                );
              })}
        </div>
      </form>
    </div>
  );
};

export default Checkbox;
