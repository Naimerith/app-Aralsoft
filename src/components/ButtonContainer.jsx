import React, { useEffect, useState } from "react";
import "../assets/styles/ButtonContainer.css";
import ButtonGenerateReport from "../components/ButtonGenerateReport";
import { ReactSortable } from "react-sortablejs";
import Container from "./Container";
import { getData } from "../services/api_aralsoft";

const ButtonContainer = () => {
  /*Array con los keys del objeto para los botones */
  const [data, setData] = useState([]);

  /*Aqui esta el valor de boton clickeado*/
  const [valueBtn, setValueBtn] = useState([]);

  /*Esto es temporal, luego lo elimino*/
  const [activeIndex, setActiveIndex] = useState(null);

  const getData_api = async () => {
    const res = await getData();
    const arrOfArray = Object.entries(res);
    const arraOfKeys = Object.keys(arrOfArray[0][1]);
    setData(arraOfKeys);
  };

  /*Funcion temporal para imprimir en el contenedero el valor seleccionado */
  const onClickHandler = (index) => {
    setActiveIndex(index);
    console.log(index);
  };

  const handleBtns = async (e) => {
    const selectedButtonValue = e.target.innerHTML;
    const resApi = await getData();
    const consultApiSelection = resApi.map((el) => {
      const convertObjectToArray = Object.entries(el);
      return convertObjectToArray.filter((key) =>
        key.includes(selectedButtonValue)
      );
    });
    setValueBtn(consultApiSelection);
    console.log("veamos", consultApiSelection);
  };

  useEffect(() => {
    getData_api();
    //filterResult();
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
                <button className="btnSelect" key={index} onClick={handleBtns}>
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
              <Container name="Filas" onClick={() => onClickHandler(0)} />
              <p>{activeIndex === 0 ? "filas" : ""}</p>
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
                <Container name="Columnas" onClick={() => onClickHandler(1)} />
                <p>{activeIndex === 1 ? "columnas" : ""}</p>
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
                <Container name="Valores" onClick={() => onClickHandler(2)} />
                <p>{activeIndex === 2 ? "valores" : ""}</p>
              </ReactSortable>
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
