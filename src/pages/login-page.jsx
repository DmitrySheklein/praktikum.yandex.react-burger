import React, { useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/auth/actions";
import { getLoginError } from "../services/auth/selectors";

const LoginPage = () => {
  const loginError = useSelector(getLoginError);
  const dispatch = useDispatch();
  const [form, setValue] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  // if (user) {
  //   const { from } = location.state || { from: { pathname: "/" } };
  //   return <Redirect to={from} />;
  // }

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.formTitle} text text_type_main-medium mb-6 `}>
          Вход
        </h1>
        <div className={`${styles.formField} ${styles.formEmail} mb-6`}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={onChange}
            value={form.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${styles.formField} mb-6`}>
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"password"}
          />
        </div>
        {loginError && (
          <p
            className={`${styles.formErrorMsg} pt-2 pb-5 text text_type_main-small`}
          >
            {loginError}
          </p>
        )}
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
      </form>
    </div>
  );
};

export default LoginPage;
