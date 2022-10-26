import React, { useEffect } from "react";
import { getData } from "../services/api_aralsoft";
import { getArrObject } from "../Functions/functions";

const ListReport = () => {
  let array1 = [];
  let array2 = [];
  let array3 = [];

  const example = async () => {
    const api = await getData();
    const filter = api.filter((el) => {
      array1.push(el.soles);
      array2.push(el.proveedor);
      array3.push(el.codZona);
    });
    console.log("aquiii", getArrObject(array2, array3, array1));
  };

  useEffect(() => {
    console.log("aquiii", example());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Probando la tabla aqui</h1>
    </div>
  );
};

export default ListReport;
