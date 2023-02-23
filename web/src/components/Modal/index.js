import React, { useState } from "react";
import "./styles.scss";

const Modal = ({ textNote, upsertNote, deleteNote, noteId, setModal }) => {
  const [colorNote, setColorNote] = useState("wh");
  const [text, setText] = useState(textNote || "");

  const changeColorNote = (e) => {
    const newColor = e.target.className.slice(-2);
    setColorNote(newColor);
  };

  const closeModal = (e) => {
    if (e.target.className === "modal") {
      setModal(false);
    }
  };

  return (
    <div className="modal" onClick={(e) => closeModal(e)}>
      <div className="modal-content">
        <div className="modal-header">
          <label>{noteId ? "Editar Nota" : "Nueva nota"}</label>
          <button onClick={() => upsertNote(text, noteId)}>GUARDAR</button>
        </div>
        <textarea
          className={`modal-note ${colorNote}`}
          placeholder="..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
        <button className="modal-delete" onClick={() => deleteNote(noteId)}>
          Eliminar Nota
        </button>
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
