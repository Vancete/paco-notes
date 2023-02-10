import React, { useState } from "react";
import "./styles.scss";

import Header from "../../components/Header";
import Note from "../../components/Note";
import Modal from "../../components/Modal";

const Notes = () => {
  const [modal, setModal] = useState(false);

  const viewModal = () => {
    setModal(!modal);
  };

  return (
    <div className="notes" onClick={viewModal}>
      {modal && <Modal />}
      <Header viewModal={viewModal} />
      <div className="notes-body">
        <div className="notes-content">
          <Note />
        </div>
      </div>
    </div>
  );
};

export default Notes;
