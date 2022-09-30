
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const ListReport = (props) => {
  const [state, setState] = useState(['hola', 'maria', 'que tal']);


  return (
    <ReactSortable tag="ul" list={state} setList={setState}>
      {state.map((item, index) => (
        <li
          key={index}
          options={{
            animation: 150,
            group: {
              name: 'lista',
              pull: 'clone'
            }
          }}
        >{item}</li>
      ))}
    </ReactSortable>
  )
};

export default ListReport;