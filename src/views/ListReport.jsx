import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { db } from "../Firebase/firebase.config";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import "../assets/styles/ListReport.css";

const ListReport = () => {
  const [listTable, setListTable] = useState([]);

  const listTables = async () => {
    const tables = [];
    const querySnapshot = await getDocs(collection(db, "tables"));
    querySnapshot.forEach((doc) => {
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
  const deleteReport = async (id) => {
    const colRef = collection(db, "tables");
    await deleteDoc(doc(colRef, id));
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
              <p className="dateTable">Creado el: {el.fecha}</p>
              <div className="icons-bottoms">
                <Icon icon="ant-design:folder-open-outlined" />
                <Icon icon="akar-icons:edit" />
                <Icon
                  icon="ant-design:delete-outlined"
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
