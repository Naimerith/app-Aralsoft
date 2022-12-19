import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  getCollectionTables,
  deleteReportFb,
  getReport,
  colRef,
  db,
} from "../Firebase/firebase.config";
import { getDocs, query, orderBy, collection } from "firebase/firestore";
import { getCollectionDataForTheTable } from "../Functions/functions";
import Modal from "react-modal";
import Table from "../components/Table";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "../assets/styles/ListReport.css";

const MySwal = withReactContent(Swal);
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "60%",
    width: "70%",
  },
};

const ListReport = () => {
  let subtitle;
  const [listTable, setListTable] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [report, setReport] = useState([]);

  console.log(listTable);

  const deleteReport = async (id) => {
    MySwal.fire({
      title: "Está seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#038c33",
      cancelButtonColor: "#d33",
      iconColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReportFb(id);
        getCollectionTables(setListTable);
        MySwal.fire("Eliminado!", "Su reporte ha sido eliminado.", "success");
      }
    });
  };

  const openReport = async (id) => {
    return await getReport(id);
  };

  const openModal = async (id) => {
    const reportselected = await openReport(id);
    setReport(reportselected.report);
    setData(reportselected.consultApi);
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#0e3a73";
  };

  const closeModal = () => {
    console.log("diste click a cerrar");
    setIsOpen(false);
  };

  const seeReport = getCollectionDataForTheTable(data);

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
              <p className="dateTable">Creado el: {el.fechaReport}</p>
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
          <div className="containerModal">
            <h5
              className="titletable"
              ref={(_subtitle) => (subtitle = _subtitle)}
            >
              Reporte de Ventas
            </h5>
            <div className="relationshipReport">
              Relación:
              {report.map((el, i) => (
                <p className="textRelationshipReport" key={i}>
                  {el}
                </p>
              ))}
            </div>
            <Icon
              icon="mdi:close-circle-outline"
              className="close"
              onClick={closeModal}
            />
            <Table table={seeReport} id={"download-saved-report"}></Table>
            <ReactHTMLTableToExcel
              id="download-saved-report"
              className="generateReport"
              table="download-saved-report"
              filename="table"
              sheet="report"
              buttonText="⇯ Exportar"
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ListReport;
