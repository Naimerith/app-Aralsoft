import React from 'react';
import axios from 'axios';

const ButtonGenerateReport = () => {
  

  const hola =async () => {
    console.log('hola nai')
    const config = {
      method: 'get',
      url: 'http://148.102.54.82:8088/cubo/api/ventas?empresa=63&periodo=202202',
      headers: {
        'token': 'a2ca9ff273fd7a4c0b0dadce6d076524c28f6675d262acfa4738c90caa8b8f40'
      }
    };
    const response = await axios(config)
    const responseData = await response.data.data
    console.log(responseData);
   
  }

  return (
    <div className='container'>
      <button className='generateReport' onClick={hola}>
        <a href={'/report-generated'}>Generar <br /> Reporte</a>
      </button>
    </div>
  )
}

export default ButtonGenerateReport;