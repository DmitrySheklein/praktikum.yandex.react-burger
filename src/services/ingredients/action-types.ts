import { LOAD_ITEMS, LOAD_ITEMS_SUCCESS, LOAD_ITEMS_FAILED } from "./constants";
import { TProduct } from "../../types/data";

export interface IIngredientFailed {
  readonly type: typeof LOAD_ITEMS_FAILED;
}

export interface IIngredientRequest {
  readonly type: typeof LOAD_ITEMS;
}

export interface IIngredientSuccess {
  readonly type: typeof LOAD_ITEMS_SUCCESS;
  readonly data: TProduct[];
}

export type TIngredient =
  | IIngredientFailed
  | IIngredientRequest
  | IIngredientSuccess;

export const IngredientsSuccessAction = (
  data: TProduct[]
): IIngredientSuccess => ({
  type: LOAD_ITEMS_SUCCESS,
  data,
});

export const IngredientsRequestAction = (): IIngredientRequest => ({
  type: LOAD_ITEMS,
});

export const IngredientsFailedAction = (): IIngredientFailed => ({
  type: LOAD_ITEMS_FAILED,
});
