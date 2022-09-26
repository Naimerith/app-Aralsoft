import React, { useState } from 'react';
import Header from './Header';


const Sidebar = () => {

  const [active, setActive] = useState(false);

  return (
    <div>

      <div className={active ? 'sidebar-item active' : 'sidebar-item'}>
        <Header />
        <div className='goBack'>
          <span>
            <i class="bi bi-arrow-left-circle"></i>
            <a href='/'>Inicio</a>
          </span>
        </div>
        <br />
        <div className='sidebar-content'>
          <span>
            <i className="bi bi-columns-gap"></i>          Informes
          </span>
          <i className="bi bi-chevron-compact-right" onClick={() => setActive(!active)}></i>
        </div>
        <div className='sidebar-subMenu'>
          <ul>
            <li>Avance de Ventas
              <br />
              <span>
                <i className="bi bi-folder-plus"></i>
                <a href='/new-report'>Crear Reporte</a>
              </span>
              <br />
              <span>
                <i className="bi bi-stickies"></i>
                <a href='/lists-report'>Lista de Reportes</a>
              </span>
            </li>
            <li>Configuración</li>
          </ul>
        </div>
        <div className='sidebar-content-static'  >
          <span>
            <i className="bi bi-columns-gap"></i>          Mantenimiento
          </span>
          <i className="bi bi-chevron-compact-right"></i>
        </div>
        <div className='sidebar-content-static'  >
          <span>
            <i className="bi bi-columns-gap"></i>          Procesos
          </span>
          <i className="bi bi-chevron-compact-right"></i>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;