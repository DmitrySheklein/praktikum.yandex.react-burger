import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);
  // const { name, loginUserError } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(loginUser(email, password));
    console.log(name, email);
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
  useEffect(() => inputRef.current.focus(), []);

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.formTitle} text text_type_main-medium mb-6 `}>
          Восстановление пароля
        </h1>
        <div className={`${styles.formField} mb-6`}>
          <Input
            ref={inputRef}
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${styles.formButton} mb-20`}>
          <Button type="primary" size="medium">
            Восстановить
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

export default ForgotPassword;
