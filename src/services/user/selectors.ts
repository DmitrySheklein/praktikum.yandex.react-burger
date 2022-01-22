import { NAME } from "./constants";
import { RootState } from "../../types";

export const getUpdatedUser = (store: RootState) => store[NAME].data;
export const getUserUpdateSending = (store: RootState) =>
  store[NAME].userUpdateSending;
export const getUserUpdateError = (store: RootState) =>
  store[NAME].userUpdateError;
