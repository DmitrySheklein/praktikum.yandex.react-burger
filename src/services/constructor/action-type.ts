import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET_CONSTRUCTOR,
  UPDATE_CONSTRUCTOR,
} from "./constants";
import { TProduct } from "../../types/data";

export interface IAddBun {
  readonly type: typeof ADD_BUN;
  bun: TProduct;
}
export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  ingredient: TProduct;
}
export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  ingredient: TProduct;
}
export interface IResetConstructor {
  readonly type: typeof RESET_CONSTRUCTOR;
}
export interface IUpdateConstructor {
  readonly type: typeof UPDATE_CONSTRUCTOR;
  value: { dragIndex: number; hoverIndex: number };
}

export type TConstructor =
  | IAddBun
  | IAddIngredient
  | IRemoveIngredient
  | IResetConstructor
  | IUpdateConstructor;

export const addBunAction = (bun: TProduct): IAddBun => ({
  type: ADD_BUN,
  bun,
});
export const addIngredientAction = (ingredient: TProduct): IAddIngredient => ({
  type: ADD_INGREDIENT,
  ingredient,
});
export const removeIngredientAction = (
  ingredient: TProduct
): IRemoveIngredient => ({
  type: REMOVE_INGREDIENT,
  ingredient,
});
export const resetConstructorAction = (): IResetConstructor => ({
  type: RESET_CONSTRUCTOR,
});
export const updateIngredientAction = (value: {
  dragIndex: number;
  hoverIndex: number;
}): IUpdateConstructor => ({
  type: UPDATE_CONSTRUCTOR,
  value,
});
