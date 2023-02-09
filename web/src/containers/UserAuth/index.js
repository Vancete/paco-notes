import React, { useState } from "react";
import "./styles.scss";

import Login from "../../components/Login";
import Register from "../../components/Register";

const UserAuth = () => {
  const [login, setLogin] = useState(true);

  const viewLogin = () => {
    setLogin(true);
  };

  const viewRegister = () => {
    setLogin(false);
  };

  return (
    <div className="user-auth">
      <div className="image"></div>
      <div className="form-container">
        <form className="form">
          <div className="links">
            <label className={login && "selected"} onClick={viewLogin}>
              Iniciar sesión
            </label>
            <label className={!login && "selected"} onClick={viewRegister}>
              Únete
            </label>
          </div>
          {login ? <Login /> : <Register viewLogin={viewLogin} />}
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
