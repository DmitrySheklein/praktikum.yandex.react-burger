import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import styles from "../page.module.css";
import stylesProfile from "./profile-form.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../types/hooks";
import { getUser } from "../../services/auth/selectors";
import {
  getUpdatedUser,
  getUserUpdateError,
  getUserUpdateSending,
} from "../../services/user/selectors";
import { updateUser } from "../../services/user/actions";
import { TUser } from "../../types/data";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const updatedUser = useSelector(getUpdatedUser);
  const userUpdateSending = useSelector(getUserUpdateSending);
  const userUpdateError = useSelector(getUserUpdateError);

  const [form, setValue] = useState<TUser>({
    name: updatedUser?.user?.name || user?.name || "",
    email: updatedUser?.user?.email || user?.email || "",
    password: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    if (user) {
      setValue({ ...user, password: "" });
    }
  };

  return (
    <div className={`${styles.wrap} ${stylesProfile.profileWrap}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.formField} mb-6`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            value={form.name}
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
            onChange={onChange}
            value={form.email}
            name={"email"}
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
            onChange={onChange}
            value={form.password}
            name={"password"}
            icon={"EditIcon"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        {!userUpdateSending &&
          !userUpdateError &&
          updatedUser &&
          updatedUser.status && (
            <p
              className="pt-2 pb-5 text text_type_main-small"
              style={{ textAlign: "center" }}
            >
              Пользователь успешно обновлён
            </p>
          )}
        <div className={`${styles.formButtonsContainer}`}>
          <button
            type={"reset"}
            onClick={handleCancel}
            className={`${styles.formResetBtn} reset-btn text text_type_main-default mr-5`}
          >
            Отмена
          </button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
