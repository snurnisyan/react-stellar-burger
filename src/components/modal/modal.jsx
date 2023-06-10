import React from "react";
import styles from "../modal/modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function Modal({ header, children, onModalClose}) {
  const onClose = (evt) => {
    evt.stopPropagation();
    onModalClose();
  }
  return (
    <div className={styles.popup + " pt-10 pl-10 pr-10 pb-15"}>
      <div className={styles.headerContainer}>
        <h2 className="text text_type_main-large">{header}</h2>
        <button className={styles.closeButton + " "} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
      </div>
      {children}
    </div>
  )
}
