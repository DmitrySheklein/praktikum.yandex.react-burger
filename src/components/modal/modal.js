import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");
const Modal = ({ children, headerTitle, visible, setFunc }) => {
  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      setFunc(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });
  return ReactDOM.createPortal(
    visible ? (
      <div className={`${styles.modal} ${visible ? styles.show : ""}`}>
        <ModalOverlay
          clickHandler={() => {
            setFunc(false);
          }}
        />
        <div
          className={`${styles.modalBody} pl-10 pr-10 pt-10 pb-10`}
          onClick={(evt) => evt.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <strong className={"text text_type_main-large"}>
              {headerTitle}
            </strong>
            <button
              title="Закрыть"
              className={`${styles.modalCloseBtn} reset-btn`}
              onClick={() => {
                setFunc(false);
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
Modal.propTypes = {
  visible: PropTypes.bool,
  headerTitle: PropTypes.string,
  setFunc: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
