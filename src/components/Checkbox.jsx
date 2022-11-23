import React, { useState } from "react";

const Checkbox = ({ state }) => {
  const arrayCheckbox = [];
  const [isChecked, setIsChecked] = useState(false);

  const [select, setSelect] = useState([]);
  const handleSelect = (e) => {
    const valueCheckbox = e.target.value;
    //console.log(valueCheckbox);
    if (e.target.checked) {
      arrayCheckbox.push(valueCheckbox);
      console.log("agrega", arrayCheckbox);
    } else {
      arrayCheckbox.pop(valueCheckbox);
      console.log("elimina", arrayCheckbox);
    }
  };
  const handleSelectAll = (e) => {
    setIsChecked(!isChecked);
    /*const valueCheckbox = e.target.value;
    arrayCheckbox.push(valueCheckbox);
    setSelect(arrayCheckbox);*/
  };

  return (
    <div>
      <input
        name="checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleSelectAll}
      />
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
