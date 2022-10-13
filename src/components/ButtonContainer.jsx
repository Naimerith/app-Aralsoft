import React, { useEffect, useState } from "react";
import "../assets/styles/ButtonContainer.css";
import ButtonGenerateReport from "../components/ButtonGenerateReport";
import { ReactSortable } from "react-sortablejs";
import Container from "./Container";
import { getData } from "../services/api_aralsoft";

const ButtonContainer = () => {
  const [data, setData] = useState([]);
  const [valueBtn, setValueBtn] = useState([]);

  const getData_api = async () => {
    const res = await getData();
    const arrOfArray = Object.entries(res);
    const arraOfKeys = Object.keys(arrOfArray[0][1]);
    setData(arraOfKeys);
  };

  /*Evento para detectar el boton clickeado */
  const valueButton = async (e) => {
    const resultValue = e.target.innerHTML;
    console.log("diste click al boton...", resultValue);
    const responseJson = await getData(resultValue);
    console.log("y esta es la respuesta de la api", responseJson);

    setValueBtn(responseJson);
  };
  const handleBtn = async (valueBtn) => {
    console.log("diste click a generar reporte...", valueBtn);

    setValueBtn(valueBtn);
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
            <ReactSortable
              tag="div"
              list={data}
              setList={setData}
              group="groupName"
              animation={150}
            >
              <Container name="Filas" value={valueBtn} />
            </ReactSortable>
          </div>
          <article className="container_col_val">
            <div className="columns">
              <ReactSortable
                tag="div"
                list={data}
                setList={setData}
                group="groupName"
                animation={150}
              >
                <Container name="Columnas" />
              </ReactSortable>
            </div>
            <div className="values">
              <ReactSortable
                tag="div"
                list={data}
                setList={setData}
                group="groupName"
                animation={150}
              >
                <Container name="Valores" />
              </ReactSortable>
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
