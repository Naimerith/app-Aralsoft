import React from "react";

const SidebarItems = (props) => {
  return (
    <>
      <div className="sidebar-content-static">
        <span>
          {props.icon}
          <p className="sidebar-text">{props.title}</p>
        </span>
        <i className="bi bi-chevron-compact-right"></i>
      </div>
    </>
  );
};

export default SidebarItems;
