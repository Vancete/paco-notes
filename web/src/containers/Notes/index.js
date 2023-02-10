import React from "react";
import "./styles.scss";

import Header from "../../components/Header";
import Note from "../../components/Note";

const Notes = () => {
  return (
    <div className="notes">
      <Header />
      <div className="notes-body">
        <div className="notes-content"></div>
        <Note />
      </div>
    </div>
  );
};

export default Notes;
