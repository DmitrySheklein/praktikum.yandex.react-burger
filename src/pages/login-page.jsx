import React from "react";
import styles from "./page.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={styles.form}>
      <h1 className={`${styles.formTitle} text text_type_main-medium mb-6 `}>
        Вход
      </h1>
      <div className={`${styles.formField} mb-6`}>
        <EmailInput onChange={onChangeEmail} value={email} name={"email"} />
      </div>
      <div className={`${styles.formField} mb-6`}>
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          name={"password"}
        />
      </div>
      <div className={`${styles.formButton} mb-20`}>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>
      <p
        className={`${styles.formLinkItem} text text_type_main-default text_color_inactive mb-4`}
      >
        Вы — новый пользователь?
        <Link className={styles.formLink} to={"/register"}>
          Зарегистрироваться
        </Link>
      </p>
      <p
        className={`${styles.formLinkItem} text text_type_main-default text_color_inactive`}
      >
        Забыли пароль?
        <Link className={styles.formLink} to={"/forgot-password"}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
