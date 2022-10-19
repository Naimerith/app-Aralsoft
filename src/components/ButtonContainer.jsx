import React, { useEffect, useState } from "react";
import "../assets/styles/ButtonContainer.css";
import { ReactSortable } from "react-sortablejs";
import { getData } from "../services/api_aralsoft";
import ButtonApp from "./ButtonApp";
import Container from "./Container";

const ButtonContainer = () => {
  /*Array con los keys del objeto para los botones */
  const [data, setData] = useState([]);

  /*Aqui esta el valor filtrado de boton clickeado*/
  const [valueBtn, setValueBtn] = useState([]);

  /*Aqui esta el valor de boton clickeado*/
  const [btn, setBtn] = useState([]);

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
    setBtn(selectedButtonValue);
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
  }, []);

  return (
    <div className="container">
      <div className="itemSelect">
        <ReactSortable
          list={data}
          setList={setData}
          group={{ name: "groupName", pull: "clone" }}
          animation={150}
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
          <div className="containerVertical">
            <ReactSortable
              list={data}
              setList={setData}
              group="groupBtn"
              animation={150}
            >
              <Container name="Filas" onClick={() => onClickHandler(0)} />
              <p>{activeIndex === 0 ? btn : ""}</p>
            </ReactSortable>
          </div>
          <article className="container_col_val">
            <div className="containerHorizontal">
              <ReactSortable
                list={data}
                setList={setData}
                group="groupBtn"
                animation={150}
              >
                <Container name="Columnas" onClick={() => onClickHandler(1)} />
                <p>{activeIndex === 1 ? btn : ""}</p>
              </ReactSortable>
            </div>
            <div className="containerHorizontal">
              <ReactSortable
                list={data}
                setList={setData}
                group="groupBtn"
                animation={150}
              >
                <Container name="Valores" onClick={() => onClickHandler(2)} />
                <p>{activeIndex === 2 ? btn : ""}</p>
              </ReactSortable>
            </div>
          </article>
        </section>
        <section>
          <ButtonApp name="Generar Reporte" />
        </section>
      </div>
    </div>
  );
};

export default ButtonContainer;
