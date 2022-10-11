import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/ButtonContainer.css";
import ButtonGenerateReport from "../components/ButtonGenerateReport";
import { ReactSortable } from "react-sortablejs";
import Container from "./Container";

const ButtonContainer = () => {
  const [data, setData] = useState([]);
  const [valueBtn, setValueBtn] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const getData_api = async () => {
    const config = {
      method: "get",
      url: "http://148.102.54.82:8088/cubo/api/ventas?empresa=63&periodo=202202",
      headers: {
        token:
          "a2ca9ff273fd7a4c0b0dadce6d076524c28f6675d262acfa4738c90caa8b8f40",
      },
    };
    const response = await axios(config);
    const responseData = await response.data.data;
    const arrOfArray = Object.entries(responseData);
    const arraOfKeys = Object.keys(arrOfArray[0][1]);
    setData(arraOfKeys);
  };

  const valueButton = (e) => {
    const resultValue = e.target.innerHTML;
    setValueBtn(resultValue);
    //console.log(resultValue);
  };

  const onClickHandler = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    getData_api();
  }, []);

  return (
    <div className="container">
      <div className="itemSelect">
        <ReactSortable
          tag="div"
          list={data}
          setList={setData}
          group="groupName"
          animation={150}
          sort={false}
          pull="clone"
        >
          {!data
            ? "Cargando..."
            : data.map((item, index) => (
                <button className="btnSelect" key={index} onClick={valueButton}>
                  {item}
                </button>
              ))}
        </ReactSortable>
      </div>
      <div className="bottomContainer">
        <section className="itemsSelected">
          <div className="rows">
            <Container
              active={activeIndex === 0}
              onClick={() => onClickHandler(0)}
              name="Filas"
              value={() => valueButton()}
            />
            <p>{activeIndex === 0 ? valueBtn : ""}</p>
          </div>
          <article className="container_col_val">
            <div className="columns">
              <Container
                active={activeIndex === 1}
                onClick={() => onClickHandler(1)}
                name="Columnas"
              />
              <p>{activeIndex === 1 ? valueBtn : ""}</p>
            </div>
            <div className="values">
              <Container
                active={activeIndex === 2}
                onClick={() => onClickHandler(2)}
                name="Valores"
              />
              <p>{activeIndex === 2 ? valueBtn : ""}</p>
            </div>
          </article>
        </section>
        <section>
          <ButtonGenerateReport />
        </section>
      </div>
    </div>
  );
};

export default ButtonContainer;
