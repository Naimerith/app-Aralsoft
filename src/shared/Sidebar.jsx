import React, { useState } from 'react';
import Header from './Header';
import { Icon } from '@iconify/react';
import FooterSidebar from '../components/FooterSidebar';

const Sidebar = () => {

  const [active, setActive] = useState(false);

  return (
    <div className={active ? 'sidebar-item active' : 'sidebar-item'}>
      <Header />
      <section className='userActive'>
        <span className='nameUserActive'>
          <Icon icon="carbon:user-avatar" width="35" height="35" />
          <p>Nombre Usuario</p>
        </span>
        <span className='emailUserActive'>
          <p>Email Usuario</p>
        </span>
      </section>
      <hr />
      <span className='goBack'>
        <i className="bi bi-arrow-left-circle"></i>
        <a href='/'>Inicio</a>
      </span>
      <br />
      <div className='sidebar-content' onClick={() => setActive(!active)}>
        <span>
          <Icon icon="iconoir:report-columns" height="22" />
          <p className='sidebar-text'>Informes</p>
        </span>
        <i className="bi bi-chevron-compact-right" ></i>
      </div>
      <div className='sidebar-subMenu'>
        <ul>
          <li >● Avance de Ventas </li>
          <ol>
            <li className='newReport'>
              <Icon icon="carbon:new-tab" height="20" width="18" />
              <a href='/new-report'>Crear Reporte</a>
            </li>
            <li className='listReport'>
              <Icon icon="fluent:collections-24-regular" height="22" width="22" inline={true} />
              <a href='/lists-report'>Lista de Reportes</a>
            </li>
          </ol>
          <li className='config'>● Configuración</li>
        </ul>
      </div>
      <div className='sidebar-content-static'  >
        <span>
          <Icon icon="carbon:license-maintenance" height="22" />
          <p className='sidebar-text'>Mantenimiento</p>
        </span>
        <i className="bi bi-chevron-compact-right" ></i>
      </div>
      <div className='sidebar-content-static'  >
        <span>
          <Icon icon="codicon:server-process" height="22" />
          <p className='sidebar-text'>Procesos</p>
        </span>
        <i className="bi bi-chevron-compact-right" ></i>
      </div>
      <FooterSidebar
        title='Cerrar Sesión'
        icon={<Icon icon="tabler:logout" inline={true} />}
      />
      <FooterSidebar
        title='Settings'
        icon={<Icon icon="ep:setting" inline={true} />}
      />
      <FooterSidebar
        title='Help & feedback'
        icon={<Icon icon="ic:baseline-help-outline" inline={true} />}
      />
    </div>
  )
}

export default Sidebar;