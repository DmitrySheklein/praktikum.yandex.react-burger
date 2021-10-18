import { SERVER_URL } from "../../utils/constants";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "../../utils/auth-api";
export const name = "auth";

export const ActionTypes = {
  SET_USER_DATA: `${name}/SET_DATA`,
  SET_AUTH_CHECKING: `${name}/SET_AUTH_CHECKING`,
  SET_REGISTER_SENDING: `${name}/SET_REGISTER_SENDING`,
  SET_REGISTER_SEND_ERROR: `${name}/SET_REGISTER_SEND_ERROR`,
  SET_LOGIN_SENDING: `${name}/SET_LOGIN_SENDING`,
  SET_LOGIN_SEND_ERROR: `${name}/SET_LOGIN_SEND_ERROR`,
};

export function register({ name, password, email }) {
  return async function (dispatch) {
    dispatch({
      type: ActionTypes.SET_REGISTER_SENDING,
      payload: true,
    });
    // Запрашиваем данные у сервера
    try {
      const res = await fetch(`${SERVER_URL}/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
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
      const { user } = await res.json();
      dispatch({
        type: ActionTypes.SET_USER_DATA,
        payload: user,
      });
      dispatch({
        type: ActionTypes.SET_REGISTER_SEND_ERROR,
        payload: "",
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.SET_REGISTER_SEND_ERROR,
        payload: error.toString() || "",
      });
    }
  };
}
export function login({ email, password }) {
  return async function (dispatch) {
    dispatch({
      type: ActionTypes.SET_LOGIN_SENDING,
      payload: true,
    });
    // Запрашиваем данные у сервера
    try {
      const res = await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const isJson =
        res.headers.get("content-type").indexOf("application/json") !== -1;
      if (!isJson) {
        throw new Error("Ответ сети не json");
      }
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }
      const { user, accessToken, refreshToken } = await res.json();
      setCookie("accessToken", accessToken.split("Bearer ")[1]);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch({
        type: ActionTypes.SET_USER_DATA,
        payload: user,
      });
      dispatch({
        type: ActionTypes.SET_LOGIN_SEND_ERROR,
        payload: "",
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.SET_LOGIN_SEND_ERROR,
        payload: error.toString() || "",
      });
    }
  };
}
export function signOut() {
  return async function (dispatch) {
    // Запрашиваем данные у сервера
    try {
      const res = await fetch(`${SERVER_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
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
      const response = await res.json();
      console.log(response);
      dispatch({
        type: ActionTypes.SET_USER_DATA,
        payload: null,
      });
      localStorage.removeItem("refreshToken");
      deleteCookie("accessToken");
    } catch (error) {
      console.error(error);
    }
  };
}
export function checkAuth() {
  return async function (dispatch) {
    dispatch({
      type: ActionTypes.SET_AUTH_CHECKING,
      payload: true,
    });
    const token = localStorage.getItem("refreshToken");
    if (token) {
      return fetchWithRefresh(`${SERVER_URL}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      }).then((res) => {
        const { user } = res;
        dispatch({
          type: ActionTypes.SET_USER_DATA,
          payload: user,
        });
      });
    } else {
      dispatch({
        type: ActionTypes.SET_AUTH_CHECKING,
        payload: false,
      });
      return Promise.resolve();
    }
  };
}
