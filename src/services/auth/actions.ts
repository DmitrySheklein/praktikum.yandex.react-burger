import { SERVER_URL } from "../../utils/constants";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "../../utils/auth-api";
import {
  setAuthChecking,
  setLoginSendError,
  setLoginSending,
  setPasswordForgotChanged,
  setPasswordForgotEmailSend,
  setPasswordResetError,
  setRegisterSendError,
  setRegisterSending,
  setUserData,
} from "./action-type";
import { AppDispatch } from "../../types";
import { TUser } from "../../types/data";

export function register({ name, password, email }: TUser) {
  return async function (dispatch: AppDispatch) {
    dispatch(setRegisterSending(true));
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
        // @ts-ignore
        res.headers.get("content-type").indexOf("application/json") !== -1;
      if (!isJson) {
        throw new Error("Ответ сети не json");
      }
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(`Ответ сети не ok. Ошибка: ${message}`);
      }
      const { user, accessToken, refreshToken } = await res.json();
      setCookie("accessToken", accessToken.split("Bearer ")[1]);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch(setUserData(user));
      dispatch(setRegisterSendError(""));
    } catch (error: any) {
      dispatch(setRegisterSendError(error.toString() || ""));
    }
  };
}
export function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return async function (dispatch: AppDispatch) {
    dispatch(setLoginSending(true));
    // Запрашиваем данные у сервера
    try {
      const res = await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const isJson =
        // @ts-ignore
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

      dispatch(setUserData(user));
      dispatch(setLoginSendError(""));
    } catch (error: any) {
      dispatch(setLoginSendError(error.toString() || ""));
    }
  };
}
export function signOut() {
  return async function (dispatch: AppDispatch) {
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
        // @ts-ignore
        res.headers.get("content-type").indexOf("application/json") !== -1;
      if (!isJson) {
        throw new Error("Ответ сети не json");
      }
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(`Ответ сети не ok. Ошибка: ${message}`);
      }
      // const response = await res.json();
      dispatch(setUserData(null));
      localStorage.removeItem("refreshToken");
      deleteCookie("accessToken");
    } catch (error: any) {
      console.error(error);
    }
  };
}
export function checkAuth() {
  return async function (dispatch: AppDispatch) {
    dispatch(setAuthChecking(true));
    const token = localStorage.getItem("refreshToken");
    if (token) {
      return fetchWithRefresh(`${SERVER_URL}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      }).then(res => {
        const { user } = res;
        dispatch(setUserData(user));
        dispatch(setAuthChecking(false));
      });
    } else {
      dispatch(setAuthChecking(false));
      return Promise.resolve();
    }
  };
}
export function forgotPassword({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token: string;
}) {
  return async function (dispatch: AppDispatch) {
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
        // @ts-ignore
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
        dispatch(
          setPasswordForgotChanged({ passwordChanged: success, message })
        );
      } else {
        dispatch(setPasswordForgotEmailSend({ emailSend: success, message }));
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setPasswordResetError({ errorMessage: error.toString() }));
    }
  };
}
