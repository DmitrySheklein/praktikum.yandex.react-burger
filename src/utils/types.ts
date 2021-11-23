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
