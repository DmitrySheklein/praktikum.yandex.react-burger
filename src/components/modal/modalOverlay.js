import React from "react";
import styles from "./modal.module.css";

const ModalOverlay = ({ clickHandler }) => {
  return <div className={styles.modalOverlay} onClick={clickHandler}></div>;
};
export default ModalOverlay;
