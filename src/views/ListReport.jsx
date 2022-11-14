import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  getCollectionTables,
  deleteReportFb,
  getReport,
} from "../Firebase/firebase.config";
import "../assets/styles/ListReport.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ListReport = () => {
  let subtitle;

  const [listTable, setListTable] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const deleteReport = async (id) => {
    await deleteReportFb(id);
    getCollectionTables(setListTable);
  };

  const openReport = async (id) => {
    return await getReport(id);
  };

  const openModal = async (id) => {
    console.log("clikckckc");
    const hola = await openReport(id);
    console.log("525452545255", hola);
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    console.log("diste click a cerrar");
    setIsOpen(false);
  };

  useEffect(() => {
    getCollectionTables(setListTable);
  }, []);

  return (
    <div className="container-ListReport">
      <p className="successMsg">Lista de Reportes Guardados </p>
      <div className="container-Report">
        {listTable.map((el) => {
          return (
            <div className="report" key={el.id}>
              <Icon
                icon="icon-park-outline:table-report"
                width={50}
                height={50}
                color="#0e3a73"
              />
              <p className="dateTable">Creado el: {el.fecha}</p>
              <div className="icons-bottoms">
                <Icon
                  icon="ant-design:folder-open-outlined"
                  color="#0e3a73"
                  cursor="pointer"
                  onClick={() => {
                    openModal(el.id);
                  }}
                />
                <Icon icon="akar-icons:edit" color="#0e3a73" cursor="pointer" />
                <Icon
                  icon="ant-design:delete-outlined"
                  color="#0e3a73"
                  cursor="pointer"
                  onClick={() => {
                    deleteReport(el.id);
                  }}
                />
              </div>
            </div>
          );
        })}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onAfterOpen={afterOpenModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false} /*Esto no se recomienda hacer, revisar doc*/
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>Aqui va la tabla</div>
          <button>Descargar Reporte</button>
        </Modal>
      </div>
    </div>
  );
};

export default ListReport;
