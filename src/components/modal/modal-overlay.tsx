import React, { FC } from "react";
import styles from "./modal.module.css";

type TModalOverlayTypes = {
  clickHandler: () => void;
};
const ModalOverlay: FC<TModalOverlayTypes> = ({ clickHandler }) => {
  return <div className={styles.modalOverlay} onClick={clickHandler} />;
};
export default ModalOverlay;
