import { SERVER_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "../../utils/auth-api";
export const name = "currentUser";

export const ActionTypes = {
  UPDATE_USER_DATA: `${name}/UPDATE_USER_DATA`,
  UPDATE_USER_DATA_SEND: `${name}/UPDATE_USER_DATA_SEND`,
  UPDATE_USER_DATA_ERROR: `${name}/UPDATE_USER_DATA_ERROR`,
};

export function updateUser({ name, password, email }) {
  return async function (dispatch) {
    dispatch({
      type: ActionTypes.UPDATE_USER_DATA_SEND,
      payload: true,
    });
    const token = localStorage.getItem("refreshToken");
    if (token) {
      return fetchWithRefresh(`${SERVER_URL}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        body: JSON.stringify({ name, email, password }),
      }).then((res) => {
        const { user, success } = res;
        dispatch({
          type: ActionTypes.UPDATE_USER_DATA,
          payload: { success, user },
        });
        dispatch({
          type: ActionTypes.UPDATE_USER_DATA_SEND,
          payload: false,
        });
      });
    } else {
      dispatch({
        type: ActionTypes.UPDATE_USER_DATA_ERROR,
        payload: false,
      });
      return Promise.resolve();
    }
  };
}
export function forgotPassword({ email, password, token }) {
  return async function (dispatch) {
    const isPasswordChange = password && token;
    const REQUEST_URL = isPasswordChange
      ? `${SERVER_URL}/password-reset/reset`
      : `${SERVER_URL}/password-reset`;
    // Запрашиваем данные у сервера
    try {
      const res = await fetch(REQUEST_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, token }),
      });
      const isJson =
        res.headers.get("content-type").indexOf("application/json") !== -1;
      if (!isJson) {
        throw new Error("Ответ сети не json");
      }
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(`Ответ сети не ok. Ошибка: ${message}`);
      }
      const { success, message } = await res.json();
      if (isPasswordChange) {
        dispatch({
          type: ActionTypes.SET_PASSWORD_FORGOT_CHANGED,
          payload: { passwordChanged: success, message },
        });
      } else {
        dispatch({
          type: ActionTypes.SET_PASSWORD_FORGOT_EMAIL_SEND,
          payload: { emailSend: success, message },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: ActionTypes.SET_RESET_PASSWORD_FORGOT_ERROR,
        payload: { errorMessage: error.toString() },
      });
    }
  };
}
