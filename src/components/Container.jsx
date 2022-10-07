import React from "react";
import "../assets/styles/Container.css";

const Container = ({ active, onClick, name }) => {
  return (
    <div className={`containerR ${active ? "active" : ""}`} onClick={onClick}>
      {name}
    </div>
  );
};

export default Container;
