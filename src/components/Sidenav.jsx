import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Icon } from "@iconify/react";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../assets/styles/Sidenav.css";

const Sidenav = () => {
  return (
    <div>
      <SideNav>
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <a className="home" href="/">
                <Icon
                  icon="ant-design:home-outlined"
                  color="white"
                  height="22"
                />
              </a>
            </NavIcon>
            <NavText>
              <a className="home" href="/">
                Inicio
              </a>
            </NavText>
          </NavItem>
          <NavItem eventKey="charts">
            <NavIcon>
              <Icon icon="iconoir:report-columns" height="22" color="white" />
            </NavIcon>
            <NavText>Informes</NavText>
            <NavItem eventKey="charts/linechart">
              <NavText>
                <a href="/new-report">Crear Reporte</a>
              </NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
              <NavText>
                <a href="/lists-report">Lista de Reportes</a>
              </NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="charts">
            <NavIcon>
              <Icon
                icon="carbon:license-maintenance"
                height="22"
                color="white"
              />
            </NavIcon>
            <NavText>Mantenimiento</NavText>
          </NavItem>
          <NavItem eventKey="charts">
            <NavIcon>
              <Icon
                icon="fluent-mdl2:server-processes"
                height="22"
                color="white"
              />
            </NavIcon>
            <NavText>Procesos</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
};

export default Sidenav;
