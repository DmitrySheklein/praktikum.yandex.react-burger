import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./preloader.module.css";
const Preloader = () => {
  return (
    <div className={`${styles.preloader} ${styles.pulse}`}>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default Preloader;
