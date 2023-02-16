import React from "react";
import "./styles.scss";

const Header = ({ editNote }) => {
  return (
    <div className="header">
      <div className="logo">PN</div>
      <input className="search" type="text" placeholder="Buscar..." />
      <div className="add" id="addNote" onClick={() => editNote("")}>
        +
      </div>
      <div className="avatar">PA</div>
    </div>
  );
};

export default Header;
