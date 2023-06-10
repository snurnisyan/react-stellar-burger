import React from "react";
import styles from "../modal-overlay/modal-overlay.module.css";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");
export default function ModalOverlay({ opened, onModalClose, children }) {

  let className = '';

  const setClassName = () => {
    if (!opened) {
      className = styles.overlay;
      return className;
    } else {
      className = `${styles.overlay} ${styles.overlay_opened}`;
      return className;
    }
  }

  function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      onModalClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    }
  }, []);

  function closeFromOutside(evt) {
    if (evt.target.classList.contains(styles.overlay)) {
      onClose(evt);
    }
  }

  const onClose = (evt) => {
    evt.stopPropagation();
    onModalClose();
  }


  return ReactDOM.createPortal(
  (
    <div className={setClassName()} onClick={closeFromOutside}>
      {children}
    </div>
  ), modalRoot)
}
