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