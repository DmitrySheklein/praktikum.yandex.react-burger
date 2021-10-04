import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={`${styles.header} mb-10 pb-4 pt-4`}>
      <div className={styles.headerContainer}>
        <nav className={styles.headerMenu}>
          <a
            href="#!"
            className={`${styles.headerLink} ${styles.active} text text_type_main-default`}
          >
            <BurgerIcon type="primary" />
            <span className="ml-4">Конструктор</span>
          </a>
          <a
            href="#!"
            className={`${styles.headerLink} text text_type_main-default text_color_inactive`}
          >
            <ListIcon type="primary" />
            <span className="ml-4">Лента заказов</span>
          </a>
        </nav>
        <div className={styles.logoWrap}>
          <Logo className={styles.logo} />
        </div>
        <a
          href="#!"
          className={`${styles.headerLink} text text_type_main-default text_color_inactive`}
        >
          <ProfileIcon type="primary" />
          <span className="ml-4">Личный кабинет</span>
        </a>
      </div>
    </header>
  );
};
export default AppHeader;
