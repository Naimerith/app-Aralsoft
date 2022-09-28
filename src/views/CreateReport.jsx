import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/CreateReport.css';

const CreateReport = () => {
  const [data, setData] = useState(null);

  const getData_api = async () => {
    const config = {
      method: 'get',
      url: 'http://148.102.54.82:8088/cubo/api/ventas?empresa=63&periodo=202202',
      headers: {
        'token': 'a2ca9ff273fd7a4c0b0dadce6d076524c28f6675d262acfa4738c90caa8b8f40'
      }
    };
    const response = await axios(config)
    const responseData = await response.data.data
    const arrOfArray = Object.entries(responseData);
    const arraOfKeys = Object.keys(arrOfArray[1][1])
    setData(arraOfKeys)
  }

  useEffect(() => {
    getData_api()
  }, [])

  return (
    <>
      <div className='container'>
        <div className='itemSelect'>
          {!data ? 'Cargando...' : data.map((el, index) => {
            return <button className='btnSelect' key={index}>{el}</button>
          })}
        </div>
        <section className='itemsSelected'>
          <div className='rows'>Filas</div>
          <article className='container_col_val'>
            <div className='columns'>Columnas</div>
            <div className='values'>Valores</div>
          </article>
        </section>
      </div>
    </>
  )
}

export default CreateReport;