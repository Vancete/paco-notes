import React, { useState, useEffect } from "react";
import "./styles.scss";

import Header from "../../components/Header";
import Note from "../../components/Note";
import Modal from "../../components/Modal";
import { apiGetNotes, apiUpsertNote } from "../../actions";

const Notes = () => {
  const [modal, setModal] = useState(false);
  const [textNote, setTextNote] = useState(false);
  const [notesArray, setNotesArray] = useState([]);
  const [noteId, setNoteId] = useState(null);

  const getNotesAction = () => {
    apiGetNotes().then((res) => {
      setNotesArray(res.data.data);
    });
  };

  const getUpsertNoteAction = (text, noteId = null) => {
    apiUpsertNote(text, noteId).then((res) => {
      if (res.data.success) {
        setModal(!modal);
        getNotesAction();
      }
    });
  };

  const editNote = (text, noteId = null) => {
    setModal(!modal);
    setTextNote(text);
    setNoteId(noteId);
  };

  useEffect(() => {
    getNotesAction();
  }, []);

  return (
    <div className="notes">
      {modal && (
        <Modal
          textNote={textNote}
          upsertNote={getUpsertNoteAction}
          noteId={noteId}
          setModal={setModal}
        />
      )}
      <Header editNote={editNote} />
      <div className="notes-body">
        <div className="notes-content">
          {notesArray.map((item) => (
            <Note note={item} editNote={editNote} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
