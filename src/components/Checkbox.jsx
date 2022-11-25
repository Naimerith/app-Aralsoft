import React, { useState } from "react";

const Checkbox = ({ state, handleChangeSearch, search }) => {
  const [select, setSelect] = useState([]);

  const handleSelect = (e) => {
    const valueCheckbox = e.target.value;
    if (select.includes(valueCheckbox)) {
      setSelect(select.filter((sel) => sel !== valueCheckbox));
    } else {
      setSelect([...select, valueCheckbox]);
    }
  };

  return (
    <div>
      <form action="">
        <input
          type="search"
          value={search === undefined ? "" : search}
          placeholder="Buscar                         🔍"
          onChange={handleChangeSearch}
        />
        <br />

        <label htmlFor="">Seleccionar Todo</label>
        <input name="selectAll" type="checkbox" />
        {state.map((el, i) => {
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
      </form>
    </div>
  );
};

export default Checkbox;
