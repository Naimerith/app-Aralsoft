import React from "react";
import "../assets/styles/ButtonHamburger.css";

const ButtonHamburger = (props) => {
  return (
    <div
      className={`icon nav-icon-5 ${props.click ? "open" : ""}`}
      onClick={props.handleClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default ButtonHamburger;
