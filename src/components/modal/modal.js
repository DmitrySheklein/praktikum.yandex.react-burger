import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modalOverlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");
const Modal = ({ children, headerTitle, visible }) => {
  const [isVisible, setIsVisible] = useState(visible || false);
  const onModalClick = () => {
    setIsVisible(!isVisible);
  };
  return ReactDOM.createPortal(
    isVisible ? (
      <div className={`${styles.modal} ${isVisible ? styles.show : ""}`}>
        <ModalOverlay clickHandler={onModalClick} />
        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <strong className={"text text_type_main-large"}>
              {headerTitle}
            </strong>
            <button
              className={`${styles.modalCloseBtn} reset-btn`}
              onClick={onModalClick}
            >
              <CloseIcon type="primary" />
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    ) : (
      <></>
    ),
    modalRoot
  );
};
export default Modal;
