import React from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "../../services/auth/actions";
import { useDispatch } from "react-redux";
import styles from "./profile-sidebar.module.css";

const ProfileSidebar = () => {
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(signOut());
  };
  return (
    <aside className={`${styles.profileSidebar}  mr-15`}>
      <ul className={`${styles.sidebar} mb-20`}>
        <li className={`${styles.sidebarItem}`}>
          <NavLink
            exact={true}
            to={"/profile"}
            className={`${styles.sidebarLink} text text_type_main-medium text_color_inactive`}
            activeClassName={`${styles.sidebarLinkCurrent}`}
          >
            Профиль
          </NavLink>
        </li>
        <li className={`${styles.sidebarItem}`}>
          <NavLink
            exact={true}
            to="/profile/orders"
            className={`${styles.sidebarLink} text text_type_main-medium text_color_inactive`}
            activeClassName={`${styles.sidebarLinkCurrent}`}
          >
            История заказов
          </NavLink>
        </li>
        <li className={`${styles.sidebarItem}`}>
          <button
            onClick={logoutHandler}
            className={`${styles.sidebarLink} reset-btn text text_type_main-medium text_color_inactive`}
          >
            Выход
          </button>
        </li>
      </ul>
      <p
        className={`${styles.sidebarSubText} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете <br /> изменить свои персональные данные
      </p>
    </aside>
  );
};

export default ProfileSidebar;
