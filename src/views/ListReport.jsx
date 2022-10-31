import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { db } from "../Firebase/firebase.config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "../assets/styles/ListReport.css";

const ListReport = () => {
  const tables = [];
  const [listTable, setListTable] = useState([]);

  const listTables = async () => {
    const querySnapshot = await getDocs(collection(db, "tables"));
    querySnapshot.forEach((doc) => {
      console.log("id", doc.id);
      const date = doc.data().fecha;
      const newDate = new Date(date);
      const converteDate = newDate.toLocaleString();
      tables.push({
        ...doc.data(),
        id: doc.id,
        fecha: converteDate,
      });
      return setListTable(tables);
    });
  };
  const deleteReport = async () => {
    console.log("eliminar reporte");
  };

  useEffect(() => {
    listTables();
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
              <p className="dateTable">fecha de creación:{el.fecha}</p>
              <div className="icons-bottoms">
                <Icon icon="ant-design:folder-open-outlined" />
                <Icon icon="akar-icons:edit" />
                <Icon
                  icon="ant-design:delete-outlined"
                  onClick={deleteReport}
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
