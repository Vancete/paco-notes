import axios from "axios";
import config from "../config";

const apiLogin = (username, password) => {
  return axios.get(
    `${config.API_BASE}/login?user=${username}&password=${password}`
  );
};

const apiRegister = (username, email, password) => {
  return axios.get(
    `${config.API_BASE}/register?user=${username}&email=${email}&password=${password}`
  );
};

const apiGetNotes = () => {
  const userId = localStorage.getItem("userId");
  return axios.get(`${config.API_BASE}/get-notes?user_id=${userId}`);
};

const apiUpsertNote = (text, noteId = null) => {
  const userId = localStorage.getItem("userId");
  return axios.get(
    `${config.API_BASE}/upsert-note?user_id=${userId}&text=${text}${
      noteId ? `&note_id=${noteId}` : ""
    }`
  );
};

export { apiLogin, apiRegister, apiGetNotes, apiUpsertNote };
