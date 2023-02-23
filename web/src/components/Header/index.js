import React, { useState } from "react";
import "./styles.scss";

const Header = ({ editNote, search, setSearch, closeSession, user }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="header">
      <div className="logo">PN</div>
      <input
        className="search"
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="add" id="addNote" onClick={() => editNote("")}>
        +
      </div>
      <div className="avatar" onClick={() => setOpenMenu(!openMenu)}>
        {user && user[0].toUpperCase()}
        {openMenu && (
          <div className="menu">
            <label>{user}</label>
            <button onClick={closeSession}>Cerrar Sesión</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
