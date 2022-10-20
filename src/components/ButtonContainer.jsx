import React, { useEffect, useState } from "react";
import "../assets/styles/ButtonContainer.css";
import { ReactSortable } from "react-sortablejs";
import { getData } from "../services/api_aralsoft";
import ButtonApp from "./ButtonApp";
import Container from "./Container";
import { useNavigate } from "react-router-dom";

const ButtonContainer = () => {
  /*Array con los keys del objeto para los botones */
  const [data, setData] = useState([]);

  /*contenedores vacios*/
  const [container, setContainer] = useState([]);
  const [columnas, setColumnas] = useState([]);
  const [valores, setValores] = useState([]);

  /*Aqui esta el valor filtrado de boton clickeado*/
  const [valueBtn, setValueBtn] = useState([]);

  /*Aqui esta el valor de boton clickeado*/
  const [btn, setBtn] = useState([]);

  /*Esto es temporal, luego lo elimino*/
  const [activeIndex, setActiveIndex] = useState(null);

  const navigate = useNavigate();

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
    // console.log(selectedButtonValue);
    return setBtn(selectedButtonValue);
  };

  const generateReport = async () => {
    const selectedButtonValue = btn;
    console.log(selectedButtonValue);
    const resApi = await getData();
    const consultApiSelection = resApi.map((el) => {
      const convertObjectToArray = Object.entries(el);
      return convertObjectToArray.filter((key) =>
        key.includes(selectedButtonValue)
      );
    });
    setValueBtn(consultApiSelection);
    console.log("veamos", consultApiSelection);
    navigate("/report-generated");
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
          group="groupName"
          pull="clone"
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
            <div className="containerR">
              {" "}
              Filas
              <ReactSortable
                list={container}
                setList={setContainer}
                group="groupName"
                animation={150}
              >
                {!data
                  ? "Cargando..."
                  : container.map((item, index) => (
                      <button
                        className="btnSelect"
                        key={index}
                        onClick={handleBtns}
                      >
                        {item}
                      </button>
                    ))}

                {/* <Container name="Filas" onClick={() => onClickHandler(0)} /> */}
                {/* <p>{activeIndex === 0 ? btn : ""}</p> */}
              </ReactSortable>
            </div>
          </div>
          <article className="container_col_val">
            <div className="containerHorizontal">
              <div className="containerR">
                {" "}
                Columnas
                <ReactSortable
                  list={columnas}
                  setList={setColumnas}
                  group="groupName"
                  animation={150}
                >
                  {!data
                    ? "Cargando..."
                    : columnas.map((item, index) => (
                        <button
                          className="btnSelect"
                          key={index}
                          onClick={handleBtns}
                        >
                          {item}
                        </button>
                      ))}
                </ReactSortable>
              </div>
            </div>
            <div className="containerHorizontal">
              <div className="containerR">
                {" "}
                Valores
                <ReactSortable
                  list={valores}
                  setList={setValores}
                  group="groupName"
                  animation={150}
                >
                  {!data
                    ? "Cargando..."
                    : valores.map((item, index) => (
                        <button
                          className="btnSelect"
                          key={index}
                          onClick={handleBtns}
                        >
                          {item}
                        </button>
                      ))}
                </ReactSortable>
              </div>
            </div>
          </article>
        </section>
        <section>
          <ButtonApp name="Generar Reporte" onClick={generateReport} />
        </section>
      </div>
    </div>
  );
};

export default ButtonContainer;
