import React, { useState } from "react";
import "../../containers/UserAuth/styles.scss";

import { apiLogin } from "../../actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const loginAction = (e) => {
    e.preventDefault();
    apiLogin(username, password)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          localStorage.setItem("userId", response.data.user_id);
          navigate("/notes");
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <input
        type="text"
        id="user"
        placeholder="Usuario o dirección de correo electrónico"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="password"
        id="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button
        type="submit"
        onClick={(e) => {
          loginAction(e);
        }}
      >
        Iniciar sesión
      </button>
      {error && <label>Inicio de sesión incorrecto</label>}
    </>
  );
};

export default Login;
