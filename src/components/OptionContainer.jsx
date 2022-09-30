import React from 'react';
import '../assets/styles/OptionContainer.css';

const OptionContainer = () => {
  return (
    <section className='itemsSelected'>
      <div className='rows'>
        Filas
        <div>
          <button className='btnSelect'>empresa</button>
        </div>
      </div>
      <article className='container_col_val'>
        <div className='columns'>Columnas</div>
        <div className='values'>Valores</div>
      </article>
      <button className='generateReport'>Generar <br /> Reporte</button>
    </section>
  )
}

export default OptionContainer;