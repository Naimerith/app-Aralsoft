import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { getData } from "../services/api_aralsoft";
import "../assets/styles/ButtonListContainer.css";

const ButtonListContainer = () => {
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
