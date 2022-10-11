import React, { useEffect, useState } from "react";
import "../assets/styles/ButtonContainer.css";
import ButtonGenerateReport from "../components/ButtonGenerateReport";
import { ReactSortable } from "react-sortablejs";
import Container from "./Container";
import { getData } from "../services/api_aralsoft";

const ButtonContainer = () => {
  const [data, setData] = useState([]);
  const [valueBtn, setValueBtn] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const getData_api = async () => {
    const res = await getData();
    const arrOfArray = Object.entries(res);
    const arraOfKeys = Object.keys(arrOfArray[0][1]);
    setData(arraOfKeys);
  };

  const valueButton = (e) => {
    const resultValue = e.target.innerHTML;
    setValueBtn(resultValue);
  };

  const onClickHandler = (index) => {
    setActiveIndex(index);
  };

  const handleBtn = async (valueBtn) => {
    console.log("diste click...", valueBtn);
    /*const responseJson = await getData(valueBtn);
    console.log(responseJson);
    setValueBtn(responseJson);*/
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
          <ButtonGenerateReport
            click={() => {
              handleBtn(valueBtn);
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default ButtonContainer;
