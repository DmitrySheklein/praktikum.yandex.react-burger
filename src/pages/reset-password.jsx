import React, { useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [emailText, setEmailText] = useState("");

  // const { name, loginUserError } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(loginUser(email, password));
    console.log(password, emailText);
  };
  /*  if (name) {
        const { from } = location.state || { from: { pathname: "/" } };
        return (
          <Redirect
            // Если объект state не является undefined, вернём пользователя назад.
            to={from}
          />
        );
      }*/

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.formTitle} text text_type_main-medium mb-6 `}>
          Восстановление пароля
        </h1>
        <div
          className={`${styles.formField} ${styles.formFieldNewPassword} mb-6`}
        >
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"password"}
          />
        </div>
        <div className={`${styles.formField} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setEmailText(e.target.value)}
            value={emailText}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${styles.formButton} mb-20`}>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
        <p
          className={`${styles.formLinkItem} text text_type_main-default text_color_inactive mb-4`}
        >
          Вспомнили пароль?
          <Link className={styles.formLink} to={"/login"}>
            Войти
          </Link>
        </p>
      </form>
      {/*      {loginUserError ? (
        <p className="pt-5 text text_type_main-default">{loginUserError}</p>
      ) : null}*/}
    </div>
  );
};

export default ResetPassword;
