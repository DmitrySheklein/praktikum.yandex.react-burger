import { Location } from "history";

export type TProduct = {
  _id: string;
  uuid?: string;
  type: string;
  price: number;
  name: string;
  image: string;
  image_large: string;
};

export type TLocationState = {
  background: Location;
};

export enum EStatus {
  Done = "done",
  Created = "created",
  Pending = "pending",
}
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
