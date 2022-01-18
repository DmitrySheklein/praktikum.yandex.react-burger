import { TUser } from "../../types/data";
import { TAuth } from "./action-type";
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

type TInitialState = {
  data: TUser | null;
  authChecking: boolean;
  registerSending: boolean;
  loginSending: boolean;
  loginError: string;
  registerError: string;
  forgotPassword: {
    emailSend: boolean;
    passwordChanged: boolean;
    message: string;
    errorMessage: string;
  };
};
const initialState: TInitialState = {
  data: null,
  authChecking: true,
  registerSending: false,
  registerError: "",
  loginSending: false,
  loginError: "",
  forgotPassword: {
    emailSend: false,
    passwordChanged: false,
    message: "",
    errorMessage: "",
  },
};

export const authReducer = (
  state = initialState,
  action: TAuth
): TInitialState => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, data: action.data };
    case SET_AUTH_CHECKING:
      return { ...state, authChecking: action.authChecking };
    case SET_REGISTER_SENDING:
      return { ...state, registerSending: action.registerSending };
    case SET_REGISTER_SEND_ERROR:
      return { ...state, registerError: action.registerError };
    case SET_LOGIN_SENDING:
      return { ...state, loginSending: action.loginSending };
    case SET_LOGIN_SEND_ERROR:
      return { ...state, loginError: action.loginError };
    case SET_PASSWORD_FORGOT_EMAIL_SEND:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          emailSend: action.payload.emailSend,
          passwordChanged: false,
          message: action.payload.message,
        },
      };
    case SET_PASSWORD_FORGOT_CHANGED:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          emailSend: false,
          errorMessage: "",
          passwordChanged: action.payload.passwordChanged,
          message: action.payload.message,
        },
      };
    case RESET_PASSWORD_FORGOT:
      return {
        ...state,
        forgotPassword: {
          message: "",
          emailSend: false,
          passwordChanged: false,
          errorMessage: "",
        },
      };
    case SET_RESET_PASSWORD_FORGOT_ERROR:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          errorMessage: action.payload.errorMessage,
          passwordChanged: false,
        },
      };
    default:
      return state;
  }
};
