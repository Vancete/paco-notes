import React, { useState } from "react";
import "./styles.scss";
import Header from "../../components/Header";
import Note from "../../components/Note";
import Modal from "../../components/Modal";

const Notes = () => {
  const [modal, setModal] = useState(false);
  const [textNote, setTextNote] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const viewModal = (e) => {
    if (e.target.id === "modal" || e.target.id === "addNote") {
      setModal(!modal);
      setTextNote(false);
      setEditMode(false);
    }
  };

  const editNote = (e) => {
    setModal(!modal);
    setTextNote(e.target.textContent);
    setEditMode(true);
  };

  return (
    <div className="notes">
      {modal && (
        <Modal viewModal={viewModal} textNote={textNote} editMode={editMode} />
      )}
      <Header viewModal={viewModal} />
      <div className="notes-body">
        <div className="notes-content">
          <Note editNote={editNote} />
        </div>
      </div>
    </div>
  );
};

export default Notes;
