import { NAME } from "./constants";
import { RootState } from "../../types";

export const getConstructorItems = (store: RootState) => {
  return store[NAME];
};
