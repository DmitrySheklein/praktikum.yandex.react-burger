import { NAME } from "./constants";

export const getUser = (store: any) => store[NAME].data;
export const getIsAuth = (store: any) => !!store[NAME].data;

export const getIsAuthChecking = (store: any) => store[NAME].authChecking;

export const getRegisterSending = (store: any) => store[NAME].registerSending;
export const getRegisterError = (store: any) => store[NAME].registerError;

export const getLoginSending = (store: any) => store[NAME].loginSending;
export const getLoginError = (store: any) => store[NAME].loginError;

export const getForgotPassword = (store: any) => store[NAME].forgotPassword;
