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

export const getArrObjetc = (arrProveedor, arrProductos, arrSoles) => {
  let arr = [];
  for (let i in arrProveedor) {
    arr.push({
      proveedor: arrProveedor[i],
      producto: arrProductos[i],
      soles: arrSoles[i],
    });
  }
  return arr;
};