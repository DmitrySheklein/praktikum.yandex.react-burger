import { NAME } from "./constants";
import { RootState } from "../../types";

export const getWsConnected = (store: RootState) => store[NAME].wsConnected;
