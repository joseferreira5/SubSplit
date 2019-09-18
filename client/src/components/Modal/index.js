import React from "react";
import "./style.css";


const Modal = ({ handleClose, show, children, handleSubmit }) => {

    const showHideClassname = show ? "modal display-block" : "modal display-none";
    
    return (
        <div className={showHideClassname}>
          <section className="modal-main rounded">
            {children}
            <button onClick={handleClose} className = "rounded mb-2 ml-2">close</button>
            <button onClick={handleSubmit}>submit</button>
          </section>
        </div>
      );
}

export default Modal;