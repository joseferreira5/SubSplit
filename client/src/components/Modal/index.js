import React from "react";
import "./style.css";


const Modal = ({ handleClose, show, children }) => {
    console.log(show)
    const showHideClassname = show ? "modal display-block" : "modal display-none";
    console.log(showHideClassname)
    return (
        <div className={showHideClassname}>
          <section className="modal-main">
            {children}
            <button onClick={handleClose}>close</button>
          </section>
        </div>
      );
}

export default Modal;