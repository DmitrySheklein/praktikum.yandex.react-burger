import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link, NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={`${styles.header} mb-10 pb-4 pt-4`}>
      <div className={styles.headerContainer}>
        <nav className={styles.headerMenu}>
          <NavLink
            to="/"
            exact={true}
            className={`${styles.headerLink} text text_type_main-default text_color_inactive`}
            activeClassName={styles.active}
          >
            <BurgerIcon type="primary" />
            <span className="ml-4">Конструктор</span>
          </NavLink>
          <NavLink
            to="/feed"
            className={`${styles.headerLink} text text_type_main-default text_color_inactive`}
            activeClassName={styles.active}
          >
            <ListIcon type="primary" />
            <span className="ml-4">Лента заказов</span>
          </NavLink>
        </nav>
        <div className={styles.logoWrap}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <NavLink
          to="/profile"
          className={`${styles.headerLink} text text_type_main-default text_color_inactive`}
          activeClassName={styles.active}
          exact={true}
        >
          <ProfileIcon type="primary" />
          <span className="ml-4">Личный кабинет</span>
        </NavLink>
      </div>
    </header>
  );
};
export default AppHeader;
