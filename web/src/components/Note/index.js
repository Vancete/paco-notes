import React, { useState, useEffect } from "react";
import { apiGetNotes } from "../../actions/index";
import "./styles.scss";

const Note = ({ editNote }) => {
  const [notesArray, setNotesArray] = useState([]);
  useEffect(() => {
    apiGetNotes().then((res) => {
      setNotesArray(res.data.data);
    });
  }, []);

  return notesArray.map((note) => {
    return (
      <div
        className="note"
        id={note.note_id}
        date={note.date}
        onClick={editNote}
      >
        {note.text}
      </div>
    );
  });
};

export default Note;
