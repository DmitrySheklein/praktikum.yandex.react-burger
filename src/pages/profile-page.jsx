import React, { useRef, useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [password, setPassword] = useState("");
  const [emailText, setEmailText] = useState("");
  const inputRef = useRef(null);
  // const { name, loginUserError } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(loginUser(email, password));
    console.log(password, emailText);
  };
  return (
    <div className={styles.profileContainer}>
      <aside className={`${styles.profileSidebar}  mr-15`}>
        <ul className={`${styles.sidebar} mb-20`}>
          <li className={`${styles.sidebarItem} text text_type_main-medium`}>
            Профиль
          </li>
          <li
            className={`${styles.sidebarItem} text text_type_main-medium text_color_inactive`}
          >
            История заказов
          </li>
          <li
            className={`${styles.sidebarItem} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </li>
        </ul>
        <p
          className={`${styles.sidebarSubText} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </aside>
      <div className={`${styles.wrap} ${styles.profileWrap}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={`${styles.formField} mb-6`}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={(e) => setEmailText(e.target.value)}
              value={emailText}
              name={"name"}
              icon={"EditIcon"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>{" "}
          <div className={`${styles.formField} mb-6`}>
            <Input
              type={"email"}
              placeholder={"Логин"}
              onChange={(e) => setEmailText(e.target.value)}
              value={emailText}
              name={"name"}
              icon={"EditIcon"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className={`${styles.formField} mb-6`}>
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name={"password"}
            />
          </div>
          <div className={`${styles.formButton} mb-20`}>
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
