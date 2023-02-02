import React, { useState } from "react";
import "./styles.scss";

import axios from "axios";
import config from "../../config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const apiLogin = () => {
    axios
      .get(`${config.API_BASE}/login?user=${username}&password=${password}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="image"></div>
      <div className="form-container">
        <form className="form">
          <div className="links">
            <label className="selected">Login</label>
            <label>Sign up</label>
          </div>
          <input
            type="text"
            id="user"
            placeholder="Email Adress"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              apiLogin();
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
