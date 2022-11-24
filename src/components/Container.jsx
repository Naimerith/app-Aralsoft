import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Icon } from "@iconify/react";
import {
  consultValuesInTheApi,
  getValuesForCheckbox,
} from "../Functions/functions";
import { useNavigate } from "react-router-dom";
import { alertSuccess } from "../Functions/sweetAlert";
import ButtonApp from "./ButtonApp";
import Modal from "react-modal";
import "../assets/styles/Container.css";
import Checkbox from "./Checkbox";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "30%",
    width: "auto",
    padding: "20px",
  },
};
const Container = () => {
  let subtitle;
  let ArrayOfSelectedButtons = [];
  const navigate = useNavigate();
  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataCheck, setDataCheck] = useState([]);
  const [select, setSelect] = useState([]);
  const [search, setSearch] = useState("");

  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      ArrayOfSelectedButtons.push(button.textContent);
    }
    return ArrayOfSelectedButtons;
  };

  const openModal = async () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#0e3a73";
  };

  const closeModal = () => {
    setIsOpen(false);
    setDataCheck([]);
  };

  const btnToSelectOptions = async (state) => {
    if (state === row) {
      const fila = state.toString();
      openModal();
      const resultApiRow = await consultValuesInTheApi(fila);
      getValuesForCheckbox(resultApiRow, setDataCheck);
    } else {
      const columna = state.toString();
      openModal();
      const resultApiColumn = await consultValuesInTheApi(columna);
      getValuesForCheckbox(resultApiColumn, setDataCheck);
    }
  };

  const handleSelect = (e) => {
    const valueCheckbox = e.target.value;
    if (select.includes(valueCheckbox)) {
      setSelect(select.filter((sel) => sel !== valueCheckbox));
    } else {
      setSelect([...select, valueCheckbox]);
    }
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    const resSearch = dataCheck.filter((el) => {
      const convertDataToString = el?.toString() || "";
      if (convertDataToString.includes(e.target.value)) {
        return el;
      } else {
        console.log("no hay resultados");
      }
    });
    setDataCheck(resSearch);
  };

  const generateReport = async () => {
    alertSuccess("Reporte Generado satisfactoriamente");
    navigate("/report-generated");
  };

  return (
    <div className="bottomContainer">
      <section className="itemsSelected">
        <div className="containerVertical">
          <div className="containerR">
            Filas
            <ReactSortable
              list={row}
              setList={setRow}
              group={{ name: "selectedButton", pull: true }}
            >
              {!row
                ? "Cargando..."
                : row.map((item, index) => (
                    <button
                      className="btnSelect"
                      key={index}
                      ref={(button) => addToArrayOfSelectedButtons(button)}
                      onClick={() => btnToSelectOptions(row)}
                    >
                      {item}
                    </button>
                  ))}
            </ReactSortable>
          </div>
        </div>
        <article className="container_col_val">
          <div className="containerHorizontal">
            <div className="containerR">
              Columnas
              <ReactSortable
                list={column}
                setList={setColumn}
                group={{ name: "selectedButton", pull: true }}
              >
                {!column
                  ? "Cargando..."
                  : column.map((item, index) => (
                      <button
                        className="btnSelect"
                        key={index}
                        ref={(button) => addToArrayOfSelectedButtons(button)}
                        onClick={() => btnToSelectOptions(column)}
                      >
                        {item}
                      </button>
                    ))}
              </ReactSortable>
            </div>
          </div>
          <div className="containerHorizontal">
            <div className="containerR">
              Valores
              <ReactSortable
                list={values}
                setList={setValues}
                group={{ name: "selectedButton", pull: true }}
              >
                {!values
                  ? "Cargando..."
                  : values.map((item, index) => (
                      <button
                        className="btnSelect"
                        key={index}
                        ref={(button) => addToArrayOfSelectedButtons(button)}
                      >
                        {item}
                      </button>
                    ))}
              </ReactSortable>
            </div>
          </div>
        </article>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onAfterOpen={afterOpenModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false} /*Esto no se recomienda hacer, revisar doc*/
        >
          <div className="containerModal">
            <h5 className="title" ref={(_subtitle) => (subtitle = _subtitle)}>
              Hola
            </h5>
            <Icon
              icon="mdi:close-circle-outline"
              className="close"
              onClick={closeModal}
            />
            {/* <Checkbox state={dataCheck}></Checkbox> */}
            <div>
              <form action="">
                <input
                  type="search"
                  value={search}
                  //value={search == null ? "" : search}
                  onChange={handleChangeSearch}
                />
                <br />
                <label htmlFor="">Seleccionar Todo</label>
                <input name="selectAll" type="checkbox" />
                <div className="result">
                  {dataCheck.length === 0 ? (
                    <p>Cargando...</p>
                  ) : (
                    dataCheck.map((el, i) => {
                      return (
                        <div key={i}>
                          <input
                            name={el}
                            type="checkbox"
                            value={el}
                            onChange={handleSelect}
                          />
                          <label htmlFor="">{el}</label>
                        </div>
                      );
                    })
                  )}
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </section>
      <section>
        <ButtonApp name="Generar Reporte" onClick={generateReport} />
      </section>
    </div>
  );
};
export default Container;
