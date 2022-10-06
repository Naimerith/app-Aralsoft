import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/ButtonContainer.css';
import { ReactSortable } from "react-sortablejs";

const ButtonContainer = () => {
  const [data, setData] = useState([]);
  const [valueBtn, setValueBtn] = useState(null)

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
    const arraOfKeys = Object.keys(arrOfArray[0][1]);
    //console.log(arraOfKeys)
    setData(arraOfKeys)
  }

  const valueButton = (e) => {
    const resultValue = e.target.innerHTML;
    setValueBtn(resultValue)
  }

  useEffect(() => {
    getData_api()
  }, [])
  return (
    <div className='container'>
      <div className='itemSelect'>
        <ReactSortable
          tag="div"
          list={data}
          setList={setData}
          group="groupName"
          animation={150}
          sort={false}
          pull="clone"
        >
          {!data ? 'Cargando...' : data.map((item, index) => (
            <button className='btnSelect'
              key={index} onClick={valueButton}>{item}</button>
          ))}
        </ReactSortable>
      </div>
    </div>
  )
}

export default ButtonContainer;