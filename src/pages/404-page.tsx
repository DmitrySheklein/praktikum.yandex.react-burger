import React from "react";
import styles from "./page.module.css";
import { Link } from "react-router-dom";

const ErrorPage404 = () => {
  return (
    <div className={styles.wrap} style={{ textAlign: "center" }}>
      <h1 className="text text_type_digits-large mb-6">404</h1>
      <p className="text text_type_main-default mb-6">Страница не найдена</p>
      <Link
        className="text text_type_main-default text_color_inactive"
        to={"/"}
      >
        На главную
      </Link>
    </div>
  );
};

export default ErrorPage404;
