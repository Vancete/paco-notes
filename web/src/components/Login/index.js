import React, { useState } from "react";
import "./styles.scss";

import { apiLogin } from "../../actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
            }}
          >
            Login
          </button>
          {error && <label>Login Incorrecto</label>}
        </form>
      </div>
    </div>
  );
};

export default Login;
