import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");
const Modal = ({ children, headerTitle, visible, setStatedOrder }) => {
  return ReactDOM.createPortal(
    visible ? (
      <div className={`${styles.modal} ${visible ? styles.show : ""}`}>
        <ModalOverlay
          clickHandler={() => {
            setStatedOrder(false);
          }}
        />
        <div className={`${styles.modalBody} pl-10 pr-10 pt-10 pb-10`}>
          <div className={styles.modalHeader}>
            <strong className={"text text_type_main-large"}>
              {headerTitle}
            </strong>
            <button
              title="Закрыть"
              className={`${styles.modalCloseBtn} reset-btn`}
              onClick={() => {
                setStatedOrder(false);
              }}
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
