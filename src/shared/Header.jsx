import React, { useState } from "react";
import Logo from "../assets/img/logo.png";
import Sidebar from "../components/Sidebar.jsx";

import "../assets/styles/Header.css";
import ButtonHamburger from "../components/ButtonHamburger";

const Header = () => {
  const [menu, setMenu] = useState(true);

  const handleClick = () => {
    setMenu(!menu);
  };

  return (
    <div>
      <div className="navbar">
        <div className="BtnMenuHamburger">
          <ButtonHamburger click={menu} handleClick={handleClick} />
        </div>
        <img className="navbar-nav flex-end center" src={Logo} alt="logo" />
      </div>
      <div className={`sidebar ${menu ? "active" : "inactive"}`}>
        <Sidebar />
      </div>
    </div>
  );
};

export default Header;
