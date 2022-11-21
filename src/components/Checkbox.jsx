import React from "react";

const Checkbox = ({ state }) => {
  return (
    <div>
      <div>
        <input id="selectAll" name="seleccionar todo" type="checkbox" />
        SELECCIONAR TODO
        {state.map((el, i) => {
          return (
            <div key={i}>
              <input
                type="checkbox"
                value={el}
                onChange={(e) => console.log(e.target.value)}
              />
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkbox;
