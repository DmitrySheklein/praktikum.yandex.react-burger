import { NAME } from "./constants";

export const getUpdatedUser = (store: any) => store[NAME].data;
export const getUserUpdateSending = (store: any) =>
  store[NAME].userUpdateSending;
export const getUserUpdateError = (store: any) => store[NAME].userUpdateError;
