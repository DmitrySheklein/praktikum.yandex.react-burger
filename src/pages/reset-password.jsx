import React, { useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getForgotPassword } from "../services/auth/selectors";

const ResetPassword = () => {
  const forgotPasswordObj = useSelector(getForgotPassword);
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setValue] = useState({
    password: "",
    emailText: "",
  });
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch();
  };

  console.log(history.location);
  const fromForgotPage = history.location.state?.fromForgotPage;

  if (!fromForgotPage) {
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={{ pathname: "/forgot-password" }}
      />
    );
  }

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
            onChange={onChange}
            value={form.password}
            name={"password"}
          />
        </div>
        <div className={`${styles.formField} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChange}
            value={form.emailText}
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
    </div>
  );
};

export default ResetPassword;
