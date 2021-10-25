import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../services/auth/actions";
import { getForgotPassword } from "../services/auth/selectors";

const ForgotPasswordPage = () => {
  const forgotPasswordObj = useSelector(getForgotPassword);
  const dispatch = useDispatch();
  const [form, setValue] = useState({
    email: "",
  });
  const inputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(form));
  };
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => inputRef.current?.focus(), []);

  if (forgotPasswordObj.emailSend) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
          state: { fromForgotPage: true },
        }}
      />
    );
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.formTitle} text text_type_main-medium mb-6 `}>
          1. Восстановление пароля
        </h1>
        <div className={`${styles.formField} mb-6`}>
          <Input
            ref={inputRef}
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={onChange}
            value={form.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            required
          />
        </div>
        {(forgotPasswordObj.emailSend || forgotPasswordObj.errorMessage) && (
          <p
            className={`${styles.formErrorMsg} pt-2 pb-5 text text_type_main-small`}
          >
            {forgotPasswordObj.message || forgotPasswordObj.errorMessage}
          </p>
        )}
        {form.email && (
          <div className={`${styles.formButton} mb-20`}>
            <Button type="primary" size="medium">
              Восстановить
            </Button>
          </div>
        )}

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

export default ForgotPasswordPage;
