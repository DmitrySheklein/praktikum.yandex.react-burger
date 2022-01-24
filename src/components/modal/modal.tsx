import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";
import styles from "./modal.module.css";

type TModalTypes = {
  headerTitle?: string;
  visible: boolean;
  setFunc: (bool: boolean) => void;
  withHeader?: boolean;
};
const modalRoot = document.getElementById("react-modals");
const Modal: FC<TModalTypes> = ({
  children,
  headerTitle,
  visible,
  setFunc,
  withHeader = true,
}) => {
  const handleEscClose = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      setFunc(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", handleEscClose);
    return () => {
      document.removeEventListener("keyup", handleEscClose);
    };
  });
  if (!modalRoot) return null;
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
          <button
            title="Закрыть"
            className={`${styles.modalCloseBtn} reset-btn`}
            onClick={() => {
              setFunc(false);
            }}
          >
            <CloseIcon type="primary" />
          </button>
          {withHeader ? (
            <div className={styles.modalHeader}>
              {headerTitle && (
                <strong className={"text text_type_main-large"}>
                  {headerTitle}
                </strong>
              )}
            </div>
          ) : null}

          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    ) : (
      <></>
    ),
    modalRoot
  );
};

export default Modal;
