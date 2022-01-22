import { Location } from "history";
import { TInitialStateAuth } from "../services/auth/reducer";
import { TInitialStateConstructor } from "../services/constructor/reducer";
import { TInitialStateIngredients } from "../services/ingredients/reducer";
import { TInitialStateOrder } from "../services/order/reducer";
import { TInitialStateUser } from "../services/user/reducer";

export type TProduct = {
  _id: string;
  uuid?: string;
  type: string;
  price: number;
  name: string;
  image: string;
  image_large: string;
  image_mobile: string;
  proteins: number;
  fat: number;
  calories: number;
  carbohydrates: number;
};

export type TLocationState = {
  background: Location;
};

export enum EStatus {
  Done = "done",
  Created = "created",
  Pending = "pending",
}
export type TOrderCreated = {
  name: string;
  order: { number: boolean };
  success: boolean;
};
export type TOrderInfo = {
  ingredients: string[];
  _id: string;
  status: EStatus;
  number: number;
  createdAt: Date;
  updatedAt: string;
  name: string;
};
export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type TInitialState =
  | TInitialStateAuth
  | TInitialStateConstructor
  | TInitialStateIngredients
  | TInitialStateOrder
  | TInitialStateUser;
