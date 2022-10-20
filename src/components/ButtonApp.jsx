import React from "react";
import "../assets/styles/ButtonApp.css";

const ButtonApp = ({ name, icon, onClick }) => {
  return (
    <button className="generateReport" onClick={onClick}>
      {/* <a href={"/report-generated"}> */}
      {icon}
      {name}
      {/* </a> */}
    </button>
  );
};

export default ButtonApp;
