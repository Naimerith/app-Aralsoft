import { getData } from "../services/api_aralsoft";

/*Consulta la api y obtiene los valores dependiendo del boton ingresado en cada contenedor */
export const consultValuesInTheApi = async (position) => {
  const resApi = await getData();
  const consultApiSelectionBtn = resApi.map((el) => {
    const convertObjectToArray = Object.entries(el);
    return convertObjectToArray.filter((key) =>
      key.includes(position)
    );
  });
  return consultApiSelectionBtn;
}

/*Extraemos solo el value de la api*/
export const getTheValueOfSelectedButton = (getArr, newArr) => {
  getArr.map((el) => {
    return el.map((h) => {
      const arrayFinal = h[1];
      return newArr.push(arrayFinal);
    });
  });
  return newArr
}

/*Crea un objeto con el resultado obtenidos para la fila, la columna y el campo valores */
export const getArrObject = (arrRow, arrColumn, arrValue) => {
  let arr = [];
  for (let i in arrRow) {
    arr.push({
      filas: arrRow[i],
      columnas: arrColumn[i],
      valores: arrValue[i],
    });
  }
  return arr;
};

/*Pintamos los datos guardados en la colección dentro de la tabla  */
export const getCollectionDataForTheTable = (state) => {
  const addValuesToTheTable = state.reduce(
    (acc, data) => {
      if (!acc.filas.includes(data.filas)) {
        acc.filas.push(data.filas);
      }
      if (!acc.columnas.includes(data.columnas)) {
        acc.columnas.push(data.columnas);
      }
      const idxFila = acc.filas.indexOf(data.filas);
      const idxColumna = acc.columnas.indexOf(data.columnas);
      acc.data[idxFila] = acc.data[idxFila] || [data.filas];
      acc.data[idxFila][idxColumna] = data.valores;
      return acc;
    },
    {
      filas: [null],
      columnas: [null],
      data: [],
    }
  );
  return addValuesToTheTable;
}


