import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getCollectionTables, deleteReport } from "../Firebase/firebase.config";
import "../assets/styles/ListReport.css";

const ListReport = () => {
  const [listTable, setListTable] = useState([]);

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
        <p></p>
      </div>
    </div>
  );
};

export default ListReport;
