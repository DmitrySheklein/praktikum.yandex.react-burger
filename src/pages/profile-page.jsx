import React, { useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../services/auth/selectors";
import { signOut } from "../services/auth/actions";
import { updateUser } from "../services/user/actions";
import {
  getUpdatedUser,
  getUserUpdateError,
  getUserUpdateSending,
} from "../services/user/selectors";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const updatedUser = useSelector(getUpdatedUser);
  const userUpdateSending = useSelector(getUserUpdateSending);
  const userUpdateError = useSelector(getUserUpdateError);

  const [form, setValue] = useState({
    name: updatedUser?.user?.name || user?.name,
    email: updatedUser?.user?.email || user?.email,
    password: "",
  });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form.name, form.email, form.password);
    dispatch(updateUser(form));
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setValue({ ...user, password: "" });
  };
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(signOut());
  };

  return (
    <div className={styles.profileContainer}>
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
      <div className={`${styles.wrap} ${styles.profileWrap}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={`${styles.formField} mb-6`}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={form.name}
              name={"name"}
              icon={"EditIcon"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className={`${styles.formField} mb-6`}>
            <Input
              type={"email"}
              placeholder={"Логин"}
              onChange={onChange}
              value={form.email}
              name={"email"}
              icon={"EditIcon"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className={`${styles.formField} mb-6`}>
            <Input
              type={"password"}
              placeholder={"Пароль"}
              onChange={onChange}
              value={form.password}
              name={"password"}
              icon={"EditIcon"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          {!userUpdateSending &&
            !userUpdateError &&
            updatedUser &&
            updatedUser.status && (
              <p
                className="pt-2 pb-5 text text_type_main-small"
                style={{ textAlign: "center" }}
              >
                Пользователь успешно обновлён
              </p>
            )}
          <div className={`${styles.formButtonsContainer}`}>
            <button
              type={"reset"}
              onClick={handleCancel}
              className={`${styles.formResetBtn} reset-btn text text_type_main-default mr-5`}
            >
              Отмена
            </button>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
