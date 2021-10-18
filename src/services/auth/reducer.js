import { ActionTypes } from "./actions";

const initialState = {
  data: null,
  authChecking: true,
  registerSending: false,
  registerError: "",
  loginSending: false,
  loginError: "",
  forgotPassword: { emailSend: false, passwordChanged: false, message: "" },
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA:
      return { ...state, data: action.payload };
    case ActionTypes.SET_AUTH_CHECKING:
      return { ...state, authChecking: action.payload };
    case ActionTypes.SET_REGISTER_SENDING:
      return { ...state, registerSending: action.payload };
    case ActionTypes.SET_REGISTER_SEND_ERROR:
      return { ...state, registerError: action.payload };
    case ActionTypes.SET_LOGIN_SENDING:
      return { ...state, loginSending: action.payload };
    case ActionTypes.SET_LOGIN_SEND_ERROR:
      return { ...state, loginError: action.payload };
    case ActionTypes.SET_PASSWORD_FORGOT_EMAIL_SEND:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          emailSend: action.payload,
          passwordChanged: false,
        },
      };
    case ActionTypes.SET_PASSWORD_FORGOT_PASSWORD_CHANGED:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          emailSend: false,
          passwordChanged: action.payload,
        },
      };
    case ActionTypes.RESET_PASSWORD_FORGOT:
      return {
        ...state,
        forgotPassword: {
          message: "",
          emailSend: false,
          passwordChanged: false,
        },
      };
    default:
      return state;
  }
};
