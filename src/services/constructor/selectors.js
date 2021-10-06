import { name } from "./actions";

export const getConstructorItems = (store) => {
  return store[name];
};
