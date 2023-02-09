import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import UserAuth from "./containers/UserAuth";
import Notes from "./containers/Notes";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<UserAuth />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
