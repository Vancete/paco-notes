import React, { useState } from "react";
import "../../containers/UserAuth/styles.scss";

import { apiRegister } from "../../actions";
import { useNavigate } from "react-router-dom";

const Register = ({ viewLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const registerAction = (e) => {
    e.preventDefault();
    apiRegister(username, email, password)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          viewLogin();
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
        placeholder="Nombre de usuario"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="text"
        id="email"
        placeholder="Dirección de correo electrónico"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        id="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <input
        type="password"
        id="repeat-password"
        placeholder="Repetir contraseña"
        onChange={(e) => setRepassword(e.target.value)}
      ></input>
      {password !== repassword && <label>Las contraseñas no coinciden</label>}
      <button
        type="submit"
        onClick={(e) => {
          registerAction(e);
        }}
        disabled={!password || password !== repassword}
      >
        Registro
      </button>
      {error && <label>Registro Incorrecto</label>}
    </>
  );
};

export default Register;
