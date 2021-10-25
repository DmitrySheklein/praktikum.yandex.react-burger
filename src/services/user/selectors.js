import { name } from "./actions";

export const getUpdatedUser = (store) => store[name].data;
export const getUserUpdateSending = (store) => store[name].userUpdateSending;
export const getUserUpdateError = (store) => store[name].userUpdateError;
