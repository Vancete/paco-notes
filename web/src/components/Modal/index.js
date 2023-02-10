import React from "react";
import "./styles.scss";

const Modal = () => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <label>Nueva nota</label>
          <button>GUARDAR</button>
        </div>
        <textarea className="modal-note" placeholder="..."></textarea>
      </div>
      <div className="colors">
        <button className="color-wh"></button>
        <button className="color-yl"></button>
        <button className="color-mg"></button>
        <button className="color-bl"></button>
      </div>
    </div>
  );
};

export default Modal;
