import React, { useState } from "react";
import "./styles.scss";

const Modal = ({ viewModal, textNote, editMode }) => {
  const [colorNote, setColorNote] = useState("wh");

  const changeColorNote = (e) => {
    const newColor = e.target.className.slice(-2);
    setColorNote(newColor);
  };

  return (
    <div className="modal" id="modal" onClick={viewModal}>
      <div className="modal-content">
        <div className="modal-header">
          <label>{editMode ? "Editar Nota" : "Nueva nota"}</label>
          <button>GUARDAR</button>
        </div>
        <textarea className={`modal-note ${colorNote}`} placeholder="...">
          {textNote ? textNote : ""}
        </textarea>
      </div>
      <div className="colors">
        <button className="color-wh" onClick={changeColorNote}></button>
        <button className="color-yl" onClick={changeColorNote}></button>
        <button className="color-mg" onClick={changeColorNote}></button>
        <button className="color-bl" onClick={changeColorNote}></button>
      </div>
    </div>
  );
};

export default Modal;
