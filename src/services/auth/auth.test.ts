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

import { authReducer } from "./reducer";
const sampleUser = {
  name: "username",
  email: "email@mail.com",
  password: "qwerty",
};
describe("auth reducer", () => {
  it("should handle SET_USER_DATA", () => {
    expect(
      authReducer(
        {
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
        },
        {
          type: SET_USER_DATA,
          data: sampleUser,
        }
      )
    ).toEqual({
      data: sampleUser,
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
    });
  });
  it("should handle SET_AUTH_CHECKING", () => {
    expect(
      authReducer(
        {
          data: null,
          authChecking: false,
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
        },
        {
          type: SET_AUTH_CHECKING,
          authChecking: true,
        }
      )
    ).toEqual({
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
    });
  });
  it("should handle SET_REGISTER_SENDING", () => {
    expect(
      authReducer(
        {
          data: null,
          authChecking: false,
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
        },
        {
          type: SET_REGISTER_SENDING,
          registerSending: true,
        }
      )
    ).toEqual({
      data: null,
      authChecking: false,
      registerSending: true,
      registerError: "",
      loginSending: false,
      loginError: "",
      forgotPassword: {
        emailSend: false,
        passwordChanged: false,
        message: "",
        errorMessage: "",
      },
    });
  });
  it("should handle SET_REGISTER_SEND_ERROR", () => {
    expect(
      authReducer(
        {
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
        },
        {
          type: SET_REGISTER_SEND_ERROR,
          registerError: "errors",
        }
      )
    ).toEqual({
      data: null,
      authChecking: true,
      registerSending: false,
      registerError: "errors",
      loginSending: false,
      loginError: "",
      forgotPassword: {
        emailSend: false,
        passwordChanged: false,
        message: "",
        errorMessage: "",
      },
    });
  });
  it("should handle SET_LOGIN_SENDING", () => {
    expect(
      authReducer(
        {
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
        },
        {
          type: SET_LOGIN_SENDING,
          loginSending: true,
        }
      )
    ).toEqual({
      data: null,
      authChecking: true,
      registerSending: false,
      registerError: "",
      loginSending: true,
      loginError: "",
      forgotPassword: {
        emailSend: false,
        passwordChanged: false,
        message: "",
        errorMessage: "",
      },
    });
  });
  it("should handle SET_LOGIN_SEND_ERROR", () => {
    expect(
      authReducer(
        {
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
        },
        {
          type: SET_LOGIN_SEND_ERROR,
          loginError: "error",
        }
      )
    ).toEqual({
      data: null,
      authChecking: true,
      registerSending: false,
      registerError: "",
      loginSending: false,
      loginError: "error",
      forgotPassword: {
        emailSend: false,
        passwordChanged: false,
        message: "",
        errorMessage: "",
      },
    });
  });
  it("should handle SET_PASSWORD_FORGOT_EMAIL_SEND", () => {
    expect(
      authReducer(
        {
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
        },
        {
          type: SET_PASSWORD_FORGOT_EMAIL_SEND,
          payload: {
            emailSend: true,
            message: "message",
          },
        }
      )
    ).toEqual({
      data: null,
      authChecking: true,
      registerSending: false,
      registerError: "",
      loginSending: false,
      loginError: "",
      forgotPassword: {
        emailSend: true,
        passwordChanged: false,
        message: "message",
        errorMessage: "",
      },
    });
  });
  it("should handle SET_PASSWORD_FORGOT_CHANGED", () => {
    expect(
      authReducer(
        {
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
        },
        {
          type: SET_PASSWORD_FORGOT_CHANGED,
          payload: {
            passwordChanged: true,
            message: "message",
          },
        }
      )
    ).toEqual({
      data: null,
      authChecking: true,
      registerSending: false,
      registerError: "",
      loginSending: false,
      loginError: "",
      forgotPassword: {
        emailSend: false,
        passwordChanged: true,
        message: "message",
        errorMessage: "",
      },
    });
  });
  it("should handle RESET_PASSWORD_FORGOT", () => {
    expect(
      authReducer(
        {
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
        },
        {
          type: RESET_PASSWORD_FORGOT,
        }
      )
    ).toEqual({
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
    });
  });
  it("should handle SET_RESET_PASSWORD_FORGOT_ERROR", () => {
    expect(
      authReducer(
        {
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
        },
        {
          type: SET_RESET_PASSWORD_FORGOT_ERROR,
          payload: {
            errorMessage: "error",
          },
        }
      )
    ).toEqual({
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
        errorMessage: "error",
      },
    });
  });
});
