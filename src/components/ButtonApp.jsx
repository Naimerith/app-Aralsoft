import React from "react";
import "../assets/styles/ButtonApp.css";

const ButtonApp = ({ name, icon, onClick }) => {
  return (
    <button className="generateReport" onClick={onClick}>
      {icon}
      {name}
    </button>
  );
};

export default ButtonApp;
