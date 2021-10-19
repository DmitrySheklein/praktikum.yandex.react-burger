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
import { forgotPassword } from "../services/auth/actions";

const ResetPassword = () => {
  const forgotPasswordObj = useSelector(getForgotPassword);
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setValue] = useState({
    password: "",
    token: "",
  });
  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(form));
  };

  const fromForgotPage = history.location.state?.fromForgotPage;

  if (!fromForgotPage) {
    return <Redirect to={{ pathname: "/forgot-password" }} />;
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.formTitle} text text_type_main-medium mb-6 `}>
          2. Восстановление пароля
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
            onPaste={onChange}
            value={form.token}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        {forgotPasswordObj.errorMessage && (
          <p
            className={`${styles.formErrorMsg} pt-2 pb-5 text text_type_main-small`}
          >
            {forgotPasswordObj.message || forgotPasswordObj.errorMessage}
          </p>
        )}
        {form.password && form.token && (
          <div className={`${styles.formButton} mb-20`}>
            <Button type="primary" size="medium">
              Сохранить
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

export default ResetPassword;
