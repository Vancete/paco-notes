import React, { useState } from "react";
import "../../containers/UserAuth/styles.scss";

import { apiRegister } from "../../actions";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
      {password !== repassword ? (
        <label>Las contraseñas no coinciden</label>
      ) : (
        ""
      )}
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (password === repassword) {
            apiRegister(username, email, password)
              .then((response) => {
                console.log(response);
                if (response.data.success) {
                  navigate("/login");
                } else {
                  setError(true);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            setError(true);
          }
        }}
      >
        Registro
      </button>
      {error && <label>Registro Incorrecto</label>}
    </>
  );
};

export default Register;
