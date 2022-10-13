import React from "react";
import "../assets/styles/Container.css";

const Container = ({ active, onClick, name, value }) => {
  return (
    <div className={`containerR ${active ? "active" : ""}`} onClick={onClick}>
      {name}
      <p>{value}</p>
    </div>
  );
};

export default Container;
