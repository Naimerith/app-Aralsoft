import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Icon } from "@iconify/react";
import {
  consultValuesInTheApi,
  getArrObject,
  getTheValueOfSelectedButton,
} from "../Functions/functions";
import { useNavigate } from "react-router-dom";
import { addCollectionResult } from "../Firebase/firebase.config";
import { alertSuccess } from "../Functions/sweetAlert";
import ButtonApp from "./ButtonApp";
import Modal from "react-modal";
import "../assets/styles/Container.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "30%",
    width: "20%",
    padding: "0",
  },
};
const Container = () => {
  let subtitle;
  let ArrayOfSelectedButtons = [];
  let arrayOfValues = [];
  const arrayRow = [];
  const arrayColumn = [];
  const arrayValue = [];
  const navigate = useNavigate();
  const [disabledBtn, setDisableBtn] = useState(false);
  const [row, setRow] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataCheck, setDataCheck] = useState([]);
  console.log(dataCheck);

  const addToArrayOfSelectedButtons = (button) => {
    if (button != null) {
      ArrayOfSelectedButtons.push(button.textContent);
    }
    return ArrayOfSelectedButtons;
  };

  const consultValues = async () => {
    const consultApiSelectionRow = await consultValuesInTheApi(
      ArrayOfSelectedButtons[0]
    );
    getTheValueOfSelectedButton(consultApiSelectionRow, arrayRow);
    const consultApiSelectionColumn = await consultValuesInTheApi(
      ArrayOfSelectedButtons[1]
    );
    getTheValueOfSelectedButton(consultApiSelectionColumn, arrayColumn);
    const consultApiSelectionValues = await consultValuesInTheApi(
      ArrayOfSelectedButtons[2]
    );
    getTheValueOfSelectedButton(consultApiSelectionValues, arrayValue);
    return getArrObject(arrayRow, arrayColumn, arrayValue);
  };

  const generateReport = async () => {
    if (disabledBtn) {
      return;
    }
    setDisableBtn(true);
    const objArray = await consultValues();
    const resultObjArray = [];
    objArray.forEach((el) => {
      const objectIndex = resultObjArray.findIndex(
        (obj) => obj.filas === el.filas && obj.columnas === el.columnas
      );
      if (objectIndex === -1) {
        resultObjArray.push(el);
      } else {
        resultObjArray[objectIndex].valores += el.valores;
      }
    });
    addCollectionResult(ArrayOfSelectedButtons, resultObjArray);
    alertSuccess("Reporte Generado satisfactoriamente");
    navigate("/report-generated");
  };

  const openModal = async () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#0e3a73";
  };

  const closeModal = () => {
    console.log("diste click a cerrar");
    setIsOpen(false);
  };

  const btnToSelectOptions = async (state) => {
    if (state === row) {
      const fila = state.toString();
      openModal();
      const resultApiRow = await consultValuesInTheApi(fila);
      resultApiRow.map((el) => {
        arrayOfValues.push(el[0][1]);
        const arrayChekbook = new Set(arrayOfValues);
        return setDataCheck(arrayChekbook);
      });
    } else {
      const columna = state.toString();
      openModal();
      const resultApiColumn = await consultValuesInTheApi(columna);
      resultApiColumn.map((el) => {
        arrayOfValues.push(el[0][1]);
        const arrayChekbook = new Set(arrayOfValues);
        return setDataCheck(arrayChekbook);
      });
    }
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
            <h5
              className="titletable"
              ref={(_subtitle) => (subtitle = _subtitle)}
            >
              Filtrar elementos
            </h5>
            <Icon
              icon="mdi:close-circle-outline"
              className="close"
              onClick={closeModal}
            />
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
