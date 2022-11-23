import React, { useState } from "react";

const Checkbox = ({ state }) => {
  const [select, setSelect] = useState([]);
  const handleSelect = (e) => {
    const valueCheckbox = e.target.value;
    if (select.includes(valueCheckbox)) {
      setSelect(select.filter((sel) => sel !== valueCheckbox));
    } else {
      setSelect([...select, valueCheckbox]);
    }
  };
  console.log(select);
  const handleSelectAll = (e) => {
    console.log("seleccionar todo");
  };

  return (
    <div>
      <input name="checkbox" type="checkbox" onChange={handleSelectAll} />
      SELECCIONAR TODO
      {state.map((el, i) => {
        return (
          <div key={i}>
            <input
              name="checkbox"
              type="checkbox"
              value={el}
              onChange={handleSelect}
            />
            {el}
          </div>
        );
      })}
    </div>
  );
};

export default Checkbox;
