import React, { useCallback, useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";

const ProfilePage = () => {
  const history = useHistory();
  const [name, setName] = useState("Марк");
  const [password, setPassword] = useState("123456");
  const [emailText, setEmailText] = useState("mail@stellar.burgers");

  // const { name, loginUserError } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(loginUser(email, password));
    console.log(password, emailText);
  };
  const logout = useCallback(() => {
    history.replace({ pathname: "/" });
  }, [history]);

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
              onClick={logout}
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
              onChange={(e) => setName(e.target.value)}
              value={name}
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
            <Input
              type={"password"}
              placeholder={"Пароль"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name={"password"}
              icon={"EditIcon"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className={`${styles.formButtonsContainer}`}>
            <button
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
