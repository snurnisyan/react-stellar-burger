import React, {MouseEvent, ReactElement, useEffect, useState} from "react";
import styles from "../modal-overlay/modal-overlay.module.css";

type TModalProps = {
  opened: boolean;
  onModalClose: () => void;
  children: ReactElement;
}

export default function ModalOverlay({ opened, onModalClose, children }: TModalProps): ReactElement {
  const [className, setClassName] = useState<string>(`${styles.overlay}`);

  const createClassName = () => {
    if (!opened) {
      return `${styles.overlay}`;
    } else {
      return `${styles.overlay} ${styles.overlay_opened}`;
    }
  }

  function closeByEsc(evt: KeyboardEvent) {
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

  function closeFromOutside(evt: MouseEvent<HTMLElement>) {
    const classList = (evt.target as Element).classList;
    if (classList.contains(styles.overlay)) {
      onClose(evt);
    }
  }

  const onClose = (evt: MouseEvent<HTMLElement>) => {
    evt.stopPropagation();
    onModalClose();
  }


  return (
    <div className={className} onClick={closeFromOutside}>
      {children}
    </div>
  )
}
