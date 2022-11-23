import React, { useState } from "react";

const Checkbox = ({ state }) => {
  const [select, setSelect] = useState([]);
  const [search, setSearch] = useState([]);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  };

  const filterSearch = (searchTerm) => {
    let resSearch = state.filter((el) => {
      if (el.toString().includes(searchTerm)) {
        return el;
      }
    });
    console.log("aquiii", resSearch);
  };

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
        <input type="search" value={search} onChange={handleChangeSearch} />
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
