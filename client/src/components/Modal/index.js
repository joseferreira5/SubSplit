import React from 'react';
import './style.css';

const Modal = ({ handleClose, title, show, children, handleSubmit }) => {
  const showHideClassname = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassname} tabindex='-1' role='dialog'>
      <div className='model-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-title text-center'>
            <h2>{title}</h2>
          </div>
          <div className='modal-body'>{children}</div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={handleClose}>
              Close
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
