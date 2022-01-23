import { NAME } from "./constants";
import { RootState } from "../../types";

export const getFullOrder = (store: RootState) => store[NAME].orderInfo;
export const getOrder = (store: RootState) => store[NAME].orderInfo?.order;
export const isOrderRequest = (store: RootState) => store[NAME].orderRequest;
