import React, { useEffect, useState } from "react";
import { getData } from "../services/api_aralsoft";
import { getArrObjetc } from "../Functions/functions";
import { registerAllModules } from "handsontable/registry";

import "pikaday/css/pikaday.css";
import { HotTable, HotColumn } from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";


// register Handsontable's modules
registerAllModules();

const ListReport = () => {
  const data = [
    ["", "Tesla", "Volvo", "Toyota", "Ford"],
    ["2019", 10, 11, 12, 13],
    ["2020", 20, 11, 14, 13],
    ["2021", 30, 15, 12, 13],
  ];

  let array1 = [];
  let array2 = [];
  let array3 = [];

  const [dat, setDat] = useState([]);console.log(dat)

  const example = async () => {
    const api = await getData();
    const filtro = api.filter((el) => {
      const soles = el.soles;
      array1.push(soles);
      const proveedor = el.vendedor;
      array2.push(proveedor);
      const articulo = el.articulo;
      array3.push(articulo);
    });
    const res = getArrObjetc(array2, array3, array1);
    setDat(res);
  };

  useEffect(() => {
    example();
  }, []);

  return (
    <div>
      <h1>Probando la tabla aqui</h1>
       <HotTable
      data={data}
      height={450}
      colWidths={[140, 126, 192, 100, 100, 90, 90, 110, 97]}
      colHeaders={dat}
      dropdownMenu={true}
      hiddenColumns={{indicators: true}}
      contextMenu={true}
      multiColumnSorting={true}
      filters={true}
      rowHeaders={true}
      manualRowMove={true}
      licenseKey="non-commercial-and-evaluation"
    >
      <HotColumn data={1} />
      <HotColumn data={2} />
      <HotColumn data={3} />
      <HotColumn data={4} />
      <HotColumn data={5} />
      <HotColumn data={7}  />
      <HotColumn data={8} >
  
      </HotColumn>
      <HotColumn data={9}>
       
      </HotColumn>
    </HotTable>
    </div>
  );
};

export default ListReport;
