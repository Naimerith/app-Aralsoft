import React from "react";
import "../assets/styles/ButtonApp.css";

const ButtonApp = ({ name, icon }) => {
  return (
    <button className="generateReport">
      {/* <a href={"/report-generated"}> */}
      {icon}
      {name}
      {/* </a> */}
    </button>
  );
};

export default ButtonApp;
