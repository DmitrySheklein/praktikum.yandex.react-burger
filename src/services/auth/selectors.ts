import { NAME } from "./constants";
import { RootState } from "../../types";

export const getUser = (store: RootState) => store[NAME].data;
export const getIsAuth = (store: RootState) => !!store[NAME].data;

export const getIsAuthChecking = (store: RootState) => store[NAME].authChecking;

export const getRegisterSending = (store: RootState) =>
  store[NAME].registerSending;
export const getRegisterError = (store: RootState) => store[NAME].registerError;

export const getLoginSending = (store: RootState) => store[NAME].loginSending;
export const getLoginError = (store: RootState) => store[NAME].loginError;

export const getForgotPassword = (store: RootState) =>
  store[NAME].forgotPassword;
