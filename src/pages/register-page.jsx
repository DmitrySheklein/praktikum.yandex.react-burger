import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);
  const [password, setPassword] = useState("");
  // const { name, loginUserError } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(loginUser(email, password));
    console.log(name, email, password);
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
          Регистрация
        </h1>
        <div className={`${styles.formField} mb-6`}>
          <Input
            ref={inputRef}
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={`${styles.formField} ${styles.formEmail} mb-6`}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
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
            Зарегистрироваться
          </Button>
        </div>
        <p
          className={`${styles.formLinkItem} text text_type_main-default text_color_inactive mb-4`}
        >
          Уже зарегистрированы?
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

export default RegisterPage;
