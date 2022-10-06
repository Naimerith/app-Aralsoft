import React from 'react';
import '../assets/styles/OptionContainer.css';

const OptionContainer = () => {

  return (
    <section className='itemsSelected'>
      <div className='rows'>
        Filas
        <h5>
      Boton en la posicion 
      </h5>
      </div>
      <article className='container_col_val'>
        <div className='columns'>Columnas</div>
        <div className='values'>Valores</div>
      </article>
    </section>
  )
}

export default OptionContainer;