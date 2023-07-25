import React, {MouseEvent, ReactElement} from "react";
import styles from "../modal/modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import {modalRoot} from "../../utils/constans";
import ModalOverlay from "../modal-overlay/modal-overlay";

type TModalProps = {
  opened: boolean;
  header?: string;
  children: ReactElement;
  onModalClose: () => void;
  headerClassName?: string;
}

export default function Modal({ opened, header, children, onModalClose, headerClassName}: TModalProps): ReactElement | null {
  const onClose = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    onModalClose();
  }

  if (!opened) return null;
  if (modalRoot === null) return null;

  headerClassName = headerClassName || "text text_type_main-large";

  return ReactDOM.createPortal(
    (
      <ModalOverlay opened={opened} onModalClose={onModalClose}>
        <div className={styles.popup + " pt-10 pl-10 pr-10 pb-15"}>
          <div className={styles.header__container}>
            <h2 className={headerClassName}>{header}</h2>
            <button className={styles.close__button} onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </ModalOverlay>
  ), modalRoot)
}
