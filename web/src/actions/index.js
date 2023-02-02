import axios from "axios";
import config from "../config";

const apiLogin = (username, password) => {
  return axios.get(
    `${config.API_BASE}/login?user=${username}&password=${password}`
  );
};

export { apiLogin };
