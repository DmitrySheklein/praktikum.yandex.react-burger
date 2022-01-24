import { NAME } from "./constants";
import { RootState } from "../../types";

export const getWsConnected = (store: RootState) => {
  return store[NAME];
};
export const getWsMessages = (store: any) => {
  return store[NAME].messages;
};
