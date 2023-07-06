import React from "react";
import styles from "../modal/modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {modalRoot} from "../../utils/constans";
import ModalOverlay from "../modal-overlay/modal-overlay";
/*import { CSSTransition } from 'react-transition-group';*/


export default function Modal({ opened, header, children, onModalClose}) {
  const onClose = (evt) => {
    evt.stopPropagation();
    onModalClose();
  }

  if (!opened) return null;

  return ReactDOM.createPortal(
    (
      <ModalOverlay opened={opened} onModalClose={onModalClose}>
        <div className={styles.popup + " pt-10 pl-10 pr-10 pb-15"}>
          <div className={styles.header__container}>
            <h2 className="text text_type_main-large">{header}</h2>
            <button className={styles.close__button} onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </ModalOverlay>
  ), modalRoot)
}

Modal.propTypes = {
  opened: PropTypes.bool.isRequired,
  header: PropTypes.string,
  children: PropTypes.element.isRequired,
  onModalClose: PropTypes.func.isRequired
}
