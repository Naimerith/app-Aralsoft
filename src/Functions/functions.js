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

/*Extraemos solo el value de la api para la lista de checkbox*/
export const getTheValueOfSelectedButton = (getArr, newArr) => {
  getArr.map((el) => {
    return el.map((h) => {
      const arrayFinal = h[1];
      return newArr.push(arrayFinal);
    });
  });
  return newArr
}


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

/********************Lista de Check*********************************/
export const getValuesForCheckbox = (values, state) => {
  let arrayOfValues = [];
  values.map((el) => {
    arrayOfValues.push(el[0][1]);
    const arrayChekbook = [...new Set(arrayOfValues)];
    arrayChekbook.sort();
    return state(arrayChekbook);
  });
}


/********************Filtrar del Buscador*********************************/
/*export const filterData = (state, data, setState) => {
  const resSearch = state.filter((el) => {
    const convertDataToString = el?.toString() || "";
    if (convertDataToString.includes(data)) {
      return el;
    }
  });
  setState(resSearch);
};*/


export const filterData = (state, data, setState) => {
  if (data === '') {
    setState(state);
  } else {
    const lowerCaseData = data.toLowerCase();
    const lowerCaseState = state.map((el) => el.toLowerCase());
    const resSearch = lowerCaseState.filter((el) => {
      if (el.includes(lowerCaseData)) {
        return el;
      }

    });
    setState(resSearch);
  }
};





/*export const queryTheApiForAllElements = async (position) => {
  const resApi = await getData();
  const btnRow1 = position;
  const consultApiSelectionBtn = resApi.map((el) => {
    const convertObjectToArray = Object.entries(el);
    convertObjectToArray.filter((key) => key.includes(btnRow1));
    return convertObjectToArray;
  });
  let arrayOfValues = [];
  consultApiSelectionBtn.map((el) => {
    el.map((el) => {
      if (el.includes(btnRow1)) {
        arrayOfValues.push(el[1]);
      }
    });
  });
  const arrayChekbook = [...new Set(arrayOfValues)];
  arrayChekbook.sort();
  return arrayChekbook
};*/