import React, { useState } from "react";
import Logo from "../assets/img/logo.png";
import Sidenav from "../components/Sidenav.jsx";

import "../assets/styles/Header.css";

const Header = () => {
  return (
    <div>
      <Sidenav />
      <div className="header">
        <img className="logo" src={Logo} alt="logo" />
      </div>
    </div>
  );
};

export default Header;
