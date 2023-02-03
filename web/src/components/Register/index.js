import React, { useState } from "react";
import "./styles.scss";

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
    <div className="register">
      <div className="image"></div>
      <div className="form-container">
        <form className="form">
          <div className="links">
            <label>Login</label>
            <label className="selected">Sign up</label>
          </div>
          <input
            type="text"
            id="user"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="text"
            id="email"
            placeholder="Email Adress"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            type="password"
            id="repeat-password"
            placeholder="Repeat Password"
            onChange={(e) => setRepassword(e.target.value)}
          ></input>
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
            Registrar
          </button>
          {error && <label>Registro Incorrecto</label>}
        </form>
      </div>
    </div>
  );
};

export default Register;
