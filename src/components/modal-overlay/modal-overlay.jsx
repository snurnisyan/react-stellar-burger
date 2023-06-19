import React, { useEffect } from "react";
import styles from "../modal-overlay/modal-overlay.module.css";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {modalRoot} from "../../utils/constans";

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

  useEffect(() => {
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


  return (
    <div className={setClassName()} onClick={closeFromOutside}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  opened: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onModalClose: PropTypes.func.isRequired
}
