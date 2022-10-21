import React, { useEffect, useState } from "react";
import "../assets/styles/ButtonListContainer.css";
import { ReactSortable } from "react-sortablejs";
import { getData } from "../services/api_aralsoft";

const ButtonListContainer = () => {
  /*Array con los keys del objeto para los botones */
  const [data, setData] = useState([]);

  const getData_api = async () => {
    const res = await getData();
    const arrOfArray = Object.entries(res);
    const arraOfKeys = Object.keys(arrOfArray[0][1]);
    setData(arraOfKeys);
  };

  useEffect(() => {
    getData_api();
  }, []);

  return (
    <div className="container">
      <div className="itemSelect">
        <ReactSortable
          list={data}
          setList={setData}
          group={{ name: "selectedButton" }}
          animation={150}
        >
          {!data
            ? "Cargando..."
            : data.map((item, index) => (
                <button className="btnSelect" key={index}>
                  {item}
                </button>
              ))}
        </ReactSortable>
      </div>
    </div>
  );
};

export default ButtonListContainer;
