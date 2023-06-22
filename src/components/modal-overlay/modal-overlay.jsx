import React, {useEffect, useState} from "react";
import styles from "../modal-overlay/modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ opened, onModalClose, children }) {
  const [className, setClassName] = useState(`${styles.overlay}`);

  const createClassName = () => {
    if (!opened) {
      return `${styles.overlay}`;
    } else {
      return `${styles.overlay} ${styles.overlay_opened}`;
    }
  }

  function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      onModalClose();
    }
  }

  useEffect(() => {
    setClassName(createClassName());
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
    <div className={className} onClick={closeFromOutside}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  opened: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onModalClose: PropTypes.func.isRequired
}
