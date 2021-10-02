import { name } from "./actions";

export const getFullOrder = (store) => store[name].orderInfo;
export const getOrder = (store) => store[name].orderInfo?.order;
