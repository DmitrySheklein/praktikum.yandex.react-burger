import { TUser } from "../../types/data";
import {
  SET_USER_DATA,
  SET_AUTH_CHECKING,
  SET_REGISTER_SENDING,
  SET_REGISTER_SEND_ERROR,
  SET_LOGIN_SENDING,
  SET_LOGIN_SEND_ERROR,
  SET_PASSWORD_FORGOT_EMAIL_SEND,
  SET_PASSWORD_FORGOT_CHANGED,
  SET_RESET_PASSWORD_FORGOT_ERROR,
  RESET_PASSWORD_FORGOT,
} from "./constants";

export interface IUserData {
  readonly type: typeof SET_USER_DATA;
  data: TUser | null;
}
export interface IAuthChecking {
  readonly type: typeof SET_AUTH_CHECKING;
  authChecking: boolean;
}
export interface IRegisterSending {
  readonly type: typeof SET_REGISTER_SENDING;
  registerSending: boolean;
}
export interface IRegisterSendError {
  readonly type: typeof SET_REGISTER_SEND_ERROR;
  registerError: string;
}
export interface ILoginSending {
  readonly type: typeof SET_LOGIN_SENDING;
  loginSending: boolean;
}
export interface ILoginSendError {
  readonly type: typeof SET_LOGIN_SEND_ERROR;
  loginError: string;
}
export interface IPasswordForgotEmailSend {
  readonly type: typeof SET_PASSWORD_FORGOT_EMAIL_SEND;
  payload: {
    emailSend: boolean;
    message: string;
  };
}
export interface IPasswordForgotChanged {
  readonly type: typeof SET_PASSWORD_FORGOT_CHANGED;
  payload: {
    passwordChanged: boolean;
    message: string;
  };
}
export interface IPasswordResetError {
  readonly type: typeof SET_RESET_PASSWORD_FORGOT_ERROR;
  payload: {
    errorMessage: string;
  };
}
export interface IPasswordReset {
  readonly type: typeof RESET_PASSWORD_FORGOT;
}

export type TAuth =
  | IUserData
  | IAuthChecking
  | IRegisterSending
  | IRegisterSendError
  | ILoginSending
  | ILoginSendError
  | IPasswordForgotEmailSend
  | IPasswordForgotChanged
  | IPasswordResetError
  | IPasswordReset;

export const setUserData = (data: TUser | null): IUserData => ({
  type: SET_USER_DATA,
  data,
});
export const setAuthChecking = (authChecking: boolean): IAuthChecking => ({
  type: SET_AUTH_CHECKING,
  authChecking,
});
export const setRegisterSending = (
  registerSending: boolean
): IRegisterSending => ({
  type: SET_REGISTER_SENDING,
  registerSending,
});
export const setRegisterSendError = (
  registerError: string
): IRegisterSendError => ({
  type: SET_REGISTER_SEND_ERROR,
  registerError,
});
export const setLoginSending = (loginSending: boolean): ILoginSending => ({
  type: SET_LOGIN_SENDING,
  loginSending,
});
export const setLoginSendError = (loginError: string): ILoginSendError => ({
  type: SET_LOGIN_SEND_ERROR,
  loginError,
});
export const setPasswordForgotEmailSend = ({
  emailSend,
  message,
}: {
  emailSend: boolean;
  message: string;
}): IPasswordForgotEmailSend => ({
  type: SET_PASSWORD_FORGOT_EMAIL_SEND,
  payload: {
    emailSend,
    message,
  },
});
export const setPasswordForgotChanged = ({
  passwordChanged,
  message,
}: {
  passwordChanged: boolean;
  message: string;
}): IPasswordForgotChanged => ({
  type: SET_PASSWORD_FORGOT_CHANGED,
  payload: {
    passwordChanged,
    message,
  },
});
export const setPasswordResetError = ({
  errorMessage,
}: {
  errorMessage: string;
}): IPasswordResetError => ({
  type: SET_RESET_PASSWORD_FORGOT_ERROR,
  payload: {
    errorMessage,
  },
});
export const setPasswordReset = (): IPasswordReset => ({
  type: RESET_PASSWORD_FORGOT,
});
