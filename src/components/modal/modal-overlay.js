import React from "react";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ clickHandler }) => {
  return <div className={styles.modalOverlay} onClick={clickHandler}></div>;
};
ModalOverlay.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default ModalOverlay;
