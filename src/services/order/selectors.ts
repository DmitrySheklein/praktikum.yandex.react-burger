import { NAME } from "./constants";

export const getFullOrder = (store: any) => store[NAME].orderInfo;
export const getOrder = (store: any) => store[NAME].orderInfo?.order;
