import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  const handleBackdropClick = () => {
    props.onHideCart();
  };

  return <div className={classes.backdrop} onClick={handleBackdropClick} />;
};

const ModalOverlay = (props) => {
  return (
      <div className={classes.modal}>
        <div className={classes.content}>
          <div className={classes.scrollableContent}>{props.children}</div>
        </div>
    </div>
  );
};
const Modal = (props) => {

    const portalElement = document.getElementById('overlays');

    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </React.Fragment>
    )
}

export default Modal;