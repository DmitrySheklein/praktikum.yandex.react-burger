import React, { useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../services/auth/selectors";
import { signOut } from "../services/auth/actions";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(getUser);
  const [form, setValue] = useState({
    name: user?.name,
    email: user?.email,
    password: "",
  });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form.name, form.email, form.password);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setValue({ ...user, password: "" });
  };
  const logoutHandler = (e) => {
    e.preventDefault();
    console.log("logout");
    dispatch(signOut());
  };

  if (!user) {
    const { from } = location.state || { from: { pathname: "/login" } };
    return <Redirect to={from} />;
  }
  return (
    <div className={styles.profileContainer}>
      <aside className={`${styles.profileSidebar}  mr-15`}>
        <ul className={`${styles.sidebar} mb-20`}>
          <li className={`${styles.sidebarItem}`}>
            <span
              className={`${styles.sidebarLink} ${styles.sidebarLinkCurrent} text text_type_main-medium`}
            >
              Профиль
            </span>
          </li>
          <li className={`${styles.sidebarItem}`}>
            <Link
              to="/profile/orders"
              className={`${styles.sidebarLink} text text_type_main-medium text_color_inactive`}
            >
              История заказов
            </Link>
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
          <div className={`${styles.formButtonsContainer}`}>
            <button
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
        {/*      {loginUserError ? (
        <p className="pt-5 text text_type_main-default">{loginUserError}</p>
      ) : null}*/}
      </div>
    </div>
  );
};

export default ProfilePage;
