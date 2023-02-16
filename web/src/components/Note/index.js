import React from "react";
import "./styles.scss";

const Note = ({ note, editNote }) => {
  return (
    <div
      className="note"
      id={note.note_id}
      date={note.date}
      onClick={() => editNote(note.text, note.note_id)}
    >
      {note.text}
    </div>
  );
};

export default Note;
